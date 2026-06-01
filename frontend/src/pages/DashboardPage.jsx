import { useEffect, useState } from "react";
import KPISection from "../components/dashboard/KPISection";
import RevenueChart from "../components/dashboard/RevenueChart";
import LowStockWidget from "../components/dashboard/LowStockWidget";
import ActivityFeed from "../components/dashboard/ActivityFeed";

const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
  const [stats, setStats] = useState({
    revenue: 0,
    products: 0,
    customers: 0,
    orders: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [productsRes, customersRes, ordersRes] =
        await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/customers`),
          fetch(`${API_URL}/orders`),
        ]);

      const products = await productsRes.json();
      const customers = await customersRes.json();
      const orders = await ordersRes.json();

      const revenue = orders.reduce(
        (sum, order) =>
          sum + (order.total_amount || 0),
        0
      );

      setStats({
        revenue,
        products: products.length,
        customers: customers.length,
        orders: orders.length,
      });
    } catch (error) {
      console.error("Dashboard load failed", error);
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>Inventory Intelligence</h1>
        <p>Real-time business overview</p>
      </div>

      <KPISection stats={stats} />

      <div className="dashboard-grid">
        <RevenueChart />
        <LowStockWidget />
      </div>

      <ActivityFeed />
    </>
  );
}
