"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/app/loading";

export default function SalesList() {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Number of rows per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when the fetch starts
      try {
        const response = await axios.get(
          `/api/payments-pagination?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );
        setPayments(response?.data?.data || []); // Handle cases where response data might be undefined
        setTotalPages(response?.data?.totalPages || 1);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching completes
      }
    };

    fetchData();
  }, [page]);

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

  if (loading) {
    return <div><Loader></Loader></div>; // Show a loading indicator when data is being fetched
  }

  if (payments?.length === 0) {
    return (
      <div className="text-2xl font-bold text-red-500 my-10 text-center">
        No payments found or failed to load payments.
      </div>
    );
  }

  return (
    <div className="font-sans lg:max-h-screen overflow-x-auto overflow-y-auto border ">
      <table className="divide-y divide-gray-200 border w-full">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email Id
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Amount
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(payments) &&
            payments.map((pay) => (
              <tr key={pay._id}>
                <td className="px-4 py-4 text-sm text-gray-800">{pay?.name}</td>
                <td className="px-4 py-4 text-sm text-gray-800">{pay?.email}</td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {new Date(pay.date).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800"> {pay.transactionId}</td>

                <td className="px-4 py-4 text-sm text-gray-800 text-right">
                  $
                  {typeof pay.totalAmount === 'number' ? pay.totalAmount.toFixed(2) :
         pay.totalAmount}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {pay?.transactionId}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800 text-start">
                ${typeof pay?.totalAmount === 'number' ? pay?.totalAmount.toFixed(2) : pay?.totalAmount}

                </td>
                <td className="px-4 py-4 text-sm text-gray-800">{pay.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn bg-[#F65D4E]"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn bg-[#F65D4E]"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
