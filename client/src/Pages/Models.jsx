import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { useNavigate } from "react-router-dom";
import { IconCar, IconPhone } from "@tabler/icons-react";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";

function Models() {
  const [cars, setcars] = useState([]);
  const navigate = useNavigate();

  const [search, setsearch] = useState("");

  const fetchCarsByName = async () => {
    const { data } = await axios.post(
      "/api/v1/car/getCarByName",
      { name: search }
    );
    if (data) {
      // setsearch("");
      setcars(data?.car);
    }
  };
  const fetchAllCars = async () => {
    setsearch("");
    const { data } = await axios.get("/api/v1/car/allCar");
    if (data) {
      data.cars.reverse();
      setcars(data?.cars);
    }
  };
  useEffect(() => {
    fetchAllCars();
  }, []);
  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <Suspense fallback={<div>Loading ... </div>}>
          <h1 style={{ margin: "20px", textAlign: "center" }}>
            Search the car with name
          </h1>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                if (e.target.value === "") {
                  fetchAllCars();
                } else {
                  setsearch(e.target.value);
                }
              }}
              value={search}
              style={{ border: "2px solid red", width: "60%" }}
              name="name"
              placeholder="eg - Audi"
            ></input>
            <button style={{ width: "100px" }} onClick={fetchCarsByName}>
              Search
            </button>
          </div>
          <div className="models-container">
            {cars.map((car) => {
              return (
                <>
                  <div className="models-div">
                    <div className="models-div__box">
                      <div className="models-div__box__img">
                        <img src={car?.image} alt="car_img" />
                        <div className="models-div__box__descr">
                          <div className="models-div__box__descr__name-price">
                            <div className="models-div__box__descr__name-price__name">
                              <p> {car.name} </p>
                            </div>
                            <div className="models-div__box__descr__name-price__price">
                              <h4> ₹{car.rentPerHour} </h4>
                              <p>per Hour</p>
                            </div>
                          </div>
                          <div className="models-div__box__descr__name-price__details">
                            <span>
                              <IconCar /> &nbsp; {car.name}
                            </span>
                            <span style={{ textAlign: "right" }}>
                              4/5 &nbsp; <IconCar />
                            </span>
                            <span>
                              <IconCar /> &nbsp; Manual
                            </span>
                            <span style={{ textAlign: "right" }}>
                              {car.fuelType} &nbsp; <IconCar />
                            </span>
                          </div>
                          <div className="models-div__box__descr__name-price__btn ">
                            <div
                              onClick={() => navigate(`bookcar/${car?._id}`)}
                              style={{ color: "white" }}
                            >
                              Book Ride
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Suspense>

        {/* </div> */}
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <IconPhone width={40} height={40} />
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Models;
