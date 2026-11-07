import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './design-sightline-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { usePageMode } from '../../hooks/usePageMode';
import { getAssetPath } from '../../utils/assetUtils';
import CaseStudyHero from '../page-components/CaseStudyHero';
import ImageLightbox from '../page-components/ImageLightbox';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { Icon } from '../page-components/IconSprite';

const SIGHTLINE = '/pictures/portfolio-content_spring2026/02_DESIGN/04_SIGHTLINE';

const summary = [
  { icon: 'i-person', label: 'Client', value: 'NASA-funded citizen science initiative' },
  { icon: 'i-target', label: 'Role', value: 'UX designer, with product design and UX research work' },
  { icon: 'i-modules', label: 'My focus', value: 'The disaster reporting flow' },
  { icon: 'i-person', label: 'Team', value: 'A project lead, a design lead, two designers and a team of developers' },
  { icon: 'i-pen', label: 'Tools', value: 'Figma' },
  { icon: 'i-columns', label: 'Timeline', value: 'Fall 2026' },
];

// The six apps the design team audited. `mine` marks the three I audited.
const competitors = [
  {
    name: 'FEMA',
    icon: 'icon-fema.png',
    mine: true,
    note:
      'Accessible design, large clear type and calm, human language. It works mainly as a top-down resource and recovery hub, with no real-time public reporting.',
  },
  {
    name: 'Watch Duty',
    icon: 'icon-watchduty.png',
    mine: true,
    note:
      'Our strongest reference for mapping several kinds of disaster at once. Its icons and shaded regions make active hazard boundaries easy to read.',
  },
  {
    name: 'MyShake',
    icon: 'icon-myshake.png',
    mine: true,
    note:
      'A counter-example. Safety instructions buried deep in the app and an inconsistent color system made it harder to use in an emergency.',
  },
  {
    name: 'Citizen',
    icon: 'icon-citizen.png',
    note:
      'Real-time safety alerts with high engagement. The constant notifications and live video overlays can make it overwhelming.',
  },
  {
    name: 'Genasys Protect',
    icon: 'icon-genasys.png',
    note:
      'Clear and simple for official evacuation zone alerts, with little room for the public to contribute data.',
  },
  {
    name: 'Waze',
    icon: 'icon-waze.png',
    note:
      'Community reporting done well. Drivers flag hazards from a quick grid of icons, and the app thanks them for helping people nearby.',
  },
];

// Token values sampled from the Sightline color page in Figma.
const tokenScales = [
  {
    name: 'Primary blue',
    role: 'Structure, primary actions and selected states',
    tokens: [
      { label: '700', hex: '#021D39' },
      { label: '600', hex: '#022D59' },
      { label: '500 Main', hex: '#054A91' },
      { label: '400', hex: '#0069D5' },
      { label: '300', hex: '#358FEC' },
      { label: '200 Secondary', hex: '#BBDEFF', light: true },
      { label: '100', hex: '#DEEFFE', light: true },
      { label: '50', hex: '#F3F9FF', light: true },
    ],
  },
  {
    name: 'Accent',
    role: 'Time-sensitive hazards, alerts and anything that needs attention',
    tokens: [
      { label: '400', hex: '#CB4700' },
      { label: '300', hex: '#E75A0E' },
      { label: '200', hex: '#FF8A4B', light: true },
      { label: '100', hex: '#FFC9AD', light: true },
      { label: '50', hex: '#FFEDE4', light: true },
    ],
  },
  {
    name: 'Text and neutrals',
    role: 'Body copy, borders and surfaces',
    tokens: [
      { label: '900', hex: '#110D07' },
      { label: '500', hex: '#271F16' },
      { label: '400', hex: '#4B443B' },
      { label: '300', hex: '#86827D' },
      { label: '200', hex: '#B9B9B9', light: true },
      { label: '100', hex: '#EEEEEE', light: true },
      { label: '50', hex: '#F9F9F9', light: true },
      { label: '20', hex: '#FEFFFF', light: true },
    ],
  },
  {
    name: 'Success',
    role: 'Confirmations and completed actions',
    tokens: [
      { label: '700', hex: '#0E3F00' },
      { label: '600', hex: '#175E04' },
      { label: '500', hex: '#34891D' },
      { label: '300', hex: '#5FB049' },
      { label: '100', hex: '#A5D399', light: true },
      { label: '50', hex: '#DAF3D3', light: true },
    ],
  },
];

// The mobile type hierarchy, each level in regular, medium and bold.
const typeScale = [
  { role: 'H1', size: 24, sample: 'Flooding reported near you' },
  { role: 'H2', size: 20, sample: 'Submerged vehicle details' },
  { role: 'Body', size: 16, sample: 'Neighbor’s vehicle is completely submerged under rainwater.' },
  { role: 'Sub', size: 12, sample: 'Level 3: Moderate · 1:28:14 PM' },
];

const quotes = [
  {
    text:
      'I think a user will feel more confident about reporting the things they see, since [evidence first] leads with asking a user what kind of natural disaster event and damage they are witnessing.',
    side: 'Evidence first',
  },
  {
    text:
      'Sometimes I don’t take photos of a situation, so I prefer to describe what I see first before submitting a photo.',
    side: 'Evidence first',
  },
  {
    text:
      'Images are more descriptive and I think can be more useful for data collection. People also may be confused with the disaster types if it doesn’t fall into a specific category.',
    side: 'Photos first',
  },
];

// User flows 1 and 2, rebuilt from the P0 scenarios board as boxes and
// arrows. Every row starts from the empty report form; `action` is the label
// on the arrow into a box. `system` marks screens the app shows rather than
// form states, and `added` marks the row that only applies to an active
// disaster.
type FlowStep = { action: string; label: string; system?: boolean };
type FlowRow = { steps: FlowStep[]; added?: boolean };

const sharedRows = (openDropdown: string): FlowRow[] => [
  {
    steps: [
      { action: openDropdown, label: 'Empty report, disaster type dropdown open' },
      { action: 'Click "Flooding"', label: 'Report with "Flooding" selected' },
    ],
  },
  {
    steps: [
      { action: 'Edit location', label: 'Report with location (editing)' },
      { action: 'Update', label: 'Report with updated location' },
    ],
  },
  {
    steps: [
      { action: 'Edit time', label: 'Report with time (editing)' },
      { action: 'Update', label: 'Report with updated time' },
      { action: 'Click add photos', label: 'Photo upload', system: true },
      { action: 'Add photos', label: 'Report with photos and empty description' },
      { action: 'Input description', label: 'Report with description (editing)' },
      { action: 'Update', label: 'Report with updated description' },
      { action: 'Click review', label: 'Read-only view of report', system: true },
    ],
  },
];

// Flows 1 and 2 share every step, so they're shown as one flow with the
// concern-type row labelled.
const userFlows: { title: string; rows: FlowRow[] }[] = [
  {
    title: 'User flow: filling out a disaster report',
    rows: [
      ...sharedRows('Edit disaster type'),
      {
        added: true,
        steps: [{ action: 'Select concern type', label: 'Report with concern type and follow-up questions' }],
      },
    ],
  },
];

// Overview screens: onboarding, the flood boundary map, the community feed
// and a report in progress.
const heroScreens = [
  { file: 'hero-onboarding.jpg', alt: 'Sightline onboarding: setting a new password', scroll: false },
  { file: 'hero-map.jpg', alt: 'Map of Boston with flood boundaries, a Start Report button and map filters', scroll: false },
  { file: 'hero-feed.jpg', alt: 'Community feed with a post about a water spillage, tagged Fenway and Flooding', scroll: false },
  { file: 'hero-report.jpg', alt: 'Disaster report for an impassable roadway with photos, location, time and severity', scroll: true },
];

const reviewFeatures = [
  {
    name: 'Searchable evidence types',
    note:
      'Users search a list of flooding evidence and can select several. If nothing fits, they can add what they typed as a new evidence type. Disaster type works the same way, though the MVP only covers flooding for now.',
  },
  {
    name: 'Details for each type',
    note:
      'Each evidence type gets its own page for photos, a description and a severity rating, with a counter like 1 of 2 so users know how much is left.',
  },
  {
    name: 'Location and time from the photo',
    note:
      'Location and time are filled in from the photo. An Edit button opens a map or time picker, and the field is marked as edited.',
  },
  {
    name: 'A report log to review',
    note:
      'Before submitting, users see every piece of evidence in one log, with an edit button on each and a note when an optional field is missing.',
  },
];

// The final reporting flow, exported screen by screen from Figma. Screens
// taller than a phone scroll inside a phone-height frame.
const flowSteps = [
  { file: 'final-1-disaster-type.jpg', label: 'Choose the disaster type', alt: 'Disaster type search with Flooding highlighted, above the question Is the disaster currently active?', scroll: false },
  { file: 'final-2-evidence-types.jpg', label: 'Pick the evidence types', alt: 'List of flooding evidence types, each with a short description and an icon', scroll: true },
  { file: 'final-3-evidence-search.jpg', label: 'Search or add a type', alt: 'Evidence search for Impass, showing Impassable Roadway and an option to add Impass as a new evidence type', scroll: false },
  { file: 'final-4-evidence-report.jpg', label: 'Add photos and details', alt: 'Impassable Roadway details: six photos, edited location and time, a description and a severity slider', scroll: true },
  { file: 'final-5-confirmation.jpg', label: 'Review the report log', alt: 'Flooding report log with Impassable Roadway expanded, noting one optional field missing, and Sinkhole collapsed', scroll: true },
  { file: 'final-6-success.jpg', label: 'Report submitted', alt: 'Report Submitted confirmation screen', scroll: false },
];

// Figtree is only used by the design system section, so it loads from here.
const FIGTREE_HREF =
  'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;700&display=swap';

export default function DesignSightlineCasestudy() {
  usePageMode({ initial: true });
  const { setDarkMode } = useDarkMode();
  const lightbox = useSingleImageLightbox();

  useEffect(() => {
    if (document.querySelector(`link[href="${FIGTREE_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FIGTREE_HREF;
    document.head.appendChild(link);
  }, []);

  // Dark navbar over the hero, light once the content reaches the top.
  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.sl-content');
      if (!content) return;
      setDarkMode(content.getBoundingClientRect().top > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDarkMode]);

  // Clickable figure that opens its image in the lightbox.
  const figure = (file: string, alt: string, caption?: string, className = '') => (
    <figure
      className={`sl-figure ${className}`.trim()}
      {...lightbox.trigger(getAssetPath(`${SIGHTLINE}/${file}`), alt)}
    >
      <img src={getAssetPath(`${SIGHTLINE}/${file}`)} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );

  // App screen in an iPhone frame. The screenshots already include the status
  // bar and Dynamic Island, so the frame is a bezel only. A screen taller than
  // a phone scrolls inside it. Clicking opens the full screen in the lightbox.
  // `hint` puts the scroll note under the phone; the final flow puts it under
  // each step's caption instead and passes false.
  const phone = (file: string, alt: string, scroll = false, hint = true) => (
    <>
    <figure
      className="sl-phone"
      {...lightbox.trigger(getAssetPath(`${SIGHTLINE}/${file}`), alt)}
    >
      <div className={`sl-phone-screen${scroll ? ' sl-phone-screen--scroll' : ''}`}>
        {/* width/height reserve a phone-shaped space until the image loads. */}
        <img
          src={getAssetPath(`${SIGHTLINE}/${file}`)}
          alt={alt}
          width={393}
          height={852}
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
    {scroll && hint && <p className="sl-phone-hint">Scroll to see the full screen</p>}
    </>
  );

  return (
    <main className="design-container sl-casestudy">
      <CaseStudyHero
        variant="sl"
        title={
          <>
            {/* Decorative: the title already names the app. */}
            <img
              className="sl-hero-logo"
              src={getAssetPath(`${SIGHTLINE}/sightline-logo.png`)}
              alt=""
              width={192}
              height={192}
            />
            Sightline: Designing a Citizen Science App for Disaster Reporting
          </>
        }
      >
        <div className="sl-snapshot">
          <h2 className="sl-snapshot-title">Quick Summary</h2>
          <div className="sl-cards">
            {summary.map(item => (
              <div key={item.label} className="sl-card">
                <h3>
                  <Icon id={item.icon} className="sl-card-icon" />
                  {item.label}
                </h3>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyHero>

      <div className="sl-content">

        {/* Overview */}
        <section className="sl-section">
          <h2>Overview</h2>
          <div className="sl-prose sl-prose--columns">
            <p>
              Sightline is a mobile app for reporting natural hazards, built for a
              NASA-funded citizen science initiative. Researchers on the project map
              where floodwater travels using National Weather Service data and share
              the results with state officials. Processing that data takes time, so it
              rarely reaches residents while it could still help them.
            </p>
            <p>
              Sightline sends information the other way. It alerts people when they
              are near a flood boundary, and it lets them report what they see with
              photos, a location and a description. Reports appear in a community feed
              and on a shared map, and researchers can use them to check and improve
              their models. The first phase focuses on flooding.
            </p>
            <p>
              I was a UX designer on a team with a project lead, a design lead, another
              designer and a team of developers. I owned the disaster reporting flow,
              from the first lo-fi through the version we tested with users. I also
              took on product design work, shaping what the reporting feature needed to
              include, and UX research, from competitor audits to the A/B test.
            </p>
          </div>
          <div className="sl-hero-phones sl-after">
            {heroScreens.map(screen => (
              <div key={screen.file} className="sl-step">
                {phone(screen.file, screen.alt, screen.scroll)}
              </div>
            ))}
          </div>
        </section>

        {/* Competitive Analysis */}
        <section className="sl-section">
          <h2>Competitive Analysis</h2>
          <div className="sl-prose">
            <p>
              We audited six apps that cover emergency alerts, crowd-sourced hazard
              maps and public safety interfaces, looking at information hierarchy,
              language and visual design. I audited FEMA, Watch Duty and MyShake.
            </p>
          </div>
          <ul className="sl-apps">
            {competitors.map(c => (
              <li key={c.name} className="sl-app">
                <img
                  className="sl-app-icon"
                  src={getAssetPath(`${SIGHTLINE}/${c.icon}`)}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                />
                <div>
                  <h3 className="sl-app-name">
                    {c.name}
                    {c.mine && <span className="sl-app-tag">My audit</span>}
                  </h3>
                  <p className="sl-app-note">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="sl-audits sl-after">
            {figure(
              'fema-audit.jpg',
              'Audit board for the FEMA app: annotated screens with notes on hierarchy, language and visual design',
              'My audit of FEMA'
            )}
            {figure(
              'watchduty-audit.jpg',
              'Audit board for Watch Duty: annotated map and alert screens with notes on hierarchy, language and visuals',
              'My audit of Watch Duty'
            )}
            {figure(
              'myshake-audit.jpg',
              'Audit board for MyShake: annotated screens noting buried safety content and an inconsistent color system',
              'My audit of MyShake'
            )}
          </div>
        </section>

        {/* Design System */}
        <section className="sl-section">
          <h2>Design System</h2>
          <div className="sl-intro">
            <div className="sl-prose">
              <p>
                Our team built the Sightline design system together, aiming for an
                interface that reads as trustworthy and stays legible under stress.
                Figtree is the typeface throughout, set in a four-level mobile hierarchy
                from 24px headings down to 12px supporting text.
              </p>
              <p>
                The primary blues carry structure and institutional trust, with Primary
                500 as the main action color. The orange accent is reserved for
                time-sensitive hazards and alerts, such as the emergency banner at the top
                of every report. High-contrast neutrals handle body copy, and a green
                success scale confirms completed actions.
              </p>
            </div>
            <figure className="sl-logo">
              <img
                className="sl-logo-mark"
                src={getAssetPath(`${SIGHTLINE}/sightline-logo.png`)}
                alt="Sightline app icon: a blue eye shape on a white rounded square"
                width={192}
                height={192}
                loading="lazy"
              />
              <figcaption className="sl-caption">
                Sightline logo developed by the design team
              </figcaption>
            </figure>
          </div>

          <div className="sl-system">
            <div className="sl-tokens">
              {tokenScales.map(scale => (
                <div key={scale.name} className="sl-scale">
                  <div className="sl-scale-head">
                    <h3>{scale.name}</h3>
                    <span>{scale.role}</span>
                  </div>
                  <ul className="sl-swatches">
                    {scale.tokens.map(token => (
                      <li
                        key={token.hex}
                        className={`sl-swatch${token.light ? ' sl-swatch--light' : ''}`}
                        style={{ backgroundColor: token.hex }}
                      >
                        <span className="sl-swatch-label">{token.label}</span>
                        <span className="sl-swatch-hex">{token.hex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="sl-typescale">
              <h3 className="sl-typescale-title">Figtree type hierarchy</h3>
              {typeScale.map(level => (
                <div key={level.role} className="sl-type-row">
                  <span className="sl-type-role">
                    {level.role}
                    <span>{level.size}px</span>
                  </span>
                  <span className="sl-type-samples" style={{ fontSize: `${level.size}px` }}>
                    <span className="sl-type-w400">{level.sample}</span>
                    <span className="sl-type-w500">{level.sample}</span>
                    <span className="sl-type-w700">{level.sample}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Research */}
        <section className="sl-section">
          <h2>User Research</h2>
          <div className="sl-prose sl-prose--columns">
            <p>
              Our primary user is a resident who comes across a hazard, such as rising
              floodwater, a power outage or a damaged building, and wants to report it
              quickly. They have no training as a field agent or emergency worker, so
              every step has to make sense the first time.
            </p>
            <p>
              Early client feedback asked for a clear difference between reporting
              during an ongoing disaster and following up afterward. We mapped both
              flows and found that they shared almost every step, and that a separate
              mode toggle would add a decision users had to make before they could
              report anything. We designed one flow that adapts to context: a single
              live observation during an event, or several evidence types reported
              together afterward.
            </p>
          </div>
          <div className="sl-flows sl-after">
            {userFlows.map(flow => (
              <div key={flow.title} className="sl-flow">
                <h3 className="sl-flow-title">{flow.title}</h3>
                <div className="sl-chart">
                  <div className="sl-box sl-box--start">
                    Empty report submission form
                    <span>Disaster type, location and time</span>
                  </div>
                  <div className="sl-chart-rows">
                    {flow.rows.map((row, r) => (
                      <ol
                        key={r}
                        className={`sl-chart-row${row.added ? ' sl-chart-row--added' : ''}`}
                      >
                        {row.steps.map(step => (
                          <li key={step.label} className="sl-chart-step">
                            <span className="sl-arrow">
                              <span className="sl-arrow-label">{step.action}</span>
                            </span>
                            <span className={`sl-box${step.system ? ' sl-box--system' : ''}`}>
                              {step.label}
                            </span>
                          </li>
                        ))}
                        {row.added && <li className="sl-chart-tag">Active-disaster only</li>}
                      </ol>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="sl-caption">
            The reporting flow. Blue boxes are screens the app shows; the rest are
            states of the report form.
          </p>
        </section>

        {/* Lo-fis and mid-fis */}
        <section className="sl-section">
          <h2>Lo-fis and Mid-fis</h2>
          <div className="sl-split">
            <div className="sl-prose">
              <p>
                I started the reporting flow with a five-screen lo-fi:
                pick a disaster type from a dropdown, check off what you're reporting,
                attach photos, confirm and submit. Keeping it simple let me test the
                order of steps before spending time on visuals.
              </p>
              <p>
                From there I iterated in mid-fidelity. Each round answered a question
                the last one raised:
                how to log several pieces of evidence in one report, what changes when
                a user is notified inside a flood boundary, how users add an evidence
                type that isn't on the list, and how to describe urgency so people
                rate it consistently. Between September 27 and October 15 I made more
                than 100 screens across six boards.
              </p>
            </div>
            {figure(
              'lofi-09-27.jpg',
              'Five-screen lo-fi of the reporting flow from September 27',
              'The first lo-fi, September 27'
            )}
          </div>

          <div className="sl-boards sl-after">
            {figure('midfi-09-28-v2.jpg', 'Mid-fi board from September 28 with two versions of the reporting flow', 'September 28')}
            {figure('midfi-10-05.jpg', 'Mid-fi board from October 5 to 8 mapping active and post-disaster branches of the flow', 'October 5 to 8')}
            {figure('iteration-10-9.jpg', 'Mid-fi board from October 9 covering adding and deleting an evidence type and editing location and time', 'October 9')}
            {figure('midfi-10-14-v2.jpg', 'Mid-fi board from October 14 with the disaster type grid and urgency levels', 'October 14')}
          </div>
          <p className="sl-caption">Mid-fi boards from four rounds of iteration</p>
        </section>

        {/* A/B Testing */}
        <section className="sl-section">
          <h2>A/B Testing the Evidence Flow</h2>
          <div className="sl-prose">
            <p>
              Through the mid-fis and into the hi-fis, we didn't know whether users
              would find it more natural to start with the evidence or with their
              photos. Reports can hold several pieces of evidence, so the order shaped
              the whole flow. We tested two versions with users. In mine, users choose what
              kind of evidence they are reporting and then add photos and details for
              each one. In the alternative, users attach all their photos first and then
              tag each photo with an evidence type.
            </p>
          </div>
          <div className="sl-ab">
            <div className="sl-ab-option sl-ab-option--chosen">
              <span className="sl-ab-label">Kept</span>
              <h3>Evidence first</h3>
              {figure('ab-evidence-first.jpg', 'Evidence-first flow: choose evidence types, then add photos, a description and urgency for each')}
            </div>
            <div className="sl-ab-option">
              <span className="sl-ab-label">Tested</span>
              <h3>Photos first</h3>
              {figure('ab-photos-first.jpg', 'Photos-first flow: attach all photos, then tag each one with an evidence type')}
            </div>
          </div>

          <div className="sl-prose sl-after">
            <p>
              We grouped the feedback on an affinity map. Fifteen notes favored evidence
              first and eight favored photos first. Testers said picking the problem
              first felt more intuitive, and that handling each piece of evidence on its
              own gave them more room to describe it. The case for photos first was
              real too: it matches how people take pictures in the moment, and a fixed
              list of categories felt restrictive to some. We kept evidence first, with
              an Other option so nobody is forced into a category that doesn't fit.
            </p>
          </div>

          <div className="sl-quotes">
            {quotes.map(q => (
              <blockquote key={q.text} className="sl-quote">
                <p>&ldquo;{q.text}&rdquo;</p>
                <cite>Tester who preferred {q.side.toLowerCase()}</cite>
              </blockquote>
            ))}
          </div>

          <div className="sl-grid-two sl-after">
            {figure('synthesis-evidence-first-v2.jpg', 'Affinity map notes from testers who preferred the evidence-first flow')}
            {figure('synthesis-photos-first-v2.jpg', 'Affinity map notes from testers who preferred the photos-first flow')}
          </div>
          <p className="sl-caption">
            Affinity map: notes favoring evidence first (left) and photos first (right)
          </p>
        </section>

        {/* Review and confirmation */}
        <section className="sl-section">
          <h2>The Final Reporting Flow</h2>
          <div className="sl-prose">
            <p>
              The final flow keeps evidence first and makes each step easier to get
              through, with more filled in automatically, clearer language for
              severity and a report log to check everything before submitting.
            </p>
          </div>
          <div className="sl-features">
            {reviewFeatures.map(feature => (
              <div key={feature.name} className="sl-feature">
                <h3>{feature.name}</h3>
                <p>{feature.note}</p>
              </div>
            ))}
          </div>
          <ol className="sl-steps">
            {flowSteps.map((step, i) => (
              <li key={step.file} className="sl-step">
                <span className="sl-step-label">
                  <span className="sl-step-num">{i + 1}</span>
                  {step.label}
                  {step.scroll && <span className="sl-step-hint">Scroll to see the full screen</span>}
                </span>
                {phone(step.file, step.alt, step.scroll, false)}
              </li>
            ))}
          </ol>
        </section>

        {/* Impact */}
        <section className="sl-section">
          <h2>Impact and Takeaways</h2>
          <div className="sl-prose sl-prose--columns">
            <p>
              Sightline shows how a clear interface hierarchy can turn community
              observations into structured data that researchers can use to track
              hazards.
            </p>
            <p>
              The main thing I learned is that in crisis design, each extra decision
              costs the user something. Dropping the mode toggle, building on an
              accessible design system with Figtree and high-contrast color tokens, and
              adding a final review step kept the data accurate while keeping the
              reporting flow quick for someone on the street.
            </p>
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
