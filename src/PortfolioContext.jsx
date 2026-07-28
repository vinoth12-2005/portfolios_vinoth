import { createContext, useContext, useState, useEffect } from 'react';

const defaultData = {
  profile: {
    name: 'Vinoth M',
    firstName: 'VINOTH',
    lastName: 'M',
    photo: '/secure_docs/vinoth.png',
    email: 'vinothcyberstudent@gmail.com',
    contactEmail: 'vinothjpvm@gmail.com',
    github: 'https://github.com/vinoth12-2005',
    githubUsername: 'vinoth12-2005',
    linkedin: 'https://linkedin.com/in/vinothcyberstudent',
    linkedinUsername: 'vinothcyberstudent',
    location: 'Tirunelveli, Tamil Nadu',
    bio: 'Cybersecurity-focused Computer Science engineer with hands-on experience in Linux administration, VAPT, network security, and ethical hacking. Passionate about penetration testing, security research, and secure application development.',
    resumeUrl: '/secure_docs/Vinoth_M_Resume.pdf',
  },
  education: {
    degree: 'B.E Computer Science & Engineering (Cyber Security)',
    college: 'Dhanalakshmi Srinivasan College of Engineering & Technology',
    university: 'Anna University',
    cgpa: '7.54',
  },
  roles: [
    'Cybersecurity Student',
    'Ethical Hacker',
    'Linux Enthusiast',
    'Future Penetration Tester',
  ],
  skills: [
    {
      id: 's1',
      title: 'Programming',
      color: '#00ff41',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'JavaScript', level: 75 },
        { name: 'Bash Scripting', level: 80 },
      ],
    },
    {
      id: 's2',
      title: 'Web Technologies',
      color: '#00e5ff',
      skills: [
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 85 },
      ],
    },
    {
      id: 's3',
      title: 'OS & Networking',
      color: '#8b5cf6',
      skills: [
        { name: 'Linux Administration', level: 88 },
        { name: 'Kali Linux', level: 85 },
        { name: 'TCP/IP', level: 80 },
        { name: 'Network Protocols', level: 78 },
      ],
    },
    {
      id: 's4',
      title: 'Security Tools',
      color: '#ff073a',
      skills: [
        { name: 'Burp Suite', level: 82 },
        { name: 'Wireshark', level: 85 },
        { name: 'Nmap', level: 88 },
        { name: 'Metasploit', level: 78 },
      ],
    },
    {
      id: 's5',
      title: 'Cybersecurity',
      color: '#f59e0b',
      skills: [
        { name: 'VAPT', level: 80 },
        { name: 'Ethical Hacking', level: 82 },
        { name: 'OWASP Top 10', level: 85 },
        { name: 'Web App Security', level: 80 },
        { name: 'Digital Forensics', level: 72 },
        { name: 'Network Forensics', level: 75 },
      ],
    },
  ],
  projects: [
    {
      id: 'p1',
      title: 'VULnix 2.0 Debugging Challenge Platform',
      description: 'Interactive debugging platform supporting Python, C and Java. Used by 50+ participants. Includes automated testcase management and scoring.',
      github: 'https://github.com/vinoth12-2005/VULnix2.0-debug-challenge',
      tags: ['Python', 'Java', 'C', 'Automation', 'Testing'],
      highlights: ['50+ Active Participants', 'Multi-language Support', 'Automated Scoring'],
      color: '#00ff41',
    },
    {
      id: 'p2',
      title: 'Secure Conference Management System',
      description: 'Full-stack conference management platform implementing secure authentication, SQL Injection prevention and OWASP security practices.',
      github: 'https://github.com/vinoth12-2005/conference-management-system',
      tags: ['Security', 'Full-Stack', 'OWASP', 'SQL Injection Prevention'],
      highlights: ['OWASP Compliant', 'SQL Injection Prevention', 'Secure Auth'],
      color: '#00e5ff',
    },
  ],
  certifications: [
    { id: 'c1', title: 'Advanced Ethical Hacking in Tamil', issuer: 'GUVI & HCL', icon: '🛡️', color: '#00ff41', file: '/secure_docs/Guvi_certificate.pdf' },
    { id: 'c2', title: 'Network Security: Mastering Cybersecurity & Ethical Hacking', issuer: 'Udemy', icon: '🔐', color: '#00e5ff', file: '/secure_docs/Network_certificate.pdf' },
    { id: 'c3', title: 'Oracle Cloud Infrastructure AI Foundations Associate', issuer: 'Oracle', icon: '☁️', color: '#f59e0b', file: '/secure_docs/Oracle_vinoth.pdf' },
    { id: 'c4', title: 'Encoder-Decoder Architecture', issuer: 'Google Cloud', icon: '🧠', color: '#8b5cf6', file: '/secure_docs/vinoth_certificate_google.pdf' },
    { id: 'c5', title: 'Cyberentityz Industrial Visit Certificate', issuer: 'Cyberentityz', icon: '🏭', color: '#ff073a', file: '/secure_docs/iv_certificate_vinoth.pdf' },
  ],
  achievements: [
    { id: 'a1', number: 5, suffix: '+', label: 'Certifications', color: '#00ff41' },
    { id: 'a2', number: 2, suffix: '+', label: 'Security Projects', color: '#00e5ff' },
    { id: 'a3', number: 0, suffix: '', label: 'Cybersecurity Student', color: '#8b5cf6', isText: true },
    { id: 'a4', number: 0, suffix: '', label: 'Linux Enthusiast', color: '#f59e0b', isText: true },
  ],
  admin: {
    username: 'vinoth',
    password: 'cyber@2024',
  },
};

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_full_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge: for each key, if both are plain objects, merge them
        const merged = { ...defaultData };
        Object.keys(parsed).forEach((key) => {
          if (
            parsed[key] !== null &&
            typeof parsed[key] === 'object' &&
            !Array.isArray(parsed[key]) &&
            defaultData[key] !== null &&
            typeof defaultData[key] === 'object' &&
            !Array.isArray(defaultData[key])
          ) {
            merged[key] = { ...defaultData[key], ...parsed[key] };
          } else {
            merged[key] = parsed[key];
          }
        });
        return merged;
      }
    } catch (e) {}
    return defaultData;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_full_data', JSON.stringify(data));
  }, [data]);

  const updateProfile = (updates) => {
    setData(prev => ({ ...prev, profile: { ...prev.profile, ...updates } }));
  };

  const updateEducation = (updates) => {
    setData(prev => ({ ...prev, education: { ...prev.education, ...updates } }));
  };

  const updateRoles = (roles) => {
    setData(prev => ({ ...prev, roles }));
  };

  const updateSkillCategory = (catId, updates) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === catId ? { ...s, ...updates } : s),
    }));
  };

  const addSkillCategory = (category) => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...category, id: 's' + Date.now() }],
    }));
  };

  const removeSkillCategory = (catId) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== catId),
    }));
  };

  const addProject = (project) => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: 'p' + Date.now() }],
    }));
  };

  const updateProject = (projectId, updates) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projectId ? { ...p, ...updates } : p),
    }));
  };

  const removeProject = (projectId) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId),
    }));
  };

  const addCertification = (cert) => {
    setData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { ...cert, id: 'c' + Date.now() }],
    }));
  };

  const updateCertification = (certId, updates) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === certId ? { ...c, ...updates } : c),
    }));
  };

  const removeCertification = (certId) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== certId),
    }));
  };

  const updateAchievements = (achievements) => {
    setData(prev => ({ ...prev, achievements }));
  };

  const updateAdmin = (updates) => {
    setData(prev => ({ ...prev, admin: { ...prev.admin, ...updates } }));
  };

  const resetToDefault = () => {
    setData(defaultData);
    localStorage.removeItem('portfolio_full_data');
  };

  const login = (username, password) => {
    if (username === data.admin.username && password === data.admin.password) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <PortfolioContext.Provider value={{
      data, isAdmin, login, logout, resetToDefault,
      updateProfile, updateEducation, updateRoles,
      updateSkillCategory, addSkillCategory, removeSkillCategory,
      addProject, updateProject, removeProject,
      addCertification, updateCertification, removeCertification,
      updateAchievements, updateAdmin,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
