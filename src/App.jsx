// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Navigation from './components/navigation';
import Loader from './components/loader';
import About from './pages/about';
import Projects from './pages/projects';
import Home from './pages/home';
import Experience from './pages/experience';
import ParticleBackground from './components/particle';
import Spotlight from './components/spotlight';
import Contact from './pages/contact';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <BrowserRouter key="app">
            <div className="text-slate-100 min-h-screen overflow-x-clip flex flex-col relative">
              {/* Layered backdrop: gradient, grid, glow */}
              <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#0F172A] to-[#172554]" />
                <div className="absolute inset-0 bg-grid" />
                <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] max-w-[140vw] h-[520px] rounded-full bg-accent-2/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[140px]" />
              </div>
              <ParticleBackground
                particleCount={120}
                particleColor="rgba(255, 255, 255, 0.5)"
                style="light" // Use "rain" or "light"
                fallSpeed={0.3}
                wind={0.2}
              />
              <Spotlight />

              <div className="relative z-10 flex flex-col min-h-screen">
                <Navigation />
                <div className="flex-1">
                  <AnimatedRoutes />
                </div>
                <footer className="px-6 sm:px-10 xl:px-16 py-8 mt-16 border-t border-white/5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-slate-500 font-mono">
                  <span>© {new Date().getFullYear()} Dustin Lionel</span>
                  <span>Built with React, Tailwind & Framer Motion</span>
                </footer>
              </div>
            </div>
          </BrowserRouter>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
