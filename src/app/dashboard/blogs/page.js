// src/app/dashboard/insight/page.js
// import RootLayout from "@/app/layout";
import DashboardLayout from "@/components/DashboardLayout";
import BlogTable from "@/components/mainDashBord/AllBlogs";

const Blogs = () => {
  return (
    // <RootLayout showNavbar={false}  showFooter={false}>
    <DashboardLayout>
     <h1 className="text-2xl font-bold text-center mb-4 text-[#F65D4E]">This is Blogs </h1>
      <BlogTable />
    </DashboardLayout>
    // </RootLayout>
  );
};

export default Blogs;
