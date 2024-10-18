"use client"; // Make sure this is a client component
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import logo from "../../public/BookNest.png";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [wishlistResponse, cartResponse] = await Promise.all([
          axios.get(`/api/wishlists/${session?.user?.email}`),
          axios.get(`/api/carts/${session?.user?.email}`),
        ]);

        setWishlistCount(wishlistResponse.data.wishList.length);
        setCartCount(cartResponse.data.cart.length);
        router.refresh();

        setWishlistCount(wishlistResponse?.data?.length);
        setCartCount(cartResponse?.data?.length);
        router.refresh();

      } catch (error) {
        console.error("Error fetching counts:", error);
        setError("Failed to load counts.");
      } finally {
        setLoading(false);
      }
    };
    router.refresh()
    fetchCounts(); // Fetch counts once when component mounts
  }, [session?.user?.email, router]);
  

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navlinks = [
    { label: "Home", link: "/" },
    { label: "Books", link: "/books" },
    { label: "Blogs", link: "/blogs" },
    { label: "Contact", link: "/contact" },
    { label: "About", link: "/about" },
  ];

  return (
    <nav className="sticky navbar justify-between bg-none">
      <div className="container mx-auto">
        {/* Desktop View */}
        <div className="navbar hidden lg:flex items-center">
          <Link href="/" className="normal-case text-3xl">
            <Image
              height={200}
              width={200}
              src={logo}
              alt="BookNest Logo"
              className="w-[160px] h-auto"
            />
          </Link>
          <ul className="navbar justify-end menu menu-horizontal px-1 text-xl ">
            {navlinks.map((navlink, index) => (
              <li key={index}>
                <Link
                  href={navlink.link}
                  className={`${
                    pathname === navlink.link
                      ? "border-b-2 bg-white border-b-[#F65D4E] rounded-b-lg rounded text-white"
                      : ""
                  } px-3 py-2 bg-white hover:bg-white hover:border-white hover:rounded-b-lg hover:border-b-2 hover:border-b-[#F65D4E] hover:rounded transition-transform`}
                >
                  {navlink.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* get subscription button */}
        <div className="navbar-end hidden lg:flex relative">
          <Link href="/subscription">
            <button className="btn btn-outline border-[#F65D4E] mr-2 hover:bg-[#F65D4E] hover:border-[#F65D4E]">
              Get Subscription
            </button>
          </Link>
          <Link href="/wishlist" className="btn btn-ghost text-xl relative">
            <FaHeart className="text-2xl" />
            {loading ? (
              <span className="loading-spinner" /> // You can replace this with a spinner or loader component
            ) : error ? (
              <span className="text-[#F65D4E]">!</span> // Or any error indication
            ) : (
              wishlistCount > 0 && (
                <span className="absolute top-1 right-2 bg-[#F65D4E] text-white rounded-full px-1 text-xs transform translate-x-1 -translate-y-1">
                  {wishlistCount}
                </span>
              )
            )}
          </Link>
          <Link href="/cart" className="btn btn-ghost text-xl relative">
            <FaShoppingCart className="text-2xl" />
            {loading ? (
              <span className="loading-spinner" /> // You can replace this with a spinner or loader component
            ) : error ? (
              <span className="text-[#F65D4E]">!</span> // Or any error indication
            ) : (
              cartCount > 0 && (
                <span className="absolute top-1 right-2 bg-[#F65D4E] text-white rounded-full px-1 text-xs transform translate-x-1 -translate-y-1">
                  {cartCount}
                </span>
              )
            )}
          </Link>
          {!session?.user ? (
            <Link href="/login">
              <button className="btn btn-ghost text-xl">
                <MdAccountCircle className="text-2xl" />
              </button>
            </Link>
          ) : (
            <div className="relative ml-4">
              <button className="text-xl" onClick={toggleDropdown}>
                {session.user.image || session.user.photo ? (
                  <Image
                    src={session.user.image || session.user.photo}
                    alt="User Image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <MdAccountCircle className="text-2xl" />
                )}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl z-20">
                  <Link href="/dashboard">
                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Dashboard
                    </button>
                  </Link>

                  <Link href="/chat">
                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Chat
                    </button>
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Tablet and Mobile View */}
        <div className="lg:hidden flex justify-between w-full">
          {/* Website logo in navbar */}
          <Link href="/" className="normal-case text-3xl">
            <Image
              height={200}
              width={200}
              src={logo}
              alt="BookNest Logo"
              className="w-[120px] h-auto"
            />
          </Link>
          {/* navbar right side drawer and  photo*/}
          {!session?.user ? (
            <button onClick={toggleSidebar} className="btn btn-ghost text-xl">
              <RxHamburgerMenu className="text-3xl" />
            </button>
          ) : (
            <div className="relative">
              <button className="text-xl" onClick={toggleSidebar}>
                {session.user.image || session.user.photo ? (
                  <Image
                    src={session.user.image || session.user.photo}
                    alt="User Image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <MdAccountCircle className="text-3xl" />
                )}
              </button>
            </div>
          )}
        </div>
        {/* Sidebar for Mobile and Tablet */}
        {isOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
            <div className="fixed left-0 top-0 h-full bg-white z-50 p-5 transition-transform">
              <button
                className="btn btn-ghost text-xl mb-5"
                onClick={toggleSidebar}
              >
                <IoCloseOutline className="text-4xl" />
              </button>
              <ul className="menu flex flex-col text-lg font-bold space-y-4">
                {navlinks.map((navlink, index) => (
                  <>
                    <Link
                      href={navlink.link}
                      className={`${
                        pathname === navlink.link ? " text-[#F65D4E]" : ""
                      }`}
                      onClick={toggleSidebar}
                    >
                      <div className="flex justify-between items-center border-b pb-4 gap-20">
                        <li key={index}>{navlink.label}</li>
                        <div>
                          <IoIosArrowForward className="text-xl font-bold" />
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
              </ul>

              <ul className="menu flex flex-col text-lg font-bold space-y-4">
                <Link
                  href="/dashboard"
                  onClick={toggleSidebar}
                  className={`${
                    pathname === "/dashboard" ? " text-[#F65D4E]" : ""
                  } flex justify-between items-center border-b pb-4`}
                >
                  <li>Dashboard</li>
                  <div>
                    <IoIosArrowForward className="text-xl font-bold" />
                  </div>
                </Link>
              </ul>
              <ul className="menu flex flex-col text-lg font-bold space-y-4">
                <Link
                  href="/wishlist"
                  onClick={toggleSidebar}
                  className={`${
                    pathname === "/wishlist" ? " text-[#F65D4E]" : ""
                  } flex justify-between items-center border-b pb-4`}
                >
                  <li>Wishlist</li>
                  <div>
                    <IoIosArrowForward className="text-xl font-bold" />
                  </div>
                </Link>
              </ul>
              <ul className="menu flex flex-col text-lg font-bold space-y-4">
                <Link
                  href="/cart"
                  onClick={toggleSidebar}
                  className={`${
                    pathname === "/cart" ? " text-[#F65D4E]" : ""
                  } flex justify-between items-center border-b pb-4`}
                >
                  <li>Cart</li>
                  <div>
                    <IoIosArrowForward className="text-xl font-bold" />
                  </div>
                </Link>
              </ul>
              {/* Account Dropdown for Mobile/Tablet */}
              {!session?.user ? (
                <ul className="menu flex flex-col text-lg font-bold space-y-4">
                  <Link
                    href="/login"
                    onClick={toggleSidebar}
                    className={`${
                      pathname === "/login" ? " text-[#F65D4E]" : ""
                    } flex justify-between items-center border-b pb-4`}
                  >
                    <li>Login</li>
                    <div>
                      <IoIosArrowForward className="text-xl font-bold" />
                    </div>
                  </Link>
                </ul>
              ) : (
                <ul className="menu flex flex-col text-lg font-bold space-y-4">
                  <div
                    href="/login"
                    onClick={() => signOut()}
                    className={`${
                      pathname === "/login" ? " text-[#F65D4E]" : ""
                    } flex justify-between items-center border-b pb-4`}
                  >
                    <li>Logout</li>
                    <div>
                      <IoIosArrowForward className="text-xl font-bold" />
                    </div>
                  </div>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
