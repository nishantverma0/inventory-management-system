# Inventory & Order Management System

A production-ready full-stack assessment project with a React frontend, FastAPI backend, PostgreSQL persistence, Docker images, and Docker Compose orchestration.

## Tech Stack

- Frontend: React, Vite, JavaScript, Lucide icons
- Backend: Python, FastAPI, SQLAlchemy, Pydantic
- Database: PostgreSQL
- Containers: Docker, Docker Compose
- CI: GitHub Actions

## Features

- Product CRUD with unique SKU validation and non-negative inventory
- Customer create/list/detail/delete with unique email validation
- Order create/list/detail/delete with backend-calculated totals
- Inventory checks before order creation
- Automatic stock reduction on order creation
- Stock restoration when an order is cancelled/deleted
- Dashboard totals for products, customers, orders, and low-stock products
- Responsive React UI with form validation and success/error states

## Local Setup

Copy the example environment file and adjust values as needed.

```bash
cp .env.example .env
```

Run the full stack.

```bash
docker compose up --build
```

Open:

- Frontend: http://localhost:8080
- Backend API: http://localhost:8000
- API docs: http://localhost:8000/docs

## Backend Development

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload
pytest
```

The backend uses `DATABASE_URL`. If no value is provided, it falls back to local SQLite for development convenience. Docker Compose uses PostgreSQL.

## Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` to the backend URL when running outside Docker.

## API Endpoints

Products:

- `POST /products`
- `GET /products`
- `GET /products/{id}`
- `PUT /products/{id}`
- `DELETE /products/{id}`

Customers:

- `POST /customers`
- `GET /customers`
- `GET /customers/{id}`
- `DELETE /customers/{id}`

Orders:

- `POST /orders`
- `GET /orders`
- `GET /orders/{id}`
- `DELETE /orders/{id}`

Dashboard:

- `GET /dashboard/summary`

## Docker Images

Build and push the backend image after creating a Docker Hub repository.

```bash
docker build -t <dockerhub-user>/inventory-order-api:latest ./backend
docker push <dockerhub-user>/inventory-order-api:latest
```

Required submission value:

```text
Backend Docker Hub image: https://hub.docker.com/r/<dockerhub-user>/inventory-order-api
```

## Deployment

### Backend on Render

1. Create a PostgreSQL database on Render.
2. Create a new Web Service from this repository.
3. Set the root directory to `backend`.
4. Use build command `pip install -r requirements.txt`.
5. Use start command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
6. Set environment variables:
   - `DATABASE_URL`: the Render PostgreSQL external/internal connection string
   - `CORS_ORIGINS`: deployed frontend URL, for example `https://your-app.vercel.app`
   - `LOW_STOCK_THRESHOLD`: `5`

Required submission value:

```text
Live backend API URL: https://<your-render-service>.onrender.com
```

### Frontend on Vercel

1. Import this repository into Vercel.
2. Set the root directory to `frontend`.
3. Set `VITE_API_URL` to the deployed backend URL.
4. Build command: `npm run build`.
5. Output directory: `dist`.

Required submission value:

```text
Live frontend URL: https://<your-vercel-project>.vercel.app
```

### Frontend on Netlify

1. Import this repository into Netlify.
2. Set the base directory to `frontend`.
3. Set `VITE_API_URL` to the deployed backend URL.
4. Build command: `npm run build`.
5. Publish directory: `dist`.

