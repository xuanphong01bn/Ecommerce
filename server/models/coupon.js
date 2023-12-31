import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      uinque: true,
      uppercase: true,
      required: true,
      minlength: [4, "Too short"],
      maxlength: [12, "Too long"],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Coupon", couponSchema);
