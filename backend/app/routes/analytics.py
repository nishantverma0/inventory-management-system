from fastapi import APIRouter
from sqlalchemy import text
from app.database import engine

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/sales")
def sales_trend():
    return [
        {"month": "Jan", "sales": 1000},
        {"month": "Feb", "sales": 3000},
        {"month": "Mar", "sales": 2500},
        {"month": "Apr", "sales": 5000},
    ]


@router.get("/orders")
def order_trend():
    return [
        {"month": "Jan", "orders": 25},
        {"month": "Feb", "orders": 40},
        {"month": "Mar", "orders": 35},
        {"month": "Apr", "orders": 60},
    ]


@router.get("/inventory")
def inventory_status():
    return [
        {"name": "In Stock", "value": 70},
        {"name": "Low Stock", "value": 20},
        {"name": "Out Of Stock", "value": 10},
    ]