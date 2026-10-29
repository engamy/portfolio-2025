// The project and Creative Lab listings behind the landing page, ported from
// the landing reference.
//
// `to` is the route a card links to. Where a project already has a page in
// this repo the existing route is used verbatim, so no published URL changes.
// Projects without a page get a placeholder route generated from the slug.

export type TagId = 'pd' | 'se' | 'ds' | 'ct';

export const TAGS: Record<TagId, string> = {
  pd: 'Product Design',
  se: 'Software & Engineering',
  ds: 'Design Systems & Editorial',
  ct: 'Creative Tech'
};

export const FILTERS: { id: 'all' | TagId; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'pd', label: TAGS.pd },
  { id: 'se', label: TAGS.se },
  { id: 'ds', label: TAGS.ds },
  { id: 'ct', label: TAGS.ct }
];

export interface LandingProject {
  slug: string;
  title: string;
  /** Context line under the title on featured cards. */
  ctx: string;
  /** Shorter context line used in the filterable grid. */
  focus: string;
  tags: TagId[];
  /** Describes the intended thumbnail; shown in the placeholder block. */
  img: string;
  featured?: boolean;
  /** Existing route. Omit for projects that only have a placeholder page. */
  to?: string;
  /** Real thumbnail, where one exists. Falls back to the placeholder block. */
  image?: string;
  /** Set when `image` is a video rather than a still. */
  mediaType?: 'image' | 'video';
}

const DESIGN = '/pictures/portfolio-content_spring2026/02_DESIGN';
const ART = '/pictures/portfolio-content_spring2026/04_ART';
const CODE = '/pictures/portfolio-content_spring2026/03_CODE';

/** The route for a project that has no page of its own yet. */
export const placeholderPath = (slug: string) => '/' + slug;

/** Where a project card points: its real page, or its placeholder. */
export const projectPath = (project: LandingProject) =>
  project.to ?? placeholderPath(project.slug);

export const PROJECTS: LandingProject[] = [
  {
    slug: 'via-separations',
    title: 'Via Separations',
    ctx: 'Harbor v2.0 · NExT Consulting × Via Separations',
    focus: 'Flagship case study, enterprise SaaS',
    tags: ['pd', 'se'],
    img: 'Harbor v2.0 main product screen',
    featured: true,
    to: '/design-next-casestudy',
    image: DESIGN + '/02_NEXT/via_teamphoto.jpg'
  },
  {
    slug: 'sightline',
    title: 'Sightline',
    ctx: 'Product Design & Software Engineering',
    focus: 'Flagship case study',
    tags: ['pd', 'se'],
    img: 'Sightline hero product screen',
    featured: true
  },
  {
    slug: 'marshalls-trend-shop',
    title: 'Marshalls.com Trend Shop',
    ctx: 'Graphic Design & Design Systems · TJX Companies',
    focus: 'Flagship case study, e-commerce system',
    tags: ['pd', 'ds'],
    img: 'Trend Shop page on the blue geometric Marshalls pattern',
    featured: true,
    to: '/design-marshalls-casestudy',
    image: DESIGN + '/thumbnail_marshalls.jpg'
  },
  {
    slug: 'kahsay',
    title: 'Kahsay',
    ctx: 'UX case study',
    focus: 'UX case study',
    tags: ['pd'],
    img: 'Key screens from the Kahsay case study'
  },
  {
    slug: 'iot-dishwasher',
    title: 'IoT Dishwasher',
    ctx: 'Smart home UI & interface design',
    focus: 'Smart home UI',
    tags: ['pd', 'ct'],
    img: 'Dishwasher touchscreen interface on a smart home display',
    to: '/design-dishwasher',
    image: DESIGN + '/thumbnail_iotDishwasher.png'
  },
  {
    slug: 'reading-redesign',
    title: 'Reading Redesign',
    ctx: 'Mobile UX / app redesign',
    focus: 'Mobile UX',
    tags: ['pd'],
    img: 'Apple Books recommendation screen mockup',
    to: '/design-reading-redesign',
    image: DESIGN + '/thumbnail_readingRedesign.jpg'
  },
  {
    slug: 'engine-red',
    title: 'Engine Red',
    ctx: 'Interactive app / product concept',
    focus: 'Interactive app',
    tags: ['ct', 'se'],
    img: 'Engine Red app concept, hero screen'
  },
  {
    slug: 'coopalytics',
    title: 'Coopalytics',
    ctx: 'Full-stack web application',
    focus: 'Full-stack web app',
    tags: ['se', 'ct'],
    img: 'Coopalytics dashboard in a browser frame',
    to: '/coopalytics',
    image: CODE + '/coopalytics.mp4',
    mediaType: 'video'
  },
  {
    slug: 'scout-djoda',
    title: 'Scout / Djoda',
    ctx: 'Full-stack web app & branding',
    focus: 'Full-stack web app and branding',
    tags: ['se', 'pd'],
    img: 'Scout and Djoda app screens with branding',
    to: '/scout-djoda',
    image: CODE + '/djoda.mp4',
    mediaType: 'video'
  },
  {
    slug: 'affectrum',
    title: 'Affectrum',
    ctx: 'Interactive / affective computing',
    focus: 'Affective computing',
    tags: ['ct', 'pd'],
    img: 'Affectrum interactive visualization'
  },
  {
    slug: 'social-posts',
    title: 'Social Posts',
    ctx: 'Brand & social media visuals',
    focus: 'Brand and social visuals',
    tags: ['ds'],
    img: 'Grid of branded social media posts'
  },
  {
    slug: 'three-trios',
    title: 'Three Trios',
    ctx: 'CS architecture / game development',
    focus: 'Game development',
    tags: ['se'],
    img: 'Three Trios game board mid-play',
    to: '/three-trios',
    image: CODE + '/threetrios.mp4',
    mediaType: 'video'
  },
  {
    slug: 'minesweeper',
    title: 'Minesweeper',
    ctx: 'Systems & algorithms',
    focus: 'Systems and algorithms',
    tags: ['se'],
    img: 'Minesweeper board mid-game',
    to: '/minesweeper',
    image: CODE + '/minesweeper.mp4',
    mediaType: 'video'
  },
  {
    slug: 'lightemall',
    title: 'LightEmAll',
    ctx: 'Systems & algorithms',
    focus: 'Systems and algorithms',
    tags: ['se'],
    img: 'LightEmAll puzzle grid with powered tiles',
    to: '/lightemall',
    image: CODE + '/lightemall.mp4',
    mediaType: 'video'
  },
  {
    slug: '3d-mfa',
    title: '3D MFA / Interactive',
    ctx: '3D modeling & web graphics',
    focus: '3D and web graphics',
    tags: ['ct'],
    img: '3D model render',
    to: '/3d-mfa',
    image: CODE + '/3dmfa_2.mp4',
    mediaType: 'video'
  },
  {
    slug: 'nupr-markiplier-wikibook',
    title: 'NUPR & Markiplier Wikibook',
    ctx: 'Editorial, typography & layout design',
    focus: 'Editorial layout',
    tags: ['ds'],
    img: 'Magazine spread beside the red Markiplier wikibook cover',
    to: '/design-layouts',
    image: DESIGN + '/thumbnai_layoutDesign.png'
  },
  {
    slug: 'cba',
    title: 'CBA',
    ctx: 'Web design & non-profit client work',
    focus: 'Web design',
    tags: ['ds', 'se'],
    img: 'Community Built Association site on desktop and phone'
  }
];

export interface LabItem {
  slug: string;
  title: string;
  ctx: string;
  img: string;
  to?: string;
  image?: string;
  mediaType?: 'image' | 'video';
}

/** All three Creative Lab entries already have art collection pages. */
export const LAB: LabItem[] = [
  {
    slug: 'extraordinary-portfolio',
    title: '(Extra)ordinary Portfolio',
    ctx: 'AP Art & Design 5: mixed media, collage, ink',
    img: 'Mixed media and ink pieces from the portfolio',
    to: '/art-2022-portfolio',
    image: ART + '/XTRAordinary/youth.jpg'
  },
  {
    slug: 'motion-animation',
    title: 'Motion & Animation',
    ctx: 'Video, motion media, dynamic graphics',
    img: 'Still frame from a motion graphics piece',
    to: '/art-motion-media',
    image: ART + '/motionMedia/omori.mov',
    mediaType: 'video'
  },
  {
    slug: 'visual-explorations',
    title: 'Visual Explorations',
    ctx: 'Experimental art, printmaking, physical crafts',
    img: 'Printmaking and physical craft pieces',
    to: '/art-visual-explorations',
    image: ART + '/content_assorted/dandadan.jpg'
  }
];

/** Projects that need a placeholder page generated for them. */
export const PLACEHOLDER_PROJECTS = PROJECTS.filter(p => !p.to);
