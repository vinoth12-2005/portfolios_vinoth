import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>?/~アイウエオカキクケコ';
    const fs = 13;
    const cols = Math.floor(canvas.width / fs);
    const drops = Array(cols).fill(1);
    const colors = ['#8b5cf6', '#6366f1', '#22d3ee', '#a78bfa'];
    const draw = () => {
      ctx.fillStyle = 'rgba(3, 0, 20, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = Math.random() * 0.4 + 0.1;
        ctx.font = `${fs}px 'Fira Code', monospace`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
        ctx.globalAlpha = 1;
        if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const iv = setInterval(draw, 55);
    return () => { clearInterval(iv); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="matrix-canvas" />;
}
