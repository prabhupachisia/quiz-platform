import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import pass from "../Images/password.png";
import emailimg from "../Images/email.png";
import "./login.css";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/v1/auth/login", {
                email,
                password,
            });

            const { user, tokens } = response.data;

            localStorage.setItem("accessToken", tokens.access.token);
            localStorage.setItem("refreshToken", tokens.refresh.token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/");  // Redirect to homepage
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <img src={emailimg} alt="" />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-box">
                    <img src={pass} alt="" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="remember-forget">
                    <label><input type="checkbox" />Remember Me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
                <div className="register-link">
                    <p>Don't have an account?&nbsp;<Link to="/signup">Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
