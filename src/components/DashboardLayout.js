"use client";
import { useSession, signOut } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineFileText,
  AiOutlineLineChart,
} from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import Banner from "./share/banner";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default false for mobile

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main>
      <div className="hidden lg:block">
        <Banner title="Dashboard" linkName="Home" />
      </div>
      <div className="flex container mx-auto mt-6">
        {/* Hamburger Button for Mobile and tablet */}
        <button
          className="lg:hidden p-2 text-white bg-[#F65D4E] fixed z-50 top-0 w-full flex justify-between items-center"
          onClick={toggleSidebar}
        >
          <p>Sidebar</p>
          <HiMenuAlt3 className="text-xl" />
        </button>

        {/* Sidebar */}
        <nav
          className={`text-black h-full lg:h-[650px] w-full lg:w-80 py-6 font-[sans-serif] overflow-auto fixed z-10 transition-transform duration-300 transform shadow-xl bg-white border rounded-lg ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0`}
        >
          {/* User Profile Section */}
          <div className="flex flex-col items-center px-4">
            <Image
              height={200}
              width={200}
              src={session?.user.image || "https://i.ibb.co/XWyS1WL/d.jpg"} // Default profile image
              className="w-12 h-12 rounded-full border-2 border-white"
              alt="Profile"
            />
            <div className="mt-2 text-center">
              <p className="text-sm  mt-2">
                {session?.user.name || "User Name"}
              </p>
              <p className="text-xs mt-0.5">
                {session?.user.email || "User Email"}
              </p>
            </div>
          </div>

          {/* Sidebar Links */}
          <ul className="space-y-1 mt-8">
            {[
              {
                name: "Dashboard",
                icon: <AiOutlineDashboard className="text-xl" />,
                href: "/dashboard",
              },
              {
                name: "Users",
                icon: <AiOutlineUser className="text-xl" />,
                href: "/dashboard/users",
              },
              {
                name: "Products",
                icon: <AiOutlineShoppingCart className="text-xl" />,
                href: "/dashboard/products",
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
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? " text-[#F65D4E]"
                      : "text-gray-800 "
                  } text-sm flex justify-between items-center gap-4 hover:text-[#F65D4E]  rounded px-4 py-5 transition-all lg:mx-4 border-b`}
                >
                  <span className="font-semibold text-lg">{item.name}</span>
                  <span className=" ">{item.icon}</span>
                </Link>
              </li>
            ))}
          </ul>
          {!session ? (
            <Link href={"/login"}>
              <div className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E]  rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg cursor-pointer">
                <p>Login</p>
                <FiLogIn />
              </div>
            </Link>
          ) : (
            <div
              onClick={() => signOut()}
              className="text-gray-800 flex justify-between items-center gap-4 hover:text-[#F65D4E]  rounded px-4 py-5 transition-all lg:mx-4 font-semibold text-lg hover:underline cursor-pointer"
            >
              <p>Logout</p>
              <FiLogIn />
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main
          className={`flex-grow p-6 transition-all overflow-auto duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } lg:ml-24`}
        >
          {children}
        </main>

        {/* Overlay for Sidebar in Mobile View */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-5 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </main>
  );
};

export default DashboardLayout;
