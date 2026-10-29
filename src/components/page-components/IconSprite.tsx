import React from 'react';

/**
 * The SVG sprite from the landing reference, mounted once at the app level.
 *
 * Every symbol draws in `currentColor`, so an icon takes the colour of
 * whatever it sits in. That is what lets the same markup render red in the
 * footer and nav-coloured in the header without a second set of assets.
 */
export const IconSprite: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <symbol id="i-linkedin" viewBox="0 0 24 24">
        <mask id="m-li">
          <rect width="24" height="24" fill="#fff" />
          <circle cx="6.6" cy="6.3" r="1.9" fill="#000" />
          <rect x="5" y="9.6" width="3.2" height="9.2" fill="#000" />
          <path d="M9.8 9.6h3v1.4c.5-.9 1.6-1.6 3.1-1.6 3 0 3.7 1.9 3.7 4.5v4.9h-3.1v-4.4c0-1.1-.1-2.2-1.5-2.2s-1.7 1.1-1.7 2.2v4.4H9.8z" fill="#000" />
        </mask>
        <rect width="24" height="24" rx="4" fill="currentColor" mask="url(#m-li)" />
      </symbol>
      <symbol id="i-instagram" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
      </symbol>
      <symbol id="i-github" viewBox="0 0 16 16">
        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </symbol>
      <symbol id="i-youtube" viewBox="0 0 24 24">
        <mask id="m-yt">
          <rect width="24" height="24" fill="#fff" />
          <path d="M10 8.8v6.4l5.4-3.2z" fill="#000" />
        </mask>
        <rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="currentColor" mask="url(#m-yt)" />
      </symbol>
      <symbol id="i-star" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0z" />
      </symbol>
    </defs>
  </svg>
);

interface IconProps {
  /** Symbol id without the leading hash, e.g. `i-star`. */
  id: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ id, className }) => (
  <svg className={`ic${className ? ` ${className}` : ''}`} aria-hidden="true">
    <use href={`#${id}`} />
  </svg>
);

export default IconSprite;
