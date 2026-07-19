import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
  { text: "AI booting...", delay: 600, color: "text-primary" },
  { text: "Initializing neural core...", delay: 1400, color: "text-secondary" },
  { text: "Loading portfolio...", delay: 2200, color: "text-primary" },
  { text: "Synchronizing data...", delay: 3000, color: "text-accent" },
  { text: "Identity Verified", delay: 3800, color: "text-green-400" },
  { text: "Welcome.", delay: 4400, color: "text-primary font-bold text-glow-cyan" }
];

// Synthesizer for futuristic interface audio
const playSound = (freq, type = 'sine', duration = 0.1) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio context may not be allowed to boot before user gesture, which is fine
  }
};

export default function Loader({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 4;
        return prev + step > 100 ? 100 : prev + step;
      });
    }, 180);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const timers = BOOT_LOGS.map((log, index) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        // Synth sounds
        if (index === BOOT_LOGS.length - 1) {
          // Welcome tone chord
          playSound(523.25, 'triangle', 0.4); // C5
          setTimeout(() => playSound(659.25, 'triangle', 0.4), 80); // E5
          setTimeout(() => playSound(783.99, 'triangle', 0.5), 160); // G5
        } else {
          playSound(600 + index * 120, 'sine', 0.06);
        }
      }, log.delay);
    });

    const finishTimer = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 5500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 bg-[#050816] z-50 flex flex-col items-center justify-center p-4 cyber-grid select-none"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Radial blur backgrounds */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] aurora-bg" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] aurora-bg" />
          
          <div className="w-full max-w-md glass-panel-glow p-8 rounded-xl font-orbitron border border-primary/20 relative z-10 scanlines">
            {/* Tech Corner borders */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" />

            <div className="flex justify-between items-center text-[10px] text-primary/75 border-b border-primary/10 pb-3 mb-5 tracking-widest">
              <span>SYS_BOOT // BHARGAVA_OS_v60</span>
              <span className="animate-pulse text-accent">INITIALIZING_NEURAL</span>
            </div>

            {/* Scrollable logs */}
            <div className="h-40 flex flex-col justify-start gap-2 overflow-y-auto mb-5 text-[13px] font-mono select-none">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 ${log.color}`}
                >
                  <span className="text-xs opacity-40">&gt;&gt;</span>
                  <span>{log.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Progress metrics */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-subtext tracking-widest">
                <span>CONNECTIVITY_STREAM</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden p-[0.5px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-secondary via-primary to-accent rounded-full shadow-neonCyan"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
