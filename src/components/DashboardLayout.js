
// "use client";
// import { useSession, signOut } from "next-auth/react";
// import { FiLogIn } from "react-icons/fi";
// import Image from "next/image";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   AiOutlineDashboard,
//   AiOutlineUser,
//   AiOutlineFileText,
//   AiOutlineLineChart,
// } from "react-icons/ai";
// import { HiMenuAlt3 } from "react-icons/hi";
// import { FaHome } from "react-icons/fa";
// import Link from "next/link";
// import { IoBookSharp } from "react-icons/io5";
// import { usePathname } from "next/navigation";
// import logo from "../../public/BookNest.png";
// import axios from "axios";

// const DashboardLayout = ({ children }) => {
//   const pathname = usePathname();
//   const { data: session } = useSession();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const baseURL = process.env.NEXT_PUBLIC_API_URL;

//   const fetchAdminStatus = useCallback(async () => {
//     if (session) {
//       try {
//         const response = await axios.get(
//           `${baseURL}/api/user/${session?.user?.email}`
//         );
//         setIsAdmin(response?.data?.role === "admin");
//       } catch (error) {
//         console.error("Error fetching admin status:", error);
//         setIsAdmin(null);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setLoading(false);
//     }
//   }, [session, baseURL]);

//   useEffect(() => {
//     fetchAdminStatus();
//   }, [fetchAdminStatus]);

//   const toggleSidebar = useCallback(() => {
//     setIsSidebarOpen((prev) => !prev);
//   }, []);

//   const adminMenuItems = useMemo(
//     () => [
//       {
//         name: "Dashboard",
//         icon: <AiOutlineDashboard className="text-xl" />,
//         href: "/dashboard",
//       },
//       {
//         name: "Users",
//         icon: <AiOutlineUser className="text-xl" />,
//         href: "/dashboard/users",
//       },
//       {
//         name: "Books",
//         icon: <IoBookSharp className="text-xl" />,
//         href: "/dashboard/books",
//       },
//       {
//         name: "Blogs",
//         icon: <AiOutlineFileText className="text-xl" />,
//         href: "/dashboard/blogs",
//       },
//       {
//         name: "Sales",
//         icon: <AiOutlineLineChart className="text-xl" />,
//         href: "/dashboard/sales",
//       },
//     ],
//     []
//   );

//   const nonAdminMenuItems = useMemo(
//     () => [
//       {
//         name: "Dashboard",
//         icon: <AiOutlineDashboard className="text-xl" />,
//         href: "/dashboard",
//       },
//       {
//         name: "Profile",
//         icon: <AiOutlineUser className="text-xl" />,
//         href: "/dashboard/analytics",
//       },
//       {
//         name: "Analytics",
//         icon: <IoBookSharp className="text-xl" />,
//         href: "/dashboard/books",
//       },
//       {
//         name: "Cart",
//         icon: <AiOutlineFileText className="text-xl" />,
//         href: "/dashboard/cart",
//       },
//       {
//         name: "Wishlist",
//         icon: <AiOutlineLineChart className="text-xl" />,
//         href: "/dashboard/sales",
//       },
//     ],
//     []
//   );

//   const menuItems = useMemo(() => {
//     return isAdmin ? adminMenuItems : nonAdminMenuItems;
//   }, [isAdmin, adminMenuItems, nonAdminMenuItems]);

//   if (loading) {
//     return <p>Loading.......</p>; // Make sure to return here
//   }

//   return (
//     <main className="flex container mx-auto lg:max-h-screen">
//       {/* Hamburger Button for Mobile and tablet */}
//       <button
//         className="lg:hidden p-2 text-white bg-gradient-to-r from-[#F65D4E99] to-[#F65D4E] fixed z-50 w-full flex items-center justify-between"
//         onClick={toggleSidebar}
//       >
//         <Link href="/" className="normal-case text-3xl">
//           <Image
//             height={200}
//             width={200}
//             src={logo}
//             alt="BookNest Logo"
//             className="w-[120px] h-auto"
//           />
//         </Link>
//         <HiMenuAlt3 className="text-3xl" />
//       </button>
      
//       {/* Sidebar */}
//       <nav
//         className={`text-black bg-white w-full lg:w-80 lg:min-h-min py-6 font-[sans-serif] overflow-auto fixed z-10 transition-transform duration-300 transform shadow-xl mt-[70px] ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:relative lg:translate-x-0`}
//       >
//         {/* User Profile Section */}
//         <div className="flex flex-col items-center px-4">
//           <Image
//             height={200}
//             width={200}
//             src={session?.user.image || "https://i.ibb.co/XWyS1WL/d.jpg"} // Default profile image
//             className="w-12 h-12 rounded-full border-2 border-white"
//             alt="Profile"
//           />
//           <div className="mt-2 text-center">
//             <p className="text-sm mt-2">
//               {session?.user.name || "User Name"}
//             </p>
//             <p className="text-xs mt-0.5">
//               {session?.user.email || "User Email"}
//             </p>
//           </div>
//         </div>

//         {/* Sidebar Links */}
//         <ul className="mt-4">
//           {menuItems.map((item) => (
//             <li key={item.name}>
//               <Link
//                 href={item.href}
//                 className="text-gray-800 text-sm flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 border-b"
//               >
//                 <span className="font-semibold text-lg">{item.name}</span>
//                 <span>{item.icon}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//         {!session ? (
//           <Link href={"/login"}>
//             <div className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg cursor-pointer">
//               <p>Login</p>
//               <FiLogIn />
//             </div>
//           </Link>
//         ) : (
//           <div
//             onClick={() => signOut()}
//             className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg hover:underline cursor-pointer"
//           >
//             <p>Logout</p>
//             <FiLogIn />
//           </div>
//         )}
//         <Link href={"/"}>
//           <div className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E]  rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg cursor-pointer">
//             <p>Back to Home</p>
//             <FaHome />
//           </div>
//         </Link>
//       </nav>

//       {/* Main Content */}
//       <main
//         className={`flex-grow lg:p-6 transition-all duration-300 overflow-auto h-[calc(100vh-70px)] mt-20 lg:mt-0`}
//       >
//         {children}
//       </main>

//       {/* Overlay for Sidebar in Mobile View */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-5 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}
//     </main>
//   );
// };

// export default DashboardLayout;















// ............................Main Code...............................


"use client";
import { useSession, signOut } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineLineChart,
} from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import logo from "../../public/BookNest.png";
import axios from "axios";
import Loading from "../app/loading"; // Import your Loading component
import { FaHome } from "react-icons/fa";
import DashboardNavbar from "./DashboardNavbar";
import PrivateRoute from "@/services/PrivateRoute";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession(); // Also get the session status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const fetchAdminStatus = useCallback(async () => {
    if (session) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseURL}/api/user/${session?.user?.email}`
        );
        setIsAdmin(response?.data?.role === "admin");
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching admin status:", error);
        setIsAdmin(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [session, baseURL]);

  useEffect(() => {
    fetchAdminStatus();
  }, [fetchAdminStatus]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const adminMenuItems = useMemo(
    () => [
      {
        name: "Dashboard",
        icon: <AiOutlineDashboard className="text-xl" />,
        href: "/dashboard/adminDashboard",
      },
      {
        name: "Users",
        icon: <AiOutlineUser className="text-xl" />,
        href: "/dashboard/users",
      },
      {
        name: "Books",
        icon: <IoBookSharp className="text-xl" />,
        href: "/dashboard/books",
      },
      {
        name: "Blogs",
        icon: <AiOutlineFileText className="text-xl" />,
        href: "/dashboard/blogs",
      },
      {
        name: "Sales",
        icon: <AiOutlineLineChart className="text-xl" />,
        href: "/dashboard/sales",
      },
      {
        name: "Back to Home",
        icon: <FaHome className="text-xl" />,
        href: "/",
      },
    ],
    []
  );

  const nonAdminMenuItems = useMemo(
    () => [
      {
        name: "Dashboard",
        icon: <AiOutlineDashboard className="text-xl" />,
        href: "/dashboard/userProfile",
      },
      // {
      //   name: "Profile",
      //   icon: <AiOutlineUser className="text-xl" />,
      //   href: "/dashboard/userProfile",
      // },
      {
        name: "Payment History",
        icon: <AiOutlineFileText className="text-xl" />,
        href: "/dashboard/paymentHistory",
      }, // Corrected URL
      {
        name: "Wishlist",
        icon: <AiOutlineLineChart className="text-xl" />,
        href: "/dashboard/wishlists",
      },
      {
        name: "Back to Home",
        icon: <FaHome className="text-xl" />,
        href: "/",
      },
    ],
    []
  );

  const menuItems = useMemo(
    () => (isAdmin ? adminMenuItems : nonAdminMenuItems),
    [isAdmin, adminMenuItems, nonAdminMenuItems]
  );

  // If the session is undefined (loading) or checking admin status is ongoing, show the loading spinner
  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading /> {/* Full-page loading spinner */}
      </div>
    );
  }

  return (
    <PrivateRoute>
      <main className="flex">
      <button
        className="lg:hidden p-2 z-60 text-white bg-gradient-to-r from-[#F65D4E99] to-[#F65D4E] fixed z-50 w-full flex items-center justify-between"
        onClick={toggleSidebar}
      >
        <Link href="/" className="normal-case text-3xl">
          <Image
            height={200}
            width={200}
            src={logo}
            alt="BookNest Logo"
            className="w-[120px] h-auto"
          />
        </Link>
        <HiMenuAlt3 className="text-3xl" />
      </button>

      <nav
        className={`text-black bg-white w-full lg:w-80 lg:min-h-screen py-6 font-[sans-serif] overflow-auto fixed z-10 transition-transform duration-300 transform shadow-xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
        // style={{ height: "100vh", position: "sticky", top: 0 }} // Make sidebar sticky
      >
        {/* for mobile and tablet */}
        <div className="flex flex-col items-center px-4 mt-14 lg:hidden">
          <Image
            height={200}
            width={200}
            src={session?.user?.image || "https://i.ibb.co/XWyS1WL/d.jpg"}
            className="w-12 h-12 rounded-full border-2 border-white"
            alt="Profile"
          />
          <div className="mt-2 text-center">
            <p className="text-sm mt-2">{session?.user?.name || "User Name"}</p>
            <p className="text-xs mt-0.5">
              {session?.user?.email || "User Email"}
            </p>
          </div>
        </div>

        {/* for desktop */}
        <div className="lg:flex flex-col items-center px-4 mt-14 hidden">
          <Image
            height={1000}
            width={1000}
            src={logo}
            className="w-[200px]"
            alt="logo"
          />
        </div>

        <ul className="">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-gray-800 text-sm flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 border-b"
              >
                <span className="font-semibold text-lg">{item.name}</span>
                <span>{item.icon}</span>
              </Link>
            </li>
          ))}
        </ul>

        {!session ? (
          <Link href={"/login"}>
            <div className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg cursor-pointer">
              <p>Login</p>
              <FiLogIn />
            </div>
          </Link>
        ) : (
          <div
            onClick={() => signOut()}
            className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E] rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg cursor-pointer"
          >
            <p>Logout</p>
            <FiLogIn />
          </div>
        )}
      </nav>

      <main
        className={`flex-grow transition-all duration-300 overflow-y-auto lg:overflow-hidden`} // Make main content scrollable
      >
        <DashboardNavbar />
        <div className="lg:ml-16 lg:mr-10 mt-20 lg:mt-28">{children}</div>
      </main>
    </main>
    </PrivateRoute>
  );
};

export default DashboardLayout;
