import React, { useEffect, useRef, useState } from 'react';
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
  // Stored with the src it was measured from, so a new image never borrows
  // the previous one's sizing for a frame before its own load event.
  const [measured, setMeasured] = useState<{
    src: string;
    orientation: 'landscape' | 'portrait' | 'square' | null;
  } | null>(null);
  const orientation =
    measured && measured.src === currentImage?.src ? measured.orientation : null;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

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
    const { naturalWidth: w, naturalHeight: h } = img;
    const value = w === 0 || h === 0 ? null : w > h ? 'landscape' : h > w ? 'portrait' : 'square';
    // currentSrc is the resolved URL; match on the prop we rendered instead.
    setMeasured({ src: img.getAttribute('src') ?? '', orientation: value });
  };
  // A horizontal swipe steps through the gallery on touch screens.
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) onNext?.();
    else onPrevious?.();
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close image">
          ×
        </button>

        {onPrevious && (
          <button
            className="lightbox-arrow lightbox-arrow--prev"
            onClick={onPrevious}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
        )}
        {onNext && (
          <button
            className="lightbox-arrow lightbox-arrow--next"
            onClick={onNext}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        )}

        {orientation === null && (
          <div className="lightbox-spinner" role="status" aria-label="Loading image" />
        )}

        <div className="lightbox-image-container">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={`lightbox-image ${orientation ? `is-${orientation}` : 'is-pending'}`}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
