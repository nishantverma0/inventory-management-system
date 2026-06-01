import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({
  page,
  setPage,
  children,
  darkMode,
  setDarkMode,
}) {
  return (
    <div className="layout">
      <Sidebar
        page={page}
        setPage={setPage}
      />

      <div className="content">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main>{children}</main>
      </div>
    </div>
  );
}
