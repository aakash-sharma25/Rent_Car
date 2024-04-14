const express= require("express");
const cors = require("cors");
const { connectDB } = require("./config/connectDB");
const userRoute = require("./routes/userRoute")
const carRoute = require("./routes/carRoute")

require("dotenv").config();


const PORT = process.env.PORT ;

const app = express();
app.use(cors());
app.use(express.json())

//database connection
connectDB(); 
//routes

app.use("/api/v1/auth" , userRoute)
app.use("/api/v1/car" , carRoute)


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})