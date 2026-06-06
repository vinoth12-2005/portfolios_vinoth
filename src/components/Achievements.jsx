import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiFolder, FiShield, FiTerminal } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const iconMap = { Certifications: <FiAward />, 'Security Projects': <FiFolder />, 'Cybersecurity Student': <FiShield />, 'Linux Enthusiast': <FiTerminal /> };

function AnimatedCounter({ target, suffix, inView, isText }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || isText) return;
    let start = 0;
    const increment = Math.max(target / 40, 0.1);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 50);
    return () => clearInterval(timer);
  }, [inView, target, isText]);
  if (isText) return <span className="font-display text-4xl sm:text-5xl font-bold">✓</span>;
  return <span className="font-display text-4xl sm:text-5xl font-bold">{count}{suffix}</span>;
}

export default function Achievements() {
  const { data } = usePortfolio();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} echo $ACHIEVEMENTS</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white mx-auto">Achiev<span className="text-cyber-green">ements</span></h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data.achievements.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.15 }} className="cyber-card p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10" style={{ background: item.color }} />
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl border text-xl" style={{ borderColor: `${item.color}30`, backgroundColor: `${item.color}10`, color: item.color }}>
                {iconMap[item.label] || <FiAward />}
              </div>
              <div style={{ color: item.color }}>
                <AnimatedCounter target={item.number} suffix={item.suffix} inView={inView} isText={item.isText} />
              </div>
              <p className="text-gray-400 text-sm font-mono mt-3">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
