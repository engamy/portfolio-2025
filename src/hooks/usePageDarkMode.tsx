import { useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

export const usePageDarkMode = (pageDarkMode: boolean) => {
  const { setDarkMode } = useDarkMode();

  useEffect(() => {
    // Only set page-specific dark mode if we're at the top of the page
    // This allows scroll-based dark mode to take precedence when scrolled
    if (window.scrollY < window.innerWidth * 0.35) { // 30vw
      setDarkMode(pageDarkMode);
    }
  }, [pageDarkMode, setDarkMode]);
}; 