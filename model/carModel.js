const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    rentPerHour: { type: Number, required: true },
    owner:{type:String,default:"admin"}
  },
  { timestamps: true }
);
const carModel = mongoose.model("cars", carSchema);
module.exports = carModel;
