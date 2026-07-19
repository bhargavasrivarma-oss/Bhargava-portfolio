import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

let audioCtx = null;
let droneNodes = [];
let masterGain = null;

// Expose static trigger for interactive components to call
export const playInterfaceSound = (freq, type = 'sine', duration = 0.08, vol = 0.015) => {
  if (!audioCtx || audioCtx.state === 'suspended') return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Sound engine suppressed
  }
};

export default function SoundController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const filterRef = useRef(null);

  const initDrone = () => {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.0, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // Cyber ambient low-pass filter
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, audioCtx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Oscillators: low notes C2, G2, C3 detuned
      const frequencies = [65.41, 97.99, 130.81];
      frequencies.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        osc.type = 'sawtooth';
        // Detune randomly for choral analog warmth
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.2, audioCtx.currentTime);
        
        const oscGain = audioCtx.createGain();
        oscGain.gain.setValueAtTime(0.08 / frequencies.length, audioCtx.currentTime);
        
        osc.connect(oscGain);
        oscGain.connect(filter);
        
        osc.start();
        droneNodes.push(osc);
      });

      // LFO modulation to swell filter sweep
      const lfo = audioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.06, audioCtx.currentTime);

      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(35, audioCtx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      
      lfo.start();
      droneNodes.push(lfo);

    } catch (e) {
      console.warn("Could not initiate synthesizers:", e);
    }
  };

  const toggleSound = () => {
    if (!audioCtx) {
      initDrone();
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (isPlaying) {
      // Smooth volume fade
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      setTimeout(() => {
        if (masterGain) masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
      }, 400);
      setIsPlaying(false);
    } else {
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 1.2);
      setIsPlaying(true);
      // Feedback ping
      setTimeout(() => playInterfaceSound(880, 'sine', 0.15, 0.03), 50);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="p-2.5 rounded-full glass-panel border border-primary/20 text-primary hover:text-accent hover:border-accent/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer shadow-neonCyan relative group"
      aria-label="Toggle Sound System"
      data-cursor="pointer"
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-glow-cyan animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 opacity-75" />
      )}
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-cyberBg text-[9px] text-primary py-0.5 px-2 rounded border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap font-orbitron tracking-widest">
        {isPlaying ? "MUTED_SYS" : "CYBER_DRONE"}
      </span>
    </button>
  );
}
