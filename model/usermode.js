const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    isAdmin: { type: String, default: false },
    identityProff: {
      type: String,
      default: false,
      required: true,
    },
    rentedCars: [
      {
        isVerified: {
          type: Boolean,
          default: false,
        },
        isReturned: {
          type: Boolean,
          default: false,
        },
        carId: {
          type: String,
          default: null,
        },
        bookingId: {
          type: String,
          default: null,
        },
      },
    ],
    notification: [
      {
        message: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userschema);
module.exports = userModel;
