import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './design-kahsay-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import { usePageMode } from '../../hooks/usePageMode';
import CaseStudyHero from '../page-components/CaseStudyHero';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { Icon } from '../page-components/IconSprite';
import AutoplayVideo from '../page-components/AutoplayVideo';

const KAHSAY = '/pictures/portfolio-content_spring2026/02_DESIGN/03_KAHSAY';

const summary = [
  { icon: 'i-person', label: 'Client', value: 'Kahsay' },
  { icon: 'i-modules', label: 'Type', value: 'Freelance brand and web design' },
  { icon: 'i-target', label: 'Role', value: 'Brand and web designer, sole designer on a small startup team' },
  { icon: 'i-pen', label: 'Tools', value: 'Figma, Adobe Illustrator, Photoshop, Wix' },
  { icon: 'i-columns', label: 'Timeline', value: 'May 2025 to September 2026' },
  { icon: 'i-monitor', label: 'Live site', value: 'kahsay.app', href: 'https://kahsay.app' },
];

const fMarks = [14, 15, 16, 18, 19, 20, 21, 24, 25];

const wordmarkTests = [
  { n: 14, font: 'Pier Sans' },
  { n: 15, font: 'Mori' },
  { n: 17, font: 'Hanken Grotesk' },
  { n: 19, font: 'Radio Grotesk, customized' },
];

// Three of the palette options from the color review. The final palette came
// out of the team's discussion of these and isn't one of them. The first
// swatch is the primary color.
// `mockup` drives the live app layout mockup under each palette: the pill
// colors, and the fill colors of its three meters in order.
const palettes = [
  {
    name: 'Option 1',
    swatches: [
      { label: 'Oxblood', hex: '#7C2D34' },
      { label: 'Deep Teal', hex: '#2E6B67' },
      { label: 'Honey', hex: '#DDA96B' },
      { label: 'Cream', hex: '#F7F3EE' },
      { label: 'Wine Ink', hex: '#2B2020' },
    ],
    mockup: {
      dish: 'Uni Pasta',
      meta: 'Italian-Japanese · Creamy · Briny',
      match: 94,
      blurb: 'A bold step from your usuals, but the silky, oceanic richness fits what you already love.',
      filter: 'Shellfish-free',
      pill: { bg: '#2E6B67', fg: '#F7F3EE' },
      meters: ['#7C2D34', '#2E6B67', '#DDA96B'],
    },
  },
  {
    name: 'Option 2',
    swatches: [
      { label: 'Deliberate Plum', hex: '#5D325A' },
      { label: 'Saffron', hex: '#FBAD4D' },
      { label: 'Sage', hex: '#B9CB66' },
      { label: 'Warm Bone', hex: '#F5F1EA' },
      { label: 'Deep Aubergine Ink', hex: '#241E28' },
    ],
    mockup: {
      dish: 'Miso Black Cod',
      meta: 'Japanese · Broiled · Umami-forward',
      match: 96,
      blurb: 'New to you, but it lands right inside your taste profile. Rich, buttery, and a little sweet.',
      filter: 'Nut-free',
      pill: { bg: '#FBAD4D', fg: '#241E28' },
      meters: ['#FBAD4D', '#B9CB66', '#5D325A'],
    },
  },
  {
    name: 'Option 3',
    swatches: [
      { label: 'Deep Clay', hex: '#9C4A32' },
      { label: 'Forest Sage', hex: '#4C6152' },
      { label: 'Soft Wheat', hex: '#D8B88C' },
      { label: 'Warm Ivory', hex: '#F6F2EC' },
      { label: 'Espresso', hex: '#2C2521' },
    ],
    mockup: {
      dish: 'Birria Tacos',
      meta: 'Mexican · Braised · Rich & savory',
      match: 95,
      blurb: 'Deeply savory and a little indulgent. A new find that still sits comfortably in your comfort zone.',
      filter: 'Dairy-free',
      pill: { bg: '#D8B88C', fg: '#2C2521' },
      meters: ['#D8B88C', '#4C6152', '#9C4A32'],
    },
  },
];

// Display typefaces from the type review, set live. Each is paired with Plus
// Jakarta Sans for body text. Tilt Warp ships in one weight, so it is set at
// 400 to avoid a synthesized bold.
// The final brand guidelines, rebuilt from the guideline pages delivered to
// the client. Burnt Sienna reads #BC4A22 on the original page, but its swatch
// there is #8C4A22, which is used here.
const guideColors = [
  {
    name: 'Emeralds',
    role: 'Primary accent',
    colors: [
      { name: 'Pine', hex: '#0F5C46', use: 'Primary, CTAs' },
      { name: 'Deep Spruce', hex: '#0A4133', use: 'On-tint text' },
      { name: 'Jade', hex: '#1A7A5E', use: 'Hover state' },
      { name: 'Pale Eucalyptus', hex: '#E2ECE7', use: 'Tinted surfaces' },
    ],
  },
  {
    name: 'Coppers',
    role: 'Secondary accent',
    colors: [
      { name: 'Burnt Copper', hex: '#A85C2E', use: 'Food CTAs' },
      { name: 'Burnt Sienna', hex: '#8C4A22', use: 'Hover state' },
      { name: 'Pink Clay', hex: '#F1E2D6', use: 'Tinted surfaces' },
    ],
  },
  {
    name: 'Champagnes',
    role: 'Tertiary accent for foodies',
    colors: [
      { name: 'Wheat', hex: '#D9C08A', use: 'Premium CTAs' },
      { name: 'Bronze Olive', hex: '#8C6D22', use: 'Text and icons on Wheat' },
      { name: 'Vanilla Cream', hex: '#F6EEDD', use: 'Tinted surfaces' },
      { name: 'Oat', hex: '#EFE3D0', use: 'Alternative surfaces' },
    ],
  },
  {
    name: 'Neutrals',
    role: 'Text, borders, background',
    colors: [
      { name: 'Ink', hex: '#1F2420', use: 'Body text' },
      { name: 'Ink Soft', hex: '#3F4741', use: 'Secondary text' },
      { name: 'Muted Ink', hex: '#6F7872', use: 'Muted text' },
      { name: 'Pale Ink', hex: '#A6ADA8', use: 'Inactive and disabled text' },
      { name: 'Warm Ivory', hex: '#FAF6EF', use: 'Background' },
    ],
  },
];

const guideFaces = [
  { id: 'onest', name: 'Onest', role: 'is our typeface for display text.' },
  { id: 'jakarta', name: 'Plus Jakarta Sans', role: 'is our typeface for body text.' },
];

const guideScale = [
  {
    id: 'headline',
    role: 'Headline',
    sample: 'Discover your next favorite dish.',
    spec: 'Onest ExtraBold, -40 letter-spacing',
  },
  {
    id: 'header',
    role: 'Header',
    sample: 'Your tastes, mapped.',
    spec: 'Onest Bold, -40 letter-spacing',
  },
  {
    id: 'subheader',
    role: 'Subheader',
    sample: 'A look at where your palate has traveled this year.',
    spec: 'Onest SemiBold, -40 letter-spacing',
  },
  {
    id: 'paragraph',
    role: 'Paragraph',
    sample:
      "Every dish you rate tells us a little more about what you love. Over time those ratings turn into a map, one that shows the cuisines you keep coming back to and the corners of the world your palate hasn't reached yet. The more you log, the clearer the picture gets, and the easier it becomes to find your next favorite meal.",
    spec: 'Plus Jakarta Sans Regular, -40 letter-spacing',
  },
  {
    id: 'label',
    role: 'Label',
    sample: 'Portuguese · Dessert',
    spec: 'Plus Jakarta Sans SemiBold, -40 letter-spacing',
  },
  {
    id: 'button',
    role: 'Button',
    sample: '',
    spec: 'Plus Jakarta Sans Medium, -20 letter-spacing',
  },
];

const voiceDo = [
  'Tonight, something new: Black Cod',
  "A little outside your usual. You're ready for it.",
  "This one's a little different. We think it's for you.",
];

const voiceDont = [
  { line: 'Order now. Get the lamb.', why: 'Too authoritative' },
  { line: 'How about your usual?', why: 'Too safe and familiar' },
  { line: 'Here are five dishes you might like:', why: "We aren't just a menu of options" },
  { line: 'Based on your flavor profile, our algorithm recommends…', why: 'The machinery is talking' },
  { line: 'We are SO excited to help you discover amazing new dishes!!', why: 'Too eager, loud, and padded' },
];

const voiceLexicon = {
  use: "Tonight. A departure. Outside your usual. You're ready. Worth the detour. For you. The one. Discover.",
  avoid:
    'Algorithm. Engine. Based on your preferences. Based on your flavor profile. Curated. Amazing. Revolutionary. Incredible.',
};

const voiceMechanics = [
  'Sentence casing',
  'Short lines',
  'Fragmented phrases',
  'Light use of contractions',
  'Colon and period set rhythm',
  'No exclamation marks',
  'Oxford comma',
  'No emojis (excluding social media)',
  'Numerals for $, times, counts',
  'Spell out numbers 1 to 9',
  'Numerals for 10 and up',
];

// The three meters on the mockup's filter screen, with how full each bar is.
const mockupMeters = [
  { label: 'Match to your palate', value: 'High', fill: 92 },
  { label: 'Adventurousness', value: 'Medium', fill: 58 },
  { label: 'Spice level', value: 'Low', fill: 18 },
];

const typefaces = [
  { name: 'DM Sans', stack: '"DM Sans", sans-serif', weight: 700 },
  { name: 'Tilt Warp', stack: '"Tilt Warp", sans-serif', weight: 400 },
  { name: 'Gabarito', stack: '"Gabarito", sans-serif', weight: 700 },
];

// Fonts used only by the type specimens and the guidelines. Loaded from this
// page so the rest of the site doesn't download them. DM Sans is already
// loaded site-wide.
const SPECIMEN_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Gabarito:wght@700&family=Onest:wght@600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Tilt+Warp&display=swap';

export default function DesignKahsayCasestudy() {
  usePageMode({ initial: true });

  useEffect(() => {
    if (document.querySelector(`link[href="${SPECIMEN_FONTS_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = SPECIMEN_FONTS_HREF;
    document.head.appendChild(link);
  }, []);
  const { setDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.ks-content');
      if (!content) return;
      const contentInView = content.getBoundingClientRect().top <= 0;
      setDarkMode(!contentInView);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDarkMode]);

  const lightbox = useSingleImageLightbox();

  // Clickable figure that opens its own image in the lightbox. Everything
  // below the hero is lazy-loaded.
  const figure = (file: string, alt: string, caption?: string, className = '') => (
    <figure
      className={`ks-figure ${className}`.trim()}
      {...lightbox.trigger(getAssetPath(`${KAHSAY}/${file}`), alt)}
    >
      <img
        src={getAssetPath(`${KAHSAY}/${file}`)}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );

  // Site screenshot set inside a laptop or phone frame. Opens in the lightbox
  // like any other figure.
  const deviceShot = (
    file: string,
    alt: string,
    device: 'laptop' | 'phone',
    className = '',
    caption?: string
  ) => (
    <figure
      className={`ks-figure ks-device ks-device--${device} ${className}`.trim()}
      {...lightbox.trigger(getAssetPath(`${KAHSAY}/${file}`), alt)}
    >
      <div className="ks-device-screen">
        <img
          src={getAssetPath(`${KAHSAY}/${file}`)}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );

  // Screen recording playing inside a laptop or phone frame.
  const deviceVideo = (file: string, device: 'laptop' | 'phone', className = '') => (
    <div className={`ks-device ks-device--${device} ${className}`.trim()}>
      <AutoplayVideo src={`${KAHSAY}/${file}`} className="ks-device-screen" />
    </div>
  );

  // App layout mockup in one palette: a dish recommendation card and a filter
  // screen, built live so the colors are exact. Decorative, so it is exposed
  // to screen readers as a single labelled image.
  const mockup = (palette: (typeof palettes)[number]) => {
    const [primary, , , bg, ink] = palette.swatches.map(sw => sw.hex);
    const m = palette.mockup;
    const vars = {
      '--m-primary': primary,
      '--m-bg': bg,
      '--m-ink': ink,
      '--m-pill-bg': m.pill.bg,
      '--m-pill-fg': m.pill.fg,
    } as React.CSSProperties;
    return (
      <div
        className="ks-mock"
        style={vars}
        role="img"
        aria-label={`${palette.name} app layout mockup: a ${m.dish} recommendation card and a filter screen`}
      >
        <div className="ks-mock-card" aria-hidden="true">
          <div className="ks-mock-head">
            <span className="ks-mock-pill">Adventurous pick</span>
          </div>
          <div className="ks-mock-body">
            <span className="ks-mock-title">{m.dish}</span>
            <span className="ks-mock-meta">{m.meta}</span>
            <span className="ks-mock-match">{m.match}% palate match</span>
            <span className="ks-mock-blurb">{m.blurb}</span>
            <span className="ks-mock-actions">
              <span className="ks-mock-btn">Find it nearby</span>
              <span className="ks-mock-btn ks-mock-btn--ghost">Save</span>
            </span>
          </div>
        </div>

        <div className="ks-mock-card ks-mock-body" aria-hidden="true">
          <span className="ks-mock-kicker">Tonight's picks</span>
          <span className="ks-mock-title">Chosen for you</span>
          <span className="ks-mock-meta">
            Omakase-style. We make the call so you don't have to.
          </span>
          <span className="ks-mock-label">Filters</span>
          <span className="ks-mock-chips">
            {[m.filter, 'Spicy', 'Under $25', 'Veg'].map((chip, i) => (
              <span key={chip} className={`ks-mock-chip${i === 0 ? ' ks-mock-chip--on' : ''}`}>
                {chip}
              </span>
            ))}
          </span>
          {mockupMeters.map((meter, i) => (
            <span key={meter.label} className="ks-mock-meter">
              <span className="ks-mock-meter-row">
                <span>{meter.label}</span>
                <span>{meter.value}</span>
              </span>
              <span className="ks-mock-track">
                <span
                  className="ks-mock-fill"
                  style={{ width: `${meter.fill}%`, backgroundColor: m.meters[i] }}
                />
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="design-container ks-casestudy">
      <CaseStudyHero
        variant="ks"
        title="Kahsay: Designing a brand identity for a foodtech startup"
      >
        <div className="ks-snapshot">
          <h2 className="ks-snapshot-title">Quick Summary</h2>
          <div className="ks-cards">
            {summary.map(item => (
              <div key={item.label} className="ks-card">
                <h3>
                  <Icon id={item.icon} className="ks-card-icon" />
                  {item.label}
                </h3>
                <p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyHero>

      <div className="ks-content">

        {/* Overview */}
        <section className="ks-section">
          <h2>Overview</h2>
          <div className="ks-prose ks-prose--columns">
            <p>
              Kahsay is a food discovery app, live on iOS and Android. It learns your
              flavor profile through short games, then recommends dishes you're likely
              to love and the nearby restaurants that serve them.
            </p>
            <p>
              Kahsay hired me to design a logo. Over 16 months the work grew into the
              logo, the wordmark, brand guidelines, and the marketing site. My client's
              vision for the brand was modern and tech-forward. Because the product is
              about taste, I also wanted it to feel warm and personal. Balancing those
              two goals shaped most of the work. I documented each recommendation with
              research and side-by-side comparisons so the team could weigh the options
              together.
            </p>
          </div>
          {deviceShot('desktop-hero.jpg', 'Kahsay marketing site, desktop hero', 'laptop', 'ks-figure--full')}
        </section>

        {/* Logo */}
        <section className="ks-section">
          <h2>Logo</h2>
          <div className="ks-prose ks-prose--narrow">
            <p>
              When the app was still called Flavorly, my client asked for a typographic
              F. I explored a range of F marks and also pitched a friendly tongue
              character. The team chose the tongue.
            </p>
          </div>

          <div className="ks-logo-explore">
            {figure('flavorly-sketches.jpg', 'Flavorly F sketches', 'F sketches')}
            <div className="ks-fgrid">
              {fMarks.map(n => (
                <React.Fragment key={n}>
                  {figure(`flavorly-f-${n}.jpg`, 'Flavorly F mark exploration')}
                </React.Fragment>
              ))}
              <p className="ks-caption ks-fgrid-caption">Digital F marks</p>
            </div>
            {figure('tongue-logo.png', 'The tongue logo', 'The tongue', 'ks-figure--tongue')}
          </div>

          <div className="ks-split">
            <div className="ks-prose">
              <p>
                Later the product was renamed after omakase, the Japanese tradition of
                letting the chef choose your meal, and I suggested shortening the name
                to Kahsay. The new name called for a more refined direction, so we
                revisited whether the tongue still fit. I proposed OMA, a bloodhound. A
                bloodhound finds what nobody else can, which is roughly what the app
                does. OMA could also become the AI assistant the team was planning, the
                way Duolingo's owl talks to its users.
              </p>
            </div>
            <div className="ks-oma">
              {figure('oma-logo.jpg', 'OMA, the bloodhound mascot', 'OMA')}
              {figure('oma-wordmark.jpg', 'OMA with the Kahsay wordmark', 'OMA with the wordmark')}
            </div>
          </div>

          <div className="ks-prose ks-prose--columns ks-after-figure">
            <p>
              OMA launched during our first two rounds of app testing with about 50 to
              70 friends and family, who sent feedback through an in-app button. We
              weren't testing the mascot, but people noticed the switch. Most comments
              about it said the same thing: they didn't understand why it was a dog,
              and they wanted the tongue back. So we went back to it.
            </p>
            <p>
              The bloodhound made sense once you heard the explanation, and the tongue
              didn't need one. OMA answered the team's goals of elevating the brand and
              preparing for a chat assistant. It didn't answer the user's first
              question, which was what this app is about. For a product built on taste,
              a warm and obvious cue did more than a metaphor users had to work out.
            </p>
          </div>
        </section>

        {/* Wordmark */}
        <section className="ks-section">
          <h2>Wordmark</h2>
          <div className="ks-prose ks-prose--columns">
            <p>
              Before recommending typefaces, I wrote up research on how letterforms
              shape what people expect food to taste like, along with a review of how
              food apps brand themselves. One study I cited, The Taste of Typeface
              (2015), found that people associate rounded type with sweetness and
              angular type with bitter, salty and sour flavors. Delivery apps like
              DoorDash and Uber Eats use minimal sans serifs that signal speed, while
              recommendation products lean toward warmer type. I presented options
              ranging from plain text to versions with a custom detail. My client chose
              a clean, plain-text wordmark set in Plus Jakarta Sans, in line with the
              modern direction they had in mind from the start.
            </p>
          </div>
          <div className="ks-grid ks-grid--four">
            {wordmarkTests.map(t => (
              <React.Fragment key={t.n}>
                {figure(`wordmark-test-${t.n}.jpg`, `Wordmark test in ${t.font}`, t.font)}
              </React.Fragment>
            ))}
          </div>
          {figure('final-wordmark.jpg', 'Final Kahsay wordmark with tagline', 'Final wordmark, Plus Jakarta Sans', 'ks-figure--wordmark')}
        </section>

        {/* Brand Guidelines */}
        <section className="ks-section">
          <h2>Brand Guidelines</h2>

          <div className="ks-split">
            <div className="ks-prose">
              <p>
                Partway through the project, I ran a brand positioning exercise. Each of
                the five team members, including me, rated where Kahsay should sit on
                seven scales, such as tech-forward versus warm and human, or adventurous
                versus reassuring. Everyone also named brands Kahsay should and
                shouldn't resemble. Most responses leaned toward warm and human, and the
                widest range of answers was on adventure versus reassurance. I combined
                the responses into a list of traits, each paired with its limit, such as
                "curated, but not exclusive" and "confident, but not loud."
              </p>
            </div>
            {figure(
              'positioning-question.png',
              'Brand positioning exercise form: the Precision vs. Craving scale, rated 1 to 5',
              'One of the seven scales'
            )}
          </div>

          <div className="ks-grid ks-grid--three">
            {figure(
              'positioning-chart-human.png',
              'Team responses on Tech-forward vs. Human: three of five rated 5, toward human'
            )}
            {figure(
              'positioning-chart-bold.png',
              'Team responses on Understated vs. Bold: answers split between 3 and 5'
            )}
            {figure(
              'positioning-chart-adventurous.png',
              'Team responses on Adventurous vs. Reassuring: one answer at each point from 1 to 5'
            )}
          </div>
          <p className="ks-caption ks-caption--block">Team responses on three of the scales</p>

          <div className="ks-subsection">
            <div className="ks-prose">
              <p>
                Alongside that, I ran a color and type review. I presented six palettes
                and four display typefaces paired with Plus Jakarta Sans, with more than
                a dozen rejected options in an appendix. Every palette met WCAG AA
                contrast standards. For the three strongest palettes, I used Claude to
                build quick app layout mockups, which let the team compare each one as
                it would look in the product.
              </p>
            </div>

            <div className="ks-palettes">
              {palettes.map(palette => (
                <div key={palette.name} className="ks-palette">
                  <h3 className="ks-palette-name">{palette.name}</h3>
                  <ul className="ks-dots">
                    {palette.swatches.map(swatch => (
                      <li key={swatch.hex} className="ks-dot">
                        <span
                          className="ks-dot-chip"
                          style={{ backgroundColor: swatch.hex }}
                          title={swatch.label}
                        />
                        <span className="ks-dot-hex">{swatch.hex}</span>
                      </li>
                    ))}
                  </ul>
                  {mockup(palette)}
                </div>
              ))}
            </div>
            <p className="ks-caption ks-caption--block">
              Three of the palette options the team discussed
            </p>

            <h3 className="ks-center-title">Display typeface options</h3>
            <div className="ks-typefaces">
              {typefaces.map(face => (
                <div
                  key={face.name}
                  className="ks-typeface"
                  style={{
                    '--ks-display': face.stack,
                    '--ks-display-weight': face.weight,
                  } as React.CSSProperties}
                >
                  <h3 className="ks-type-name">{face.name}</h3>
                  <span className="ks-type-pairing">with Plus Jakarta Sans</span>
                  <span className="ks-type-alphabet" aria-hidden="true">
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx
                    Yy Zz
                  </span>
                  <span className="ks-type-headline">
                    Discover your <em>next favorite dish.</em>
                  </span>
                  <span className="ks-type-sub">
                    Recommendations powered by <em>your</em> flavor profile.
                  </span>
                  <span className="ks-type-body">
                    Kahsay is named after <em>omakase</em>, which is Japanese for "I'll
                    leave it up to you." We were tired of wasting time trying to find that
                    hidden gem, so we built the solution.
                  </span>
                  <span className="ks-type-body ks-type-body--strong">Leave it up to Kahsay!</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ks-subsection">
            <h3 className="ks-center-title">Final Color &amp; Type Identity</h3>
            <div className="ks-guide">
              <div className="ks-guide-intro">
                <div className="ks-guide-colors-block">
                  <div className="ks-guide-colors">
                    {guideColors.map(group => (
                      <div key={group.name} className="ks-guide-group">
                        <h4 className="ks-guide-group-name">{group.name}</h4>
                        <span className="ks-guide-group-role">{group.role}</span>
                        <ul className="ks-guide-swatches">
                          {group.colors.map(color => (
                            <li key={color.hex} className="ks-guide-swatch">
                              <span
                                className="ks-guide-chip"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span className="ks-guide-swatch-text">
                                <span className="ks-guide-swatch-name">{color.name}</span>
                                <span className="ks-guide-swatch-hex">{color.hex}</span>
                                <span className="ks-guide-swatch-use">{color.use}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ks-prose">
                  <p>
                    The final system uses emerald greens as the primary palette, with
                    copper, champagne and warm neutral accents. Onest is the display
                    typeface and Plus Jakarta Sans handles body text. The app's interface now
                    pulls from these guidelines. The red logo came before the palette, and
                    we kept it separate because the tongue only reads as a tongue in red,
                    and red is a common appetite cue in food branding.
                  </p>
                </div>
              </div>

              <div className="ks-guide-type">
                <div className="ks-guide-faces">
                  {guideFaces.map(face => (
                    <div key={face.name} className={`ks-guide-face ks-guide-face--${face.id}`}>
                      <h4 className="ks-guide-face-name">{face.name}</h4>
                      <span className="ks-guide-face-role">{face.role}</span>
                      <span className="ks-guide-face-glyphs" aria-hidden="true">
                        Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv
                        Ww Xx Yy Zz
                        <br />
                        0 1 2 3 4 5 6 7 8 9
                        <br />
                        ! @ # $ % ^ &amp; * ( ) : ; . , &ldquo; &rdquo;
                      </span>
                    </div>
                  ))}
                </div>

                <div className="ks-guide-scale">
                  {guideScale.map(level => (
                    <div key={level.role} className="ks-guide-level">
                      <span className="ks-guide-level-role">{level.role}</span>
                      <div className="ks-guide-level-sample">
                        {level.role === 'Button' ? (
                          <span className="ks-guide-buttons">
                            <span className="ks-guide-btn">Click here</span>
                            <span className="ks-guide-btn ks-guide-btn--copper">Learn more</span>
                          </span>
                        ) : (
                          <span className={`ks-guide-sample ks-guide-sample--${level.id}`}>
                            {level.sample}
                          </span>
                        )}
                        <span className="ks-guide-level-spec">{level.spec}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ks-subsection">
            <h3 className="ks-center-title">Verbal identity</h3>
            <div className="ks-split ks-split--voice">
              <div>
                <div className="ks-prose">
                  <p>
                    I also wrote the verbal identity. It comes down to one rule: point,
                    don't push. Kahsay recommends a dish with confidence and leaves the
                    choice to the user, so it says "A little outside your usual. You're
                    ready for it." rather than "Order now."
                  </p>
                </div>

                <div className="ks-voice-cards">
                  <div className="ks-voice-card ks-voice-card--do">
                    <h4 className="ks-voice-card-title">We sound like&hellip;</h4>
                    <ul>
                      {voiceDo.map(line => (
                        <li key={line}>&ldquo;{line}&rdquo;</li>
                      ))}
                    </ul>
                  </div>
                  <div className="ks-voice-card ks-voice-card--dont">
                    <h4 className="ks-voice-card-title">We don't sound like&hellip;</h4>
                    <ul>
                      {voiceDont.map(item => (
                        <li key={item.line}>
                          &ldquo;{item.line}&rdquo; <span className="ks-voice-why">({item.why})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ks-voice-rules">
                <div className="ks-voice-rule">
                  <h4 className="ks-voice-rule-title">Lexicon</h4>
                  <span className="ks-voice-rule-text">
                    <strong>Words we use:</strong> {voiceLexicon.use}
                  </span>
                  <span className="ks-voice-rule-text">
                    <strong>Words we avoid:</strong> {voiceLexicon.avoid}
                  </span>
                </div>
                <div className="ks-voice-rule">
                  <h4 className="ks-voice-rule-title">Grammar &amp; mechanics</h4>
                  <ul className="ks-voice-mechanics">
                    {voiceMechanics.map(rule => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Landing Page */}
        <section className="ks-section">
          <h2>Landing Page</h2>
          <div className="ks-split">
            <div className="ks-prose">
              <p>
                The site explains the app quickly and sends visitors to the App Store or
                Google Play. It opens with the headline and download buttons beside a
                phone showing a dish recommendation. From there it moves through
                features, testimonials, the story behind the name, and an FAQ. I designed
                separate desktop and mobile layouts in Figma and built the site in Wix.
                The photography is stock. The app screens in the phone mockups were
                produced by the product team, and the site around them is my work.
              </p>
            </div>
            {deviceShot(
              'desktop-about.jpg',
              'Kahsay site on desktop: the about section explaining the name',
              'laptop'
            )}
          </div>

          {/* The recordings cover every section of both layouts, so they stand in
              for the individual screenshots. */}
          <div className="ks-recordings">
            {deviceVideo('desktop-recording.mp4', 'laptop')}
            {deviceVideo('mobile-recording.mp4', 'phone')}
          </div>
        </section>

        {/* Looking Back */}
        <section className="ks-section">
          <div className="ks-inline-head">
            <h2>Looking Back</h2>
            <div className="ks-prose">
              <p>
                I ran the positioning exercise about 14 months into the project. Next
                time I would run it first, along with a written brief. Without either in
                place early on, the exercise brought out different views on what the
                brand should look like later in the process than was ideal. Starting
                with both would have given the team a shared reference point for
                decisions like the logo and the mascot, instead of working through them
                one at a time. I now treat a brief and a positioning exercise as the
                first step of any brand project.
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
