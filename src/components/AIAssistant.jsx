import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Cpu, Send, RefreshCw } from 'lucide-react';
import { playInterfaceSound } from './SoundController';

const PRESETS = [
  { q: "Tell me about Bhargava's stack.", a: "Host Bhargava specializes in high-fidelity Frontend development: React 19, Tailwind CSS, Vite, and GSAP/Framer Motion, with basic Node/Express backend capabilities." },
  { q: "Where does he study?", a: "Bhargava is currently pursuing his Bachelor's Engineering degree at Narsimha Reddy Engineering College (Hyderabad, Telangana)." },
  { q: "How is AI used in his workflow?", a: "AI is integrated into his core developer operations: Prompt Engineering, workflow automation, generating templates, and code design reviews to speed up production." },
  { q: "Is he open to career opportunities?", a: "Yes, host status is set to: OPEN_FOR_INQUIRIES. He is looking for frontend and full-stack software engineer internships and entry roles." }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Systems online. I am Bhargava's Neural Proxy v60. Select an inquiry vector below:" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const logEndRef = useRef(null);

  const toggleWidget = () => {
    playInterfaceSound(isOpen ? 500 : 700, 'sine', 0.1, 0.02);
    setIsOpen(!isOpen);
  };

  const handleSelectQuery = (preset) => {
    if (isTyping) return;
    playInterfaceSound(600, 'sine', 0.05, 0.015);
    
    // Add user message
    setMessages((prev) => [...prev, { type: 'user', text: preset.q }]);
    setIsTyping(true);

    // Simulate analytical delay
    setTimeout(() => {
      playInterfaceSound(880, 'triangle', 0.2, 0.025);
      setMessages((prev) => [...prev, { type: 'bot', text: preset.a }]);
      setIsTyping(false);
    }, 1200);
  };

  // Scroll to bottom of message logs
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-40 font-orbitron select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[320px] sm:w-[360px] h-[450px] glass-panel-glow border-primary/25 rounded-2xl mb-4 overflow-hidden shadow-2xl flex flex-col justify-between scanlines relative"
          >
            {/* Corner styling */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" />

            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary/15 bg-white/3">
              <div className="flex items-center gap-2 text-primary">
                <Cpu className="w-4 h-4 text-glow-cyan animate-spin-slow" />
                <span className="text-xs font-bold tracking-wider">NEURAL_PROXY_v60.9</span>
              </div>
              <button
                onClick={toggleWidget}
                className="text-subtext hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-[11px] leading-relaxed scrollbar-none">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 border ${
                      msg.type === 'user'
                        ? 'bg-primary/10 border-primary/30 text-primary text-right'
                        : 'bg-white/3 border-white/5 text-white'
                    }`}
                  >
                    {msg.type === 'bot' && (
                      <span className="text-accent text-[8.5px] uppercase font-bold tracking-widest block mb-1">
                        &gt; RESPONSE:
                      </span>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/3 border border-white/5 rounded-xl px-3 py-2 text-primary flex items-center gap-1.5 font-bold">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>ANALYZING_CORE_INDEX...</span>
                  </div>
                </div>
              )}
              <div ref={logEndRef} />
            </div>

            {/* Presets Grid Panel */}
            <div className="p-3 border-t border-primary/10 bg-cyberBg">
              <span className="text-[8px] text-primary/45 uppercase tracking-widest font-bold block mb-2">
                CHOOSE INQUIRY VECTOR
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.q}
                    disabled={isTyping}
                    onClick={() => handleSelectQuery(preset)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/3 hover:bg-primary/10 hover:text-primary transition-all text-[9.5px] font-medium text-subtext truncate disabled:opacity-40 cursor-pointer"
                    data-cursor="pointer"
                  >
                    &gt; {preset.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Toggle Bubble */}
      <button
        onClick={toggleWidget}
        className={`w-14 h-14 rounded-full flex items-center justify-center border shadow-xl relative transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
          isOpen
            ? 'bg-secondary border-secondary text-white shadow-neonPurple'
            : 'bg-cyberBg border-primary/30 text-primary shadow-neonCyan hover:border-accent'
        }`}
        data-cursor="pointer"
        aria-label="Toggle Neural Assistant"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
        )}
        <MessageSquare className="w-5 h-5 animate-pulse" />
      </button>
    </div>
  );
}
