import { useState } from "react";

export default function CustomerForm() {
  const [customer, setCustomer] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(customer);

    setCustomer({
      full_name: "",
      email: "",
      phone: ""
    });
  };

  return (
    <div className="card">
      <h3>Add Customer</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={customer.full_name}
          onChange={(e) =>
            setCustomer({
              ...customer,
              full_name: e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          value={customer.email}
          onChange={(e) =>
            setCustomer({
              ...customer,
              email: e.target.value
            })
          }
        />

        <input
          placeholder="Phone"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({
              ...customer,
              phone: e.target.value
            })
          }
        />

        <button type="submit">
          Add Customer
        </button>
      </form>
    </div>
  );
}