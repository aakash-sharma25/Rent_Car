import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

function ViewProfile() {

  const uploadContainerStyle = {
    border: '2px dashed #ccc',
    padding: '20px',
    display: 'inline-block',
    cursor: 'pointer',
  };

  const uploadLabelStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  };

  const navigate= useNavigate();

  const [formdata, setformdata] = useState({
    name: "",
    capacity: "",
    fuelType: "",
    rentPerHour: "",
  });

  const [img,setimg]= useState(null);
  const [uploading,setuploading]= useState(false);

  const changeHandler = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0].name);
    setimg(e.target.files[0]);
  };
  //form handler

  const onfinishHandler = async (e) => {
    setuploading(true);
    e.preventDefault();
    formdata.name = formdata.name.trim();
    formdata.capacity = formdata.capacity.trim();
    formdata.fuelType = formdata.fuelType.trim();
    formdata.rentPerHour = formdata.rentPerHour.trim();

    if (
      formdata.name === "" ||
      formdata.capacity === "" ||
      formdata.fuelType === "" ||
      formdata.rentPerHour === ""||
      img === null
    ) {
      // alert("all field are required");
      toast.error("All fields are required");
      return;
    }

    const formToSend = new FormData();
    formToSend.append("name", formdata.name);
    formToSend.append("capacity", formdata.capacity);
    formToSend.append("fuelType", formdata.fuelType);
    formToSend.append("rentPerHour", formdata.rentPerHour);
    formToSend.append("my_file", img);

    try {
     
      const { data } = await axios.post("/api/v1/car/addCar", formToSend);
      if (data.success) {
        toast.success("Car added successfully");
        navigate("/models");
      } else {
        toast.error("Unable to upload car")
      }
    } catch (error) {
      toast.error("An error occured")
      console.log(error)
    }
    setuploading(false)
  };
  return (
    <>
      <section className="models-section">
        <HeroPages name="Verify Profile" />
        <Footer />
      </section>
    </>
  );
}

export default ViewProfile;
