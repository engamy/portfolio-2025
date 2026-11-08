import React from 'react';
import '../mainpages/art-style.css';
import ImageCarousel from '../page-components/ImageCarousel';
import { getAssetPath } from '../../utils/assetUtils';
import { usePageMode } from '../../hooks/usePageMode';

export default function Art2022Portfolio() {
  usePageMode({ initial: true });
  

  // XTRAordinary Portfolio images
  const portfolio2022Images = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/adamAndEve.jpg'),
      caption: 'Adam and Eve - Digital illustration exploring biblical themes with contemporary interpretation',
      alt: 'Adam and Eve digital illustration',
      width: 800,
      height: 600
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/bloodyMary-w1600.jpg'),
      caption: 'Bloody Mary - Digital character illustration with dark themes and dramatic lighting',
      alt: 'Bloody Mary character illustration',
      width: 800,
      height: 600
    },
    {
      id: 3,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/suki.jpg'),
      caption: 'Suki - Digital character portrait with emotional depth and expressive features',
      alt: 'Suki character portrait',
      width: 700,
      height: 500
    },
    {
      id: 4,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/evangelion.jpg'),
      caption: 'Evangelion - Digital fan art inspired by the iconic anime series with dynamic composition',
      alt: 'Evangelion fan art',
      width: 700,
      height: 500
    },
    {
      id: 5,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/nineToFive-w1600.jpg'),
      caption: 'Nine to Five - Digital illustration exploring themes of work and daily routine',
      alt: 'Nine to Five illustration',
      width: 800,
      height: 600
    },
    {
      id: 6,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/whereIBelong.jpg'),
      caption: 'Where I Belong - Digital artwork exploring themes of identity and belonging',
      alt: 'Where I Belong artwork',
      width: 700,
      height: 500
    },
    {
      id: 7,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/youth-w1600.jpg'),
      caption: 'Youth - Digital illustration capturing the energy and vitality of young life',
      alt: 'Youth illustration',
      width: 800,
      height: 600
    },
    {
      id: 8,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/haircut.jpg'),
      caption: 'Haircut - Digital character illustration with intimate, personal themes',
      alt: 'Haircut character illustration',
      width: 600,
      height: 800
    },
    {
      id: 9,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/143.jpg'),
      caption: '143 - Digital artwork with minimalist approach and numerical symbolism',
      alt: '143 artwork',
      width: 600,
      height: 800
    }
  ];

  // The title is the part of each caption before the dash. Each piece also
  // has a 160px square crop for the thumbnail strip, named <file>-thumb.jpg
  // (the three largest pieces use 1600px copies, <file>-w1600.jpg).
  const slides = portfolio2022Images.map(image => ({
    ...image,
    title: image.caption.split(' - ')[0],
    thumb: image.src.replace(/(-w1600)?\.jpg$/, '-thumb.jpg'),
  }));

  return (
    <main className="art-container art-xo">
      <header className="art-xo-head">
        <h1>Ordinary &amp; Extraordinary</h1>
        <div className="art-xo-about">
          <p>
            The theme of this portfolio is the collapsing of boundaries between the ordinary and
            extraordinary found in everything around us.
          </p>
          <p>
            While the norms are used as standards for order, goodness, and positivity, their antonyms
            are grounded with disorder, evil, and negativity. This portfolio aims to unsettle the
            arbitrary concepts of these qualities and show the beauty of their coexistence in the
            things, emotions, and ideas around us. Ultimately, I hope to return the visibility and
            justice to those traditionally suppressed, marginalized elements.
          </p>
        </div>
      </header>

      <div className="art-xo-works">
        <ImageCarousel images={slides} label="Ordinary & Extraordinary portfolio" />
      </div>
    </main>
  );
}
