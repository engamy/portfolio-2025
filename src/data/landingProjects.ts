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
  /** Left off the landing page for now. The entry and its route stay. */
  hidden?: boolean;
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
    title: 'Via Separations <> NExT Consulting',
    ctx: 'Internal operations & Warehouse/Inventory management system',
    focus: 'Internal operations & Warehouse/Inventory management system',
    tags: ['pd', 'se'],
    img: 'Via Separations logo in a circle over rows of separation pipes',
    featured: true,
    to: '/design-next-casestudy',
    image: DESIGN + '/02_NEXT/thumbnail-via-logo.jpg'
  },
  {
    slug: 'sightline',
    title: 'Sightline',
    ctx: 'Citizen science reporting app for natural disasters',
    focus: 'Citizen science reporting app for natural disasters',
    tags: ['pd'],
    img: 'Sightline eye logo on white',
    featured: true,
    to: '/sightline',
    image: DESIGN + '/04_SIGHTLINE/thumbnail-sightline-v4.jpg'
  },
  {
    slug: 'marshalls-trend-shop',
    title: 'Marshalls',
    ctx: 'Designing exploratory web layouts & brand systems at scale',
    focus: 'Designing exploratory web layouts & brand systems at scale',
    tags: ['ds'],
    img: 'Trend Shop page on the blue geometric Marshalls pattern',
    featured: true,
    to: '/design-marshalls-casestudy',
    image: DESIGN + '/thumbnail_marshalls.jpg'
  },
  {
    slug: 'mentor-matcher',
    title: 'Mentor Matcher',
    ctx: 'Matching platform for a Khoury staff mentorship program',
    focus: 'Matching platform for a Khoury staff mentorship program',
    tags: ['pd', 'se'],
    img: 'Northeastern University Khoury College of Computer Sciences logo on cream',
    to: '/mentor-matcher',
    image: DESIGN + '/05_MENTORMATCHER/thumbnail-mentormatcher-v4.jpg'
  },
  {
    slug: 'kahsay',
    hidden: true,
    title: 'Kahsay',
    ctx: 'Brand Identity for a foodtech startup',
    focus: 'Brand Identity for a foodtech startup',
    tags: ['pd', 'ds'],
    img: 'Key screens from the Kahsay case study',
    to: '/kahsay',
    image: DESIGN + '/03_KAHSAY/thumbnail-kahsay.jpg'
  },
  {
    slug: 'iot-dishwasher',
    hidden: true,
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
    hidden: true,
    title: 'Reading Redesign',
    ctx: 'Mobile UX / app redesign',
    focus: 'Mobile UX',
    tags: ['pd'],
    img: 'Apple Books recommendation screen mockup',
    to: '/design-reading-redesign',
    image: DESIGN + '/thumbnail_readingRedesign.jpg'
  },
  {
    slug: 'coopalytics',
    hidden: true,
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
    hidden: true,
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
    slug: 'three-trios',
    title: 'Three Trios',
    ctx: 'Architecting a Two-Player Card Game with AI Opponents',
    focus: 'Architecting a Two-Player Card Game with AI Opponents',
    tags: ['se'],
    img: 'Three Trios game board mid-play',
    to: '/three-trios',
    // Gameplay only: title screens trimmed and letterbox cropped. The case
    // study keeps the full threetrios.mp4.
    image: CODE + '/threetrios-loop.mp4',
    mediaType: 'video'
  },
  {
    slug: 'minesweeper',
    title: 'Minesweeper',
    ctx: 'Rebuilding a Classic with a Recursive Flood Fill',
    focus: 'Rebuilding a Classic with a Recursive Flood Fill',
    tags: ['se'],
    img: 'Minesweeper board mid-game',
    to: '/minesweeper',
    image: CODE + '/minesweeper.mp4',
    mediaType: 'video'
  },
  {
    slug: 'lightemall',
    title: 'LightEmAll',
    ctx: "Generating Solvable Puzzles with Kruskal's Algorithm",
    focus: "Generating Solvable Puzzles with Kruskal's Algorithm",
    tags: ['se'],
    img: 'LightEmAll puzzle grid with powered tiles',
    to: '/lightemall',
    image: CODE + '/lightemall.mp4',
    mediaType: 'video'
  },
  {
    slug: 'pipe-fantasy',
    title: 'Pipe Fantasy',
    ctx: 'Implementing a Timed Puzzle Game in Racket',
    focus: 'Implementing a Timed Puzzle Game in Racket',
    tags: ['se'],
    img: 'Pipe Fantasy grid with green goo flowing through placed pipes',
    to: '/pipe-fantasy',
    image: CODE + '/pipefantasy_1.mp4',
    mediaType: 'video'
  },
  {
    slug: '3d-mfa',
    hidden: true,
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
    hidden: true,
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
    hidden: true,
    title: 'CBA',
    ctx: 'Web design & non-profit client work',
    focus: 'Web design',
    tags: ['ds'],
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
/**
 * Order of the "All Projects" view: design and engineering work mixed
 * together instead of grouped. Projects not listed here keep their data
 * order after these.
 */
export const ALL_PROJECTS_ORDER = [
  'sightline',
  'three-trios',
  'marshalls-trend-shop',
  'lightemall',
  'via-separations',
  'minesweeper',
  'mentor-matcher',
  'pipe-fantasy',
];

/** The projects the landing page lists. */
export const VISIBLE_PROJECTS = PROJECTS.filter(p => !p.hidden);

export const PLACEHOLDER_PROJECTS = PROJECTS.filter(p => !p.to);
