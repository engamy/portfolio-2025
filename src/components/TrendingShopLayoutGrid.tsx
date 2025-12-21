import React, { useState } from 'react';
import ImageLightbox from './page-components/ImageLightbox';
import './TrendingShopLayoutGrid.css';
import { getAssetPath } from '../utils/assetUtils';

interface LayoutImage {
  id: number;
  src: string;
  alt: string;
}

const TrendingShopLayoutGrid: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ id: number; src: string; caption: string; alt: string } | null>(null);

  // Define the layout images (excluding layout-3 and layout-5)
  const layoutImages: LayoutImage[] = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop/layout-1.gif',
      alt: 'Layout design 1'
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop/layout-2.gif',
      alt: 'Layout design 2'
    },
    {
      id: 4,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop/layout-4.gif',
      alt: 'Layout design 4'
    }
  ];

  // Define the standalone layout-5 image
  const standaloneImage: LayoutImage = {
    id: 5,
    src: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop/layout-5.gif',
    alt: 'Layout design 5'
  };

  // Define the standalone layout-3 image
  const standaloneImage2: LayoutImage = {
    id: 3,
    src: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop/layout-3.gif',
    alt: 'Layout design 3'
  };

  const handleImageClick = (image: LayoutImage) => {
    setCurrentImage({
      id: image.id,
      src: image.src,
      caption: image.alt,
      alt: image.alt
    });
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setCurrentImage(null);
  };

  const handlePrevious = () => {
    if (currentImage) {
      const currentIndex = layoutImages.findIndex(img => img.id === currentImage.id);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : layoutImages.length - 1;
      const prevImage = layoutImages[prevIndex];
      setCurrentImage({
        id: prevImage.id,
        src: prevImage.src,
        caption: prevImage.alt,
        alt: prevImage.alt
      });
    }
  };

  const handleNext = () => {
    if (currentImage) {
      const currentIndex = layoutImages.findIndex(img => img.id === currentImage.id);
      const nextIndex = currentIndex < layoutImages.length - 1 ? currentIndex + 1 : 0;
      const nextImage = layoutImages[nextIndex];
      setCurrentImage({
        id: nextImage.id,
        src: nextImage.src,
        caption: nextImage.alt,
        alt: nextImage.alt
      });
    }
  };

  return (
    <div className="trending-shop-layout-container">
      <div className="trending-shop-layout-grid">
        {layoutImages.map((image) => (
          <div key={image.id} className="trending-shop-layout-item">
            <div 
              className="trending-shop-layout-thumbnail-container"
              onClick={() => handleImageClick(image)}
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
        <div 
          className="trending-shop-standalone-image-container"
          onClick={() => handleImageClick(standaloneImage)}
        >
          <img 
            src={standaloneImage.src} 
            alt={standaloneImage.alt}
            className="trending-shop-standalone-image"
          />
        </div>
        <div 
          className="trending-shop-standalone-image-container"
          onClick={() => handleImageClick(standaloneImage2)}
        >
          <img 
            src={standaloneImage2.src} 
            alt={standaloneImage2.alt}
            className="trending-shop-standalone-image"
          />
        </div>
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        currentImage={currentImage}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export default TrendingShopLayoutGrid;
