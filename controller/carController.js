const express = require("express");
const router = express.Router();
const Car = require("../model/carModel");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file) {
  const uploadOptions = {
    resource_type: "auto",
    folder: "Car-Rental",
  };
  const res = await cloudinary.uploader.upload(file, uploadOptions);

  return res;
}

const getAllCar = async (req, res) => {
  try {
    const cars = await Car.find();
    return res.status(200).json({
      success: true,
      message: "All car fetched successfully",
      cars: cars,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getCarByName = async (req, res) => {
  try {
    const { name } = req.body;
    const regex = new RegExp(name, "i");
    const car = await Car.find({ name: regex });
    if (!car) {
      return res.status(200).json({
        success: false,
        message: "No car with the given Id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "The car is fetched successfully",
      car: car,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req?.body?.id);

    if (!car) {
      return res.status(200).json({
        success: false,
        message: "No car with the given Id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "The car is fetched successfully",
      car: car,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const addCar = async (req, res) => {
  try {
    console.log(req.body);
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    console.log(cldRes.secure_url);

    const newcar = new Car(req.body);
    newcar.image = cldRes?.secure_url;
    await newcar.save();
    return res.status(200).json({
      success: true,
      message: "New car added successfully",
      imageUrl: cldRes.secure_url,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const editCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body.id });
    if (!car) {
      return res.status(400).json({
        success: false,
        message: "No Car with the given Id",
      });
    }
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();

    return res.status(200).json({
      success: true,
      message: "Car Detail Updated successfully",
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteCar = async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    return res.status(200).json({
      success: true,
      message: "The car deleted successfully",
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  getAllCar,
  editCar,
  deleteCar,
  addCar,
  getCarById,
  getCarByName,
};
