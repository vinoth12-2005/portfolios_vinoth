import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiEye, FiArrowRight, FiChevronDown, FiShield, FiCheckCircle } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

/* Orbital ring around profile photo */
function OrbitalRings({ photo }) {
  const [imgSrc, setImgSrc] = useState(photo || '/secure_docs/vinoth.png');

  useEffect(() => {
    if (photo) setImgSrc(photo);
  }, [photo]);

  return (
    <div className="q-orbital-wrapper" style={{ position: 'relative', width: 340, height: 340, flexShrink: 0 }}>

      {/* Outer ambient glow */}
      <div style={{
        position: 'absolute', inset: -35,
        background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(34,211,238,0.08) 50%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Outer rotating orbit ring */}
      <div style={{
        position: 'absolute', inset: 0,
        border: '1px solid rgba(139,92,246,0.25)',
        borderRadius: '50%',
        animation: 'spin 14s linear infinite',
      }}>
        <div style={{
          position: 'absolute', top: -6, left: '50%', marginLeft: -6,
          width: 12, height: 12, borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
          boxShadow: '0 0 14px rgba(139,92,246,0.9)',
        }} />
      </div>

      {/* Middle reverse orbit ring */}
      <div style={{
        position: 'absolute', inset: 26,
        border: '1px solid rgba(34,211,238,0.25)',
        borderRadius: '50%',
        animation: 'spin 10s linear infinite reverse',
      }}>
        <div style={{
          position: 'absolute', top: -5, right: 12,
          width: 10, height: 10, borderRadius: '50%',
          background: '#22d3ee',
          boxShadow: '0 0 12px rgba(34,211,238,0.9)',
        }} />
        <div style={{
          position: 'absolute', bottom: -5, left: 12,
          width: 8, height: 8, borderRadius: '50%',
          background: '#ec4899',
          boxShadow: '0 0 10px rgba(236,72,153,0.9)',
        }} />
      </div>

      {/* Inner radar sweep beam */}
      <div style={{
        position: 'absolute', inset: 50,
        borderRadius: '50%',
        border: '1px dashed rgba(139,92,246,0.3)',
        animation: 'spin 6s linear infinite',
      }} />

      {/* Profile Photo Container */}
      <div className="q-photo-ring" style={{
        position: 'absolute', inset: 54,
        zIndex: 10,
      }}>
        <img
          src={imgSrc}
          alt="Vinoth M"
          onError={() => {
            if (imgSrc !== '/vinoth.png') setImgSrc('/vinoth.png');
          }}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', borderRadius: '50%',
            position: 'relative', zIndex: 2,
            boxShadow: '0 0 25px rgba(139,92,246,0.3)',
          }}
        />
      </div>

      {/* Floating Badges */}
      <FloatingBadge top="6%" right="-6%" label="VAPT Specialist" color="#8b5cf6" delay={0} />
      <FloatingBadge bottom="10%" left="-8%" label="Linux Kernel" color="#22d3ee" delay={1} />
      <FloatingBadge top="54%" left="-12%" label="Ethical Hacker" color="#ec4899" delay={2} />
    </div>
  );
}

function FloatingBadge({ top, bottom, left, right, label, color, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{
        position: 'absolute', top, bottom, left, right,
        background: 'rgba(3,0,20,0.92)', backdropFilter: 'blur(12px)',
        border: `1px solid ${color}45`, borderRadius: 10,
        padding: '6px 14px',
        fontFamily: 'Fira Code, monospace', fontSize: '0.7rem', fontWeight: 600,
        color, whiteSpace: 'nowrap',
        boxShadow: `0 4px 18px ${color}25`,
        zIndex: 15,
      }}
    >{label}</motion.div>
  );
}

export default function Hero() {
  const { data } = usePortfolio();
  const { profile, education, certifications, projects } = data;
  const roles = data.roles || [];

  const [roleIdx, setRoleIdx]     = useState(0);
  const [typed, setTyped]         = useState('');
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    if (!roles.length) return;
    const cur = roles[roleIdx % roles.length];
    let t;
    if (!deleting && typed === cur) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && typed === '') {
      setDeleting(false);
      setRoleIdx(p => (p + 1) % roles.length);
    } else {
      t = setTimeout(() => {
        setTyped(deleting ? cur.slice(0, typed.length - 1) : cur.slice(0, typed.length + 1));
      }, deleting ? 38 : 75);
    }
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx, roles]);

  const stats = [
    { label: 'CGPA', value: education.cgpa, color: '#8b5cf6' },
    { label: 'Projects', value: `${projects.length}+`, color: '#22d3ee' },
    { label: 'Certifications', value: `${certifications.length}+`, color: '#ec4899' },
  ];

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 90, paddingBottom: 60 }}>

      {/* Ambient background blobs */}
      <div className="q-blob" style={{ width: 500, height: 500, background: '#8b5cf6', top: '-10%', left: '-5%' }} />
      <div className="q-blob" style={{ width: 400, height: 400, background: '#22d3ee', bottom: '-5%', right: '5%', animationDelay: '3s' }} />
      <div className="q-blob" style={{ width: 300, height: 300, background: '#ec4899', top: '40%', right: '40%', animationDelay: '6s' }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(rgba(139,92,246,0.12) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 52,
          justifyContent: 'center',
        }}>

          {/* LEFT COLUMN: Profile Photo & Orbital Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 3.8, ease: 'easeOut' }}
            style={{ display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}
          >
            <OrbitalRings photo={profile.photo} />
          </motion.div>

          {/* RIGHT COLUMN: Name, Subtitle, Typing, Bio, Buttons, Stats */}
          <div style={{ flex: '1 1 420px', maxWidth: 620 }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 3.9, ease: 'easeOut' }}
            >
              {/* Header Tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 2, background: 'linear-gradient(90deg, #8b5cf6, #22d3ee)', borderRadius: 4 }} />
                <span className="q-label">// CYBERSECURITY PROFESSIONAL</span>
              </div>

              {/* Main Name */}
              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', color: '#f8fafc',
                lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.5px',
              }}>
                {profile.firstName}{' '}
                <span className="grad-text">{profile.lastName}</span>
              </h1>

              {/* Typing Role Console Prompt */}
              <div style={{
                fontFamily: 'Fira Code, monospace', fontSize: '1.02rem',
                color: '#a5b4fc', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)',
                padding: '8px 16px', borderRadius: 10, width: 'fit-content',
              }}>
                <span style={{ color: '#22d3ee' }}>root@nexus:~$</span>
                <span>{typed}</span>
                <span className="q-cursor-blink" style={{ display: 'inline-block', width: 0, height: '1.1em' }}>&nbsp;</span>
              </div>

              {/* Bio summary */}
              <p style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: 32, fontSize: '0.96rem' }}>
                Final-year B.E. CSE (Cyber Security) student at{' '}
                <span style={{ color: '#a78bfa', fontWeight: 600 }}>{education.university}</span>{' '}
                with a CGPA of <span style={{ color: '#22d3ee', fontWeight: 600 }}>{education.cgpa}</span>.
                Specializing in VAPT, penetration testing, network security, and ethical hacking.
              </p>

              {/* Action Call Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 40 }}>
                <a
                  href={profile.resumeUrl || '/VINOTH_M_resume.pdf'}
                  download
                  className="q-btn q-btn-primary"
                  id="hero-download-resume"
                >
                  <FiDownload /> Download Resume
                </a>
                <a
                  href={profile.resumeUrl || '/VINOTH_M_resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="q-btn q-btn-outline"
                  id="hero-view-resume"
                >
                  <FiEye /> View Resume
                </a>
                <a href="#contact" className="q-btn q-btn-ghost" id="hero-hire-me" style={{ color: '#8b5cf6' }}>
                  Hire Me <FiArrowRight />
                </a>
              </div>

              {/* Statistics Grid */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {stats.map(s => (
                  <div key={s.label} className="glass" style={{
                    padding: '14px 24px', textAlign: 'center', minWidth: 105,
                    borderColor: `${s.color}35`,
                  }}>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif', fontWeight: 800,
                      fontSize: '1.55rem', color: s.color,
                      textShadow: `0 0 16px ${s.color}80`,
                    }}>{s.value}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 3, fontFamily: 'Space Grotesk' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.2 }}
          style={{
            position: 'absolute', bottom: -35, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            textDecoration: 'none', color: '#64748b',
          }}
        >
          <span style={{ fontFamily: 'Fira Code', fontSize: '0.64rem', letterSpacing: 3 }}>SCROLL DOWN</span>
          <FiChevronDown style={{ animation: 'float 2s ease-in-out infinite', fontSize: '1.2rem', color: '#8b5cf6' }} />
        </motion.a>
      </div>
    </section>
  );
}
