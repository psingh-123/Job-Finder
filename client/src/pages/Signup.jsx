import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("submitting the form..");
    try {
  const res = await axios.post(`https://naukari-dhundo.onrender.com/api/auth/register`, formData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to role selection page
      navigate('/login'); // 👈 Add this
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      // You can also show error message on UI
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://naukari-dhundo.onrender.com/api/auth/google`;
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <p className="toggle-link">
        Already registered? <Link to="/login">Login</Link>
      </p>

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={handleChange}
        />
        <button type="submit">Register</button>
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
  );
};

export default Signup;
