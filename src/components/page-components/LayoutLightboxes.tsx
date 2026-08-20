import React from 'react';
import './LayoutLightboxes.css';
import ImageLightbox from './ImageLightbox';
import { useLightbox } from '../../hooks/useLightbox';

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
  const lightbox = useLightbox(images);

  const containerClass = `layout-lightboxes-container ${layoutType === 'two-col-equal' ? 'two-col-equal' : ''} ${className}`.trim();

  return (
    <div className={containerClass}>
      <div className="layout-lightboxes-grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`layout-lightboxes-item ${image.isLarge ? 'large' : ''}`}
            {...lightbox.triggerProps(index, image.alt)}
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
        isOpen={lightbox.isOpen}
        currentImage={lightbox.currentImage}
        onClose={lightbox.close}
        onNext={images.length > 1 ? lightbox.next : undefined}
        onPrevious={images.length > 1 ? lightbox.previous : undefined}
      />
    </div>
  );
};

export default LayoutLightboxes;
