import React, { useState } from 'react';
import './BilingualSignage.css';
import ImageLightbox from './ImageLightbox';
import { getAssetPath } from '../../utils/assetUtils';

const BilingualSignage: React.FC = () => {
  // All bilingual signage images
  const images = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/bilingual/MA-FY25_fallGO_stanchion_localLove-22x28_spanish.jpg',
      alt: 'Fall Grand Opening Stanchion - Local Love (Spanish)',
      caption: 'Fall Grand Opening Stanchion - Local Love (Spanish)'
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/bilingual/MA-FY25_springGO_closing_window-34x52_spanish.jpg',
      alt: 'Spring Grand Opening Closing Window (Spanish)',
      caption: 'Spring Grand Opening Closing Window (Spanish)'
    },
    {
      id: 3,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/bilingual/MA-FY25_springGO_closing_window-34x52_storeClosed1_spanish.jpg',
      alt: 'Spring Grand Opening Store Closed 1 (Spanish)',
      caption: 'Spring Grand Opening Store Closed 1 (Spanish)'
    },
    {
      id: 4,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/bilingual/MA-FY25_springGO_closing_window-34x52_storeClosed2_spanish.jpg',
      alt: 'Spring Grand Opening Store Closed 2 (Spanish)',
      caption: 'Spring Grand Opening Store Closed 2 (Spanish)'
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
    <div className="bilingual-container">
      <div className="bilingual-grid">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="bilingual-item"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              className="bilingual-thumbnail"
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

export default BilingualSignage;
