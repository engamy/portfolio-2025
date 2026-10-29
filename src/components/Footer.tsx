import React from 'react';
import './footer-style.css';
import { getAssetPath } from '../utils/assetUtils';
import ContactButtons from './page-components/ContactButtons';
import SocialLinks from './page-components/SocialLinks';
import { ICONS } from '../data/socials';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="foot-left">
          <div className="foot-actions">
            <ContactButtons />
          </div>
          <p className="copy">© Amy Eng 2026 All Rights Reserved</p>
        </div>

        <div className="foot-right">
          <div className="foot-contact">
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
