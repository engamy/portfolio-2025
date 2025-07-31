import React from 'react';
import '../mainpages/art-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import MasonryGrid from '../MasonryGrid';

export default function Art2022Portfolio() {
  // Set darkMode to true for the art collection page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page
  useScrollDarkMode(true, '.art-2022-works');

  // XTRAordinary Portfolio images
  const portfolio2022Images = [
    {
      id: 1,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/adamAndEve.jpg',
      caption: 'Adam and Eve - Digital illustration exploring biblical themes with contemporary interpretation',
      alt: 'Adam and Eve digital illustration',
      width: 800,
      height: 600
    },
    {
      id: 2,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/bloodyMary.jpg',
      caption: 'Bloody Mary - Digital character illustration with dark themes and dramatic lighting',
      alt: 'Bloody Mary character illustration',
      width: 800,
      height: 600
    },
    {
      id: 3,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/suki.jpg',
      caption: 'Suki - Digital character portrait with emotional depth and expressive features',
      alt: 'Suki character portrait',
      width: 700,
      height: 500
    },
    {
      id: 4,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/evangelion.jpg',
      caption: 'Evangelion - Digital fan art inspired by the iconic anime series with dynamic composition',
      alt: 'Evangelion fan art',
      width: 700,
      height: 500
    },
    {
      id: 5,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/nineToFive.jpg',
      caption: 'Nine to Five - Digital illustration exploring themes of work and daily routine',
      alt: 'Nine to Five illustration',
      width: 800,
      height: 600
    },
    {
      id: 6,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/whereIBelong.jpg',
      caption: 'Where I Belong - Digital artwork exploring themes of identity and belonging',
      alt: 'Where I Belong artwork',
      width: 700,
      height: 500
    },
    {
      id: 7,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/youth.jpg',
      caption: 'Youth - Digital illustration capturing the energy and vitality of young life',
      alt: 'Youth illustration',
      width: 800,
      height: 600
    },
    {
      id: 8,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/haircut.jpg',
      caption: 'Haircut - Digital character illustration with intimate, personal themes',
      alt: 'Haircut character illustration',
      width: 600,
      height: 800
    },
    {
      id: 9,
      src: '/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/143.jpg',
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
        style={{ backgroundImage: "url('/pictures/portfolio-content_spring2026/04_ART/header.png')" }}
      >
        <div className="art-section-header-introtext">
          <h1>2022 Portfolio</h1>
          <p>A year of experimentation and growth in digital and traditional mediums.
            <br></br><br></br>
            This collection represents my artistic journey through 2022, featuring
            character illustrations, traditional studies, and mixed media pieces
            that showcase my evolving style and technical skills.
            <br></br><br></br>
            From digital fan art to traditional ink drawings, each piece reflects
            my passion for storytelling through visual art and my commitment to
            continuous learning and creative exploration.
          </p>
        </div>
      </div>



      <div className="art-assorted art-2022-works">
        <h2>Complete 2022 Collection</h2>

        <div className="art-assorted-container">
          <MasonryGrid images={portfolio2022Images} />
        </div>
      </div>

    </main>
  );
}
