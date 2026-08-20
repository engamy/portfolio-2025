import React from 'react';
import ImageLightbox from './ImageLightbox';
import './TrendingShopLayoutGrid.css';
import { getAssetPath } from '../../utils/assetUtils';
import { LightboxImage, useLightbox } from '../../hooks/useLightbox';

const ECOMM =
  '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop';

const layoutImage = (n: number): LightboxImage => ({
  id: n,
  src: getAssetPath(`${ECOMM}/layout-${n}.gif`),
  alt: `Layout design ${n}`,
  caption: `Layout design ${n}`
});

// The grid shows 1, 2 and 4; 5 and 3 sit below it at full width. All five share
// one lightbox so the arrow keys step through the whole set.
const gridImages = [1, 2, 4].map(layoutImage);
const standaloneImages = [5, 3].map(layoutImage);
const allImages = [...gridImages, ...standaloneImages];

const TrendingShopLayoutGrid: React.FC = () => {
  const lightbox = useLightbox(allImages);

  return (
    <div className="trending-shop-layout-container">
      <div className="trending-shop-layout-grid">
        {gridImages.map((image, index) => (
          <div key={image.id} className="trending-shop-layout-item">
            <div
              className="trending-shop-layout-thumbnail-container"
              {...lightbox.triggerProps(index, image.alt)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="trending-shop-layout-thumbnail"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Standalone images */}
      <div className="trending-shop-standalone-container">
        {standaloneImages.map((image, offset) => (
          <div
            key={image.id}
            className="trending-shop-standalone-image-container"
            {...lightbox.triggerProps(gridImages.length + offset, image.alt)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="trending-shop-standalone-image"
            />
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

export default TrendingShopLayoutGrid;
