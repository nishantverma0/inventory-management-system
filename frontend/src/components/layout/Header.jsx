import {
  Search,
  Bell,
  Moon
} from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="search-area">
        <Search size={18} />

        <input
          placeholder="Search products, customers..."
        />
      </div>

      <div className="header-actions">
        <button>
          <Bell size={18} />
        </button>

        <button>
          <Moon size={18} />
        </button>
      </div>
    </header>
  );
}