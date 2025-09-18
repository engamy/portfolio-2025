import { useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

export const usePageDarkMode = (pageDarkMode: boolean, force: boolean = false) => {
  const { setDarkMode } = useDarkMode();

  useEffect(() => {
    if (force) {
      // Force dark mode regardless of scroll position
      setDarkMode(pageDarkMode);
    } else {
      // Only set page-specific dark mode if we're at the top of the page
      // This allows scroll-based dark mode to take precedence when scrolled
      if (window.scrollY < window.innerWidth * 0.35) { // 30vw
        setDarkMode(pageDarkMode);
      }
    }
  }, [pageDarkMode, setDarkMode, force]);
}; 