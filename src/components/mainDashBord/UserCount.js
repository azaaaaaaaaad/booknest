
"use client";
import { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";

const UserCount = () => {
  const [userCount, setUserCount] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch user count from the backend
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/users`);
        const data = await response.json();
        
        // Set the user count
        setUserCount(data.length); // Assuming `data` is an array of users
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchUserCount();
  }, [baseUrl]);

  const item = {
    value: userCount,
    title: "Total Users",
    growthRate: userCount > 100 ? 10 : -5 // Example growth rate logic
  };

  return (
    <div className="user-card p-4 border rounded shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center mb-3">
        <FaUserFriends className="text-5xl text-blue-500 mr-2" />
        <h4 className="text-heading-6 font-bold text-dark dark:text-white">
          {item.value}
        </h4>
      </div>
      <span className="text-body-sm font-medium">{item.title}</span>

      <span
        className={`flex items-center gap-1.5 text-body-sm font-medium ${
          item.growthRate > 0 ? "text-green" : "text-red"
        }`}
      >
        {item.growthRate}%
        {item.growthRate > 0 ? (
          <svg
            className="fill-current"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
              fill=""
            />
          </svg>
        ) : (
          <svg
            className="fill-current"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
              fill=""
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default UserCount;












//........................Main Code........................................

// "use client";
// import { useState, useEffect } from "react";
// import { FaUserFriends } from "react-icons/fa";
// const UserCount = () => {
//   const [users, setUsers] = useState([]);

//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;

//   // Fetch comments from the backend
//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await fetch(`${baseUrl}/api/users`);
//       const data = await response.json();

//       setUsers(data);
//     };
//     fetchUser();
//   }, [baseUrl]);

//   return (
//     <>
//       <div className="card bg-base-100 h-32 shadow-xl border-2 flex flex-col items-center justify-center">
//         <div className="flex items-center gap-8">
//           {/* <p className="font-bold text-[red]">User Information</p> */}
//           <div className="border border-solid rounded-full bg-slate-100 p-4">
//           <FaUserFriends className="text-5xl text-blue-500"/>
//           </div>
//           <div className=" border-t-slate-700">
//             <div className="text-lg font-medium">Total Users</div>
//             <div className="text-3xl font-bold">{users.length}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };



// export default UserCount;