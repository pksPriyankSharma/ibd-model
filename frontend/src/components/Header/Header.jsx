import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Redirect to another page
    navigate("/Service");
  };
  return (
    <div className="container">
      <div className="left-side">
        <h1>
          Providing Quality <span className="health"> Healthcare </span>for a
          Brighter and Healthy Future
        </h1>
        <p>
          {" "}
          At our hospital, we are dedicated to providing exceptional medical
          care to our patients and their families. Our experienced team of
          medical professionals, cutting-edge technology, and compassionate
          approach make us a leader in{" "}
          <span className="health">the healthcare industry.</span>
        </p>
        <button onClick={handleButtonClick}>Appointments</button>
      </div>
      <div className="right-side">
        <div className="image-container">
          <img src={assets.header} alt="Sample" />
        </div>
      </div>
    </div>
  );
};

export default Header;
