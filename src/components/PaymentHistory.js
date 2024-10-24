// "use client";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import Loading from "../app/loading";
// import Image from "next/image";

// export default function Cart() {
//   const { data: session } = useSession();
//   const [carts, setCarts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const limit = 10;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `/api/payments-pagination/${session?.user?.email}?page=${page}&limit=${limit}`,
//           { cache: "no-store" }
//         );

//         console.log("---------", response?.data?.data);
//         // setCarts(response);
//         setTotalPages(response.data.totalPages);
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       }
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [session?.user?.email, page, limit]);

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

//   if (isLoading && carts.length === 0) {
//     return <Loading />; // Use your existing loading component
//   }

//   if (carts.length === 0) {
//     return <div>No cart found or failed to load cart.</div>;
//   }

//   // console.log(carts);

//   return (
//     <div className="font-sans lg:max-h-[580px] overflow-x-auto overflow-y-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-100 whitespace-nowrap">
//           <tr>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Shipping addres
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Email
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Payment status
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Price
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               status
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               date
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
//           {Array.isArray(carts) &&
//             carts.map((cart) => {
//               return (
//                 <tr key={cart._id}>
//                   <td className="px-4 py-4 text-sm text-gray-800">
//                     {cart?.name},{cart?.address},{cart?.city},{cart?.country},
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-800">
//                     {cart?.email}
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-800">
//                     {cart?.transactionId}
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-800">
//                     ${cart?.totalAmount.toFixed(2)}
//                   </td>
//                   <td className="px-4 py-4 text-sm text-gray-800">
//                     {cart?.status}
//                   </td>

//                   <td className="px-4 py-4 text-sm text-gray-800">
//                     {new Date(cart?.date).toLocaleDateString("en-GB")}
//                   </td>

//                   {/* <td className="flex px-4 py-4 text-sm text-gray-800">
//                       <Link href={`/dashboard/editbooks/${book._id}`}>
//                         <HiPencilAlt size={24} />
//                       </Link>
//                       <RemoveBtn id={book._id} />
//                     </td> */}
//                 </tr>
//               );
//             })}
//         </tbody>
//       </table>
//       <div className="flex justify-between items-center mt-4">
//         <button
//           className="btn btn-primary"
//           onClick={handlePreviousPage}
//           disabled={page === 1}
//         >
//           Previous
//         </button>
//         <span className="text-lg">
//           Page {page} of {totalPages}
//         </span>
//         <button
//           className="btn btn-primary"
//           onClick={handleNextPage}
//           disabled={page === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../app/loading";

export default function PaymentHistory() {
  const { data: session } = useSession();
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/payments-pagination/${session?.user?.email}?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );

        console.log("---------", response?.data?.data);
        setCarts(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
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

  if (isLoading && carts.length === 0) {
    return <Loading />; // Use your existing loading component
  }

  if (carts.length === 0) {
    return <div>No cart found or failed to load cart.</div>;
  }

  // console.log(carts);

  return (
    <div className="font-sans lg:max-h-[580px] overflow-x-auto overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Shipping addres
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
              status
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(carts) &&
            carts.map((cart) => {
              return (
                <tr key={cart._id}>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart?.name},{cart?.address},{cart?.city},{cart?.country},
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
                    {cart?.status}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-800">
                    {new Date(cart?.date).toLocaleDateString("en-GB")}
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
  );
}
