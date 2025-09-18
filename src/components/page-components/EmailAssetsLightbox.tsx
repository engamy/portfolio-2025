import React, { useState, useEffect } from 'react';
import './EmailAssetsLightbox.css';

interface EmailAsset {
  folderName: string;
  approvedImage: string;
  allImages: string[];
}

interface EmailAssetsLightboxProps {
  isOpen: boolean;
  selectedFolder: EmailAsset | null;
  onClose: () => void;
}

const EmailAssetsLightbox: React.FC<EmailAssetsLightboxProps> = ({
  isOpen,
  selectedFolder,
  onClose
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (selectedFolder) {
      setCurrentImageIndex(0);
    }
  }, [selectedFolder]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || !selectedFolder) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedFolder, onClose]);

  if (!isOpen || !selectedFolder || !selectedFolder.allImages || selectedFolder.allImages.length === 0) return null;

  const currentImage = selectedFolder.allImages[currentImageIndex];
  if (!currentImage) return null;

  const isApprovedImage = currentImage.includes('APPROVED');
  const isCBImage = selectedFolder.folderName?.includes('_CB') || false;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="email-lightbox-overlay" onClick={handleOverlayClick}>
      <div className="email-lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="email-lightbox-close" onClick={onClose} aria-label="Close lightbox">
          ×
        </button>
        
        <div className={`email-lightbox-grid ${selectedFolder.allImages.length === 1 ? 'single-image' : ''}`}>
          {/* All images on the left - only show if there are multiple images */}
          {selectedFolder.allImages.length > 1 && (
            <div className="email-lightbox-left">
              {selectedFolder.allImages.map((image, index) => {
                if (!image) return null;
                const isImageApproved = image.includes('APPROVED');
                const isSelected = image === currentImage;
                return (
                  <div 
                    key={index} 
                    className={`email-lightbox-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={isImageApproved ? "Approved Design" : `Exploration ${index + 1}`}
                      className="email-lightbox-image"
                    />
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Current image display (or centered if single image) */}
          <div className="email-lightbox-right">
            <div className="email-lightbox-approved-container">
              <img 
                src={currentImage} 
                alt={isApprovedImage ? "Approved Design" : `Exploration ${currentImageIndex + 1}`}
                className="email-lightbox-approved-image"
              />
              <div className="email-lightbox-caption">
                {isApprovedImage ? 'Approved' : isCBImage ? 'Content Block' : 'Exploration'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmailAssetsLightbox;
