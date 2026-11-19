import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './design-sinsear-casestudy.css';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import { usePageMode } from '../../hooks/usePageMode';
import CaseStudyHero from '../page-components/CaseStudyHero';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { Icon } from '../page-components/IconSprite';
import { useDarkMode } from '../../contexts/DarkModeContext';

const SINSEAR = '/pictures/portfolio-content_spring2026/02_DESIGN/06_SINSEAR';

const summary = [
  { icon: 'i-person', label: 'Course', value: 'ARTG 3460, Northeastern University' },
  { icon: 'i-modules', label: 'Type', value: 'Class project, beverage brand and launch campaign' },
  { icon: 'i-target', label: 'Role', value: 'Brand designer, working with a design partner' },
  { icon: 'i-pen', label: 'Tools', value: 'Adobe Illustrator, Photoshop' },
  { icon: 'i-columns', label: 'Timeline', value: 'Two weeks, September to October 2026' },
  { icon: 'i-card', label: 'Deliverable', value: 'Six-page 11x17 brand launch presentation' },
];

// Sampled from the final logo and label artwork.
const palette = [
  { name: 'Sinsear Yellow', hex: '#F4EC30', role: 'Background' },
  { name: 'Sear Red', hex: '#E42828', role: 'Lips, wordmark, calls to action' },
  { name: 'Flame Green', hex: '#8CC440', role: 'Inner flames and the gums' },
  { name: 'Char', hex: '#101814', role: 'Mouth and body copy' },
  { name: 'Flame Orange', hex: '#E08410', role: 'Flame pattern artwork' },
];

const flavors = ['Glacier Cherry', 'Verdict Blue', 'Sworn Grape', 'Flashpoint Lime', 'Confession Punch'];

// First round and final presentation versions of each touchpoint.
const revisions = [
  {
    name: 'Wall ad',
    draft: 'draft-wallad.jpg',
    final: 'final-wallad.jpg',
  },
  {
    name: 'Storefront',
    draft: 'draft-liquorstore.jpg',
    final: 'final-liquorstore.jpg',
  },
  {
    name: 'Social',
    draft: 'draft-social.jpg',
    final: 'final-social.jpg',
  },
  {
    name: 'Six-pack',
    draft: 'draft-sixpack.jpg',
    final: 'final-sixpack.jpg',
  },
];

// Images on a white background or with white margins. They are multiplied
// onto the page so the white takes on the cream behind it.
const MULTIPLY = new Set([
  'sketch-mood-drink-v2.jpg',
  'sketch-mouth-on-fire-v2.jpg',
  'logo-sketch-v2.jpg',
  'moodboard-amy.jpg',
  'draft-social.jpg',
  'draft-sixpack.jpg',
  'final-social.jpg',
  'final-sixpack.jpg',
]);

// Display and body faces from the brand, loaded only on this page.
const BRAND_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=42dot+Sans:wght@400;700&family=Special+Gothic+Condensed+One&family=Special+Gothic+Expanded+One&display=swap';

export default function DesignSinsearCasestudy() {
  // The navbar goes dark over the yellow hero and light over the cream
  // content.
  usePageMode({ initial: true });
  const { setDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      // Just below the navbar's bottom edge; whichever surface sits there
      // decides the mode.
      const nav = document.querySelector('.site');
      const probe = (nav ? nav.getBoundingClientRect().bottom : 0) + 1;
      const hero = document.querySelector('.ss-hero');
      const r = hero ? hero.getBoundingClientRect() : null;
      setDarkMode(Boolean(r && r.top <= probe && r.bottom > probe));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setDarkMode]);

  useEffect(() => {
    if (document.querySelector(`link[href="${BRAND_FONTS_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BRAND_FONTS_HREF;
    document.head.appendChild(link);
  }, []);

  const lightbox = useSingleImageLightbox();

  const figure = (file: string, alt: string, caption?: string, className = '') => (
    <figure
      className={`ss-figure ${MULTIPLY.has(file) ? 'ss-figure--multiply ' : ''}${className}`.trim()}
      {...lightbox.trigger(getAssetPath(`${SINSEAR}/${file}`), alt, caption)}
    >
      <img src={getAssetPath(`${SINSEAR}/${file}`)} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );

  return (
    <main className="design-container ss-casestudy">
      <CaseStudyHero
        variant="ss"
        backgroundImage={`${SINSEAR}/flame-texture.jpg`}
        backgroundMode="css"
        title={
          <>
            <span className="ss-title-brand">Sinsear:</span> Branding a party drink that
            knows when you're lying
          </>
        }
      >
        <div className="ss-snapshot">
          <h2 className="ss-snapshot-title">Quick Summary</h2>
          <div className="ss-cards">
            {summary.map(item => (
              <div key={item.label} className="ss-card">
                <h3>
                  <Icon id={item.icon} className="ss-card-icon" />
                  {item.label}
                </h3>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyHero>

      <div className="ss-content">
        {/* Overview */}
        <section className="ss-section">
          <h2>Overview</h2>
          <div className="ss-prose ss-prose--columns">
            <p>
              The brief was to invent a beverage and build its brand in two weeks: brainstorm
              drink ideas, narrow to one, map every touchpoint the brand would need, then
              present the launch on four to six 11x17 pages.
            </p>
            <p>
              Sinsear is a carbonated party drink that tastes different depending on the last
              thing you said. Tell the truth and you get the flavor on the label. Tell a lie and
              you get hot sauce. Liars aren't allowed to react, so the only person who knows for
              sure is the one holding the bottle, and everyone else has to read their face. It
              comes in a beer-sized bottle shaped like hot sauce, in alcoholic and zero proof
              versions.
            </p>
          </div>
          {figure(
            'final-launch.jpg',
            'Sinsear launch page: the headline "Liar, liar, mouth on fire." beside a bottle bursting through a burnt hole in yellow paper',
            'Launch page, the first page of the final presentation',
            'ss-figure--full'
          )}
        </section>

        {/* Concept */}
        <section className="ss-section">
          <h2>Finding the Concept</h2>
          <div className="ss-split ss-split--small-figure">
            <div className="ss-prose">
              <p>
                I came into the down-select with two ideas. The first was Mood Drink, a drink
                that changes color as you drink it and comes with edible glitter so it feels
                like a potion. I liked the idea of a drink that changes with your mood or with
                whoever is drinking it, but I wanted it to be an interactive game. So I asked
                myself what would be a reason I wouldn't want it to change, and landed on lying.
              </p>
              <p>
                Around then I had eaten really spicy Hunan food that made me cry from the heat,
                and that gave the lie its consequence: the drink turns super spicy. That idea
                became Mouth on Fire, a hot sauce shaped bottle holding beer or another
                alcoholic drink, and it became the project.
              </p>
            </div>
            <div className="ss-sketches">
              <div className="ss-sketch">
                <h3 className="ss-sketch-title">Mood Drink</h3>
                {figure(
                  'sketch-mood-drink-v2.jpg',
                  'Sketch of Mood Drink: a dark purple carton with a straw, labeled edible glitter'
                )}
              </div>
              <div className="ss-sketch">
                <h3 className="ss-sketch-title">Mouth on Fire</h3>
                {figure(
                  'sketch-mouth-on-fire-v2.jpg',
                  'Sketch of Mouth on Fire: beer and alcohol bottles shaped like hot sauce'
                )}
              </div>
            </div>
          </div>

          <div className="ss-split ss-split--figure-left ss-split--moodboard">
            {figure(
              'moodboard-amy.jpg',
              'My moodboard: hot sauce labels, three hand-drawn mouth logos, palettes and a type system',
              'My moodboard'
            )}
            <div className="ss-prose">
              <p>
                My design partner and I started with about an hour of ideating together face to
                face. Through mind mapping we agreed the brand should feel bold, fierce and
                devilish, a drink that dares you, and that it would be red and yellow.
              </p>
              <p>
                From there we each came up with our own ideas separately, with a moodboard of
                logo directions, palettes and type. Because of that hour together, the
                directions we brought back were close to each other. We agreed to go in my
                direction with the fanged mouth.
              </p>
            </div>
          </div>
        </section>

        {/* Identity */}
        <section className="ss-section">
          <h2>Identity</h2>
          <div className="ss-split ss-split--figure-left">
            <div className="ss-logo-pair">
              {figure('logo-sketch-v2.jpg', 'Pencil sketch of the fanged mouth with flames curling off the lips', 'Sketch')}
              {figure('logo-final.png', 'Final Sinsear logo: red lips with fangs and green-lined flames', 'Final mark', 'ss-figure--bare')}
            </div>
            <div className="ss-prose">
              <p>
                The logo is a mouth caught mid-burn. The fangs and the flames curling off the
                lips carry the hot sauce half of the drink, and the open mouth reads as
                someone about to speak, which is the moment the drink is judging.
              </p>
              <p>
                The name joins sin and sear. The first wordmark set a lowercase "sin" in black
                next to "SEAR" in red. For the presentation we moved both halves to capitals and
                drew "SIN" as a red outline.
              </p>
              <p>
                The feedback at critique was that from a distance the outline got lost in the
                yellow background, so the packaging and posters read as just "SEAR". After
                critique we filled "SIN" in solid black so the whole name holds up from across
                a room.
              </p>
            </div>
          </div>

          <div className="ss-grid ss-grid--three">
            {figure('wordmark-draft-v2.jpg', 'First wordmark: lowercase black "sin" with red "SEAR" above the logo', 'First wordmark')}
            {figure('wordmark-outlined.jpg', 'Presentation wordmark: outlined red "SIN" with solid red "SEAR" above the logo', 'Presented at critique')}
            {figure('wordmark-final-v2.jpg', 'Final wordmark: solid black "SIN" with red "SEAR" above the logo', 'Final, after critique')}
          </div>

          <div className="ss-subsection">
            <h3 className="ss-center-title">Color</h3>
            <ul className="ss-palette">
              {palette.map(color => (
                <li key={color.hex} className="ss-swatch">
                  <span className="ss-swatch-chip" style={{ backgroundColor: color.hex }} />
                  <span className="ss-swatch-name">{color.name}</span>
                  <span className="ss-swatch-hex">{color.hex}</span>
                  <span className="ss-swatch-role">{color.role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ss-subsection">
            <h3 className="ss-center-title">Type</h3>
            <div className="ss-type">
              <div className="ss-type-face ss-type-face--expanded">
                <span className="ss-type-name">Special Gothic Expanded One</span>
                <span className="ss-type-role">Headlines and the wordmark</span>
                <span className="ss-type-sample">
                  Liar, liar, <em>mouth on fire.</em>
                </span>
              </div>
              <div className="ss-type-face ss-type-face--condensed">
                <span className="ss-type-name">Special Gothic Condensed One</span>
                <span className="ss-type-role">Subheads and flavor names</span>
                <span className="ss-type-sample">The party drink that knows when you're lying.</span>
              </div>
              <div className="ss-type-face ss-type-face--body">
                <span className="ss-type-name">42dot Sans</span>
                <span className="ss-type-role">Body copy and label text</span>
                <span className="ss-type-sample">
                  We made a drink that can't be fooled. It pours sweet for the honest and burns
                  for the liars.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Packaging */}
        <section className="ss-section">
          <h2>Packaging</h2>
          <div className="ss-split">
            <div className="ss-prose">
              <p>
                The bottle borrows its shape from hot sauce so it looks like a dare on the
                table. The label had to work like a real one, so the final version has the
                legal copy a malt beverage needs: the government warning, volume and ABV, a
                barcode, and where it was brewed. The back panel explains the game in the
                brand's voice, and a QR code links to more party games and house rules.
              </p>
              <p>
                Each flavor name sounds like part of a trial. The first round had three
                flavors, and the final has five: {flavors.join(', ')}.
              </p>
            </div>
            {figure('bottles-final.png', 'Two Sinsear Glacier Cherry bottles, tilted toward each other, with the yellow label and neck band', undefined, 'ss-figure--bare')}
          </div>
          <div className="ss-grid ss-grid--two">
            {figure('label-draft.jpg', 'First label draft with placeholder copy and a nutrition panel', 'First label, with placeholder copy')}
            {figure('label-final-v2.jpg', 'Final wraparound label with brand copy, a QR code, the Glacier Cherry flavor name and a government warning', 'Final label')}
          </div>
          {figure(
            'final-party-photo.jpg',
            'Two people at a party, one holding Sinsear bottles behind their back',
            'Packaging page from the final presentation',
            'ss-figure--full'
          )}
        </section>

        {/* Campaign */}
        <section className="ss-section">
          <h2>Launch Campaign</h2>
          <div className="ss-prose ss-prose--narrow">
            <p>
              The campaign leans on the idea that the drink keeps your secrets. For the wall
              ad, I photographed a wall outside TD Garden by North Station that runs large
              format ads, then replaced the White Claw ad with ours. The bottle casts a
              devil's shadow, and the copy reads "Go ahead, tell them it's sweet. We won't say a
              word."
            </p>
          </div>
          <div className="ss-grid ss-grid--two ss-grid--wall">
            {figure('tdgarden-photo.jpg', 'The wall outside TD Garden as photographed, with a White Claw ad', 'The wall as I photographed it')}
            {figure('final-wallad.jpg', 'The same wall with the Sinsear ad: a giant bottle with a horned shadow and the line "We won\'t say a word."', 'With the Sinsear ad')}
          </div>
          <div className="ss-grid ss-grid--two ss-after-figure">
            {figure('liquorstore-photo.jpg', 'The liquor store front before, with whiskey ads on the windows', 'The storefront before')}
            {figure('final-liquorstore.jpg', 'The liquor store front with Sinsear ads on the doors and lower window', 'With the Sinsear wrap')}
          </div>
          {figure('final-social-phone.jpg', 'A hand holding a phone showing the Sinsear social post: "Are you brave enough to play the game?" over a gloved hand gripping the bottle', 'Social post', 'ss-after-figure ss-figure--social')}
        </section>

        {/* Iterations */}
        <section className="ss-section">
          <h2>Iterations</h2>
          <div className="ss-prose ss-prose--narrow">
            <p>
              We presented a first round of every touchpoint, plus a set of subway posters,
              then revised. The posters were cut, and each piece that stayed got simpler.
            </p>
          </div>
          <div className="ss-revisions">
            {revisions.map(rev => (
              <div key={rev.name} className="ss-revision">
                <h3 className="ss-revision-name">{rev.name}</h3>
                <div className="ss-revision-pair">
                  {figure(rev.draft, `${rev.name}, first round`, 'First round')}
                  {figure(rev.final, `${rev.name}, final`, 'Final')}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ImageLightbox isOpen={lightbox.isOpen} currentImage={lightbox.currentImage} onClose={lightbox.close} />
    </main>
  );
}
