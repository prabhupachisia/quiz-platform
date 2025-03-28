import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.get('/users.json');
      let users = response.data.users;

      if (users.some(u => u.username === username)) {
        setError('Username already exists');
        return;
      }

      const newUser = { username, password };
      users.push(newUser);

      await axios.put('/users.json', { users });
      navigate('/login');
    } catch (err) {
      setError('Sign up failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div id="signup-container" className="signup-container">
      <div id="signup-box" className="signup-box">
        <h2 id="signup-title">Sign Up</h2>
        {error && <div id="signup-error" className="error-message">{error}</div>}
        <form onSubmit={handleSignUp} id="signup-form">
          <input id="signup-username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input id="signup-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input id="signup-confirm-password" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button id="signup-submit" type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;