import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function Certifications() {
  const { data } = usePortfolio();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="certifications" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 hex-pattern" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} gpg --verify certifications.sig</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">Certifi<span className="text-cyber-green">cations</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.certifications.map((cert, index) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} className="cyber-card p-6 group">
              <div className="flex items-start gap-4">
                <div className="cert-icon flex-shrink-0 border" style={{ borderColor: `${cert.color}30`, backgroundColor: `${cert.color}10` }}>
                  <span className="text-2xl">{cert.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm leading-tight mb-2">{cert.title}</h3>
                  <p className="text-xs font-mono mb-3" style={{ color: cert.color }}>{cert.issuer}</p>
                  {cert.file && (
                    <a href={cert.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-mono text-cyber-green/60 hover:text-cyber-green transition-colors">
                      <FiExternalLink className="text-xs" /> View Certificate
                    </a>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-cyber-green/10 flex items-center gap-2">
                <FiAward className="text-cyber-green/40 text-xs" />
                <span className="text-cyber-green/40 text-xs font-mono">✓ Verified Credential</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
