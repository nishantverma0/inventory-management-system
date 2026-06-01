import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({
  page,
  setPage,
  children
}) {
  return (
    <div className="layout">
      <Sidebar
        page={page}
        setPage={setPage}
      />

      <div className="content">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}