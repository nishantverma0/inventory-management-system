from collections import defaultdict
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.models import Customer, Order, OrderItem, Product
from app.schemas import OrderCreate, OrderRead


router = APIRouter(prefix="/orders", tags=["orders"])


def get_order_or_404(order_id: int, db: Session) -> Order:
    order = db.scalar(
        select(Order)
        .options(selectinload(Order.items))
        .where(Order.id == order_id)
    )
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


@router.post("", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)) -> Order:
    customer = db.get(Customer, payload.customer_id)
    if customer is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")

    requested_quantities: dict[int, int] = defaultdict(int)
    for item in payload.items:
        requested_quantities[item.product_id] += item.quantity

    product_ids = list(requested_quantities.keys())
    products = list(
        db.scalars(
            select(Product)
            .where(Product.id.in_(product_ids))
            .with_for_update()
        ).all()
    )
    products_by_id = {product.id: product for product in products}
    missing_ids = sorted(set(product_ids) - set(products_by_id.keys()))
    if missing_ids:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Products not found: {', '.join(str(product_id) for product_id in missing_ids)}",
        )

    insufficient_items = [
        {
            "product_id": product.id,
            "sku": product.sku,
            "available": product.quantity,
            "requested": requested_quantities[product.id],
        }
        for product in products
        if product.quantity < requested_quantities[product.id]
    ]
    if insufficient_items:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": "Insufficient inventory for one or more products",
                "items": insufficient_items,
            },
        )

    order = Order(
        customer_id=customer.id,
        customer_name=customer.full_name,
        customer_email=customer.email,
        total_amount=Decimal("0.00"),
    )

    total_amount = Decimal("0.00")
    for product in products:
        quantity = requested_quantities[product.id]
        unit_price = Decimal(product.price)
        line_total = unit_price * quantity
        product.quantity -= quantity
        total_amount += line_total
        order.items.append(
            OrderItem(
                product_id=product.id,
                product_name=product.name,
                product_sku=product.sku,
                quantity=quantity,
                unit_price=unit_price,
                line_total=line_total,
            )
        )

    order.total_amount = total_amount.quantize(Decimal("0.01"))
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.get("", response_model=list[OrderRead])
def list_orders(db: Session = Depends(get_db)) -> list[Order]:
    return list(
        db.scalars(
            select(Order)
            .options(selectinload(Order.items))
            .order_by(Order.created_at.desc(), Order.id.desc())
        ).all()
    )


@router.get("/{order_id}", response_model=OrderRead)
def get_order(order_id: int, db: Session = Depends(get_db)) -> Order:
    return get_order_or_404(order_id, db)


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, db: Session = Depends(get_db)) -> None:
    order = get_order_or_404(order_id, db)
    product_ids = [item.product_id for item in order.items if item.product_id is not None]
    products = {
        product.id: product
        for product in db.scalars(
            select(Product)
            .where(Product.id.in_(product_ids))
            .with_for_update()
        ).all()
    }

    for item in order.items:
        if item.product_id in products:
            products[item.product_id].quantity += item.quantity

    db.delete(order)
    db.commit()
    return None

