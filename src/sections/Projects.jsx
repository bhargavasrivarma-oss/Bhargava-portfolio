import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Compass } from 'lucide-react';

function GithubIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}
import { playInterfaceSound } from '../components/SoundController';

function TiltCard({ children, className, glowColor }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const rX = -(y / (box.height / 2)) * 12;
    const rY = (x / (box.width / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playInterfaceSound(900, 'sine', 0.04, 0.01);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-shadow duration-300`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.03 : 1})`,
        boxShadow: isHovered ? glowColor : 'none',
        transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
      }}
    >
      {children}
    </div>
  );
}

const PROJECTS = [
  { id: 1, title: "Project 01: Coming Soon", desc: "A futuristic AI-powered application architecture utilizing generative web frameworks.", tags: ["REACT 19", "THREEJS", "TAILWIND"], glow: "0 0 25px rgba(0, 245, 255, 0.25)", borderClass: "hover:border-primary/50" },
  { id: 2, title: "Project 02: Coming Soon", desc: "A responsive data visualization HUD displaying real-time server stream variables.", tags: ["VITE", "GSAP", "LUCIDE"], glow: "0 0 25px rgba(124, 58, 237, 0.25)", borderClass: "hover:border-secondary/50" },
  { id: 3, title: "Project 03: Coming Soon", desc: "A customized vector indexing interface designed for neural query integrations.", tags: ["AI AUTOMATION", "WEBAUDIO"], glow: "0 0 25px rgba(0, 255, 178, 0.25)", borderClass: "hover:border-accent/50" }
];

export default function Projects({ onShowNotification }) {
  const handleButtonClick = (btnType, projId) => {
    playInterfaceSound(800, 'sine', 0.08, 0.02);
    onShowNotification(`PROJECT_${projId}: Neural link compilation scheduled. File offline.`);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 max-w-7xl mx-auto z-10"
    >
      {/* Background neon light rays */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="font-orbitron text-[10px] text-primary tracking-widest uppercase mb-2 font-semibold font-mono">WORKSPACE // CONTEXT</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white text-glow-cyan flex items-center gap-3">
            <Code className="w-6 h-6 sm:w-10 h-10 text-primary animate-pulse" />
            <span>FUTURISTIC PROJECTS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-3 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <TiltCard
                className={`glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between h-[420px] scanlines ${project.borderClass}`}
                glowColor={project.glow}
              >
                {/* Tech brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20" />

                {/* Top Half: Cyber Mockup */}
                <div>
                  {/* Cyber grid preview container */}
                  <div className="w-full h-36 bg-black/40 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden mb-6 group-hover:border-primary/20 transition-all select-none">
                    <div className="absolute inset-0 cyber-grid opacity-30" />
                    <Compass className="w-8 h-8 text-primary/30 animate-spin-slow" />
                    <span className="absolute bottom-2 right-3 font-orbitron text-[8px] text-primary/40 tracking-wider">PROJECT_REPLICATOR_v60</span>
                  </div>

                  <h3 className="font-orbitron text-base font-bold text-white mb-2 tracking-wide">
                    {project.title}
                  </h3>

                  <p className="text-xs text-subtext leading-relaxed font-sans mb-4">
                    {project.desc}
                  </p>
                </div>

                {/* Bottom Half: Tags & Actions */}
                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-orbitron tracking-widest font-bold text-primary/75 bg-primary/5 px-2 py-0.5 rounded border border-primary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4 border-t border-white/5 pt-4">
                    <button
                      onClick={() => handleButtonClick('preview', project.id)}
                      className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-[#050816] font-bold font-orbitron text-[10px] tracking-wider flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      data-cursor="pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>PREVIEW</span>
                    </button>
                    <button
                      onClick={() => handleButtonClick('github', project.id)}
                      className="px-4 py-2 rounded-xl border border-white/10 text-white font-bold font-orbitron text-[10px] tracking-wider flex items-center justify-center hover:bg-white/5 hover:border-white/20 active:scale-95 transition-all cursor-pointer"
                      data-cursor="pointer"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
