import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB"; // Adjust import to your actual file

export async function GET(req) {
  try {
    // Connect to the database
    const db = await connectDB();
    // Get the query parameters
    const url = new URL(req.url);
    const bookId = url.searchParams.get("bookId"); // Corrected the parameter name to `bookId`

    if (!bookId) {
      return NextResponse.json(
        { error: "bookId not provided" },
        { status: 400 }
      );
    }

    // Find all documents where the `bookId` exists in the books array
    const payments = await db
      .collection("payments")
      .find({
        books: {
          $elemMatch: { bookId },
        },
      })
      .toArray(); // Convert the cursor to an array

    // Calculate the total quantity for the specified bookId
    let totalQuantity = 0;
    payments.forEach((order) => {
      order.books.forEach((book) => {
        if (book.bookId === bookId) {
          totalQuantity += book.quantity;
        }
      });
    });

    // Return the total quantity as a JSON response
    return NextResponse.json(totalQuantity);
  } catch (error) {
    console.error("Error fetching total quantity:", error);
    return NextResponse.json(
      { error: "Failed to calculate total quantity" },
      { status: 500 }
    );
  }
}
