import { useState, useEffect } from 'react';
import { PortfolioProvider } from './PortfolioContext';
import LoadingScreen from './components/LoadingScreen';
import MatrixRain from './components/MatrixRain';
import CustomCursor from './components/CustomCursor';
import Particles from './components/Particles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import ThreatLab from './components/ThreatLab';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3800);
    return () => clearTimeout(t);
  }, []);

  return (
    <PortfolioProvider>
      <div style={{ position: 'relative', minHeight: '100vh', background: '#030014' }}>
        {loading && <LoadingScreen />}
        <MatrixRain />
        <CustomCursor />
        <Particles />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <ThreatLab />
          <Contact />
          <Footer />
          <AdminPanel />
        </div>
      </div>
    </PortfolioProvider>
  );
}

export default App;
