import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/mainpages/home';
import Design from './components/mainpages/design';
import Code from './components/mainpages/code';
import Art from './components/mainpages/art';
import About from './components/mainpages/about';
import Art2022Portfolio from './components/art-collections/art-2022portfolio';
import ArtMotionMedia from './components/art-collections/art-motionmedia';
import ArtMakeIt from './components/art-collections/art-makeit';
import DesignWikiBook from './components/design-collections/design-layouts';
import DesignMarshalls from './components/design-collections/design-marshalls';
import DesignReadingRedesign from './components/design-collections/design-readingredesign';
import DesignDishwasher from './components/design-collections/design-dishwasher';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';

const AppContent: React.FC = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();

  // Normalize anchor behavior on each route change:
  // - External links open in a new tab with rel security attributes
  // - Internal links open in the same tab (no target)
  useEffect(() => {
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href]');
    anchors.forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href) return;

      const lowerHref = href.toLowerCase();
      if (
        lowerHref.startsWith('#') ||
        lowerHref.startsWith('mailto:') ||
        lowerHref.startsWith('tel:') ||
        lowerHref.startsWith('javascript:') ||
        lowerHref.startsWith('data:') ||
        lowerHref.startsWith('blob:')
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      const isExternal = url.origin !== window.location.origin;
      if (isExternal) {
        anchor.setAttribute('target', '_blank');
        const existingRel = anchor.getAttribute('rel') || '';
        const relParts = new Set(existingRel.split(/\s+/).filter(Boolean));
        relParts.add('noopener');
        relParts.add('noreferrer');
        anchor.setAttribute('rel', Array.from(relParts).join(' '));
      } else {
        anchor.removeAttribute('target');
      }
    });
  }, [location]);

  return (
    <div className="App">
      <Navbar darkMode={darkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/code" element={<Code />} />
        <Route path="/art" element={<Art />} />
        <Route path="/art-2022-portfolio" element={<Art2022Portfolio />} />
        <Route path="/art-motion-media" element={<ArtMotionMedia />} />
        <Route path="/art-makeit" element={<ArtMakeIt />} />
        <Route path="/design-layouts" element={<DesignWikiBook />} />
        <Route path="/design-marshalls" element={<DesignMarshalls />} />
        <Route path="/design-reading-redesign" element={<DesignReadingRedesign />} />
        <Route path="/design-dishwasher" element={<DesignDishwasher />} />
        <Route path="/about" element={<About />} />
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
