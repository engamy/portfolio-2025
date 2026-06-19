import React, { useEffect, useRef, useState } from 'react';
import '../mainpages/design-style.css';
import './design-next-casestudy.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';

interface LightboxImage {
  id: number;
  src: string;
  caption: string;
  alt: string;
}

const ASSET_BASE = '/pictures/portfolio-content_spring2026/02_DESIGN/02_NEXT';

export default function DesignNextCasestudy() {
  usePageDarkMode(true);
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<LightboxImage | null>(null);
  const contextRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (expanded && contextRef.current) {
      // Scroll to Context, but offset by ~80px to account for the
      // sticky navbar + a bit of breathing room above the heading.
      const top = contextRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 80, behavior: 'smooth' });
    }
  }, [expanded]);

  const openLightbox = (src: string, alt: string, caption: string = '') => {
    setCurrentImage({ id: Date.now(), src: getAssetPath(src), caption, alt });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  return (
    <main className="design-container next-casestudy">
      <div className="design-section-header next-hero">
        <img
          src={getAssetPath(`${ASSET_BASE}/via_hero.jpg`)}
          alt=""
          aria-hidden="true"
          className="next-hero-bg"
        />
        <div className="next-hero-overlay">
          <div className="next-hero-text">
            <p className="next-eyebrow">Case Study</p>
            <h1 className="next-title">
              Harbor Warehouse Management System v2.0
            </h1>
            <p className="next-subtitle">Designing as an engineer, for engineers</p>
            <div className="next-meta">
              <p>
                <span>Role</span> Product Designer, UI/UX Designer, Full-stack Software Engineer
              </p>
              <p>
                <span>Timeline</span> January 2026 to April 2026
              </p>
              <p>
                <span>Team</span> 5 engineers, NExT Consulting × Via Separations
              </p>
            </div>
          </div>
        </div>
      </div>

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
                Separations that extended Via's internal warehouse management system into
                a manufacturing planning and traceability platform. I worked as a
                consultant and owned design and UX across the product while building
                features as one of five software engineers, working directly with Via's
                supply chain lead through weekly syncs. The scope covered a manufacturing
                bill of materials (a structured list of every part that goes into a
                product, and every part that goes into those parts, all the way down), a
                material requirements planner, a reservation and demand system, and
                end-to-end traceability across Via's manufacturing process.
              </p>
              <p className="next-disclaimer">
                Harbor was implemented for Via Separations, a company whose product is a
                specialized industrial component, and the specifics are under NDA. To keep
                the interface legible without those specifics, the screenshots in this
                case study use a familiar stand-in, a three-layer cake and its
                ingredients, in place of Via's actual product. The structure on screen is
                real; only the names have been swapped.
              </p>
            </div>
          </div>

          {/* Problem / Solution / Result (bento row) */}
          <div className="next-subsection">
            <div className="next-bento-row next-bento-row--outline">
              <div className="next-bento-card">
                <h3>Problem</h3>
                <p>
                  With Harbor v1.0, Via knew what inventory it had and where it was.
                  Everything beyond that, including what to order, when to order it, and
                  what actually went into each product already built, lived in spreadsheets
                  and a handful of people's memories. This worked at the company's current
                  scale, but it could not survive the scale Via was planning for.
                  Enterprise systems like SAP and Acumatica handle these functions, but
                  they are built for operations far larger and higher-volume than Via's,
                  so Via partnered with NExT to extend Harbor into a planning and
                  traceability layer sized to its own operation instead.
                </p>
              </div>
              <div className="next-bento-card">
                <h3>Solution</h3>
                <p>
                  Harbor v2.0 consolidated work that had been scattered across
                  spreadsheets and informal handoffs into one system: a queryable product
                  structure, a planner that calculates what to order and when, a
                  reservation system that tracks who has claimed which inventory, and a
                  genealogy record tracing finished products back to their raw material
                  lots.
                </p>
              </div>
              <div className="next-bento-card">
                <h3>Result</h3>
                <p>
                  Capabilities that did not exist in Harbor before, including material
                  requirements planning, available-to-promise inventory, demand
                  reservations, and full as-built traceability, now live in one system
                  instead of a chain of disconnected workbooks and verbal handoffs, which
                  gives Via's manufacturing and planning processes room to scale as the
                  company grows.
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
                  previously multiplied with every new customer, manufacturing partner,
                  and production run.
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
                  Via Separations is a climate technology company that builds graphene
                  oxide membranes to replace heat-based industrial filtration, which is a
                  large contributor to global energy use. Via's membranes do the same
                  separation work mechanically, cutting the energy cost of the process by
                  up to 90%. At the time of this engagement, Via was past the
                  science-experiment stage and into commercial deployment, with a
                  first-of-a-kind installation that had been running for about two years
                  and a new Series C round backing its planned growth.
                </p>
              </div>
            </div>

            <div>
              <h3 className="next-subheading">Why did Via need Harbor?</h3>
              <div className="next-prose">
                <p>
                  The stage Via was in matters for understanding the work we did. Via was
                  scaling from qualification batches of 20 to 40 modules into commercial
                  orders of hundreds or thousands of modules per order, a figure
                  projected to reach tens of thousands per order over the next several
                  years across multiple customers. The manual process that supported the
                  smaller scale, built on spreadsheets and a few people's understanding,
                  was about to meet a volume of orders it was never built for.
                </p>
              </div>
            </div>

            <div>
              <h3 className="next-subheading">Who were Harbor's users?</h3>
              <div className="next-prose">
                <p>
                  Harbor serves two internal groups at Via. The first is warehouse
                  operators, who check parts in and out on the floor using a mobile
                  device and need a system that adds almost no friction to each scan.
                  The second is supply chain and operations staff, who plan production,
                  track demand, and trace what went into what, and who need dense,
                  cross-referenceable surfaces they can study. My design work focused on
                  the second group, through Via's supply chain lead, who owned the
                  end-to-end manufacturing process and was the closest thing the
                  existing workflow had to a single source of truth before Harbor.
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
                Harbor v1 told Via where its inventory was. It could not tell them what
                they needed, when they needed it, or what had actually gone into the
                things they had already built. Everything beyond the warehouse walls lived
                somewhere else. Planning ran through a chain of manually maintained
                spreadsheets. Demand arrived through several different channels and was
                captured mostly through conversation and rough estimates. The genealogy of
                any finished product, meaning the specific raw material lots that went
                into it, was not recorded anywhere in a systematic way. The operation
                worked because a small number of people carried the lead times, the batch
                constraints, and the supplier quirks in their memories, and coordinated
                through meetings, messages, and spreadsheet handoffs.
              </p>
              <p>
                The cost of this was not speed. It was scalability. The spreadsheets
                calculated Via's needs perfectly well, and copying a workbook was never
                the bottleneck. The problem was that every new supplier meant another
                copy of a calculator, every new production run meant another set of
                references, and every new product meant another trip through engineering
                to rebuild the structure. These manual steps compound. At Via's current
                scale they were manageable. At its forecasted scale they would become the
                bottleneck.
              </p>
            </div>
          </div>
          <div>
            <h2>Goals</h2>
            <div className="next-prose">
              <p>
                Build around Via's existing workflow rather than replacing it with a more
                rigorous one. Via's planning ran on spreadsheets and institutional memory,
                and that informal process worked at the company's current scale. The goal
                was to move it into software so it could survive growth, not to correct
                it into something more disciplined. A system that demanded planners
                suddenly behave like operators of a large enterprise tool would have been
                abandoned the moment it met how people actually worked, so every major
                decision started from the workflow that already existed and asked how to
                support it.
              </p>
              <p>
                Replace the compounding spreadsheet pattern with one consolidated,
                scalable system. The old approach did not fail because it was slow. It
                failed because it multiplied. Every new customer, manufacturing partner,
                and production run spawned another workbook, another set of manual
                cross-references, none of which talked to each other. The system had to
                absorb that growth into a single framework, so that the next customer or
                configuration or production run was a new entry in an existing structure
                rather than a new spreadsheet to maintain by hand.
              </p>
            </div>
          </div>
        </section>

        {/* Process and Key Insights */}
        <section className="next-section">
          <h2>Process and Key Insights</h2>
          <div className="next-prose">
            <p>
              Talk first, build after. The engagement opened with structured discovery
              rather than a rush to build. We ran weekly syncs with Via's supply chain
              lead and her technical counterpart across the full four months, walked
              through the existing systems, and researched how industry-standard tools
              handle material planning, reservations, and traceability. The weekly
              cadence mattered more than any single session, because it turned design
              into an ongoing conversation. Decisions were validated in the next sync,
              ambiguities were resolved in a short exchange rather than a formal round,
              and several features changed shape directly in response to what we heard.
            </p>
            <p>Three insights from discovery shaped everything that followed.</p>
          </div>

          <div className="next-bento-row next-bento-row--outline">
            <div className="next-bento-card">
              <p className="next-insight-topic">
                First, parts were already being held aside informally.
              </p>
              <p>
                To guarantee that inventory would be available for a particular
                production run, people were quietly setting parts aside in the warehouse,
                which meant there was no way for anyone else to know what was already
                spoken for. A reservation system did not need to invent a new behavior.
                It needed to formalize and communicate one that already existed.
              </p>
            </div>
            <div className="next-bento-card">
              <p className="next-insight-topic">
                Second, planning was not a rigorous process.
              </p>
              <p>
                It ran on conversations and memory, and that informality was not a flaw
                to be corrected so much as the actual working system, one that functioned
                because of the people in it. Anything we built had to fit into that
                reality rather than demand that planners suddenly operate like a large
                enterprise tool expects.
              </p>
            </div>
            <div className="next-bento-card">
              <p className="next-insight-topic">
                Third, a planner needs a real calculation engine, or it does nothing.
              </p>
              <p>
                Industry research confirmed that walking a product's full structure,
                level by level, and subtracting what is already in stock at each level is
                the baseline for any planning view that does real work. Without that
                calculation underneath it, a planning surface is effectively static. This
                told us where the floor was for the planner, even though the original
                scope had framed a calculation engine as out of bounds.
              </p>
            </div>
          </div>

          <div className="next-prose">
            <p>
              Together these insights point at the principle that runs through the rest
              of this case study: design for the process that exists, not the process a
              textbook wants. Via's informal workflow worked at their scale, and the job
              was to build software that let it survive growth, not to replace it with a
              more rigorous system that would have clashed with how people actually
              worked. Each of the major decisions below is an instance of that principle,
              of refusing to ask users to be more rigorous than their real workflow
              supported.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="next-section next-solution-section">
          <div className="next-solution-text">
            <h2>Solution</h2>
            <div className="next-prose">
              <p>
                Harbor v2.0 extended the warehouse system into a manufacturing planning
                and traceability platform. Where Harbor v1.0 answered "what do we have?"
                and "where is it?," Harbor v2.0 answers "what do we need?" "when do we
                need it?" "how do we build it?" and "what actually went into what we
                built?" In practice that meant a queryable, versioned product structure
                to replace the spreadsheet hierarchy, a material planner that calculates
                what to order and when, a reservation system that consolidates demand and
                tracks who has claimed which inventory, and a genealogy record that
                traces a finished product back to its raw material lots.
              </p>
              <p>
                The two features worth examining in depth, because they carry the most
                design judgment, are the reservation system and the material planner.
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
          <h2>Design 1: Reservations</h2>

          {/* Why reservations? */}
          <div className="next-subsection">
            <h3 className="next-subheading">Why reservations?</h3>
            <div className="next-prose">
              <p>
                A reservation is a claim on inventory for a future need. The supply chain
                lead needed a way to set inventory aside for a specific upcoming build,
                and to see, at a glance, what had been promised against what was actually
                in the warehouse, so that two people could not independently promise more
                parts than existed. The informal version of this, parts held aside and
                remembered, already worked. It simply could not survive more customers
                and more concurrent runs.
              </p>
            </div>
          </div>

          {/* The central decision */}
          <div className="next-subsection">
            <h3 className="next-subheading">
              The central decision: claiming a specific item, or just an amount
            </h3>
            <div className="next-prose">
              <p>
                The core design question was whether a reservation should claim specific
                physical items or just a quantity of a part. In plain terms, the question
                was whether the supply chain lead should reserve this exact carton of
                flour on this exact shelf (item-level), or any one carton of flour, no
                matter which (part-level).
              </p>
            </div>

            <div className="next-comparison-row">
              <div className="next-bento-card next-comparison-card">
                <h4>Item-level</h4>
                <p className="next-comparison-quote">
                  "reserve this exact carton of flour on this exact shelf"
                </p>
                <p>
                  Feels safer at first, because reserving a specific carton seems to
                  guarantee nobody else can take it. The cost is severe, though, because
                  it forces the planner to know which specific physical items will exist
                  months before those items have even arrived, even in cases where it
                  makes no difference which carton she eventually pulls off the shelf.
                </p>
              </div>
              <div className="next-bento-card next-comparison-card">
                <h4>Part-level</h4>
                <p className="next-comparison-quote">
                  "any one carton of flour, no matter which"
                </p>
                <p>
                  Asks nothing of the planner except a part and a quantity, at the cost
                  of leaving the system without a hard guarantee that any one specific
                  item is set aside.
                </p>
              </div>
            </div>
          </div>

          {/* Our Decision + Tradeoffs (two-column prose, no cards) */}
          <div className="next-subsection next-twocol-subsection">
            <div>
              <h3 className="next-subheading">Our Decision</h3>
              <div className="next-prose">
                <p>
                  After several syncs walking through her workflow, we went with
                  part-level reservations. Planning at Via happened through conversation,
                  well before specific items existed, so asking her to reserve a specific
                  item on a specific shelf half a year in advance would have created
                  friction at exactly the moment we were trying to get her into the
                  system at all. Part-level reservations also matched how Via already
                  thought, because every item of a given part was interchangeable from
                  their perspective anyway. In other words, the design followed the
                  reality that the planner was reserving an amount of something, not a
                  particular instance of it.
                </p>
              </div>
            </div>
            <div>
              <h3 className="next-subheading">Tradeoffs</h3>
              <div className="next-prose">
                <p>
                  Because no specific item is set aside, two reservations can each claim
                  inventory that, added together, exceeds what physically exists. Whoever
                  pulls the parts first gets them, and the other reservation comes up
                  short and has to source the part elsewhere. We accepted this knowingly.
                  When commitments for a part exceed actual stock, the available count
                  goes negative, and automated checks flag the moment a checkout makes
                  another reservation unfulfillable. A nightly sweep catches anything the
                  daytime checks missed. The conflict is always surfaced as a warning
                  rather than a hard block, so the system never stops a user from doing
                  real work in order to protect a number.
                </p>
              </div>
            </div>
          </div>

          {/* What I learned about visual vs. cognitive density */}
          <div className="next-subsection">
            <div className="next-density-layout">
              <div className="next-density-content">
                <h3 className="next-subheading">
                  What I learned about visual vs. cognitive density
                </h3>
                <div className="next-prose">
                  <p>
                    Designing the reservation screens is where I began to understand the
                    balance of how much information a single component on a screen
                    should communicate to a user. A reservation line had to communicate
                    its place in the reservation lifecycle at a glance, and to do this
                    we decided to show three quantities: Needed, Reserved, and
                    Fulfilled. Three numbers per reserved part, and dozens of reserved
                    parts per reservation. This is a lot of data to show to a user at
                    once.
                  </p>
                </div>

                {/* Mobile-only lifecycle (above the last paragraph) */}
                <figure
                  className="next-figure next-density-lifecycle next-density-lifecycle--mobile"
                  onClick={() =>
                    openLightbox(
                      `${ASSET_BASE}/via-resline_lifecycle.png`,
                      'Reservation line lifecycle diagram',
                      'Reservation line lifecycle: how one line moves quantity from Needed to Reserved to Fulfilled across its life'
                    )
                  }
                >
                  <img
                    src={getAssetPath(`${ASSET_BASE}/via-resline_lifecycle.png`)}
                    alt="Reservation line lifecycle diagram"
                  />
                </figure>

                <div className="next-prose">
                  <p>
                    My first instinct as a graphic designer was that a cleaner screen
                    with less data is a better screen, but I had to unlearn this here.
                    We considered a screen with less visible data that would have looked
                    lighter and easier to visually process, but upon further
                    consideration we realized it would have forced the supply chain lead
                    to reconstruct the relationship between the three quantities for
                    each part mentally. This would have created more cognitive friction
                    for her, so we decided to communicate all of the data in a different
                    way: a segmented bar split into the three quantities, with a
                    singular status per reservation line which was derived from the
                    Needed/Reserved/Fulfilled quantities. This way, it actually looked
                    cleaner, and it was significantly easier for the supply chain lead
                    to understand the volume of data at a glance. Because we took the
                    time to understand exactly what questions she would ask when looking
                    at this screen, we optimized the amount of information the progress
                    bar and status chips needed to convey.
                  </p>
                </div>
              </div>

              {/* Reservation line lifecycle — right side of the layout (desktop only) */}
              <figure
                className="next-figure next-density-lifecycle next-density-lifecycle--desktop"
                onClick={() =>
                  openLightbox(
                    `${ASSET_BASE}/via-resline_lifecycle.png`,
                    'Reservation line lifecycle diagram',
                    'Reservation line lifecycle: how one line moves quantity from Needed to Reserved to Fulfilled across its life'
                  )
                }
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-resline_lifecycle.png`)}
                  alt="Reservation line lifecycle diagram"
                />
              </figure>
            </div>

            {/* Full-width comparison: sparser alternative | chosen design */}
            <div className="next-density-comparison">
              <figure
                className="next-figure next-density-figure"
                onClick={() =>
                  openLightbox(
                    `${ASSET_BASE}/via-resdetails-simple.jpg`,
                    'Sparser reservation details alternative',
                    'Sparser, cognitively heavier alternative considered'
                  )
                }
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-resdetails-simple.jpg`)}
                  alt="Sparser reservation details alternative"
                />
                <figcaption>
                  Considered: a sparser layout where each reservation line carries only
                  a single derived status, and the underlying quantities are hidden a
                  click away.
                </figcaption>
              </figure>
              <figure
                className="next-figure next-density-figure"
                onClick={() =>
                  openLightbox(
                    `${ASSET_BASE}/via-resdetails.png`,
                    'Reservation details page',
                    'Reservation details page'
                  )
                }
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-resdetails.png`)}
                  alt="Reservation details page"
                />
                <figcaption>
                  Chosen: a segmented bar showing Needed, Reserved, and Fulfilled
                  quantities at a glance, with a status chip per line derived from
                  those quantities.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Design 2: Material Planner */}
        <section className="next-section">
          <h2>Design 2: Material Planner</h2>

          <div className="next-subsection">
            <h3 className="next-subheading">Why a material planner?</h3>
            <div className="next-prose">
              <p>
                Every time an order came in, the supply chain lead had to work out two
                things: what do I need to buy or make to build this, and when does each
                piece need to be ordered so the whole thing is ready on time. Answering
                it by hand meant working through the product structure,
                cross-referencing current inventory, calculating quantities level by
                level, and reasoning about lead times, the time between ordering a part
                and receiving it, mostly from memory.
              </p>
            </div>
          </div>

          <div className="next-subsection">
            <h3 className="next-subheading">Keeping the core judgment with the user</h3>
            <div className="next-prose">
              <p>
                The design question here was how much of that calculation the tool
                should do, and how much to leave to the planner's judgment. The
                original scope framed the planner as a visibility tool and put
                calculation engines out of bounds, which left a choice: display
                information for someone else to compute by hand, or build the
                calculation in despite the scope. To resolve it, we led discussions
                with the supply chain lead and did industry research to find the
                smallest amount of calculation that would actually deliver the
                visibility she needed.
              </p>
              <p>
                Research told us that without walking the full product structure,
                subtracting available stock at every level, and substituting an
                in-stock alternate when the primary part is short, the surface is
                static and does none of the planner's real work. So the planner walks
                the entire structure, subtracts available inventory at every level,
                auto-selects an in-stock substitute when the primary part is short,
                and schedules backward from the need-by date through each part's lead
                time to produce an order-by date for every component. It sits at the
                minimum-useful end of that spectrum by design, doing the arithmetic
                that has to be automatic while leaving the judgment calls, supplier
                negotiation, scheduling, the things where her experience actually
                earns its keep, to her.
              </p>
            </div>
          </div>

          <div className="next-subsection">
            <h3 className="next-subheading">Density without clutter</h3>
            <div className="next-prose">
              <p>
                The density principle returns here through a different lens than the
                reservation bar. Each planner row carries a lot: a gross requirement,
                current stock, a net requirement, a coverage bar, a lead time, an
                order-by date, and a color flagging whether a part is late,
                approaching its deadline, or missing a lead time entirely. As raw
                numbers, that is a heavy row to read, and the graphic designer in me
                instinctively wanted to thin it out. The value of the planner, though,
                is exactly the dense cross-referencing, because for each row the
                supply chain lead needs to know two things at once: whether she has
                enough of a part, and whether she has enough time to order more if she
                does not.
              </p>
              <p>
                The decision to keep all of that on screen, carried through chips and
                bars rather than bare numbers, came from her needs and from the
                industry research, not from instinct. What Harbor taught me is that a
                screen can be packed with information and still be easy to read, as
                long as every element on it answers a question the user is already
                asking. Had I followed my instinct and dropped some of those numbers,
                the screen would have looked lighter and been heavier to use, because
                she would have had to pull the missing pieces together herself instead
                of reading them at a glance.
              </p>
            </div>

            {/* Sparser planner alternative | chosen material planner */}
            <div className="next-density-comparison">
              <figure
                className="next-figure next-density-figure"
                onClick={() =>
                  openLightbox(
                    `${ASSET_BASE}/via-mrp-simple.png`,
                    'Sparser material planner alternative',
                    'Sparser, cognitively heavier planner alternative considered'
                  )
                }
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-mrp-simple.png`)}
                  alt="Sparser material planner alternative"
                />
                <figcaption>
                  Considered: a sparser planner row showing only top-level totals,
                  with coverage bars, lead times, and order-by dates hidden behind a
                  click.
                </figcaption>
              </figure>
              <figure
                className="next-figure next-density-figure"
                onClick={() =>
                  openLightbox(
                    `${ASSET_BASE}/via-mrp.png`,
                    'Material Planner results view',
                    'Material Planner results view'
                  )
                }
              >
                <img
                  src={getAssetPath(`${ASSET_BASE}/via-mrp.png`)}
                  alt="Material Planner results view"
                />
                <figcaption>
                  Chosen: a dense planner row carrying gross requirement, stock, net
                  requirement, a coverage bar, lead time, and a color-coded order-by
                  date — every column answering a question the user is already
                  asking.
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
              <h3 className="next-subheading">The assumption that broke</h3>
              <div className="next-prose">
                <p>
                  The thing that taught me the most was a mistake we made building the
                  reservation system. Early on, in our weekly syncs, we assumed that a
                  reservation would only ever claim inventory that already existed in
                  the warehouse. Given what we knew at the time, that was a reasonable
                  assumption, and the system we built on it was internally sound.
                </p>
                <p>
                  Partway through the engagement, the assumption broke. Once the
                  material planner started producing requirements for parts that did
                  not yet exist, it became clear the reservation system had to track
                  demand for inventory that had not arrived, not just inventory on
                  hand. It needed to separate what was needed from what was reserved
                  from what was fulfilled, which the original single-quantity model
                  could not represent.
                </p>
              </div>
            </div>
            <div>
              <h3 className="next-subheading">Knowing when a rebuild is worth it</h3>
              <div className="next-prose">
                <p>
                  Rebuilding the reservation system was a hard call to face, and it
                  was the right one. The redesign moved each reservation line to the
                  three quantities, Needed, Reserved, and Fulfilled, which is the
                  same model that later made the progress bar readable at a glance.
                  What looks like a clean design in hindsight was the second attempt,
                  and it was better precisely because the planner had revealed what
                  the reservation system actually had to do.
                </p>
                <p>
                  The lesson I took from it is not that wrong assumptions should be
                  avoided, since that is an unrealistic standard under time pressure,
                  incomplete information, and ordinary human error. The lesson is to
                  build so that a wrong assumption stays survivable, and to recognize
                  the moment when working around a mistake costs more than replacing
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
              Harbor v2.0 moved Via's planning out of spreadsheets and memory and
              into a system built to scale with them. Two extensions stand out as the
              next step, both of which would move more manual coordination off of
              people and into the system.
            </p>
          </div>

          <div className="next-bento-row next-bento-row--outline next-bento-row--two">
            <div className="next-bento-card">
              <h3>Automatic allocation</h3>
              <p>
                When new stock arrives, assigning it to the reservations waiting on
                it is still a manual step, and automating it would close the last
                manual loop in the planning-to-fulfillment workflow.
              </p>
            </div>
            <div className="next-bento-card">
              <h3>Timeline view</h3>
              <p>
                The order-by dates the planner already calculates, laid out across
                parts and suppliers at once, so a whole production run can be read at
                a glance instead of one part at a time.
              </p>
            </div>
          </div>

          <div className="next-prose">
            <p>
              If I picked this up with the team again, the approach would be the same
              one that made Harbor v2.0 work: start in the weekly syncs, watch how the
              supply chain lead actually uses what we shipped, and let the next set of
              decisions come from her workflow. The foundation is in place, and Harbor
              is ready to keep growing alongside Via.
            </p>
          </div>
        </section>

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
        </>
        )}

      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        currentImage={currentImage}
        onClose={closeLightbox}
      />
    </main>
  );
}
