import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useEffect } from "react";
import { useAuth } from "./components/cotext/auth";
import  { Toaster } from 'react-hot-toast';
import BookCar from "./Pages/BookCar";
import AddVehicle from "./Pages/AddVehicle";
import AllBookings from "./Pages/AllBookings";
import UserBooking from "./Pages/UserBooking";
import Notification from "./Pages/Notification";
import ViewProfile from "./Pages/ViewProfile";
import ReviewBooking from "./Pages/ReviewBooking";

function App() {
  const [auth , setauth] = useAuth();
  useEffect(()=>{
      console.log(auth);
  },[ ])
  return (
    <>
      <Navbar />
      <Toaster/>
      <Routes>
      <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="contact" element={<Contact />} />
        <Route path="models/bookcar/:id" element={<BookCar />} />
        <Route path="add-vehicle" element={<AddVehicle />} />
        <Route path="admin-allBooking" element={<AllBookings />} />
        <Route path="admin-viewBooking/:id" element={<ReviewBooking />} />
        <Route path="userbooking" element={<UserBooking />} />
        <Route path="notification" element={<Notification />} />
      
      </Routes>
    </>
  );
}

export default App;
