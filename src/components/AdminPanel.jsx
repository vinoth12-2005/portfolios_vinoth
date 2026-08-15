import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiX, FiSettings, FiSave, FiLogOut, FiPlus, FiTrash2, FiUser, FiCode, FiFolder, FiAward, FiRefreshCw } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const TABS = ['Profile', 'Education', 'Skills', 'Projects', 'Certs', 'Achievements', 'Settings'];
const COLORS = ['#8b5cf6', '#22d3ee', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#f43f5e'];
const ICONS = ['🛡️', '🔐', '☁️', '🧠', '🏭', '📜', '🎓', '💻', '🔒', '⚡'];

function Field({ label, value, onChange, textarea, type = 'text' }) {
  const cls = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-200 font-mono text-xs outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all placeholder:text-slate-600";
  return (
    <div className="mb-4">
      <label className="text-violet-400 text-[10px] font-mono tracking-wider mb-1.5 block uppercase opacity-85">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className={cls + ' resize-none'}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cls}
        />
      )}
    </div>
  );
}

export default function AdminPanel() {
  const ctx = usePortfolio();
  const {
    data, isAdmin, login, logout, resetToDefault,
    updateProfile, updateEducation, updateRoles,
    updateSkillCategory, addSkillCategory, removeSkillCategory,
    addProject, updateProject, removeProject,
    addCertification, updateCertification, removeCertification,
    updateAchievements, updateAdmin
  } = ctx;

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
      
      <div className="mb-4 p-4 border border-white/5 rounded-2xl bg-white/[0.02]">
        <label className="text-violet-400 text-[10px] font-mono mb-2.5 block uppercase opacity-85">Or Upload New Photo directly</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              if (file.size > 2 * 1024 * 1024) return alert("File too large! Must be under 2MB.");
              const reader = new FileReader();
              reader.onload = (ev) => updateProfile({ photo: ev.target.result });
              reader.readAsDataURL(file);
            }
          }}
          className="text-xs text-slate-400 w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-white/10 file:text-xs file:font-mono file:bg-white/5 file:text-slate-300 hover:file:bg-white/10 cursor-pointer transition-all"
        />
      </div>

      <Field label="Resume URL (path)" value={data.profile.resumeUrl} onChange={v => updateProfile({ resumeUrl: v })} />
      
      <div className="mb-4 p-4 border border-white/5 rounded-2xl bg-white/[0.02]">
        <label className="text-violet-400 text-[10px] font-mono mb-2.5 block uppercase opacity-85">Or Upload New Resume PDF directly</label>
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => {
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
          }}
          className="text-xs text-slate-400 w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-white/10 file:text-xs file:font-mono file:bg-white/5 file:text-slate-300 hover:file:bg-white/10 cursor-pointer transition-all"
        />
        {data.profile.resumeUrl && data.profile.resumeUrl.startsWith('data:') && (
          <p className="text-emerald-400 text-[10px] font-mono mt-2.5">✓ Custom resume PDF uploaded — showing on site</p>
        )}
      </div>
      
      <p className="text-slate-500 text-[10px] font-mono mt-2">// Tip: Upload a PDF directly, or paste a file path like /secure_docs/resume.pdf</p>
      
      <h4 className="text-violet-400 text-xs font-mono mt-6 mb-3 font-semibold tracking-wider">TYPING ROLES</h4>
      {data.roles.map((r, i) => (
        <div key={i} className="flex gap-2 mb-2.5">
          <input
            value={r}
            onChange={e => { const nr = [...data.roles]; nr[i] = e.target.value; updateRoles(nr); }}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-200 font-mono text-xs outline-none focus:border-violet-500/50"
          />
          <button
            onClick={() => updateRoles(data.roles.filter((_, j) => j !== i))}
            className="text-rose-500/60 hover:text-rose-400 text-xs px-2.5 transition-colors"
          >
            <FiTrash2 />
          </button>
        </div>
      ))}
      <button
        onClick={() => updateRoles([...data.roles, 'New Role'])}
        className="text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center gap-1.5 mt-2 transition-colors"
      >
        <FiPlus /> Add Role
      </button>
      
      <button
        onClick={() => flash('Profile saved!')}
        className="w-full mt-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98]"
      >
        <FiSave /> {saved === 'Profile saved!' ? '✓ Saved!' : 'Save Profile'}
      </button>
    </div>
  );

  const renderEducation = () => (
    <div>
      <Field label="Degree" value={data.education.degree} onChange={v => updateEducation({ degree: v })} />
      <Field label="College" value={data.education.college} onChange={v => updateEducation({ college: v })} />
      <Field label="University" value={data.education.university} onChange={v => updateEducation({ university: v })} />
      <Field label="CGPA" value={data.education.cgpa} onChange={v => updateEducation({ cgpa: v })} />
      <button
        onClick={() => flash('Education saved!')}
        className="w-full mt-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98]"
      >
        <FiSave /> {saved === 'Education saved!' ? '✓ Saved!' : 'Save Education'}
      </button>
    </div>
  );

  const renderSkills = () => (
    <div>
      {data.skills.map((cat) => (
        <div key={cat.id} className="mb-5 p-4 border border-white/5 rounded-2xl bg-white/[0.02]">
          <div className="flex items-center justify-between mb-3.5">
            <input
              value={cat.title}
              onChange={e => updateSkillCategory(cat.id, { title: e.target.value })}
              className="bg-transparent border-b border-white/10 text-white text-sm font-bold outline-none focus:border-violet-500/50 w-48 font-display"
            />
            <div className="flex items-center gap-3">
              <select
                value={cat.color}
                onChange={e => updateSkillCategory(cat.id, { color: e.target.value })}
                className="bg-slate-900 border border-white/10 rounded-lg text-xs text-slate-300 px-2.5 py-1 outline-none focus:border-violet-500/30"
              >
                {COLORS.map(c => <option key={c} value={c} style={{ color: c }}>{c}</option>)}
              </select>
              <button onClick={() => removeSkillCategory(cat.id)} className="text-rose-500/60 hover:text-rose-400 transition-colors"><FiTrash2 size={13} /></button>
            </div>
          </div>
          {cat.skills.map((sk, si) => (
            <div key={si} className="flex gap-2 mb-2">
              <input
                value={sk.name}
                onChange={e => { const ns = [...cat.skills]; ns[si] = { ...ns[si], name: e.target.value }; updateSkillCategory(cat.id, { skills: ns }); }}
                className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 font-mono text-xs outline-none focus:border-violet-500/40"
                placeholder="Skill name"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={sk.level}
                onChange={e => { const ns = [...cat.skills]; ns[si] = { ...ns[si], level: parseInt(e.target.value) || 0 }; updateSkillCategory(cat.id, { skills: ns }); }}
                className="w-16 px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 font-mono text-xs outline-none focus:border-violet-500/40 text-center"
              />
              <button
                onClick={() => { const ns = cat.skills.filter((_, j) => j !== si); updateSkillCategory(cat.id, { skills: ns }); }}
                className="text-rose-500/40 hover:text-rose-400 transition-colors px-1"
              >
                <FiTrash2 size={12} />
              </button>
            </div>
          ))}
          <button
            onClick={() => updateSkillCategory(cat.id, { skills: [...cat.skills, { name: 'New Skill', level: 70 }] })}
            className="text-cyan-400 hover:text-cyan-300 text-[10px] font-mono flex items-center gap-1 mt-2 transition-colors"
          >
            <FiPlus /> Add Skill
          </button>
        </div>
      ))}
      <button
        onClick={() => addSkillCategory({ title: 'New Category', color: '#8b5cf6', skills: [{ name: 'Skill 1', level: 70 }] })}
        className="w-full mt-4 py-2.5 border border-dashed border-white/10 hover:border-violet-500/40 text-slate-400 hover:text-violet-400 rounded-xl text-xs flex items-center justify-center gap-2 transition-all bg-white/[0.01] hover:bg-white/[0.03] active:scale-[0.98]"
      >
        <FiPlus /> Add Category
      </button>
    </div>
  );

  const renderProjects = () => (
    <div>
      {data.projects.map((p) => (
        <div key={p.id} className="mb-5 p-4 border border-white/5 rounded-2xl bg-white/[0.02]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white text-xs font-bold truncate flex-1 font-display tracking-wide">{p.title}</span>
            <button onClick={() => removeProject(p.id)} className="text-rose-500/60 hover:text-rose-400 transition-colors ml-2"><FiTrash2 size={13} /></button>
          </div>
          <Field label="Title" value={p.title} onChange={v => updateProject(p.id, { title: v })} />
          <Field label="Description" value={p.description} onChange={v => updateProject(p.id, { description: v })} textarea />
          <Field label="GitHub URL" value={p.github} onChange={v => updateProject(p.id, { github: v })} />
          <Field label="Tags (comma separated)" value={p.tags.join(', ')} onChange={v => updateProject(p.id, { tags: v.split(',').map(t => t.trim()).filter(Boolean) })} />
          <Field label="Highlights (comma separated)" value={p.highlights.join(', ')} onChange={v => updateProject(p.id, { highlights: v.split(',').map(t => t.trim()).filter(Boolean) })} />
          
          <div className="flex items-center gap-3 mt-1">
            <label className="text-violet-400 text-[10px] font-mono tracking-wider uppercase opacity-85">COLOR:</label>
            <select
              value={p.color}
              onChange={e => updateProject(p.id, { color: e.target.value })}
              className="bg-slate-900 border border-white/10 rounded-lg text-xs text-slate-300 px-3 py-1.5 outline-none focus:border-violet-500/30 font-mono"
            >
              {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      ))}
      <button
        onClick={() => addProject({ title: 'New Project', description: 'Project description here', github: 'https://github.com/', tags: ['Tag1'], highlights: ['Highlight 1'], color: '#8b5cf6' })}
        className="w-full mt-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98]"
      >
        <FiPlus /> Add New Project
      </button>
    </div>
  );

  const renderCerts = () => (
    <div>
      {data.certifications.map((c) => (
        <div key={c.id} className="mb-5 p-4 border border-white/5 rounded-2xl bg-white/[0.02]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white text-xs font-bold truncate flex-1 font-display tracking-wide">{c.title}</span>
            <button onClick={() => removeCertification(c.id)} className="text-rose-500/60 hover:text-rose-400 transition-colors ml-2"><FiTrash2 size={13} /></button>
          </div>
          <Field label="Title" value={c.title} onChange={v => updateCertification(c.id, { title: v })} />
          <Field label="Issuer" value={c.issuer} onChange={v => updateCertification(c.id, { issuer: v })} />
          <Field label="File URL (path)" value={c.file || ''} onChange={v => updateCertification(c.id, { file: v })} />
          
          <div className="flex gap-4 mt-1">
            <div className="flex items-center gap-2.5">
              <label className="text-violet-400 text-[10px] font-mono tracking-wider uppercase opacity-85">ICON:</label>
              <select
                value={c.icon}
                onChange={e => updateCertification(c.id, { icon: e.target.value })}
                className="bg-slate-900 border border-white/10 rounded-lg text-sm px-2.5 py-1.5 outline-none focus:border-violet-500/30"
              >
                {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2.5">
              <label className="text-violet-400 text-[10px] font-mono tracking-wider uppercase opacity-85">COLOR:</label>
              <select
                value={c.color}
                onChange={e => updateCertification(c.id, { color: e.target.value })}
                className="bg-slate-900 border border-white/10 rounded-lg text-xs text-slate-300 px-3 py-1.5 outline-none focus:border-violet-500/30 font-mono"
              >
                {COLORS.map(co => <option key={co} value={co}>{co}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => addCertification({ title: 'New Certificate', issuer: 'Issuer', icon: '📜', color: '#8b5cf6', file: '' })}
        className="w-full mt-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98]"
      >
        <FiPlus /> Add Certificate
      </button>
      <p className="text-slate-500 text-[10px] font-mono mt-2">// Tip: Place PDF files in public/assets/ and reference them as /assets/filename.pdf</p>
    </div>
  );

  const renderAchievements = () => (
    <div>
      {data.achievements.map((a, i) => (
        <div key={a.id} className="mb-3.5 p-4 border border-white/5 rounded-2xl bg-white/[0.02] flex gap-3 items-end">
          <div className="flex-1">
            <Field label="Label" value={a.label} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], label: v }; updateAchievements(na); }} />
          </div>
          <div className="w-16">
            <Field label="Number" value={String(a.number)} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], number: parseInt(v) || 0 }; updateAchievements(na); }} />
          </div>
          <div className="w-12">
            <Field label="Suffix" value={a.suffix} onChange={v => { const na = [...data.achievements]; na[i] = { ...na[i], suffix: v }; updateAchievements(na); }} />
          </div>
          <label className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mb-3.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!a.isText}
              onChange={e => { const na = [...data.achievements]; na[i] = { ...na[i], isText: e.target.checked }; updateAchievements(na); }}
              className="accent-violet-500 h-3.5 w-3.5 rounded border-white/10"
            />
            Text
          </label>
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div>
      <h4 className="text-violet-400 text-xs font-mono mb-4 font-semibold tracking-wider">CHANGE ADMIN CREDENTIALS</h4>
      <Field label="Username" value={data.admin.username} onChange={v => updateAdmin({ username: v })} />
      <Field label="Password" value={data.admin.password} onChange={v => updateAdmin({ password: v })} type="text" />
      <button
        onClick={() => flash('Credentials updated!')}
        className="w-full mt-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98]"
      >
        <FiSave /> {saved === 'Credentials updated!' ? '✓ Updated!' : 'Update Credentials'}
      </button>
      
      <div className="mt-8 pt-6 border-t border-rose-500/20">
        <h4 className="text-rose-400 text-xs font-mono mb-4 font-semibold tracking-wider">DANGER ZONE</h4>
        <button
          onClick={() => { if (confirm('Reset all data to defaults? This cannot be undone.')) { resetToDefault(); flash('Reset done!'); } }}
          className="w-full py-2.5 border border-rose-500/30 hover:border-rose-500/60 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <FiRefreshCw /> Reset to Default Data
        </button>
      </div>
    </div>
  );

  const tabContent = { Profile: renderProfile, Education: renderEducation, Skills: renderSkills, Projects: renderProjects, Certs: renderCerts, Achievements: renderAchievements, Settings: renderSettings };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[2000] w-12 h-12 flex items-center justify-center bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-full text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-all shadow-lg hover:shadow-violet-500/10 text-sm active:scale-[0.95]"
        id="admin-login-btn"
        title="Admin Panel"
      >
        {isAdmin ? <FiSettings className="animate-spin-slow text-lg" /> : <FiLock className="text-base" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/75 backdrop-blur-md z-[50000] flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setOpen(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl shadow-violet-950/20">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
                <h3 className="font-display text-violet-400 text-xs tracking-widest font-semibold">{isAdmin ? '⚙ ADMIN CONTROL PANEL' : '🔒 ADMIN GATEWAY'}</h3>
                <div className="flex items-center gap-4">
                  {isAdmin && (
                    <button
                      onClick={() => { logout(); }}
                      className="text-xs text-slate-500 hover:text-rose-400 font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <FiLogOut /> Logout
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors"><FiX /></button>
                </div>
              </div>

              {!isAdmin ? (
                /* Login Form */
                <form onSubmit={handleLogin} className="p-8 space-y-5">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-violet-500/10 rounded-2xl border border-violet-500/20 text-violet-400 shadow-lg shadow-violet-500/5">
                      <FiLock className="text-2xl" />
                    </div>
                    <h4 className="font-syne text-white text-base font-bold tracking-tight">Security Gateway</h4>
                    <p className="text-slate-400 text-xs mt-1">Enter admin credentials to authenticate</p>
                  </div>
                  
                  <Field label="Username" value={user} onChange={setUser} />
                  <Field label="Password" value={pass} onChange={setPass} type="password" />
                  
                  {err && <p className="text-rose-500 text-xs font-mono mt-1 text-center bg-rose-500/10 border border-rose-500/25 py-2 rounded-lg">✗ {err}</p>}
                  
                  <button
                    type="submit"
                    className="w-full mt-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98]"
                  >
                    <FiLock /> Authenticate
                  </button>
                </form>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex gap-1.5 px-4 pt-4 overflow-x-auto flex-shrink-0 border-b border-white/5">
                    {TABS.map(t => {
                      const isActive = tab === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className={`px-4 py-2 text-[10px] font-mono rounded-t-xl whitespace-nowrap transition-all border border-b-0 ${
                            isActive
                              ? 'bg-violet-500/10 text-violet-300 border-white/10'
                              : 'text-slate-500 hover:text-slate-300 border-transparent'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {saved && (
                      <div className="mb-4 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-mono text-center">
                        ✓ {saved}
                      </div>
                    )}
                    <p className="text-slate-500 text-[10px] font-mono mb-4">// Live Sync Active: Changes reflect instantly</p>
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
