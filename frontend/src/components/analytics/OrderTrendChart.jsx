import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    day: "Mon",
    orders: 8
  },
  {
    day: "Tue",
    orders: 12
  },
  {
    day: "Wed",
    orders: 15
  },
  {
    day: "Thu",
    orders: 7
  },
  {
    day: "Fri",
    orders: 20
  }
];

export default function OrderTrendChart() {
  return (
    <div className="card">
      <h3>Order Trend</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="orders"
            fill="#0f766e"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}