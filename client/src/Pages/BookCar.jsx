import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IconStar } from "@tabler/icons-react";
import { IconCar } from "@tabler/icons-react";
import axios from "axios";
import { useAuth } from "../components/cotext/auth";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

function BookCar() {
  const navigate = useNavigate();
  const [auth, setauth] = useAuth();

  const { id } = useParams();
  const [car, setcar] = useState(null);

  const [timingFrom, settimingFrom] = useState(null);
  const [timingTo, settimingTo] = useState(null);
  const [totalAmount, settotalAmount] = useState(0);
  const [rentPerHour, setrentPerHour] = useState(0);
  const [bookingDate, setbookingDate] = useState(null);
  const [returnDate, setreturnDate] = useState(null);

  function calculateTotalHours(startDate, startTime, endDate, endTime) {
    // Combine the date and time strings to create Date objects
    const startDateObj = new Date(`${startDate} ${startTime}`);
    const endDateObj = new Date(`${endDate} ${endTime}`);

    // Calculate the time difference in milliseconds
    const timeDifference = endDateObj - startDateObj;

    // Convert the time difference to hours
    const totalHours = timeDifference / (1000 * 60 * 60);

    return totalHours;
  }

  const makePayment = async (e) => {
    e.preventDefault();
    const stripe = await loadStripe(
      "pk_test_51P3I2pSI6MjanL5ozlpsVeOyNVVPyAy3eD1xA3b7gNJa1vRK2xg4HnXhWPPHmhvT3Kk0rOdvJMMbxxdMqqFJykhe00iMzUoz90"
    );
    const totalHours = calculateTotalHours(
      bookingDate,
      timingFrom,
      returnDate,
      timingTo
    );
    const totalAmount = totalHours * car.rentPerHour;

    const body = {
      success_url: `http://localhost:3000/userbooking`,
      userId: auth?.user?._id,
      name: auth?.user?.username,
      carId: id,
      bookingDate: bookingDate,
      returnDate: returnDate,
      timingFrom: timingFrom,
      timingTo: timingTo,
      totalAmount: (totalAmount),
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      "/api/v1/car/handleCheckout",
      body,
      {
        headers: headers,
      }
    );

    // const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (result.error) {
      console.log(result.error);
      alert("error in making payment");
    } else {
      handleBooking(data.data);
    }
  };

  const handleBooking = async (postData) => {
    // e.preventDefault();

    // const totalHours = calculateTotalHours(
    //   bookingDate,
    //   timingFrom,
    //   returnDate,
    //   timingTo
    // );
    // const totalAmount = totalHours * car.rentPerHour;
    // settotalAmount(totalAmount);
    try {
      // const stripe = await loadStripe(
      //   "pk_test_51P3I2pSI6MjanL5ozlpsVeOyNVVPyAy3eD1xA3b7gNJa1vRK2xg4HnXhWPPHmhvT3Kk0rOdvJMMbxxdMqqFJykhe00iMzUoz90"
      // );
      // const headers = {
      //   "Content-Type": "application/json",
      // };
      const { data } = await axios.post(
        "/api/v1/car/bookCar",
        postData
      );
      toast.success(data.message);
      navigate("/userbooking");
      // const result = stripe.redirectToCheckout({
      //   sessionId: data.sessionId,
      // });

      // console.log(result);
    } catch (error) {
      // console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchSingleCar = async (e) => {
    try {
      const { data } = await axios.post(
        "/api/v1/car/getCarById",
        {
          id: id,
        }
      );
      setcar(data?.car);
      setrentPerHour(data?.car?.rentPerHour);
      // console.log(data.cars);
    } catch (error) {
      toast.error("error occured while fetching the car");
    }
  };

  useEffect(() => {
    fetchSingleCar();
  }, []);
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <div
          style={{
            flex: 1,
            marginTop: "100px",
            alignItems: "center",
            justifyContent: "center",
            margin: "100px auto 0 auto",
            textAlign: "center",
          }}
        >
          <div className="models-div">
            <div className="models-div__box">
              <div className="models-div__box__img">
                <img src={car?.image} alt="car_img" />
                <div className="models-div__box__descr">
                  <div className="models-div__box__descr__name-price">
                    <div className="models-div__box__descr__name-price__name">
                      <p> {car?.name} </p>
                      <span>
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                        <IconStar width={15} height={15} />
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__price">
                      <h4> ₹{car?.rentPerHour} </h4>
                      <p>per day</p>
                    </div>
                  </div>
                  <div className="models-div__box__descr__name-price__details">
                    <span>
                      <IconCar /> &nbsp; {car?.name}
                    </span>
                    <span style={{ textAlign: "right" }}>
                      4/5 &nbsp; <IconCar />
                    </span>
                    <span>
                      <IconCar /> &nbsp; Manual
                    </span>
                    <span style={{ textAlign: "right" }}>
                      {car?.fuelType} &nbsp; <IconCar />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-div__form">
            <form>
              <label>
                Amount<b>*</b>
              </label>
              <input
                type="text"
                disabled
                value={rentPerHour}
                name="rentPerHour"
              ></input>
              <label onClick={() => console.log(bookingDate)}>
                Starting date<b>*</b>
              </label>
              <input
                type="date"
                placeholder="staring date"
                value={bookingDate}
                onChange={(e) => setbookingDate(e.target.value)}
                name="bookingDate"
              ></input>
              <label>
                Ending date<b>*</b>
              </label>
              <input
                type="date"
                placeholder="ending date"
                value={returnDate}
                onChange={(e) => setreturnDate(e.target.value)}
                name="returnDate"
              ></input>
              <label>
                Stating time<b>*</b>
              </label>
              <input
                type="time"
                placeholder="stering time"
                value={timingFrom}
                onChange={(e) => settimingFrom(e.target.value)}
                name="timingFrom"
              ></input>
              <label>
                Ending time<b>*</b>
              </label>
              <input
                type="time"
                placeholder="ending time"
                value={timingTo}
                onChange={(e) => settimingTo(e.target.value)}
                name="timingTo"
              ></input>
              <label>
                Total Amount<b>*</b>
              </label>
              <input
                type="text"
                disabled
                value={totalAmount}
                name="totalAmount"
              ></input>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const totalHours = calculateTotalHours(
                      bookingDate,
                      timingFrom,
                      returnDate,
                      timingTo
                    );
                    const totalAmount = totalHours * car.rentPerHour;
                    settotalAmount(totalAmount);
                  }}
                >
                  Calculate Amount
                </button>
                <button type="submit" onClick={makePayment}>
                  Book Car
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default BookCar;
