import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroPages from "../components/HeroPages";
import Footer from "../components/Footer";
import axios from "axios";
import { IconCar } from "@tabler/icons-react";

export default function ReviewBooking() {
  const { id } = useParams();

  const [car, setcar] = useState(null);
  const [requestedUser, setrequestedUser] = useState(null);
  const [loading, setloading] = useState(false);
  const fetchBookingDetails = async () => {
    setloading(true);
    const { data } = await axios.get(
      `/api/v1/auth/get-booking-details/${id}`
    );
    console.log(data);
    setcar(data?.requestedCar);
    setrequestedUser(data?.requestedUser);
    setloading(false);
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);
  return (
    <>
      <section className="models-section">
        <HeroPages name="Verify Bookings" />
        {loading ? (
          <p style={{textAlign:"center",fontSize:"20px"}}>Loading...</p>
        ) : (
          <div
            className="models-containe"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {requestedUser && (
              <div className="models-div__box">
                <h1 style={{fontSize:"20px",marginBlock:"20px"}}>User Details</h1>
                <div className="models-div__box__img">
                  <img src={requestedUser?.identityProff} alt="car_img" />
                  <div className="models-div__box__descr">
                    <div className="models-div__box__descr__name-price">
                      <div className="models-div__box__descr__name-price__price">
                        <h4> {requestedUser?.email} </h4>
                        <h4> {requestedUser?.location} </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {car && (
              <div className="models-div__box">
                <h1 style={{fontSize:"20px",marginBlock:"20px"}}>Car details</h1>
                <div className="models-div__box__img">
                  <img src={car?.image} alt="car_img" />
                  <div className="models-div__box__descr">
                    <div className="models-div__box__descr__name-price">
                      <div className="models-div__box__descr__name-price__name">
                        <p> {car?.name} </p>
                      </div>
                      <div className="models-div__box__descr__name-price__price">
                        <h4> ₹{car?.rentPerHour} </h4>
                        <p>per day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <Footer />
      </section>
    </>
  );
}
