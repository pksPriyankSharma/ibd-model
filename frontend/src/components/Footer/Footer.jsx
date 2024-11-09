import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div>
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
              dolorum deserunt unde, autem
            </p>
            <div className="footer-social-icon">
              <CiFacebook />
              <CiTwitter />
              <CiLinkedin />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>Service</li>
              <li>Contect Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+1-121-456-7890</li>
              <li>contact@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
          {" "}
          Copyright 2024 © -ALL Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
