import React from 'react';
import './Home.css'; // Create this file for styling or include it in your global CSS.
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <div className="hero-section">
        <h1>ZENVIBE</h1>
        <h2>We are your way to relaxing  </h2>
        <div className="buttons">
          <button><Link to="/signup" style={{textDecoration: "none", color: "white"}}>Signup</Link></button>
          <button><Link to="/login" style={{textDecoration: "none", color: "white"}}>Login</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
