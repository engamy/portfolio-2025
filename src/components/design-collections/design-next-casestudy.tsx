import React, { useEffect, useRef, useState } from 'react';
import '../mainpages/design-style.css';
import './design-next-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import { usePageMode } from '../../hooks/usePageMode';
import CaseStudyHero from '../page-components/CaseStudyHero';
import ExternalLink from '../page-components/ExternalLink';
import { useSingleImageLightbox } from '../../hooks/useLightbox';

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

  const [expanded, setExpanded] = useState(false);
  const lightbox = useSingleImageLightbox();
  const contextRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (expanded && contextRef.current) {
      // Scroll to Context, but offset by ~80px to account for the
      // sticky navbar + a bit of breathing room above the heading.
      const top = contextRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 80, behavior: 'smooth' });
    }
  }, [expanded]);

  return (
    <main className="design-container next-casestudy">
      <CaseStudyHero
        variant="next"
        backgroundMode="image"
        backgroundImage={`${ASSET_BASE}/via_hero.jpg`}
        title="Harbor Warehouse Management System v2.0"
        subtitle="Designing as an engineer, for engineers"
        note="Via's product is a specialized industrial component under NDA, so the screenshots in this case study use a three-layer cake and its ingredients as a stand-in. The structure on screen is real; only the names changed."
        meta={[
          {
            label: 'Role',
            value: 'Product Designer, UI/UX Designer, Full-stack Software Engineer'
          },
          { label: 'Timeline', value: 'January 2026 to April 2026' },
          { label: 'Team', value: '5 engineers, NExT Consulting × Via Separations' }
        ]}
      />

      <div className="next-content">
        {/* Quick Summary */}
        <section className="next-section">
          <h2>Quick Summary</h2>

          {/* Logos + intro prose */}
          <div className="next-summary-intro">
            <div className="next-logos">
              <img
                src={getAssetPath(`${ASSET_BASE}/next_logo.jpg`)}
                alt="NExT Consulting logo"
                className="next-logo next-logo--next"
              />
              <img
                src={getAssetPath(`${ASSET_BASE}/via_logo.png`)}
                alt="Via Separations logo"
                className="next-logo next-logo--via"
              />
            </div>
            <div className="next-prose">
              <p>
                Harbor v2.0 was a four-month engagement between NExT Consulting and Via
                Separations that extended Via's internal warehouse system into a
                manufacturing planning and traceability platform. I owned design and UX
                and built features as one of five engineers, working with Via's supply
                chain lead through weekly syncs. The scope covered a manufacturing bill
                of materials, a material requirements planner, a reservation and demand
                system, and traceability.
              </p>
            </div>
          </div>

          {/* Problem / Solution / Result (bento row) */}
          <div className="next-subsection">
            <div className="next-bento-row next-bento-row--outline">
              <div className="next-bento-card">
                <h3>Problem</h3>
                <p>
                  Harbor v1.0 told Via what it had and where it was. What to order, when
                  to order it, and what went into each finished product lived in
                  spreadsheets and a few people's memories. Enterprise systems like SAP
                  handle this, but are built for far larger operations.
                </p>
              </div>
              <div className="next-bento-card">
                <h3>Solution</h3>
                <p>
                  One system in place of the scatter: a queryable product structure, a
                  planner that calculates what to order and when, a reservation system
                  tracking who has claimed what, and a genealogy record tracing finished
                  products back to their raw material lots.
                </p>
              </div>
              <div className="next-bento-card">
                <h3>Result</h3>
                <p>
                  Material planning, demand reservations, and as-built traceability
                  did not exist in Harbor before. They now live in one system instead of
                  a chain of disconnected workbooks and verbal handoffs.
                </p>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="next-subsection">
            <h3 className="next-subheading">Impact</h3>
            <div className="next-bento-row">
              <div className="next-bento-card">
                <div className="next-bento-stat-header">
                  <span className="next-bento-stat">6</span>
                  <span className="next-bento-substat">new operational capabilities.</span>
                </div>
                <p>
                  Material requirements planning, available-to-promise inventory
                  calculation, lead time visualization, demand reservation management,
                  as-built genealogy tracking, and bulk production data capture.
                </p>
              </div>
              <div className="next-bento-card">
                <div className="next-bento-stat-header">
                  <span className="next-bento-stat">1</span>
                  <span className="next-bento-substat">system</span>
                </div>
                <p>
                  in place of the spreadsheets, files, and manual calculations that
                  multiplied with every new customer, manufacturing partner, and
                  production run.
                </p>
              </div>
              <div className="next-bento-card">
                <div className="next-bento-stat-header">
                  <span className="next-bento-stat">40,000</span>
                  <span className="next-bento-substat">modules</span>
                </div>
                <p>
                  of recorded demand through 2031 across seven or more customers
                  supported by Harbor's scalable framework.
                </p>
              </div>
            </div>
          </div>

          <div className="next-readmore-row">
            <button
              type="button"
              className="next-readmore-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Hide' : 'Read more'}
              <span className="next-readmore-arrow" aria-hidden="true">
                {expanded ? '↑' : '↓'}
              </span>
            </button>
          </div>

        </section>

        {expanded && (
        <>
        {/* Context */}
        <section className="next-section" ref={contextRef}>
          <h2>Context</h2>

          <div className="next-context-grid">
            <div>
              <h3 className="next-subheading">Who is Via Separations?</h3>
              <div className="next-prose">
                <p>
                  <ExternalLink href="https://www.viaseparations.com">
                    Via Separations
                  </ExternalLink>{' '}
                  is a climate technology company building graphene oxide membranes that
                  replace heat-based industrial filtration, a large contributor to global
                  energy use. The membranes do the same work
                  mechanically, cutting the energy cost by up to 90%.
                </p>
              </div>
            </div>

            <div>
              <h3 className="next-subheading">Why did Via need Harbor?</h3>
              <div className="next-prose">
                <p>
                  Via was scaling from qualification batches of 20 to 40 modules into
                  commercial orders of hundreds or thousands, projected to reach tens of
                  thousands across multiple customers. The spreadsheets behind the
                  smaller scale were about to meet a volume they were never built for.
                </p>
              </div>
            </div>

            <div>
              <h3 className="next-subheading">Who were Harbor's users?</h3>
              <div className="next-prose">
                <p>
                  Harbor serves two internal groups. Warehouse operators scan parts in
                  and out on the floor and need almost no friction per scan. Supply
                  chain and operations staff plan production and trace what went into
                  what, and need dense surfaces they can study. My work focused on the
                  second group, through Via's supply chain lead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem + Goals (side by side) */}
        <section className="next-section next-twocol-section">
          <div>
            <h2>Problem</h2>
            <div className="next-prose">
              <p>
                Planning ran through manually maintained spreadsheets. Demand arrived
                through several channels and was captured in conversation. The genealogy
                of a finished product, meaning the raw material lots inside it, was
                recorded nowhere. The operation worked because a few people carried the
                lead times, batch constraints, and supplier quirks in their heads.
              </p>
              <p>
                The cost was not speed. The spreadsheets calculated Via's needs
                perfectly well. The cost was that the pattern multiplied: every new
                supplier meant another copy of a calculator, every production run
                another set of references. Manageable at Via's scale, the bottleneck at
                its forecasted one.
              </p>
            </div>
          </div>
          <div>
            <h2>Goals</h2>
            <ol className="next-goals">
              <li>
                Build around the workflow Via already had.
              </li>
              <li>
                Move the informal process into software so it survives growth, with its
                informality intact.
              </li>
              <li>
                Replace the compounding spreadsheet pattern with one system, so the next
                customer or production run is a new entry in an existing structure.
              </li>
            </ol>
          </div>
        </section>

        {/* Process and Key Insights */}
        <section className="next-section next-process-section">
          <div className="next-process-text">
          <h2>Process and Key Insights</h2>
          <div className="next-prose">
            <p>
              Building around Via's existing workflow meant learning it in detail
              first. We ran weekly syncs with the supply chain lead and her technical
              counterpart across all four months, walked through the systems Via
              already used, and researched how industry-standard tools handle planning,
              reservations, and traceability. From this, we learned:
            </p>
          </div>

          <ol className="next-learnings">
            <li>
              <span>The warehouse already had an informal reservation system.</span>
              To make sure inventory would be there for a specific production run,
              people set parts aside and kept track of it themselves, and nobody else
              could see what had been claimed. A reservation feature would formalize a
              practice Via already had.
            </li>
            <li>
              <span>Planning ran on conversation and memory.</span>
              The supply chain lead carried most of the operating knowledge, and
              coordination happened in meetings and spreadsheet handoffs. That was the
              working system at Via's scale, and whatever we built had to accommodate
              it.
            </li>
            <li>
              <span>A planning view needs real calculation behind it.</span>
              Our research showed that a planning view has to walk a product's full
              structure and subtract available stock at each level to surface anything
              the supply chain lead did not already know. That set the floor for the
              feature even though the original scope had put calculation engines out of
              bounds.
            </li>
          </ol>
          </div>

          {/* Industry reference screens we studied during discovery */}
          <div className="next-reference-stack">
            <figure
              className="next-figure next-reference-figure"
              {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/acumatica-inventory-reservation.svg`),
                  'Inventory reservation from Dynamics 365',
                  'Inventory reservation from Dynamics 365')}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/acumatica-inventory-reservation.svg`)}
                alt="Inventory reservation from Dynamics 365"
              />
              <figcaption>Inventory reservation from Dynamics 365</figcaption>
            </figure>
            <figure
              className="next-figure next-reference-figure"
              {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/acumatica-mrp.png`),
                  'Material resource planner from Acumatica',
                  'Material resource planner from Acumatica')}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/acumatica-mrp.png`)}
                alt="Material resource planner from Acumatica"
              />
              <figcaption>Material resource planner from Acumatica</figcaption>
            </figure>
          </div>
        </section>

        {/* Solution */}
        <section className="next-section next-solution-section">
          <div className="next-solution-text">
            <h2>Solution</h2>
            <div className="next-prose">
              <p>
                Harbor v2.0 answers a different set of questions than v1.0 did. The two
                features carrying the most design judgment are the reservation system
                and the material planner.
              </p>
            </div>
          </div>

          <div className="next-beforeafter">
            <div className="next-bento-card next-beforeafter-box">
              <h3>Harbor v1.0</h3>
              <ul>
                <li>What do we have?</li>
                <li>Where is it?</li>
              </ul>
            </div>
            <div className="next-beforeafter-arrow" aria-hidden="true">→</div>
            <div className="next-bento-card next-beforeafter-box">
              <h3>Harbor v2.0</h3>
              <ul>
                <li>What do we need?</li>
                <li>When do we need it?</li>
                <li>How do we build it?</li>
                <li>What actually went into what we built?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Design 1: Reservations */}
        <section className="next-section">
          <h3>Design 1: Reservations</h3>

          {/* Intro blocks on the left, lifecycle diagram on the right */}
          <div className="next-reservations-intro">
            <div>
              {/* Why reservations? */}
              <div className="next-subsection">
                <h4 className="next-subheading">Why reservations?</h4>
                <div className="next-prose">
                  <p>
                    A reservation is a claim on inventory for a future need. The supply
                    chain lead needed to set parts aside for an upcoming build and see what
                    had been promised against what was actually in the warehouse. The
                    informal version could not survive more customers and concurrent runs.
                  </p>
                </div>
              </div>

              {/* The central decision */}
              <div className="next-subsection">
                <h4 className="next-subheading">
                  The central decision: claiming a specific item, or just an amount
                </h4>
                <div className="next-prose">
                  <p>
                    The core question was whether a reservation should claim specific
                    physical items or just a quantity. In plain terms: this exact carton of
                    flour on this exact shelf (item-level), or any one carton (part-level).
                  </p>
                </div>

                <div className="next-comparison-row">
                  <div className="next-bento-card next-comparison-card">
                    <h5>Item-level</h5>
                    <p className="next-comparison-quote">
                      "reserve this exact carton of{' '}
                      <span className="next-kern">flour</span> on this exact shelf"
                    </p>
                    <p>
                      Feels safer, because a specific carton seems guaranteed. The cost is
                      forcing the supply chain lead to know which items will exist months
                      before they arrive, even when it makes no difference which carton
                      she ends up pulling.
                    </p>
                  </div>
                  <div className="next-bento-card next-comparison-card">
                    <h5>Part-level</h5>
                    <p className="next-comparison-quote">
                      "reserve any one carton of <span className="next-kern">flour</span>,
                      no matter which"
                    </p>
                    <p>
                      Asks nothing of the planner except a part and a quantity, at the cost
                      of no hard guarantee that any specific item is set aside.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <figure
              className="next-figure next-density-lifecycle"
              {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/via-resline_lifecycle.png`),
                  'Reservation line lifecycle diagram',
                  'Reservation line lifecycle: how one line moves quantity from Needed to Reserved to Fulfilled across its life')}
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/via-resline_lifecycle.png`)}
                alt="Reservation line lifecycle diagram"
              />
            </figure>
          </div>

          {/* Our Decision, including what it costs */}
          <div className="next-subsection">
            <h4 className="next-subheading">Our Decision</h4>
            <div className="next-prose">
              <p>
                We went with part-level. Asking the supply chain lead to reserve a
                particular item on a particular shelf half a year out would have created
                friction at the moment we were trying to get her into the system at all,
                and every item of a given part was interchangeable to Via anyway. What
                she needed to record was an amount.
              </p>
              <p>
                While part-level reservations created less friction, the consequence is
                that two reservations can together claim more inventory than exists, and
                whoever pulls the parts first gets them. To account for this, we imposed
                inventory checks: when commitments exceed stock the available count goes
                negative, automated checks flag the checkout that makes another
                reservation unfulfillable, and a nightly sweep catches the rest. Harbor
                surfaces the conflict as a warning and lets the user keep working.
              </p>
            </div>
          </div>

          {/* What I learned about visual vs. cognitive density */}
          <div className="next-subsection">
            <div className="next-density-content">
              <h4 className="next-subheading">
                What I learned about visual vs. cognitive density
              </h4>
              <div className="next-prose next-prose--flowcols">
                <p>
                  A reservation line had to show its place in the lifecycle at a
                  glance, which meant three quantities: Needed, Reserved, and
                  Fulfilled. Three numbers per part, dozens of parts per reservation.
                  My instinct as a graphic designer was that a screen with less data is
                  a better screen, and I had to unlearn that here. The sparser version
                  looked lighter but would have forced the supply chain lead to
                  reconstruct the relationship between the three quantities in her
                  head, for every part. A segmented bar with one derived status per
                  line read cleaner and was faster for her.
                </p>
              </div>
            </div>

            {/* Full-width comparison: sparser alternative | chosen design */}
            <div className="next-density-comparison">
              <figure
                className="next-figure next-density-figure"
                {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/via-resdetails-simple.jpg`),
                    'Sparser reservation details alternative',
                    'Sparser, cognitively heavier alternative considered')}
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-resdetails-simple.jpg`)}
                  alt="Sparser reservation details alternative"
                />
                <figcaption>
                  Considered: one derived status per line, with the underlying
                  quantities hidden a click away.
                </figcaption>
              </figure>
              <figure
                className="next-figure next-density-figure"
                {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/via-resdetails.png`),
                    'Reservation details page',
                    'Reservation details page')}
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-resdetails.png`)}
                  alt="Reservation details page"
                />
                <figcaption>
                  Chosen: a segmented bar showing Needed, Reserved, and Fulfilled at a
                  glance, with a status chip derived from those quantities.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Design 2: Material Planner */}
        <section className="next-section">
          <h3>Design 2: Material Planner</h3>

          <div className="next-subsection next-subsection--half">
            <h4 className="next-subheading">Why a material planner?</h4>
            <div className="next-prose">
              <p>
                Every order raised two questions: what do I need to buy or make to build
                this, and when does each piece have to be ordered so it is ready on
                time. By hand that meant working through the structure,
                cross-referencing inventory, and reasoning about lead times from memory.
              </p>
            </div>
          </div>

          <div className="next-subsection next-twocol-subsection">
            <div>
              <h4 className="next-subheading">Keeping the core judgment with the user</h4>
              <div className="next-prose">
                <p>
                  The scope framed the planner as a visibility tool, which left a choice:
                  display information for someone else to compute by hand, or build the
                  calculation in anyway.
                </p>
                <p>
                  The planner walks the structure, subtracts inventory at every level,
                  substitutes an in-stock alternate when the primary part is short, and
                  schedules backward from the need-by date through each lead time to
                  produce an order-by date. It does the arithmetic that has to be
                  automatic and leaves the judgment calls to the supply chain lead.
                </p>
              </div>
            </div>
            <div>
              <h4 className="next-subheading">Density without clutter</h4>
              <div className="next-prose">
                <p>
                  Each planner row is heavy as raw numbers, but the density is the
                  point: for every row the supply chain lead needs two things at once,
                  whether she has enough of a part and whether she has enough time to
                  order more if she does not.
                </p>
                <p>
                  Harbor taught me a screen can be packed and still easy to read, as long
                  as every element answers a question the user is already asking.
                </p>
              </div>
            </div>
          </div>

          {/* Sparser planner alternative | chosen material planner */}
          <div className="next-subsection">
            <div className="next-density-comparison">
              <figure
                className="next-figure next-density-figure"
                {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/via-mrp-simple.png`),
                    'Sparser material planner alternative',
                    'Sparser, cognitively heavier planner alternative considered')}
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-mrp-simple.png`)}
                  alt="Sparser material planner alternative"
                />
                <figcaption>
                  Considered: top-level totals only, with coverage bars, lead times, and
                  order-by dates behind a click.
                </figcaption>
              </figure>
              <figure
                className="next-figure next-density-figure"
                {...lightbox.trigger(getAssetPath(`${ASSET_BASE}/via-mrp.png`),
                    'Material Planner results view',
                    'Material Planner results view')}
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-mrp.png`)}
                  alt="Material Planner results view"
                />
                <figcaption>
                  Chosen: a dense row carrying gross requirement, stock, net
                  requirement, coverage, lead time, and a color-coded order-by date.
                </figcaption>
              </figure>
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
                  The material planner taught us more. Once it started producing
                  requirements for parts that did not yet exist, we could see that
                  reservations also had to track demand for inventory on its way in,
                  which meant separating needed from reserved from fulfilled.
                </p>
              </div>
            </div>
            <div>
              <h3 className="next-subheading">Knowing when to rebuild</h3>
              <div className="next-prose">
                <p>
                  Rebuilding it was a hard call and the right one. The redesign moved
                  each line to the three quantities, the same model that later made the
                  progress bar readable at a glance. The design that reads as clean now
                  is the one the planner taught us how to build.
                </p>
                <p>
                  The lesson is not that wrong assumptions should be avoided, which is
                  unrealistic under time pressure and incomplete information. It is to
                  build so a wrong one stays survivable, and to recognize when working
                  around a mistake costs more than replacing it.
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
              If I were to make Via's processes even more efficient with Harbor, I'd
              take the same approach that made us successful: listen to their needs, and
              build our decisions from Via's workflows.
            </p>
          </div>
        </section>

        </>
        )}

        {/* Team photo */}
        <section className="next-section next-teamphoto-section">
          <figure className="next-figure next-figure--static next-teamphoto">
            <img
              src={getAssetPath(`${ASSET_BASE}/via_teamphoto.jpg`)}
              alt="NExT × Via Separations team"
            />
            <figcaption>
              NExT team photo at Via Separations HQ after our final presentation!
            </figcaption>
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
