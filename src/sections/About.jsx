import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Award, Zap } from 'lucide-react';

const BIODATA = [
  "Hello, I'm C.H.E.K.U.R.I Bhargava Sri Varma.",
  "I am an undergraduate student at Narsimha Reddy Engineering College.",
  "I completed my Intermediate education at Sri Chaitanya Junior College.",
  "I completed my Schooling at Sri Chaitanya School.",
  "I specialize in building beautiful, responsive, and highly interactive web experiences using modern frontend technologies.",
  "Apart from frontend development, I also possess foundational backend knowledge and continuously explore artificial intelligence to enhance productivity and build smarter applications.",
  "AI is one of my strongest skills. I actively use various AI tools for development, design, automation, research, and problem solving.",
  "I believe technology should not only work—it should inspire."
];

const DIAGNOSTICS = [
  { metric: "INTELLIGENCE CORE", val: "94.8%", color: "bg-primary" },
  { metric: "FRONTEND STACK SYNC", val: "98.2%", color: "bg-accent" },
  { metric: "AI TOOL AUTOMATION", val: "97.5%", color: "bg-secondary" },
  { metric: "CREATIVE HEURISTICS", val: "92.0%", color: "bg-primary" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 max-w-7xl mx-auto z-10"
    >
      <div className="w-full flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="font-orbitron text-[10px] text-primary tracking-widest uppercase mb-2 font-semibold">SEC_IDENTIFIER // HOST</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white text-glow-cyan flex items-center gap-3">
            <User className="w-6 h-6 sm:w-10 h-10 text-primary animate-pulse" />
            <span>WHO AM I?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-3 rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Bio Paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 glass-panel-glow border-white/5 p-6 sm:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between scanlines"
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/40" />
            
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-subtext font-sans">
              {BIODATA.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-4 border-l border-primary/10 hover:border-primary/40 transition-colors py-0.5"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-primary/45 font-orbitron">
              <span>STATUS: BIOLOGICALLY_OPERATIONAL</span>
              <span>INDEX: ENG_COLL_04</span>
            </div>
          </motion.div>

          {/* Right Block: Diagnostics HUD Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* System Spec Sheet */}
            <div className="glass-panel p-6 rounded-2xl border-primary/10 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4 font-orbitron text-xs">
                <span className="text-primary flex items-center gap-1.5 font-bold uppercase"><Cpu className="w-3.5 h-3.5" /> HOST_DIAGNOSTICS</span>
                <span className="text-[10px] text-accent animate-pulse font-semibold">SYNCHRONIZED</span>
              </div>

              {/* Progress bars */}
              <div className="space-y-4">
                {DIAGNOSTICS.map((diag, i) => (
                  <div key={i} className="space-y-1.5 font-orbitron text-[10px]">
                    <div className="flex justify-between text-subtext tracking-wider">
                      <span>{diag.metric}</span>
                      <span className="text-white font-mono">{diag.val}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden p-[0.5px]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: diag.val }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1 }}
                        className={`h-full rounded-full ${diag.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-[9px] text-subtext/40 leading-normal font-mono border-t border-white/5 pt-4">
                CORE_INTENSITY: DETUNED_LFO_SPEED: 0.06Hz<br />
                MATRIX_COMPILATION: SUCCESSFUL // REACT19_RENDER
              </div>
            </div>

            {/* Quote block */}
            <div className="glass-panel-glow border-accent/20 p-6 rounded-2xl relative overflow-hidden flex items-center gap-4 bg-accent/2">
              <Zap className="w-8 h-8 text-accent animate-pulse shrink-0" />
              <div className="flex flex-col font-orbitron">
                <span className="text-[9px] text-accent tracking-widest font-semibold uppercase">CREDO_VALUE</span>
                <p className="text-xs text-white leading-relaxed font-semibold italic mt-1 pr-2">
                  "Technology should not only work—it should inspire."
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
