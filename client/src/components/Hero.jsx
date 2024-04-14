import { Link, useNavigate } from "react-router-dom";
// import BgShape from "../images/hero/car_bg.png";
import BgShape from "../images/hero/hero-bg.png";
// import HeroCar from "../images/hero/car_bg.png";
import HeroCar from "../images/hero/main-car.png";
import { useEffect, useState } from "react";
import { IconChevronRight, IconCircleCheck } from "@tabler/icons-react";
import { useAuth } from "./cotext/auth";

function Hero() {
  const [goUp, setGoUp] = useState(false);
  const [auth, setauth] = useAuth();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: (0, 0), behavior: "smooth" });
  };

  const bookBtn = () => {
    // alert("button")
    // navigate("/models");
    // document
    //   .querySelector("#booking-section")
    //   .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);
  return (
    <>
      <section id="home" className="hero-section">
        <div className="container">
          {auth?.user ? (
            <img className="bg-shape" src={BgShape} alt="bg-shape" />
          ) : null}

          <div className="hero-content">
            <div className="hero-content__text">
              <h4>Plan your trip now</h4>
              <h1>
                Save <span>big</span> with our car rental
              </h1>
              <p>
                Rent the car of your dreams. Unbeatable prices, unlimited miles,
                flexible pick-up options and much more.
              </p>

              {auth?.user ? (
                <>
                  <div className="hero-content__text__btns">
                    <Link
                      onClick={() => bookBtn()}
                      className="hero-content__text__btns__book-ride"
                      to="/models"
                    >
                      Book Ride &nbsp; <IconCircleCheck />
                    </Link>
                    <Link
                      className="hero-content__text__btns__learn-more"
                      to="/about"
                    >
                      Learn More &nbsp; <IconChevronRight />
                    </Link>
                  </div>
                </>
              ) : null}
            </div>

            {/* img */}
            <img
              src={HeroCar}
              alt="car-img"
              className="hero-content__car-img"
            />
          </div>
        </div>

        {/* page up */}
        <div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          ^
        </div>
      </section>
    </>
  );
}

export default Hero;
