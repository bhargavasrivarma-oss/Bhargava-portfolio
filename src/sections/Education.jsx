import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Landmark, BookOpen, Star } from 'lucide-react';

const EDUCATION_TIMELINE = [
  {
    stage: "Bachelor's Degree",
    institution: "Narsimha Reddy Engineering College",
    duration: "Undergraduate (Current)",
    details: "Focusing on Frontend Architectures, Algorithmic Problem Solving, and Generative Artificial Intelligence tools.",
    icon: GraduationCap,
    glow: "text-glow-cyan text-primary"
  },
  {
    stage: "Intermediate Education",
    institution: "Sri Chaitanya Junior College",
    duration: "Completed",
    details: "Mathematics, Physics, and Chemistry core curriculums with foundational physics logic training.",
    icon: Landmark,
    glow: "text-glow-purple text-secondary"
  },
  {
    stage: "Schooling",
    institution: "Sri Chaitanya School",
    duration: "Completed",
    details: "Primary and Secondary schooling with strong focus on basic science, mathematics, and communication capabilities.",
    icon: BookOpen,
    glow: "text-glow-green text-accent"
  }
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 max-w-7xl mx-auto z-10"
    >
      {/* Aurora glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-secondary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-full flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="font-orbitron text-[10px] text-primary tracking-widest uppercase mb-2 font-semibold font-mono">CHRONOLOGY // KNOWLEDGE</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white text-glow-cyan flex items-center gap-3">
            <GraduationCap className="w-6 h-6 sm:w-10 h-10 text-primary animate-pulse" />
            <span>JOURNEY & EDUCATION</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-3 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="relative w-full max-w-4xl mx-auto mt-10">
          
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {EDUCATION_TIMELINE.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.stage}
                  className="flex flex-col md:flex-row items-stretch relative"
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.25 }}
                      className="w-10 h-10 rounded-full glass-panel-glow border-primary/45 flex items-center justify-center bg-cyberBg text-white shadow-md cursor-help"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>

                  {/* Left Side (Desktop spacer or item) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right flex flex-col justify-center order-2 md:order-1">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel p-6 rounded-2xl border-white/5 relative scanlines text-left md:text-right"
                      >
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 hidden md:block" />
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 md:hidden" />
                        
                        <span className="font-orbitron text-[9px] text-accent tracking-widest font-semibold uppercase">{item.duration}</span>
                        <h3 className="font-orbitron text-lg font-bold text-white mt-1 mb-2 tracking-wide">{item.stage}</h3>
                        <h4 className="font-orbitron text-xs text-primary font-semibold mb-3 tracking-wider">{item.institution}</h4>
                        <p className="text-xs text-subtext leading-relaxed font-sans">{item.details}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side (Desktop spacer or item) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-12 flex flex-col justify-center order-3">
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel p-6 rounded-2xl border-white/5 relative scanlines text-left"
                      >
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20" />
                        
                        <span className="font-orbitron text-[9px] text-accent tracking-widest font-semibold uppercase">{item.duration}</span>
                        <h3 className="font-orbitron text-lg font-bold text-white mt-1 mb-2 tracking-wide">{item.stage}</h3>
                        <h4 className="font-orbitron text-xs text-primary font-semibold mb-3 tracking-wider">{item.institution}</h4>
                        <p className="text-xs text-subtext leading-relaxed font-sans">{item.details}</p>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Undergrad tag indicator at top */}
          <div className="w-fit mx-auto mt-16 glass-panel border-accent/20 px-6 py-2.5 rounded-full flex items-center gap-2 relative">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <Star className="w-3.5 h-3.5 text-accent animate-spin-slow" />
            <span className="font-orbitron text-[10px] text-white tracking-widest font-bold uppercase">CURRENT STATUS: UNDERGRADUATE</span>
          </div>

        </div>

      </div>
    </section>
  );
}
