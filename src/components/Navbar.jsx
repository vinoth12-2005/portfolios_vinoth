import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  { name: 'Home',     href: '#home' },
  { name: 'About',    href: '#about' },
  { name: 'Skills',   href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certs',    href: '#certifications' },
  { name: 'Threat Lab', href: '#threatlab' },
  { name: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(3,0,20,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(139,92,246,0.15)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '0.7rem',
              color: '#fff', letterSpacing: 1,
            }}>VM</div>
            <span style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: '1rem', color: '#f8fafc', letterSpacing: 1,
            }}>VINOTH<span style={{ color: '#8b5cf6' }}>.</span>M</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ gap: 32 }}>
            {links.map(l => (
              <a key={l.name} href={l.href} className="q-nav-link">{l.name}</a>
            ))}
          </div>

          {/* Hire Me CTA */}
          <div className="hidden md:block">
            <a href="#contact" className="q-btn q-btn-primary" id="nav-hire-me" style={{ padding: '8px 20px', fontSize: '0.76rem' }}>
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            id="nav-mobile-toggle"
            style={{ background: 'none', border: 'none', color: '#8b5cf6', fontSize: '1.4rem', cursor: 'pointer', padding: 6 }}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(3,0,20,0.97)', backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(139,92,246,0.1)',
            }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {links.map(l => (
                <a key={l.name} href={l.href} className="q-nav-link" onClick={() => setOpen(false)}
                  style={{ fontSize: '0.9rem', padding: '8px 0', color: '#cbd5e1' }}>
                  <span style={{ color: '#8b5cf6', marginRight: 8 }}>›</span>{l.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
