import React from 'react';
import './LandingPage.css'; // Create this file for styling or include it in your global CSS.

const LandingPage: React.FC = () => {
  return (
    <div>
      <div className="navbar">
        <div className="contact-info"></div>
        <div className="logo">ZENVIBE</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#pages">Pages</a></li>
          <li><a href="#portfolio">Login</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div className="hero-section">
        <h1>ZENVIBE</h1>
        <h2>We are your way to relaxing  </h2>
        <div className="buttons">
          <button>Read More</button>
          <button>Purchase Now</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
