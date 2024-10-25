import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Blog } from "../../../../../models/Book";

import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

let db;




export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase();


  try {
    const topic = await Blog.findOne({ _id: id });
    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Unable to fetch blogs" }),
      {
        status: 500,
      }
    );
  }




}



export async function PUT(request, { params }) {
  const { id } = params;
  db = await connectDB();
  const updatedBlog = await request.json();

  // Remove the _id field from updatedBook if it exists
  const { _id, ...blogData } = updatedBlog;

  // Update the book in the database
  const result = await db
    .collection("blogs")
    .updateOne({ _id: new ObjectId(id) }, { $set: blogData });

  if (result.matchedCount === 0) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Book updated successfully" });
}

