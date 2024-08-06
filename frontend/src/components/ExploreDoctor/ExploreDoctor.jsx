import React, { useState } from "react";
import "./ExploreDoctor.css";
import { assets, doctor_list } from "../../assets/assets";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExploreDoctor = () => {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const handleButtonClick = (doctor) => {
    navigate("/service", {
      state: { selectedDoctor: doctor },
    });
  };

  const filteredDoctors =
    category === "All"
      ? doctor_list
      : doctor_list.filter((doctor) => doctor.doctor_specialist === category);

  return (
    <div className="explore-doctor" id="explore-doctor">
      <h1>Explore Doctors</h1>
      <p className="explore-doctor-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
        exercitationem?
      </p>
      <div className="explore-doctor-list">
        {doctor_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.doctor_specialist ? "All" : item.doctor_specialist
              )
            }
            key={index}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.doctor_specialist ? "active" : ""}
              src={item.doctor_img}
              alt=""
            />
            <p>{item.doctor_specialist}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className="doctor-cards">
        {filteredDoctors.map((doctor, index) => (
          <div key={index} className="e-card playing">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="infotop">
              <br />
              <img className="image" src={assets.Doctor_img} alt="" />
              <div>Name: {doctor.doctor_name}</div>
              <div>Specialist: {doctor.doctor_specialist}</div>
              <div>Experience: {doctor.doctor_experience} Years</div>
              <div>Fees: {doctor.price} Rupies</div>
              <button
                onClick={() => handleButtonClick(doctor)}
                className="arrow"
              >
                Book Appointment <FaLongArrowAltRight className="arrow_key" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreDoctor;
