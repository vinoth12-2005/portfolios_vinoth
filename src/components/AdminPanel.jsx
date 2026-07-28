import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiX, FiSettings, FiSave, FiLogOut, FiPlus, FiTrash2, FiUser, FiCode, FiFolder, FiAward, FiRefreshCw } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const TABS = ['Profile', 'Education', 'Skills', 'Projects', 'Certs', 'Achievements', 'Settings'];
const COLORS = ['#00ff41','#00e5ff','#8b5cf6','#f59e0b','#ff073a','#ec4899','#06b6d4'];
const ICONS = ['🛡️','🔐','☁️','🧠','🏭','📜','🎓','💻','🔒','⚡'];

function Field({ label, value, onChange, textarea, type = 'text' }) {
  const cls = "w-full px-3 py-2 bg-cyber-darker border border-cyber-green/20 rounded-lg text-gray-200 font-mono text-xs outline-none focus:border-cyber-green transition-all placeholder:text-gray-700";
  return (
    <div className="mb-3">
      <label className="text-cyber-green/60 text-[10px] font-mono mb-1 block uppercase">{label}</label>
      {textarea ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={cls + ' resize-none'} /> :
        <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} />}
    </div>
  );
}

export default function AdminPanel() {
  const ctx = usePortfolio();
  const { data, isAdmin, login, logout, resetToDefault, updateProfile, updateEducation, updateRoles, updateSkillCategory, addSkillCategory, removeSkillCategory, addProject, updateProject, removeProject, addCertification, updateCertification, removeCertification, updateAchievements, updateAdmin } = ctx;

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('Profile');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [saved, setSaved] = useState('');

  const flash = (msg) => { setSaved(msg); setTimeout(() => setSaved(''), 2000); };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(user, pass)) { setErr(''); } else { setErr('Access Denied'); }
  };

  const renderProfile = () => (
    <div>
      <Field label="Full Name" value={data.profile.name} onChange={v => updateProfile({ name: v })} />
      <Field label="First Name (Display)" value={data.profile.firstName} onChange={v => updateProfile({ firstName: v })} />
      <Field label="Last Name (Display)" value={data.profile.lastName} onChange={v => updateProfile({ lastName: v })} />
      <Field label="Email" value={data.profile.email} onChange={v => updateProfile({ email: v })} />
      <Field label="Contact Form Delivery Email" value={data.profile.contactEmail || ''} onChange={v => updateProfile({ contactEmail: v })} />
      <Field label="Bio" value={data.profile.bio} onChange={v => updateProfile({ bio: v })} textarea />
      <Field label="Location" value={data.profile.location} onChange={v => updateProfile({ location: v })} />
      <Field label="GitHub URL" value={data.profile.github} onChange={v => updateProfile({ github: v })} />
      <Field label="GitHub Username" value={data.profile.githubUsername} onChange={v => updateProfile({ githubUsername: v })} />
      <Field label="LinkedIn URL" value={data.profile.linkedin} onChange={v => updateProfile({ linkedin: v })} />
      <Field label="LinkedIn Username" value={data.profile.linkedinUsername} onChange={v => updateProfile({ linkedinUsername: v })} />
      <Field label="Photo URL (path)" value={data.profile.photo} onChange={v => updateProfile({ photo: v })} />
      <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
        <label className="text-cyber-green/60 text-[10px] font-mono mb-2 block uppercase">Or Upload New Photo directly</label>
        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            if (file.size > 2 * 1024 * 1024) return alert("File too large! Must be under 2MB.");
            const reader = new FileReader();
            reader.onload = (ev) => updateProfile({ photo: ev.target.result });
            reader.readAsDataURL(file);
          }
        }} className="text-xs text-gray-400 w-full file:mr-4 file:py-1.5 file:px-3 file:rounded file:border file:border-cyber-green/20 file:text-xs file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer" />
      </div>
      <Field label="Resume URL (path)" value={data.profile.resumeUrl} onChange={v => updateProfile({ resumeUrl: v })} />
      <div className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/30">
        <label className="text-cyber-green/60 text-[10px] font-mono mb-2 block uppercase">Or Upload New Resume PDF directly</label>
        <input type="file" accept="application/pdf,.pdf" onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            if (file.size > 10 * 1024 * 1024) return alert("File too large! Must be under 10MB.");
            const reader = new FileReader();
            reader.onload = (ev) => {
              updateProfile({ resumeUrl: ev.target.result });
              flash('Resume uploaded & saved!');
            };
            reader.readAsDataURL(file);
          }
        }} className="text-xs text-gray-400 w-full file:mr-4 file:py-1.5 file:px-3 file:rounded file:border file:border-cyber-green/20 file:text-xs file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer" />
        {data.profile.resumeUrl && data.profile.resumeUrl.startsWith('data:') && (
          <p className="text-cyber-green/60 text-[10px] font-mono mt-2">✓ Custom resume PDF uploaded — showing on site</p>
        )}
      </div>
      <p className="text-gray-600 text-[10px] font-mono mt-2">Tip: Upload a PDF directly, or paste a file path like /secure_docs/resume.pdf or a Google Drive link.</p>
      <h4 className="text-cyber-green text-xs font-mono mt-4 mb-2">TYPING ROLES:</h4>
      {data.roles.map((r, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input value={r} onChange={e => { const nr = [...data.roles]; nr[i] = e.target.value; updateRoles(nr); }}
            className="flex-1 px-3 py-1.5 bg-cyber-darker border border-cyber-green/20 rounded text-gray-200 font-mono text-xs outline-none focus:border-cyber-green" />
          <button onClick={() => updateRoles(data.roles.filter((_, j) => j !== i))} className="text-cyber-red/60 hover:text-cyber-red text-xs px-2"><FiTrash2 /></button>
        </div>
      ))}
      <button onClick={() => updateRoles([...data.roles, 'New Role'])} className="text-cyber-green/60 hover:text-cyber-green text-xs font-mono flex items-center gap-1 mt-1"><FiPlus /> Add Role</button>
      <button onClick={() => flash('Profile saved!')} className="cyber-btn cyber-btn-primary w-full mt-4 flex items-center justify-center gap-2 text-xs"><FiSave /> {saved === 'Profile saved!' ? '✓ Saved!' : 'Save Profile'}</button>
    </div>
  );

  const renderEducation = () => (
    <div>
      <Field label="Degree" value={data.education.degree} onChange={v => updateEducation({ degree: v })} />
      <Field label="College" value={data.education.college} onChange={v => updateEducation({ college: v })} />
      <Field label="University" value={data.education.university} onChange={v => updateEducation({ university: v })} />
      <Field label="CGPA" value={data.education.cgpa} onChange={v => updateEducation({ cgpa: v })} />
      <button onClick={() => flash('Education saved!')} className="cyber-btn cyber-btn-primary w-full mt-4 flex items-center justify-center gap-2 text-xs"><FiSave /> {saved === 'Education saved!' ? '✓ Saved!' : 'Save Education'}</button>
    </div>
  );

  const renderSkills = () => (
    <div>
      {data.skills.map((cat) => (
        <div key={cat.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex items-center justify-between mb-2">
            <input value={cat.title} onChange={e => updateSkillCategory(cat.id, { title: e.target.value })}
              className="bg-transparent border-b border-cyber-green/20 text-white text-sm font-bold outline-none focus:border-cyber-green w-48" />
            <div className="flex items-center gap-2">
              <select value={cat.color} onChange={e => updateSkillCategory(cat.id, { color: e.target.value })}
                className="bg-cyber-darker border border-cyber-green/20 rounded text-xs text-gray-300 px-1 py-0.5 outline-none">
                {COLORS.map(c => <option key={c} value={c} style={{ color: c }}>{c}</option>)}
              </select>
              <button onClick={() => removeSkillCategory(cat.id)} className="text-cyber-red/60 hover:text-cyber-red"><FiTrash2 size={12} /></button>
            </div>
          </div>
          {cat.skills.map((sk, si) => (
            <div key={si} className="flex gap-2 mb-1.5">
              <input value={sk.name} onChange={e => { const ns = [...cat.skills]; ns[si] = { ...ns[si], name: e.target.value }; updateSkillCategory(cat.id, { skills: ns }); }}
                className="flex-1 px-2 py-1 bg-cyber-darker border border-cyber-green/15 rounded text-gray-300 font-mono text-xs outline-none focus:border-cyber-green" placeholder="Skill name" />
              <input type="number" min="0" max="100" value={sk.level} onChange={e => { const ns = [...cat.skills]; ns[si] = { ...ns[si], level: parseInt(e.target.value) || 0 }; updateSkillCategory(cat.id, { skills: ns }); }}
                className="w-14 px-2 py-1 bg-cyber-darker border border-cyber-green/15 rounded text-gray-300 font-mono text-xs outline-none focus:border-cyber-green text-center" />
              <button onClick={() => { const ns = cat.skills.filter((_, j) => j !== si); updateSkillCategory(cat.id, { skills: ns }); }}
                className="text-cyber-red/40 hover:text-cyber-red"><FiTrash2 size={10} /></button>
            </div>
          ))}
          <button onClick={() => updateSkillCategory(cat.id, { skills: [...cat.skills, { name: 'New Skill', level: 70 }] })}
            className="text-cyber-green/50 hover:text-cyber-green text-[10px] font-mono flex items-center gap-1 mt-1"><FiPlus /> Add Skill</button>
        </div>
      ))}
      <button onClick={() => addSkillCategory({ title: 'New Category', color: '#00ff41', skills: [{ name: 'Skill 1', level: 70 }] })}
        className="cyber-btn w-full mt-2 flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Category</button>
    </div>
  );

  const renderProjects = () => (
    <div>
      {data.projects.map((p) => (
        <div key={p.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex justify-between items-start mb-2">
            <span className="text-white text-xs font-bold truncate flex-1">{p.title}</span>
            <button onClick={() => removeProject(p.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
          </div>
          <Field label="Title" value={p.title} onChange={v => updateProject(p.id, { title: v })} />
          <Field label="Description" value={p.description} onChange={v => updateProject(p.id, { description: v })} textarea />
          <Field label="GitHub URL" value={p.github} onChange={v => updateProject(p.id, { github: v })} />
          <Field label="Tags (comma separated)" value={p.tags.join(', ')} onChange={v => updateProject(p.id, { tags: v.split(',').map(t => t.trim()).filter(Boolean) })} />
          <Field label="Highlights (comma separated)" value={p.highlights.join(', ')} onChange={v => updateProject(p.id, { highlights: v.split(',').map(t => t.trim()).filter(Boolean) })} />
          <div className="flex items-center gap-2">
            <label className="text-cyber-green/60 text-[10px] font-mono">COLOR:</label>
            <select value={p.color} onChange={e => updateProject(p.id, { color: e.target.value })}
              className="bg-cyber-darker border border-cyber-green/20 rounded text-xs text-gray-300 px-2 py-1 outline-none">
              {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      ))}
      <button onClick={() => addProject({ title: 'New Project', description: 'Project description here', github: 'https://github.com/', tags: ['Tag1'], highlights: ['Highlight 1'], color: '#00ff41' })}
        className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add New Project</button>
    </div>
  );

  const renderCerts = () => (
    <div>
      {data.certifications.map((c) => (
        <div key={c.id} className="mb-4 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50">
          <div className="flex justify-between items-start mb-2">
            <span className="text-white text-xs font-bold truncate flex-1">{c.title}</span>
            <button onClick={() => removeCertification(c.id)} className="text-cyber-red/60 hover:text-cyber-red ml-2"><FiTrash2 size={12} /></button>
          </div>
          <Field label="Title" value={c.title} onChange={v => updateCertification(c.id, { title: v })} />
          <Field label="Issuer" value={c.issuer} onChange={v => updateCertification(c.id, { issuer: v })} />
          <Field label="File URL (path)" value={c.file || ''} onChange={v => updateCertification(c.id, { file: v })} />
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <label className="text-cyber-green/60 text-[10px] font-mono">ICON:</label>
              <select value={c.icon} onChange={e => updateCertification(c.id, { icon: e.target.value })}
                className="bg-cyber-darker border border-cyber-green/20 rounded text-sm px-2 py-1 outline-none">
                {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-cyber-green/60 text-[10px] font-mono">COLOR:</label>
              <select value={c.color} onChange={e => updateCertification(c.id, { color: e.target.value })}
                className="bg-cyber-darker border border-cyber-green/20 rounded text-xs text-gray-300 px-2 py-1 outline-none">
                {COLORS.map(co => <option key={co} value={co}>{co}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => addCertification({ title: 'New Certificate', issuer: 'Issuer', icon: '📜', color: '#00ff41', file: '' })}
        className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiPlus /> Add Certificate</button>
      <p className="text-gray-600 text-[10px] font-mono mt-2">Tip: Put PDF files in public/assets/ and use /assets/filename.pdf</p>
    </div>
  );

  const renderAchievements = () => (
    <div>
      {data.achievements.map((a, i) => (
        <div key={a.id} className="mb-3 p-3 border border-cyber-green/10 rounded-lg bg-cyber-darker/50 flex gap-3 items-end">
          <div className="flex-1">
            <Field label="Label" value={a.label} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], label: v }; updateAchievements(na); }} />
          </div>
          <div className="w-16">
            <Field label="Number" value={String(a.number)} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], number: parseInt(v) || 0 }; updateAchievements(na); }} />
          </div>
          <div className="w-12">
            <Field label="Suffix" value={a.suffix} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], suffix: v }; updateAchievements(na); }} />
          </div>
          <label className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mb-3">
            <input type="checkbox" checked={!!a.isText} onChange={e => { const na = [...data.achievements]; na[i] = { ...na[i], isText: e.target.checked }; updateAchievements(na); }} className="accent-cyber-green" />
            Text
          </label>
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div>
      <h4 className="text-cyber-green text-xs font-mono mb-3">CHANGE ADMIN CREDENTIALS</h4>
      <Field label="Username" value={data.admin.username} onChange={v => updateAdmin({ username: v })} />
      <Field label="Password" value={data.admin.password} onChange={v => updateAdmin({ password: v })} type="text" />
      <button onClick={() => flash('Credentials updated!')} className="cyber-btn cyber-btn-primary w-full mt-2 flex items-center justify-center gap-2 text-xs"><FiSave /> {saved === 'Credentials updated!' ? '✓ Updated!' : 'Update Credentials'}</button>
      <div className="mt-6 pt-4 border-t border-cyber-red/20">
        <h4 className="text-cyber-red text-xs font-mono mb-3">DANGER ZONE</h4>
        <button onClick={() => { if (confirm('Reset all data to defaults? This cannot be undone.')) { resetToDefault(); flash('Reset done!'); } }}
          className="cyber-btn w-full flex items-center justify-center gap-2 text-xs border-cyber-red/40 text-cyber-red hover:bg-cyber-red/10"><FiRefreshCw /> Reset to Default Data</button>
      </div>
    </div>
  );

  const tabContent = { Profile: renderProfile, Education: renderEducation, Skills: renderSkills, Projects: renderProjects, Certs: renderCerts, Achievements: renderAchievements, Settings: renderSettings };

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-[2000] w-10 h-10 flex items-center justify-center bg-cyber-darker border border-cyber-green/20 rounded-full text-cyber-green/40 hover:text-cyber-green hover:border-cyber-green/40 transition-all text-sm" id="admin-login-btn" title="Admin Panel">
        {isAdmin ? <FiSettings className="animate-spin-slow" /> : <FiLock />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[50000] flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cyber-card border border-cyber-green/30 rounded-xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-cyber-green/10 flex-shrink-0">
                <h3 className="font-display text-cyber-green text-sm tracking-wider">{isAdmin ? '⚙ ADMIN CONTROL PANEL' : '🔒 ADMIN LOGIN'}</h3>
                <div className="flex items-center gap-2">
                  {isAdmin && <button onClick={() => { logout(); }} className="text-xs text-gray-500 hover:text-cyber-red font-mono flex items-center gap-1"><FiLogOut /> Logout</button>}
                  <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white"><FiX /></button>
                </div>
              </div>

              {!isAdmin ? (
                /* Login Form */
                <form onSubmit={handleLogin} className="p-6 space-y-4">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-cyber-green/10 rounded-full border border-cyber-green/20"><FiLock className="text-cyber-green text-2xl" /></div>
                    <p className="text-gray-400 text-xs font-mono">Enter admin credentials to access controls</p>
                  </div>
                  <Field label="Username" value={user} onChange={setUser} />
                  <Field label="Password" value={pass} onChange={setPass} type="password" />
                  {err && <p className="text-cyber-red text-xs font-mono">{err}</p>}
                  <button type="submit" className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 text-xs"><FiLock /> Authenticate</button>
                </form>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex gap-1 px-3 pt-3 overflow-x-auto flex-shrink-0">
                    {TABS.map(t => (
                      <button key={t} onClick={() => setTab(t)}
                        className={`px-3 py-1.5 text-[10px] font-mono rounded-t-lg whitespace-nowrap transition-all ${tab === t ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20 border-b-0' : 'text-gray-500 hover:text-gray-300'}`}>{t}</button>
                    ))}
                  </div>
                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-4 border-t border-cyber-green/10">
                    {saved && <div className="mb-3 px-3 py-2 bg-cyber-green/10 border border-cyber-green/20 rounded-lg text-cyber-green text-xs font-mono text-center">✓ {saved}</div>}
                    <p className="text-cyber-green/40 text-[10px] font-mono mb-3">{'>'} All changes update the site in real-time</p>
                    {tabContent[tab]?.()}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
