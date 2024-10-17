/* eslint-disable @next/next/no-async-client-component */
"use client";
import axios from "axios";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { useState } from "react";
import Swal from "sweetalert2";
import RelatedBooks from "@/components/RelatedBooks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function BookDetails({ params }) {
  const [activeTab, setActiveTab] = useState("description");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  let listOfBooks = [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(`${baseUrl}/api/books`);
    listOfBooks = response.data;
  } catch (error) {
    console.error("Error fetching book details:", error.message);
    return (
      <p className="text-3xl">Error fetching book details: {error.message}</p>
    );
  }

  const bookId = params.details; // No conversion

  const bookDetails = listOfBooks.find((book) => book._id === bookId); // Ensure the correct property is used

  if (!bookDetails) {
    return <p className="text-3xl">Book not found.</p>;
  }

  const {
    _id,
    name,
    description,
    image,
    author,
    price,
    rating,
    category,
    quantity,
  } = bookDetails;

  const addToWishlist = async () => {
    if (isBookmarked) {
      Swal.fire({
        icon: "info",
        title: "Already Bookmarked",
        text: `${name} is already in your bookmarks!`,
      });
      return;
    }

    try {
      const response = await axios.post(`/api/wishlist/${_id}`, {
        name,
        description: bookDetails.description || "",
        image,
        author: bookDetails.author || "",
        price,
        rating: bookDetails.ratings,
        category,
      });

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

      if (error.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already Bookmarked",
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
      // const response = await axios.post("/api/carts", {
      //   name,
      //   description: bookDetails.description || "",
      //   image,
      //   author: bookDetails.author || "",
      //   price,
      //   rating: bookDetails.ratings,
      //   category,
      //   quantity,
      // });

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
    <>
      <Navbar />
      <div className="font-sans">
        <div className="p-4 lg:max-w-6xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-16">
            <div className="w-full lg:sticky top-0 text-center">
              <div className="lg:h-[560px]">
                <Image
                  height={300}
                  width={400}
                  src={bookDetails.image}
                  alt="Product"
                  className="lg:w-11/12 w-full h-full rounded-md object-cover object-top"
                />
              </div>
            </div>

            <div>
              <div className="mb-3">
                <button
                  type="button"
                  class="flex items-center text-green-600 text-sm bg-green-50 px-3 py-1.5 tracking-wide rounded-full"
                >
                  IN STOCK
                </button>
              </div>
              <div className="flex flex-wrap items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {bookDetails.name} | {bookDetails.category}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 font-bold">
                    Author:{" "}
                    <span className="text-red-600">{bookDetails.author}</span>
                  </p>
                </div>

                <div className="ml-auto flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      fill="currentColor"
                      className="mr-1"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      ></path>
                    </svg>
                    100
                  </button>
                  <button
                    type="button"
                    className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0"
                        data-original="#000000"
                      />
                      <path
                        d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm69.332 394.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0"
                        data-original="#000000"
                      />
                      <path
                        d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zM154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0"
                        data-original="#000000"
                      />
                      <path
                        d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0"
                        data-original="#000000"
                      />
                      <path
                        d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 0 1-10.535 2.797zm197.93 176c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <hr className="my-8" />

              <div className="flex flex-wrap gap-4 items-start">
                <div>
                  <p className="text-gray-800 text-4xl font-bold">
                    ${bookDetails.price}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 ml-auto">
                  <button
                    type="button"
                    className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                  >
                    <svg
                      class="w-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 14 13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    {bookDetails.ratings}
                  </button>
                </div>
              </div>

              <hr className="my-8" />

              <div>
                <p>
                  {bookDetails.description.split(" ").slice(0, 30).join(" ")}
                  {bookDetails.description.split(" ").length > 30 ? "..." : ""}
                </p>
              </div>

              <hr className="my-8" />

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={addToCart}
                  className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-md"
                >
                  Add to cart
                </button>
                <button
                  onClick={addToWishlist}
                  className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-md"
                >
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>

          <div className="mt-20 max-w-4xl">
            <ul className="flex border-b">
              <li
                className={`text-gray-800 font-semibold text-sm py-3 px-8 border-b-2 cursor-pointer transition-all ${
                  activeTab === "description"
                    ? "border-gray-800 bg-gray-100"
                    : "border-transparent"
                }`}
                onClick={() => handleTabClick("description")}
              >
                Description
              </li>
              <li
                className={`text-gray-500 font-semibold text-sm py-3 px-8 cursor-pointer transition-all ${
                  activeTab === "reviews"
                    ? "border-b-2 border-gray-800 bg-gray-100"
                    : ""
                }`}
                onClick={() => handleTabClick("reviews")}
              >
                Reviews
              </li>
            </ul>

            <div className="mt-8">
              {activeTab === "description" ? (
                <>
                  <h3 className="text-xl font-bold text-gray-800">
                    Product Description
                  </h3>
                  <p className="text-sm text-gray-500 mt-4">
                    {bookDetails.description}
                  </p>
                  <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-500">
                    <li>
                      A gray t-shirt is a wardrobe essential because it is so
                      versatile.
                    </li>
                    <li>
                      Available in a wide range of sizes, from extra small to
                      extra large, and even in tall and petite sizes.
                    </li>
                    <li>
                      This is easy to care for. They can usually be
                      machine-washed and dried on low heat.
                    </li>
                    <li>
                      You can add your own designs, paintings, or embroidery to
                      make it your own.
                    </li>
                  </ul>
                </>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Product Reviews
                  </h3>
                  {/* Reviews content goes here */}
                  <p className="text-sm text-gray-500 mt-4">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <RelatedBooks listOfBooks={listOfBooks}></RelatedBooks>
      </div>
      <Footer />
    </>
  );
}

//........................Main code.............................

// import axios from "axios";
// import Image from "next/image";
// import { CiStar } from "react-icons/ci";

// export default async function BookDetails({ params }) {
//   let listOfBooks = [];
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const response = await axios.get(`https://booknest-server-one.vercel.app/api/books`);
//     console.log("API Response:", response.data);
//     listOfBooks = response.data;
//   } catch (error) {
//     console.error("Error fetching book details:", error.message);
//     return <p className="text-3xl">Error fetching book details: {error.message}</p>;
//   }

//   const bookId = parseInt(params.details, 10);
//   if (isNaN(bookId)) {
//     return <p className="text-3xl">Invalid book ID.</p>;
//   }

//   const bookDetails = listOfBooks.find(book => book.id === bookId);

//   if (!bookDetails) {
//     return <p className="text-3xl">Book not found.</p>;
//   }

//   return (
//     <div className="card card-side bg-base-100 shadow-xl">
//       <figure>
//         <Image
//           height={200}
//           width={200}
//           src={bookDetails.image}
//           alt={bookDetails.name}
//         />
//       </figure>
//       <div className="card-body">
//         <p>Category: {bookDetails.category}</p>
//         <h2 className="card-title">{bookDetails.name}</h2>
//         <p>Author: {bookDetails.author}</p>
//         <p className="flex items-center">
//           Ratings: {bookDetails.ratings} <CiStar className="text-orange-700" />
//         </p>
//         <p>Price: ${bookDetails.price}</p>
//         <div className="card-actions justify-end">
//           <button className="btn btn-primary">Watch</button>
//         </div>
//       </div>
//     </div>
//   );
// }
