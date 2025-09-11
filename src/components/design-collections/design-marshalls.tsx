import React, { useState } from 'react';
import '../mainpages/design-style.css';
import './design-marshalls-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import EmailAssetsGrid from '../EmailAssetsGrid';

export default function DesignMarshalls() {
  // Set darkMode to true for the design collection page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page
  useScrollDarkMode(true, '.design-collections');

  // State for active tab
  const [activeTab, setActiveTab] = useState('digital');

  return (
    <main className="design-container">
      <div
        className="design-section-header"
        style={{ backgroundImage: "url('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/header-1.jpg')" }}
      >
        <div className="design-section-header-introtext">
          <h1>Marshalls</h1>
          <p>Graphic Design & Brand Identity Work
            <br></br><br></br>
            A comprehensive collection of design work for Marshalls, showcasing
            retail branding, digital marketing campaigns, and visual identity development.
            <br></br><br></br>
            From in-store signage to email marketing campaigns, each project demonstrates
            my approach to creating cohesive brand experiences that engage customers
            and drive business results.
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
            <h4>Click on an asset to see its different explorations before approval!</h4>
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
