import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";

let db;

export async function GET(request, { params }) {
  const { id } = params;

  db = await connectDB();

  const book = await db.collection("books").findOne({ _id: new ObjectId(id) }); // Convert id to ObjectId
  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}

// POST method to create a new book
export async function POST(request) {
  db = await connectDB();
  const newBook = await request.json();

  // Insert the new book into the database
  const result = await db.collection("books").insertOne(newBook);

  return NextResponse.json(
    { message: "Book created successfully", bookId: result.insertedId },
    { status: 201 }
  );
}

// PUT method to update an existing book
export async function PUT(request, { params }) {
  const { id } = params;
  db = await connectDB();
  const updatedBook = await request.json();

  // Remove the _id field from updatedBook if it exists
  const { _id, ...updateData } = updatedBook;

  // Update the book in the database
  const result = await db
    .collection("books")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  if (result.matchedCount === 0) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Book updated successfully" });
}

// DELETE method to remove a book
export async function DELETE(request, { params }) {
  const { id } = params;
  db = await connectDB();


  // Delete the book from the database
  const result = await db
    .collection("books")
    .deleteOne({ _id: new ObjectId(id) }); // Convert id to ObjectId

console.log("didarul-----------",result);
  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Book deleted successfully" });
}
