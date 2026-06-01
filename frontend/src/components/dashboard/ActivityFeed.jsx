const activities = [
  "Product Added",
  "Customer Created",
  "Order #101 Created",
  "Inventory Updated",
  "Order #102 Completed"
];

export default function ActivityFeed() {
  return (
    <div className="card">
      <h3>Recent Activity</h3>

      {activities.map((item, index) => (
        <div
          key={index}
          className="activity-item"
        >
          • {item}
        </div>
      ))}
    </div>
  );
}