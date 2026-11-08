import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './design-next-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import { usePageMode } from '../../hooks/usePageMode';
import CaseStudyHero from '../page-components/CaseStudyHero';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { Icon } from '../page-components/IconSprite';

const ASSET_BASE = '/pictures/portfolio-content_spring2026/02_DESIGN/02_NEXT';

export default function DesignNextCasestudy() {
  usePageMode({ initial: true });
  const { setDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.next-content');
      if (!content) return;
      const contentInView = content.getBoundingClientRect().top <= 0;
      setDarkMode(!contentInView);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDarkMode]);

  const lightbox = useSingleImageLightbox();

  return (
    <main className="design-container next-casestudy">
      <CaseStudyHero
        variant="next"
        backgroundMode="image"
        backgroundImage={`${ASSET_BASE}/via_hero.jpg`}
        title="Via Separations: Internal Operations & Warehouse/Inventory Management System"
        note="Via's product is a specialized industrial component under NDA, so the screenshots in this case study use a three-layer cake and its ingredients as a stand-in. The structure on screen is real, with different names on the data."
      >
        <div className="next-snapshot">
          <h2 className="next-snapshot-title">Quick Summary</h2>
          <div className="next-bento-row next-bento-row--outline next-bento-row--two">
            <div className="next-bento-card next-bento-card--wide">
              <h3><Icon id="i-columns" className="next-card-icon" />Timeline</h3>
              <p>Spring 2026 (January to April 2026)</p>
            </div>
            <div className="next-bento-card">
              <h3><Icon id="i-person" className="next-card-icon" />Role</h3>
              <p>Product Designer, Software Engineer, and Systems Consultant</p>
            </div>
            <div className="next-bento-card">
              <h3><Icon id="i-code" className="next-card-icon" />Tools</h3>
              <p>
                TypeScript, React, Material UI (MUI), MUI X Pro, Relational
                Databases.
              </p>
            </div>
            <div className="next-bento-card">
              <h3><Icon id="i-bars" className="next-card-icon" />Impact</h3>
              <p>
                Architected and developed scalable internal UI flows (reservation,
                material planner, and mBOM systems), navigated critical system
                pivots without delaying release schedules, and established a
                modular component workflow in React and Material UI (MUI).
              </p>
            </div>
            <div className="next-bento-card">
              <h3><Icon id="i-target" className="next-card-icon" />Core Outcome</h3>
              <p>
                Translated complex enterprise supply chain workflows into an
                intuitive platform built on top of the existing Harbor v1.0
                warehouse system, moving operations away from manual spreadsheets
                and human memory
              </p>
            </div>
          </div>
        </div>
      </CaseStudyHero>

      <div className="next-content">

        {/* 1. Context & Problem Framing */}
        <section className="next-section">
          <h2>1. Context &amp; Problem Framing</h2>
          <div className="next-prose next-prose--columns">
            <p>
              Working at the intersection of <strong>design, code, and systems
              consulting</strong>, my primary responsibility was translating Via
              Separations’ <strong>complex enterprise supply chain workflows</strong>{' '}
              into an intuitive platform built on top of the existing{' '}
              <strong>Harbor v1.0</strong> warehouse system.
            </p>
            <p>
              While v1.0 tracked inventory, surrounding workflows remained
              scattered: material planning lived in <strong>manual
              spreadsheets</strong>, demand was estimated informally, and contract
              manufacturer data was disconnected. As Via scaled from small
              qualification batches of <strong>dozens of modules</strong> to
              commercial orders of <strong>thousands of modules</strong>, this
              reliance on human memory and spreadsheets became a{' '}
              <strong>bottleneck</strong>. My job was to ensure every UI pattern was
              technically feasible, architecturally sound, and aligned with
              operational realities.
            </p>
            <p>
              As part of a <strong>five-person engineering team</strong>, I owned{' '}
              <strong>end-to-end UX research, wireframing, and interactive
              prototyping</strong> while directly contributing to{' '}
              <strong>frontend implementation in TypeScript and React</strong>.
            </p>
          </div>
        </section>

        {/* 2. Technical & Design Constraints + System Architecture */}
        <section className="next-section">
          <h2>2. Technical &amp; Design Constraints + System Architecture</h2>
          <div className="next-prose">
            <p>
              When building upon an existing codebase, maintaining architectural
              consistency is vital. We leaned on the Material UI (MUI) library to
              maintain design consistency with v1.0.
            </p>
          </div>

          {/* Figure comes first in the DOM so it sits above the paragraph on
              mobile; on desktop it is ordered into the right column. */}
          <div className="next-split next-split--figure-first next-split--stacked">
            <figure
              className="next-figure next-figure--landscape"
              {...lightbox.trigger(
                getAssetPath(`${ASSET_BASE}/via-bom-vs-mbom.png`),
                'The same ten parts as a flat spreadsheet BOM and as a nested mBOM tree view',
                'Flat BOM vs. mBOM tree'
              )}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/via-bom-vs-mbom.png`)}
                alt="The same ten parts as a flat spreadsheet BOM and as a nested mBOM tree view"
              />
            </figure>
            <div className="next-prose">
              <p>
                For example, designing the Manufacturing Bill of Materials (mBOM) tree
                view required collapsible data grids to indicate hierarchical nesting
                levels (from finished modules down to raw chemicals). This is the
                recognized industry-standard approach for visualizing complex
                multi-level product hierarchies, making it essential for user
                comprehension. Recognizing that custom-building a duplicate tree
                structure would introduce tech debt, we successfully advocated for Via
                to adopt the MUI X Pro license to natively support hierarchical data
                grids and row-grouping.
              </p>
            </div>
          </div>

          <div className="next-prose">
            <p>
              Learning relational database structures and state management in the
              context of the existing build was deeply helpful in understanding what
              was technically feasible. For instance, knowing how the database
              handled schema flexibility allowed us to cleanly migrate tables to
              support multi-level mBOM relationships without breaking existing
              inventory records.
            </p>
          </div>
        </section>

        {/* 3. System Evolution: Rethinking Demand and Reservations */}
        <section className="next-section">
          <h2>3. System Evolution: Rethinking Demand and Reservations</h2>

          {/* Each figure follows its prose in the DOM, which is the mobile
              order; --figure-left moves it into the left column on desktop. */}
          <div className="next-split next-split--figure-left next-split--stacked">
            <div className="next-prose">
              <p>
                Through continuous weekly syncs and active listening sessions with
                primary stakeholders, it became clear that tracking needed, reserved,
                and fulfilled quantities separately across disparate sheets created
                cognitive friction.
              </p>
              <p>
                To solve this, I proposed transitioning the reservation system into a
                holistic, quantitative framework tracking Needed, Reserved, and
                Fulfilled.
              </p>
            </div>
            <figure
              className="next-figure next-figure--landscape"
              {...lightbox.trigger(
                getAssetPath(`${ASSET_BASE}/via-resline-lifecycle-v2.png`),
                'Reservation line lifecycle',
                'Reservation line lifecycle'
              )}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/via-resline-lifecycle-v2.png`)}
                alt="Reservation line lifecycle"
              />
            </figure>
          </div>

          {/* Two columns, each a paragraph with its own image directly
              beneath it. They stack on mobile. */}
          <div className="next-pair-grid">
            <div className="next-pair-col">
              <div className="next-prose">
                <p>
                  Rather than displaying dense, text-heavy numbers in data grid rows, I
                  researched industry-standard enterprise tools and introduced a
                  segmented progress bar component. This replaced numerical clutter with
                  an intuitive, color-coded proportional view that allowed supply chain
                  managers to immediately gauge fulfillment health at a glance. After
                  mocking up the concept, I aligned the engineering team and presented
                  the streamlined workflow to the client, where it was adopted to anchor
                  the new reservation experience.
                </p>
              </div>
              <figure
                className="next-figure next-figure--landscape"
                {...lightbox.trigger(
                  getAssetPath(`${ASSET_BASE}/via-resdetails-v2.png`),
                  'Reservation details view',
                  'Reservation details view'
                )}
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-resdetails-v2.png`)}
                  alt="Reservation details view"
                />
              </figure>
            </div>
            <div className="next-pair-col">
              <div className="next-prose">
                <p>
                  To handle complex multi-level requirements across manufacturing
                  stages, we paired this demand visibility with an automated material
                  planning interface that walked the mBOM hierarchy in real time.
                </p>
              </div>
              <figure
                className="next-figure next-figure--landscape"
                {...lightbox.trigger(
                  getAssetPath(`${ASSET_BASE}/via-mrp-v2.png`),
                  'Material planner interface',
                  'Material planner interface'
                )}
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-mrp-v2.png`)}
                  alt="Material planner interface"
                />
              </figure>
            </div>
          </div>

        </section>

        {/* 4. Dual-Perspective Synthesis */}
        <section className="next-section">
          <h2>
            4. How Design Sharpens Engineering (and Vice Versa)
          </h2>

          <div className="next-subsection next-twocol-subsection">
            <div>
              <h3 className="next-subheading">How Code Sharpens UX</h3>
              <div className="next-prose">
                <p>
                  Having a deep working knowledge of state management, API response
                  payloads, and component lifecycles—mastered directly within the
                  context of the live codebase—prevented the design of "impossible"
                  UI states. When designing batch uploads or dynamic data grids,
                  understanding data parsing constraints allowed us to design robust
                  inline error-handling states (such as flagged preview rows and
                  clear validation messaging) that gracefully handled messy data
                  imports from contract manufacturers.
                </p>
              </div>
            </div>
            <div>
              <h3 className="next-subheading">How UX Sharpens Engineering</h3>
              <div className="next-prose">
                <p>
                  Conversely, my grounding in workflow consulting and user empathy
                  ensured that technical architectures prioritized low-friction
                  inputs, scannability, and high-visibility status indicators over
                  unnecessary engineering complexity. By leading visual polish and
                  interface coherence across wireframes, client presentations, and
                  documentation, I ensured the technical output remained tightly
                  coupled with user needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section className="next-section">
          <h2>Reflection</h2>

          <div className="next-subsection next-twocol-subsection">
            <div>
              <h3 className="next-subheading">What we learned</h3>
              <div className="next-prose">
                <p>
                  We started from the assumption that a reservation would only ever
                  claim inventory already in the warehouse. That matched everything we
                  knew at the time, and the system we built on it worked.
                </p>
                <p>
                  The material planner turned up a case we had not accounted for. Once
                  it started producing requirements for parts that did not yet exist,
                  reservations had to track demand for inventory still on its way in,
                  which meant separating Needed from Reserved from Fulfilled.
                </p>
              </div>
            </div>
            <div>
              <h3 className="next-subheading">Knowing when to rebuild</h3>
              <div className="next-prose">
                <p>
                  Rebuilding it was a hard call, and I think it was the correct one.
                  The redesign moved each line to the three quantities, the same model
                  that later made the segmented progress bar readable at a glance.
                  That progress bar only works because of the rework the planner
                  forced on us.
                </p>
                <p>
                  Under time pressure and incomplete information, some of your
                  assumptions are going to be wrong. What I took from this is to build
                  so a wrong assumption can be replaced later, and to watch for the
                  point where working around a mistake starts costing more than fixing
                  it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What I'd Do Next: Harbor v3.0 */}
        <section className="next-section">
          <h2>What I'd Do Next: Harbor v3.0</h2>
          <div className="next-prose">
            <p>
              We would continue to build around the workflow Via already has. Two
              features could extend Harbor to better support Via's processes:
            </p>
          </div>

          <div className="next-bento-row next-bento-row--outline next-bento-row--two">
            <div className="next-bento-card">
              <h3>Automatic allocation</h3>
              <p>
                Assigning newly arrived stock to the reservations waiting on it is still
                manual, and automating it would close the last loop between planning and
                fulfillment.
              </p>
            </div>
            <div className="next-bento-card">
              <h3>Timeline view</h3>
              <p>
                The order-by dates laid out across parts and suppliers at once, so a
                whole production run reads at a glance instead of one part at a time.
              </p>
            </div>
          </div>

          <div className="next-prose">
            <p>
              If I kept working on Harbor, I'd work the same way we did this time:
              keep asking Via how they actually operate, and build from what they tell
              us.
            </p>
          </div>
        </section>

        {/* Team photo */}
        <section className="next-section">
          <figure
            className="next-figure next-figure--team"
            {...lightbox.trigger(
              getAssetPath(`${ASSET_BASE}/via-teamphoto-w2400.jpg`),
              'The NExT Consulting team at Via Separations headquarters',
              'Team photo at Via Separations headquarters'
            )}
          >
            <img
              src={getAssetPath(`${ASSET_BASE}/via-teamphoto-w2400.jpg`)}
              alt="The NExT Consulting team at Via Separations headquarters"
              width={2400}
              height={1637}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Team photo at Via Separations headquarters</figcaption>
          </figure>
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
