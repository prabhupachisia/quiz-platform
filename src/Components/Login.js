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
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setAction("Login");
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/v1/auth/login", {
        email,
        password,
      });

      // Extract user and tokens from the response
      const { user, tokens } = response.data;

      // Store user info along with tokens in localStorage
      localStorage.setItem("accessToken", tokens.access.token);
      localStorage.setItem("refreshToken", tokens.refresh.token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user data as string

      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const userData = {
      role,
      name: username,
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:5000/v1/auth/register", userData);

      if (response.data) {
        const { user, tokens } = response.data;

        // Ensure tokens exist before storing
        if (tokens && tokens.access && tokens.refresh) {
          localStorage.setItem("accessToken", tokens.access.token);
          localStorage.setItem("refreshToken", tokens.refresh.token);
          localStorage.setItem("user", JSON.stringify(user));

          navigate("/"); // Redirect to homepage
        } else {
          throw new Error("Signup successful, but no tokens received.");
        }
      } else {
        throw new Error("Signup response is empty.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed. Please try again.");
    }
  };



  return (
    <div className="container">
      <div className="login-header">
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
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
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
