import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUser, FiBook, FiMapPin } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function About() {
  const { data } = usePortfolio();
  const { profile, education } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 cyber-grid-bg opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} cat about_me.txt</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">About <span className="text-cyber-green">Me</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="terminal-window glow-box">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="text-cyber-green/50 text-xs font-mono ml-2">vinoth@kali:~/about</span>
              </div>
              <div className="terminal-body">
                <p className="mb-4">
                  <span className="text-cyber-green">vinoth@kali</span><span className="text-white">:</span>
                  <span className="text-cyber-cyan">~</span><span className="text-white">$ </span>
                  <span className="text-gray-300">whoami</span>
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">{profile.bio}</p>
                <p className="mb-3">
                  <span className="text-cyber-green">vinoth@kali</span><span className="text-white">:</span>
                  <span className="text-cyber-cyan">~</span><span className="text-white">$ </span>
                  <span className="text-gray-300">cat interests.txt</span>
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-center gap-2"><span className="text-cyber-green">▸</span> Penetration Testing & Red Teaming</li>
                  <li className="flex items-center gap-2"><span className="text-cyber-green">▸</span> Web Application Security</li>
                  <li className="flex items-center gap-2"><span className="text-cyber-green">▸</span> Network Security & Forensics</li>
                  <li className="flex items-center gap-2"><span className="text-cyber-green">▸</span> Linux Administration & Hardening</li>
                  <li className="flex items-center gap-2"><span className="text-cyber-green">▸</span> Secure Software Development</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-5">
            <div className="cyber-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-cyber-green/10 rounded-lg border border-cyber-green/20">
                  <FiBook className="text-cyber-green text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Education</h3>
                  <p className="text-cyber-text text-sm font-medium">{education.degree}</p>
                  <p className="text-gray-400 text-sm mt-1">{education.college}</p>
                  <p className="text-gray-500 text-xs mt-1">{education.university}</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-cyber-green/10 px-3 py-1 rounded-full border border-cyber-green/20">
                    <span className="text-cyber-green font-mono text-sm font-bold">CGPA: {education.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-cyber-green/10 rounded-lg border border-cyber-green/20">
                  <FiUser className="text-cyber-green text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-3">Quick Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-cyber-green/60 font-mono text-xs">NAME:</span><p className="text-gray-300">{profile.name}</p></div>
                    <div><span className="text-cyber-green/60 font-mono text-xs">ROLE:</span><p className="text-gray-300">Cybersecurity Student</p></div>
                    <div><span className="text-cyber-green/60 font-mono text-xs">FOCUS:</span><p className="text-gray-300">VAPT & Ethical Hacking</p></div>
                    <div><span className="text-cyber-green/60 font-mono text-xs">STATUS:</span><p className="text-cyber-green">● Active</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-cyber-green/10 rounded-lg border border-cyber-green/20">
                  <FiMapPin className="text-cyber-green text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Location</h3>
                  <p className="text-gray-400 text-sm">{profile.location}, India</p>
                  <p className="text-cyber-green/50 text-xs font-mono mt-1">[TIMEZONE] IST (UTC+5:30)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
