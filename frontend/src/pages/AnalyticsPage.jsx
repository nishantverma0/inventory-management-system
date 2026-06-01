import SalesChart from "../components/analytics/SalesChart";
import InventoryPieChart from "../components/analytics/InventoryPieChart";
import OrderTrendChart from "../components/analytics/OrderTrendChart";

export default function AnalyticsPage() {
  return (
    <>
      <h1>Analytics</h1>

      <div className="analytics-grid">
        <SalesChart />
        <InventoryPieChart />
      </div>

      <OrderTrendChart />
    </>
  );
}