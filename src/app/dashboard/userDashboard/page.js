import DashboardLayout from "@/components/DashboardLayout";
import UserCount from "@/components/mainDashBord/UserCount";
import BookCount from "@/components/mainDashBord/BooKCountPrice";
import Head from "next/head";
import SaleCount from "@/components/mainDashBord/SaleCount";
import BlogCount from "@/components/mainDashBord/BlogCount";

const UserDashboard = () => {
  return (
    <>
      <Head>
        <title>BookNest | User Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UserCount className=" col-span-1" />
          <BookCount className=" col-span-1" />
          <SaleCount className=" col-span-1" />
          <BlogCount className=" col-span-1" />
        </div>
        {/* Add more specific content here */}
      </DashboardLayout>
    </>
  );
};

export default UserDashboard;