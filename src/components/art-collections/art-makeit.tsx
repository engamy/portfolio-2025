import React, { useState } from 'react';
import '../mainpages/art-style.css';
import './art-makeit.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';

export default function ArtMakeIt() {
  // Set darkMode to true for the art collection page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page
  useScrollDarkMode(true, '.art-makeit-works');

  // State for lightbox
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // MakeIt images
  const makeItImages = [
    {
      id: 1,
      src: '/pictures/portfolio-content_spring2026/04_ART/makeit/three.jpg',
      title: 'Make It Three',
      description: 'Handcrafted creation exploring form and texture',
      year: '2024'
    },
    {
      id: 2,
      src: '/pictures/portfolio-content_spring2026/04_ART/makeit/four.jpg',
      title: 'Make It Four',
      description: 'Experimental piece combining traditional and modern techniques',
      year: '2024'
    },
    {
      id: 3,
      src: '/pictures/portfolio-content_spring2026/04_ART/makeit/six.jpg',
      title: 'Make It Six',
      description: 'Abstract composition exploring color and movement',
      year: '2024'
    },
    {
      id: 4,
      src: '/pictures/portfolio-content_spring2026/04_ART/makeit/nine.jpg',
      title: 'Make It Nine',
      description: 'Mixed media work showcasing creative problem-solving',
      year: '2024'
    },
    {
      id: 5,
      src: '/pictures/portfolio-content_spring2026/04_ART/makeit/ten.jpg',
      title: 'Make It Ten',
      description: 'Final piece in the series, representing completion and growth',
      year: '2024'
    },
    {
      id: 6,
      src: '/pictures/portfolio-content_spring2026/04_ART/makeit/eleven.jpg',
      title: 'Make It Eleven',
      description: 'Extended exploration beyond the original series',
      year: '2024'
    }
  ];

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <main className="art-container">
      <div className="art-section-header">
        <div className="art-section-header-content">
          <div className="art-section-header-introtext">
            <h1>Make It</h1>
            <p>
            "Students will generate a series of 8" x 8" handmade collages using found media (newspapers, magazines, trash, scraps, photos, etc.). This assignment will aid students to understand design principles of hierarchy, scale, symmetry, asymmetry, repetition, rhythm, balance, and movement. Balance the compositions using letterforms, images, and color."
            </p>
          </div>
          <div className="art-section-header-image">
            <img 
              src="/pictures/portfolio-content_spring2026/04_ART/makeit/four.jpg" 
              alt="Make It Collection header image"
              className="header-thumbnail"
            />
          </div>
        </div>
      </div>

      <div className="art-assorted art-makeit-works">
        <h2>Make It Collection</h2>

        <div className="makeit-grid">
          {makeItImages.map((image) => (
            <div key={image.id} className="image-item">
              <div className="image-container" onClick={() => openLightbox(image.src)}>
                <img src={image.src} alt={image.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <img src={selectedImage} alt="Lightbox view" />
          </div>
        </div>
      )}

    </main>
  );
}
