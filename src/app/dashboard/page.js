// src/app/dashboard/users/page.js
import DashboardLayout from "@/components/DashboardLayout";
// import RootLayout from "@/app/layout";
import UserCount from "@/components/mainDashBord/UserCount";
import BookCount from "@/components/mainDashBord/BooKCountPrice";
import OrderCount from "@/components/mainDashBord/OrderCountPrice";
import SaleCount from "@/components/mainDashBord/SaleCount";
const Users = () => {
  return (
   
    // <RootLayout showNavbar={false} showFooter={false}>
      <DashboardLayout>
        <div className="card bg-base-100 w-96 shadow-xl text-justify mx-10 my-5">


       
        <h3 className="text-center uppercase"> user</h3>
                <UserCount/>
        <h3 className="text-center uppercase"> BooK Summary</h3>
                <BookCount/>
        <h3 className="text-center uppercase"> BooK Order Summary</h3>
                <OrderCount/>
       <h3 className="text-center uppercase"> Sale</h3>
                <SaleCount/>
        </div>
        {/* Add more specific content here */}
      </DashboardLayout>
    // </RootLayout>
  );
};

export default Users;
