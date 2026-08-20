import React, { useLayoutEffect } from 'react';
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
import DesignMarshallsCasestudy from './components/design-collections/design-marshalls-casestudy';
import DesignNextCasestudy from './components/design-collections/design-next-casestudy';
import DesignReadingRedesign from './components/design-collections/design-readingredesign';
import DesignDishwasher from './components/design-collections/design-dishwasher';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import { useAboutNavbarMode } from './hooks/useAboutNavbarMode';

const AppContent: React.FC = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const aboutNavbarMode = useAboutNavbarMode();
  
  // Use custom navbar mode for about page, otherwise use global dark mode
  const navbarDarkMode = location.pathname === '/about' ? aboutNavbarMode : darkMode;

  // Reset scroll position to the top before the new route paints so the
  // page never appears at the previous route's scroll position first.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <div className="App">
      <Navbar darkMode={navbarDarkMode} />
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
        <Route path="/design-marshalls-casestudy" element={<DesignMarshallsCasestudy />} />
        <Route path="/design-next-casestudy" element={<DesignNextCasestudy />} />
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
