"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState,useRef } from "react";
import Loading from "../app/loading";
//view
import { useReactToPrint } from "react-to-print";
import InvoiceDetail from "./InvoiceDetail";


export default function PaymentHistory() {
  const { data: session } = useSession();
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Invoice state and ref
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const invoiceRef = useRef(null);


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;


    // Handle print functionality
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current || null,
    documentTitle: `Invoice_${currentInvoice?._id}`,
    onAfterPrint: () => setCurrentInvoice(null)  // Reset invoice after print
  });

  const print = (invoice) => {
    setCurrentInvoice(invoice);
  };


 const handleButtonClick = () => {
    setCurrentInvoice(null); // Set currentInvoice to null on button click
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/payments/${session?.user?.email}?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );
        setCarts(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [session?.user?.email, page, limit]);

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  if (isLoading && carts.length === 0) {
    return <Loading />;
  }

  if (carts.length === 0) {
    return (
      <div className="flex justify-center items-center">
        You have No payment History, Make a Payment First
      </div>
    );
  }

  return (
    <div className="font-sans lg:max-h-[580px] overflow-x-auto overflow-y-auto">

 <p>{currentInvoice != null ? <>

     {/* Hidden component for printing */}
      {currentInvoice && (
        <div>
          <InvoiceDetail ref={invoiceRef} invoice={currentInvoice} />
        </div>
      )}

      <button onClick={handleButtonClick} className="btn btn-primary bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 transition">Invoice List</button>


  </> : <>

    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Shipping address
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Payment status
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th>
            Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(carts) &&
            carts.map((cart) => (
              <tr key={cart._id}>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {cart?.name}, {cart?.address}, {cart?.city}, {cart?.country}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {cart?.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {cart?.transactionId}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  ${cart?.totalAmount.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {new Date(cart?.date).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                
                <button
                  onClick={() => print(cart)}
                  className="btn btn-primary bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 transition"
                >
                  view
                </button>
              </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`px-3 py-1 rounded ${
              page === pageNum
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageClick(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>

  </>}</p>


      
    </div>
  );
}
