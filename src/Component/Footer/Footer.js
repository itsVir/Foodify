// Footer.js
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  
  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq-section");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="Footer">
      <footer className="footer-distributed">
        <div className="footer-left">
          <span className="footer-logo">
            <img src="/Img/logo.png" alt="logo" />
          </span>

          <p className="footer-links">
            <Link to="/home" className="link-1">
              Home
            </Link>
            <Link to="/about" onClick={scrollToFAQ}>
              FAQ
            </Link>
            <a href="https://wa.me/6353836180?text=I'm%20Want%20To%20Buy%20Food%20form%20Your%20Site%20But%20Have%20Some%20Qustions" target="_wp">
              Contact
            </a>
          </p>

          <p className="footer-company-name"> Foodify© 2024</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Solaris Business Hub</span> Ahmedabad, Gujarat
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>
              <a href="tel:+916353836180">+91-6353836180</a>
            </p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:its.foodify@gmail.com">its.foodify@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            Foodify is an online food ordering platform that provides fresh and healthy food delivered to your doorstep in a limited time period.
          </p>

          <div className="footer-icons">
            <a href="/" target="_blank">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="/" target="_blank">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="/" target="_blank">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com/itz.foodify?igshid=MTY1cjBkbG1iNDdteg==" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </a>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
