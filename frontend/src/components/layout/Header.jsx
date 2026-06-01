import {
  Search,
  Bell,
  Moon,
  Sun,
} from "lucide-react";

export default function Header({
  darkMode,
  setDarkMode,
}) {
  return (
    <header className="header">
      <div className="search-area">
        <Search size={18} />

        <input
          placeholder="Search products, customers..."
        />
      </div>

      <div className="header-actions">
        <button className="icon-btn">
  <Bell size={18} />
</button>

<button
  className="icon-btn"
  onClick={() =>
    setDarkMode(!darkMode)
  }
>
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>
      </div>
    </header>
  );
}
