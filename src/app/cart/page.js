"use client";
import CartComponent from "@/components/CartComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Banner from "@/components/share/banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useSession } from "next-auth/react";
import PrivateRoute from "@/services/PrivateRoute";

export default function CartPage() {
  const [cartBook, setCartBook] = useState({ cart: [] });
  const [loading, setLoading] = useState(true); // Loading state
  const { data: session } = useSession();

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true); // Start loading

      try {
        const response = await axios.get(`/api/carts/${session?.user?.email}`);
        setCartBook(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load wishlist!",
        });
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchWishlist();
  }, [session?.user?.email]);

  return (
    <>
      <Head>
        <title>BookNest | Cart</title>
      </Head>
      <PrivateRoute>
        <Navbar />
        <Banner title="Shopping Cart" linkName="Home" />
        {/* Loader inside the cart section */}
        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-[#F65D4E] animate-spin"></div>
              </div>
            </div>
          ) : (
            <CartComponent cartBook={cartBook} setCartBook={setCartBook} />
          )}
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
}
