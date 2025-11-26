
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';
import About from './pages/About';
import AirBrushCaseStudy from './pages/AirBrushCaseStudy';
import CatPiCaseStudy from './pages/CatPiCaseStudy';
import ThreeDShowcaseCaseStudy from './pages/ThreeDShowcaseCaseStudy';
import ResponsiveWebCaseStudy from './pages/ResponsiveWebCaseStudy';
import CampaignDesignCaseStudy from './pages/CampaignDesignCaseStudy';
import BrandVisualCaseStudy from './pages/BrandVisualCaseStudy';
import CustomCursor from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';
import { LanguageProvider } from './contexts/LanguageContext';
import { SoundProvider } from './contexts/SoundContext';

// Scroll restoration component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Background Effect Component - Optimized for performance
const BackgroundGradient = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-void">
      {/* Base Radial Gradient for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111111] to-void opacity-80" />

      {/* Technical Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Fine Dot Matrix Texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Noise Texture for grain */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] grayscale mix-blend-overlay" />

      {/* Vignette to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.8)_120%)] pointer-events-none" />

      {/* Flashlight Effect */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(204,255,0,0.08) 0%, rgba(5,5,5,0) 60%)',
        }}
      />
    </div>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={true}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Work />
            </PageTransition>
          }
        />
        <Route
          path="/work/airbrush"
          element={
            <PageTransition>
              <AirBrushCaseStudy />
            </PageTransition>
          }
        />
        <Route
          path="/work/catpi"
          element={
            <PageTransition>
              <CatPiCaseStudy />
            </PageTransition>
          }
        />
        <Route
          path="/work/3d-showcase"
          element={
            <PageTransition>
              <ThreeDShowcaseCaseStudy />
            </PageTransition>
          }
        />
        <Route
          path="/work/responsive-web"
          element={
            <PageTransition>
              <ResponsiveWebCaseStudy />
            </PageTransition>
          }
        />
        <Route
          path="/work/campaign"
          element={
            <PageTransition>
              <CampaignDesignCaseStudy />
            </PageTransition>
          }
        />
        <Route
          path="/work/brand-visual"
          element={
            <PageTransition>
              <BrandVisualCaseStudy />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SoundProvider>
        <Router>
          <ScrollToTop />
          <BackgroundGradient />
          <CustomCursor />
          <Navigation />
          <AnimatedRoutes />
        </Router>
      </SoundProvider>
    </LanguageProvider>
  );
};

export default App;
