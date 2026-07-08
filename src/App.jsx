import { useEffect, useState } from 'react';
import { contentByLanguage, translations } from './data';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Plans from './components/Plans';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Toast from './components/Toast';
import ScrollProgress from './components/ScrollProgress';

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'es';
  return window.localStorage.getItem('lang') || 'es';
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalEjercicio, setModalEjercicio] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [activeSection, setActiveSection] = useState('inicio');
  const [toastMessage, setToastMessage] = useState('');
  const [language, setLanguage] = useState(getInitialLanguage);

  const pageData = contentByLanguage[language];
  const t = translations[language];
  const allEjercicios = pageData.semanas.flatMap((semana) => semana.ejercicios);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let current = 'inicio';
      const sections = Array.from(document.querySelectorAll('section[id], .hero'));

      sections.forEach((section) => {
        const { id, offsetTop } = section;
        if (id && offsetTop <= scrollPosition) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('section[id], .hero'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-80px 0px -20% 0px' }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(''), 3500);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    window.localStorage.setItem('lang', language);
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-language', language);
  }, [language]);

  const openModal = (id) => {
    const ejercicio = allEjercicios.find((item) => item.id === id);
    setModalEjercicio(ejercicio || null);
  };

  const closeModal = () => setModalEjercicio(null);

  const toggleWeek = (weekId) => {
    setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }));
  };

  const handleFormSubmit = () => {
    setToastMessage(t.toast_success);
  };

  return (
    <div className="app-shell">
      <ScrollProgress />
      <Navbar
        activeSection={activeSection}
        isSidebarOpen={sidebarOpen}
        onOpenSidebar={() => setSidebarOpen((prev) => !prev)}
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />

      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <Sidebar
        open={sidebarOpen}
        semanas={pageData.semanas}
        activeSection={activeSection}
        onClose={() => setSidebarOpen(false)}
        t={t}
      />

      <main className="main-content">
        <Hero trainer={pageData.trainer} t={t} />
        <About trainer={pageData.trainer} t={t} />
        <Plans
          semanas={pageData.semanas}
          expandedWeeks={expandedWeeks}
          onToggleWeek={toggleWeek}
          onOpenModal={openModal}
          t={t}
        />
        <Contact onSubmit={handleFormSubmit} t={t} />
        <Footer t={t} />
      </main>

      <Modal ejercicio={modalEjercicio} onClose={closeModal} t={t} />
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
