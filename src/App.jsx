// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Loader from './components/loader';
import About from './pages/about';
import Projects from './pages/projects';
import Home from './pages/home';
import ParticleBackground from './components/particle';
import Contact from './pages/contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <div className="bg-gradient-to-b from-[#0F172A] to-[#1E3A8A] text-white min-h-screen overflow-hidden flex flex-col relative">
        <ParticleBackground
          particleCount={150}
          particleColor="rgba(255, 255, 255, 0.5)"
          style="light" // Use "rain" or "light"
          fallSpeed={0.3}
          wind={0.2}
        />

        <div className="relative z-10">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}