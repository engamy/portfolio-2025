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
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  currentImage,
  onClose
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
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
