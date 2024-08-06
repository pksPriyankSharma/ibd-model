import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <CgProfile
        style={{ height: "30px", width: "30px" }}
        className="profile"
      />
    </div>
  );
};

export default Navbar;
