import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-cyberBg/80 backdrop-blur-md py-8 px-6 text-center select-none z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-orbitron text-[10px] tracking-wider text-subtext/60">
        
        {/* Built By info */}
        <div>
          <span>BUILT_WITH_CORE // </span>
          <span className="text-primary font-bold">REACT</span>
          <span> + </span>
          <span className="text-accent font-bold">GENERATIVE_AI</span>
        </div>

        {/* Brand Copyright */}
        <div>
          <span>© {currentYear} // </span>
          <span className="text-white font-bold tracking-widest">C.H.E.K.U.R.I BHARGAVA SRI VARMA</span>
        </div>

        {/* Spec build info */}
        <div className="hidden md:block font-mono text-[9px]">
          <span>INTEGRITY_STABLE // SECURE_PORT_2060</span>
        </div>

      </div>
    </footer>
  );
}
