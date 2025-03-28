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
      const response = await axios.get('/users.json');
      const users = response.data.users;
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
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
          <button id="login-submit" type="submit">Sign In</button>
          <button id="login-signup" type="button" onClick={() => navigate('/signup')}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};
export default Login;