import DashboardLayout from "@/components/DashboardLayout";
import PaymentHistory from "@/components/PaymentHistory";

const Cart = () => {
  return (
    <main>
      <DashboardLayout>
      <h1 className="text-2xl font-bold text-center mb-4 text-[#F65D4E]">This is the Payment History </h1>
      {/* Add more specific content here */}
      <PaymentHistory/>
    </DashboardLayout>
    </main>
  );
};
export default Cart;