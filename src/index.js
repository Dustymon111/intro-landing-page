// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Certifications from './pages/certifications';
import About from './pages/about';
import Projects from './pages/projects';
import Navigation from './components/navigation';
import './index.css';  // Your Tailwind CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-gradient-to-b from-[#32BBB4] to-[#25A6CA] text-white h-screen overflow-hidden flex flex-col">
        <Navigation />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);