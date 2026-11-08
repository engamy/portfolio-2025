import React, { Suspense, lazy } from 'react';
import CodeGameLayout, { CODE, GameLinks, GameVideo, SummaryItem, GameLink } from './CodeGameLayout';
import ImageLightbox from '../page-components/ImageLightbox';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { getAssetPath } from '../../utils/assetUtils';
import ExternalLink from '../page-components/ExternalLink';

// three.js and the 26 MB model only load on this page.
const SpineVis = lazy(() => import('./djoda/3dvis'));

const SHOTS = `${CODE}/djoda`;

const LINKS: GameLink[] = [{ label: 'GitHub repo', href: 'https://github.com/Scout-NU/djoda' }];

const summary: SummaryItem[] = [
  { icon: 'i-columns', label: 'Timeline', value: 'Spring 2025, Scout (Northeastern’s student-run design studio)' },
  { icon: 'i-code', label: 'Stack', value: 'React, Three.js with React Three Fiber and Drei, CSS' },
  {
    icon: 'i-person',
    label: 'My part',
    value: 'Front-end developer: the landing page’s first half and the 3D spine section’s panel and styling',
  },
  { icon: 'i-target', label: 'Outcome', value: 'A marketing site for Corsey, Djoda’s posture-tracking seat cover' },
];

export default function CodeDjodaCasestudy() {
  const lightbox = useSingleImageLightbox();

  const shot = (file: string, alt: string, caption: string) => (
    <figure className="cg-figure coop-shot" {...lightbox.trigger(getAssetPath(`${SHOTS}/${file}`), alt, caption)}>
      <img src={getAssetPath(`${SHOTS}/${file}`)} alt={alt} width={1000} height={491} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );

  return (
    <CodeGameLayout
      modifier="cg--djoda"
      title="Djoda: Building an Interactive 3D Spine for a Wellness Startup"
      summary={summary}
      links={LINKS}
    >
      <section className="cg-section">
        <h2>Overview</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              Djoda is a wellness technology startup, and Corsey is its first product: a smart seat
              cover that tracks posture. Through <strong>Scout</strong>, Northeastern&rsquo;s
              student-run design studio, a team of four developers built Djoda&rsquo;s site in{' '}
              <strong>React</strong> from the designers&rsquo; Figma files.
            </p>
            <p>
              The site has a landing page, a product and pre-order page, a blog and an about page.
              The centrepiece of the landing page is an <strong>interactive 3D spine</strong> that
              visitors can rotate and click to learn about each region.
            </p>
            <p>
              I built the first half of the landing page (the hero, &ldquo;The Problem&rdquo;
              statistics, Common Spine Issues and the mission and product sections) and the side
              panel and styling of the spine section.
            </p>
          </div>
          <GameVideo file="djoda.mp4" caption="Scrolling through the site" />
        </div>
      </section>

      <section className="cg-section">
        <h2>The 3D Spine</h2>
        <div className="cg-prose">
          <p>
            This is the component from the site&rsquo;s repo, running here unchanged. Click a region
            of the spine to highlight it and read about it, click it again to clear it, and drag or
            scroll to move around the model.
          </p>
        </div>
      </section>

      <div className="dj-bleed" aria-label="Interactive 3D spine from the Djoda site">
        <Suspense fallback={<div className="dj-loading">Loading the 3D spine model&hellip;</div>}>
          <SpineVis />
        </Suspense>
      </div>
      <p className="cg-note dj-credit">
        3D model: &ldquo;
        <ExternalLink href="https://sketchfab.com/3d-models/spine-39ad9be7118d402ca7266fab01b75fed">Spine</ExternalLink>
        &rdquo; by Ruth Lilly Medical Library, IU School of Medicine, licensed under{' '}
        <ExternalLink href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</ExternalLink>.
      </p>

      <section className="cg-section">
        <h2>How the Spine Works</h2>
        <div className="cg-terms">
          <div className="cg-term">
            <h4>Loading and motion</h4>
            <p>
              The model is a glTF file loaded with Drei&rsquo;s <code>useGLTF</code> and rendered in
              a React Three Fiber <code>Canvas</code>. A <code>useFrame</code> hook turns it a little
              every frame, so it rotates slowly on its own, and <code>OrbitControls</code> lets
              visitors drag and zoom.
            </p>
          </div>
          <div className="cg-term">
            <h4>Clicking a region</h4>
            <p>
              Each region of the model shares a material, so a click reads the clicked mesh&rsquo;s
              material name and highlights every mesh with that name in Djoda yellow. Clicking the
              same region again clears it.
            </p>
          </div>
          <div className="cg-term">
            <h4>The side panel</h4>
            <p>
              The material name is also the key into three lookup tables: the region&rsquo;s name,
              a one-line summary and a longer description. With nothing selected, the panel shows
              instructions instead.
            </p>
          </div>
          <div className="cg-term">
            <h4>Styling</h4>
            <p>
              I styled the panel to match the rest of the site: cream cards with an offset block of
              colour behind each one, in Djoda&rsquo;s blue, pink and purple, under a heading with a
              blue highlight bar.
            </p>
          </div>
        </div>
      </section>

      <section className="cg-section">
        <h2>The Landing Page</h2>
        <div className="cg-prose">
          <p>
            I implemented the first half of the landing page, working from mid-fidelity to high
            fidelity. The hero introduces Corsey with More Info and Pre-Order buttons. &ldquo;The
            Problem&rdquo; shows three statistics on back pain and posture. Common Spine Issues is a
            row of scrolling chips. The mission and product sections pair each block of copy with a photo.
          </p>
        </div>
        <div className="dj-shots cg-after">
          {shot('djoda-hero.jpg', 'Djoda landing page hero: Corsey by Djoda over a photo of a chair', 'Hero')}
          {shot('djoda-chips-mission.jpg', 'Common Spine Issues chips above the Our Mission section', 'Common Spine Issues and Our Mission')}
        </div>
      </section>

      <section className="cg-section">
        <h2>Links</h2>
        <GameLinks links={LINKS} />
      </section>

      <ImageLightbox isOpen={lightbox.isOpen} currentImage={lightbox.currentImage} onClose={lightbox.close} />
    </CodeGameLayout>
  );
}
