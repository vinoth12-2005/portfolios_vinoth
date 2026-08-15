import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiTerminal, FiCpu } from 'react-icons/fi';

const bootSequence = [
  { text: '> INITIALIZING QUANTUM NEXUS CORE v3.5...', color: '#8b5cf6' },
  { text: '> [SYSTEM] Mounting encrypted security sub-modules...', color: '#a78bfa' },
  { text: '> [RECON] Loading threat intelligence database...', color: '#6366f1' },
  { text: '> [VAPT ENGINE] Calibrating vulnerability scanner...', color: '#22d3ee' },
  { text: '> [LINUX KERNEL] Establishing zero-trust secure channel...', color: '#a78bfa' },
  { text: '> [PROFILE] Decrypting candidate credentials: VINOTH M...', color: '#ec4899' },
  { text: '> SYSTEM FULLY OPERATIONAL — WELCOME ARCHITECT', color: '#22d3ee' },
];

export default function LoadingScreen() {
  const [logs, setLogs]   = useState([]);
  const [gone, setGone]   = useState(false);
  const [pct, setPct]     = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[index]]);
        setPct(Math.round(((index + 1) / bootSequence.length) * 100));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setGone(true), 500);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`q-loading ${gone ? 'gone' : ''}`}>
      <div style={{
        maxWidth: 600, width: '92%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', zIndex: 10,
      }}>

        {/* Central Quantum Badge */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative', width: 90, height: 90,
            marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Rotating outer ring */}
          <div style={{
            position: 'absolute', inset: -6, borderRadius: '50%',
            border: '2px dashed rgba(139,92,246,0.5)',
            animation: 'spin 8s linear infinite',
          }} />

          {/* Glowing pulse ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(34,211,238,0.1) 70%)',
            boxShadow: '0 0 35px rgba(139,92,246,0.5)',
            animation: 'glowPulse 2s ease-in-out infinite',
          }} />

          <FiShield style={{ fontSize: '2.4rem', color: '#22d3ee', position: 'relative', zIndex: 2 }} />
        </motion.div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '1.8rem', fontWeight: 900,
            background: 'linear-gradient(135deg, #8b5cf6, #22d3ee, #ec4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: 5,
          }}>
            VINOTH<span style={{ color: '#8b5cf6' }}>.M</span>
          </div>
          <div style={{
            fontFamily: 'Fira Code, monospace', fontSize: '0.68rem',
            color: '#64748b', letterSpacing: 4, marginTop: 4, textTransform: 'uppercase',
          }}>
            Cybersecurity & VAPT Portfolio OS
          </div>
        </div>

        {/* Console Box */}
        <div style={{
          width: '100%', background: 'rgba(3, 0, 20, 0.85)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: 14, padding: 18, marginBottom: 20,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(139,92,246,0.05)',
          minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div className="q-dot-red" /><div className="q-dot-yellow" /><div className="q-dot-green" />
            <span style={{ fontFamily: 'Fira Code', fontSize: '0.65rem', color: '#8b5cf6', marginLeft: 6 }}>
              kernel_boot@vinoth-cyber-os
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {logs.map((log, i) => (
              <div
                key={i}
                className="q-boot-text"
                style={{
                  color: log.color,
                  fontFamily: 'Fira Code, monospace', fontSize: '0.72rem',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <span>{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar container */}
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 8, fontFamily: 'Fira Code, monospace', fontSize: '0.7rem', color: '#94a3b8',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FiCpu style={{ color: '#22d3ee' }} /> SYSTEM LOAD
            </span>
            <span style={{ color: '#22d3ee', fontWeight: 700 }}>{pct}%</span>
          </div>

          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: 'linear-gradient(90deg, #8b5cf6, #22d3ee, #ec4899)',
              borderRadius: 10, transition: 'width 0.25s ease-out',
              boxShadow: '0 0 12px rgba(34,211,238,0.8)',
            }} />
          </div>
        </div>

      </div>
    </div>
  );
}
