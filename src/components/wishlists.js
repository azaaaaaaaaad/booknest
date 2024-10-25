"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../app/loading";
import Image from "next/image";

export default function Wishlist() {
  const { data: session } = useSession();
  const [wishlists, setWishlists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wishlists/${session?.user?.email}?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );

        setWishlists(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [session?.user?.email, page, limit]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (isLoading && wishlists.length === 0) {
    return <Loading />; // Use your existing loading component
  }

  return (
    <div className="font-sans lg:max-h-[580px] overflow-x-auto overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Image
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Ratings
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(wishlists) &&
            wishlists.map((cart) => {
              return (
                <tr key={cart._id}>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    <Image
                      src={cart.image}
                      alt={cart.name}
                      width={40}
                      height={60}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart?.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart?.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart.author}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    ${cart.price.toFixed(2)} {/* Formatting price */}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart.rating}
                  </td>
                  {/* <td className="flex px-4 py-4 text-sm text-gray-800">
                      <Link href={`/dashboard/editbooks/${book._id}`}>
                        <HiPencilAlt size={24} />
                      </Link>
                      <RemoveBtn id={book._id} />
                    </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn rounded-3xl bg-[#F65D4E] text-white px-8"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn rounded-3xl bg-[#F65D4E] text-white px-8"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
