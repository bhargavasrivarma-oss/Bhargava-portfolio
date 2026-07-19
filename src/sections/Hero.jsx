import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, RefreshCw } from 'lucide-react';
import NeuralSphere from '../canvas/NeuralSphere';
import { playInterfaceSound } from '../components/SoundController';

function Typewriter({ words, speed = 80, delay = 1800 }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTxt(currentWord.substring(0, txt.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setTxt(currentWord.substring(0, txt.length + 1));
      }, speed);
    }

    if (!isDeleting && txt === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && txt === "") {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [txt, isDeleting, wordIdx, words, speed, delay]);

  return (
    <span className="text-glow-cyan text-primary font-orbitron border-r border-primary/80 animate-pulse pr-1">
      {txt}
    </span>
  );
}

export default function Hero({ onShowNotification }) {
  const [resumeText, setResumeText] = useState("DOWNLOAD RESUME");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleResumeClick = () => {
    if (isSyncing) return;
    playInterfaceSound(700, 'sine', 0.1, 0.02);
    setIsSyncing(true);
    setResumeText("RESUME COMING SOON");

    setTimeout(() => {
      setResumeText("DOWNLOAD RESUME");
      setIsSyncing(false);
      onShowNotification("RESUME_SYNC: File compilation is scheduled.");
    }, 3000);
  };

  const handleExploreClick = () => {
    playInterfaceSound(600, 'sine', 0.06, 0.015);
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 md:pt-16 overflow-hidden px-6 max-w-7xl mx-auto z-10"
    >
      {/* Mesh auroras in background */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[90px] pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 w-fit mb-6 select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="font-orbitron text-[9px] text-accent tracking-widest font-semibold uppercase">NEURAL LINK STABLE // PROTOCOL 2060</span>
          </motion.div>

          {/* Name Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-orbitron mb-6 flex flex-col leading-none"
          >
            <span className="text-xs text-subtext uppercase tracking-[0.25em] mb-2 font-mono">HUMAN_HOST_IDENTIFIER</span>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white flex flex-col gap-1 md:gap-3">
              <span>C.H.E.K.U.R.I</span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
                BHARGAVA
              </span>
              <span>SRI VARMA</span>
            </h1>
          </motion.div>

          {/* Typewriter Rotator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 text-base sm:text-lg text-subtext flex items-center gap-2 mb-8 font-mono select-none"
          >
            <span className="text-white/60">&gt; TYPE:</span>
            <Typewriter
              words={[
                "Frontend Developer",
                "AI Explorer",
                "Creative Developer",
                "Problem Solver",
                "Tech Enthusiast"
              ]}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
          >
            <button
              onClick={handleExploreClick}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-cyberBg font-bold font-orbitron text-xs tracking-widest flex items-center justify-center gap-2 hover:shadow-neonCyan hover:scale-103 transition-all cursor-pointer"
              data-cursor="pointer"
            >
              <span>EXPLORE PORTFOLIO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleResumeClick}
              className="px-6 py-3.5 rounded-full border border-primary/30 hover:border-primary text-primary font-semibold font-orbitron text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all cursor-pointer relative overflow-hidden"
              data-cursor="pointer"
            >
              {isSyncing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{resumeText}</span>
            </button>
          </motion.div>

        </div>

        {/* Right Side: NeuralSphere Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 h-[350px] lg:h-[480px] w-full flex items-center justify-center relative cursor-grab active:cursor-grabbing"
          data-cursor="pointer"
        >
          <NeuralSphere />
        </motion.div>

      </div>
    </section>
  );
}
