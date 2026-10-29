import React from 'react';
import ExternalLink from './ExternalLink';
import { Icon } from './IconSprite';
import { socials } from '../../data/socials';

interface SocialLinksProps {
  /** Matches the reference's three icon sizes. */
  size: 'sm' | 'md' | 'lg';
  className?: string;
  onNavigate?: () => void;
}

/** The social icon row, drawn from the shared sprite. */
const SocialLinks: React.FC<SocialLinksProps> = ({ size, className, onNavigate }) => (
  <ul
    className={`social social--${size}${className ? ` ${className}` : ''}`}
    aria-label="Social links"
  >
    {socials.map(social => (
      <li key={social.href}>
        <ExternalLink href={social.href} aria-label={social.label} onClick={onNavigate}>
          <Icon id={social.spriteId} />
        </ExternalLink>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
