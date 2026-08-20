import React from 'react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * An off-site link that always opens in a new tab with the security-relevant
 * rel attributes set.
 *
 * This replaces an effect in App.tsx that walked every anchor on the page after
 * each route change and patched target/rel imperatively. That only ran on route
 * change, so anything rendered later was missed.
 */
const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className,
  ...rest
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    {...rest}
  >
    {children}
  </a>
);

export default ExternalLink;
