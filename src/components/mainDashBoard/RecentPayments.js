


// "use client";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// // import Loading from "../app/loading";
// // import Image from "next/image";

// export default function RecentPayments() {
//   const { data: session } = useSession();
//   const [payments, setPayments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/payments/${session?.user?.email}?page=${page}&limit=${limit}`,
//           { cache: "no-store" }
//         );
//         setPayments(response?.data);
//         console.log(response?.data);

//         setTotalPages(response?.data?.totalPages);
//       } catch (error) {
//         console.error("Failed to fetch payments:", error);
//       }
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [session?.user?.email, page, limit]);

//   console.log(payments);
//   const handlePreviousPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

//   //   if (isLoading && payments.length === 0) {
//   //     return <Loading />; // Use your existing loading component
//   //   }

//   return (
//     <>
//       <div className="font-sans lg:max-h-[580px] overflow-x-auto overflow-y-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100 whitespace-nowrap">
//             <tr>
//               <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 TransactionID
//               </th>
//               <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                  Name
//               </th>
//               <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 Quantity of Books
//               </th>
//               <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 Ratings
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
//             {Array.isArray(payments) &&
//               payments.map((payment) => {
//                 const date = new Date(payment.date);
//                 const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD

//                 return (
//                   <tr key={payment._id}>
//                     <td className="px-4 py-4 text-sm text-gray-800">
//                       {payment?.transactionId}
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-800">
//                       {payment?.name}
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-800">
//                       {payment?.email}
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-800">
//                       {formattedDate}
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-800">
//                       {payment?.price} {/* Assuming price exists */}
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-800">
//                       {payment?.ratings} {/* Assuming ratings exists */}
//                     </td>
//                     <td className="px-4 py-4 text-sm text-gray-800">
//                       {payment?.books} {/* Assuming ratings exists */}
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//         <div className="flex justify-between items-center mt-4">
//           <button
//             className="btn btn-primary"
//             onClick={handlePreviousPage}
//             disabled={page === 1}
//           >
//             Previous
//           </button>
//           <span className="text-lg">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             className="btn btn-primary"
//             onClick={handleNextPage}
//             disabled={page === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import Loading from "../app/loading";
// import Image from "next/image";

export default function RecentPayments() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payments/${session?.user?.email}?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );
        setPayments(response?.data);
        console.log(response?.data);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [session?.user?.email, page, limit]);

  console.log(payments);
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

  // if (isLoading && payments.length === 0) {
  //   return <Loading />; // Use your existing loading component
  // }

  return (
    <>
      <div className="font-sans lg:max-h-[580px] overflow-x-auto overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                TransactionID
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quantity of Books
              </th>
              {/* <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ratings
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
            {Array.isArray(payments) &&
              payments.map((payment) => {
                const date = new Date(payment.date);
                const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
                
                // Calculate total quantity of books
                const totalQuantity = payment.books.reduce((acc, book) => acc + book.quantity, 0);

                return (
                  <tr key={payment._id}>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {payment?.transactionId}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {payment?.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {payment?.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {formattedDate}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {totalQuantity} {/* Display total quantity of books */}
                    </td>
                    
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn btn-primary"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-lg">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
