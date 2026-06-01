import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        `${API_URL}/customers`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch customers"
        );
      }

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load customers");
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/customers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete customer"
        );
      }

      fetchCustomers();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="card">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Customer List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="4">
                No customers found
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  {customer.full_name}
                </td>

                <td>
                  {customer.email}
                </td>

                <td>
                  {customer.phone}
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteCustomer(
                        customer.id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
