import React from 'react';
import './BeforeAfterComparison.css';
import ImageLightbox from './ImageLightbox';
import { getAssetPath } from '../../utils/assetUtils';
import { useLightbox } from '../../hooks/useLightbox';

const MOCKUPS =
  '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups';

const beforeImages = [
  'before_manhasset-1.jpeg',
  'before_manhasset-2.jpeg',
  'before_washingtonHeights-1.jpg',
  'before_washingtonHeights-2.png',
  'before_washingtonHeights-3.png'
].map(file => getAssetPath(`${MOCKUPS}/${file}`));

const afterImages = [
  'after_manhasset-1.jpg',
  'after_manhasset-2.jpg',
  'after_washingtonHeights-1.jpg',
  'after_washingtonHeights-2.jpg',
  'after_washingtonHeights-3.jpg'
].map(file => getAssetPath(`${MOCKUPS}/${file}`));

// One combined list so the lightbox arrows step from the last "before" straight
// into the "after" column.
const allImages = [
  ...beforeImages.map((src, index) => ({
    id: index,
    src,
    caption: `Before ${index + 1}`,
    alt: `Before ${index + 1}`
  })),
  ...afterImages.map((src, index) => ({
    id: beforeImages.length + index,
    src,
    caption: `After ${index + 1}`,
    alt: `After ${index + 1}`
  }))
];

const BeforeAfterComparison: React.FC = () => {
  const lightbox = useLightbox(allImages);

  const column = (title: string, images: string[], indexOffset: number) => (
    <div className={`column ${title.toLowerCase()}-column`}>
      <h4 className="column-title">{title}</h4>
      <div className="images-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-container"
            {...lightbox.triggerProps(indexOffset + index, `${title} ${index + 1}`)}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="comparison-image"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="before-after-comparison">
      <div className="comparison-container">
        {column('Before', beforeImages, 0)}
        {column('After', afterImages, beforeImages.length)}
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

export default BeforeAfterComparison;
