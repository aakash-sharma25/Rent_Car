const Multer = require("multer")
const express = require("express");
const { registerController, loginController, getAllNotification, registerControllerV2 } = require("../controller/userController");
const { getAllBooking, getUserBooking, verifyBooking, getBookingDetails } = require("../controller/bookingController");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});
//router object

const router = express.Router();

//routes

router.post("/register", registerController);
router.post("/registerV2",upload.single("my_file"), registerControllerV2);
router.post("/login", loginController);
router.get("/allbooking", getAllBooking);
router.post("/userbooking", getUserBooking);
router.post("/verifybooking", verifyBooking);
router.get("/get-booking-details/:id", getBookingDetails);
router.post("/allnotification", getAllNotification);

module.exports = router;
