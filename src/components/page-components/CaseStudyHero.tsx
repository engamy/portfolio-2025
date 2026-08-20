import React from 'react';
import { getAssetPath } from '../../utils/assetUtils';

export interface CaseStudyMeta {
  label: string;
  value: string;
}

interface CaseStudyHeroProps {
  /** Chooses the class prefix, and with it the page's own hero styling. */
  variant: 'next' | 'trendshop';
  title: React.ReactNode;
  subtitle?: string;
  /** Short caveat shown under the metadata, e.g. an NDA stand-in note. */
  note?: string;
  meta: CaseStudyMeta[];
  backgroundImage: string;
  /**
   * How the background is applied. 'image' renders a blurred <img> behind the
   * text; 'css' sets a background-image on the hero itself. The two case studies
   * use different treatments by design.
   */
  backgroundMode: 'image' | 'css';
}

/**
 * The full-height hero at the top of a case study.
 *
 * The two case studies share this structure but are tuned differently at every
 * breakpoint, so the markup is shared here while each page keeps its own
 * stylesheet under its existing class prefix.
 */
const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  variant,
  title,
  subtitle,
  note,
  meta,
  backgroundImage,
  backgroundMode
}) => {
  const resolved = getAssetPath(backgroundImage);

  return (
    <div
      className={`design-section-header ${variant}-hero`}
      style={
        backgroundMode === 'css'
          ? { backgroundImage: `url(${resolved})` }
          : undefined
      }
    >
      {backgroundMode === 'image' && (
        <img
          src={resolved}
          alt=""
          aria-hidden="true"
          className={`${variant}-hero-bg`}
        />
      )}
      <div className={`${variant}-hero-overlay`}>
        <div className={`${variant}-hero-text`}>
          <h1 className={`${variant}-title`}>{title}</h1>
          {subtitle && <p className={`${variant}-subtitle`}>{subtitle}</p>}
          <div className={`${variant}-meta`}>
            {meta.map(item => (
              <p key={item.label}>
                <span>{item.label}</span> {item.value}
              </p>
            ))}
          </div>
          {note && <p className={`${variant}-hero-note`}>{note}</p>}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyHero;
