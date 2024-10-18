// pages/api/carts/[email].js
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Cart } from "../../../../models/Book";

export async function POST(req, { params }) {
  await connectToDatabase(); // Connect to the database

  const { email } = params; // Get email from params
  const body = await req.json(); // Get request body

  try {
    // Check for existing cart item
    const existingCartItem = await Cart.findOne({ email, _id: body._id });

    // if (existingCartItem) {
    //   return new Response(
    //     JSON.stringify({ success: false, message: "Book already in cart" }),
    //     { status: 409 } // Conflict if already exists
    //   );
    // }

    // Create a new cart item
    const cartItem = new Cart({ ...body, email });
    await cartItem.save();

    return NextResponse.json(
      { success: true, data: cartItem },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in adding to cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add book to cart" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDatabase();
  const cart = await Cart.find();
  return NextResponse.json({ cart });
}
