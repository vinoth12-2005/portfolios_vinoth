import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiCheckCircle, FiHelpCircle, FiZap, FiLock, FiTerminal, FiPlay } from 'react-icons/fi';

const CTF_CHALLENGES = [
  {
    id: 'ctf1',
    category: 'Crypto',
    title: 'Base64 Payload Decryption',
    difficulty: 'Easy',
    points: 100,
    color: '#8b5cf6',
    description: 'An encrypted payload was intercepted on port 8080. Decode the Base64 string to retrieve the access token.',
    prompt: 'ENCRYPTED DATA: VklOT1RIX0NSRUQ9V0VMQ09NRV9UT19ORVhVUw==',
    hint: 'Use a Base64 decoder or Python: base64.b64decode("...")',
    solution: 'VINOTH_CRED=WELCOME_TO_NEXUS',
    flagText: 'CTF{BASE64_DECODED_VINOTH_NEXUS}',
  },
  {
    id: 'ctf2',
    category: 'Reverse',
    title: 'ROT13 Cipher Decryption',
    difficulty: 'Easy',
    points: 100,
    color: '#22d3ee',
    description: 'A key was obfuscated using ROT13 cipher. Shift letters back by 13 positions to reveal the plaintext key.',
    prompt: 'CIPHERTEXT: PLBOE_ARSHF',
    hint: 'ROT13 replaces each letter with the 13th letter after it in the alphabet (P->C, L->Y, B->B...)',
    solution: 'CYBER_NEXUS',
    flagText: 'CTF{ROT13_SOLVED_CYBER_NEXUS}',
  },
  {
    id: 'ctf3',
    category: 'Web Hacking',
    title: 'SQL Injection Auth Bypass',
    difficulty: 'Medium',
    points: 150,
    color: '#ec4899',
    description: "Enter a SQL injection payload to bypass the vulnerable query: SELECT * FROM admin WHERE pass='[YOUR_INPUT]'",
    prompt: "VULNERABLE QUERY: SELECT * FROM admin WHERE pass='[INPUT]'",
    hint: "Try classic payloads like: ' OR 1=1-- or ' OR '1'='1",
    validAnswers: ["' OR 1=1--", "' OR '1'='1", "' OR 1=1#", "admin' --", "' OR 'a'='a"],
    flagText: 'CTF{SQLI_AUTH_BYPASSED_VINOTH}',
  },
  {
    id: 'ctf4',
    category: 'System Exploit',
    title: 'Command Injection',
    difficulty: 'Medium',
    points: 200,
    color: '#f59e0b',
    description: 'The server executes: ping -c 1 [INPUT]. Chain a command to read flag.txt from the filesystem.',
    prompt: 'VULNERABLE COMMAND: ping -c 1 [INPUT]',
    hint: 'Use command chaining operators like semicolon (;) or pipe (|), e.g. ; cat flag.txt',
    validAnswers: ['; cat flag.txt', '127.0.0.1; cat flag.txt', '| cat flag.txt', '127.0.0.1 | cat flag.txt'],
    flagText: 'CTF{CMD_INJECTION_ROOT_ACCESS}',
  },
];

export default function ThreatLab() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const [activeTab, setActiveTab]         = useState('ctf1');
  const [userInputs, setUserInputs]       = useState({});
  const [solved, setSolved]               = useState({});
  const [showHint, setShowHint]           = useState({});
  const [feedback, setFeedback]           = useState({});
  const [terminalLogs, setTerminalLogs]   = useState({});

  const curChall = CTF_CHALLENGES.find(c => c.id === activeTab);

  const totalScore = Object.keys(solved).reduce((acc, id) => {
    const ch = CTF_CHALLENGES.find(c => c.id === id);
    return acc + (ch ? ch.points : 0);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = (userInputs[curChall.id] || '').trim();
    if (!val) return;

    let isCorrect = false;
    if (curChall.solution) {
      isCorrect = val.toUpperCase() === curChall.solution.toUpperCase();
    } else if (curChall.validAnswers) {
      isCorrect = curChall.validAnswers.some(ans => ans.toLowerCase() === val.toLowerCase());
    }

    if (isCorrect) {
      setSolved(p => ({ ...p, [curChall.id]: true }));
      setFeedback(p => ({ ...p, [curChall.id]: { type: 'success', text: `[+] EXPLOIT SUCCESSFUL! ${curChall.flagText}` } }));
      setTerminalLogs(p => ({
        ...p,
        [curChall.id]: [
          `$ ./exploit --target ${curChall.id}`,
          `[+] Payload injected: "${val}"`,
          `[+] Verification passed!`,
          `[+] FLAG CAPTURED: ${curChall.flagText}`,
          `[+] Points Awarded: +${curChall.points} PTS`,
        ],
      }));
    } else {
      setFeedback(p => ({ ...p, [curChall.id]: { type: 'error', text: '[-] INVALID PAYLOAD / FLAG. Check your syntax and try again!' } }));
      setTerminalLogs(p => ({
        ...p,
        [curChall.id]: [
          `$ ./exploit --target ${curChall.id}`,
          `[-] Testing payload: "${val}"`,
          `[-] Exploitation failed: Access Denied!`,
        ],
      }));
    }
  };

  return (
    <section id="threatlab" style={{ padding: '96px 0', position: 'relative' }} ref={ref}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 40 }}>
          <span className="q-label">// ./ctf_lab_challenge.sh</span>
          <h2 className="q-heading" style={{ marginTop: 8 }}>Interactive <span className="grad-text">CTF Lab</span></h2>
          <div className="q-section-line" />
          <p style={{ color: '#64748b', marginTop: 14, maxWidth: 620, fontSize: '0.9rem', lineHeight: 1.7 }}>
            Test your cybersecurity skills in this interactive micro CTF! Solve Base64 decoding, cipher decryption, SQL injection, and command injection challenges.
          </p>
        </motion.div>

        {/* Score Board Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass"
          style={{
            padding: '20px 24px', marginBottom: 32,
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            borderColor: 'rgba(139,92,246,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#8b5cf6', fontSize: '1.2rem',
            }}>
              <FiAward />
            </div>
            <div>
              <div style={{ fontFamily: 'Syne', fontWeight: 700, color: '#f8fafc', fontSize: '1rem' }}>
                CTF Score: <span style={{ color: '#22d3ee', fontFamily: 'Orbitron' }}>{totalScore} / 550 PTS</span>
              </div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
                Challenges Solved: {Object.keys(solved).length} of {CTF_CHALLENGES.length}
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 10 }}>
            {CTF_CHALLENGES.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: solved[c.id] ? '#10b981' : 'rgba(255,255,255,0.15)',
                  boxShadow: solved[c.id] ? '0 0 10px #10b981' : 'none',
                }} />
                <span style={{ fontFamily: 'Fira Code', fontSize: '0.65rem', color: solved[c.id] ? '#10b981' : '#64748b' }}>
                  {c.category}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>

          {/* Challenge Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {CTF_CHALLENGES.map(c => {
              const isSelected = activeTab === c.id;
              const isDone = solved[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  style={{
                    background: isSelected ? `${c.color}15` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isSelected ? c.color + '60' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 14, padding: '16px 20px',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                    display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                    boxShadow: isSelected ? `0 0 20px ${c.color}25` : 'none',
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: isDone ? '#10b98120' : `${c.color}18`,
                    border: `1px solid ${isDone ? '#10b98150' : c.color + '40'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isDone ? '#10b981' : c.color, fontSize: '1rem',
                  }}>
                    {isDone ? <FiCheckCircle /> : <FiZap />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'Syne', fontWeight: 700, color: '#f8fafc', fontSize: '0.88rem' }}>
                        {c.title}
                      </span>
                      {isDone && <span style={{ fontSize: '0.62rem', color: '#10b981', fontFamily: 'Fira Code' }}>[SOLVED]</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                      <span style={{ fontFamily: 'Fira Code', fontSize: '0.65rem', color: c.color }}>{c.category}</span>
                      <span style={{ fontFamily: 'Fira Code', fontSize: '0.65rem', color: '#64748b' }}>+{c.points} PTS</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Interactive Challenge Console */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass" style={{ padding: 28, borderColor: `${curChall.color}35`, position: 'relative', overflow: 'hidden' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{
                  fontFamily: 'Fira Code', fontSize: '0.7rem', padding: '4px 10px',
                  borderRadius: 6, background: `${curChall.color}18`, border: `1px solid ${curChall.color}30`,
                  color: curChall.color, fontWeight: 600,
                }}>
                  {curChall.category} • {curChall.difficulty} (+{curChall.points} PTS)
                </span>

                <button
                  onClick={() => setShowHint(p => ({ ...p, [curChall.id]: !p[curChall.id] }))}
                  style={{
                    background: 'transparent', border: 'none', color: '#64748b',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                    fontFamily: 'Fira Code', fontSize: '0.7rem',
                  }}
                >
                  <FiHelpCircle /> {showHint[curChall.id] ? 'Hide Hint' : 'Hint'}
                </button>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, color: '#f8fafc', fontSize: '1.1rem', marginBottom: 8 }}>
                {curChall.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 16 }}>
                {curChall.description}
              </p>

              {/* Hint Box */}
              {showHint[curChall.id] && (
                <div style={{
                  padding: 12, borderRadius: 8, background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b',
                  fontFamily: 'Fira Code', fontSize: '0.72rem', marginBottom: 16,
                }}>
                  💡 HINT: {curChall.hint}
                </div>
              )}

              {/* Prompt snippet */}
              <div style={{
                background: 'rgba(3,0,20,0.95)', border: `1px solid ${curChall.color}30`,
                borderRadius: 10, padding: '12px 16px', marginBottom: 20,
                fontFamily: 'Fira Code', fontSize: '0.78rem', color: curChall.color,
              }}>
                {curChall.prompt}
              </div>

              {/* Submission Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    value={userInputs[curChall.id] || ''}
                    onChange={(e) => setUserInputs(p => ({ ...p, [curChall.id]: e.target.value }))}
                    placeholder={curChall.solution ? "Enter plaintext solution..." : "Enter payload string..."}
                    disabled={solved[curChall.id]}
                    style={{
                      flex: 1, padding: '12px 16px',
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${curChall.color}35`,
                      borderRadius: 10, color: '#f8fafc',
                      fontFamily: 'Fira Code', fontSize: '0.82rem', outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={solved[curChall.id]}
                    className="q-btn q-btn-primary"
                    style={{
                      background: solved[curChall.id] ? '#10b981' : `linear-gradient(135deg, ${curChall.color}cc, ${curChall.color}88)`,
                      borderColor: 'transparent', padding: '0 20px',
                    }}
                  >
                    {solved[curChall.id] ? <FiCheckCircle /> : <FiPlay />}
                    {solved[curChall.id] ? 'Solved' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Feedback text */}
              {feedback[curChall.id] && (
                <div style={{
                  marginTop: 14, fontFamily: 'Fira Code', fontSize: '0.75rem',
                  color: feedback[curChall.id].type === 'success' ? '#10b981' : '#ef4444',
                }}>
                  {feedback[curChall.id].text}
                </div>
              )}

              {/* Console log output */}
              {terminalLogs[curChall.id] && (
                <div style={{
                  marginTop: 16, background: '#030014', borderRadius: 8, padding: 12,
                  fontFamily: 'Fira Code', fontSize: '0.7rem', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  {terminalLogs[curChall.id].map((line, idx) => (
                    <div key={idx} style={{ color: line.startsWith('[+]') ? '#10b981' : line.startsWith('[-]') ? '#ef4444' : '#8b5cf6' }}>
                      {line}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
