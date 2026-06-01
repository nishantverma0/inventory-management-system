import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { month: "Jan", sales: 1000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 2500 },
  { month: "Apr", sales: 5000 }
];

export default function SalesChart() {
  return (
    <div className="card">
      <h3>Sales Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Sales"]}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#0f766e"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}