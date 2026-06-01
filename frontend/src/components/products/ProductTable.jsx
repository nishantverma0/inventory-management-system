const products = [
  {
    id: 1,
    name: "Laptop",
    sku: "LP001",
    price: 50000,
    stock: 10
  },
  {
    id: 2,
    name: "Mouse",
    sku: "MS001",
    price: 500,
    stock: 3
  }
];

export default function ProductTable() {
  return (
    <div className="card">
      <h3>Products</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}