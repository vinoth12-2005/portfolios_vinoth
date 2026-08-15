import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiBook, FiGithub, FiLinkedin } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const SectionHeader = ({ label, heading }) => (
  <div style={{ marginBottom: 56 }}>
    <span className="q-label">{label}</span>
    <h2 className="q-heading" style={{ marginTop: 8 }}>{heading}</h2>
    <div className="q-section-line" />
  </div>
);

export default function About() {
  const { data } = usePortfolio();
  const { profile, education } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const infoItems = [
    { icon: '👤', label: 'Name',       value: profile.name },
    { icon: '🎓', label: 'Degree',     value: education.degree },
    { icon: '🏫', label: 'University', value: education.university },
    { icon: '📊', label: 'CGPA',       value: education.cgpa },
    { icon: '📍', label: 'Location',   value: profile.location },
    { icon: '💼', label: 'Role',       value: 'Cybersecurity Student' },
    { icon: '🎯', label: 'Focus',      value: 'VAPT & Ethical Hacking' },
    { icon: '🟢', label: 'Status',     value: '● Open to Opportunities' },
  ];

  const interests = [
    'Penetration Testing & Red Teaming',
    'Web Application Security (OWASP)',
    'Network Security & Forensics',
    'Linux Administration & Hardening',
    'Secure Software Development',
  ];

  return (
    <section id="about" style={{ padding: '96px 0', position: 'relative' }} ref={ref}>
      {/* Background */}
      <div style={{
        position: 'absolute', right: -100, top: 0, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader label="// cat about_me.txt" heading={<>About <span className="grad-text">Me</span></>} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32 }}>

          {/* Terminal */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="q-terminal">
              <div className="q-terminal-bar">
                <div className="q-dot-red" /><div className="q-dot-yellow" /><div className="q-dot-green" />
                <span style={{ fontFamily: 'Fira Code', fontSize: '0.7rem', color: '#8b5cf6', marginLeft: 8 }}>root@vinoth-sec:~</span>
              </div>
              <div className="q-terminal-body">
                <p><span style={{ color: '#8b5cf6' }}>vinoth@nexus</span><span style={{ color: '#64748b' }}>:~$</span> <span style={{ color: '#e2e8f0' }}>cat about.txt</span></p>
                <p style={{ color: '#94a3b8', margin: '12px 0', lineHeight: 1.8 }}>{profile.bio}</p>

                <p style={{ marginTop: 16 }}><span style={{ color: '#8b5cf6' }}>vinoth@nexus</span><span style={{ color: '#64748b' }}>:~$</span> <span style={{ color: '#e2e8f0' }}>cat interests.txt</span></p>
                <ul style={{ marginTop: 8, listStyle: 'none' }}>
                  {interests.map(i => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, color: '#94a3b8' }}>
                      <span style={{ color: '#22d3ee' }}>▹</span> {i}
                    </li>
                  ))}
                </ul>

                <p style={{ marginTop: 16 }}><span style={{ color: '#8b5cf6' }}>vinoth@nexus</span><span style={{ color: '#64748b' }}>:~$</span> <span style={{ color: '#e2e8f0' }}>echo $MISSION</span></p>
                <p style={{ color: '#a78bfa', fontStyle: 'italic', marginTop: 6 }}>"Secure the digital world, one exploit at a time."</p>
                <span style={{ color: '#8b5cf6' }}>_</span>
              </div>
            </div>
          </motion.div>

          {/* Info Grid + Social */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}>
            <div className="glass" style={{ padding: 28, marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, color: '#f8fafc', marginBottom: 20, fontSize: '1rem' }}>Quick Info</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {infoItems.map(item => (
                  <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: 'Fira Code', fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
                      {item.icon} {item.label}
                    </span>
                    <span style={{
                      fontSize: '0.82rem', color: item.label === 'Status' ? '#22d3ee' : '#cbd5e1',
                      fontWeight: 500, fontFamily: 'Space Grotesk',
                    }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact + Social */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a href={`mailto:${profile.email}`} className="glass" style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px',
                textDecoration: 'none', color: '#cbd5e1', fontSize: '0.82rem',
                fontFamily: 'Space Grotesk', flex: 1,
              }}>
                <FiMail style={{ color: '#8b5cf6' }} /> {profile.contactEmail || profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="glass q-btn-ghost" style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px',
                textDecoration: 'none', color: '#cbd5e1', fontSize: '0.82rem',
              }}>
                <FiGithub style={{ color: '#a78bfa' }} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="glass" style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px',
                textDecoration: 'none', color: '#cbd5e1', fontSize: '0.82rem',
              }}>
                <FiLinkedin style={{ color: '#22d3ee' }} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
