import React from 'react';
import { Link } from 'react-router-dom';
import './design-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';

export default function Design() {
  // Set darkMode to true for the design page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page, targeting the design-collections div
  // Use reverse=true to start light and turn dark when hitting the div
  useScrollDarkMode(false, '.design-collections', false);

  return (
    <main className="design-container">
      <div
        className="design-section-header"
        style={{ backgroundImage: "url('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/header-1.jpg')" }}
      >
        <div className="design-section-header-introtext">
          <h1>Designer</h1>
          <p>
          Because design is in every aspect of our lives, I get to explore 
          various fields and combine research and creativity in order to 
          craft solutions that engage, inspire, and address complex challenges.
          <br></br><br></br>
          I've explored the intersection of design and innovation, spanning UI/UX, 
          graphic design, and corporate branding, and I'm always eager to learn more!
          </p>
        </div>
      </div>

      <div className="design-collections">
        <h2>Collections</h2>
        <div className="design-collection">
          <Link to="/design-marshalls">
            <div className="design-collection-image">
              <img src="/pictures/portfolio-content_spring2026/02_DESIGN/thumbnail_marshalls.jpg" alt="Marshalls Collection" />
            </div>
            <div className="design-collection-info">
              <h4>Marshalls</h4>
              <p>January 2025 - June 2025</p>
              <div className="design-collection-tags">
                <p>Graphic Design</p>
                <p>Brand Identity</p>
                <p>Print Design</p>
                <p>Marketing</p>
                <p>Typography</p>
                <p>Layout</p>
              </div>
            </div>
          </Link>
        </div>


        {/* CBA Collection: HIDDEN UNTIL COMPLETED */}
        {/* <div className="design-collection">
          <a href="" target="_blank">
            <div className="design-collection-image">
              <img src="/pictures/portfolio-content_spring2026/02_DESIGN/thumbnail_cba.jpg" alt="CBA Collection" />
            </div>
            <div className="design-collection-info">
              <h4>Community Built Association</h4>
              <p>Month 20XX</p>
              <div className="design-collection-tags">
                <p>Web Design</p>
                <p>UI/UX</p>
                <p>User Research</p>
                <p>Prototyping</p>
                <p>Wireframing</p>
                <p>Responsive</p>
              </div>
            </div>
          </a>
        </div> */}

        <div className="design-collection">
          <Link to="/design-dishwasher">
            <div className="design-collection-image">
              <img src="/pictures/portfolio-content_spring2026/02_DESIGN/thumbnail_iotDishwasher.png" alt="IoT Dishwasher Collection" />
            </div>
            <div className="design-collection-info">
              <h4>IoT Dishwasher</h4>
              <p>September 2024</p>
              <div className="design-collection-tags">
                <p>Product Design</p>
                <p>IoT</p>
                <p>User Experience</p>
                <p>Interface Design</p>
                <p>Smart Home</p>
                <p>Technology</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="design-collection">
          <Link to="/design-reading-redesign">
            <div className="design-collection-image">
              <img src="/pictures/portfolio-content_spring2026/02_DESIGN/thumbnail_readingRedesign.jpg" alt="Reading Redesign Collection" />
            </div>
            <div className="design-collection-info">
              <h4>Reading Redesign</h4>
              <p>November 2024</p>
              <div className="design-collection-tags">
                <p>UX Design</p>
                <p>User Research</p>
                <p>Information Architecture</p>
                <p>Wireframing</p>
                <p>Prototyping</p>
                <p>Usability</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="design-collection">
          <Link to="/design-layouts">
            <div className="design-collection-image">
              <img src="/pictures/portfolio-content_spring2026/02_DESIGN/thumbnai_layoutDesign.png" alt="Layout Design Collection" />
            </div>
            <div className="design-collection-info">
              <h4>Layout Design</h4>
              <p>March 2024 - June 2025</p>
              <div className="design-collection-tags">
                <p>Layout Design</p>
                <p>Typography</p>
                <p>Grid Systems</p>
                <p>Visual Hierarchy</p>
                <p>Composition</p>
                <p>Print Design</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 