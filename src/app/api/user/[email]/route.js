import { NextResponse } from "next/server";
import Users from "../../../../../models/Users";
import connectToDatabase from "@/lib/mongodb";

export async function GET(request, { params }) {
  const { email } = params;
  const sanitizedEmail = email.trim().toLowerCase();

  await connectToDatabase();

  try {
    const user = await Users.findOne({ email: sanitizedEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { email } = params;
  const sanitizedEmail = email.trim().toLowerCase();
  const { name, image } = await request.json(); // Get the updated name and image from the request body

  await connectToDatabase();

  try {
    // Check if the user exists before updating
    const user = await Users.findOne({ email: sanitizedEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user data
    const updatedUser = await Users.findOneAndUpdate(
      { email: sanitizedEmail },
      { name, image }, // Ensure these fields match your database
      { new: true } // Return the updated document
    );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function PATCH(request, { params }) {
  const { email } = params;
  const sanitizedEmail = email.trim().toLowerCase();

  // Parse the request body for the fields to update
  const updateData = await request.json();

  await connectToDatabase();

  try {
    // Check if the user exists before updating
    const user = await Users.findOne({ email: sanitizedEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update or add fields dynamically
    const updatedUser = await Users.findOneAndUpdate(
      { email: sanitizedEmail },
      { $set: updateData },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
    
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

