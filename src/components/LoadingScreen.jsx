import { useState, useEffect } from 'react';

const bootLines = [
  '> VINOTH_M_PORTFOLIO v2.0',
  '> Initializing secure connection...',
  '> [OK] SSL/TLS Handshake complete',
  '> [OK] Loading kernel modules...',
  '> [OK] Mounting encrypted filesystem...',
  '> [OK] Starting Firewall Service...',
  '> [OK] IDS/IPS modules loaded',
  '> [OK] Network interfaces configured',
  '> Scanning for vulnerabilities... 0 threats found',
  '> [OK] Security protocols engaged',
  '> [OK] Loading portfolio assets...',
  '> [OK] All systems operational',
  '> ',
  '> Welcome, Agent.',
  '> Access Granted. Loading Dashboard...',
];

export default function LoadingScreen() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setVisibleLines(prev => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setHidden(true), 500);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="terminal-boot">
        <div className="mb-4 text-cyber-green font-display text-lg tracking-wider">
          ╔══════════════════════════════════════╗
        </div>
        <div className="mb-4 text-cyber-green font-display text-lg tracking-wider text-center">
          VINOTH M - CYBER PORTFOLIO
        </div>
        <div className="mb-6 text-cyber-green font-display text-lg tracking-wider">
          ╚══════════════════════════════════════╝
        </div>
        {visibleLines.map((line, index) => (
          <div
            key={index}
            className="boot-line text-cyber-green/80"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {line}
          </div>
        ))}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-cyber-green animate-type-cursor"></div>
        </div>
        <div className="mt-6">
          <div className="h-1 bg-cyber-green/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full transition-all duration-300"
              style={{ width: `${(visibleLines.length / bootLines.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-cyber-green/50 text-xs mt-2 font-mono">
            Loading... {Math.round((visibleLines.length / bootLines.length) * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}
