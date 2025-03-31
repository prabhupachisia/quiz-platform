import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import pic from "../Images/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  // Check login status whenever component updates
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    // Listen for changes to localStorage (detect login/logout)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault(); // Prevents default link behavior

    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await axios.post("http://localhost:5000/v1/auth/logout", { refreshToken });

      // Clear localStorage on logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      setIsLoggedIn(false); // Update state immediately
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.error || "Something went wrong.");
    }
  };

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
                onClick={() => setActiveTab(0)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/my-quiz"
                className={activeTab === 1 ? "active" : ""}
                onClick={() => setActiveTab(1)}
              >
                My Quiz
              </Link>
            </li>
            <li>
              <Link
                to="/play-quiz"
                className={activeTab === 2 ? "active" : ""}
                onClick={() => setActiveTab(2)}
              >
                Play Quiz
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/login" onClick={handleLogout} className={activeTab === 3 ? "active" : ""}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
