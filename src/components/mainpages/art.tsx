import React from 'react';
import './art-style.css';
import MasonryGrid from '../page-components/MasonryGrid';
import { usePageMode } from '../../hooks/usePageMode';
import CollectionCard from '../page-components/CollectionCard';
import { artCollections } from '../../data/collections';
import { assortedArt } from '../../data/artAssorted';
import PageHero from '../page-components/PageHero';

export default function Art() {
  usePageMode({ initial: true, flipAt: '.art-assorted' });
  


  return (
    <main className="art-container">
      <PageHero
        variant="art"
        backgroundImage="/pictures/portfolio-content_spring2026/04_ART/header.png"
        title="Artist"
        intro={
          <>
            Photoshop, Illustrator, InDesign, After Effects, Krita,
            Wacom Intuos Pro, ink, pencil, alcohol-based markers,
            colored pencils, tape, glue, plastic sheets, paper receipts,
            toilet paper rolls...
            <br></br><br></br>
            ...anything I can use to create.
            <br></br><br></br>
            My approach to art is centered around experimentation,
            using a variety of techniques and mediums to push the
            boundaries of creativity and produce unique, impactful
            pieces. Whether digital or analog, I'm always seeking new
            way to bring my visions to life.
          </>
        }
      />

      <div className="art-featured-collections">
        <h2>Featured Collections</h2>
        {artCollections.map(collection => (
          <CollectionCard key={collection.to} variant="art" {...collection} />
        ))}
      </div>

      <div className="art-assorted">
        <h2>Assorted Works</h2>

        <div className="art-assorted-container">
          <MasonryGrid images={assortedArt} />
        </div>
      </div>

    </main>
  );
} 
