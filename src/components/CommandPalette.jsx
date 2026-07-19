import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Navigation, HardDrive, ShieldCheck } from 'lucide-react';
import { playInterfaceSound } from './SoundController';

export default function CommandPalette({ isOpen, onClose, onShowNotification, onToggleMatrix }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playInterfaceSound(600, 'sine', 0.1, 0.02);
        if (isOpen) onClose();
        else onClose(true); // open trigger
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const executeAction = (actionType, targetId) => {
    playInterfaceSound(800, 'sine', 0.05, 0.025);
    onClose();

    if (actionType === 'scroll') {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'diagnose') {
      onShowNotification("SYS_DIAGNOSTICS: Host online. Latency: 4ms. Integrity: 99.8%. WebGL active.");
    } else if (actionType === 'matrix') {
      onToggleMatrix();
    }
  };

  const commands = [
    { id: 'go-home', label: 'Navigate: Home', category: 'Navigation', icon: Navigation, action: () => executeAction('scroll', 'home') },
    { id: 'go-about', label: 'Navigate: About', category: 'Navigation', icon: Navigation, action: () => executeAction('scroll', 'about') },
    { id: 'go-skills', label: 'Navigate: Skills', category: 'Navigation', icon: Navigation, action: () => executeAction('scroll', 'skills') },
    { id: 'go-ai', label: 'Navigate: AI Stack', category: 'Navigation', icon: Navigation, action: () => executeAction('scroll', 'ai-stack') },
    { id: 'go-projects', label: 'Navigate: Projects', category: 'Navigation', icon: Navigation, action: () => executeAction('scroll', 'projects') },
    { id: 'go-edu', label: 'Navigate: Education', category: 'Navigation', icon: Navigation, action: () => executeAction('scroll', 'education') },
    { id: 'go-contact', label: 'Navigate: Contact', category: 'Navigation', icon: Navigation, action: () => executeAction('scroll', 'contact') },
    { id: 'diag', label: 'Run Systems Diagnostics', category: 'Security', icon: ShieldCheck, action: () => executeAction('diagnose') },
    { id: 'matrix', label: 'Initialize Neural Stream (Easter Egg)', category: 'Interactive', icon: Terminal, action: () => executeAction('matrix') },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 select-none">
          {/* Blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose()}
            className="fixed inset-0 bg-[#050816]/75 backdrop-blur-md"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-lg glass-panel-glow border-primary/25 rounded-2xl relative z-10 overflow-hidden shadow-2xl scanlines font-orbitron"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/10">
              <Search className="w-4 h-4 text-primary animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands (e.g. Navigate, Diagnostics)..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  playInterfaceSound(1000, 'sine', 0.02, 0.005);
                }}
                className="w-full bg-transparent text-sm text-white placeholder-primary/45 border-none outline-none focus:ring-0"
              />
              <span className="text-[10px] text-primary/40 bg-primary/5 px-2 py-0.5 rounded border border-primary/10">ESC</span>
            </div>

            {/* List */}
            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-none">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-left text-xs text-subtext group cursor-pointer"
                      data-cursor="pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{cmd.label}</span>
                      </div>
                      <span className="text-[9px] opacity-40 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5 group-hover:border-primary/20 group-hover:text-primary transition-all">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-primary/40 flex flex-col items-center justify-center gap-2">
                  <HardDrive className="w-8 h-8 opacity-20 animate-bounce" />
                  <span>NO MATCHING NEURAL VECTORS FOUND</span>
                </div>
              )}
            </div>

            {/* Help footer */}
            <div className="bg-white/3 border-t border-primary/10 px-4 py-2.5 flex justify-between text-[8px] text-primary/50 tracking-wider">
              <span>CTRL + K to toggle anywhere</span>
              <span>Select vectors with pointer click</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
