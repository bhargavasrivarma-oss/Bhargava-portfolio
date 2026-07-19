import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Command, Terminal, Sparkles, Wand2, Compass, Network, RefreshCw } from 'lucide-react';

const ECOSYSTEM = [
  { title: "Prompt Engineering", desc: "Synthesizing precise context matrices, constraints, and instructions for LLMs.", icon: Compass, color: "border-primary/20 hover:border-primary/50 text-glow-cyan shadow-neonCyan" },
  { title: "AI Automation", desc: "Building pipelines that connect APIs, vector databases, and automation frameworks.", icon: Network, color: "border-secondary/20 hover:border-secondary/50 text-glow-purple shadow-neonPurple" },
  { title: "Generative AI", desc: "Leveraging generative models for design system brainstorming, copy, and UI prototypes.", icon: Wand2, color: "border-accent/20 hover:border-accent/50 text-glow-green shadow-neonGreen" },
  { title: "AI Assisted Development", desc: "Accelerating execution through pair programming with state-of-the-art developer agents.", icon: Terminal, color: "border-primary/20 hover:border-primary/50 text-glow-cyan shadow-neonCyan" },
  { title: "Code Generation", desc: "Employing advanced models for writing boilerplates, script testing, and code translations.", icon: Brain, color: "border-secondary/20 hover:border-secondary/50 text-glow-purple shadow-neonPurple" },
  { title: "Image Generation", desc: "Generating high-fidelity web UI assets, layouts, and illustrative background textures.", icon: Sparkles, color: "border-accent/20 hover:border-accent/50 text-glow-green shadow-neonGreen" },
  { title: "Productivity AI", desc: "Optimizing research workflows, organizing data schemas, and automating study logs.", icon: Command, color: "border-primary/20 hover:border-primary/50 text-glow-cyan shadow-neonCyan" },
  { title: "Workflow Automation", desc: "Creating autonomous trigger-action agents to automate recursive file updates and reviews.", icon: RefreshCw, color: "border-secondary/20 hover:border-secondary/50 text-glow-purple shadow-neonPurple" }
];

export default function AIEcosystem() {
  return (
    <section
      id="ai-stack"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 max-w-7xl mx-auto z-10"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="font-orbitron text-[10px] text-primary tracking-widest uppercase mb-2 font-semibold font-mono">COGNITIVE // SYNC</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white text-glow-cyan flex items-center gap-3">
            <Brain className="w-6 h-6 sm:w-10 h-10 text-primary animate-pulse" />
            <span>ARTIFICIAL INTELLIGENCE ECOSYSTEM</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-3 rounded-full" />
        </div>

        {/* Global state comment */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <p className="font-orbitron text-sm sm:text-base text-glow-cyan text-primary font-semibold leading-relaxed border border-primary/20 bg-primary/3 p-5 rounded-2xl relative scanlines">
            "I use modern AI tools to accelerate development, improve productivity, automate workflows, generate creative ideas, and build smarter digital experiences."
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`glass-panel p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between group ${item.color}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/3 rounded-full blur-xl group-hover:bg-primary/5 transition-all" />
                
                <div className="mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white group-hover:text-primary transition-all">
                    <Icon className="w-5 h-5 group-hover:animate-pulse" />
                  </div>
                  
                  <h3 className="font-orbitron text-sm font-bold text-white mb-2 tracking-wider group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-subtext leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-primary/45 font-orbitron font-semibold tracking-widest mt-4">
                  <span>VECTOR_CELL_{String(index + 1).padStart(2, '0')}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
