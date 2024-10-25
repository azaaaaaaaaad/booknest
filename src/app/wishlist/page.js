"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import PrivateRoute from "@/services/PrivateRoute";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert2";
import Loading from "../../app/loading";

const Page = () => {
  const [wishListBook, setWishListBook] = useState({ wishList: [] });
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // Correct state declaration

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `/api/wishlists/${session?.user?.email}`
        );

        setWishListBook(response?.data?.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load wishlist!",
        });
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };

    if (session?.user?.email) {
      fetchWishlist();
    }
  }, [session?.user?.email]);

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/wishlist?id=${id}`);
        const updatedCart = wishListBook?.filter((item) => item._id !== id);
        setWishListBook(updatedCart);

        Swal.fire({
          title: "Deleted!",
          text: "Your item has been removed from the cart.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error removing item from cart:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove item from cart!",
        });
      }
    }
  };

  if (loading) {
    return <Loading />; // Display a loading message while fetching data
  }

  console.log(wishListBook);

  return (
    <>
      <Head>
        <title>BookNest | Wishlist</title>
      </Head>
      <PrivateRoute>
        <Navbar />
        <Banner title={"Your Wishlist"} linkName={"Home"}></Banner>
        <div className="mb-3">
          <div className="font-sans bg-white max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Your Wishlist ({wishListBook?.data?.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="mt-12 w-full border-collapse divide-y">
                <thead className="whitespace-nowrap text-left">
                  <tr>
                    <th className="text-base text-gray-500 font-medium p-2">
                      Description
                    </th>
                    <th className="text-base text-gray-500 font-medium p-2">
                      Rating
                    </th>
                    <th className="text-base text-gray-500 font-medium p-2">
                      Category
                    </th>
                    <th className="text-base text-gray-500 font-medium p-2">
                      Price
                    </th>
                    <th className="text-base text-gray-500 font-medium p-2">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="whitespace-nowrap divide-y">
                  {wishListBook?.length > 0 ? (
                    wishListBook?.map((c) => (
                      <tr key={c._id} className="hover:bg-gray-100 transition">
                        <td className="px-2 py-4">
                          <div className="flex items-center gap-4 w-max">
                            <div className="h-32 shrink-0">
                              <Image
                                width={80}
                                height={120}
                                src={c.image}
                                alt={c.name}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-base font-bold text-gray-800">
                                {c.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-4">
                          <span className="bg-transparent border flex items-center justify-center w-11 h-10 rounded-lg text-base p-1">
                            {c.ratings} <CiStar className="text-orange-700" />
                          </span>
                        </td>
                        <td className="px-2 py-4">{c.category}</td>
                        <td className="px-2 py-4">
                          <h4 className="text-base font-bold text-gray-800">
                            ${c.price}
                          </h4>
                        </td>
                        <td className="px-2 py-4">
                          <button
                            type="button"
                            className="bg-transparent border flex items-center justify-center w-11 h-10 rounded-lg"
                            onClick={() => handleRemove(c._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 fill-[#F65D4E] inline"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                              <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-gray-500 p-4">
                        No items in your wishlist.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Page;
