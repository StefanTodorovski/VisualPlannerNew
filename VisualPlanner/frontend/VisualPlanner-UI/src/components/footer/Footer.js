import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";
import logo from "../../assets/planner.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="upper-container">
        <div className="link-container">
          <a href="/" className="footer-link">
            Home
          </a>
          <a href="/services" className="footer-link">
            Services
          </a>
          <a href="/about" className="footer-link">
            About
          </a>
          <a href="/contact" className="footer-link">
            Contact
          </a>
        </div>
        <div className="social-container">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaInstagram />
          </a>
          <a href="mailto:info@example.com" className="footer-icon">
            <FaEnvelope />
          </a>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="logo-container">
        <img src={logo} alt="Furry Footsteps Logo" className="footer-logo" />
      </div>
    </footer>
  );
};

export default Footer;
