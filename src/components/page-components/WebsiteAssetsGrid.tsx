import React, { useState } from 'react';
import ImageLightbox from './ImageLightbox';
import './WebsiteAssetsGrid.css';

interface WebsiteAsset {
  id: number;
  thumbnailImage: string;
  lightboxImage: string;
  title: string;
  alt: string;
}

const WebsiteAssetsGrid: React.FC = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ id: number; src: string; caption: string; alt: string } | null>(null);

  // Define the website assets with their thumbnail and lightbox image pairs
  const websiteAssets: WebsiteAsset[] = [
    {
      id: 1,
      thumbnailImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/site_assets/sitebanner_desktop_live.png',
      lightboxImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/site_assets/sitebanner_desktop.jpg',
      title: 'Desktop Site Banner',
      alt: 'Desktop site banner thumbnail'
    },
    {
      id: 2,
      thumbnailImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/site_assets/sitebanner_mobile_live.jpg',
      lightboxImage: '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/site_assets/sitebanner_mobile.jpg',
      title: 'Mobile Site Banner',
      alt: 'Mobile site banner thumbnail'
    }
  ];

  const handleImageClick = (asset: WebsiteAsset) => {
    setCurrentImage({
      id: asset.id,
      src: asset.lightboxImage,
      caption: asset.title,
      alt: asset.alt
    });
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="website-assets-container">
      <div className="website-assets-grid">
        {websiteAssets.map((asset) => (
          <div key={asset.id} className="website-asset-item">
            <div 
              className="website-asset-thumbnail-container"
              onClick={() => handleImageClick(asset)}
            >
              <img 
                src={asset.thumbnailImage} 
                alt={asset.alt}
                className={`website-asset-thumbnail ${asset.id === 1 ? 'desktop-banner' : asset.id === 2 ? 'mobile-banner' : ''}`}
              />
            </div>
          </div>
        ))}
      </div>

      <ImageLightbox
        isOpen={isLightboxOpen}
        currentImage={currentImage}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export default WebsiteAssetsGrid;
