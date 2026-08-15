import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiSend, FiPaperclip, FiGithub, FiLinkedin, FiCheckCircle } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const inputStyle = {
  width: '100%', padding: '13px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12, color: '#f8fafc',
  fontFamily: 'Space Grotesk', fontSize: '0.88rem',
  outline: 'none', transition: 'border-color 0.3s ease',
};

const DEST_EMAIL = 'vinothjpvm@gmail.com';

export default function Contact() {
  const { data } = usePortfolio();
  const { profile } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [focused, setFocused]   = useState('');
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);

  const cards = [
    { icon: <FiMail />, label: 'Email', value: DEST_EMAIL, href: `mailto:${DEST_EMAIL}`, color: '#8b5cf6' },
    { icon: <FiLinkedin />, label: 'LinkedIn', value: profile.linkedinUsername || 'vinothcyberstudent', href: profile.linkedin, color: '#22d3ee' },
    { icon: <FiGithub />, label: 'GitHub', value: profile.githubUsername || 'vinoth12-2005', href: profile.github, color: '#ec4899' },
    { icon: <FiMapPin />, label: 'Location', value: profile.location || 'Tirunelveli, Tamil Nadu', href: null, color: '#f59e0b' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.target);

    fetch(`https://formsubmit.co/ajax/${DEST_EMAIL}`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        setSending(false);
        setSent(true);
      })
      .catch(err => {
        // Fallback: regular submit
        e.target.submit();
      });
  };

  return (
    <section id="contact" style={{ padding: '96px 0', position: 'relative' }} ref={ref}>
      <div style={{
        position: 'absolute', left: '50%', top: '10%', transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <span className="q-label">// ssh contact@vinothjpvm.gmail.com</span>
          <h2 className="q-heading" style={{ marginTop: 8 }}>Let's <span className="grad-text">Connect</span></h2>
          <div className="q-section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32, maxWidth: 1100, margin: '0 auto' }}>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="glass" style={{ padding: 32 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, color: '#f8fafc', marginBottom: 8, fontSize: '1.1rem' }}>
                Send a Message
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'Space Grotesk', marginBottom: 24 }}>
                Messages are delivered directly to <span style={{ color: '#22d3ee' }}>{DEST_EMAIL}</span>.
              </p>

              {sent ? (
                <div style={{
                  padding: 24, borderRadius: 12, background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)', textAlign: 'center',
                }}>
                  <FiCheckCircle style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: 12 }} />
                  <h4 style={{ fontFamily: 'Syne', color: '#f8fafc', fontSize: '1.1rem', marginBottom: 6 }}>Message Sent!</h4>
                  <p style={{ fontFamily: 'Space Grotesk', color: '#94a3b8', fontSize: '0.85rem' }}>
                    Thank you for reaching out. Your message has been sent to <strong style={{ color: '#10b981' }}>{DEST_EMAIL}</strong>. I will reply to you shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="q-btn q-btn-outline"
                    style={{ marginTop: 16, borderColor: '#10b981', color: '#10b981' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  action={`https://formsubmit.co/${DEST_EMAIL}`}
                  method="POST"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <input type="hidden" name="_subject" value="🚀 New Message from Vinoth Portfolio Visitor!" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  {['name', 'email'].map(field => (
                    <div key={field}>
                      <label style={{ fontFamily: 'Fira Code', fontSize: '0.68rem', color: '#8b5cf6', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {field}:
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        required
                        placeholder={field === 'name' ? 'Your full name' : 'your@email.com'}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused('')}
                        style={{ ...inputStyle, borderColor: focused === field ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)' }}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontFamily: 'Fira Code', fontSize: '0.68rem', color: '#8b5cf6', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                      message:
                    </label>
                    <textarea
                      name="message" required rows="4"
                      placeholder="Tell me about your project or cybersecurity opportunity..."
                      onFocus={() => setFocused('msg')}
                      onBlur={() => setFocused('')}
                      style={{ ...inputStyle, resize: 'none', borderColor: focused === 'msg' ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Fira Code', fontSize: '0.68rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                      <FiPaperclip /> attach file (optional):
                    </label>
                    <input
                      type="file" name="attachment"
                      style={{
                        ...inputStyle, padding: '10px 14px',
                        cursor: 'pointer', fontSize: '0.8rem',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="q-btn q-btn-primary"
                    id="contact-send"
                    style={{ justifyContent: 'center', marginTop: 8 }}
                  >
                    <FiSend /> {sending ? 'Transmitting Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact cards */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}
          >
            {cards.map(c => (
              c.href
                ? <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer" className="glass"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', textDecoration: 'none', borderColor: `${c.color}20` }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: `${c.color}15`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, fontSize: '1.1rem', flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem' }}>{c.label}</div>
                      <div style={{ fontFamily: 'Fira Code', fontSize: '0.72rem', color: c.color, opacity: 0.8, marginTop: 2 }}>{c.value}</div>
                    </div>
                  </a>
                : <div key={c.label} className="glass" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', borderColor: `${c.color}20` }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: `${c.color}15`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, fontSize: '1.1rem', flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem' }}>{c.label}</div>
                      <div style={{ fontFamily: 'Fira Code', fontSize: '0.72rem', color: c.color, opacity: 0.8, marginTop: 2 }}>{c.value}</div>
                    </div>
                  </div>
            ))}

            {/* Status card */}
            <div className="glass" style={{ padding: '20px', borderColor: 'rgba(16,185,129,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'glowPulse 1.5s ease infinite' }} />
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#10b981', fontSize: '0.88rem' }}>Direct Email Relay Active</span>
              </div>
              <p style={{ fontFamily: 'Space Grotesk', color: '#64748b', fontSize: '0.8rem', lineHeight: 1.6 }}>
                All form submissions are routed directly to <span style={{ color: '#22d3ee' }}>vinothjpvm@gmail.com</span> with instant inbox notifications.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
