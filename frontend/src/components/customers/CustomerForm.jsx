import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function CustomerForm() {
  const [customer, setCustomer] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.detail || "Failed to create customer"
        );
      }

      const data = await response.json();

      alert(
        `Customer "${data.full_name}" created successfully`
      );

      setCustomer({
        full_name: "",
        email: "",
        phone: "",
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
      <h3>Add Customer</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={customer.full_name}
          onChange={(e) =>
            setCustomer({
              ...customer,
              full_name: e.target.value,
            })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={(e) =>
            setCustomer({
              ...customer,
              email: e.target.value,
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({
              ...customer,
              phone: e.target.value,
            })
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Adding..."
            : "Add Customer"}
        </button>
      </form>
    </div>
  );
}
