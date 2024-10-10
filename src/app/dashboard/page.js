// // src/app/dashboard/users/page.js
// import DashboardLayout from "@/components/DashboardLayout";
// // import RootLayout from "@/app/layout";

// const Users = () => {
//   return (
//     // <RootLayout showNavbar={false} showFooter={false}>
//     <DashboardLayout>
//       <h1 className="text-2xl font-bold">This is the main dashboard</h1>
//       <p>This is the dashboard page content.</p>
//       {/* Add more specific content here */}
//     </DashboardLayout>
//     // </RootLayout>
//   );
// };

// export default Users;


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
        <div className="card bg-base-100 w-96 shadow-xl text-justify mx-10 my-5 font-sans">


       
        <h3 className="text-center uppercase divide-y divide-gray-200 font-bold text-[red]"> user</h3>
                <UserCount/>
        <h3 className="text-center uppercase font-bold text-[red]"> BooK Summary</h3>
                <BookCount/>
        <h3 className="text-center uppercase font-bold text-[red]"> BooK Order Summary</h3>
                <OrderCount/>
       <h3 className="text-center uppercase font-bold text-[red]"> Sale</h3>
                <SaleCount/>
        </div>
        {/* Add more specific content here */}
      </DashboardLayout>

    <DashboardLayout>
      <h1 className="text-2xl font-bold">This is the main dashboard</h1>
      <p>This is the dashboard page content.</p>
      {/* Add more specific content here */}
    </DashboardLayout>

    // </RootLayout>
  );
};

export default Users;

