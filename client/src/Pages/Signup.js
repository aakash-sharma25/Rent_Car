import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/Pages.css";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [img, setimg] = useState(null);
  const [loading, setloading] = useState(false);

  const handleImageChange = (e) => {
    setimg(e.target.files[0]);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !password || !address || !img || !address) {
      toast.error("All fields are Required");
      toast.error("Please fill all the fileds");
      return;
    }
    setloading(true);
    const formToSend = new FormData();
    formToSend.append("email", email);
    formToSend.append("name", name);
    formToSend.append("password", password);
    formToSend.append("location", address);
    formToSend.append("my_file", img);

    try {
      const response = await axios.post(
        "/api/v1/auth/registerV2",
        formToSend
      );
      // console.log(response);
      toast.success("User Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <form className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => handleNameChange(e)}
            placeholder="Enter name"
            required
          />
        </form>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
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
            onChange={(e) => handlePasswordChange(e)}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => handleAddressChange(e)}
            placeholder="Enter address"
            required
          />
          <label>Upload Your addhar card or driving licence</label>
          <input
            type="file"
            id="fileInput"
            accept=".jpg,.jpeg,.png"
            style={{ display: "none" }}
            onChange={handleImageChange}
            required
          />
          <label htmlFor="fileInput" style={buttonStyle}>
            Upload File
          </label>
          {img && (
            <h2 style={{ margin: "10px", color: "green" }}>
              {img.name} <span>Uploaded</span>
            </h2>
          )}
        </div>
        <button type="submit" disabled={loading} >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
