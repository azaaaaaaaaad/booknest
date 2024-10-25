import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Payment } from "../../../../../models/Payment";

// export async function GET(request, { params }) {
//   const { email } = params;
//   const sanitizedEmail = email.trim().toLowerCase();

//   await connectToDatabase();

//   try {
//     const user = await Payment.findOne({ email: sanitizedEmail });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// Handle GET requests
export async function GET(request, { params }) {
    const { email } = params;
  
    await connectToDatabase();
  
    try {
      const individualCart = await Payment.find({ email: email });
      if (!individualCart) {
        return NextResponse.json(
          { message: " individualCart not found" },
          { status: 404 }
        );
      }
  
      // console.log(individualCart);
      return NextResponse.json(individualCart, { status: 200 });
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
  
