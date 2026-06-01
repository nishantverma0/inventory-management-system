import KPISection from "../components/dashboard/KPISection";
import RevenueChart from "../components/dashboard/RevenueChart";
import LowStockWidget from "../components/dashboard/LowStockWidget";
import ActivityFeed from "../components/dashboard/ActivityFeed";

export default function DashboardPage() {
  const stats = {
    revenue: 125000,
    products: 120,
    customers: 54,
    orders: 212,
  };

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