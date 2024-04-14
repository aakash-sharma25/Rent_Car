import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../src/Pages.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/cotext/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [auth, setauth] = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      // console.log(response.data.sucess);
      if (response.data.sucess === true) {
        const data = JSON.stringify(response.data);
        setauth({
          ...auth,
          user: response.data.user,
        });
        localStorage.setItem("auth", data);
        toast.success("login is successfull");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(()=> {
    const data = localStorage.getItem("auth");
    if(data) {
      navigate("/")
    }
  }, [] )
  return (
    <div className="App">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
