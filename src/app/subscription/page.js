"use client"; // Add this at the top of the file

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react"; // Import useSession
import Swal from "sweetalert2"; // Import SweetAlert2
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const SubscriptionPage = () => {
  const { data: session } = useSession(); // Use the useSession hook to get session data
  const email = session?.user?.email; // Extract the email from session data

  const handleSubscription = async (plan) => {
    const stripe = await stripePromise;

    const response = await fetch("/api/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, plan }), // Include email in the request body
    });

    // Check if the response is OK
    if (!response.ok) {
      alert("Failed to create checkout session. Please try again later.");
      return;
    }

    const data = await response.json();

    if (data.url) {
      // Redirect to the Stripe checkout URL
      window.location.href = data.url; // Redirect to the URL returned from the session data
    } else {
      alert("Failed to create checkout session. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>BookNest | Subscription</title>
      </Head>
      <Navbar />
      <div className="container mx-auto p-6">
        <div>
          <h2 className="text-3xl font-bold text-center mt-12 sm:text-5xl">
            Pricing
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center">
            Get started on our free plan and upgrade when you are ready.
          </p>
        </div>
        <div className="mt-24 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Free Plan */}
          <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">
                  $0
                </span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6">Empower your reading journey!</p>
              <ul className="mt-6 space-y-6">
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">Comprehensive Book Catalog</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">
                    Advanced Search and Filtering Options
                  </span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">Order and Cart Management</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">Multiple Payment Options</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">
                    Bookmarks and Favorites List (Limited)
                  </span>
                </li>
              </ul>
            </div>
            <button
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 rounded-md font-medium"
              onClick={() => handleSubscription("free")}
            >
              Sign up for free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide">
                Most popular
              </p>
              <p className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">
                  $9.99
                </span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6">Elevate your reading experience!</p>
              <ul className="mt-6 space-y-6">
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">Flexible Delivery Options</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">Discounts and Promotional Codes</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">
                    Stock Status and Pre-Order Options
                  </span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">Subscription Service</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-3">
                    Bookmarks and Favorites List (Unlimited)
                  </span>
                </li>
              </ul>
            </div>
            <button
              className="bg-[#F65D4E] text-white hover:bg-white hover:text-black mt-8 block w-full py-3 px-6 rounded-md font-medium"
              onClick={() => handleSubscription("pro")}
            >
              Get Access to Pro
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubscriptionPage;
