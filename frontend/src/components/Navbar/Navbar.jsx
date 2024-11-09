import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaBars, FaTimes } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { CgProfile } from "react-icons/cg";
import { TbReportMedical } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    alert("You are loging out");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <li
          onClick={() => {
            setMenu("home");
            setIsMobileMenuOpen(false);
          }}
          className={menu === "home" ? "active" : ""}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => {
            setMenu("service");
            setIsMobileMenuOpen(false);
          }}
          className={menu === "service" ? "active" : ""}
        >
          <Link to="/service">Service</Link>
        </li>
        <li
          onClick={() => {
            setMenu("contact");
            setIsMobileMenuOpen(false);
          }}
          className={menu === "contact" ? "active" : ""}
        >
          <Link to="/contact">Contact Us</Link>
        </li>
        <div className="navbar-right">
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <CgProfile style={{ height: "30px", width: "30px" }} />
              <ul className="nav-profile-dropdown">
                <li>
                  <TbReportMedical style={{ height: "20px", width: "20px" }} />
                  <p onClick={() => navigate("/myorders")}>Appointment</p>
                </li>
                <hr />
                <li onClick={logOut}>
                  <IoIosLogOut style={{ height: "20px", width: "20px" }} />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
