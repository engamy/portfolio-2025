import React, { useState } from 'react';
import './OOHSignage.css';
import ImageLightbox from './ImageLightbox';
import { getAssetPath } from '../../utils/assetUtils';

interface Image {
  id: number;
  src: string;
  caption: string;
  alt: string;
}

const OOHSignage: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  // Define the OOH images
  const images: Image[] = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/OOH/busShelter.jpg'),
      caption: 'Billboard Design',
      alt: 'Marshalls billboard signage design'
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/OOH/busShelter2.jpg'),
      caption: 'Bus Shelter Design',
      alt: 'Marshalls bus shelter signage design'
    },
    {
      id: 3,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/OOH/pencilBanner.jpg'),
      caption: 'Bus Shelter Design 2',
      alt: 'Marshalls bus shelter signage design alternative'
    },
    {
      id: 4,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/OOH/billboard.jpg'),
      caption: 'Pencil Banner Design',
      alt: 'Marshalls pencil banner signage design'
    }
  ];

  const handleImageClick = (image: Image) => {
    setCurrentImage(image);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="ooh-signage-container">
      
      <div className="ooh-grid">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="ooh-grid-item"
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.src} 
              alt={image.alt}
              className="ooh-thumbnail"
            />
          </div>
        ))}
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        currentImage={currentImage}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export default OOHSignage;
