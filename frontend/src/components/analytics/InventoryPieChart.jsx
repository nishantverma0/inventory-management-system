import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Electronics",
    value: 45
  },
  {
    name: "Accessories",
    value: 35
  },
  {
    name: "Office",
    value: 20
  }
];

const COLORS = [
  "#0f766e",
  "#2563eb",
  "#f59e0b"
];

export default function InventoryPieChart() {
  return (
    <div className="card">
      <h3>Inventory Distribution</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}