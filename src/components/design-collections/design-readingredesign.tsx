import React, { useState } from 'react';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import '../mainpages/design-style.css';
import './design-readingredesign.css';
import ImageLightbox from '../page-components/ImageLightbox';

export default function DesignReadingRedesign() {
  interface LightboxImage {
    id: number;
    src: string;
    caption: string;
    alt: string;
  }

  // Set darkMode to true for the header (navbar will be dark)
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page - start dark, turn light when hitting content
  useScrollDarkMode(true, '.reading-redesign-content', false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<LightboxImage | null>(null);

  const openLightbox = (src: string, alt: string) => {
    setCurrentImage({ id: Date.now(), src, caption: '', alt });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  return (
    <main className="design-container">
      <div
        className="design-section-header"
        style={{ backgroundImage: "url('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/header.png')" }}
      >
        <div className="design-section-header-introtext">
          <h1>Reading Redesign</h1>
          <p>
          This UX redesign project focused on improving the reading experience through comprehensive 
              user research, information architecture, and iterative prototyping. The project demonstrates 
              the complete design process from initial user research to final interactive prototypes.
          </p>
        </div>
      </div>

      <div className="reading-redesign-content">

        {/* About Section */}
        <div className="about-section">
          <div className="about-text">
            <h2>About</h2>
            <h4>
               A comprehensive UX redesign project focused on improving the reading experience 
            through user research, information architecture, and iterative prototyping. 
            This project demonstrates the complete design process from initial user research 
            to final interactive prototypes.
            <br></br><br></br>
            The redesign addresses key usability issues identified through user interviews 
            and usability testing, resulting in a more intuitive and accessible reading 
            platform that better serves diverse user needs.
            </h4>
            <p>Feel free to explore the hi-fi Figma prototype!</p>
          </div>
          
          {/* Wireframe Video and Figma Prototype */}
          <div className="prototype-container">
            {/* Wireframe Demo Video */}
            <div className="wireframe-video-container">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                controls={false}
                className="wireframe-demo-video"
              >
                <source 
                  src="/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/wireframe_demo.mov" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Embedded Figma Prototype - Vertical */}
            <div className="figma-prototype-vertical">
              <iframe 
                style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} 
                width="400" 
                height="933" 
                src="https://embed.figma.com/proto/W9bWaAroWLzF2gPgd8KSfY/-w--Amy-Eng?page-id=3759%3A4367&node-id=3759-4771&starting-point-node-id=3759%3A4771&embed-host=share" 
                allowFullScreen
                title="Reading Redesign Figma Prototype"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Persona & Storyboard Section */}
        <h3>Persona & Storyboard</h3>
        <h4>
          User research and persona development to understand target users and their needs.
        </h4>
        <div className="image-grid image-grid--stack">
          <div className="image-item">
            <img 
              src="/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/persona.png" 
              alt="User Persona" 
              onClick={() => openLightbox('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/persona.png', 'User Persona')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
          <div className="image-item">
            <img 
              src="/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/storyboard.png" 
              alt="Storyboard" 
              onClick={() => openLightbox('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/storyboard.png', 'Storyboard')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
        </div>

        {/* Site Map & Task Flows Section */}
        <h3>Site Map & Task Flows</h3>
        <h4>
          Information architecture and user flow mapping to optimize the reading experience.
        </h4>
        <div className="image-grid">
          <div className="image-item">
            <img 
              src="/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/sitemap.png" 
              alt="Site Map" 
              onClick={() => openLightbox('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/sitemap.png', 'Site Map')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
          <div className="image-item">
            <img 
              src="/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/taskflow1.png" 
              alt="Task Flow 1" 
              onClick={() => openLightbox('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/taskflow1.png', 'Task Flow 1')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
          <div className="image-item">
            <img 
              src="/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/taskflow2.png" 
              alt="Task Flow 2" 
              onClick={() => openLightbox('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/taskflow2.png', 'Task Flow 2')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
        </div>

      </div>
      <ImageLightbox isOpen={lightboxOpen} currentImage={currentImage} onClose={closeLightbox} />
    </main>
  );
}
