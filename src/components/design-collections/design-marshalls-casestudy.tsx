import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './design-marshalls-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import EmailAssetsGrid from '../page-components/EmailAssetsGrid';
import WebsiteAssetsGrid from '../page-components/WebsiteAssetsGrid';
import InstagramPosts from '../page-components/InstagramPosts';
import { usePageMode } from '../../hooks/usePageMode';
import CaseStudyHero from '../page-components/CaseStudyHero';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { Icon } from '../page-components/IconSprite';

const MARSHALLS = '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS';
const TREND = `${MARSHALLS}/02_ECOMM/trending_shop_casestudy`;
const RETAIL = `${MARSHALLS}/01_RETAIL`;

/** A bold lead-in point: icon, term, description. */
interface Point {
  icon: string;
  term: string;
  text: string;
}

const briefPoints: Point[] = [
  {
    icon: 'i-pen',
    term: 'Editorial Feel vs. Creative Team Workload:',
    text: 'The shop had to feel editorial, fresh, and on-trend, while adding as little work as possible for the creative team: fewer images to source overall, and less imagery to choose for each trend category.',
  },
  {
    icon: 'i-shield',
    term: 'Rigid Brand Guardrails:',
    text: 'Strict corporate rules around logo placement, typographic tracking, and promotional badges left very little wiggle room for unconstrained visual experiments.',
  },
  {
    icon: 'i-devices',
    term: 'Multi-Viewport Adaptation:',
    text: 'The layout had to hold its narrative momentum whether someone was looking at it on an ultra-wide desktop monitor or a cramped mobile screen.',
  },
];

const constraintPoints: Point[] = [
  {
    icon: 'i-columns',
    term: 'Grid Architecture:',
    text: 'Strict adherence to a modular 12-column grid system with standardized gutters (24px desktop, 16px tablet, 12px mobile) to keep the layout rhythm predictable.',
  },
  {
    icon: 'i-type',
    term: 'Type Scale & Hierarchy:',
    text: "Using corporate-approved sans-serif families with locked leading ratios so the layout wouldn't break when dynamic text was plugged in.",
  },
  {
    icon: 'i-balance',
    term: 'Visual Weight Distribution:',
    text: 'Mandatory whitespace ratios to make sure promotional badges never accidentally overpowered the product photography or lifestyle editorial images.',
  },
];

const emailPoints: Point[] = [
  {
    icon: 'i-masthead',
    term: 'Header Modules:',
    text: 'Flexible mastheads that support dynamic promo banners without messing up the brand lockups.',
  },
  {
    icon: 'i-card',
    term: 'Body Cards:',
    text: 'Scalable product and editorial content blocks using standardized padding rules and consistent image-to-text aspect ratios.',
  },
  {
    icon: 'i-button',
    term: 'CTA Blocks:',
    text: 'High-contrast button components with strict bounding boxes built to handle copy changes easily.',
  },
];

const webPoints: Point[] = [
  {
    icon: 'i-monitor',
    term: 'Web Signage:',
    text: 'Designed responsive banner variants for marshalls.com (including things like Summerween-themed assets) to make sure the focal points in lifestyle photos stayed protected across desktop, tablet, and mobile screens.',
  },
  {
    icon: 'i-play',
    term: 'Social Ecosystem:',
    text: 'Translated our web campaigns into organic social assets and Instagram reels, incorporating in-feed styling and promotional bundles.',
  },
];

const spatialPoints: Point[] = [
  {
    icon: 'i-eye',
    term: 'Visual Readability & Functionality:',
    text: 'Designing in-store signs, loss-prevention assets, and pin-pad promotional screens meant paying close attention to contrast, sizing, and visual hierarchy so shoppers could easily read them while walking through a busy store.',
  },
  {
    icon: 'i-store',
    term: 'Store Design Mockups & Grand Openings:',
    text: 'Put together environmental mockups and bilingual Spring grand opening assets (like "Opening Soon," "We\'ve Moved," and stanchion signage) for locations like Manhasset and Washington Heights in New York.',
  },
];

const iterations = [
  {
    title: 'Exploration A (Full-Screen Evergreen Imagery):',
    structure: 'A full-screen hero built on evergreen photography.',
    tradeoff: "Evergreen imagery rarely needed replacing, which kept the creative team's workload low. But a full-screen graphic left no products to browse beneath it, and full-bleed imagery sat outside Marshalls' usual brand patterns.",
    image: 'landing-largeimg-anim.gif',
    alt: 'Exploration A: full-screen evergreen imagery',
  },
  {
    title: 'Exploration B (Seasonal Image Header):',
    structure: 'An image-led header with fresh seasonal photography, sitting above the product listings.',
    tradeoff: "Seasonal imagery kept the page feeling current, and the products below the header let shoppers scroll and browse, close to the treasure-hunt experience TJX is known for. The imagery had to be refreshed every season, though, and the layout couldn't adapt to fewer than six trend categories.",
    image: 'header-seasonal-anim.gif',
    alt: 'Exploration B: seasonal image header',
  },
  {
    title: 'Exploration C (Pattern Background):',
    structure: 'A full-screen option set on an evergreen Marshalls pattern in place of photography.',
    tradeoff: 'The pattern never needed updating, which made this the least work for the creative team. It was also the flattest of the three, out of step with the image-heavy branding across the rest of the site and the least visually engaging for shoppers.',
    image: 'landing-bespoke-anim.gif',
    alt: 'Exploration C: pattern background',
  },
];

// Each sign as photographed in store, paired with its design file. The design
// files were uploaded earlier under numbered names.
const grandOpenings = [
  { label: 'Opening Soon', photo: 'openingsoon.jpg', graphic: '3.jpg' },
  { label: "We're Moving", photo: 'weremoving.jpg', graphic: '1.jpg' },
  { label: "We've Moved", photo: 'wemoved.jpg', graphic: '2.jpg' },
  { label: "We're Open", photo: 'wereopen.jpg', graphic: '4.png' },
];

const inStoreSignage = [
  { label: 'Pin-pad promotional screen', photo: 'pinpad_thumbnail.jpg', graphic: 'pinpad_lightbox.jpg' },
  { label: 'Loss-prevention violator', photo: 'violator_thumbnail.jpg', graphic: 'violator_lightbox.jpg' },
];

const storeMockups = [
  ['before_manhasset-1.jpeg', 'after_manhasset-1.jpg'],
  ['before_manhasset-2.jpeg', 'after_manhasset-2.jpg'],
  ['before_washingtonHeights-1.jpg', 'after_washingtonHeights-1.jpg'],
  ['before_washingtonHeights-2.png', 'after_washingtonHeights-2.jpg'],
  ['before_washingtonHeights-3.png', 'after_washingtonHeights-3.jpg'],
];

// The two layouts used for bold lead-in points, alternated down the page so
// consecutive lists don't all read the same.
const PointRows: React.FC<{ points: Point[] }> = ({ points }) => (
  <dl className="ms-terms">
    {points.map(p => (
      <div key={p.term}>
        <dt>
          <Icon id={p.icon} className="ms-point-icon" />
          {p.term}
        </dt>
        <dd>{p.text}</dd>
      </div>
    ))}
  </dl>
);

const PointCards: React.FC<{ points: Point[] }> = ({ points }) => (
  <div className={`ms-cards ms-cards--points ms-cards--${points.length}`}>
    {points.map(p => (
      <div key={p.term} className="ms-card">
        <h3>
          <Icon id={p.icon} className="ms-point-icon" />
          {p.term.replace(/:$/, '')}
        </h3>
        <p>{p.text}</p>
      </div>
    ))}
  </div>
);

export default function DesignMarshallsCasestudy() {
  usePageMode({ initial: true });
  const { setDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.ms-content');
      if (!content) return;
      const contentInView = content.getBoundingClientRect().top <= 0;
      setDarkMode(!contentInView);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDarkMode]);

  const lightbox = useSingleImageLightbox();

  // Clickable figure that opens its own image in the lightbox.
  const figure = (path: string, alt: string, className = '') => (
    <figure
      className={`ms-figure ${className}`.trim()}
      {...lightbox.trigger(getAssetPath(path), alt)}
    >
      <img src={getAssetPath(path)} alt={alt} />
    </figure>
  );

  return (
    <main className="design-container ms-casestudy">
      <CaseStudyHero
        variant="ms"
        backgroundMode="image"
        backgroundImage={`${RETAIL}/storedesign_mockups/after_washingtonHeights-2.jpg`}
        title="Marshalls: Designing Exploratory Web Layouts & Brand Systems at Scale"
      >
        <div className="ms-snapshot">
          <h2 className="ms-snapshot-title">Quick Summary</h2>
          <div className="ms-cards ms-cards--hero">
            <div className="ms-card">
              <h3><Icon id="i-person" className="ms-card-icon" />Role</h3>
              <p>Graphic Design Co-op (Marshalls / The TJX Companies)</p>
            </div>
            <div className="ms-card">
              <h3><Icon id="i-modules" className="ms-card-icon" />Scope</h3>
              <p>
                E-commerce layout optimization, modular web and email component
                architecture, and physical-to-digital retail campaign alignment.
              </p>
            </div>
            <div className="ms-card">
              <h3><Icon id="i-pen" className="ms-card-icon" />Tools</h3>
              <p>
                Adobe Photoshop, Adobe Illustrator, After Effects, Marshalls brand
                design guidelines.
              </p>
            </div>
            <div className="ms-card">
              <h3><Icon id="i-target" className="ms-card-icon" />Core Outcome</h3>
              <p>
                Created modular digital layout frameworks that bridged rigid corporate
                brand guardrails with exploratory, high-intent e-commerce user
                discovery.
              </p>
            </div>
          </div>
        </div>
      </CaseStudyHero>

      <div className="ms-content">

        {/* 1. Introduction */}
        <section className="ms-section">
          <h2>1. Introduction</h2>
          <div className="ms-split ms-split--brands">
            <div className="ms-prose">
              <p>
                Working within a massive enterprise retail environment presented a
                design tension: maintaining absolute consistency across millions of
                consumer touchpoints while somehow still making the browsing
                experience feel fresh, exploratory, and high-intent. During my graphic
                design co-op at Marshalls, my focus was on building and refining the
                digital layout systems that govern how shoppers encounter campaign
                content online and in-store.
              </p>
              <p>
                Operating within strict Marshalls brand design guidelines, my work
                looked at how modular grid structures, clear typographic hierarchy,
                and responsive scaling can take high-volume retail assets and turn
                them into a cohesive digital system.
              </p>
            </div>
            {/* File and class names avoid "logo", which some content blockers
                hide on sight. */}
            <div className="ms-brands">
              <img src={getAssetPath(`${MARSHALLS}/brand-tjx.png`)} alt="The TJX Companies" />
              <img src={getAssetPath(`${MARSHALLS}/brand-marshalls.png`)} alt="Marshalls" />
            </div>
          </div>
        </section>

        {/* 2. Featured Story */}
        <section className="ms-section">
          <h2>2. Featured Story: The Trend Shop Layout Exploration</h2>

          <div className="ms-subsection">
            <h3>The Brief and Problem</h3>
            <div className="ms-prose">
              <p>
                The <strong>Trend Shop</strong> digital feature was introduced on
                marshalls.com as a curated discovery experience, but the core design
                problem meant balancing competing business and user requirements:
              </p>
            </div>
            <PointRows points={briefPoints} />
            <div className="ms-grid ms-grid--two">
              {figure(`${TREND}/brief-goals-summary.png`, 'Trend Shop brief: goals summary')}
              {figure(`${TREND}/brief-competitive-matrix.png`, 'Trend Shop brief: competitive matrix')}
            </div>
          </div>

          <div className="ms-subsection">
            <h3>Design Constraints &amp; Guardrails</h3>
            <PointCards points={constraintPoints} />
          </div>

          <div className="ms-subsection">
            <h3>Wireframe Explorations</h3>
            <div className="ms-prose">
              <p>
                To figure out what would actually scale, I put together and tested
                three distinct layout hypotheses using Photoshop layout comps:
              </p>
            </div>

            {/* Each iteration spans three rows of the parent grid (subgrid), so
                the headings, copy and images line up across all three. */}
            <div className="ms-iterations">
              {iterations.map(it => (
                <div key={it.title} className="ms-iteration">
                  <h4>{it.title}</h4>
                  <div className="ms-prose">
                    <p><strong>Structure:</strong> {it.structure}</p>
                    <p><strong>Tradeoff:</strong> {it.tradeoff}</p>
                  </div>
                  {figure(`${TREND}/${it.image}`, it.alt)}
                </div>
              ))}
            </div>
          </div>

          <div className="ms-subsection">
            <div className="ms-inline-head">
              <h3>Proposed Final UI Concept</h3>
              <div className="ms-prose">
                <p>
                  The final setup paired a modular header with category exploration
                  pills that pull high-intent traffic straight into the best-performing
                  trend categories. Since it works as a header, product listings sit
                  directly below it, so shoppers can keep scrolling into their own
                  treasure hunt.
                </p>
              </div>
            </div>
            {figure(`${TREND}/hero-live-1.png`, 'Final Trend Shop header', 'ms-figure--full')}
          </div>

          <div className="ms-subsection">
            <div className="ms-inline-head">
              <h3>The Live Site</h3>
              <div className="ms-prose">
                <p>
                  My co-op ended after its preliminary exploration phase, and although
                  the version of the Trend Shop that launched on marshalls.com took a
                  different direction from the options I designed, I learned a lot
                  about designing solutions for challenges with such specific
                  constraints.
                </p>
              </div>
            </div>
            {figure(`${TREND}/where-it-went-live.png`, 'The Trend Shop live on marshalls.com', 'ms-figure--full')}
          </div>
        </section>

        {/* 3. Cross-Channel System */}
        <section className="ms-section">
          <h2>3. Cross-Channel System (E-Commerce &amp; Social Graphics)</h2>
          <div className="ms-prose">
            <p>
              Scaling a retail brand means making sure things translate smoothly from
              one medium to the next. I designed modular component systems that kept
              visual consistency intact across email marketing, web banners, and
              social channels.
            </p>
          </div>

          <div className="ms-subsection">
            <h3>Modular Email Architecture</h3>
            <div className="ms-prose">
              <p>
                To speed up marketing output without sacrificing type and grid
                integrity, I built a reusable modular email system made up of:
              </p>
            </div>
            <PointRows points={emailPoints} />
            {/* Each campaign's approved email above its content block; clicking
                one opens the options that led to it. */}
            <div className="ms-embed">
              <EmailAssetsGrid />
            </div>
          </div>

          <div className="ms-subsection">
            <h3>Responsive Web Banners &amp; Social Extensions</h3>
            {webPoints.map((p, i) => (
              <div key={p.term} className="ms-minor">
                <div className="ms-inline-head">
                  <h4>{p.term.replace(/:$/, '')}</h4>
                  <div className="ms-prose">
                    <p>{p.text}</p>
                  </div>
                </div>
                <div className="ms-embed">
                  {i === 0 ? <WebsiteAssetsGrid /> : <InstagramPosts />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Spatial Experience */}
        <section className="ms-section">
          <h2>4. Spatial Experience (In-Store &amp; Retail Signage)</h2>
          <div className="ms-prose">
            <p>
              Good digital design systems often inform physical spaces, and vice
              versa. Part of my co-op involved translating digital campaign frameworks
              into physical retail environments, store signage, and out-of-home
              installations.
            </p>
          </div>

          <div className="ms-subsection">
            <h3>Translating Brand Identity to Physical Environments</h3>
            <PointCards points={spatialPoints} />
          </div>

          <div className="ms-subsection">
            <h4>Grand Openings &amp; Digital Asset Mockups</h4>
            <div className="ms-grid ms-grid--two ms-pairs">
              {grandOpenings.map(s => (
                <div key={s.label} className="ms-pair ms-pair--poster">
                  {figure(`${RETAIL}/springGO/${s.photo}`, `${s.label} sign in store`)}
                  {figure(`${RETAIL}/springGO/${s.graphic}`, `${s.label} sign design`)}
                </div>
              ))}
            </div>
          </div>

          <div className="ms-subsection">
            <h4>In-Store Displays &amp; Physical Signage</h4>
            <div className="ms-grid ms-grid--two ms-pairs">
              {inStoreSignage.map(s => (
                <div key={s.label}>
                  <div className="ms-pair ms-pair--signage">
                    {figure(`${RETAIL}/signage/${s.photo}`, `${s.label} in store`)}
                    {figure(`${RETAIL}/signage/${s.graphic}`, `${s.label} design`)}
                  </div>
                  <p className="ms-caption">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ms-subsection">
            <h4>In-Store Mockups</h4>
            <div className="ms-mockup-labels" aria-hidden="true">
              <span>Before</span>
              <span>After</span>
            </div>
            {storeMockups.map(([before, after]) => (
              <div key={before} className="ms-grid ms-grid--two ms-mockup-row">
                {figure(`${RETAIL}/storedesign_mockups/${before}`, 'Store design mockup, before')}
                {figure(`${RETAIL}/storedesign_mockups/${after}`, 'Store design mockup, after')}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Key Takeaways & Reflection */}
        <section className="ms-section">
          <h2>5. Key Takeaways &amp; Reflection</h2>
          <div className="ms-prose">
            <p>
              Working inside a massive enterprise retail ecosystem really shifted how
              I think about design systems and digital architecture:
            </p>
          </div>
          <div className="ms-cards ms-cards--3 ms-cards--takeaways">
            <div className="ms-card">
              <h3>Constraints as Creative Catalysts</h3>
              <p>
                Instead of killing creativity, rigid brand guidelines and grid rules
                forced a much more rigorous approach to typography, whitespace, and how
                modular components scale.
              </p>
            </div>
            <div className="ms-card">
              <h3>Systems Thinking over Static Assets</h3>
              <p>
                Making a single banner is straightforward. Building a framework where
                teams can generate consistent, accessible, and high-converting assets
                across both digital and physical spaces takes a lot more structural
                depth.
              </p>
            </div>
            <div className="ms-card">
              <h3>Balancing Elegance and Business Goals</h3>
              <p>
                Effective e-commerce design is really about artfully balancing user joy
                (the fun of discovery) with business velocity (making it as easy as
                possible to buy).
              </p>
            </div>
          </div>
        </section>

      </div>


      <ImageLightbox
        isOpen={lightbox.isOpen}
        currentImage={lightbox.currentImage}
        onClose={lightbox.close}
      />
    </main>
  );
}
