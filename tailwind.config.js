/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        q: {
          bg:       '#030014',
          surface:  '#0d0d2b',
          card:     'rgba(255,255,255,0.03)',
          border:   'rgba(255,255,255,0.08)',
          violet:   '#8b5cf6',
          indigo:   '#6366f1',
          cyan:     '#22d3ee',
          pink:     '#ec4899',
          white:    '#f8fafc',
          muted:    '#64748b',
          text:     '#cbd5e1',
        },
      },
      fontFamily: {
        mono:    ['"Fira Code"', '"JetBrains Mono"', 'monospace'],
        sans:    ['"Space Grotesk"', 'sans-serif'],
        syne:    ['"Syne"', 'sans-serif'],
        display: ['"Orbitron"', 'sans-serif'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'orbit':       'orbit 12s linear infinite',
        'orbit-rev':   'orbitRev 16s linear infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'gradient-x':  'gradientX 4s ease infinite',
        'blob':        'blob 8s ease-in-out infinite',
        'scan':        'scanAnim 3s linear infinite',
        'flicker':     'flicker 4s linear infinite',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        glowPulse:  { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        orbit:      { from: { transform: 'rotate(0deg) translateX(110px) rotate(0deg)' }, to: { transform: 'rotate(360deg) translateX(110px) rotate(-360deg)' } },
        orbitRev:   { from: { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' }, to: { transform: 'rotate(-360deg) translateX(140px) rotate(360deg)' } },
        shimmer:    { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        gradientX:  { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        blob:       { '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }, '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' } },
        scanAnim:   { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        flicker:    { '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1' }, '20%,24%,55%': { opacity: '0.4' } },
      },
    },
  },
  plugins: [],
}
