const products = [
  {
    id: 1,
    name: "Gaming Mouse",
    stock: 2
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    stock: 1
  },
  {
    id: 3,
    name: "Monitor",
    stock: 4
  }
];

export default function LowStockWidget() {
  return (
    <div className="card">
      <h3>Low Stock Alerts</h3>

      {products.map((product) => (
        <div
          className="stock-row"
          key={product.id}
        >
          <span>{product.name}</span>

          <span className="danger">
            {product.stock} left
          </span>
        </div>
      ))}
    </div>
  );
}