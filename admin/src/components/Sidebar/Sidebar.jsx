import React from "react";
import "./Sidebar.css";
import { CiBookmarkRemove } from "react-icons/ci";
import { CiMedicalClipboard } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/yourAppoinment" className="sidebar-option">
          <CiMedicalClipboard style={{ width: "20px", height: "20px" }} />
          <p>Your Appointments</p>
        </NavLink>
        <NavLink to="cancelAppointment" className="sidebar-option">
          <CiBookmarkRemove style={{ width: "20px", height: "20px" }} />
          <p>Cancel Appointment</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
