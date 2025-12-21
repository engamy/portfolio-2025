import React from 'react';
import './home-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { getAssetPath } from '../../utils/assetUtils';

export default function Home() {
  // Set darkMode to false for the home page
  usePageDarkMode(false);

  return (
    <main className="home-container">
      <div className="home-introtext">
        <h1>AMY ENG</h1>
        <p>she/her/hers</p>
        <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/star_red.svg')} alt="Red Star" />

        
        <p><span>Designer • Developer • Artist</span></p>
      </div>
      <div className="jumpimg">
        <img src={getAssetPath('/pictures/portfolio-content_spring2026/01_HOME/jump.png')} alt="Jump Hero" />
      </div>
      <div className="smallbio">
        <p>Hello! I am a <span>designer, developer, </span> <br></br>
          and artist currently based in <span>Boston</span> who is studying
          <span> Computer Science and Design</span> <br></br>
          with a concentration in <span>UI/UX Design</span> <br></br>
          at <span>Northeastern University</span>.
          <br></br><br></br>
          Welcome to my self-coded portfolio, and <br></br>
          thank you for your interest in my work.
          <br></br><br></br>
          Feel free to connect with me!
        </p>
        <div className="contacticon">
          <a href="https://www.linkedin.com/in/amyeng895/" target="_blank" rel="noopener noreferrer">
            <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/linkedin.png')} alt="LinkedIn" />
          </a>
          <a href="https://www.instagram.com/yifeng.art/" target="_blank" rel="noopener noreferrer">
            <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/instagram.png')} alt="Instagram" />
          </a>
          <a href="https://github.com/engamy" target="_blank" rel="noopener noreferrer">
            <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/github.png')} alt="GitHub" />
          </a>
          <a href="https://www.youtube.com/@yifengart" target="_blank" rel="noopener noreferrer">
            <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/youtube.png')} alt="YouTube" />
          </a>
        </div>
      </div>
    </main>
  );
} 