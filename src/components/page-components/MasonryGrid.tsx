import React, { useState, useEffect } from 'react';
import ImageLightbox from './ImageLightbox';
import './MasonryGrid.css';

interface Image {
  id: number;
  src: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
}

interface MasonryGridProps {
  images: Image[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          setLightboxOpen(false);
          break;
        case 'ArrowLeft':
          setCurrentImageIndex((prev) => 
            prev === 0 ? images.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          setCurrentImageIndex((prev) => 
            prev === images.length - 1 ? 0 : prev + 1
          );
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  // Create columns for masonry layout
  const columnImages = Array.from({ length: columns }, (_, columnIndex) =>
    images.filter((_, imageIndex) => imageIndex % columns === columnIndex)
  );

  return (
    <>
      <div className="masonry-grid">
        {columnImages.map((column, columnIndex) => (
          <div key={columnIndex} className="masonry-column">
            {column.map((image) => (
              <div 
                key={image.id} 
                className="masonry-item"
                onClick={() => openLightbox(images.indexOf(image))}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        currentImage={images[currentImageIndex]}
        onClose={closeLightbox}
      />
    </>
  );
};

export default MasonryGrid;
