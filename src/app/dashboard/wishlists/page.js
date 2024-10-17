import DashboardLayout from "@/components/DashboardLayout";
import Wishlist from "@/components/Wishlists";

const Wishlists = () => {
  return (
    <main>
      <DashboardLayout>
      <h1 className="text-2xl font-bold text-center mb-4 text-[#F65D4E]">This is the Wishlist List </h1>
      {/* Add more specific content here */}
      <Wishlist></Wishlist>
    </DashboardLayout>
    </main>
  );
};
export default Wishlists;