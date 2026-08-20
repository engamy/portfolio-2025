import React, { useState } from 'react';
import '../mainpages/design-style.css';
import './design-marshalls-style.css';
import { getAssetPath } from '../../utils/assetUtils';
import EmailAssetsGrid from '../page-components/EmailAssetsGrid';
import WebsiteAssetsGrid from '../page-components/WebsiteAssetsGrid';
import InstagramPosts from '../page-components/InstagramPosts';
import BeforeAfterComparison from '../page-components/BeforeAfterComparison';
import TrendingShopLayoutGrid from '../page-components/TrendingShopLayoutGrid';
import { usePageMode } from '../../hooks/usePageMode';
import ImageGridLightbox from '../page-components/ImageGridLightbox';
import { bilingualSignage, inStoreSignage, oohSignage, springGrandOpening } from '../../data/marshallsGalleries';
import PageHero from '../page-components/PageHero';

export default function DesignMarshalls() {
  usePageMode({ initial: false, flipAt: '.tab-navigation' });
  

  // State for active tab
  const [activeTab, setActiveTab] = useState('digital');


  return (
    <main className="design-container">
      <PageHero
        variant="design"
        backgroundImage="/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/header-3.png"
        title="TJX/Marshalls Graphic Design Co-op"
        titleClassName="marshalls-title"
        introClassName="marshalls-description"
        intro={
          <>
            During my six-month co-op as a Graphic Designer at MARSHALLS LLC (The TJX Companies, Inc.),
            I worked across the Retail, Ecommerce, and Social teams. I designed in-store signage,
            including bilingual and grand opening graphics, some of which are now in stores nationwide.
            I also assisted with store design mockups, print prep, and competitor research.
            <br></br><br></br>
            On the Ecommerce and Social teams, I created marketing emails, website graphics, and
            organic social content using Photoshop, Illustrator, and After Effects. Highlights included
            designing seasonal campaigns, photographing in-store product shots, and contributing to
            Marshalls' Instagram. This experience sharpened my technical, communication, and project
            management skills while deepening my understanding of brand marketing.
          </>
        }
      />

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
            <h2 style={{ textAlign: 'center' }}>Digital Assets</h2>
            <h4 style={{ textAlign: 'center' }}>Click on an asset to see different explorations!</h4>

            <h3>Email Assets</h3>
            <h4>
              Objective: create digital assets advertising different products 
              (new arrivals, early arrivals, dresses, denim, etc.)
            </h4>
            <EmailAssetsGrid />

            <h3>Website Assets</h3>
            <h4>
            Objective: create Summerween-themed digital assets for the 
               <a href="https://www.marshalls.com/us/store/index.jsp" target="_blank" rel="noopener noreferrer" style={{ 
                 fontStyle: 'italic', 
                 color: '#F0EDE6', 
                 textDecoration: 'underline',
                 fontWeight: 'bold',
                 backgroundColor: '#0024cc',
                 padding: '4px 8px',
                 margin: '4px 4px',
                 borderRadius: '4px',
                 transition: 'all 0.2s ease'
               }}>Marshalls.com</a>website to advertise quality products.
            </h4>
            <WebsiteAssetsGrid />

            <h3>The Trending Shop</h3>
            <div className="trending-shop-container" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '30px', 
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              <img 
                src={getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop/branding-3.gif')} 
                alt="The Trending Shop branding"
                style={{ 
                  maxWidth: '400px', 
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0',
                  flex: '0 0 auto'
                }}
              />
              <h4 style={{ 
                margin: 0, 
                flex: 1,
                minWidth: '300px',
                lineHeight: '1.4',
                maxWidth: '60%'
              }}>
                Objective: design/brainstorm new branding and website graphic layouts for 
                The Trending Shop, a new, ephemeral subpage on
                <a href="https://www.marshalls.com/us/store/shop/trending-now/_/N-2582201712?tn=8" target="_blank" rel="noopener noreferrer" style={{ 
                   fontStyle: 'italic', 
                   color: '#F0EDE6', 
                   textDecoration: 'underline',
                   fontWeight: 'bold',
                   backgroundColor: '#0024cc',
                   padding: '4px 8px',
                   margin: '4px 4px',
                   borderRadius: '4px',
                   transition: 'all 0.2s ease'
                 }}>Marshalls.com</a>
                 that highlights the most popular products/styles/categories/trends of the moment.
              </h4>
            </div>
            <TrendingShopLayoutGrid />
          
            <h3>Social Content</h3>
            <h4>
            Objective: create social content for Marshalls' Instagram to advertise different products.
            </h4>
            
            <InstagramPosts />

            
          </div>
        )}
        
        {activeTab === 'print' && (
          <div>
            <h2 style={{ textAlign: 'center' }}>Print Content</h2>
            <p className="print-intro-text">
              In-store and out-of-home signage, including bilingual and Spring grand opening graphics.
            </p>

            <h3>Store Design Mockups</h3>
            <h4>Objective: create mockups for store design updates in different locations across the country.</h4>
            <BeforeAfterComparison />

            <h3>Signage</h3>
            <h4>Objective: create signage to advertise the Marshalls brand and communicate to customers, 
              including signage in both English and Spanish.
            </h4>

            <ImageGridLightbox {...springGrandOpening} />

            <ImageGridLightbox {...oohSignage} />

            <ImageGridLightbox {...inStoreSignage} />

            <ImageGridLightbox {...bilingualSignage} />

            




          </div>
        )}
      </div>

    </main>
  );
}
