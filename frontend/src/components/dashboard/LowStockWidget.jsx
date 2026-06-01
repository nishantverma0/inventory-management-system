import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function LowStockWidget() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    loadLowStock();
  }, []);

  async function loadLowStock() {
    try {
      const response = await fetch(
        `${API_URL}/products`
      );

      const data =
        await response.json();

      const lowStockProducts =
        data.filter(
          (product) =>
            product.quantity_in_stock <=
            5
        );

      setProducts(lowStockProducts);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card">
      <h3>Low Stock Alerts</h3>

      {products.length === 0 ? (
        <p>
          No low stock products 🎉
        </p>
      ) : (
        products.map((product) => (
          <div
            className="stock-row"
            key={product.id}
          >
            <span>
              {product.name}
            </span>

            <span className="danger">
              {
                product.quantity_in_stock
              }{" "}
              left
            </span>
          </div>
        ))
      )}
    </div>
  );
}
