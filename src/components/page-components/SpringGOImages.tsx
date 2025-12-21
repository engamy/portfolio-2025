import React, { useState } from 'react';
import './SpringGOImages.css';
import ImageLightbox from './ImageLightbox';
import { getAssetPath } from '../../utils/assetUtils';

const SpringGOImages: React.FC = () => {
  // Images in numerical order based on file names
  const images = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/springGO/1.jpg',
      alt: 'Spring Grand Opening 1',
      caption: 'Spring Grand Opening 1'
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/springGO/2.jpg',
      alt: 'Spring Grand Opening 2',
      caption: 'Spring Grand Opening 2'
    },
    {
      id: 3,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/springGO/3.jpg',
      alt: 'Spring Grand Opening 3',
      caption: 'Spring Grand Opening 3'
    },
    {
      id: 4,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/springGO/4.png',
      alt: 'Spring Grand Opening 4',
      caption: 'Spring Grand Opening 4'
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
    <div className="spring-go-container">
      <div className="spring-go-grid">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="spring-go-item"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              className="spring-go-image"
            />
          </div>
        ))}
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        currentImage={images[currentImageIndex]}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default SpringGOImages;
