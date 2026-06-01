from datetime import datetime
from decimal import Decimal
from typing import Annotated

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


Money = Annotated[Decimal, Field(gt=0, max_digits=12, decimal_places=2)]


def strip_text(value: str) -> str:
    return value.strip()


class ProductBase(BaseModel):
    name: str = Field(min_length=1, max_length=140)
    sku: str = Field(min_length=1, max_length=64)
    price: Money
    quantity: int = Field(ge=0)

    @field_validator("name", "sku")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        return strip_text(value)

    @field_validator("sku")
    @classmethod
    def normalize_sku(cls, value: str) -> str:
        return value.upper()


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=140)
    sku: str | None = Field(default=None, min_length=1, max_length=64)
    price: Money | None = None
    quantity: int | None = Field(default=None, ge=0)

    @field_validator("name", "sku")
    @classmethod
    def normalize_optional_text(cls, value: str | None) -> str | None:
        if value is None:
            return value
        return strip_text(value)

    @field_validator("sku")
    @classmethod
    def normalize_optional_sku(cls, value: str | None) -> str | None:
        if value is None:
            return value
        return value.upper()


class ProductRead(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CustomerBase(BaseModel):
    full_name: str = Field(min_length=1, max_length=160)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=40)

    @field_validator("full_name", "phone")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        return strip_text(value)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.lower()


class CustomerCreate(CustomerBase):
    pass


class CustomerRead(CustomerBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class OrderItemCreate(BaseModel):
    product_id: int = Field(gt=0)
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    customer_id: int = Field(gt=0)
    items: list[OrderItemCreate] = Field(min_length=1, max_length=100)


class OrderItemRead(BaseModel):
    id: int
    product_id: int | None
    product_name: str
    product_sku: str
    quantity: int
    unit_price: Decimal
    line_total: Decimal

    model_config = ConfigDict(from_attributes=True)


class OrderRead(BaseModel):
    id: int
    customer_id: int | None
    customer_name: str
    customer_email: str
    total_amount: Decimal
    created_at: datetime
    items: list[OrderItemRead]

    model_config = ConfigDict(from_attributes=True)


class DashboardSummary(BaseModel):
    total_products: int
    total_customers: int
    total_orders: int
    low_stock_products: list[ProductRead]

