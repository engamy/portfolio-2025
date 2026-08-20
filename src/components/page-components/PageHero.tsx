import React from 'react';
import { getAssetPath } from '../../utils/assetUtils';

interface PageHeroProps {
  /** Selects the class prefix, and with it the existing per-section styling. */
  variant: 'art' | 'design';
  title: string;
  intro: React.ReactNode;
  /** Full-bleed background image path. */
  backgroundImage?: string;
  /** Thumbnail shown beside the text instead of a background image. */
  thumbnail?: string;
  thumbnailAlt?: string;
  /** Extra classes on the heading and body, for page-specific colour overrides. */
  titleClassName?: string;
  introClassName?: string;
}

/**
 * The full-height hero at the top of each art and design page.
 *
 * Keeps the established `art-section-header` / `design-section-header` class
 * names so the existing per-page stylesheets continue to apply.
 */
const PageHero: React.FC<PageHeroProps> = ({
  variant,
  title,
  intro,
  backgroundImage,
  thumbnail,
  thumbnailAlt,
  titleClassName,
  introClassName
}) => {
  const prefix = `${variant}-section-header`;

  const text = (
    <div className={`${prefix}-introtext`}>
      <h1 className={titleClassName}>{title}</h1>
      <p className={introClassName}>{intro}</p>
    </div>
  );

  return (
    <div
      className={prefix}
      style={
        backgroundImage
          ? { backgroundImage: `url(${getAssetPath(backgroundImage)})` }
          : undefined
      }
    >
      {thumbnail ? (
        <div className={`${prefix}-content`}>
          {text}
          <div className={`${prefix}-image`}>
            <img
              src={getAssetPath(thumbnail)}
              alt={thumbnailAlt}
              className="header-thumbnail"
            />
          </div>
        </div>
      ) : (
        text
      )}
    </div>
  );
};

export default PageHero;
