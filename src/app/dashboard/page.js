"use client";
import DashboardLayout from "@/components/DashboardLayout";
import dynamic from "next/dynamic";
import Head from "next/head";

const BarCharts = dynamic(() => import("@/components/mainDashBord/BarCharts"), {
  ssr: false,
});
const ProfitChart = dynamic(
  () => import("@/components/mainDashBord/ProfitChart"),
  { ssr: false }
);
const UserCount = dynamic(() => import("@/components/mainDashBord/UserCount"), {
  ssr: false,
});
const BookCount = dynamic(
  () => import("@/components/mainDashBord/BooKCountPrice"),
  { ssr: false }
);
const SaleCount = dynamic(() => import("@/components/mainDashBord/SaleCount"), {
  ssr: false,
});
const BlogCount = dynamic(() => import("@/components/mainDashBord/BlogCount"), {
  ssr: false,
});

const Users = () => {
  return (
    <>
      <Head>
        <title>BookNest | Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <UserCount className=" col-span-1" />
          <BookCount className=" col-span-1" />
          <SaleCount className=" col-span-1" />
          <BlogCount className=" col-span-1" />
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5 text-black">
          <BarCharts totalPrice={100000} /> {/* Pass totalPrice as needed */}
          <ProfitChart />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Users;
