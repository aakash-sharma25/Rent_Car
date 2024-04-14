const BookingModal = require("../model/bookingModal");
const carModel = require("../model/carModel");
const Car = require("../model/carModel");
const userModel = require("../model/usermode");
const User = require("../model/usermode");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const acceptPayment = async (req, res) => {
  const { name, totalAmount } = req.body;
  console.log(req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: name,
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: req.body.success_url,
      cancel_url: "http://localhost:3000/cancel",
    });
    return res.status(200).json({
      success: true,
      message: "Payment is successfull",
      sessionId: session.id,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Payment is unsuccessull",
    });
  }
};

const bookCar = async (req, res) => {
  const {
    userId,
    carId,
    bookingDate,
    returnDate,
    timingFrom,
    timingTo,
    totalAmount,
  } = req.body;
  if (
    !userId ||
    !carId ||
    !bookingDate ||
    !returnDate ||
    !timingFrom ||
    !timingTo ||
    !totalAmount
  ) {
    return res.status(404).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }
    const allRentedCars = user.rentedCars;
    let isOk = true;
    for (let i = 0; i < allRentedCars.length; i++) {
      if (allRentedCars[i].isReturned === false) {
        isOk = false;
        break;
      }
    }
    if (!isOk) {
      return res.status(400).json({
        success: false,
        message: "Return the previously rented car",
      });
    }
    try {
      const booking = await BookingModal.create({
        userId: userId,
        carId: carId,
        userName: user.username,
        bookingDate: bookingDate,
        returnDate: returnDate,
        timingFrom: timingFrom,
        timingTo: timingTo,
        totalAmount: totalAmount,
        isPayment: true,
      });
      user.rentedCars.push({
        carId: carId,
        isVerified: false,
        bookingId: booking._id,
      });
      await user.save();

      const admin = await User.findOne({ isAdmin: "true" });
      admin.notification.push({
        message: `${user.username} had requested a renting of ${car.name}`,
      });
      admin.save();
      return res.status(200).json({
        success: true,
        message: "Car booked successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error ",
        error: error,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getAllBooking = async (req, res) => {
  try {
    const bookings = await BookingModal.find();
    return res.status(200).json({
      success: true,
      message: "All booking fetched successfully",
      bookings: bookings,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to fetch all booking",
    });
  }
};

const getUserBooking = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookings = await BookingModal.find({ userId: userId });
    return res.status(200).json({
      success: true,
      message: "All booking fetched successfully of User",
      bookings: bookings,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to fetch the bookings of User",
    });
  }
};
const getBookingDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await BookingModal.findById(id);
    const requestedUser = await userModel.findById(bookings.userId);
    const requestedCar = await carModel.findById(bookings.carId);

    return res.status(200).json({
      success: true,
      message: "All booking fetched successfully of User",
      requestedUser,
      requestedCar,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to fetch the bookings of User",
    });
  }
};

const verifyBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await BookingModal.findById(bookingId);
    if (!booking) {
      return res.status(400).json({
        success: false,
        message: "No booking found to verify",
      });
    }
    const user = await User.findById(booking?.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found to for booking id",
      });
    }
    const allrentedcars = user.rentedCars;
    let rentedCar = false;
    for (let i = 0; i < allrentedcars.length; i++) {
      // console.log(allrentedcars[i].bookingId,"-",bookingId)
      if (allrentedcars[i].bookingId === bookingId._id) {
        rentedCar = allrentedcars[i];
        break;
      }
    }
    if (!rentedCar) {
      return res.status(400).json({
        success: false,
        message: "No Car found to verify",
        rentedCar: rentedCar,
      });
    }
    booking.isApproved = true;
    booking.save();

    rentedCar.isVerified = true;
    user.notification.push({
      message: ` You Renting car has been approved`,
    });
    user.save();
    return res.status(200).json({
      success: true,
      message: "User car has been approved",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};
module.exports = {
  bookCar,
  getAllBooking,
  getUserBooking,
  verifyBooking,
  acceptPayment,
  getBookingDetails
};
