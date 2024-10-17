// /api/create-payment-intent/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    await connectDB();

    // Parse the request body
    const data = await req.json();

    const { books, email, name } = data; // Destructure after logging

    if (!Array.isArray(books)) {
      throw new Error("Books must be an array");
    }

    // Calculate the total amount
    const totalAmount = books.reduce((total, book) => {
      return total + book.price * book.quantity; // Calculate total based on book price and quantity
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Save payment with "pending" status
    const payment = new Payment({
      email,
      name,
      books, // Include books array
      totalAmount, // Store the total amount
      transactionId: paymentIntent.id,
      status: "pending", // Initially "pending"
      date: new Date(), // Add the current date
    });

    await payment.save();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
