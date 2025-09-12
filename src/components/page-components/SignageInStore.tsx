import React, { useState } from 'react';
import './SignageInStore.css';
import ImageLightbox from './ImageLightbox';

const SignageInStore: React.FC = () => {
  // Images with thumbnail and lightbox pairs
  const imagePairs = [
    {
      id: 1,
      thumbnail: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/signage/pinpad_thumbnail.jpg',
      lightbox: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/signage/pinpad_lightbox.jpg',
      alt: 'Pinpad Signage',
      caption: 'Pinpad Signage'
    },
    {
      id: 2,
      thumbnail: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/signage/violator_thumbnail.jpg',
      lightbox: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/signage/violator_lightbox.jpg',
      alt: 'Violator Signage',
      caption: 'Violator Signage'
    }
  ];

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="signage-container">
      <div className="signage-grid">
        {imagePairs.map((pair, index) => (
          <div 
            key={pair.id} 
            className="signage-item"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={pair.thumbnail} 
              alt={pair.alt}
              className="signage-thumbnail"
            />
          </div>
        ))}
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        currentImage={{
          id: imagePairs[currentImageIndex]?.id || 0,
          src: imagePairs[currentImageIndex]?.lightbox || '',
          alt: imagePairs[currentImageIndex]?.alt || '',
          caption: imagePairs[currentImageIndex]?.caption || ''
        }}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default SignageInStore;
