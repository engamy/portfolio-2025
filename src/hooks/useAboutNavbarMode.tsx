import { useEffect, useState } from 'react';

export const useAboutNavbarMode = () => {
  const [navbarDarkMode, setNavbarDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Handle navbar dark mode based on mobile/desktop
    const handleScroll = () => {
      if (isMobile) {
        // On mobile: always light mode
        setNavbarDarkMode(false);
      } else {
        // On desktop: dark mode until experience section, then scroll-based
        const experienceSection = document.querySelector('.experience-container');
        if (experienceSection) {
          const rect = experienceSection.getBoundingClientRect();
          const isAboveExperience = rect.top > 0;
          
          if (isAboveExperience) {
            // Above experience section: dark mode
            setNavbarDarkMode(true);
          } else {
            // Below experience section: scroll-based toggle
            const scrollY = window.scrollY;
            const threshold = window.innerWidth * 0.3; // 30vw threshold
            setNavbarDarkMode(scrollY < threshold);
          }
        } else {
          // Fallback: use scroll-based behavior
          const scrollY = window.scrollY;
          const threshold = window.innerWidth * 0.3;
          setNavbarDarkMode(scrollY < threshold);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set the correct state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return navbarDarkMode;
};
