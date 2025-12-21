import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar-style.css';
import { getAssetPath } from '../utils/assetUtils';

interface NavbarProps {
  darkMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/design', label: 'Design' },
    { path: '/code', label: 'Code' },
    { path: '/art', label: 'Art' },
    { path: '/about', label: 'About' }
  ];

  const socialLinks = [
    { 
      icon: getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/linkedin.png'), 
      url: 'https://www.linkedin.com/in/amyeng895/', 
      alt: 'LinkedIn' 
    },
    { 
      icon: getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/instagram.png'), 
      url: 'https://www.instagram.com/yifeng.art/', 
      alt: 'Instagram' 
    },
    { 
      icon: getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/github.png'), 
      url: 'https://github.com/engamy', 
      alt: 'GitHub' 
    },
    { 
      icon: getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/youtube.png'), 
      url: 'https://www.youtube.com/@yifengart', 
      alt: 'YouTube' 
    }
  ];

  return (
    <nav className={`navbar-light ${darkMode ? 'navbar-dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link" onClick={() => setIsMenuOpen(false)}>Amy Eng</Link>
        </div>

        <ul className="navbar-nav">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-spacer"></div>

        <div className="social-icons">
          {socialLinks.map((social) => (
            <a
              key={social.alt}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title={social.alt}
            >
              <img 
                src={social.icon} 
                alt={social.alt} 
                className="social-icon"
              />
            </a>
          ))}
        </div>

        <button
          className={`hamburger-button ${isMenuOpen ? 'open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-overlay"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      <div
        id="mobile-overlay"
        className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
      >
          <div className="overlay-header">
            <Link to="/" className="overlay-brand-link" onClick={() => setIsMenuOpen(false)}>
              Amy Eng
            </Link>
            <button
              className="exit-button"
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="exit-line" />
              <span className="exit-line" />
            </button>
          </div>
          <div className="overlay-content">
            <ul className="overlay-nav">
              {navItems.map((item) => (
                <li key={item.path} className="overlay-item">
                  <Link
                    to={item.path}
                    className={`overlay-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="overlay-footer">
              <div className="overlay-social-icons">
                {socialLinks.map((social) => (
                  <a
                    key={social.alt}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={social.alt}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img 
                      src={social.icon} 
                      alt={social.alt} 
                      className="social-icon"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
