"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartComponent({ cartBook, setCartBook }) {
  const [isDiscountSectionHidden, setIsDiscountSectionHidden] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const router = useRouter();
  const updateQuantity = (id, newQuantity) => {
    setCartBook((prevState) =>
      prevState.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };
  


  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/cart?id=${id}`);
        const updatedCart = cartBook.filter((item) => item._id !== id);
        setCartBook(updatedCart);
  
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been removed from the cart.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error removing item from cart:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove item from cart!",
        });
      }
    }
  };
  

  const subtotal = Array.isArray(cartBook)
    ? cartBook.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  const handleCouponApply = () => {
    if (cartBook.length > 0 && couponInput === "BookNest10") {
      const discountAmount = (total * 10) / 100;
      setDiscount(discountAmount);
      setIsDiscountSectionHidden(true);
      Swal.fire({
        title: "Coupon Applied!",
        text: `You have received a discount of $${discountAmount.toFixed(2)}.`,
        icon: "success",
      });
    } else if (cartBook.length > 3 && couponInput === "BookNest20") {
      const discountAmount = (total * 20) / 100;
      setDiscount(discountAmount);
      setIsDiscountSectionHidden(true);
      Swal.fire({
        title: "Coupon Applied!",
        text: `You have received a discount of $${discountAmount.toFixed(2)}.`,
        icon: "success",
      });
    } else {
      let errorMessage = "The coupon code you entered is not valid.";
      if (cartBook.length < 1) {
        errorMessage = "Please select a book to apply the coupon.";
      } else if (cartBook.length < 3 && couponInput === "BookNest20") {
        errorMessage = "Please select more than 3 books to apply the coupon.";
      }
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text: errorMessage,
      });
    }
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (total > 0) {
          const booksArray = cartBook.map((item) => ({
            bookId: item._id,
            bookName: item.name,
            price: item.price,
            quantity: item.quantity,
          }));

          const response = await axios.post("/api/create-payment-intent", {
            price: total - discount,
            email: session?.user?.email || "anonymous",
            name: session?.user?.name || "anonymous",
            books: booksArray, // Include the books array here
          });
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (session) {
      fetchClientSecret();
    }
  }, [cartBook, session, total, discount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || loading) return; // Prevent further submissions

    setLoading(true);
    const card = elements.getElement(CardElement);

    if (!card) {
      setLoading(false);
      return;
    }

    try {
      const booksArray = cartBook.map((item) => ({
        bookId: item._id,
        bookName: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          email: session?.user?.email || "anonymous",
          name: session?.user?.name || "anonymous",
        },
      });

      if (error) throw new Error(error.message);

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (paymentIntent.status === "succeeded") {
        const payment = {
          email: session?.user?.email,
          name: session?.user?.name || "anonymous",
          transactionId: paymentIntent.id,
          date: new Date(),
          books: booksArray, // Include the books array here
          totalAmount: total - discount,
          status: "pending",
        };

        await axios.post("/api/payments", payment);

        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Thank you for your payment! Your order will be on its way soon! 🚚",
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
      {/* Cart Items Section */}
      <div className="md:col-span-2 space-y-4">
        {/* Cart items display */}
        <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2">
          {cartBook?.length > 0 ? (
            cartBook.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={120}
                  className="object-cover"
                />
                <div className="flex-grow">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.author}</p>
                  <p className="font-bold mt-2">${item.price?.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-1 border rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="0"
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity))
                        updateQuantity(item._id, newQuantity);
                    }}
                    className="w-16 text-center border rounded p-1"
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-1 border rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-1 border rounded text-[#F65D4E]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Payment Section */}
      <div className="border p-4 rounded-lg shadow-lg">
        <h2 className="font-semibold text-xl mb-4">Cart Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-500">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          {/* Coupon Section */}
          {!isDiscountSectionHidden && (
            <div
              id="discountSection"
              className="relative w-full rounded-lg flex h-12 justify-center items-center"
            >
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                id="couponInput"
                className="peer w-full rounded-l-lg border border-[#F65D4E] bg-transparent px-4 py-2 focus:outline-none"
                name="coupon"
                type="text"
                placeholder="Coupon Code"
              />
              <label
                className="absolute -top-2 left-2 rounded-md bg-[#F65D4E] px-2 text-xs text-sky-100 duration-300 "
                htmlFor="navigate_ui_input_33"
              >
                Have a coupon code
              </label>
              {/* button */}
              <div>
                <button
                  onClick={handleCouponApply}
                  className="py-2 px-6 h-[42px] bg-[#F65D4E] hover:bg-red-600 duration-300 text-white flex items-center justify-center overflow-hidden hover:overflow-visible relative group rounded-r-lg"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    className="icon rotate-45 group-hover:duration-700 absolute w-12 -translate-x-full translate-y-full scale-0 group-hover:scale-100 group-hover:translate-x-8 group-hover:-translate-y-8 duration-150"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g strokeWidth="0"></g>
                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                    <g>
                      <path
                        d="M244.5 662l268.1-446.4 268 446.4z"
                        fill="#9ED5E4"
                      ></path>
                      <path
                        d="M780.6 676.2H244.5c-5.3 0-10.2-2.7-12.8-7.1s-2.6-9.8 0-14.3l268.1-446.3c2.6-4.4 7.5-7.1 12.8-7.1 5.3 0 10.2 2.7 12.8 7.1l268.1 446.3c2.6 4.4 2.6 9.8 0 14.3-2.7 4.4-7.6 7.1-12.9 7.1z m-510.5-28.5H755L512.6 244.2 270.1 647.7z"
                        fill="#154B8B"
                      ></path>
                      <path
                        d="M512.6 23s129 131.7 129 352.4-129 376-129 376-129-155.3-129-376S512.6 23 512.6 23z"
                        fill="#F7F9F9"
                      ></path>
                      <path
                        d="M512.6 765.7c-4.5 0-8.8-2-11.6-5.4-1.4-1.6-33.7-40.9-66.4-108.1-30.1-61.9-65.9-160.2-65.9-276.8 0-116.9 36-208.8 66.1-265.4 32.8-61.6 65.5-95.3 66.9-96.7 2.8-2.9 6.7-4.5 10.8-4.5 4.1 0 8 1.6 10.8 4.5 1.4 1.4 34.1 35.1 66.9 96.7 30.2 56.6 66.1 148.6 66.1 265.4 0 116.6-35.8 214.9-65.9 276.8-32.6 67.2-65 106.5-66.4 108.1-2.7 3.4-6.9 5.4-11.4 5.4z m0-720.5c-11.9 14.5-32 41.3-51.8 78.8-28.4 53.6-62.4 140.8-62.4 251.5 0 111.4 34.3 205.4 63.1 264.7 19.6 40.3 39.1 70.2 51.1 86.9 12-16.9 31.9-47.2 51.5-87.8 28.6-59.1 62.7-152.9 62.7-263.9 0-110.7-33.9-197.8-62.4-251.5-19.9-37.4-40-64.3-51.8-78.7z"
                        fill="#154B8B"
                      ></path>
                      <path
                        d="M447.6 278.9a65 62.4 0 1 0 130 0 65 62.4 0 1 0-130 0Z"
                        fill="#9ED5E4"
                      ></path>
                      <path
                        d="M512.6 355.6c-44 0-79.8-34.4-79.8-76.7s35.8-76.7 79.8-76.7 79.8 34.4 79.8 76.7-35.9 76.7-79.8 76.7z m0-124.8c-27.6 0-50.1 21.6-50.1 48.2s22.5 48.2 50.1 48.2 50.1-21.6 50.1-48.2-22.5-48.2-50.1-48.2z"
                        fill="#154B8B"
                      ></path>
                      <path
                        d="M570 860.9c0 13 1.5-7.5-57.4 141.4-56.2-142.1-57.4-128.4-57.4-141.4 0-36 25.7-65.2 57.4-65.2s57.4 29.2 57.4 65.2z"
                        fill="#9ED5E4"
                      ></path>
                      <path
                        d="M512.5 1016.6c-6.2 0-11.7-3.7-13.9-9.2-31.2-78.9-45.6-110.1-51.8-123.3-5.4-11.6-6.6-14.3-6.6-23.1 0-43.8 32.4-79.5 72.2-79.5 39.8 0 72.2 35.7 72.2 79.5v0.9c0 7.7-1 9.9-5.3 19.1-5.8 12.4-19.5 41.6-53.1 126.5-2 5.4-7.5 9.1-13.7 9.1z m0-206.7c-23.5 0-42.6 22.9-42.6 51 0 2.7 0 2.7 4.1 11.5 5.7 12.3 16.5 35.7 38.5 90.1 24-59.5 34.8-82.6 39.9-93.4 1.2-2.5 2.3-4.9 2.7-5.9v-2.3c0-28.1-19.1-51-42.6-51z"
                        fill="#154B8B"
                      ></path>
                    </g>
                  </svg>
                  <span className="duration-500">Apply</span>
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${(total - discount).toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Form */}
        {clientSecret && (
          <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="text-xl font-bold">Payment Information</h2>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Cardholder's Name"
                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                required
              />
            </div>
            <CardElement
              className="p-4 mt-4 border rounded"
              options={{ hidePostalCode: true }}
            />
            <button
              type="submit"
              className="mt-4 w-full bg-[#F65D4E] text-white rounded p-2"
              disabled={!stripe || !elements || loading}
            >
              {loading
                ? "Processing..."
                : `Pay $ ${(total - discount).toFixed(2)}`}
            </button>
            {error && (
              <p className="text-[#F65D4E] text-center mt-2">{error}</p>
            )}
            {transactionId && (
              <p className="text-green-600">
                Your transaction ID: {transactionId}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
