import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiFolder, FiShield, FiTerminal } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const ICONS = { Certifications: <FiAward />, 'Security Projects': <FiFolder />, 'Cybersecurity Student': <FiShield />, 'Linux Enthusiast': <FiTerminal /> };
const COLORS_ORDER = ['#8b5cf6', '#22d3ee', '#ec4899', '#f59e0b'];

function Counter({ target, suffix, inView, isText }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || isText) return;
    let s = 0; const inc = Math.max(target / 40, 0.1);
    const t = setInterval(() => {
      s += inc;
      if (s >= target) { setN(target); clearInterval(t); }
      else setN(Math.floor(s));
    }, 50);
    return () => clearInterval(t);
  }, [inView, target, isText]);
  if (isText) return <span style={{ fontFamily: 'Orbitron', fontSize: '2.5rem', fontWeight: 900 }}>✓</span>;
  return <span style={{ fontFamily: 'Orbitron', fontSize: '2.5rem', fontWeight: 900 }}>{n}{suffix}</span>;
}

export default function Achievements() {
  const { data } = usePortfolio();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section style={{ padding: '64px 0' }} ref={ref}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {data.achievements.map((item, i) => {
            const color = COLORS_ORDER[i % COLORS_ORDER.length];
            return (
              <motion.div
                key={item.id}
                className="glass"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ padding: '28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderColor: `${color}20` }}
              >
                <div style={{
                  position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                  width: 80, height: 80, borderRadius: '50%', background: color, filter: 'blur(28px)', opacity: 0.18,
                }} />
                <div style={{
                  width: 44, height: 44, borderRadius: 12, margin: '0 auto 14px',
                  background: `${color}15`, border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', color,
                }}>{ICONS[item.label] || <FiAward />}</div>
                <div style={{ color }}><Counter target={item.number} suffix={item.suffix} inView={inView} isText={item.isText} /></div>
                <p style={{ color: '#64748b', fontSize: '0.78rem', fontFamily: 'Space Grotesk', marginTop: 8 }}>{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
