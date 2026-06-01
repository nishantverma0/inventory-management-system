import { useState } from "react";

export default function OrderForm() {
  const [price] = useState(5000);

  const [quantity, setQuantity] =
    useState(1);

  const total = price * quantity;

  return (
    <div className="card">
      <h3>Create Order</h3>

      <select>
        <option>Select Customer</option>
      </select>

      <select>
        <option>Select Product</option>
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            Number(e.target.value)
          )
        }
      />

      <div className="order-preview">
        <strong>
          Total: ₹{total}
        </strong>
      </div>

      <button>Create Order</button>
    </div>
  );
}