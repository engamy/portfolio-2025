import React from 'react';
import '../mainpages/design-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import SimplePDFViewer from '../SimplePDFViewer';

export default function DesignWikiBook() {
  // Set darkMode to true for the design collection page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page
  useScrollDarkMode(true, '.design-collections');

  return (
    <main className="design-container">
      <div
        className="design-section-header"
        style={{ backgroundImage: "url('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/header-1.jpg')" }}
      >
        <div className="design-section-header-introtext">
          <h1>Layout Design</h1>
          <p>A comprehensive collection of design projects and creative solutions.
            <br></br><br></br>
            This collection showcases my design work across various mediums including
            retail branding, digital marketing, and visual identity development.
            <br></br><br></br>
            From logo design to campaign visuals, each project demonstrates
            my approach to problem-solving through design and my commitment to
            creating impactful visual experiences.
          </p>
        </div>
      </div>

      <div className="design-collections">
        <h2>Design Articles</h2>
        <p className="design-intro">
          Explore my design research and case studies through these interactive PDF articles.
          Each document showcases different aspects of my design process and methodology.
        </p>

        {/* <iframe src="https://www.flipbookpdf.net/web/site/d4cc1b80e430b4b55571288e9e29f4da88287c7d202508.pdf.html" 
        width="900" height="637" frameBorder="0" allowFullScreen></iframe> */}

        {/* <div className="pdf-container">
          <SimplePDFViewer 
            pdfUrl="/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/wikibook_final.pdf"
            title="Design Wiki Book - Article 1"
          />
        </div> */}
      </div>

    </main>
  );
}
