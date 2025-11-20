import React, { useEffect, useRef } from 'react';

// Subtle floating particles for the Flames Blue AI aesthetic
// Colors: Cyan #00D9FF, Violet #8B5CF6, Rose #FF006E
export default function ParticlesBackground({ density = 0.00015, speed = 0.25 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const dpiRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      dpiRef.current = Math.max(1, devicePixelRatio || 1);
      canvas.width = innerWidth * dpiRef.current;
      canvas.height = innerHeight * dpiRef.current;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      initParticles();
    };

    const palette = [
      'rgba(0,217,255,0.9)',
      'rgba(139,92,246,0.9)',
      'rgba(255,0,110,0.9)'
    ];

    const initParticles = () => {
      const count = Math.floor(window.innerWidth * window.innerHeight * density);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 0.6,
        vx: (Math.random() - 0.5) * speed * dpiRef.current,
        vy: (Math.random() - 0.5) * speed * dpiRef.current,
        c: palette[Math.floor(Math.random() * palette.length)]
      }));
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // dotted grid subtly
      ctx.save();
      ctx.globalAlpha = 0.06;
      const gap = 40 * dpiRef.current;
      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.restore();

      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, p.c);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    setSize();
    draw();

    window.addEventListener('resize', setSize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
