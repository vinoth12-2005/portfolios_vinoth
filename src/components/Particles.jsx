import { useMemo } from 'react';

const COLORS = ['#8b5cf6', '#6366f1', '#22d3ee', '#ec4899', '#a78bfa'];

export default function Particles() {
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2.5 + 0.8}px`,
    delay: `${Math.random() * 10}s`,
    duration: `${Math.random() * 12 + 6}s`,
    color: COLORS[i % COLORS.length],
  })), []);

  return (
    <div className="particle-container">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left,
          width: p.size, height: p.size,
          background: p.color,
          animationDelay: p.delay,
          animationDuration: p.duration,
          boxShadow: `0 0 6px ${p.color}`,
        }} />
      ))}
    </div>
  );
}
