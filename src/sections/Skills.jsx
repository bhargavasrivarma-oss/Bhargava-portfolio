import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Shield, Sparkles } from 'lucide-react';
import { playInterfaceSound } from '../components/SoundController';

const ORBIT_1 = [
  { name: "HTML5", level: "Expert" },
  { name: "CSS3", level: "Expert" },
  { name: "JavaScript", level: "Advanced" },
  { name: "React", level: "Advanced" },
  { name: "Tailwind CSS", level: "Expert" },
  { name: "Bootstrap", level: "Intermediate" }
];

const ORBIT_2 = [
  { name: "Git", level: "Advanced" },
  { name: "GitHub", level: "Advanced" },
  { name: "Firebase", level: "Intermediate" },
  { name: "REST APIs", level: "Advanced" },
  { name: "Responsive Design", level: "Expert" },
  { name: "Animations", level: "Advanced" }
];

const ORBIT_3 = [
  { name: "Node.js (Basic)", level: "Foundational" },
  { name: "Express (Basic)", level: "Foundational" },
  { name: "AI Tools", level: "Expert" },
  { name: "Prompt Engineering", level: "Expert" },
  { name: "UI/UX", level: "Advanced" },
  { name: "Problem Solving", level: "Advanced" },
  { name: "Performance Optimization", level: "Advanced" }
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const getCoordinates = (index, total, radius) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const handleHoverStart = (skill) => {
    playInterfaceSound(950, 'triangle', 0.05, 0.01);
    setHoveredSkill(skill);
  };

  return (
    <section
      id="skills"
      className="relative min-h-[110vh] w-full flex flex-col items-center justify-center py-24 overflow-hidden z-10"
    >
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl px-6 flex flex-col gap-16 items-center">
        
        {/* Title Heading */}
        <div className="text-center flex flex-col items-center">
          <span className="font-orbitron text-[10px] text-primary tracking-widest uppercase mb-2 font-semibold">CAPABILITIES // VECTORS</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white text-glow-cyan flex items-center gap-3">
            <Layers className="w-6 h-6 sm:w-10 h-10 text-primary animate-pulse" />
            <span>MY SKILLS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-3 rounded-full" />
        </div>

        {/* Orbit Sandbox Container */}
        <div className="w-full flex flex-col lg:flex-row gap-12 items-center justify-center mt-6">
          
          {/* Orbital visual engine */}
          <div className="relative w-[340px] h-[340px] sm:w-[680px] sm:h-[680px] flex items-center justify-center select-none scale-90 sm:scale-100 shrink-0">
            
            {/* Center Core HUD Node */}
            <div className="absolute z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full glass-panel-glow border-primary/45 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer group p-3">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-35" />
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1 animate-pulse" />
              <span className="font-orbitron text-[9px] sm:text-[10px] text-white font-bold tracking-widest leading-tight">CORE<br />VECTORS</span>
            </div>

            {/* Orbit Circle 1: Core Frontend (Radius: 80px mobile, 140px desktop) */}
            <div className="absolute w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] border border-primary/10 rounded-full animate-spin-slow hover-pause pointer-events-none" style={{ animationDuration: '28s' }}>
              <div className="w-full h-full relative">
                {ORBIT_1.map((skill, index) => {
                  const pos = getCoordinates(index, ORBIT_1.length, window.innerWidth < 640 ? 80 : 140);
                  return (
                    <div
                      key={skill.name}
                      className="absolute pointer-events-auto"
                      style={{
                        left: `calc(50% + ${pos.x}px)`,
                        top: `calc(50% + ${pos.y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => handleHoverStart(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Counter-rotation to keep card horizontal */}
                      <div className="animate-spin-reverse-slow hover-pause" style={{ animationDuration: '28s' }}>
                        <motion.div
                          whileHover={{ scale: 1.15, rotateY: 15 }}
                          className="px-3 py-1.5 rounded-lg glass-panel-glow border-primary/30 text-white font-orbitron text-[9px] sm:text-[10px] font-bold tracking-wider cursor-crosshair whitespace-nowrap shadow-neonCyan hover:border-glow-cyan"
                        >
                          {skill.name}
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Orbit Circle 2: Tools (Radius: 120px mobile, 220px desktop) */}
            <div className="absolute w-[240px] h-[240px] sm:w-[440px] sm:h-[440px] border border-secondary/15 rounded-full animate-spin-slow-reverse hover-pause pointer-events-none" style={{ animationDuration: '45s' }}>
              <div className="w-full h-full relative">
                {ORBIT_2.map((skill, index) => {
                  const pos = getCoordinates(index, ORBIT_2.length, window.innerWidth < 640 ? 120 : 220);
                  return (
                    <div
                      key={skill.name}
                      className="absolute pointer-events-auto"
                      style={{
                        left: `calc(50% + ${pos.x}px)`,
                        top: `calc(50% + ${pos.y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => handleHoverStart(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="animate-spin-slow hover-pause" style={{ animationDuration: '45s' }}>
                        <motion.div
                          whileHover={{ scale: 1.15, rotateY: -15 }}
                          className="px-3 py-1.5 rounded-lg glass-panel-glow border-secondary/35 text-white font-orbitron text-[9px] sm:text-[10px] font-bold tracking-wider cursor-crosshair whitespace-nowrap shadow-neonPurple hover:border-glow-purple"
                        >
                          {skill.name}
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Orbit Circle 3: AI & Optimization (Radius: 160px mobile, 300px desktop) */}
            <div className="absolute w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] border border-accent/10 rounded-full animate-spin-slow hover-pause pointer-events-none" style={{ animationDuration: '60s' }}>
              <div className="w-full h-full relative">
                {ORBIT_3.map((skill, index) => {
                  const pos = getCoordinates(index, ORBIT_3.length, window.innerWidth < 640 ? 160 : 300);
                  return (
                    <div
                      key={skill.name}
                      className="absolute pointer-events-auto"
                      style={{
                        left: `calc(50% + ${pos.x}px)`,
                        top: `calc(50% + ${pos.y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => handleHoverStart(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="animate-spin-reverse-slow hover-pause" style={{ animationDuration: '60s' }}>
                        <motion.div
                          whileHover={{ scale: 1.15, rotateX: 15 }}
                          className="px-3 py-1.5 rounded-lg glass-panel-glow border-accent/30 text-white font-orbitron text-[9px] sm:text-[10px] font-bold tracking-wider cursor-crosshair whitespace-nowrap shadow-neonGreen hover:border-glow-green"
                        >
                          {skill.name}
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Left panel: Info screen */}
          <div className="w-full max-w-sm flex flex-col justify-center">
            <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden scanlines min-h-[220px] flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary/30" />

              <div className="flex items-center gap-2 text-primary text-xs font-orbitron font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4 animate-spin-slow text-accent" />
                <span>INTELLIGENCE_METRIC</span>
              </div>

              {hoveredSkill ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 font-orbitron"
                >
                  <h3 className="text-xl font-bold text-glow-cyan text-white">{hoveredSkill.name}</h3>
                  <div className="flex justify-between items-center text-xs text-subtext">
                    <span>CAPACITY_INDEX</span>
                    <span className="text-accent font-semibold">{hoveredSkill.level}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        hoveredSkill.level === 'Expert' ? 'w-full bg-accent' : 
                        hoveredSkill.level === 'Advanced' ? 'w-4/5 bg-primary' : 'w-3/5 bg-secondary'
                      }`}
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-2 text-xs text-subtext leading-relaxed font-mono">
                  <p>&gt;&gt; SYSTEM READY</p>
                  <p>&gt;&gt; HOVER OVER ANY ORBITING VECTOR CELL TO LOAD HOST LEVEL ANALYSIS AND CAPACITY INDEX SPECTRAL CHARTS.</p>
                  <div className="w-full border-t border-white/5 mt-4 pt-3 flex gap-4 text-[9px] tracking-widest text-primary/30">
                    <span>CYAN: INNER</span>
                    <span>PURPLE: MIDDLE</span>
                    <span>GREEN: OUTER</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Orbit Pause Animations injected to index.css if not added */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-pause:hover {
          animation-play-state: paused !important;
        }
        .animate-spin-slow-reverse {
          animation: spin-reverse 45s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse 28s linear infinite;
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}} />
    </section>
  );
}
