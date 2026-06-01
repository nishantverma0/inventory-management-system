import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", revenue: 5000 },
  { day: "Tue", revenue: 7000 },
  { day: "Wed", revenue: 4500 },
  { day: "Thu", revenue: 10000 },
  { day: "Fri", revenue: 8500 },
  { day: "Sat", revenue: 12000 },
  { day: "Sun", revenue: 9000 }
];

export default function RevenueChart() {
  return (
    <div className="card">
      <h3>Revenue Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}