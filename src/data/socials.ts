// Social links, shared by the home page, the about page, and the footer.

export interface Social {
  href: string;
  /** Filename inside the 06_ICONS asset folder. */
  icon: string;
  label: string;
}

export const ICONS = '/pictures/portfolio-content_spring2026/06_ICONS';

export const socials: Social[] = [
  { href: 'https://www.linkedin.com/in/amyeng895/', icon: 'linkedin.png', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/yifeng.art/', icon: 'instagram.png', label: 'Instagram' },
  { href: 'https://github.com/engamy', icon: 'github.png', label: 'GitHub' },
  { href: 'https://www.youtube.com/@yifengart', icon: 'youtube.png', label: 'YouTube' }
];
