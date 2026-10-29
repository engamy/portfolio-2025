import React, { useMemo } from 'react';
import '../mainpages/art-style.css';
import MasonryGrid from '../page-components/MasonryGrid';
import { usePageMode } from '../../hooks/usePageMode';
import { uncategorizedArt } from '../../data/artAssorted';
import { shuffle } from '../../utils/shuffle';

export default function ArtVisualExplorations() {
  // No hero to scroll past, so the page holds one nav mode throughout.
  usePageMode({ initial: true });

  // Shuffled once per visit rather than on every render, so the order holds
  // steady while the lightbox steps through it.
  const images = useMemo(() => shuffle(uncategorizedArt), []);

  return (
    <main className="art-container">
      <div className="art-assorted art-assorted--dark">
        <div className="art-page-head">
          <h1>Visual Explorations</h1>
        </div>

        <div className="art-assorted-container">
          <MasonryGrid images={images} />
        </div>
      </div>
    </main>
  );
}
