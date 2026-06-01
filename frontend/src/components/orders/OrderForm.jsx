import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function OrderForm() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        `${API_URL}/customers`
      );

      const data = await response.json();

      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/products`
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductChange = (id) => {
    setProductId(id);

    const product = products.find(
      (p) => p.id === Number(id)
    );

    setSelectedProduct(product);
  };

  const total =
    (selectedProduct?.price || 0) *
    quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            customer_id:
              Number(customerId),

            items: [
              {
                product_id:
                  Number(productId),

                quantity:
                  Number(quantity),
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const error =
          await response.json();

        throw new Error(
          error.detail ||
            "Failed to create order"
        );
      }

      alert(
        "Order created successfully"
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <h3>Create Order</h3>

      <form onSubmit={handleSubmit}>
        <select
          value={customerId}
          onChange={(e) =>
            setCustomerId(
              e.target.value
            )
          }
          required
        >
          <option value="">
            Select Customer
          </option>

          {customers.map(
            (customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.full_name}
              </option>
            )
          )}
        </select>

        <select
          value={productId}
          onChange={(e) =>
            handleProductChange(
              e.target.value
            )
          }
          required
        >
          <option value="">
            Select Product
          </option>

          {products.map(
            (product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            )
          )}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(
                e.target.value
              )
            )
          }
          required
        />

        <div className="order-preview">
          <strong>
            Total: ₹{total}
          </strong>
        </div>

        <button type="submit">
          Create Order
        </button>
      </form>
    </div>
  );
}
