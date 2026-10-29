import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SectionId, scrollToSection, sectionPath } from '../../utils/sectionScroll';

interface SectionLinkProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
  /** Called on click regardless of route, so the mobile menu can close itself. */
  onNavigate?: () => void;
}

/**
 * A link to a section of the landing page that works from any route.
 *
 * On the landing page it scrolls in place and updates the hash. From any other
 * route it falls through to the router, which loads the landing page; App then
 * scrolls to the hash once the sections have mounted.
 */
const SectionLink: React.FC<SectionLinkProps> = ({ id, children, className, onNavigate }) => {
  const location = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (location.pathname !== '/') return;

    event.preventDefault();
    scrollToSection(id, true);
    // Keep the address bar in step without re-running the router.
    window.history.pushState(null, '', sectionPath(id));
  };

  return (
    <Link to={sectionPath(id)} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default SectionLink;
