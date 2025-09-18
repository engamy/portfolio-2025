import React, { useState } from 'react';
import './LayoutLightboxes.css';

interface LayoutImageItem {
  id: number;
  src: string;
  alt: string;
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
  const [selectedImage, setSelectedImage] = useState<LayoutImageItem | null>(null);

  const openLightbox = (image: LayoutImageItem) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  const containerClass = `layout-lightboxes-container ${layoutType === 'two-col-equal' ? 'two-col-equal' : ''} ${className}`.trim();

  return (
    <div className={containerClass}>
      <div className="layout-lightboxes-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`layout-lightboxes-item ${image.isLarge ? 'large' : ''}`}
            onClick={() => openLightbox(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="layout-lightboxes-thumbnail"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="layout-lightboxes-overlay" onClick={closeLightbox}>
          <div className="layout-lightboxes-content" onClick={(e) => e.stopPropagation()}>
            <button className="layout-lightboxes-close" onClick={closeLightbox}>
              ×
            </button>
            <div className="layout-lightboxes-image-container">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="layout-lightboxes-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutLightboxes;
