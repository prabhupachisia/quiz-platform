import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import person from "./Images/person.png";
import pass from "./Images/password.png";
import emailimg from "./Images/email.png";

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Teacher");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setAction("Login");
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/v1/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.tokens.access.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    setAction("Sign Up");
    e.preventDefault();
    setError("");

    const userData = {
      user: {
        role,
        isEmailVerified: false,
        name: username,
        email,
      },
      password,
    };

    try {
      const response = await axios.post("http://localhost:5000/v1/auth/register", userData);
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Sign up failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={person} alt="" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}

        <div className="input">
          <img src={emailimg} alt="" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <img src={pass} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {action === "Login" ? null : (
          <div className="input">
            <select name="role" id="roles" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
        )}
      </div>
      {action === "Sign Up" ? null : (
        <div className="forgot-password">
          Lost Password? <span>Click Here</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={handleSignUp}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={handleLogin}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;