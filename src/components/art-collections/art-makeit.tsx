import React from 'react';
import '../mainpages/art-style.css';
import './art-makeit.css';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import { useLightbox } from '../../hooks/useLightbox';
import { usePageMode } from '../../hooks/usePageMode';
import PageHero from '../page-components/PageHero';

export default function ArtMakeIt() {
  usePageMode({ initial: true, flipAt: '.art-makeit-works' });
  


  // MakeIt images
  const makeItImages = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/makeit/three.jpg'),
      title: 'Make It Three',
      description: 'Handcrafted creation exploring form and texture',
      year: '2024'
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/makeit/four.jpg'),
      title: 'Make It Four',
      description: 'Experimental piece combining traditional and modern techniques',
      year: '2024'
    },
    {
      id: 3,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/makeit/six.jpg'),
      title: 'Make It Six',
      description: 'Abstract composition exploring color and movement',
      year: '2024'
    },
    {
      id: 4,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/makeit/nine.jpg'),
      title: 'Make It Nine',
      description: 'Mixed media work showcasing creative problem-solving',
      year: '2024'
    },
    {
      id: 5,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/makeit/ten.jpg'),
      title: 'Make It Ten',
      description: 'Final piece in the series, representing completion and growth',
      year: '2024'
    },
    {
      id: 6,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/makeit/eleven.jpg'),
      title: 'Make It Eleven',
      description: 'Extended exploration beyond the original series',
      year: '2024'
    }
  ];

  // ImageLightbox wants src/alt/caption; the collection stores title/description.
  const lightboxImages = makeItImages.map(image => ({
    id: image.id,
    src: image.src,
    alt: image.title,
    caption: image.title
  }));

  const lightbox = useLightbox(lightboxImages);

  return (
    <main className="art-container">
      <PageHero
        variant="art"
        thumbnail="/pictures/portfolio-content_spring2026/04_ART/makeit/four.jpg"
        thumbnailAlt="Make It Collection header"
        title="Make It"
        intro={
          <>
            "Students will generate a series of 8" x 8" handmade collages using found media (newspapers, magazines, trash, scraps, photos, etc.). This assignment will aid students to understand design principles of hierarchy, scale, symmetry, asymmetry, repetition, rhythm, balance, and movement. Balance the compositions using letterforms, images, and color."
          </>
        }
      />

      <div className="art-assorted art-makeit-works">
        <h2>Make It Collection</h2>

        <div className="makeit-grid">
          {makeItImages.map((image, index) => (
            <div key={image.id} className="image-item">
              <div
                className="image-container"
                {...lightbox.triggerProps(index, image.title)}
              >
                <img src={image.src} alt={image.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageLightbox
        isOpen={lightbox.isOpen}
        currentImage={lightbox.currentImage}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrevious={lightbox.previous}
      />

    </main>
  );
}
