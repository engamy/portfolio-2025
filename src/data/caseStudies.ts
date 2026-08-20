// Single source of truth for the featured case study cards. The home page
// lists all of them; the design and code pages pull the relevant one so the
// cards stay identical everywhere.

export interface CaseStudy {
  /** Route the card links to. */
  to: string;
  /** Image path, resolved through getAssetPath. */
  image: string;
  imageAlt: string;
  title: string;
  /** Role and date line under the title. */
  role: string;
  tags: string[];
  /** 'next' switches the accent colour to the NExT green. */
  variant?: 'default' | 'next';
}

export const marshallsCaseStudy: CaseStudy = {
  to: '/design-marshalls-casestudy',
  image: '/pictures/portfolio-content_spring2026/02_DESIGN/thumbnail_marshalls.jpg',
  imageAlt: 'Designing the Trend Shop for Marshalls.com',
  title: 'Designing the Trend Shop for Marshalls.com',
  role: 'Graphic Designer, TJX · January–June 2025',
  tags: [
    'Brand Identity',
    'Web Design',
    'Typography',
    'Design Systems',
    'Print Design',
    'Marketing',
  ],
};

export const nextCaseStudy: CaseStudy = {
  to: '/design-next-casestudy',
  variant: 'next',
  image: '/pictures/portfolio-content_spring2026/02_DESIGN/02_NEXT/via_teamphoto.jpg',
  imageAlt: 'Harbor v2.0: NExT × Via Separations team',
  title: 'Designing & Developing for Manufacturing Planning at Via Separations',
  role: 'Product Designer & Software Engineer, NExT Consulting × Via Separations · January–April 2026',
  tags: [
    'Product Design',
    'Front-End',
    'UX Research',
    'Information Architecture',
    'Data Density',
    'Climate Tech',
  ],
};

/** Every case study, newest last, as listed on the home page. */
export const caseStudies: CaseStudy[] = [marshallsCaseStudy, nextCaseStudy];
