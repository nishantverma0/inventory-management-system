const orders = [
  {
    id: 101,
    customer: "John Doe",
    total: 25000,
    status: "Delivered"
  },
  {
    id: 102,
    customer: "Jane Smith",
    total: 15000,
    status: "Pending"
  }
];

export default function OrderTable() {
  return (
    <div className="card">
      <h3>Order List</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>₹{order.total}</td>

              <td>
                <span
                  className={
                    order.status ===
                    "Delivered"
                      ? "badge-success"
                      : "badge-warning"
                  }
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}