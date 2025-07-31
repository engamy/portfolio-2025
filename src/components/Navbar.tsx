import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar-style.css';

interface NavbarProps {
  darkMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode = false }) => {
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
      icon: '/pictures/portfolio-content_spring2026/06_ICONS/linkedin.png', 
      url: 'https://www.linkedin.com/in/amyeng895/', 
      alt: 'LinkedIn' 
    },
    { 
      icon: '/pictures/portfolio-content_spring2026/06_ICONS/instagram.png', 
      url: 'https://www.instagram.com/yifeng.art/', 
      alt: 'Instagram' 
    },
    { 
      icon: '/pictures/portfolio-content_spring2026/06_ICONS/github.png', 
      url: 'https://github.com/engamy', 
      alt: 'GitHub' 
    },
    { 
      icon: '/pictures/portfolio-content_spring2026/06_ICONS/youtube.png', 
      url: 'https://www.youtube.com/@yifengart', 
      alt: 'YouTube' 
    }
  ];

  return (
    <nav className={`navbar-light ${darkMode ? 'navbar-dark' : ''}`}>
      <div className="navbar-container">
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
      </div>
    </nav>
  );
};

export default Navbar;
