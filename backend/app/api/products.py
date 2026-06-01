from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product
from app.schemas import ProductCreate, ProductRead, ProductUpdate


router = APIRouter(prefix="/products", tags=["products"])


def get_product_or_404(product_id: int, db: Session) -> Product:
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


def sku_exists(db: Session, sku: str, exclude_id: int | None = None) -> bool:
    query = select(Product).where(func.lower(Product.sku) == sku.lower())
    if exclude_id is not None:
        query = query.where(Product.id != exclude_id)
    return db.scalar(query) is not None


@router.post("", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)) -> Product:
    if sku_exists(db, payload.sku):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Product SKU already exists")

    product = Product(**payload.model_dump())
    db.add(product)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Product SKU already exists",
        ) from exc
    db.refresh(product)
    return product


@router.get("", response_model=list[ProductRead])
def list_products(db: Session = Depends(get_db)) -> list[Product]:
    return list(db.scalars(select(Product).order_by(Product.id)).all())


@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)) -> Product:
    return get_product_or_404(product_id, db)


@router.put("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
) -> Product:
    product = get_product_or_404(product_id, db)
    update_data = payload.model_dump(exclude_unset=True)

    if "sku" in update_data and sku_exists(db, update_data["sku"], exclude_id=product_id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Product SKU already exists")

    for field, value in update_data.items():
        setattr(product, field, value)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Product SKU already exists",
        ) from exc
    db.refresh(product)
    return product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)) -> None:
    product = get_product_or_404(product_id, db)
    db.delete(product)
    db.commit()
    return None

