"use client"; // Make sure this is Link client component
import { useState, useEffect, useCallback } from "react";
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
  const [userProfile, setUserProfile] = useState(null)
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [wishlistResponse, cartResponse] = await Promise.all([
          axios.get(`/api/wishlists/${session?.user?.email}`),
          axios.get(`/api/carts/${session?.user?.email}`),
        ]);
        setWishlistCount(wishlistResponse?.data?.length);
        setCartCount(cartResponse?.data?.length);
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
    router.refresh();
    fetchCounts(); // Fetch counts once when component mounts
  }, [session?.user?.email, router]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      // Redirect to books page with search query
      router.push(`/books?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  const navlinks = [
    { label: "Home", link: "/" },
    { label: "Books", link: "/books" },
    { label: "Blogs", link: "/blogs" },
    { label: "Contact", link: "/contact" },
    { label: "About", link: "/about" },
  ];

  const fetchAdminStatus = useCallback(async () => {
    if (session) {
      try {
        const response = await axios.get(
          `${baseURL}/api/user/${session?.user?.email}`
        );
        setUserProfile(response?.data)
        setIsAdmin(response?.data?.role === "admin");
        setLoading(true);
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

  return (
    <main className="fixed top-0 mb-10 left-0 right-0 w-full shadow-md bg-white tracking-wide z-50 font-poppins">
      <nav className=" container mx-auto">
      <section className="flex items-center flex-wrap lg:justify-center gap-4 py-3 sm:px-10 border-gray-200 border-b min-h-[75px] container mx-auto relative">
        <Link href="/" className="left-0 absolute z-30">
          <Image
            width={1000}
            height={1000}
            src={logo}
            alt="logo"
            className="md:w-[170px] w-32 -ml-4"
          />
        </Link>

        <div>
          <div className="bg-gray-100 flex px-4 py-3 rounded-3xl max-lg:hidden">
            <input
              type="text"
              className="outline-none bg-transparent text-sm w-80"
              placeholder="Search books, categories, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="-mr-6" type="submit" onClick={handleSearch}>
              {/* Trigger search on button click */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="20px"
                className="cursor-pointer fill-gray-400 mr-6 rotate-90 inline-block"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="lg:absolute lg:right-0 lg:flex items-center gap-8 hidden">
          <Link href="/wishlist">
            <span className="relative">
              <FaHeart className="text-[30px] text-black cursor-pointer fill-[#333] hover:fill-[#F65D4E] inline-block" />
              {wishlistCount > 0 && (
                <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">
                  {wishlistCount}
                </span>
              )}
            </span>
          </Link>
          <Link href="/checkout">
            <span className="relative">
              <FaShoppingCart className="text-[30px] text-black cursor-pointer fill-[#333] hover:fill-[#F65D4E] inline-block" />
              {cartCount > 0 && (
                <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
          <div className="inline-block cursor-pointer border-gray-300">
            {!session?.user ? (
              <Link href="/login">
                <MdAccountCircle className="text-3xl cursor-pointer fill-[#333] hover:fill-[#F65D4E] inline-block" />
              </Link>
            ) : (
              <div className="relative ml-3">
                <button className="text-xl" onClick={toggleDropdown}>
                  { userProfile?.image || userProfile?.photo ? (
                    <Image
                      src={userProfile?.image || userProfile?.photo}
                      alt="User Image"
                      width={40}
                      height={40}
                      className="rounded-full h-10 w-10 object-cover"
                    />
                  ) : (
                    <MdAccountCircle className="text-3xl cursor-pointer fill-[#333] hover:fill-[#F65D4E] inline-block" />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl z-20">
                    {isAdmin ? (
                      <Link href="/dashboard/adminDashboard">
                        <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                          Dashboard
                        </button>
                      </Link>
                    ) : (
                      <Link href="/dashboard/userDashboard">
                        <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                          Dashboard
                        </button>
                      </Link>
                    )}
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
        </div>
      </section>

      <div className="lg:flex flex-wrap justify-center px-10 py-3 lg:relative hidden">
        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="max-lg:border-b max-lg:pb-4 px-3 lg:hidden">
              <Link href="javascript:void(0)">
                <Image
                  width={500}
                  height={500}
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </Link>
            </li>
            {navlinks.map((navlink, index) => (
              <li key={index}>
                <Link
                  href={navlink.link}
                  className={`${
                    pathname === navlink.link
                      ? "  text-[#F65D4E] "
                      : "text-gray-600"
                  } px-3 py-2 font-semibold text-[15px] hover:text-[#F65D4E] transition-transform  `}
                >
                  {navlink.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
      </div>
      <div className="flex flex-wrap justify-end items-center absolute w-full top-4">
        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden md:mr-4">
          <button onClick={toggleSidebar}>
            {isOpen ? (
              // <IoCloseOutline className="w-7 h-7" />
              <></>
            ) : (
              <>
                {userProfile?.image || userProfile?.photo ? (
                  <button className="text-xl" onClick={toggleDropdown}>
                    {session.user.image || session.user.photo ? (
                      <Image
                        src={userProfile?.image || userProfile?.photo}
                        alt="User Image"
                        width={40}
                        height={40}
                        className="rounded-full h-12 w-12 object-cover"
                      />
                    ) : (
                      <MdAccountCircle className="text-3xl cursor-pointer fill-[#333] hover:fill-[#F65D4E] inline-block" />
                    )}
                  </button>
                ) : (
                  <RxHamburgerMenu className="w-10 h-10" />
                )}
              </>
            )}
          </button>
        </div>
        {/* Sidebar Content */}
        {isOpen && (
          <div className="inset-0 bg-gray-800 bg-opacity-50">
            <div className="right-0 top-0 h-screen bg-white shadow-xl z-50 p-5 transition-transform -mt-2">
              <button
                className="btn btn-ghost text-xl mb-5 ml-36"
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
                  href="/checkout"
                  onClick={toggleSidebar}
                  className={`${
                    pathname === "/checkout" ? " text-[#F65D4E]" : ""
                  } flex justify-between items-center border-b pb-4`}
                >
                  <li>Checkout</li>
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
    </main>
  );
};

export default Navbar;
