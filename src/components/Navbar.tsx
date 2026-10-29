import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar-style.css';
import SectionLink from './page-components/SectionLink';
import SocialLinks from './page-components/SocialLinks';
import { SECTION_IDS } from '../utils/sectionScroll';

interface NavbarProps {
  darkMode?: boolean;
}

const SECTION_LABELS: Record<string, string> = {
  home: 'Home',
  featured: 'Featured',
  work: 'Work',
  'creative-lab': 'Creative Lab'
};

const Navbar: React.FC<NavbarProps> = ({ darkMode = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAbout = location.pathname === '/about';

  // The reference reads --nav-bg/--nav-fg off the document element so the
  // safe-area strip above the bar can match it. DarkModeContext decides which
  // way round it goes: dark nav is the default, light adds the class.
  useEffect(() => {
    document.documentElement.classList.toggle('nav-light', !darkMode);
  }, [darkMode]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close on Escape, on a click outside the header, and when the viewport
  // grows past the breakpoint where the menu button disappears.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        document.getElementById('menu-btn')?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      const header = document.querySelector('.site');
      if (header && !header.contains(event.target as Node)) closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth > 760) closeMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen, closeMenu]);

  // Any route change closes the menu.
  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash, closeMenu]);

  const sectionItems = SECTION_IDS.map(id => (
    <li key={id}>
      <SectionLink id={id} onNavigate={closeMenu}>
        {SECTION_LABELS[id]}
      </SectionLink>
    </li>
  ));

  return (
    <header className="site">
      <div className="site-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          Amy Eng
        </Link>

        <nav className="nav-desktop" aria-label="Home page sections">
          <ul className="nav">{sectionItems}</ul>
        </nav>

        <div className="site-right">
          <Link
            className="about-pill"
            to="/about"
            aria-current={isAbout ? 'page' : undefined}
          >
            About
          </Link>
          <SocialLinks size="sm" />
        </div>

        <button
          type="button"
          className="menu-btn"
          id="menu-btn"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen(open => !open)}
        >
          <svg className="i-open" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg className="i-close" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" hidden={!isMenuOpen}>
        <nav aria-label="Menu">
          <p className="menu-label">Home page</p>
          <ul className="menu-list">{sectionItems}</ul>
          <p className="menu-label">Other pages</p>
          <ul className="menu-list">
            <li>
              <Link
                to="/about"
                aria-current={isAbout ? 'page' : undefined}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        <SocialLinks size="md" onNavigate={closeMenu} />
      </div>
    </header>
  );
};

export default Navbar;
