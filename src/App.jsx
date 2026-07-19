import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell } from 'lucide-react';

// Core canvas and utilities
import SpaceParticles from './canvas/SpaceParticles';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import MatrixRain from './components/MatrixRain';
import AIAssistant from './components/AIAssistant';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import AIEcosystem from './sections/AIEcosystem';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Stats from './sections/Stats';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Floating Notification Banner
function NotificationBanner({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-24 right-6 z-50 glass-panel-glow border-primary/45 px-5 py-3 rounded-full flex items-center gap-3 font-orbitron shadow-neonCyan select-none pointer-events-none"
    >
      <Bell className="w-3.5 h-3.5 text-primary animate-bounce" />
      <span className="text-[10px] text-white font-bold tracking-widest uppercase">
        {message}
      </span>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [notification, setNotification] = useState("");

  const triggerNotification = (msg) => {
    setNotification(msg);
  };

  const handleTogglePalette = (forceOpen = null) => {
    if (forceOpen !== null) {
      setIsPaletteOpen(forceOpen);
    } else {
      setIsPaletteOpen((prev) => !prev);
    }
  };

  const handleToggleMatrix = () => {
    setIsMatrixActive((prev) => !prev);
    triggerNotification(isMatrixActive ? "NEURAL_STREAM: DEACTIVATED" : "NEURAL_STREAM: INITIALIZED");
  };

  // Keyboard shortcut listener for matrix toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        handleToggleMatrix();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMatrixActive]);

  return (
    <div className="relative bg-cyberBg text-white min-h-screen overflow-x-hidden w-full select-text selection:bg-primary/20 selection:text-primary">
      {/* Background scanlines, grids and textures */}
      <div className="noise-bg" />
      <div className="scanlines" />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Pre-boot cinematic loader */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Assemble Application once loading finishes */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="relative min-h-screen w-full flex flex-col items-center"
        >
          {/* Layered Animated Backgrounds */}
          <SpaceParticles />
          <MatrixRain isActive={isMatrixActive} />

          {/* Floating UI Notification Overlay */}
          <AnimatePresence>
            {notification && (
              <NotificationBanner 
                message={notification} 
                onClose={() => setNotification("")} 
              />
            )}
          </AnimatePresence>

          {/* Floating HUD Capsule Navbar */}
          <Navbar 
            onOpenPalette={() => handleTogglePalette(true)} 
            onShowNotification={triggerNotification}
          />

          {/* Ctrl+K Terminal Cmd Prompt Modal */}
          <CommandPalette 
            isOpen={isPaletteOpen} 
            onClose={() => handleTogglePalette(false)} 
            onShowNotification={triggerNotification}
            onToggleMatrix={handleToggleMatrix}
          />

          {/* Main sections */}
          <main className="w-full flex flex-col items-center relative z-10">
            <Hero onShowNotification={triggerNotification} />
            <About />
            <Skills />
            <AIEcosystem />
            <Projects onShowNotification={triggerNotification} />
            <Education />
            <Stats onShowNotification={triggerNotification} />
            <Contact onShowNotification={triggerNotification} />
          </main>

          {/* Core Footer */}
          <Footer />

          {/* Interactive JARVIS Proxy Dialog widget */}
          <AIAssistant />

        </motion.div>
      )}
    </div>
  );
}
