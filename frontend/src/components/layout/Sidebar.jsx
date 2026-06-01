import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3
} from "lucide-react";

const menu = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "products", label: "Products", icon: Package },
  { key: "customers", label: "Customers", icon: Users },
  { key: "orders", label: "Orders", icon: ShoppingCart },
  { key: "analytics", label: "Analytics", icon: BarChart3 }
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>StockFlow AI</h2>
        <p>Inventory Intelligence</p>
      </div>

      <nav>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={
                page === item.key
                  ? "nav-btn active"
                  : "nav-btn"
              }
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}