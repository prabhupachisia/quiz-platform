import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import pic from "../Images/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
      const user = JSON.parse(localStorage.getItem("user"));
      setUserRole(user?.role || null);
      setUserName(user?.name || "");
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axios.post("http://localhost:5000/v1/auth/logout", { refreshToken });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserRole(null);
      setUserName("");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={pic} alt="logo" width="110" height="30" />
        </div>

        <nav className="nav-links">
          {isLoggedIn && (
            <ul>
              <li>
                <Link to="/" className={activeTab === 0 ? "active" : ""} onClick={() => setActiveTab(0)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-quiz" className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>
                  My Quiz
                </Link>
              </li>
              <li>
                <Link to="/play-quiz" className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>
                  Play Quiz
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout} className={activeTab === 3 ? "active" : ""}>
                  Logout
                </Link>
              </li>
              <li>
                <Link to="/profile" className={activeTab === 4 ? "active" : ""} onClick={() => setActiveTab(4)}>
                  <span className="user-icon">👤</span> {userName}
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
