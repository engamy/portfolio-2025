import React, { useEffect, useState } from 'react';
import ImageLightbox from './ImageLightbox';
import './MasonryGrid.css';
import { useLightbox } from '../../hooks/useLightbox';

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
  const [columns, setColumns] = useState(3);
  const lightbox = useLightbox(images);

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

  // Create columns for masonry layout
  const columnImages = Array.from({ length: columns }, (_, columnIndex) =>
    images.filter((_, imageIndex) => imageIndex % columns === columnIndex)
  );

  return (
    <>
      <div className="masonry-grid">
        {columnImages.map((column, columnIndex) => (
          <div key={columnIndex} className="masonry-column">
            {column.map((image) => {
              const index = images.indexOf(image);
              return (
                <div
                  key={image.id}
                  className="masonry-item"
                  {...lightbox.triggerProps(index, image.alt)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                </div>
              );
            })}
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
    </>
  );
};

export default MasonryGrid;
