import React from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { NavDropdown } from "react-bootstrap";

const Navbar = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate(); // Importing useNavigate hook

  // Function to handle logout
  const handleLogout = () => {
    // Remove access token from localStorage
    localStorage.removeItem("access_token");
    // Redirect to login page
    navigate("/login");
  };

  // Function to render the "Profile" dropdown conditionally
  const renderProfileDropdown = () => {
    // Check if access token is present in localStorage
    if (accessToken) {
      // Render the "Profile" dropdown when access token is present
      return (
        <li className="nav-item ml-3">
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/profile" className="NavItem">Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/order" className="NavItem">Orders</NavDropdown.Item>
            {/* <NavDropdown.Item as={Link} to="/payment" className="NavItem">Payments</NavDropdown.Item> */}
            <NavDropdown.Item onClick={handleLogout} className="NavItem">Logout</NavDropdown.Item>
          </NavDropdown>
        </li>
      );
    } else {
      // Access token is not present, so don't render the "Profile" dropdown
      return null;
    }
  };

  // Function to render the "Login" link conditionally
  const renderLoginLink = () => {
    // Check if access token is present in localStorage
    if (!accessToken) {
      // Render the "Login" link when access token is not present
      return (
        <li className={`nav-item ml-3 ${location.pathname === "/login" ? "active" : ""}`}>
          <Link className="nav-link" to="/login" style={{ fontSize: '20px' }}>Login</Link>
        </li>
      );
    } else {
      // Access token is present, so don't render the "Login" link
      return null;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">

        <Link className="navbar-brand" to="#">
          <img src='./Img/Logo.png' id="logo" alt="Logo_Image" />
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><i class="fa-solid fa-bars"></i></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ml-3 ${location.pathname === "/home" ? "active" : ""}`}>
              <Link className="nav-link" to="/home" style={{ fontSize: '20px' }}>Home</Link>
            </li>
            <li className={`nav-item ml-3 ${location.pathname === "/food2" ? "active" : ""}`}>
              <Link className="nav-link" to="/food2" style={{ fontSize: '20px' }}>Food</Link>
            </li>
            {renderLoginLink()}
            <li className={`nav-item ml-3 ${location.pathname === "/cart" ? "active" : ""}`}>
              <Link className="nav-link" to="/cart" style={{ fontSize: '20px' }}>Cart</Link>
            </li>
            <li className={`nav-item ml-3 ${location.pathname === "/about" ? "active" : ""}`}>
              <Link className="nav-link" to="/about" style={{ fontSize: '20px' }}>About</Link>
            </li>
            {renderProfileDropdown()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;