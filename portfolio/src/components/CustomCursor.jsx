import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on mobile
    if ('ontouchstart' in window) return;

    const move = (e) => {
      setPos({ x: e.clientX - 10, y: e.clientY - 10 });
      setDotPos({ x: e.clientX - 2.5, y: e.clientY - 2.5 });
      setVisible(true);
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className={`custom-cursor ${hovering ? 'hover' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div className="cursor-dot" style={{ left: dotPos.x, top: dotPos.y }} />
    </>
  );
}
