import React from 'react';
import '../mainpages/design-style.css';
import './design-readingredesign.css';
import ImageLightbox from '../page-components/ImageLightbox';
import { getAssetPath } from '../../utils/assetUtils';
import { usePageMode } from '../../hooks/usePageMode';
import PageHero from '../page-components/PageHero';
import { useSingleImageLightbox } from '../../hooks/useLightbox';

export default function DesignReadingRedesign() {
  usePageMode({ initial: true, flipAt: '.reading-redesign-content' });
  

  const lightbox = useSingleImageLightbox();

  return (
    <main className="design-container">
      <PageHero
        variant="design"
        backgroundImage="/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/header.png"
        thumbnail="/pictures/portfolio-content_spring2026/02_DESIGN/thumbnail_readingRedesign.jpg"
        thumbnailAlt="Reading Redesign thumbnail"
        title="Reading Redesign"
        intro={
          <>
            "We are constantly reading, and reading all different types of media,
            but this project is focused on long-form text-based media. Design a user
            interface that enhances the reading experience of everyday readers. You
            will create a prototype for an interactive digital reading platform that
            accommodates specific reading styles and user needs."
          </>
        }
      />

      <div className="reading-redesign-content">

        {/* About Section */}
        <div className="about-section">
          <div className="about-text">
            <h2>About</h2>
            <h4>
            This Figma prototype features two AI-powered integrations into Apple Books. 
            The first is a recommendation feature that takes in specific criterias and 
            recommends five books in order to eliminate the paradox of choice. 
            The second allows a user to select text within a book and prompt an AI 
            model of their choice to generate an image or gif in an art style of their 
            choice.
            <br></br><br></br>
            This is acomprehensive UX redesign project focused on improving the reading experience 
            through user research, information architecture, and iterative prototyping. 
            This project demonstrates the complete design process from initial user research 
            to final interactive prototypes.
            <br></br><br></br>
            The design addresses key usability issues identified through user interviews 
            and usability testing, resulting in a more intuitive and accessible reading 
            platform that better serves diverse user needs.
            </h4>
            <p>
              <a 
                href="https://www.figma.com/proto/W9bWaAroWLzF2gPgd8KSfY?content-scaling=fixed&kind=proto&node-id=3759-4771&page-id=3759%3A4367&scaling=scale-down&starting-point-node-id=3759%3A4771&fuid=1413253686122353770" 
                target="_blank" 
                rel="noopener noreferrer"
                className="figma-link"
              >
                Feel free to explore the hi-fi Figma prototype!
              </a>
            </p>
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
                <source src={getAssetPath("/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/wireframe_demo.mov")} />
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
              src={getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/persona.png')} 
              alt="User Persona" 
              {...lightbox.trigger(getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/persona.png'), 'User Persona')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
          <div className="image-item">
            <img 
              src={getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/storyboard.png')} 
              alt="Storyboard" 
              {...lightbox.trigger(getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/storyboard.png'), 'Storyboard')}
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
              src={getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/sitemap.png')} 
              alt="Site Map" 
              {...lightbox.trigger(getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/sitemap.png'), 'Site Map')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
          <div className="image-item">
            <img 
              src={getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/taskflow1.png')} 
              alt="Task Flow 1" 
              {...lightbox.trigger(getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/taskflow1.png'), 'Task Flow 1')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
          <div className="image-item">
            <img 
              src={getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/taskflow2.png')} 
              alt="Task Flow 2" 
              {...lightbox.trigger(getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/taskflow2.png'), 'Task Flow 2')}
              style={{ cursor: 'zoom-in' }}
            />
          </div>
        </div>

      </div>
      <ImageLightbox isOpen={lightbox.isOpen} currentImage={lightbox.currentImage} onClose={lightbox.close} />
    </main>
  );
}
