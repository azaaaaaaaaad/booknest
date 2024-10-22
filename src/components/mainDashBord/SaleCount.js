"use client";
import { useState, useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";

const SaleCount = () => {
  const [totalPrice, setTotalPrice] = useState(0); // Initialize to 0

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/payments`);
        const data = await response.json();

        // Calculate the total amount from the payment data
        const total = data.reduce((acc, payment) => acc + payment.totalAmount, 0);
        setTotalPrice(total); // Set the calculated total price
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPayments();
  }, [baseUrl]);

  return (
    <div className="sale-card p-4 border rounded shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center mb-3">
        <FaMoneyBillWave className="text-5xl text-green-500 mr-2" />
        <h4 className="text-heading-6 font-bold text-dark dark:text-white">
          Total Sales: ${totalPrice > 0 ? totalPrice.toFixed(2) : "0.00"}
        </h4>
      </div>
    </div>
  );
};

export default SaleCount;

























//.............................Main Code...............................

// "use client";
// import { useState, useEffect } from "react";
// import { FcSalesPerformance } from "react-icons/fc";

// const SaleCount = () => {
//   const [totalPrice, setTotalPrice] = useState(0);

//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;

//   // Fetch comments from the backend
//   useEffect(() => {
//     const fetchBook = async () => {
//       const response = await fetch(`${baseUrl}/api/payments-price`);
//       const data = await response.json();

//       setTotalPrice(data.totalPrice);
//     };
//     fetchBook();
//   }, [baseUrl]);

//   return (
//     <>
//       <div className="card bg-base-100 h-32 shadow-xl border-2 flex flex-col items-center justify-center px-4">
//         <div className="flex items-center gap-8 lg:gap-4">
//           {/* <p className="font-bold text-[red]">User Information</p> */}
//           <div className="border border-solid rounded-full p-4 bg-slate-100">
//             <FcSalesPerformance className="text-5xl text-green-400" />
//           </div>
//           <div className=" border-t-slate-700">
//             <div className="text-lg font-medium">Total Sales</div>
//             <div className="text-4xl lg:text-2xl font-bold">
//               {parseFloat(totalPrice).toFixed(2)}$
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SaleCount;
