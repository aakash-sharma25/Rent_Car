const express = require("express");
const Multer = require("multer");
const { getAllCar, editCar, deleteCar, addCar, getCarById, getCarByName } = require("../controller/carController");
const { bookCar, acceptPayment } = require("../controller/bookingController");

const router = express.Router();

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});


//routes

router.get("/allCar", getAllCar);
router.post("/addCar", upload.single("my_file"), addCar);
router.post("/editCar", editCar);
router.post("/deleleCar", deleteCar);
router.post("/getCarById", getCarById);
router.post("/getCarByName", getCarByName);
router.post("/bookCar", bookCar);
router.post("/handleCheckout", acceptPayment);

module.exports = router;
 