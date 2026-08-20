import React from 'react';
import './design-layouts.css';
import LayoutLightboxes from '../page-components/LayoutLightboxes';
import { getAssetPath } from '../../utils/assetUtils';
import { usePageMode } from '../../hooks/usePageMode';
import PageHero from '../page-components/PageHero';

export default function DesignWikiBook() {
  usePageMode({ initial: true, flipAt: '.design-collections' });
  

  // Markiplier Wikibook images
  const markiplierImages = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/markiplier_1.jpg'),
      alt: 'Markiplier Wikibook Page 1',
      caption: 'Markiplier Wikibook Page 1',
      isLarge: true
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/markiplier_2.jpg'),
      alt: 'Markiplier Wikibook Page 2',
      caption: 'Markiplier Wikibook Page 2'
    },
    {
      id: 3,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/markiplier_3.jpg'),
      alt: 'Markiplier Wikibook Page 3',
      caption: 'Markiplier Wikibook Page 3'
    },
    {
      id: 4,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/markiplier_4.jpg'),
      alt: 'Markiplier Wikibook Page 4',
      caption: 'Markiplier Wikibook Page 4'
    }
  ];

  // Fresh/Maha/Decline images
  const freshMahaDeclineImages = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/freshfornoone.jpg'),
      alt: 'Fresh For No One layout',
      caption: 'Fresh For No One layout',
      isLarge: true
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/mahaproblems.jpg'),
      alt: 'Maha Problems layout',
      caption: 'Maha Problems layout'
    },
    {
      id: 3,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/declineofcivility.jpg'),
      alt: 'Decline of Civility layout',
      caption: 'Decline of Civility layout'
    }
  ];

  // Election Results images
  const electionResultsImages = [
    {
      id: 1,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/electionresults_1.jpg'),
      alt: 'Election Results layout 1',
      caption: 'Election Results layout 1'
    },
    {
      id: 2,
      src: getAssetPath('/pictures/portfolio-content_spring2026/02_DESIGN/05_LAYOUTS/electionresults_2.jpg'),
      alt: 'Election Results layout 2',
      caption: 'Election Results layout 2'
    }
  ];

  return (
    <main className="design-container design-layouts-page">
      <PageHero
        variant="design"
        backgroundImage="/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/header-1.jpg"
        title="Layout Design"
        intro={
          <>
            A comprehensive collection of design projects and creative solutions.
            <br></br><br></br>
            This collection showcases my design work across various mediums including
            retail branding, digital marketing, and visual identity development.
            <br></br><br></br>
            From logo design to campaign visuals, each project demonstrates
            my approach to problem-solving through design and my commitment to
            creating impactful visual experiences.
          </>
        }
      />

      <div className="design-collections">
        <h2>Design Articles</h2>

        <h3>Markiplier Wikibook</h3>
        <p className="design-intro">
          Objective: Design a booklet about a topic of your choice using content 
          from Wikipedia as well as a typographic system with which to design the 
          booklet. Only use black, white, and one additional color and a maximum 
          of two typefaces.
        </p>
        
        <LayoutLightboxes images={markiplierImages} layoutType="default" />
        
        <h3>Northeastern University Political Review Layouts</h3>
        <p className="design-intro">
          Objective: Design print layouts for student-written articles for the NUPR while 
          consistently maintaining their visual identity.
        </p>
        <LayoutLightboxes images={freshMahaDeclineImages} layoutType="default" />
        <LayoutLightboxes images={electionResultsImages} layoutType="two-col-equal" />

        
      </div>

    </main>
  );
}
