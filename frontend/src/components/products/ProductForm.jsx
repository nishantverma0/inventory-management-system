import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            sku: form.sku,
            price: Number(form.price),
            quantity: Number(
              form.quantity
            ),
          }),
        }
      );

      if (!response.ok) {
        const error =
          await response.json();

        throw new Error(
          error.detail ||
            "Failed to create product"
        );
      }

      const data =
        await response.json();

      alert(
        `Product "${data.name}" added successfully`
      );

      setForm({
        name: "",
        sku: "",
        price: "",
        quantity: "",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Add Product</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Adding..."
            : "Add Product"}
        </button>
      </form>
    </div>
  );
}
