import React, { useState } from 'react';
import '../mainpages/design-style.css';
import './design-marshalls-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import EmailAssetsGrid from '../EmailAssetsGrid';

export default function DesignMarshalls() {
  // Set darkMode to false for the design collection page
  usePageDarkMode(false);
  
  // Enable scroll-based dark mode for this page
  useScrollDarkMode(true, '.tab-navigation', true);

  // State for active tab
  const [activeTab, setActiveTab] = useState('digital');

  return (
    <main className="design-container">
      <div
        className="design-section-header"
        style={{ backgroundImage: "url('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/header-3.png')" }}
      >
        <div className="design-section-header-introtext">
          <h1>TJX/Marshalls Graphic Design Co-op</h1>
          <p>
            During my six-month co-op as a Graphic Designer at MARSHALLS LLC (The TJX Companies, Inc.), 
            I worked across the Retail, Ecommerce, and Social teams. I designed in-store signage, 
            including bilingual and grand opening graphics, some of which are now in stores nationwide. 
            I also assisted with store design mockups, print prep, and competitor research.
            <br></br><br></br>
            On the Ecommerce and Social teams, I created marketing emails, website graphics, and 
            organic social content using Photoshop, Illustrator, and After Effects. Highlights included 
            designing seasonal campaigns, photographing in-store product shots, and contributing to 
            Marshalls’ Instagram. This experience sharpened my technical, communication, and project 
            management skills while deepening my understanding of brand marketing.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab('digital')}
          className={`tab-button ${activeTab === 'digital' ? 'active' : 'inactive'}`}
        >
          Digital
        </button>
        <button
          onClick={() => setActiveTab('print')}
          className={`tab-button ${activeTab === 'print' ? 'active' : 'inactive'}`}
        >
          Print
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'digital' && (
          <div>
            <h2>Digital Assets</h2>
            <h4>Click on an asset to see different explorations!</h4>
            <h3>Email Assets</h3>
            <h4>
              Goal: create digital assets advertising different products 
              (new arrivals, early arrivals, dresses, denim, etc.)
            </h4>
            
            <EmailAssetsGrid />
          </div>
        )}
        
        {activeTab === 'print' && (
          <div>
            <h2>Print Content</h2>
            <p style={{ 
              fontSize: '1.2vw', 
              lineHeight: '1.4',
              opacity: '0.9'
            }}>
              This is the Print tab content. Add your print design work here.
            </p>
          </div>
        )}
      </div>

    </main>
  );
}
