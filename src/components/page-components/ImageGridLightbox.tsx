import React from 'react';
import './ImageGridLightbox.css';
import ImageLightbox from './ImageLightbox';
import { LightboxImage, useLightbox } from '../../hooks/useLightbox';

export interface GridImage extends LightboxImage {
  /** Lower-resolution image for the grid. Falls back to `src`. */
  thumbnail?: string;
}

export interface ImageGridLightboxProps {
  images: GridImage[];
  /** Columns at desktop width. */
  columns?: number;
  /** Columns below 768px. */
  mobileColumns?: number;
  gap?: string;
  mobileGap?: string;
  /** Caps the grid width; it never exceeds the container. */
  maxWidth?: string;
  /** Fixed thumbnail height. Omit to size from the image itself. */
  itemHeight?: string;
  mobileItemHeight?: string;
  /** Whether thumbnails crop to fill or letterbox. */
  fit?: 'cover' | 'contain';
  /** Opt-in frosted panel behind each thumbnail. */
  frosted?: boolean;
  className?: string;
}

const ImageGridLightbox: React.FC<ImageGridLightboxProps> = ({
  images,
  columns = 2,
  mobileColumns = 2,
  gap = '2rem',
  mobileGap = '1rem',
  maxWidth = '100%',
  itemHeight,
  mobileItemHeight,
  fit = 'contain',
  frosted = false,
  className = ''
}) => {
  const lightbox = useLightbox(images);

  const gridStyle = {
    '--grid-columns': columns,
    '--grid-columns-mobile': mobileColumns,
    '--grid-gap': gap,
    '--grid-gap-mobile': mobileGap,
    '--grid-max-width': maxWidth,
    '--grid-fit': fit,
    ...(itemHeight ? { '--grid-item-height': itemHeight } : {}),
    ...(mobileItemHeight ? { '--grid-item-height-mobile': mobileItemHeight } : {})
  } as React.CSSProperties;

  const itemClass = `gallery-grid-item ${frosted ? 'gallery-grid-item--frosted' : ''}`.trim();

  return (
    <div className={`gallery-grid-container ${className}`.trim()} style={gridStyle}>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={itemClass}
            {...lightbox.triggerProps(index, image.alt)}
          >
            <img
              src={image.thumbnail ?? image.src}
              alt={image.alt}
              className="gallery-grid-thumbnail"
            />
          </div>
        ))}
      </div>

      <ImageLightbox
        isOpen={lightbox.isOpen}
        currentImage={lightbox.currentImage}
        onClose={lightbox.close}
        onNext={images.length > 1 ? lightbox.next : undefined}
        onPrevious={images.length > 1 ? lightbox.previous : undefined}
      />
    </div>
  );
};

export default ImageGridLightbox;
