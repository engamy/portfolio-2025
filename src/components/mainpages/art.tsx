import React from 'react';
import { Link } from 'react-router-dom';
import './art-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import MasonryGrid from '../MasonryGrid';

export default function Art() {
  // Set darkMode to false for the art page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page, targeting the art-assorted div
  useScrollDarkMode(true, '.art-assorted');

  // Sample images for the masonry grid
  const assortedImages = [
    {
      id: 8,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/sageValorant.png',
      caption: 'Sage Valorant - Digital fan art of the Valorant character with vibrant colors',
      alt: 'Sage Valorant fan art',
      width: 700,
      height: 500
    },
    {
      id: 3,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/forget.jpg',
      caption: 'Forget - Mixed media piece exploring memory and the passage of time',
      alt: 'Forget mixed media artwork',
      width: 700,
      height: 500
    },
    {
      id: 15,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/makiZenin.jpg',
      caption: 'Maki Zenin - Digital character illustration with dynamic pose and action',
      alt: 'Maki Zenin character illustration',
      width: 800,
      height: 600
    },
    {
      id: 1,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/carisDemise.jpg',
      caption: 'Caris\' Demise (2022)',
      alt: 'Caris Demise digital illustration',
      width: 800,
      height: 600
    },
    {
      id: 12,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/femmeFatale.jpg',
      caption: 'Femme Fatale - Digital character design with noir aesthetic and dramatic lighting',
      alt: 'Femme Fatale character design',
      width: 700,
      height: 500
    },
    {
      id: 6,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/scubadivers.jpg',
      caption: 'Scuba Divers - Underwater scene created with traditional painting techniques',
      alt: 'Scuba divers underwater painting',
      width: 700,
      height: 500
    },
    {
      id: 9,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/faceStudies.jpg',
      caption: 'Face Studies - Traditional drawing studies focusing on facial anatomy and expression',
      alt: 'Face studies drawings',
      width: 600,
      height: 800
    },
    {
      id: 4,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/hutao.png',
      caption: 'Hu Tao Fan Art - Digital character illustration with vibrant colors and dynamic composition',
      alt: 'Hu Tao character illustration',
      width: 600,
      height: 900
    },
    {
      id: 11,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/myFaithLooksUpToThee.jpg',
      caption: 'My Faith Looks Up To Thee - Traditional painting with religious themes and symbolism',
      alt: 'My Faith Looks Up To Thee painting',
      width: 800,
      height: 600
    },
    {
      id: 13,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/higaruma.jpg',
      caption: 'Higaruma - Digital character illustration with detailed linework and shading',
      alt: 'Higaruma character illustration',
      width: 600,
      height: 800
    },
    {
      id: 7,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/gojo.jpg',
      caption: 'Gojo Satoru - Digital character portrait with dynamic lighting and composition',
      alt: 'Gojo Satoru character portrait',
      width: 800,
      height: 600
    },
    {
      id: 2,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/farm.jpg',
      caption: 'Farm Scene - Traditional ink drawing capturing rural life and agricultural themes',
      alt: 'Farm scene ink drawing',
      width: 600,
      height: 800
    },
    {
      id: 10,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/lights.jpg',
      caption: 'Lights - Digital illustration exploring atmospheric lighting and mood',
      alt: 'Lights digital illustration',
      width: 700,
      height: 500
    },
    {
      id: 5,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/makima.png',
      caption: 'Makima Portrait - Digital painting focusing on character expression and mood',
      alt: 'Makima character portrait',
      width: 800,
      height: 600
    },
    {
      id: 14,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/yuta.jpg',
      caption: 'Yuta - Digital character portrait with emotional depth and expressive features',
      alt: 'Yuta character portrait',
      width: 700,
      height: 500
    },
    {
      id: 16,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/ellie.jpg',
      caption: 'Ellie - Digital character illustration with emotional storytelling and detailed rendering',
      alt: 'Ellie character illustration',
      width: 800,
      height: 600
    },
    {
      id: 17,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/miku_2022.png',
      caption: 'Miku 2022 - Digital fan art of Hatsune Miku with vibrant colors and dynamic composition',
      alt: 'Miku 2022 fan art',
      width: 700,
      height: 500
    },
    {
      id: 18,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/ink_squirrel.jpg',
      caption: 'Ink Squirrel - Traditional ink drawing showcasing wildlife and natural forms',
      alt: 'Ink squirrel drawing',
      width: 600,
      height: 800
    },
    {
      id: 19,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/ink_panda.jpg',
      caption: 'Ink Panda - Traditional ink drawing with expressive linework and character',
      alt: 'Ink panda drawing',
      width: 600,
      height: 800
    },
    {
      id: 20,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/ink_cat.jpg',
      caption: 'Ink Cat - Traditional ink drawing capturing feline grace and movement',
      alt: 'Ink cat drawing',
      width: 600,
      height: 800
    },
    {
      id: 21,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/ceramicFortuneCat.jpg',
      caption: 'Ceramic Fortune Cat - 3D ceramic sculpture with traditional Japanese symbolism',
      alt: 'Ceramic fortune cat sculpture',
      width: 800,
      height: 600
    },
    {
      id: 22,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/ceramicPanda.jpg',
      caption: 'Ceramic Panda - 3D ceramic sculpture with detailed texture and form',
      alt: 'Ceramic panda sculpture',
      width: 800,
      height: 600
    },
    {
      id: 23,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/ceramicDragon.jpg',
      caption: 'Ceramic Dragon - 3D ceramic sculpture with intricate details and mythical themes',
      alt: 'Ceramic dragon sculpture',
      width: 800,
      height: 600
    },
    {
      id: 24,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/thanksgiving.jpg',
      caption: 'Thanksgiving - Traditional painting capturing holiday warmth and family themes',
      alt: 'Thanksgiving painting',
      width: 700,
      height: 500
    },
    {
      id: 25,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/subway.jpg',
      caption: 'Subway - Urban scene capturing the energy and movement of city life',
      alt: 'Subway urban scene',
      width: 700,
      height: 500
    },
    {
      id: 26,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/gojo_sketchbook.jpg',
      caption: 'Gojo Sketchbook - Traditional sketchbook studies showing character development process',
      alt: 'Gojo sketchbook studies',
      width: 600,
      height: 800
    },
    {
      id: 27,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/killua.jpg',
      caption: 'Killua - Digital character portrait with dynamic lighting and expressive features',
      alt: 'Killua character portrait',
      width: 700,
      height: 500
    },
    {
      id: 28,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/satosugu.jpg',
      caption: 'Satosugu - Digital character illustration with emotional depth and storytelling',
      alt: 'Satosugu character illustration',
      width: 700,
      height: 500
    },
    {
      id: 29,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/sukuna.jpg',
      caption: 'Sukuna - Digital character portrait with dark themes and powerful presence',
      alt: 'Sukuna character portrait',
      width: 700,
      height: 500
    },
    {
      id: 30,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/dandadan.jpg',
      caption: 'Dandadan - Digital character illustration with dynamic action and vibrant colors',
      alt: 'Dandadan character illustration',
      width: 700,
      height: 500
    },
    {
      id: 31,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/makimaBang.jpg',
      caption: 'Makima Bang - Digital character illustration with dramatic lighting and intense expression',
      alt: 'Makima Bang character illustration',
      width: 700,
      height: 500
    },
    {
      id: 32,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/scubadivers2.jpg',
      caption: 'Scuba Divers 2 - Traditional painting exploring underwater themes and marine life',
      alt: 'Scuba divers 2 painting',
      width: 700,
      height: 500
    },
    {
      id: 33,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/akiangel2.jpg',
      caption: 'Aki Angel 2 - Digital character illustration with ethereal themes and angelic symbolism',
      alt: 'Aki Angel 2 character illustration',
      width: 800,
      height: 600
    },
    {
      id: 34,
      src: '/pictures/portfolio-content_spring2026/04_ART/content_assorted/akiangel1.jpg',
      caption: 'Aki Angel 1 - Digital character illustration with celestial themes and divine beauty',
      alt: 'Aki Angel 1 character illustration',
      width: 800,
      height: 600
    }
  ];

  return (
    <main className="art-container">
      <div
        className="art-section-header"
        style={{ backgroundImage: "url('/pictures/portfolio-content_spring2026/04_ART/header.png')" }}
      >
        <div className="art-section-header-introtext">
          <h1>Artist</h1>
          <p>Photoshop, Illustrator, InDesign, After Effects, Krita,
            Wacom Intuos Pro, ink, pencil, alcohol-based markers,
            colored pencils, tape, glue, plastic sheets, paper receipts,
            toilet paper rolls...
            <br></br><br></br>
            ...anything I can use to create.
            <br></br><br></br>
            My approach to art is centered around experimentation,
            using a variety of techniques and mediums to push the
            boundaries of creativity and produce unique, impactful
            pieces. Whether digital or analog, I'm always seeking new
            way to bring my visions to life.
          </p>
        </div>
      </div>

      <div className="art-featured-collections">
        <h2>Featured Collections</h2>
        <div className="art-collection">
          <Link to="/art-2022-portfolio" target="_blank">
            <div className="art-collection-image">
              <img src="/pictures/portfolio-content_spring2026/04_ART/XTRAordinary/evangelion.jpg" alt="2022 Portfolio" />
            </div>
            <div className="art-collection-info">
              <h4>Ordinary and Extraordinary Portfolio</h4>
              <p>2022-2023</p>
              <div className="art-collection-tags">
                  <p>tag</p>
                  <p>tag</p>
                  <p>tag</p>
                  <p>tag</p>
                  <p>tag</p>
                  <p>tag</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="art-collection">
          <div className="art-collection-image">

          </div>
          <div className="art-collection-info">
            <h4>Collection Name</h4>
            <p>Month 20XX</p>
            <div className="art-collection-tags">
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
            </div>
          </div>
        </div>

        <div className="art-collection">
          <Link to="/art-motion-media">
                         <div className="art-collection-image">
               <video 
                 src="/pictures/portfolio-content_spring2026/04_ART/motionMedia/omori.mov" 
                 autoPlay
                 muted
                 loop
                 playsInline
               />
             </div>
            <div className="art-collection-info">
              <h4>Motion Media</h4>
              <p>2023</p>
              <div className="art-collection-tags">
                <p>Animation</p>
                <p>Video</p>
                <p>Motion Graphics</p>
                <p>Character Design</p>
                <p>Digital Art</p>
                <p>YouTube</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="art-assorted">
        <h2>Assorted Works</h2>

        <div className="art-assorted-container">
          <MasonryGrid images={assortedImages} />
        </div>
      </div>

    </main>
  );
} 