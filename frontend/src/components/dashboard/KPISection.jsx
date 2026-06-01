export default function KPISection({ stats }) {
  const cards = [
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`
    },
    {
      title: "Products",
      value: stats.products
    },
    {
      title: "Customers",
      value: stats.customers
    },
    {
      title: "Orders",
      value: stats.orders
    }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card) => (
        <div className="kpi-card" key={card.title}>
          <h4>{card.title}</h4>
          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}