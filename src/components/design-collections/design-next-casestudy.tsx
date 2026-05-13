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
              Harbor v2.0: Designing for Manufacturing Planning at Via Separations
            </h1>
            <div className="next-meta">
              <p>
                <span>Role</span> Product Designer and Software Engineer
              </p>
              <p>
                <span>Org</span> NExT Consulting × Via Separations
              </p>
              <p>
                <span>Timeline</span> Spring 2026 (January to April)
              </p>
              <p>
                <span>Team</span> 5 engineers, 1 manager, 1 client stakeholder pair
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="next-content">
        {/* Quick Summary */}
        <section className="next-section">
          <h2>Quick Summary</h2>
          <div className="next-logos next-float-right">
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
              Via Separations, a growth-stage climate tech company, was scaling from small
              validation runs to commercial-scale orders, but their planning, demand
              tracking, and traceability still lived in spreadsheets and one person's
              memory. We extended Harbor, the client's existing warehouse management
              system, into a manufacturing planning and traceability platform. I led the
              design and front-end implementation of two of the features that anchor it.
            </p>
            <p className="next-disclaimer">
              Visuals in this case study have been recreated with a vanilla cake production
              scenario in place of Via's actual product data, per NDA. The designs
              themselves are real.
            </p>
          </div>
        </section>

        {/* Context */}
        <section className="next-section">
          <h2>Context</h2>
          <div className="next-prose">
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

        {/* Research and Discovery */}
        <section className="next-section">
          <h2>Research and Discovery</h2>
          <div className="next-prose">
            <p>
              Discovery ran in parallel with early development across the first month.
              Twelve weekly client syncs anchored almost every decision in this case
              study. Beyond the syncs, we ran requirements interviews to understand how
              planning and lead times were currently being tracked, and we shadowed a
              single module order from demand identification all the way through
              execution.
            </p>
            <p>
              The most useful thing we found by shadowing was that parts were being
              informally held aside in the warehouse to protect future production, with no
              system tracking who was holding what. People just had to know. That finding
              is what motivated building a dedicated reservation system in the first
              place.
            </p>
            <p>
              We also looked at how SAP, Acumatica, MRPeasy, and a handful of similar
              platforms handle planning. That research mattered for one specific scope
              decision, which I'll get to in the second feature.
            </p>
          </div>
        </section>

        {/* Feature 1: Reservations */}
        <section className="next-section">
          <h2>Feature 1: Reservations</h2>
          <figure
            className="next-figure next-figure--portrait next-figure--thumb next-float-left"
            onClick={() =>
              openLightbox(
                `${ASSET_BASE}/via-resline_lifecycle.png`,
                'Reservation line lifecycle diagram',
                'Reservation line lifecycle: how quantity flows between Needed, Reserved, and Fulfilled'
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
              During discovery, we found that demand was coming from several different
              sources, each with its own stakeholders, timelines, and degrees of
              formality. Nothing was tracked in one place, and nothing prevented two
              people from independently committing the same inventory to different
              things.
            </p>
            <p>
              The first version of the reservation system shipped in March. It let users
              claim inventory that already existed in the warehouse, but anything users
              needed in the future, like a part that hadn't been ordered yet or materials
              for a production run six months out, lived somewhere else entirely. A few
              weeks later, once the Material Planner was released and started producing
              demand for those future parts, that split stopped making sense. Users could
              calculate what they needed and when, but they didn't have a place to note
              that they needed those parts. We rebuilt the reservation system to
              consolidate that type of demand capture into a reservation itself.
            </p>
            <p>
              For the redesign, we wanted users to understand the state of the parts they
              need at a glance on any reservation line. We landed on three quantity
              columns per line, rendered as a segmented progress bar. Needed shows what
              still has to be sourced. Reserved shows what's in current inventory and
              committed. Fulfilled shows what's been pulled and used. The colors and
              proportions of the bar tell the user the state of the line before they read
              any numbers.
            </p>
            <p>
              The alternative we considered was keeping a single-quantity model and adding
              a separate forecast entity for future demand, which would then feed into the
              reservation system once parts arrived. This was conceptually cleaner on a
              whiteboard, but it would have produced two sources of data doing essentially
              the same task. The three-column model takes more upfront explanation when
              someone first encounters it, but once a user gets that needed plus reserved
              plus fulfilled equals total requested, they can read any reservation in the
              system without instructions.
            </p>
            <figure
              className="next-figure next-figure--landscape next-figure--thumb next-float-right next-figure--desktop-only"
              onClick={() =>
                openLightbox(
                  `${ASSET_BASE}/via-resdetails.png`,
                  'Reservation detail page',
                  'Reservation detail page'
                )
              }
            >
              <img
                src={getAssetPath(`${ASSET_BASE}/via-resdetails.png`)}
                alt="Reservation detail page"
              />
            </figure>
            <p>
              We made one significant tradeoff: reservations operate at the part level,
              not the item level. A reservation says "we need 10 units of this part"
              rather than "we need these 10 specific items on the shelf." The system
              can't physically earmark inventory the way an item-level model could, which
              means it can't catch the case where two reservations both think they own the
              same physical box. We considered going to item level, but that would have
              required planners to know which specific items will exist months before
              those items exist. Asking planners to do something more rigorous than they'd
              ever done before, on day one, would have killed adoption of Harbor. We
              accepted the tradeoff and built three layers of automated checks to catch
              any inconsistencies it introduces.
            </p>
          </div>

          <h3 className="next-final-design next-final-design--no-clear">Final Design</h3>
          <div className="next-prose">
            <p>
              Across five lines, the segmented bars do most of the reading. Sourcing,
              partial, oversubscribed, complete, and cancelled each have a distinct
              visual signature, so the state of the reservation is legible before any
              numbers are parsed.
            </p>
          </div>
          <figure
            className="next-figure next-figure--landscape next-figure--mobile-only"
            onClick={() =>
              openLightbox(
                `${ASSET_BASE}/via-resdetails.png`,
                'Reservation detail page',
                'Reservation detail page'
              )
            }
          >
            <img
              src={getAssetPath(`${ASSET_BASE}/via-resdetails.png`)}
              alt="Reservation detail page"
            />
          </figure>
        </section>

        {/* Feature 2: Material Planner */}
        <section className="next-section">
          <h2>Feature 2: Material Planner</h2>
          <div className="next-prose">
            <p>
              Every time a client places an order, Via has to figure out what to procure
              or produce, and when to start. Before Harbor, that meant working through
              three separate workbooks, cross-referencing inventory by hand, and computing
              requirements at every level of the product hierarchy. The actual arithmetic
              isn't slow; the pain is that every new contract manufacturer needs its own
              copy of the workbooks, and every new product needs engineering involved to
              update them, so the manual workload compounds with every variable added.
            </p>
            <p>
              We could have shipped a simple bill-of-materials viewer with stock
              annotations and called it a day, since it would have satisfied the original
              brief. We deliberately chose not to. Looking at how SAP, Acumatica, and
              MRPeasy handle this surface, it became clear that the actual baseline for a
              useful planning view is a recursive calculation: start at the finished
              product, walk down the hierarchy, deduct available stock at every level.
              Without that calculation, the visibility surface is basically a static
              diagram. You can see the shape of things, but you can't actually plan with
              it.
            </p>
            <p>
              The design problem was how to present the output of that calculation
              without overwhelming a user who's trying to make a procurement decision in
              the next ten minutes. Each row needs to communicate gross demand, current
              stock, net requirement, lead time, order date, and need date, with
              substitutes and substitution status surfaced inline. That's a lot of
              information per row, and the obvious risk is that the screen turns into a
              wall of numbers.
            </p>
            <p>
              The decision that anchored the layout was treating the row as the unit of
              attention. A user reading a row is asking one question: is this part okay,
              or do I need to act on it. Everything in the row should answer that
              question fast. We rendered net requirement as a segmented coverage bar so
              the user can see how much of the demand is covered by stock and how much
              isn't. We colored the order date directly: red if it has already passed,
              orange if it's coming up, no color if the part is fully covered. Parts with
              missing lead times get a fourth color, a muted purple, to flag a data gap
              rather than imply urgency we can't actually compute.
            </p>
            <figure
              className="next-figure next-figure--portrait next-figure--xl next-float-right next-figure--desktop-only"
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
            </figure>
            <p>
              Substitutes were the trickier interaction. Some parts have approved
              alternatives the supply chain lead can swap to, and we wanted swapping to
              feel like part of the planning flow, not a detour. The substitute picker
              lives inline on the row. If a primary part is short and an approved
              substitute is in stock, the system pre-selects the substitute and marks it
              as auto-picked. The user can override with one click, and the calculation
              re-runs immediately. We considered a separate substitutes panel that would
              slide in from the side, but pulled back from it because it forced the user
              to leave the row they were reading to make a decision about that row.
            </p>
            <p>
              The main tradeoff in the calculation itself was that the planner doesn't
              account for incoming purchase orders or scheduled outflows the way a full
              enterprise system would. We deliberately chose not to account for this.
              Via's production runs span weeks or months, so the timing of next Tuesday's
              procurement matters much less than it would for a high-volume manufacturer
              running short cycles. The simpler model covers Via's realistic planning
              window and stays comprehensible to a user reading the screen. Procurement
              work itself stays with humans, because supplier negotiation and CM
              scheduling are conversations, not calculations.
            </p>
          </div>

          <h3 className="next-final-design next-final-design--no-clear">Final Design</h3>
          <div className="next-prose">
            <p>
              A row reads in one pass. The coverage bar shows how much of the demand is
              covered, the order date carries its own urgency color, and substitute
              status sits inline where the swap actually happens. Three ingredients are
              flagged for action; the rest can be ignored.
            </p>
          </div>
          <figure
            className="next-figure next-figure--portrait next-figure--mobile-only"
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
          </figure>
        </section>

        {/* Outcomes */}
        <section className="next-section">
          <h2>Outcomes</h2>
          <div className="next-prose">
            <p>
              Demand from across the organization is now tracked in one reservation
              system with line-level quantities visible at a glance. Planning that used to
              require copying and updating spreadsheets for every new production run runs
              off a single calculation that adapts to whatever bill of materials,
              alternative parts, and inventory situation exists at the time. Lead times,
              multi-level product structures, and shelf life data that used to live in
              people's memories is now data anyone authorized can query.
            </p>
            <p>
              Harbor didn't make anything dramatically faster on its own. Their
              spreadsheets worked at the current scale, and nobody was waiting hours for
              arithmetic. What changed is that the amount of manual work stopped
              compounding with every new variable. A new contract manufacturer used to
              mean a new copy of the workbooks. A new product meant pulling engineering in
              to update them. A new customer meant another set of cross-references to
              maintain by hand. Now adding one is just a data entry.
            </p>
          </div>
        </section>

        {/* Reflection */}
        <section className="next-section">
          <h2>Reflection</h2>
          <div className="next-prose">
            <p>
              The reservation system was the clearest case of shipping something that was
              right for what we knew when we built it and wrong for what we learned a few
              weeks later. The fix wasn't expensive once we made it, but the lesson is to
              ask the harder design question earlier. We didn't ask "what happens when
              this is used alongside a planning tool that produces forward-looking demand"
              until the planning tool existed. If we had, modeling demand and fulfillment
              as separate concerns from day one would have cost us less than rebuilding
              the model mid-engagement did.
            </p>
            <p>
              The other thing I learned was about how data density and visual density are
              completely different design problems. The Material Planner shows a lot of
              information per row and reads fine, because each piece of information
              answers a question the user is already asking when they look at that row.
              Other surfaces I worked on started visually sparse but were cognitively
              dense, because users had to hold a bunch of relationships in their head to
              make sense of what they were looking at. We iterated on those several times
              before they felt usable. From this, I realized that visual density isn't
              really about how much is on the screen; it's about whether what's actually
              on the screen lines up with what the user needs to know.
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
              NExT team photo at Via Separations HQ after our fi nal presentation!
            </figcaption>
          </figure>
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
