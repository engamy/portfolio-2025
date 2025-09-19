import React, { useState } from 'react';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import '../mainpages/design-style.css';
import './design-dishwasher.css';
import ImageLightbox from '../page-components/ImageLightbox';

export default function DesignDishwasher() {
  interface LightboxImage {
    id: number;
    src: string;
    caption: string;
    alt: string;
  }

  // Set darkMode to true for the header (navbar will be dark)
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page - start dark, turn light when hitting content
  useScrollDarkMode(true, '.dishwasher-content', false);

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
        <div className="design-section-header-content">
          <div className="design-section-header-introtext">
            <h1>IoT Dishwasher</h1>
            <p>
              "The focus of this project is to identify the components of a 
              physical interface (washing your dishes) and translate their 
              purpose into a digital UI. Use UI components from an existing 
              app and apply it to your digital translation"
            </p>
          </div>
          <div className="design-section-header-image">
            <img 
              src="/pictures/portfolio-content_spring2026/02_DESIGN/thumbnail_iotDishwasher.png" 
              alt="IoT Dishwasher thumbnail"
              className="header-thumbnail"
            />
          </div>
        </div>
      </div>

      <div className="dishwasher-content">

        {/* About Section */}
        <div className="about-section">
          <div className="intro-text">
            <div className="about-text">
              <h2>About</h2>
              <h4>
              An app interface design project focused on creating an intuitive 
              smart home integration, inspired by Apple Maps' UI/UX design and 
              interface.
              <br></br><br></br>
              In this app, I used the UI components from Apple Maps to design the interface for 
              an app that uses the internet of things to control a dishwasher remotely. This 
              app would be used in the event that you need to schedule a cycle ahead of time 
              or if you need to start it remotely. It also highlights the customization of 
              different dishwashing cycles, something most of us never really consider when 
              we hit the start button on our dish cycles.
              </h4>
              <p>
                <a 
                  href="https://www.figma.com/proto/PnVqtZtiJ7H5QoOvgANPT7/-w--Amy-Eng?content-scaling=fixed&kind=proto&node-id=4145-5298&page-id=1%3A5&scaling=scale-down&starting-point-node-id=4145%3A5298" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="figma-link"
                >
                  Feel free to explore the hi-fi Figma prototype!
                </a>
              </p>
            </div>
            
            <div className="user-scenario">
              <h2>User Scenario</h2>
              <h4>
              David is a 20-year-old student at Boston University who lives alone in an apartment. 
              After finishing his hearty meal of spaghetti and meatballs for lunch, he neatly 
              organizes his dirty dishes in the dishwasher. Then he runs off to his next class, 
              but the moment he walks through the doors, he realizes that he forgot to start 
              the dishwasher! He needs the cycle to be done before 6pm, so he can reuse the 
              dishes he used earlier for dinner.
              </h4>
            </div>
          </div>
          
          {/* Wireframe Video and Figma Prototype */}
          <div className="prototype-container">
            {/* Lo-fi Video */}
            <div className="lofi-video-container">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                controls={false}
                className="lofi-demo-video"
                style={{ width: '100%', height: 'auto' }}
              >
                <source 
                  src="/pictures/portfolio-content_spring2026/02_DESIGN/03_DISHWASHER/lofi.mov" 
                  type="video/mp4" 
                />
                <source 
                  src="/pictures/portfolio-content_spring2026/02_DESIGN/03_DISHWASHER/lofi.mov" 
                  type="video/quicktime" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Embedded Figma Prototype - Vertical */}
            <div className="figma-prototype-vertical">
              <iframe 
                style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} 
                width="400" 
                height="600" 
                src="https://embed.figma.com/proto/PnVqtZtiJ7H5QoOvgANPT7/-w--Amy-Eng?page-id=1%3A5&node-id=4145-5298&viewport=122%2C-1275%2C0.79&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4145%3A5298&embed-host=share" 
                allowFullScreen
                title="IoT Dishwasher Figma Prototype"
              ></iframe>
            </div>
          </div>
        </div>
        
      </div>
      <ImageLightbox isOpen={lightboxOpen} currentImage={currentImage} onClose={closeLightbox} />
    </main>
  );
}
