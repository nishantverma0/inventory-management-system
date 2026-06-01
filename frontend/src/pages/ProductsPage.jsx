import ProductForm from "../components/products/ProductForm";
import ProductStats from "../components/products/ProductStats";
import ProductTable from "../components/products/ProductTable";

export default function ProductsPage() {
  return (
    <>
      <h1>Products</h1>

      <ProductStats />

      <ProductForm />

      <ProductTable />
    </>
  );
}