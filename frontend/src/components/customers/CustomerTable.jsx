const customers = [
  {
    id: 1,
    full_name: "John Doe",
    email: "john@example.com",
    phone: "9876543210"
  },
  {
    id: 2,
    full_name: "Jane Smith",
    email: "jane@example.com",
    phone: "9988776655"
  }
];

export default function CustomerTable() {
  return (
    <div className="card">
      <h3>Customer List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.full_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}