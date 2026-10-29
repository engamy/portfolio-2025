import React from 'react';
import './footer-style.css';
import { getAssetPath } from '../utils/assetUtils';
import SectionLink from './page-components/SectionLink';
import SocialLinks from './page-components/SocialLinks';
import { ICONS } from '../data/socials';
import { SECTION_IDS } from '../utils/sectionScroll';

const EMAIL = 'amyeng895@gmail.com';

const SECTION_LABELS: Record<string, string> = {
  home: 'Home',
  featured: 'Featured',
  work: 'Work',
  'creative-lab': 'Creative Lab'
};

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-inner">
        <div>
          <p><strong>Where To?</strong></p>
          <div className="link-groups">
            <div>
              <p className="group-label">Home page</p>
              <ul className="links">
                {SECTION_IDS.map(id => (
                  <li key={id}>
                    <SectionLink id={id}>{SECTION_LABELS[id]}</SectionLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="copy">© Amy Eng 2026 All Rights Reserved</p>
        </div>

        <div className="foot-right">
          <div className="foot-contact">
            <p><strong>Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            <SocialLinks size="md" />
          </div>
          <div className="foot-logo">
            <img src={getAssetPath(`${ICONS}/logo_red.png`)} alt="Amy Eng phoenix mark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
