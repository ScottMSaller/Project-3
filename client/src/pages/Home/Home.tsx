import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <div className="hero-section">
        <h1 className="title">ZENVIBE</h1>
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
