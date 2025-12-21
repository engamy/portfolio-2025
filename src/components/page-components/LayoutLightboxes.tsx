import React, { useState } from 'react';
import './LayoutLightboxes.css';
import ImageLightbox from './ImageLightbox';

interface LayoutImageItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
  isLarge?: boolean;
}

interface LayoutLightboxesProps {
  images: LayoutImageItem[];
  layoutType?: 'default' | 'two-col-equal';
  className?: string;
}

const LayoutLightboxes: React.FC<LayoutLightboxesProps> = ({ 
  images, 
  layoutType = 'default',
  className = ''
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const containerClass = `layout-lightboxes-container ${layoutType === 'two-col-equal' ? 'two-col-equal' : ''} ${className}`.trim();

  return (
    <div className={containerClass}>
      <div className="layout-lightboxes-grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`layout-lightboxes-item ${image.isLarge ? 'large' : ''}`}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="layout-lightboxes-thumbnail"
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

export default LayoutLightboxes;
