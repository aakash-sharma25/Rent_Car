const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    carId: { type: String, required: true },
    bookingDate: { type: String },
    returnDate: { type: String },
    timingFrom: { type: String },
    timingTo: { type: String },
    totalHours: { type: String },
    totalAmount: { type: Number },
    isApproved: { type: String, default: false },
    isReturned: { type: String, default: false },
    // isAvailable: { type: String, default: false },
    isPayment: { type: String, default: false },
  },
  { timestamps: true }
);
const bookingModal = mongoose.model("booking", bookingSchema);
module.exports = bookingModal;
