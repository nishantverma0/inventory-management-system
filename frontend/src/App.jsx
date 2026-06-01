import { useState, useEffect } from "react";

import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const renderPage = () => {
    switch (page) {
      case "products":
        return <ProductsPage />;

      case "customers":
        return <CustomersPage />;

      case "orders":
        return <OrdersPage />;

      case "analytics":
        return <AnalyticsPage />;

      default:
        return <DashboardPage />;
    }
  };

  return (
    <Layout
      page={page}
      setPage={setPage}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      {renderPage()}
    </Layout>
  );
}
