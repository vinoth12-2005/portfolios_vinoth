import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiTerminal, FiCornerDownLeft, FiRefreshCw } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const CAT_COLORS = ['#8b5cf6', '#22d3ee', '#ec4899', '#f59e0b', '#10b981'];

const COMMAND_HELP = [
  'Available Commands:',
  '  cat profile   - View candidate profile & details',
  '  cat aim       - View career objectives & mission statement',
  '  cat certs     - List 6 completed certifications',
  '  nmap -sV      - Run full Nmap vulnerability scan on target',
  '  whoami        - Display current user identity',
  '  ls            - List system files',
  '  clear         - Clear terminal screen',
  '  help          - Display command menu',
];

const INITIAL_HISTORY = [
  { type: 'sys', text: 'QUANTUM KALI OS v2024.3 [x86_64-linux]' },
  { type: 'sys', text: 'Type "help" or click quick commands below to explore.' },
  { type: 'cmd', text: 'nmap -sV --script vuln 192.168.1.0/24' },
  { type: 'out', text: 'Starting Nmap 7.94 ( https://nmap.org )' },
  { type: 'out', text: 'PORT      STATE  SERVICE   VERSION' },
  { type: 'out', text: '22/tcp    open   ssh       OpenSSH 8.9p1 Ubuntu' },
  { type: 'out', text: '80/tcp    open   http      Apache httpd 2.4.54' },
  { type: 'out', text: '443/tcp   open   https     nginx 1.23.4' },
  { type: 'out', text: '8080/tcp  open   http-alt  Apache Tomcat 9.0' },
  { type: 'out', text: '| http-sql-injection: No vulnerability found' },
  { type: 'out', text: '| http-xss: No XSS vulnerabilities found' },
  { type: 'out', text: 'Nmap done: 256 addresses scanned in 12.3s' },
];

export default function Skills() {
  const { data } = usePortfolio();
  const { profile, education, certifications } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory]   = useState(INITIAL_HISTORY);
  const termBodyRef             = useRef(null);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const newLogs = [{ type: 'cmd', text: cmdStr }];

    if (trimmed === 'help') {
      COMMAND_HELP.forEach(l => newLogs.push({ type: 'sys', text: l }));
    } else if (trimmed === 'cat profile' || trimmed === 'cat about') {
      newLogs.push(
        { type: 'highlight', text: '[+] CANDIDATE PROFILE: ' + profile.name },
        { type: 'out', text: '--------------------------------------------------' },
        { type: 'out', text: `Name        : ${profile.name}` },
        { type: 'out', text: `Degree      : ${education.degree}` },
        { type: 'out', text: `College     : ${education.college}` },
        { type: 'out', text: `University  : ${education.university} (CGPA: ${education.cgpa})` },
        { type: 'out', text: `Location    : ${profile.location}` },
        { type: 'out', text: `Email       : ${profile.contactEmail || profile.email}` },
        { type: 'out', text: `Status      : Open to Opportunities & VAPT Roles` }
      );
    } else if (trimmed === 'cat aim' || trimmed === 'cat goal' || trimmed === 'cat mission') {
      newLogs.push(
        { type: 'highlight', text: '[🎯] CAREER AIM & OBJECTIVE:' },
        { type: 'out', text: '--------------------------------------------------' },
        { type: 'out', text: '"To excel as a Lead Penetration Tester and Vulnerability Assessment' },
        { type: 'out', text: ' (VAPT) Specialist. My aim is to secure enterprise applications,' },
        { type: 'out', text: ' discover high-severity vulnerabilities, and build robust cyber defenses."' }
      );
    } else if (trimmed === 'cat certs' || trimmed === 'cat certificates') {
      newLogs.push(
        { type: 'highlight', text: `[📜] COMPLETED CERTIFICATIONS (${certifications.length} TOTAL):` },
        { type: 'out', text: '--------------------------------------------------' }
      );
      certifications.forEach((c, idx) => {
        newLogs.push({ type: 'out', text: `${idx + 1}. ${c.title} [${c.issuer}]` });
      });
    } else if (trimmed.startsWith('nmap')) {
      newLogs.push(
        { type: 'out', text: 'Starting Nmap 7.94 ( https://nmap.org )' },
        { type: 'out', text: 'PORT      STATE  SERVICE   VERSION' },
        { type: 'out', text: '22/tcp    open   ssh       OpenSSH 8.9p1 Ubuntu' },
        { type: 'out', text: '80/tcp    open   http      Apache httpd 2.4.54' },
        { type: 'out', text: '443/tcp   open   https     nginx 1.23.4' },
        { type: 'out', text: '8080/tcp  open   http-alt  Apache Tomcat 9.0' },
        { type: 'highlight', text: 'Nmap done: Scan complete. All systems secured.' }
      );
    } else if (trimmed === 'whoami') {
      newLogs.push({ type: 'out', text: 'root (Architect Vinoth M — Security Researcher)' });
    } else if (trimmed === 'ls') {
      newLogs.push({ type: 'out', text: 'profile.txt   aim.txt   certs.txt   skills.txt   vapt_tools/' });
    } else {
      newLogs.push({ type: 'err', text: `bash: command not found: ${cmdStr}. Type "help" for available commands.` });
    }

    setHistory(prev => [...prev, ...newLogs]);
    setInputVal('');
  };

  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="skills" style={{ padding: '96px 0', position: 'relative' }} ref={ref}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <span className="q-label">// nmap -sV skills.vinoth</span>
          <h2 className="q-heading" style={{ marginTop: 8 }}>Technical <span className="grad-text">Arsenal</span></h2>
          <div className="q-section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>

          {/* Skill categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {data.skills.map((cat, ci) => {
              const color = CAT_COLORS[ci % CAT_COLORS.length];
              return (
                <motion.div
                  key={cat.id}
                  className="glass q-scan"
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: ci * 0.1 }}
                  style={{ padding: 24, borderColor: `${color}20` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: color, boxShadow: `0 0 10px ${color}80`,
                    }} />
                    <span style={{
                      fontFamily: 'Syne', fontWeight: 700, color: '#f8fafc',
                      fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 1,
                    }}>{cat.title}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'Fira Code', fontSize: '0.65rem', color: color }}>
                      [{cat.skills.length} modules]
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {cat.skills.map((sk, si) => (
                      <motion.span
                        key={sk.name}
                        className="q-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: ci * 0.1 + si * 0.06, duration: 0.3 }}
                        style={{
                          borderColor: `${color}35`,
                          backgroundColor: `${color}0a`,
                          color,
                        }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, opacity: 0.7 }} />
                        {sk.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Kali Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div className="q-terminal" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 440 }}>

              {/* Terminal top bar */}
              <div className="q-terminal-bar" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div className="q-dot-red" /><div className="q-dot-yellow" /><div className="q-dot-green" />
                  <span style={{ fontFamily: 'Fira Code', fontSize: '0.72rem', color: '#8b5cf6', marginLeft: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiTerminal /> root@kali: ~/recon
                  </span>
                </div>
                <button
                  onClick={() => setHistory(INITIAL_HISTORY)}
                  title="Reset Terminal"
                  style={{
                    background: 'transparent', border: 'none', color: '#64748b',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: '0.7rem', fontFamily: 'Fira Code',
                  }}
                >
                  <FiRefreshCw /> Reset
                </button>
              </div>

              {/* Quick suggestion bar */}
              <div style={{
                display: 'flex', gap: 6, padding: '8px 16px', flexWrap: 'wrap',
                background: 'rgba(139,92,246,0.05)', borderBottom: '1px solid rgba(139,92,246,0.1)',
              }}>
                <span style={{ fontFamily: 'Fira Code', fontSize: '0.62rem', color: '#64748b', alignSelf: 'center' }}>QUICK RUN:</span>
                {['cat profile', 'cat aim', 'cat certs', 'nmap -sV', 'help'].map(cmd => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    style={{
                      background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: 6, color: '#22d3ee', padding: '2px 8px',
                      fontFamily: 'Fira Code', fontSize: '0.65rem', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    ${cmd}
                  </button>
                ))}
              </div>

              {/* Terminal body */}
              <div ref={termBodyRef} className="q-terminal-body" style={{ flex: 1, padding: 18, overflowY: 'auto', maxHeight: 360 }}>
                {history.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: 4, fontFamily: 'Fira Code, monospace', fontSize: '0.76rem', lineHeight: 1.5 }}>
                    {item.type === 'cmd' && (
                      <div style={{ color: '#8b5cf6', fontWeight: 600 }}>
                        <span style={{ color: '#22d3ee' }}>root@kali:~/recon# </span>
                        {item.text}
                      </div>
                    )}
                    {item.type === 'sys' && <div style={{ color: '#64748b' }}>{item.text}</div>}
                    {item.type === 'out' && <div style={{ color: '#94a3b8' }}>{item.text}</div>}
                    {item.type === 'highlight' && <div style={{ color: '#22d3ee', fontWeight: 600 }}>{item.text}</div>}
                    {item.type === 'err' && <div style={{ color: '#ef4444' }}>{item.text}</div>}
                  </div>
                ))}
              </div>

              {/* Terminal prompt input */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleCommand(inputVal); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 16px', background: 'rgba(3,0,20,0.9)',
                  borderTop: '1px solid rgba(139,92,246,0.2)',
                }}
              >
                <span style={{ fontFamily: 'Fira Code', fontSize: '0.75rem', color: '#22d3ee', flexShrink: 0 }}>
                  root@kali:~/recon#
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type command (e.g. cat profile, cat aim)..."
                  style={{
                    flex: 1, background: 'transparent', border: 'none',
                    outline: 'none', color: '#f8fafc', fontFamily: 'Fira Code',
                    fontSize: '0.8rem',
                  }}
                />
                <button type="submit" style={{ background: 'transparent', border: 'none', color: '#8b5cf6', cursor: 'pointer', display: 'flex' }}>
                  <FiCornerDownLeft style={{ fontSize: '1rem' }} />
                </button>
              </form>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
