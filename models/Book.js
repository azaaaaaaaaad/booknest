// import mongoose, { Schema } from "mongoose";

// const BookSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   price: { type: Number, required: true },
//   ratings: { type: Number, required: true },
//   author: { type: String, required: true },
//   category: { type: String, required: true },
//   cardCount: { type: Number, required: true },
// });

// const BlogSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   date: { type: String, required: true },
//   category: { type: String, required: true },
//   shortDescription: { type: String, required: true },
//   content: { type: String, required: true },
// });

// const WishlistSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   author: { type: String, required: true },
//   price: { type: Number, required: true },
//   rating: { type: Number, required: true },
//   category: { type: String, required: true },
//   email: { type: String, required: true },
// });

// const CartsSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Ensure bookId is defined
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   author: { type: String, required: true },
//   price: { type: Number, required: true },
//   rating: { type: Number, required: true },
//   category: { type: String, required: true },
//   cardCount: { type: Number, required: true },
//   cardCount: { type: Number, default: 1 },
// });

// const PaymentSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   transactionId: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
//   bookName: { type: String, required: true },
//   status: { type: String, default: "pending" },
//   cardCount: { type: Number, required: true },
// });

// // Check if the model already exists to avoid overwriting it
// const Book = mongoose.models.Books || mongoose.model("Books", BookSchema);
// const Blog = mongoose.models.blogs || mongoose.model("blogs", BlogSchema);
// const WishList =
//   mongoose.models.WishList || mongoose.model("WishList", WishlistSchema);
// const Cart = mongoose.models.Cart || mongoose.model("Cart", CartsSchema);
// const Payment =
//   mongoose.models.payments || mongoose.model("payments", PaymentSchema);

// // Export both models
// export { Book, Blog, WishList, Cart, Payment };

import mongoose, { Schema } from "mongoose";

const BookSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  price: { type: Number },
  ratings: { type: Number },
  author: { type: String },
  category: { type: String },
  cardCount: { type: Number },
});

const BlogSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  date: { type: String },
  category: { type: String },
  shortDescription: { type: String },
  content: { type: String },
});

const WishlistSchema = new Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  author: { type: String },
  price: { type: Number },
  rating: { type: Number },
  category: { type: String },
  email: { type: String },
});

const CartsSchema = new mongoose.Schema({
  email: { type: String },
  bookId: {}, // Ensure bookId is defined
  name: { type: String },
  description: { type: String },
  image: { type: String },
  author: { type: String },
  price: { type: Number },
  rating: { type: Number },
  category: { type: String },
  cardCount: { type: Number },
  cardCount: { type: Number },
});

const PaymentSchema = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  price: { type: Number },
  transactionId: { type: String },
  date: { type: Date, default: Date.now },
  bookId: {},
  bookName: { type: String },
  status: { type: String, default: "pending" },
  cardCount: { type: Number },
});

// Check if the model already exists to avoid overwriting it
const Book = mongoose.models.Books || mongoose.model("Books", BookSchema);
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
const WishList =
  mongoose.models.WishList || mongoose.model("WishList", WishlistSchema);
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartsSchema);
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

// Export both models
export { Book, Blog, WishList, Cart, Payment };
