import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Find Jobs. Hire Talent.</h1>
        <p>Connecting local talent with job posters quickly and easily.</p>
        <div className="home-buttons">
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <Link to="/login" className="btn-secondary">Already Registered?</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Post Jobs" />
          <h3>Post Jobs</h3>
          <p>Need help? Post your work and get matched with local talent.</p>
        </div>
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Apply to Jobs" />
          <h3>Apply to Jobs</h3>
          <p>Find work opportunities near you — fast and reliable.</p>
        </div>
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Real-time Notification" />
          <h3>Real-time Updates</h3>
          <p>Stay informed with on-site notifications for job actions.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
