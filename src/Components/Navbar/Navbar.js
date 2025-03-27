import React, { useState } from "react";
import { Link } from "react-router-dom";
import pic from "../Images/logo.jpg";
import DrawerComp from "./DrawerComp";
import "./Navbar.css"; // Import the new CSS file for styling

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <img src={pic} alt="logo" width="110" height="30" />
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <ul>
            <li>
              <Link
                to="/"
                className={activeTab === 0 ? "active" : ""}
                onClick={() => { setActiveTab(0); }}
              >Home</Link>
            </li>
            <li>
              <Link
                to="/my-quiz"
                className={activeTab === 1 ? "active" : ""}
                onClick={() => { setActiveTab(1); }}
              >My Quiz</Link>
            </li>
            <li>
              <Link
                to="/play-quiz"
                className={activeTab === 2 ? "active" : ""}
                onClick={() => { setActiveTab(2); }}
              >Play Quiz</Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation - Drawer */}
        <div className="mobile-nav">
          <DrawerComp />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
