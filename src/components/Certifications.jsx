import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiDownload, FiExternalLink, FiAward } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const CERT_COLORS = ['#8b5cf6','#22d3ee','#f59e0b','#ec4899','#10b981','#6366f1','#f97316'];

export default function Certifications() {
  const { data } = usePortfolio();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="certifications" style={{ padding: '96px 0', position: 'relative' }} ref={ref}>
      <div style={{
        position: 'absolute', right: -60, top: '20%', width: 360, height: 360,
        background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <span className="q-label">// gpg --verify credentials.sig</span>
          <h2 className="q-heading" style={{ marginTop: 8 }}>My <span className="grad-text">Certifications</span></h2>
          <div className="q-section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {data.certifications.map((cert, i) => {
            const color = CERT_COLORS[i % CERT_COLORS.length];
            return (
              <motion.div
                key={cert.id}
                className="glass"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ padding: 24, position: 'relative', overflow: 'hidden' }}
              >
                {/* Corner glow */}
                <div style={{
                  position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                  borderRadius: '50%', background: color, filter: 'blur(30px)', opacity: 0.15,
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                  {/* Icon */}
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                    background: `${color}15`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem',
                  }}>{cert.icon}</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: 'Space Grotesk', fontWeight: 600, color: '#f8fafc',
                      fontSize: '0.88rem', lineHeight: 1.4, marginBottom: 4,
                    }}>{cert.title}</h3>
                    <span style={{
                      fontFamily: 'Fira Code', fontSize: '0.7rem', color, opacity: 0.9,
                    }}>{cert.issuer}</span>
                  </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: 14, borderTop: `1px solid ${color}18`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiAward style={{ color: `${color}80`, fontSize: '0.8rem' }} />
                    <span style={{ fontFamily: 'Fira Code', fontSize: '0.65rem', color: `${color}80` }}>✓ Verified</span>
                  </div>

                  {cert.file && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={cert.file} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          fontFamily: 'Space Grotesk', fontSize: '0.72rem', fontWeight: 500,
                          color, textDecoration: 'none', padding: '5px 12px',
                          borderRadius: 8, background: `${color}12`, border: `1px solid ${color}25`,
                          transition: 'all 0.2s',
                        }}
                        id={`cert-view-${cert.id}`}
                      >
                        <FiExternalLink style={{ fontSize: '0.75rem' }} /> View
                      </a>
                      <a href={cert.file} download
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          fontFamily: 'Space Grotesk', fontSize: '0.72rem', fontWeight: 500,
                          color: '#64748b', textDecoration: 'none', padding: '5px 10px',
                          borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                          transition: 'all 0.2s',
                        }}
                        id={`cert-dl-${cert.id}`}
                      >
                        <FiDownload style={{ fontSize: '0.75rem' }} />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
