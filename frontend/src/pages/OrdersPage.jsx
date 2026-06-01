import OrderForm from "../components/orders/OrderForm";
import OrderTable from "../components/orders/OrderTable";
import OrderSummary from "../components/orders/OrderSummary";

export default function OrdersPage() {
  return (
    <>
      <h1>Orders</h1>

      <OrderSummary />

      <OrderForm />

      <OrderTable />
    </>
  );
}