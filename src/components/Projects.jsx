import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiCode, FiShield } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const PROJ_COLORS = ['#8b5cf6', '#22d3ee', '#ec4899'];

export default function Projects() {
  const { data } = usePortfolio();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" style={{ padding: '96px 0', position: 'relative' }} ref={ref}>
      <div style={{
        position: 'absolute', left: -80, bottom: 0, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <span className="q-label">// ls -la /projects/</span>
          <h2 className="q-heading" style={{ marginTop: 8 }}>Featured <span className="grad-text">Projects</span></h2>
          <div className="q-section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
          {data.projects.map((proj, i) => {
            const color = PROJ_COLORS[i % PROJ_COLORS.length];
            return (
              <motion.div
                key={proj.id}
                className="glass"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ overflow: 'hidden', cursor: 'default' }}
              >
                {/* Top accent bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, transparent)` }} />

                <div style={{ padding: 28 }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                      background: `${color}15`, border: `1px solid ${color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color, fontSize: '1.3rem',
                    }}>
                      {i % 2 === 0 ? <FiCode /> : <FiShield />}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'Syne', fontWeight: 700, color: '#f8fafc', fontSize: '1rem', lineHeight: 1.3, marginBottom: 4 }}>
                        {proj.title}
                      </h3>
                      <span style={{
                        fontFamily: 'Fira Code', fontSize: '0.65rem',
                        color, opacity: 0.8,
                      }}>// security-project</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ color: '#94a3b8', fontSize: '0.87rem', lineHeight: 1.7, marginBottom: 16 }}>{proj.description}</p>

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                    {proj.highlights.map(h => (
                      <span key={h} style={{
                        fontFamily: 'Space Grotesk', fontSize: '0.72rem', fontWeight: 500,
                        padding: '4px 12px', borderRadius: 100,
                        background: `${color}12`, border: `1px solid ${color}30`, color,
                        display: 'flex', alignItems: 'center', gap: 5,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                    {proj.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: 'Fira Code', fontSize: '0.68rem',
                        padding: '3px 8px', borderRadius: 6,
                        background: 'rgba(255,255,255,0.04)', color: '#64748b',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>#{t}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      className="q-btn q-btn-primary" id={`proj-view-${proj.id}`}
                      style={{ flex: 1, justifyContent: 'center', background: `linear-gradient(135deg, ${color}cc, ${color}88)` }}>
                      <FiExternalLink /> View Project
                    </a>
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      className="q-btn q-btn-outline" id={`proj-src-${proj.id}`}
                      style={{ borderColor: `${color}50`, color }}>
                      <FiGithub />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
