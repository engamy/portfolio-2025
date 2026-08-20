import React from 'react';
import ImageLightbox from './ImageLightbox';
import './WebsiteAssetsGrid.css';
import { getAssetPath } from '../../utils/assetUtils';
import { useLightbox } from '../../hooks/useLightbox';

const SITE_ASSETS =
  '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/site_assets';

/**
 * The two banners are sized against each other rather than laid out on a grid,
 * so this keeps its own markup instead of using ImageGridLightbox. The
 * modifier class drives that sizing.
 */
const websiteAssets = [
  {
    id: 1,
    modifier: 'desktop-banner',
    thumbnail: getAssetPath(`${SITE_ASSETS}/sitebanner_desktop_live.png`),
    src: getAssetPath(`${SITE_ASSETS}/sitebanner_desktop.jpg`),
    caption: 'Desktop Site Banner',
    alt: 'Desktop site banner thumbnail'
  },
  {
    id: 2,
    modifier: 'mobile-banner',
    thumbnail: getAssetPath(`${SITE_ASSETS}/sitebanner_mobile_live.jpg`),
    src: getAssetPath(`${SITE_ASSETS}/sitebanner_mobile.jpg`),
    caption: 'Mobile Site Banner',
    alt: 'Mobile site banner thumbnail'
  }
];

const WebsiteAssetsGrid: React.FC = () => {
  const lightbox = useLightbox(websiteAssets);

  return (
    <div className="website-assets-container">
      <div className="website-assets-grid">
        {websiteAssets.map((asset, index) => (
          <div key={asset.id} className="website-asset-item">
            <div
              className="website-asset-thumbnail-container"
              {...lightbox.triggerProps(index, asset.caption)}
            >
              <img
                src={asset.thumbnail}
                alt={asset.alt}
                className={`website-asset-thumbnail ${asset.modifier}`}
              />
            </div>
          </div>
        ))}
      </div>

      <ImageLightbox
        isOpen={lightbox.isOpen}
        currentImage={lightbox.currentImage}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrevious={lightbox.previous}
      />
    </div>
  );
};

export default WebsiteAssetsGrid;
