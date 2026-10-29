// Social links, shared by the home page, the about page, and the footer.

export interface Social {
  href: string;
  /** Filename inside the 06_ICONS asset folder. */
  icon: string;
  /** Symbol id in the shared SVG sprite, used by the header and footer. */
  spriteId: string;
  label: string;
}

export const ICONS = '/pictures/portfolio-content_spring2026/06_ICONS';

export const socials: Social[] = [
  { href: 'https://www.linkedin.com/in/amyeng895/', icon: 'linkedin.png', spriteId: 'i-linkedin', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/yifeng.art/', icon: 'instagram.png', spriteId: 'i-instagram', label: 'Instagram' },
  { href: 'https://github.com/engamy', icon: 'github.png', spriteId: 'i-github', label: 'GitHub' },
  { href: 'https://www.youtube.com/@yifengart', icon: 'youtube.png', spriteId: 'i-youtube', label: 'YouTube' }
];
