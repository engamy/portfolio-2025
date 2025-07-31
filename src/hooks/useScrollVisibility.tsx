import { useState, useEffect } from 'react';

export const useScrollVisibility = (thresholdVw: number = 35) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerWidth * (thresholdVw / 100); // Convert vw to pixels
      
      // Hide element when scrolled past threshold, show when above threshold
      setIsVisible(scrollY < threshold);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set the correct state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [thresholdVw]);

  return isVisible;
}; 