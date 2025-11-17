import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [pendingUser, setPendingUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`https://naukari-dhundo.onrender.com/api/auth/login`, {
        email,
        password,
      });

      const token = res.data.token;
      const decodedUser = jwtDecode(token);

      console.log('Decoded token:', decodedUser);

      // ✅ Store user + token in AuthContext
      login(decodedUser, token);

      // ✅ Set temporary user for redirect useEffect
      setPendingUser(decodedUser);

    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  // ✅ Redirect after AuthContext updates
  useEffect(() => {
    if (!pendingUser) return;

    const isAdmin =
      pendingUser.isAdmin === true || pendingUser.isAdmin === 'true';

    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/select-role');
    }
  }, [pendingUser, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `https://naukari-dhundo.onrender.com//api/auth/google`;
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
