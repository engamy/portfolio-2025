import React, { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './components/mainpages/landing';
import Design from './components/mainpages/design';
import Code from './components/mainpages/code';
import Art from './components/mainpages/art';
import About from './components/mainpages/about';
import Art2022Portfolio from './components/art-collections/art-2022portfolio';
import ArtMotionMedia from './components/art-collections/art-motionmedia';
import ArtMakeIt from './components/art-collections/art-makeit';
import ArtVisualExplorations from './components/art-collections/art-visual-explorations';
import DesignWikiBook from './components/design-collections/design-layouts';
import DesignMarshalls from './components/design-collections/design-marshalls';
import DesignMarshallsCasestudy from './components/design-collections/design-marshalls-casestudy';
import DesignNextCasestudy from './components/design-collections/design-next-casestudy';
import DesignKahsayCasestudy from './components/design-collections/design-kahsay-casestudy';
import DesignReadingRedesign from './components/design-collections/design-readingredesign';
import DesignDishwasher from './components/design-collections/design-dishwasher';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import { useAboutNavbarMode } from './hooks/useAboutNavbarMode';
import { IconSprite } from './components/page-components/IconSprite';
import { isSectionId, scrollToSection } from './utils/sectionScroll';
import ProjectPlaceholder from './components/mainpages/project-placeholder';
import CodeProject from './components/mainpages/code-project';
import { PLACEHOLDER_PROJECTS, placeholderPath } from './data/landingProjects';
import { projects } from './data/projects';

const AppContent: React.FC = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const aboutNavbarMode = useAboutNavbarMode();
  
  // Use custom navbar mode for about page, otherwise use global dark mode
  const navbarDarkMode = location.pathname === '/about' ? aboutNavbarMode : darkMode;

  // Reset scroll position to the top before the new route paints so the
  // page never appears at the previous route's scroll position first. A hash
  // is handled below instead, so the two do not fight over the scroll.
  useLayoutEffect(() => {
    if (location.hash) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  // Arriving at /#featured from another route: wait for the landing sections
  // to mount, then scroll. Harmless on routes where the section is absent.
  useEffect(() => {
    const id = location.hash.slice(1);
    if (location.pathname !== '/' || !isSectionId(id)) return;
    const frame = window.requestAnimationFrame(() => scrollToSection(id, false));
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);


  return (
    <div className="App">
      <IconSprite />
      <Navbar darkMode={navbarDarkMode} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/design" element={<Design />} />
        <Route path="/code" element={<Code />} />
        <Route path="/art" element={<Art />} />
        <Route path="/art-2022-portfolio" element={<Art2022Portfolio />} />
        <Route path="/art-motion-media" element={<ArtMotionMedia />} />
        <Route path="/art-makeit" element={<ArtMakeIt />} />
        <Route path="/art-visual-explorations" element={<ArtVisualExplorations />} />
        <Route path="/design-layouts" element={<DesignWikiBook />} />
        <Route path="/design-marshalls" element={<DesignMarshalls />} />
        <Route path="/design-marshalls-casestudy" element={<DesignMarshallsCasestudy />} />
        <Route path="/design-next-casestudy" element={<DesignNextCasestudy />} />
        <Route path="/kahsay" element={<DesignKahsayCasestudy />} />
        <Route path="/design-reading-redesign" element={<DesignReadingRedesign />} />
        <Route path="/design-dishwasher" element={<DesignDishwasher />} />
        <Route path="/about" element={<About />} />

        {/* Engineering projects that have a page of their own. */}
        {projects
          .filter(project => project.slug)
          .map(project => (
            <Route
              key={project.slug}
              path={`/${project.slug}`}
              element={<CodeProject project={project} />}
            />
          ))}

        {/* One route per project that has no page of its own yet. */}
        {PLACEHOLDER_PROJECTS.map(project => (
          <Route
            key={project.slug}
            path={placeholderPath(project.slug)}
            element={<ProjectPlaceholder project={project} />}
          />
        ))}
      </Routes>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
};

export default App;
