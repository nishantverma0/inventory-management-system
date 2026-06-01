from decimal import Decimal


def create_product(client, **overrides):
    payload = {
        "name": "Desk Lamp",
        "sku": "lamp-001",
        "price": "19.99",
        "quantity": 12,
    }
    payload.update(overrides)
    response = client.post("/products", json=payload)
    assert response.status_code == 201
    return response.json()


def create_customer(client, **overrides):
    payload = {
        "full_name": "Asha Mehta",
        "email": "asha@example.com",
        "phone": "+91 98765 43210",
    }
    payload.update(overrides)
    response = client.post("/customers", json=payload)
    assert response.status_code == 201
    return response.json()


def test_product_crud_and_unique_sku(client):
    product = create_product(client)

    duplicate = client.post(
        "/products",
        json={
            "name": "Another Lamp",
            "sku": "LAMP-001",
            "price": "29.99",
            "quantity": 5,
        },
    )
    assert duplicate.status_code == 409

    updated = client.put(
        f"/products/{product['id']}",
        json={"name": "Desk Lamp Pro", "price": "24.99"},
    )
    assert updated.status_code == 200
    assert updated.json()["name"] == "Desk Lamp Pro"

    all_products = client.get("/products")
    assert all_products.status_code == 200
    assert len(all_products.json()) == 1

    deleted = client.delete(f"/products/{product['id']}")
    assert deleted.status_code == 204
    assert client.get(f"/products/{product['id']}").status_code == 404


def test_customer_crud_and_unique_email(client):
    customer = create_customer(client, email="ASHA@example.com")

    duplicate = client.post(
        "/customers",
        json={
            "full_name": "Asha M.",
            "email": "asha@example.com",
            "phone": "+91 11111 22222",
        },
    )
    assert duplicate.status_code == 409

    response = client.get(f"/customers/{customer['id']}")
    assert response.status_code == 200
    assert response.json()["email"] == "asha@example.com"

    deleted = client.delete(f"/customers/{customer['id']}")
    assert deleted.status_code == 204
    assert client.get(f"/customers/{customer['id']}").status_code == 404


def test_order_reduces_stock_calculates_total_and_delete_restocks(client):
    product = create_product(client, price="12.50", quantity=5)
    customer = create_customer(client)

    response = client.post(
        "/orders",
        json={
            "customer_id": customer["id"],
            "items": [{"product_id": product["id"], "quantity": 2}],
        },
    )
    assert response.status_code == 201
    order = response.json()
    assert Decimal(str(order["total_amount"])) == Decimal("25.00")
    assert Decimal(str(order["items"][0]["line_total"])) == Decimal("25.00")

    stock_response = client.get(f"/products/{product['id']}")
    assert stock_response.json()["quantity"] == 3

    insufficient = client.post(
        "/orders",
        json={
            "customer_id": customer["id"],
            "items": [{"product_id": product["id"], "quantity": 6}],
        },
    )
    assert insufficient.status_code == 409

    deleted = client.delete(f"/orders/{order['id']}")
    assert deleted.status_code == 204
    restocked = client.get(f"/products/{product['id']}")
    assert restocked.json()["quantity"] == 5


def test_request_validation(client):
    bad_product = client.post(
        "/products",
        json={
            "name": "Bad Stock",
            "sku": "BAD-1",
            "price": "3.00",
            "quantity": -1,
        },
    )
    assert bad_product.status_code == 422

    bad_customer = client.post(
        "/customers",
        json={
            "full_name": "No Email",
            "email": "not-an-email",
            "phone": "12345",
        },
    )
    assert bad_customer.status_code == 422

    bad_order = client.post("/orders", json={"customer_id": 1, "items": []})
    assert bad_order.status_code == 422

