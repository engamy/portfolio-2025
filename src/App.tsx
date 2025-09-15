import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import DesignWikiBook from './components/design-collections/design-wikibook';
import DesignMarshalls from './components/design-collections/design-marshalls';
import DesignReadingRedesign from './components/design-collections/design-readingredesign';
import DesignDishwasher from './components/design-collections/design-dishwasher';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';

const AppContent: React.FC = () => {
  const { darkMode } = useDarkMode();

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
        <Route path="/design-wiki-book" element={<DesignWikiBook />} />
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
