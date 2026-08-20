import React from 'react';
import './design-style.css';
import './home-style.css';
import FeaturedCaseStudyCard from '../page-components/FeaturedCaseStudyCard';
import { marshallsCaseStudy } from '../../data/caseStudies';
import { usePageMode } from '../../hooks/usePageMode';
import CollectionCard from '../page-components/CollectionCard';
import { designCollections } from '../../data/collections';
import PageHero from '../page-components/PageHero';

export default function Design() {
  usePageMode({ initial: true });
  

  return (
    <main className="design-container">
      <PageHero
        variant="design"
        backgroundImage="/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/header-1.jpg"
        title="Designer"
        intro={
          <>
            Because design is in every aspect of our lives, I get to explore
            various fields and combine research and creativity in order to
            craft solutions that engage, inspire, and address complex challenges.
            <br></br><br></br>
            I've explored the intersection of design and innovation, spanning UI/UX,
            graphic design, and corporate branding, and I'm always eager to learn more!
          </>
        }
      />

      <section className="home-featured design-featured">
        <div className="home-featured-header">
          <h2>Case Studies</h2>
        </div>
        <FeaturedCaseStudyCard {...marshallsCaseStudy} />
      </section>

      <div className="design-collections">
        <h2>Collections</h2>

        {designCollections.map(collection => (
          <CollectionCard key={collection.to} variant="design" {...collection} />
        ))}
      </div>
    </main>
  );
} 