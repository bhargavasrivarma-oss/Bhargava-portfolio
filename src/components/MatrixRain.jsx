import React, { useEffect, useRef } from 'react';

export default function MatrixRain({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set fullscreen size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters: binary and sci-fi codes
    const alphabet = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array of drops - one per column
    const rainDrops = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black to create trailing fade effect
      ctx.fillStyle = 'rgba(5, 8, 22, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ffb2'; // Neon green matrix color
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        // Random character
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Alternating colors between cyan and green for customized 2060 look
        ctx.fillStyle = Math.random() > 0.5 ? '#00f5ff' : '#00ffb2';
        
        ctx.fillText(text, x, y);

        // Reset drop position once it reaches bottom with randomized lag
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30 FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-20 select-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
