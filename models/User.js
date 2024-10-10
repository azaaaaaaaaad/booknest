// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  stripeSessionId: String,
  paidSubscription: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
