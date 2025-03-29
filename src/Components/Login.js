import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div id="login-container" className="login-container">
      <div id="login-box" className="login-box">
        <h2 id="login-title">Login</h2>
        {error && <div id="login-error" className="error-message">{error}</div>}
        <form onSubmit={handleLogin} id="login-form">
          <input id="login-username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input id="login-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button id="login-submit" type="submit" onClick={handleLogin}>Sign In</button>
          <button id="login-signup" type="button" onClick={() => navigate('/signup')}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};
export default Login;