import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import Link from "next/link";
import { FaDollarSign } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { debounce } from "lodash"; // Import lodash debounce

export default function BooksCard({ book }) {
  const {
    name,
    image,
    price,
    category,
    ratings,
    _id,
    publishType,
    cardCount,
    quantity,
  } = book;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { data: session } = useSession();
  const [stock, setStock] = useState(null);
  const [totalQuantitiesCache, setTotalQuantitiesCache] = useState({});
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  //useEffect(() => {
  //if (!stock) {
  //   const fetchTotalQuantity = async () => {
  //   const response = await fetch(
  //      `${baseUrl}/api/payments-total-quantity?blogId=${_id}`
  //  );
  //   const data = await response.json();
  //   const status = quantity - data > 0 ? "Stock In" : "Stock Out";
  // setStock(status);
  //  };
  //  fetchTotalQuantity();
  //}
  //}, [stock, baseUrl, _id, quantity]); /}

  const addToBookmark = async () => {
    if (isBookmarked) {
      Swal.fire({
        icon: "info",
        title: "Already Bookmarked",
        text: `${name} is already in your bookmarks!`,
      });
      return;
    }

    try {
      const response = await axios.post(
        `/api/wishlists/${session.user.email}`,
        {
          name,
          BookId: book._id,
          description: book.description || "",
          image,
          author: book.author || "",
          price,
          rating: ratings,
          category,
          cardCount,
          email: session?.user?.email,
          cardCount,
        }
      );

      if (response.status === 201) {
        setIsBookmarked(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added to bookmarks!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to bookmark:", error);
      const message =
        error.response?.data?.message || "Failed to add to bookmarks!";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    }
  };

  const addToCart = async () => {
    if (isInCart) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `${name} is already in your cart!`,
      });
      return;
    }

    try {
      const response = await axios.post(`/api/carts/${session.user.email}`, {
        name,
        BookId: book._id, // Updated this from bookId to _id
        description: book.description || "",
        image,
        author: book.author || "",
        price,
        rating: ratings,
        category,
        cardCount,
        email: session?.user?.email, // Ensure this is not undefined
      });

      if (response.status === 201) {
        setIsInCart(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added to cart!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      const message = error.response?.data?.message || "Failed to add to cart!";

      if (error.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already in Cart",
          text: message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });
      }
    }
  };

  return (
    <div className="transition h-fit duration-500 w-full font-sans overflow-hidden mx-auto mt-4 pl-4 pt-4">
      {/* Full Height Image */}
      <div className="w-full h-60 md:h-80 lg:h-52 relative group">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
        {/* Bookmark and Cart Icons */}
        <div>
          <button
            onClick={addToBookmark}
            className={`cursor-pointer absolute bottom-16 right-2 p-2 rounded-full bg-white shadow-md transition-transform duration-500 opacity-0 group-hover:opacity-100 hover:duration-500 ${
              isBookmarked ? "text-[#F65D4E]" : ""
            }`}
          >
            <FaHeart className="text-xl" />
          </button>
          <button
            onClick={addToCart}
            className={`cursor-pointer absolute bottom-5 right-2 p-2 rounded-full bg-white shadow-md transition-transform duration-500 opacity-0 group-hover:opacity-100 hover:duration-500 ${
              isInCart ? "text-[#F65D4E]" : ""
            }`}
          >
            <FaShoppingCart className="text-xl" />
          </button>
        </div>
      </div>

      {/* Book Details */}
      <div className="pt-3">
        <p className="text-sm text-gray-600 mb-1 font-medium">{category}</p>
        <Link
          href={`/books/${_id}`}
          title={name}
          className="text-lg md:text-xl text-gray-800 font-bold line-clamp-2 hover:text-[#F65D4E]"
        >
          {name.slice(0, 10)}...
        </Link>

        <div className="flex items-center mt-2">
          <p className="text-gray-800 font-semibold flex items-center">
            Ratings: {ratings}{" "}
            <FaStar className="text-orange-400 ml-1 text-xs md:text-xl" />
          </p>
        </div>

        <h3 className="my-2 -ml-1 flex items-center">
          <FaDollarSign className="text-xl text-[#F65D4E] font-semibold" />
          <span className="text-xl md:text-2xl text-[#F65D4E] font-semibold -ml-1 -mt-1">
            {price.toFixed(2)}
          </span>
        </h3>
        <h2 className="flex gap-2">
          <span className="text-base md:text-base text-gray-800 font-semibold line-clamp-2 hover:text-[#F65D4E] text-center uppercase">
            {publishType === "released" ? <>{stock}</> : "upcoming"}
          </span>
        </h2>
      </div>
    </div>
  );
}
