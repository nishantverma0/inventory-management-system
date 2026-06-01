import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${API_URL}/orders`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch orders"
        );
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete order"
        );
      }

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="card">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Order List</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>

                <td>
                  {order.customer_id}
                </td>

                <td>
                  ₹{order.total_amount}
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteOrder(order.id)
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
