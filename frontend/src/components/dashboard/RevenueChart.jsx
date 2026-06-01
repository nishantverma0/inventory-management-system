import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadRevenue();
  }, []);

  async function loadRevenue() {
    try {
      const response = await fetch(
        `${API_URL}/orders`
      );

      const orders = await response.json();

      const revenue = [
        { day: "Orders", revenue: 0 },
      ];

      orders.forEach((order) => {
        revenue.push({
          day: `#${order.id}`,
          revenue:
            order.total_amount || 0,
        });
      });

      setData(revenue);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card">
      <h3>Revenue Trend</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
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
