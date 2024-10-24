import DashboardLayout from "@/components/DashboardLayout";
import UserProfile from "@/components/mainDashBoard/UserProfile";
export default function page() {
  return (
    <DashboardLayout>
      <div>
        <UserProfile />
      </div>
    </DashboardLayout>
  );
}
