import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Mail, BarChart3, Radio } from 'lucide-react';
import { playInterfaceSound } from '../components/SoundController';

function LinkedinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GithubIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function Counter({ from = 0, to, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let active = true;
    const controls = animate(from, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (value) => {
        if (active) setCount(Math.floor(value));
      }
    });

    return () => {
      active = false;
      controls.stop();
    };
  }, [from, to, duration]);

  return <span>{count}{suffix}</span>;
}

const SOCIAL_NETWORKS = [
  { id: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, url: 'https://www.linkedin.com', active: true, color: 'hover:text-primary hover:border-primary/50 text-[#00f5ff]' },
  { id: 'github', label: 'GitHub', icon: GithubIcon, url: '#', active: false, color: 'hover:text-secondary hover:border-secondary/50 text-[#7c3aed]' },
  { id: 'instagram', label: 'Instagram', icon: InstagramIcon, url: '#', active: false, color: 'hover:text-accent hover:border-accent/50 text-[#00ffb2]' },
  { id: 'email', label: 'Email', icon: Mail, url: '#', active: false, color: 'hover:text-primary hover:border-primary/50 text-[#00f5ff]' }
];

export default function Stats({ onShowNotification }) {
  const handleSocialClick = (social) => {
    if (social.active) {
      playInterfaceSound(650, 'triangle', 0.1, 0.02);
      window.open(social.url, '_blank', 'noopener,noreferrer');
      onShowNotification(`REDIRECT: Accessing ${social.label} gateway...`);
    } else {
      playInterfaceSound(350, 'sawtooth', 0.15, 0.015);
      onShowNotification(`LINK_ERROR: ${social.label} node offline. Integration pending.`);
    }
  };

  return (
    <section
      id="stats"
      className="relative min-h-[90vh] w-full flex items-center justify-center py-20 px-6 max-w-7xl mx-auto z-10"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Block: Animated Counters */}
        <div className="lg:col-span-6 flex flex-col gap-8 justify-center">
          
          <div className="flex flex-col text-left">
            <span className="font-orbitron text-[10px] text-primary tracking-widest uppercase mb-2 font-semibold font-mono">SPECTRUM // METRICS</span>
            <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white text-glow-cyan flex items-center gap-3">
              <BarChart3 className="w-6 h-6 sm:w-10 h-10 text-primary animate-pulse" />
              <span>QUANTUM STATS</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mt-3 rounded-full" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            
            {/* Stat 1 */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden scanlines">
              <span className="font-orbitron text-[9px] text-subtext/60 tracking-wider">DEV_STACK</span>
              <div className="font-orbitron text-3xl sm:text-4xl font-extrabold text-white text-glow-cyan mt-1 mb-2">
                <Counter to={10} suffix="+" />
              </div>
              <p className="text-[10px] sm:text-xs text-subtext leading-relaxed">Frontend Technologies mastered.</p>
            </div>

            {/* Stat 2 */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden scanlines">
              <span className="font-orbitron text-[9px] text-subtext/60 tracking-wider">COGNITIVE_AGENTS</span>
              <div className="font-orbitron text-3xl sm:text-4xl font-extrabold text-white text-glow-purple mt-1 mb-2">
                <Counter to={30} suffix="+" />
              </div>
              <p className="text-[10px] sm:text-xs text-subtext leading-relaxed">AI Productivity tools in use.</p>
            </div>

            {/* Stat 3 */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden scanlines">
              <span className="font-orbitron text-[9px] text-subtext/60 tracking-wider">PROJECT_VECTORS</span>
              <div className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white text-glow-green mt-1 mb-2 animate-pulse">
                GROWING
              </div>
              <p className="text-[10px] sm:text-xs text-subtext leading-relaxed">Continuous production cycles.</p>
            </div>

            {/* Stat 4 */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden scanlines">
              <span className="font-orbitron text-[9px] text-subtext/60 tracking-wider">LEARNING_FREQUENCY</span>
              <div className="font-orbitron text-xl sm:text-2xl font-extrabold text-white text-glow-cyan mt-1.5 mb-2 leading-none uppercase">
                EVERY DAY
              </div>
              <p className="text-[10px] sm:text-xs text-subtext leading-relaxed">Neural pathways updating constantly.</p>
            </div>

          </div>
        </div>

        {/* Right Block: Social Links */}
        <div className="lg:col-span-6 flex flex-col gap-8 justify-center">
          
          <div className="flex flex-col text-left">
            <span className="font-orbitron text-[10px] text-accent tracking-widest uppercase mb-2 font-semibold font-mono">TRANSMISSIONS // NODE</span>
            <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white text-glow-green flex items-center gap-3">
              <Radio className="w-6 h-6 sm:w-10 h-10 text-accent animate-pulse" />
              <span>SOCIAL LINKS</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {SOCIAL_NETWORKS.map((soc) => {
              const Icon = soc.icon;
              return (
                <button
                  key={soc.id}
                  onClick={() => handleSocialClick(soc)}
                  className={`glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden scanlines flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${soc.color}`}
                  data-cursor="pointer"
                >
                  <div className="p-3.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-orbitron text-xs font-bold text-white tracking-widest uppercase mt-1">
                    {soc.label}
                  </span>
                  {!soc.active && (
                    <span className="text-[8px] font-mono opacity-30 tracking-wider">OFFLINE</span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
