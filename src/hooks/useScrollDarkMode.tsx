import { useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

export const useScrollDarkMode = (enabled: boolean = false, targetSelector?: string, reverse: boolean = false) => {
  const { setDarkMode } = useDarkMode();

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (targetSelector) {
        // If target selector is provided, check if that element is in view
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const isInView = rect.top <= 0; // Element is at or above the top of viewport
          setDarkMode(reverse ? isInView : !isInView);
        }
      } else {
        // Default behavior: use 30vw threshold
        const threshold = window.innerWidth * 0.3; // 30vw
        setDarkMode(scrollY < threshold);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set the correct state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setDarkMode, enabled, targetSelector, reverse]);
}; 