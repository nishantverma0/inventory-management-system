import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";

export default function CustomersPage() {
  return (
    <>
      <h1>Customers</h1>

      <CustomerForm />

      <CustomerTable />
    </>
  );
}