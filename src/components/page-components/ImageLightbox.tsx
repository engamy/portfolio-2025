import React, { useEffect, useState } from 'react';
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
  const [orientation, setOrientation] = useState<'landscape' | 'portrait' | 'square' | null>(null);

  useEffect(() => {
    // reset orientation when image changes
    setOrientation(null);
  }, [currentImage?.src]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (naturalWidth === 0 || naturalHeight === 0) {
      setOrientation(null);
      return;
    }
    if (naturalWidth > naturalHeight) {
      setOrientation('landscape');
    } else if (naturalHeight > naturalWidth) {
      setOrientation('portrait');
    } else {
      setOrientation('square');
    }
  };
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
            className={`lightbox-image ${orientation ? `is-${orientation}` : ''}`.trim()}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
