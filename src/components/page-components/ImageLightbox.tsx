import React, { useEffect, useState } from 'react';
import './ImageLightbox.css';
import { LightboxImage } from '../../hooks/useLightbox';

interface ImageLightboxProps {
  isOpen: boolean;
  currentImage: LightboxImage | null;
  onClose: () => void;
  /** Supplied by galleries with more than one image, to enable arrow keys. */
  onNext?: () => void;
  onPrevious?: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  currentImage,
  onClose,
  onNext,
  onPrevious
}) => {
  const [orientation, setOrientation] = useState<'landscape' | 'portrait' | 'square' | null>(null);

  useEffect(() => {
    // reset orientation when image changes
    setOrientation(null);
  }, [currentImage?.src]);

  // Esc closes, arrows step through the gallery when it has more than one image.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowRight' && onNext) {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key === 'ArrowLeft' && onPrevious) {
        event.preventDefault();
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Stop the page behind the lightbox scrolling while it is open.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close image">
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
