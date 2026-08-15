import { FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(139,92,246,0.1)',
      padding: '40px 24px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Orbitron', fontWeight: 900, fontSize: '0.6rem', color: '#fff',
          }}>VM</div>
          <span style={{ fontFamily: 'Syne', fontWeight: 700, color: '#64748b', fontSize: '0.9rem' }}>
            VINOTH<span style={{ color: '#8b5cf6' }}>.</span>M
          </span>
        </div>

        {/* Center */}
        <p style={{ fontFamily: 'Space Grotesk', color: '#475569', fontSize: '0.8rem', textAlign: 'center' }}>
          © {new Date().getFullYear()} Vinoth M — Built with passion for Cybersecurity ⚡
        </p>

        {/* Scroll top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          id="scroll-to-top"
          style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#8b5cf6', cursor: 'pointer', transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.1)'}
        >
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
