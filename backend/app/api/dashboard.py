from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.models import Customer, Order, Product
from app.schemas import DashboardSummary


router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary(db: Session = Depends(get_db)) -> DashboardSummary:
    settings = get_settings()
    low_stock_products = list(
        db.scalars(
            select(Product)
            .where(Product.quantity <= settings.low_stock_threshold)
            .order_by(Product.quantity.asc(), Product.name.asc())
        ).all()
    )
    return DashboardSummary(
        total_products=db.scalar(select(func.count(Product.id))) or 0,
        total_customers=db.scalar(select(func.count(Customer.id))) or 0,
        total_orders=db.scalar(select(func.count(Order.id))) or 0,
        low_stock_products=low_stock_products,
    )

