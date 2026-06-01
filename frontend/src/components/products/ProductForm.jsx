import { useState } from "react";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className="card">
      <h3>Add Product</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) =>
            setForm({
              ...form,
              sku: e.target.value
            })
          }
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value
            })
          }
        />

        <input
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value
            })
          }
        />

        <button>Add Product</button>
      </form>
    </div>
  );
}