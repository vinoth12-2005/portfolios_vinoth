import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiTerminal, FiCheck, FiX, FiZap } from 'react-icons/fi';

const challenges = [
  {
    id: 'c1',
    type: 'Base64 Decoder',
    category: 'Cryptography',
    xp: 50,
    prompt: 'Decode the following Base64 string:',
    cipher: 'VklOT1RIX0NZQkVSU0VD',
    answer: 'VINOTH_CYBERSEC',
    hint: 'Use atob() or any Base64 decoder',
  },
  {
    id: 'c2',
    type: 'Caesar Cipher',
    category: 'Cryptography',
    xp: 75,
    prompt: 'Decode this ROT13 encoded string:',
    cipher: 'INEVBGU PLOREFRPHEVGL',
    answer: 'VINOTH CYBERSECURITY',
    hint: 'ROT13 shifts each letter by 13 positions',
  },
  {
    id: 'c3',
    type: 'Hex Decoder',
    category: 'Encoding',
    xp: 60,
    prompt: 'Convert this Hex string to ASCII:',
    cipher: '56 49 4E 4F 54 48',
    answer: 'VINOTH',
    hint: 'Each hex pair is one ASCII character',
  },
  {
    id: 'c4',
    type: 'Binary Challenge',
    category: 'Encoding',
    xp: 80,
    prompt: 'Convert this Binary to text:',
    cipher: '01001011 01000001 01001100 01001001',
    answer: 'KALI',
    hint: '8 bits = 1 character',
  },
  {
    id: 'c5',
    type: 'Port Scan',
    category: 'Networking',
    xp: 100,
    prompt: 'What service runs on port 22 by default?',
    cipher: 'Port: 22',
    answer: 'SSH',
    hint: 'It\'s used for secure remote login',
  },
  {
    id: 'c6',
    type: 'Hash Identifier',
    category: 'Forensics',
    xp: 120,
    prompt: 'What hashing algorithm produces a 32-char hex digest?',
    cipher: 'd41d8cd98f00b204e9800998ecf8427e',
    answer: 'MD5',
    hint: 'Widely used but considered insecure',
  },
];

const consoleLines = [
  '$ nmap -sV 192.168.1.1',
  'Starting Nmap 7.94 ( https://nmap.org )',
  'Scanning target host...',
  'PORT     STATE  SERVICE   VERSION',
  '22/tcp   open   ssh       OpenSSH 8.9',
  '80/tcp   open   http      Apache 2.4.54',
  '443/tcp  open   https     nginx 1.23',
  '3306/tcp closed mysql',
  '8080/tcp open   http-alt  Tomcat 9.0',
  'Nmap done: 1 IP address (1 host up) in 2.34s',
  '$ _',
];

export default function CTFWorkout() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [consoleIdx, setConsoleIdx] = useState(0);
  const consoleRef = useRef(null);

  const totalXP = challenges.reduce((sum, c) => sum + c.xp, 0);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setConsoleIdx(prev => {
        if (prev < consoleLines.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 350);
    return () => clearInterval(timer);
  }, [inView]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleIdx]);

  const checkAnswer = (id) => {
    const challenge = challenges.find(c => c.id === id);
    const userAns = (answers[id] || '').trim().toUpperCase();
    const correct = userAns === challenge.answer.toUpperCase();
    setResults(prev => ({ ...prev, [id]: correct }));
    if (correct && !results[id]) {
      setScore(prev => prev + challenge.xp);
    }
    if (!correct && results[id] === true) {
      setScore(prev => prev - challenge.xp);
    }
  };

  return (
    <section id="ctf" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 hex-pattern" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} ctf --start challenge.bin</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">CTF <span className="text-cyber-green">Workout</span></h2>
        </motion.div>

        {/* Score Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 cyber-card p-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <FiZap className="text-cyber-green text-xl" />
            <span className="font-mono text-cyber-green text-lg font-bold">Score: {score} / {totalXP} XP</span>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="h-2 bg-cyber-green/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full transition-all duration-500"
                style={{ width: `${Math.min((score / totalXP) * 100, 100)}%` }}
              />
            </div>
            <p className="text-cyber-green/40 text-xs font-mono mt-1">{Math.round((score / totalXP) * 100)}% Complete</p>
          </div>
          <span className="font-mono text-xs text-cyber-green/50">{Object.values(results).filter(Boolean).length}/{challenges.length} Solved</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenges */}
          <div className="space-y-4">
            {challenges.map((ch, idx) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
                className={`cyber-card p-5 ${results[ch.id] === true ? 'border-cyber-green/50' : results[ch.id] === false ? 'border-red-500/40' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded border border-cyber-green/20 text-cyber-green/60">{ch.category}</span>
                    <span className="text-xs font-mono text-cyber-cyan/70">+{ch.xp} XP</span>
                  </div>
                  {results[ch.id] === true && <FiCheck className="text-cyber-green" />}
                  {results[ch.id] === false && <FiX className="text-red-400" />}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{ch.type}</h3>
                <p className="text-gray-400 text-xs mb-2">{ch.prompt}</p>
                <div className="bg-black/50 border border-cyber-green/10 rounded p-2 font-mono text-cyber-green text-xs mb-3 break-all">
                  {ch.cipher}
                </div>
                <p className="text-cyber-green/40 text-xs font-mono mb-3">💡 {ch.hint}</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Your answer..."
                    value={answers[ch.id] || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, [ch.id]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && checkAnswer(ch.id)}
                    className={`flex-1 px-3 py-2 bg-cyber-darker border rounded text-gray-200 font-mono text-xs outline-none transition-all ${
                      results[ch.id] === true
                        ? 'border-cyber-green/60 focus:border-cyber-green'
                        : results[ch.id] === false
                        ? 'border-red-500/40 focus:border-red-400'
                        : 'border-cyber-green/20 focus:border-cyber-green'
                    }`}
                  />
                  <button
                    onClick={() => checkAnswer(ch.id)}
                    className="cyber-btn cyber-btn-primary px-4 py-2 text-xs"
                    id={`ctf-check-${ch.id}`}
                  >
                    Check
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live Console */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="terminal-window glow-box sticky top-24">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="text-cyber-green/50 text-xs font-mono ml-2">root@kali:~/ctf</span>
                <span className="ml-auto text-cyber-green/30 text-xs font-mono flex items-center gap-1">
                  <FiTerminal className="text-xs" /> live scan
                </span>
              </div>
              <div
                ref={consoleRef}
                className="terminal-body h-72 overflow-y-auto"
              >
                {consoleLines.slice(0, consoleIdx + 1).map((line, i) => (
                  <div
                    key={i}
                    className={`mb-1 ${
                      line.startsWith('$') ? 'text-cyber-green font-bold' :
                      line.includes('open') ? 'text-green-400' :
                      line.includes('closed') ? 'text-red-400/70' :
                      line.includes('PORT') ? 'text-cyber-cyan font-bold' :
                      'text-gray-400'
                    }`}
                  >
                    {line}
                  </div>
                ))}
                {consoleIdx < consoleLines.length - 1 && (
                  <span className="inline-block w-2 h-4 bg-cyber-green animate-pulse" />
                )}
              </div>

              {/* Scoreboard */}
              <div className="border-t border-cyber-green/10 p-4">
                <p className="text-cyber-green/50 text-xs font-mono mb-3">{'>'} cat scoreboard.txt</p>
                <div className="space-y-2">
                  {challenges.map((ch) => (
                    <div key={ch.id} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-400 truncate max-w-[60%]">{ch.type}</span>
                      <span className={results[ch.id] === true ? 'text-cyber-green' : results[ch.id] === false ? 'text-red-400' : 'text-gray-600'}>
                        {results[ch.id] === true ? `+${ch.xp} XP ✓` : results[ch.id] === false ? 'FAILED ✗' : `${ch.xp} XP`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
