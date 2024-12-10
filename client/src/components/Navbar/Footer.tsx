import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
           </ul>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
           
           
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Healthy fast-casual food, crafted with <span>❤️</span> in Minneapolis
        </p>
        <p>© 2024 ZENVIBE | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
