import React from 'react';
import './footer-style.css';

const ICON_PATH = process.env.PUBLIC_URL + '/pictures/portfolio-content_spring2026/06_ICONS/';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <div className="footer-nav-title">Where To?</div>
        <nav className="footer-nav-links">
          <a href="/">Home</a>
          <a href="/design">Design</a>
          <a href="/code">Code</a>
          <a href="/art">Art</a>
          <a href="/about">About</a>
        </nav>
        <div className="footer-copyright">
          © Amy Eng 2025 All Rights Reserved
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-links">
          <div className="footer-socials">
          <a href="https://www.linkedin.com/in/amyeng895/" target="_blank" rel="noopener noreferrer">
            <img src={`${ICON_PATH}linkedin.png`} alt="LinkedIn" />
          </a>
          <a href="https://www.instagram.com/yifeng.art/" target="_blank" rel="noopener noreferrer">
            <img src={`${ICON_PATH}instagram.png`} alt="Instagram" />
          </a>
          <a href="https://github.com/engamy" target="_blank" rel="noopener noreferrer">
            <img src={`${ICON_PATH}github.png`} alt="GitHub" />
          </a>
          <a href="https://www.youtube.com/@yifengart" target="_blank" rel="noopener noreferrer">
            <img src={`${ICON_PATH}youtube.png`} alt="YouTube" />
          </a>
        </div>

          <div className="footer-email-phone">
          <div><span className="footer-contact-label">Email:</span> amyeng895@gmail.com</div>
          <div><span className="footer-contact-label">Phone:</span> 347-480-4767</div>
          </div>

          <div className="footer-copyright">
          © Amy Eng 2025 All Rights Reserved
        </div>
        </div>

        <div className="footer-logo">
            <img src={`${ICON_PATH}logo_red.png`} alt="Logo" />
          </div>
        
      </div>
    </footer>
  );
} 