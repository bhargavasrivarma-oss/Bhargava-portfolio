import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, RefreshCw } from 'lucide-react';
import { playInterfaceSound } from '../components/SoundController';

export default function Contact({ onShowNotification }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      playInterfaceSound(350, 'sawtooth', 0.12, 0.015);
      onShowNotification("SYS_WARN: Incomplete parameters. Please populate all vector inputs.");
      return;
    }

    playInterfaceSound(600, 'sine', 0.05, 0.02);
    setStatus("sending");

    // Synthesize contact transmission sound sweep
    try {
      setTimeout(() => playInterfaceSound(800, 'sine', 0.1, 0.015), 100);
      setTimeout(() => playInterfaceSound(1000, 'sine', 0.1, 0.01), 200);
      setTimeout(() => playInterfaceSound(1200, 'sine', 0.2, 0.005), 300);
    } catch (err) {}

    // Simulate server transmission delay
    setTimeout(() => {
      setStatus("success");
      onShowNotification("TRANSMISSION: Secure packet dispatched to Bhargava.");
      playInterfaceSound(880, 'triangle', 0.3, 0.03); // Success tone
      
      // Reset form
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 max-w-7xl mx-auto z-10"
    >
      {/* Background radial overlay */}
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full flex flex-col gap-12 max-w-2xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="font-orbitron text-[10px] text-primary tracking-widest uppercase mb-2 font-semibold font-mono">PORTWAY // COMMUNICATIONS</span>
          <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white text-glow-cyan flex items-center gap-3">
            <Mail className="w-6 h-6 sm:w-10 h-10 text-primary animate-pulse" />
            <span>ESTABLISH LINK</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mt-3 rounded-full" />
        </div>

        {/* Contact Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel-glow p-8 rounded-3xl border-primary/20 relative overflow-hidden scanlines shadow-xl"
        >
          {/* Tech Corner boundaries */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-orbitron text-[10px] text-primary tracking-widest uppercase font-bold">
                COMM_ID (NAME)
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="INPUT HOST NAME..."
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/3 border border-white/10 hover:border-primary/45 focus:border-primary/90 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-white/20 outline-none focus:ring-0 focus:shadow-neonCyan transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-orbitron text-[10px] text-primary tracking-widest uppercase font-bold">
                ROUTING_ADDR (EMAIL)
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="INPUT ENDPOINT MAIL..."
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/3 border border-white/10 hover:border-primary/45 focus:border-primary/90 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-white/20 outline-none focus:ring-0 focus:shadow-neonCyan transition-all"
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-orbitron text-[10px] text-primary tracking-widest uppercase font-bold">
                TRANSMISSION_PACKET (MESSAGE)
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="INPUT TRANSMISSION DETAILS..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/3 border border-white/10 hover:border-primary/45 focus:border-primary/90 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-white/20 outline-none focus:ring-0 focus:shadow-neonCyan transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              {status === "idle" && (
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-[#050816] font-bold font-orbitron text-xs tracking-widest flex items-center justify-center gap-2 hover:shadow-neonCyan hover:scale-102 transition-all cursor-pointer"
                  data-cursor="pointer"
                >
                  <span>DISPATCH PACKET</span>
                  <Send className="w-4 h-4" />
                </button>
              )}

              {status === "sending" && (
                <div className="w-full px-6 py-3.5 rounded-xl border border-primary text-primary font-bold font-orbitron text-xs tracking-widest flex items-center justify-center gap-2 bg-primary/5 shadow-neonCyan">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING DATA METADATA...</span>
                </div>
              )}

              {status === "success" && (
                <div className="w-full px-6 py-3.5 rounded-xl border border-accent text-accent font-bold font-orbitron text-xs tracking-widest flex items-center justify-center gap-2 bg-accent/5 shadow-neonGreen">
                  <CheckCircle className="w-4 h-4" />
                  <span>TRANSMISSION COMPLETE // DISPATCHED</span>
                </div>
              )}
            </div>

          </form>

        </motion.div>

      </div>
    </section>
  );
}
