import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './design-marshalls-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import EmailAssetsGrid from '../page-components/EmailAssetsGrid';
import WebsiteAssetsGrid from '../page-components/WebsiteAssetsGrid';
import InstagramPosts from '../page-components/InstagramPosts';
import BeforeAfterComparison from '../page-components/BeforeAfterComparison';
import { usePageMode } from '../../hooks/usePageMode';
import ImageGridLightbox from '../page-components/ImageGridLightbox';
import { bilingualSignage, inStoreSignage, oohSignage, springGrandOpening } from '../../data/marshallsGalleries';
import CaseStudyHero from '../page-components/CaseStudyHero';
import { useSingleImageLightbox } from '../../hooks/useLightbox';

const ASSET_BASE = '/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop_casestudy';

const headerDirections = [
  {
    key: 'seasonal',
    label: 'Opt 1 — Seasonal photography with hyperlinks',
    still: `${ASSET_BASE}/header-seasonal-still.jpg`,
    anim: `${ASSET_BASE}/header-seasonal-anim.gif`,
  },
  {
    key: 'evergreen',
    label: 'Opt 1b & 4a — Evergreen photography with CTAs',
    still: `${ASSET_BASE}/header-evergreen-still.jpg`,
    anim: `${ASSET_BASE}/header-evergreen-anim.gif`,
  },
  {
    key: 'textonly',
    label: 'Opt 5 — Text-only header',
    still: `${ASSET_BASE}/header-textonly-still.jpg`,
    anim: `${ASSET_BASE}/header-textonly-anim.gif`,
  },
  {
    key: 'productimagery',
    label: 'Opt 7 — Scrolling header with product imagery',
    still: `${ASSET_BASE}/header-productimagery-still.jpg`,
    anim: `${ASSET_BASE}/header-productimagery-anim.gif`,
  },
];

const landingDirections = [
  {
    key: 'bespoke',
    label: 'Bespoke layouts',
    still: `${ASSET_BASE}/landing-bespoke-still.jpg`,
    anim: `${ASSET_BASE}/landing-bespoke-anim.gif`,
  },
  {
    key: 'largeimg',
    label: 'Large imagery',
    still: `${ASSET_BASE}/landing-largeimg-still.jpg`,
    anim: `${ASSET_BASE}/landing-largeimg-anim.gif`,
  },
  {
    key: 'textonly-horizontal',
    label: 'Text-only, horizontal',
    still: `${ASSET_BASE}/landing-textonly-horizontal-still.jpg`,
    anim: `${ASSET_BASE}/landing-textonly-horizontal-anim.gif`,
  },
  {
    key: 'textonly-vertical',
    label: 'Text-only, vertical',
    still: `${ASSET_BASE}/landing-textonly-vertical-still.jpg`,
    anim: `${ASSET_BASE}/landing-textonly-vertical-anim.gif`,
  },
];

export default function DesignMarshallsCasestudy() {
  usePageMode({ initial: true });
  const { setDarkMode } = useDarkMode();

  // Navbar starts dark (over the hero), turns light over the cream content,
  // then flips back to dark when the dark "Other work" panel scrolls in.
  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.trendshop-content');
      const otherwork = document.querySelector('.trendshop-otherwork');
      if (!content) return;
      const contentInView = content.getBoundingClientRect().top <= 0;
      const otherworkInView = otherwork
        ? otherwork.getBoundingClientRect().top <= 0
        : false;
      setDarkMode(!contentInView || otherworkInView);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDarkMode]);

  const lightbox = useSingleImageLightbox();

  return (
    <main className="design-container trendshop-casestudy">
      <CaseStudyHero
        variant="trendshop"
        backgroundMode="css"
        backgroundImage={`${ASSET_BASE}/hero-bespoke-pattern.jpg`}
        title="Designing the Trend Shop for Marshalls.com"
        meta={[
          { label: 'Role', value: 'Graphic Designer, TJX' },
          { label: 'Timeline', value: 'April–June 2025' }
        ]}
      />

      <div className="trendshop-content">

        {/* The Problem */}
        <section className="trendshop-section">
          <h2>The Problem</h2>
          <div className="trendshop-twocol">
            <div className="trendshop-prose">
              <p>
                Marshalls.com had no way for customers to discover cross-category trends.
                The kinds of seasonal moments that drive simultaneous sales across Women's,
                Home, and Shoes (Bows, Linen, Golf and Tennis, holiday colorways) had no
                single home on the site. Customers searching for "bows" hit a women's
                accessories page and never saw the home decor or shoes that fit the same
                trend.
              </p>
              <p>
                This wasn't a hypothetical gap. The MMX team's audit of competitors found
                that five out of five direct competitors (Nordstrom Rack, J.Crew Factory,
                Bloomingdale's, Shopbop, and Marshalls' own sibling brand T.J.Maxx) ran
                some version of a "Now Trending" or "Trend Shop" in main nav, with most
                also running it as a homepage recommendation slot. Marshalls didn't, on a
                site that pulls roughly 7.8 million monthly visits and ranks #55 in US
                Fashion and Apparel.
              </p>
            </div>
            <figure
              className="trendshop-figure"
              {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/brief-competitive-matrix.png`), 'Competitive matrix', 'Competitive audit: 5 of 5 direct competitors ran a Trend Shop in main nav.')}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/brief-competitive-matrix.png`)}
                alt="Competitive matrix from Trend Shop proposal"
              />
              <figcaption>Competitive audit from the proposal brief.</figcaption>
            </figure>
          </div>
        </section>

        {/* The Brief */}
        <section className="trendshop-section">
          <h2>The Brief</h2>
          <div className="trendshop-twocol trendshop-twocol--reverse">
            <figure
              className="trendshop-figure"
              {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/brief-goals-summary.png`), 'Brief: goals, location, maintenance', 'Project goals, placement, and maintenance cadence.')}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/brief-goals-summary.png`)}
                alt="Goal, location, and maintenance summary from Trend Shop brief"
              />
              <figcaption>Goal, placement, and maintenance summary.</figcaption>
            </figure>
            <div className="trendshop-prose">
              <p>
                Design a shop that pulls from search trends, planning data, and seasonal
                "big rocks" — that lives in the last position of the top nav, refreshes
                monthly, and feels like Marshalls (playful, value-forward, on-trend
                without being precious).
              </p>
              <p>
                I was one of the early designers on the project, working with the
                creative director, brand marketing, and the MMX product team. My job was
                to define the visual system and the merchandising patterns the page
                would inherit going forward.
              </p>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="trendshop-section">
          <h2>Approach</h2>
          <div className="trendshop-prose trendshop-prose--full">
            <p>
              I treated the page as two design problems: the category header that
              introduces the shop, and the landing page that holds the merchandised
              content underneath. Across both, I explored options along two axes —
              imagery-led versus typography-led, and static versus animated.
            </p>
            <p>
              The harder constraint was variability. The merchandising team couldn't
              promise the same number of trends every month, and trend names ranged from
              one word ("Bows") to three ("Baby Blue Accessories"). Every direction had
              to hold up across that range, with photography limited to existing seasonal
              shoots and copy kept to a minimum so the trend names did the merchandising
              work themselves.
            </p>
            <p>
              I built seven header directions and five landing-page directions, all
              stress-tested against the same placeholder trend set so the team could
              compare them apples to apples.
            </p>
          </div>

          {/* Header exploration */}
          <h3>Header exploration</h3>
          <div className="trendshop-explore-grid">
            {headerDirections.map((d) => (
              <div key={d.key} className="trendshop-explore-card">
                <div
                  className="trendshop-explore-tile"
                  {...lightbox.trigger(d.anim, d.label, d.label)}
                >
                  <img src={getAssetPath(d.anim)} alt={d.label} />
                </div>
                <p className="trendshop-explore-label">{d.label}</p>
              </div>
            ))}
          </div>

          {/* Landing exploration */}
          <h3>Landing page exploration</h3>
          <div className="trendshop-explore-grid">
            {landingDirections.map((d) => (
              <div key={d.key} className="trendshop-explore-card">
                <div
                  className="trendshop-explore-tile"
                  {...lightbox.trigger(d.anim, d.label, d.label)}
                >
                  <img src={getAssetPath(d.anim)} alt={d.label} />
                </div>
                <p className="trendshop-explore-label">{d.label}</p>
              </div>
            ))}
          </div>

          {/* Wordmark */}
          <h3>Wordmark</h3>
          <div className="trendshop-prose trendshop-prose--full">
            <p>
              I also developed a wordmark, since the shop needed a name that could
              stand on its own without a logo system behind it.
            </p>
          </div>
          <div className="trendshop-wordmark-grid">
            <div
              className="trendshop-wordmark-tile"
              {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/wordmark-horizontal.gif`), 'Wordmark horizontal animation', 'Horizontal jump animation')}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/wordmark-horizontal.gif`)}
                alt="Wordmark horizontal animation"
              />
              <p>Horizontal</p>
            </div>
            <div
              className="trendshop-wordmark-tile"
              {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/wordmark-vertical.gif`), 'Wordmark vertical animation', 'Vertical jump animation')}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/wordmark-vertical.gif`)}
                alt="Wordmark vertical animation"
              />
              <p>Vertical</p>
            </div>
            <div
              className="trendshop-wordmark-tile"
              {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/wordmark-logobox.png`), 'Logo box hover scale', 'Logo box / hover scale')}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/wordmark-logobox.png`)}
                alt="Logo box / hover scale"
              />
              <p>Logo box</p>
            </div>
          </div>
        </section>

        {/* Trade-offs */}
        <section className="trendshop-section">
          <div className="trendshop-tradeoffs-grid">
            <div className="trendshop-tradeoffs-left">
              <h2>Trade-offs</h2>
              <div className="trendshop-prose">
                <p>
                  The hardest part of this project wasn't visual. It was that two
                  stakeholder groups wanted different things from the same page. Brand
                  marketing wanted a Trend Shop that looked like a destination with rich
                  imagery, distinct personality. They wanted something that could carry a
                  marketing moment for Marshalls.com users. The creative and copy teams,
                  who would be updating the page every month, wanted the opposite: less
                  imagery per trend, less copy per trend, less production work to refresh,
                  with the trend names themselves doing as much of the merchandising as
                  possible.
                </p>
                <p>
                  Both groups were right about their own constraints. A page that looked
                  beautiful but took two weeks to update wouldn't survive a trend's
                  lifecycle. A page that updated in an afternoon but read as generic
                  wouldn't earn its slot in the top nav. The directions that made it
                  through round one were the ones that balanced the creative/copy and
                  brand team's needs: typography and shape language doing the personality
                  work, photography limited to a single hero shot the merchandising team
                  could swap seasonally without rebuilding the layout, copy held to trend
                  names and a one-line subhead. That meant the imagery-heavy directions
                  and the subcopy-heavy directions came off the table early, even when
                  they were the strongest visually.
                </p>
              </div>
            </div>

            <div className="trendshop-callout">
              <p className="trendshop-callout-eyebrow">Feedback from review</p>
              <ul className="trendshop-callout-list">
                <li><strong>For all:</strong> show what options would look like with less than 6 categories.</li>
                <li><strong>Opt 1 — seasonal photography with hyperlinks:</strong> try animation where the petals turn to squares on hover; show that photography is seasonal (flash gifs).</li>
                <li><strong>Opt 1b &amp; 4a — evergreen photography with CTAs:</strong> show options with less than 6 categories.</li>
                <li><strong>Opt 5 — text-only header:</strong> no hover animation, enough shapes going on; explore options with text-only hierarchy.</li>
                <li><strong>Opt 7 — scrolling header with product imagery:</strong> animate scrolling header.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Where it went */}
        <section className="trendshop-section">
          <h2>Where it went</h2>
          <div className="trendshop-prose trendshop-prose--full">
            <p>
              My co-op ended after the exploration phase. I handed off seven header
              directions, five landing-page directions, and the wordmark system, and the
              team carried the project forward without me. The version that eventually
              launched took a different route from anything I'd developed: photography-led
              tiles, serif italic headlines, pill-shaped CTAs. The shape language, the
              typography-first approach, the wordmark, the petal-to-square hover seem to
              have not made it through.
            </p>
            <p>
              That's the part of agency and in-house work I didn't fully understand going
              in. You can do the work, hand it over, and watch it go somewhere else, and
              that's just the shape of the job sometimes. What I got out of it isn't on
              the live page. It's everything that happened before the handoff: the
              framing of the problem, the stress-testing across constraints I'd never had
              to design against before, the back-and-forth with brand marketing and the
              MMX team, building a wordmark from scratch. That's the design problem I
              most enjoyed working at, and I'm happy with the options I delivered.
            </p>
          </div>
          <div
            className="trendshop-shipped-tile trendshop-shipped-tile--single"
            {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/where-it-went-live.png`), 'The Trending Shop, live on Marshalls.com', 'The Trending Shop, live on Marshalls.com')}
          >
            <img
              src={getAssetPath(`${ASSET_BASE}/where-it-went-live.png`)}
              alt="The Trending Shop, live on Marshalls.com"
            />
          </div>
        </section>

        {/* Reflection */}
        <section className="trendshop-section">
          <h2>Reflection</h2>
          <div className="trendshop-prose trendshop-prose--full">
            <p>
              That being said, if I were doing this again, the thing I'd change is
              upstream of the visual exploration. I built seven header directions and
              five landing-page directions stress-tested against a placeholder trend
              set, which is a lot of pixels to push without much grounding in how
              shoppers actually scan a page like this. The directions were evaluated on
              taste and on the constraints I could see (variable trend counts, minimal
              copy, existing photography), but not on anything closer to user behavior.
            </p>
            <p>
              On a project where research was scoped in, I'd have pushed for interviews
              or quick usability tests before the second round of exploration. Even five
              conversations with people who shop Marshalls online would have told me
              whether shoppers expected to see product imagery in the tiles, whether the
              wordmark was doing anything for recognition, whether "Trending Now" as a
              label even read the way we assumed it did. That research wouldn't have
              guaranteed my directions survived to launch but it would have given the
              motive behind my design decisions a sharper argument than "this is the one
              that holds up across the constraints."
            </p>
            <p>
              The other thing I'd do differently is get closer to the merchandisers
              earlier. The brief described the shopper. It didn't describe the person
              updating the page every month, and that person's constraints turned out to
              matter as much as anything in the brief. Talking to them in week one
              instead of inferring their needs from the merchandising team's input would
              have changed how I scoped the exploration.
            </p>
          </div>
        </section>

        {/* Other Work */}
        <section className="trendshop-section trendshop-otherwork">
          <h2>Other work from the co-op</h2>
          <p className="trendshop-otherwork-intro">
            Alongside the Trend Shop, I worked across the Retail, Ecommerce, and Social
            teams on the projects below. Click any thumbnail to see the full set of
            options that led to the approved direction.
          </p>

          {/* Ecomm & Retail */}
          <h3>Store design mockups</h3>
          <h4>
            Mockups for store design updates in different locations across the country —
            Downtown Crossing, MA and Washington Heights, NY.
          </h4>
          <BeforeAfterComparison />

          <h3>Spring 2025 grand opening signage</h3>
          <h4>
            Signage for relocating, relocated, opening-soon, and newly-opened stores —
            English and Spanish.
          </h4>
          <ImageGridLightbox {...springGrandOpening} />

          <h3>Out-of-home signage</h3>
          <h4>
            Pre- and post-move bus shelters and billboards for Spring 2025 grand
            openings.
          </h4>
          <ImageGridLightbox {...oohSignage} />

          <h3>In-store signage</h3>
          <h4>
            Loss prevention beauty violator and a TJX Rewards pin pad sign — design and
            in-store photography.
          </h4>
          <ImageGridLightbox {...inStoreSignage} />

          <h3>Bilingual signage</h3>
          <h4>
            Closing, store-closed, remodel, and remodel-stanchion signage in English and
            Spanish.
          </h4>
          <ImageGridLightbox {...bilingualSignage} />

          <h3>Email assets</h3>
          <h4>
            Marketing emails advertising different products — new arrivals, early
            access, dresses, denim, food, holiday moments, and more.
          </h4>
          <EmailAssetsGrid />

          <h3>Website assets</h3>
          <h4>
            Summerween-themed assets for the Marshalls.com home page, top nav, and
            order-status experience.
          </h4>
          <WebsiteAssetsGrid />

          <h3>Social content</h3>
          <h4>
            Organic posts and reels for the Marshalls Instagram, including in-feed
            shorts styling and a Bachelorette gift bundle reel.
          </h4>
          <InstagramPosts />
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
