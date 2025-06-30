import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Don’t forget to create this CSS file
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);

      // Redirect based on role
      const user = JSON.parse(atob(res.data.token.split('.')[1]));
      navigate('/select-role');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <p className="toggle-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="or-separator">or</div>

        <button onClick={handleGoogleLogin} className="google-button">
          <img
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
              alt="Google Logo"
              className="google-logo"
          />
          <span>Continue with Google</span>
    </button>
      </div>
    </div>
  );
};

export default Login;
