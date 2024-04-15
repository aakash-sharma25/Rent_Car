import { Link, useNavigate } from "react-router-dom";
// import Logo from "../images/logo/logo.png";
import Logo from "../images/logo/CAR.png";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "./cotext/auth";
import toast from "react-hot-toast";

function Navbar() {
  const [auth, setauth] = useAuth();

  useState(() => {
    console.log(auth);
  });

  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
    });
    localStorage.removeItem("auth");
    navigate("/login");
    toast.success("logout successfully");
  };

  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <IconX width={30} height={30} />
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
            {auth?.user ? (
              <>
                <li>
                  {" "}
                  <Link onClick={openNav} className="models-link" to="/models">
                    Vehicle Models
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={openNav}
                    className="team-link"
                    to="/notification"
                  >
                    Notification
                  </Link>
                </li>
              </>
            ) : null}
            {auth?.user?.isAdmin === "true" ? (
              <>
                <li>
                  <Link className="models-link" to="/add-vehicle">
                    Add Vehicle
                  </Link>
                </li>
                <li>
                  <Link className="models-link" to="/admin-allbooking">
                    All Booking
                  </Link>
                </li>
              </>
            ) : null}
            {auth?.user?.isAdmin === "false" ? (
              <>
                <li>
                  <Link
                    onClick={openNav}
                    className="models-link"
                    to="/userbooking"
                  >
                    My Bookings
                  </Link>
                </li>
              </>
            ) : null}
            {!auth?.user ? (
              <>
                <Link
                  onClick={openNav}
                  className="navbar__buttons__sign-in"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  onClick={openNav}
                  className="navbar__buttons__register"
                  to="/signup"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                onClick={() => {
                  openNav();
                  handleLogout();
                }}
                className="navbar__buttons__register"
              >
                Logout
              </Link>
            )}
          </ul>
        </div>

        {/* desktop */}

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            {auth?.user ? (
              <>
                <li>
                  {" "}
                  <Link className="models-link" to="/models">
                    Vehicle Models
                  </Link>
                </li>
                <li>
                  <Link className="team-link" to="/notification">
                    Notification
                  </Link>
                </li>
              </>
            ) : null}

            <li>
              {" "}
              <Link className="testi-link" to="/testimonials">
                Testimonials
              </Link>
            </li>

            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
            {auth?.user?.isAdmin === "true" ? (
              <>
                <li>
                  <Link className="models-link" to="/add-vehicle">
                    Add Vehicle
                  </Link>
                </li>
                <li>
                  <Link className="models-link" to="/admin-allbooking">
                    All Booking
                  </Link>
                </li>
              </>
            ) : null}
            {auth?.user?.isAdmin === "false" ? (
              <>
                <li>
                  <Link className="models-link" to="/userbooking">
                    My Bookings
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          <div className="navbar__buttons">
            {!auth?.user ? (
              <>
                <Link className="navbar__buttons__sign-in" to="/login">
                  Login
                </Link>
                <Link className="navbar__buttons__register" to="/signup">
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                className="navbar__buttons__register"
                onClick={handleLogout}
              >
                Logout
              </Link>
            )}
          </div>

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <IconMenu2 width={30} height={30} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
