/** The landing page sections the header and footer link to, in page order. */
export const SECTION_IDS = ['home', 'featured', 'work', 'creative-lab'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const isSectionId = (value: string): value is SectionId =>
  (SECTION_IDS as readonly string[]).includes(value);

/** The route a section link points at. `home` is the top of the landing page. */
export const sectionPath = (id: SectionId) => (id === 'home' ? '/' : `/#${id}`);

/**
 * Scroll a landing section to just under the sticky header.
 *
 * Ported from the reference, including the `featured` nudge: that section's
 * diagonal top edge tucks under the bar, so without the extra offset the
 * heading lands too high.
 *
 * No-ops when the section is not on the page, which is what happens on every
 * route other than the landing page.
 */
export const scrollToSection = (id: SectionId, smooth: boolean) => {
  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = smooth && !reduce ? 'smooth' : 'auto';

  if (id === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector('.site');
  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  let top = el.getBoundingClientRect().top + window.scrollY - headerBottom;
  if (id === 'featured') top += window.innerWidth * 0.06;

  window.scrollTo({ top: Math.max(0, top), behavior });
};
