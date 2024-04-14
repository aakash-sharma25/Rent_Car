const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/connectDB");
const userRoute = require("./routes/userRoute");
const carRoute = require("./routes/carRoute");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

//database connection
connectDB();
//routes

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/car", carRoute);

if (process.env.MODE === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
