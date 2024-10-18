import DashboardLayout from "@/components/DashboardLayout";
import UserProfile from "@/components/mainDashBord/UserProfile";
export default function page() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-center mb-4 text-[#F65D4E]">
          User Profile
        </h1>

        <UserProfile />
      </div>
    </DashboardLayout>
  );
}
