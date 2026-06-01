from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import (
    customers,
    dashboard,
    orders,
    products,
)

from app.config import get_settings
from app.database import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # Create database tables on startup
    Base.metadata.create_all(bind=engine)

    print("🚀 Inventory API started")
    yield

    print("🛑 Inventory API stopped")


settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="Inventory & Order Management System API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)
app.include_router(dashboard.router)

# Health Endpoints
@app.get("/", tags=["Health"])
def root():
    return {
        "message": "Inventory & Order Management API",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
    }


@app.get("/info", tags=["Health"])
def api_info():
    return {
        "app_name": settings.app_name,
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
    }