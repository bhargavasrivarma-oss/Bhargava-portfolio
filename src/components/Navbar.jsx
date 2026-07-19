import React, { useState, useEffect } from 'react';
import { Menu, X, Command, FileText } from 'lucide-react';
import SoundController, { playInterfaceSound } from './SoundController';

const NAV_LINKS = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Skills", target: "skills" },
  { label: "AI Stack", target: "ai-stack" },
  { label: "Projects", target: "projects" },
  { label: "Education", target: "education" },
  { label: "Contact", target: "contact" }
];

export function LiveHUDClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hrs = String(date.getUTCHours()).padStart(2, '0');
    const mins = String(date.getUTCMinutes()).padStart(2, '0');
    const secs = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hrs}:${mins}:${secs}_UTC`;
  };

  return (
    <div className="hidden xl:flex flex-col items-end font-orbitron text-[9px] text-primary/75 tracking-wider bg-white/5 px-2.5 py-1 rounded border border-white/5">
      <span className="font-medium text-glow-cyan">ORBIT_TIME: {formatTime(time)}</span>
      <span className="text-[7.5px] text-accent opacity-80 uppercase tracking-widest font-mono">TELANGANA // HYD</span>
    </div>
  );
}

export default function Navbar({ onOpenPalette, onShowNotification }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section occupies the center
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.target);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    playInterfaceSound(600, 'sine', 0.05, 0.01);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleResumeClick = () => {
    playInterfaceSound(700, 'sine', 0.08, 0.02);
    onShowNotification("RESUME: Coming Soon. Synch in progress...");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 flex justify-center p-4 ${
        isScrolled ? 'pt-2' : 'pt-5'
      }`}
    >
      <nav
        className={`w-full max-w-7xl transition-all duration-500 rounded-full flex items-center justify-between px-6 py-3 border glass-panel ${
          isScrolled
            ? 'bg-cyberBg/85 border-primary/25 shadow-neonCyan scale-98 py-2 md:py-2.5'
            : 'bg-cyberBg/40 border-white/10'
        }`}
      >
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 cursor-pointer font-orbitron tracking-widest text-primary font-bold text-sm select-none"
          data-cursor="pointer"
        >
          <span className="text-glow-cyan font-extrabold text-base">C.H.E.K.U.R.I</span>
          <span className="text-accent text-[9px] bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded-full hidden md:inline">SYSTEMS_2060</span>
        </div>

        {/* Center: Main Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium font-orbitron tracking-widest uppercase transition-all duration-300 relative overflow-hidden cursor-pointer ${
                activeSection === link.target
                  ? 'text-primary bg-primary/10 border border-primary/30 text-glow-cyan'
                  : 'text-subtext border border-transparent hover:text-white hover:bg-white/5'
              }`}
              data-cursor="pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side: Integrations & HUD UI */}
        <div className="flex items-center gap-3">
          <LiveHUDClock />

          {/* Sound Controls */}
          <SoundController />

          {/* Command Palette Button */}
          <button
            onClick={onOpenPalette}
            className="hidden md:flex p-2.5 rounded-full glass-panel border border-primary/20 text-primary hover:text-accent hover:border-accent/40 transition-all hover:scale-105 active:scale-95 items-center justify-center cursor-pointer shadow-neonCyan group relative"
            aria-label="Open Command Palette"
            data-cursor="pointer"
          >
            <Command className="w-4 h-4" />
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-cyberBg text-[9px] text-primary py-0.5 px-2 rounded border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap font-orbitron tracking-widest">
              CMD_PALETTE [Ctrl+K]
            </span>
          </button>

          {/* Resume button */}
          <button
            onClick={handleResumeClick}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold font-orbitron tracking-widest text-[#050816] bg-gradient-to-r from-primary to-accent rounded-full hover:shadow-neonCyan transition-all hover:scale-105 active:scale-95 cursor-pointer"
            data-cursor="pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playInterfaceSound(500, 'sine', 0.04, 0.015);
              setIsOpen(!isOpen);
            }}
            className="lg:hidden p-2 rounded-full border border-white/10 text-subtext hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
            data-cursor="pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-[80px] left-4 right-4 z-30 glass-panel-glow border-primary/30 p-6 rounded-2xl flex flex-col gap-4 font-orbitron text-center shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 lg:hidden">
          {NAV_LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className={`py-2 border-b border-white/5 text-sm uppercase tracking-widest ${
                activeSection === link.target
                  ? 'text-primary font-bold text-glow-cyan'
                  : 'text-subtext hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleResumeClick}
            className="mt-2 w-full py-2.5 text-xs font-semibold tracking-widest text-[#050816] bg-gradient-to-r from-primary to-accent rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>DOWNLOAD RESUME</span>
          </button>
        </div>
      )}
    </header>
  );
}
