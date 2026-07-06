import { useEffect, useState } from 'react';
import { trainer, semanas } from './data';
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

const allEjercicios = semanas.flatMap((semana) => semana.ejercicios);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalEjercicio, setModalEjercicio] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [activeSection, setActiveSection] = useState('inicio');
  const [toastMessage, setToastMessage] = useState('');

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

  const openModal = (id) => {
    const ejercicio = allEjercicios.find((item) => item.id === id);
    setModalEjercicio(ejercicio || null);
  };

  const closeModal = () => setModalEjercicio(null);

  const toggleWeek = (weekId) => {
    setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }));
  };

  const handleFormSubmit = () => {
    setToastMessage('✅ Mensaje enviado. Te contactaremos pronto!');
  };

  return (
    <div className="app-shell">
      <ScrollProgress />
      <Navbar
        activeSection={activeSection}
        isSidebarOpen={sidebarOpen}
        onOpenSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <Sidebar
        open={sidebarOpen}
        semanas={semanas}
        activeSection={activeSection}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <Hero trainer={trainer} />
        <About trainer={trainer} />
        <Plans
          semanas={semanas}
          expandedWeeks={expandedWeeks}
          onToggleWeek={toggleWeek}
          onOpenModal={openModal}
        />
        <Contact onSubmit={handleFormSubmit} />
        <Footer />
      </main>

      <Modal ejercicio={modalEjercicio} onClose={closeModal} />
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
