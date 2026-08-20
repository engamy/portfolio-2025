import { useCallback, useState } from 'react';
import {
  SCROLL_THRESHOLD_VW,
  isAboveThreshold,
  useScrollListener,
} from './useScrollThreshold';

const MOBILE_BREAKPOINT = 768;

/**
 * The About page needs its own navbar mode: the hero is dark on desktop but
 * light on mobile, and the flip point is the experience section rather than a
 * fixed scroll offset.
 */
export const useAboutNavbarMode = () => {
  const [navbarDarkMode, setNavbarDarkMode] = useState(false);

  const update = useCallback(() => {
    // Read the viewport width directly rather than holding it in state, so a
    // resize does not tear down and re-register the scroll listener.
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      setNavbarDarkMode(false);
      return;
    }

    const experienceSection = document.querySelector('.experience-container');
    if (!experienceSection) {
      setNavbarDarkMode(isAboveThreshold(SCROLL_THRESHOLD_VW));
      return;
    }

    // Dark above the experience section, then scroll-based below it.
    const aboveExperience = experienceSection.getBoundingClientRect().top > 0;
    setNavbarDarkMode(
      aboveExperience ? true : isAboveThreshold(SCROLL_THRESHOLD_VW)
    );
  }, []);

  useScrollListener(update);

  return navbarDarkMode;
};
