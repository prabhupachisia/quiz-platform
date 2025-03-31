import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import person from "../Images/person.png";
import pass from "../Images/password.png";
import emailimg from "../Images/email.png";
import "./signup.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
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

                if (tokens && tokens.access && tokens.refresh) {
                    localStorage.setItem("accessToken", tokens.access.token);
                    localStorage.setItem("refreshToken", tokens.refresh.token);
                    localStorage.setItem("user", JSON.stringify(user));

                    navigate("/");  // Redirect to homepage
                    window.location.reload(); // 🔄 Force page reload to update Navbar
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
        <div className="wrapper">
            <form action="">
                <h1>Sign Up</h1>
                <div className="input-box">
                    <img src={person} alt="" />
                    <input type="text" placeholder="Username" value={username}
                        onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-box">
                    <img src={emailimg} alt="" />
                    <input type="email" placeholder="Email Address" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-box">
                    <img src={pass} alt="" />
                    <input type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-box">
                    <select name="role" id="roles" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">--Select Option--</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <button type="submit" onClick={handleSignUp}>Sign Up</button>
                <div className="register-link">
                    <p>Already have an account?&nbsp;<Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
