import React from 'react';
import './ImageLightbox.css';

interface Image {
  id: number;
  src: string;
  caption: string;
  alt: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  currentImage: Image | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  currentImage,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  if (!isOpen || !currentImage) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          ×
        </button>
        
        <div className="lightbox-image-container">
          <img 
            src={currentImage.src} 
            alt={currentImage.alt}
            className="lightbox-image"
          />
          <div className="lightbox-caption">
            {currentImage.caption}
          </div>
        </div>
        
        <div className="lightbox-navigation">
          {hasPrevious && (
            <button className="lightbox-nav-btn lightbox-prev" onClick={onPrevious}>
              ‹
            </button>
          )}
          {hasNext && (
            <button className="lightbox-nav-btn lightbox-next" onClick={onNext}>
              ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox; 