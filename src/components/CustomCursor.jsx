import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos]         = useState({ x: -100, y: -100 });
  const [dot, setDot]         = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    let raf;
    const follow = (e) => {
      raf = requestAnimationFrame(() => setDot({ x: e.clientX, y: e.clientY }));
    };
    const over  = (e) => setHovered(e.target.closest('a,button,[data-hover]') !== null);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', follow);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', follow);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        className={`q-cursor ${hovered ? 'hovered' : ''}`}
        style={{ left: pos.x - 8, top: pos.y - 8 }}
      />
      <div className="q-dot" style={{ left: dot.x - 2, top: dot.y - 2 }} />
    </>
  );
}
