// Collection listings for the art and design pages.

export interface Collection {
  to: string;
  /** Media path, resolved through getAssetPath. */
  media: string;
  mediaType?: 'image' | 'video';
  mediaAlt?: string;
  title: string;
  date: string;
  tags: string[];
  openInNewTab?: boolean;
}

const ART = '/pictures/portfolio-content_spring2026/04_ART';
const DESIGN = '/pictures/portfolio-content_spring2026/02_DESIGN';

export const artCollections: Collection[] = [
  {
    to: '/art-2022-portfolio',
    openInNewTab: true,
    media: `${ART}/XTRAordinary/evangelion.jpg`,
    mediaAlt: '2022 Portfolio',
    title: 'Ordinary and Extraordinary Portfolio',
    date: '2022-2023',
    tags: [
      'AP Art & Design 5',
      'Best in Illustration at HCRHS',
      'Ink Pen',
      'Alcohol-based Markers',
      'Traditional Art',
      'Surrealism'
    ]
  },
  {
    to: '/art-makeit',
    media: `${ART}/makeit/three.jpg`,
    mediaAlt: 'Make It Collection',
    title: 'Make It',
    date: '2024',
    tags: [
      'Handcrafted',
      'Mixed Media',
      'Physical Art',
      'Creative Process',
      'Experimentation',
      'Innovation'
    ]
  },
  {
    to: '/art-motion-media',
    media: `${ART}/motionMedia/omori.mov`,
    mediaType: 'video',
    title: 'Motion Media',
    date: '2023',
    tags: [
      'Animation',
      'Video',
      'Motion Graphics',
      'Character Design',
      'Digital Art',
      'YouTube'
    ]
  }
];

export const designCollections: Collection[] = [
  // Community Built Association: hidden until the collection is finished.
  // {
  //   to: '',
  //   media: `${DESIGN}/thumbnail_cba.jpg`,
  //   mediaAlt: 'CBA Collection',
  //   title: 'Community Built Association',
  //   date: 'Month 20XX',
  //   tags: ['Web Design', 'UI/UX', 'User Research', 'Prototyping', 'Wireframing', 'Responsive']
  // },
  {
    to: '/design-dishwasher',
    media: `${DESIGN}/thumbnail_iotDishwasher.png`,
    mediaAlt: 'IoT Dishwasher Collection',
    title: 'IoT Dishwasher',
    date: 'September 2024',
    tags: [
      'Product Design',
      'IoT',
      'User Experience',
      'Interface Design',
      'Smart Home',
      'Technology'
    ]
  },
  {
    to: '/design-reading-redesign',
    media: `${DESIGN}/thumbnail_readingRedesign.jpg`,
    mediaAlt: 'Reading Redesign Collection',
    title: 'Reading Redesign',
    date: 'November 2024',
    tags: [
      'UX Design',
      'User Research',
      'Information Architecture',
      'Wireframing',
      'Prototyping',
      'Usability'
    ]
  },
  {
    to: '/design-layouts',
    media: `${DESIGN}/thumbnai_layoutDesign.png`,
    mediaAlt: 'Layout Design Collection',
    title: 'Layout Design',
    date: 'March 2024 - June 2025',
    tags: [
      'Layout Design',
      'Typography',
      'Grid Systems',
      'Visual Hierarchy',
      'Composition',
      'Print Design'
    ]
  }
];
