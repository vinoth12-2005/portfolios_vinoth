import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiFolder, FiMail, FiChevronDown } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function Hero() {
  const { data } = usePortfolio();
  const { profile, roles } = data;
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!roles.length) return;
    const currentRole = roles[roleIndex % roles.length];
    let timeout;
    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 cyber-grid-bg" />
      <div className="absolute inset-0 hex-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-green/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 4.2 }} className="flex-shrink-0">
            <div className="photo-container animate-float">
              <img src={profile.photo} alt={`${profile.name} - Cybersecurity Student`} loading="eager" />
            </div>
          </motion.div>

          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 4.4 }}>
              <p className="font-mono text-cyber-green/70 text-sm mb-2 tracking-widest uppercase">{'>'} Hello World, I am</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                {profile.firstName} <span className="text-cyber-green glow-text">{profile.lastName}</span>
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <span className="text-cyber-green font-mono text-lg">$</span>
                <span className="font-mono text-lg sm:text-xl text-cyber-text">{text}</span>
                <span className="typing-cursor inline-block w-0 h-6">&nbsp;</span>
              </div>

              <p className="text-gray-400 max-w-lg text-sm sm:text-base leading-relaxed mb-8 font-mono">
                <span className="text-cyber-green">/*</span> {profile.bio.substring(0, 120)}... <span className="text-cyber-green">*/</span>
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href={profile.resumeUrl} download className="cyber-btn cyber-btn-primary flex items-center gap-2" id="hero-download-resume">
                  <FiDownload /> Download Resume
                </a>
                <a href="#projects" className="cyber-btn flex items-center gap-2" id="hero-view-projects">
                  <FiFolder /> View Projects
                </a>
                <a href="#contact" className="cyber-btn flex items-center gap-2" id="hero-contact-me">
                  <FiMail /> Contact Me
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }} className="mt-8 font-mono text-xs text-cyber-green/40 space-y-1">
              <p>[STATUS] Systems Online | Threat Level: Minimal</p>
              <p>[UPTIME] Portfolio Active Since 2024</p>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a href="#about" className="flex flex-col items-center gap-2 group">
            <span className="text-cyber-green/40 text-xs font-mono">Scroll Down</span>
            <FiChevronDown className="text-cyber-green animate-bounce text-xl" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
