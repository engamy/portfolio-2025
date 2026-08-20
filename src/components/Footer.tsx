import React from 'react';
import { Link } from 'react-router-dom';
import './footer-style.css';
import { getAssetPath } from '../utils/assetUtils';
import ExternalLink from './page-components/ExternalLink';
import { ICONS, socials } from '../data/socials';

const pages = [
  { to: '/', label: 'Home' },
  { to: '/design', label: 'Design' },
  { to: '/code', label: 'Code' },
  { to: '/art', label: 'Art' },
  { to: '/about', label: 'About' }
];

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <div className="footer-nav-title">Where To?</div>
        <nav className="footer-nav-links">
          {/* Router links rather than plain anchors, so these do not reload the page. */}
          {pages.map(page => (
            <Link key={page.to} to={page.to}>{page.label}</Link>
          ))}
        </nav>
        <div className="footer-copyright">
          © Amy Eng 2026 All Rights Reserved
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-links">
          <div className="footer-socials">
            {socials.map(social => (
              <ExternalLink key={social.href} href={social.href}>
                <img src={getAssetPath(`${ICONS}/${social.icon}`)} alt={social.label} />
              </ExternalLink>
            ))}
          </div>

          <div className="footer-email-phone">
          <div><span className="footer-contact-label">Email:</span> amyeng895@gmail.com</div>
          </div>
        </div>

        <div className="footer-logo">
            <img src={getAssetPath(`${ICONS}/logo_red.png`)} alt="Logo" />
          </div>

      </div>
    </footer>
  );
}
