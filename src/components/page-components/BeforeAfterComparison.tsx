import React, { useState } from 'react';
import './BeforeAfterComparison.css';
import ImageLightbox from './ImageLightbox';
import { getAssetPath } from '../../utils/assetUtils';

const BeforeAfterComparison: React.FC = () => {
  // All before images
  const beforeImages = [
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/before_manhasset-1.jpeg'),
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/before_manhasset-2.jpeg'),
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/before_washingtonHeights-1.jpg'),
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/before_washingtonHeights-2.png'),
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/before_washingtonHeights-3.png')
  ];

  // All after images
  const afterImages = [
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/after_manhasset-1.jpg'),
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/after_manhasset-2.jpg'),
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/after_washingtonHeights-1.jpg'),
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/after_washingtonHeights-2.jpg'),
    getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/01_RETAIL/storedesign_mockups/after_washingtonHeights-3.jpg')
  ];

  // Combine all images for lightbox navigation
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
    <div className="before-after-comparison">
      <div className="comparison-container">
        <div className="column before-column">
          <h4 className="column-title">Before</h4>
          <div className="images-grid">
            {beforeImages.map((image, index) => (
              <div 
                key={index} 
                className="image-container"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={image} 
                  alt={`Before ${index + 1}`}
                  className="comparison-image"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="column after-column">
          <h4 className="column-title">After</h4>
          <div className="images-grid">
            {afterImages.map((image, index) => (
              <div 
                key={index} 
                className="image-container"
                onClick={() => openLightbox(beforeImages.length + index)}
              >
                <img 
                  src={image} 
                  alt={`After ${index + 1}`}
                  className="comparison-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        currentImage={allImages[currentImageIndex]}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default BeforeAfterComparison;
