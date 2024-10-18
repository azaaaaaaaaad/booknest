import React from "react";

const getPayments = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch payments");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : []; // Adjust according to your API response structure
  } catch (error) {
    console.error("Error loading payments:", error.message); // Log the error message
    return []; // Return an empty array in case of error
  }
};

export default async function SalesList() {
  const payments = await getPayments();

  if (payments.length === 0) {
    return (
      <div className="text-2xl font-bold text-red-500 my-10 text-center">
        No payments found or failed to load payments.
      </div>
    ); // Show a message if no payments
  }

  return (
    <div className="font-sans lg:max-h-screen overflow-x-auto overflow-y-auto">
      <table className="divide-y divide-gray-200 w-full">
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="px-4 py-4 text-sm text-gray-800">
                {payment.name}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {payment.email}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {new Date(payment.date).toLocaleDateString()} {/* Format the date */}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {payment.transactionId}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {parseFloat(payment.totalAmount).toFixed(2)} $ {/* Total amount */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
