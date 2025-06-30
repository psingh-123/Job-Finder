import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>JobFinder</h3>
        <p>Your go-to platform to connect job seekers with real-time job openings in your area.</p>
        <p>&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
      </div>

      <div className="footer-right">
         <h4>Quick Links</h4>
    <a href="/about"><i className="fas fa-info-circle"></i> About Us</a>
    <a href="/contact"><i className="fas fa-envelope"></i> Contact</a>
    <a href="/privacy"><i className="fas fa-user-shield"></i> Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
