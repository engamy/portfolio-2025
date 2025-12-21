import React from 'react';
import '../mainpages/art-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import MasonryGrid from '../page-components/MasonryGrid';
import { getAssetPath } from '../../utils/assetUtils';

export default function Art2022Portfolio() {
  // Set darkMode to true for the art collection page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page
  useScrollDarkMode(true, '.art-2022-works');

  // XTRAordinary Portfolio images
  const portfolio2022Images = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/adamAndEve.jpg',
      caption: 'Adam and Eve - Digital illustration exploring biblical themes with contemporary interpretation',
      alt: 'Adam and Eve digital illustration',
      width: 800,
      height: 600
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/bloodyMary.jpg',
      caption: 'Bloody Mary - Digital character illustration with dark themes and dramatic lighting',
      alt: 'Bloody Mary character illustration',
      width: 800,
      height: 600
    },
    {
      id: 3,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/suki.jpg',
      caption: 'Suki - Digital character portrait with emotional depth and expressive features',
      alt: 'Suki character portrait',
      width: 700,
      height: 500
    },
    {
      id: 4,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/evangelion.jpg',
      caption: 'Evangelion - Digital fan art inspired by the iconic anime series with dynamic composition',
      alt: 'Evangelion fan art',
      width: 700,
      height: 500
    },
    {
      id: 5,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/nineToFive.jpg',
      caption: 'Nine to Five - Digital illustration exploring themes of work and daily routine',
      alt: 'Nine to Five illustration',
      width: 800,
      height: 600
    },
    {
      id: 6,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/whereIBelong.jpg',
      caption: 'Where I Belong - Digital artwork exploring themes of identity and belonging',
      alt: 'Where I Belong artwork',
      width: 700,
      height: 500
    },
    {
      id: 7,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/youth.jpg',
      caption: 'Youth - Digital illustration capturing the energy and vitality of young life',
      alt: 'Youth illustration',
      width: 800,
      height: 600
    },
    {
      id: 8,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/haircut.jpg',
      caption: 'Haircut - Digital character illustration with intimate, personal themes',
      alt: 'Haircut character illustration',
      width: 600,
      height: 800
    },
    {
      id: 9,
      src: getAssetPath('/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/143.jpg',
      caption: '143 - Digital artwork with minimalist approach and numerical symbolism',
      alt: '143 artwork',
      width: 600,
      height: 800
    }
  ];

  return (
    <main className="art-container">
      <div
        className="art-section-header"
        style={{ backgroundImage: `url(${getAssetPath('/pictures/portfolio-content_spring2026/04_ART/header.png')})` }}
      >
        <div className="art-section-header-introtext">
          <h1>Ordinary & Extraordinary</h1>
          <p>
          The theme of this portfolio is the collapsing of boundaries between the ordinary and
          extraordinary found in everything around us.
          <br></br><br></br>
          While the norms are used as standards for order, goodness, and positivity, their antonyms
          are grounded with disorder, evil, and negativity. This portfolio aims to unsettle the arbitrary concepts
          of these qualities and show the beauty of their coexistence in the things, emotions, and ideas
          around us. Ultimately, I hope to return the visibility and justice to those traditionally suppressed,
          marginalized elements.
          </p>
        </div>
      </div>



      <div className="art-assorted art-2022-works">
        <h2>Ordinary & Extraordinary</h2>

        <div className="art-assorted-container">
          <MasonryGrid images={portfolio2022Images} />
        </div>
      </div>

    </main>
  );
}
