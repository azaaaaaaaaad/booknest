


import DashboardLayout from "@/components/DashboardLayout";
import UserCount from "@/components/mainDashBord/UserCount";
import BookCount from "@/components/mainDashBord/BooKCountPrice";

import SaleCount from "@/components/mainDashBord/SaleCount";
import BlogCount from "@/components/mainDashBord/BlogCount";
const Users = () => {
  return (

<>

<DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">


       
        
                <UserCount/>
       
                <BookCount/>
        
               
    
                <SaleCount/>

                <BlogCount/>
        </div>
        {/* Add more specific content here */}
      </DashboardLayout>

   
</>


  );
};

export default Users;

