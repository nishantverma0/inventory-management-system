import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function OrderSummary() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${API_URL}/orders`
        );

        if (!response.ok) {
          throw new Error();
        }

        const orders = await response.json();

        const revenue = orders.reduce(
          (sum, order) =>
            sum +
            Number(
              order.total_amount || 0
            ),
          0
        );

        setStats({
          totalOrders: orders.length,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h4>Total Orders</h4>
        <h2>{stats.totalOrders}</h2>
      </div>

      <div className="stat-card">
        <h4>Total Revenue</h4>
        <h2>
          ₹
          {stats.totalRevenue.toLocaleString()}
        </h2>
      </div>

      <div className="stat-card">
        <h4>Backend Status</h4>
        <h2>Connected</h2>
      </div>
    </div>
  );
}
