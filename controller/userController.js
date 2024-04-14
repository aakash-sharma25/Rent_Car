const usermodel = require("../model/usermode");
const bcrypt = require("bcrypt");
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

exports.registerController = async (req, res) => {
  try {
    // console.log(req.body)
    const { name, email, password, location } = req.body;
    if (!name || !email || !password || !location) {
      return res.status(500).json({
        sucess: false,
        message: "all fields are required",
      });
    }
    const existuser = await usermodel.findOne({ email });

    if (existuser) {
      return res.status(401).json({
        sucess: false,
        message: "user already exist",
      });
    }

    const hassedpassword = await bcrypt.hash(password, 10);
    // password=hassedpassword;
    const user = await new usermodel({
      username: name,
      email,
      password: hassedpassword,
      location,
    }).save();
    return res.status(200).json({
      sucess: true,
      message: "user created sucessfully ",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "error in register user",
    });
  }
};
exports.registerControllerV2 = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, location } = req.body;
    if (!name || !email || !password || !location) {
      return res.status(500).json({
        sucess: false,
        message: "all fields are required",
      });
    }
    const existuser = await usermodel.findOne({ email });

    if (existuser) {
      return res.status(401).json({
        sucess: false,
        message: "user already exist",
      });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    console.log(cldRes.secure_url);

    const hassedpassword = await bcrypt.hash(password, 10);
    const user = await new usermodel({
      username: name,
      email,
      password: hassedpassword,
      location,
      identityProff: cldRes.secure_url,
    }).save();
    return res.status(200).json({
      sucess: true,
      message: "user created sucessfully ",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "error in register user",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        sucess: false,
        message: "enter full detail",
      });
    }

    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(200).json({
        sucess: false,
        message: "not a registered user please login",
      });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    console.log(password, user.password);
    console.log(ismatch);
    if (!ismatch) {
      return res.status(401).json({
        sucess: false,
        message: "invalid username or password",
        password,
      });
    }

    return res.status(200).json({
      sucess: true,
      message: "user logged in sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "error in register user",
    });
  }
};
exports.getAllNotification = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await usermodel.findById(userId);

    const notification = user?.notification;

    return res.status(200).json({
      sucess: true,
      message: "All notification fetched successfully",
      notification: notification,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "error in fetching the notificaton",
    });
  }
};
