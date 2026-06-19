import React, { useEffect, useState } from 'react';
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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<LightboxImage | null>(null);

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
              Harbor Warehouse Management System (WMS) v2.0
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
                Harbor v2.0 was a four-month engagement that extended Via Separations'
                internal warehouse management system into a manufacturing planning and
                traceability platform. I owned design and UX across the product while
                building features as one of five software engineers, working directly with
                Via's supply chain lead through weekly syncs. The scope covered a
                manufacturing bill of materials (a structured list of every part that goes
                into a product, and every part that goes into those parts, all the way
                down), a material requirements planner, a reservation and demand system,
                and end-to-end traceability across Via's manufacturing process.
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

        </section>

        {/* Context */}
        <section className="next-section next-context-section">
          <div className="next-placeholder next-placeholder--context">
            <span>Placeholder image</span>
          </div>
          <div className="next-prose">
            <h2>Context</h2>
            <p>
              Via Separations makes graphene oxide filtration membranes that replace
              heat-based industrial separation processes, which currently account for
              around 12 percent of global energy use. Their flagship deployment, Project
              Kodiak, has been running commercially at an International Paper mill in
              Alberta for nearly two years, and a Series C in April 2026 is funding their
              expansion into refining and chemicals.
            </p>
            <p>
              Hardware companies at this stage tend to share a pattern. The operations
              work because a small group of engineers carries the planning logic in their
              heads, which holds up at small scale and falls apart with growth. Our job
              was to build software around that existing process so it could keep working
              when the people who held it together got pulled in fifteen directions at
              once.
            </p>
            <p>
              We designed for two primary user groups. The supply chain lead worked across
              multiple workbooks every day and needed dense, cross-referenceable surfaces.
              Warehouse operators worked on mobile devices on the floor, where any
              friction translated directly into duplicated time on every transaction. My
              design work focused mostly on the supply chain lead's surfaces, which is
              what the rest of this case study covers.
            </p>
            <p>
              Off-the-shelf software didn't fit their exact needs either. Small-team tools
              handled inventory but not multi-level bills of materials. Enterprise systems
              like SAP were built for organizations an order of magnitude larger, with
              dedicated IT teams and twelve-month implementation cycles. What the client
              actually needed sat in between, where nothing exists as a coherent product.
            </p>
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

      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        currentImage={currentImage}
        onClose={closeLightbox}
      />
    </main>
  );
}
