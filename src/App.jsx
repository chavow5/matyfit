import { useEffect, useState } from 'react';

// Static exercises shown on landing page (must match Plans.jsx FEATURED_EXERCISES)
const FEATURED_EXERCISES = [
  {
    id: 1,
    nombre: 'Sentadilla con Barra',
    descripcion: 'El rey de los ejercicios. Activa cuádriceps, glúteos, isquiotibiales y core. Fundamental para construir fuerza de base.',
    imagen: '/assets/images/squat.png',
    duracion: '45 min',
    dificultad: 'Intermedio',
    series: '4',
    repeticiones: '12',
    descanso: '60 seg',
    musculos: ['Cuádriceps', 'Glúteos', 'Core'],
  },
  {
    id: 2,
    nombre: 'Peso Muerto',
    descripcion: 'Ejercicio compuesto que recluta la mayor cantidad de músculos del cuerpo. Fundamental para desarrollar fuerza posterior.',
    imagen: '/assets/images/deadlift.png',
    duracion: '50 min',
    dificultad: 'Avanzado',
    series: '3',
    repeticiones: '8',
    descanso: '90 seg',
    musculos: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
  },
  {
    id: 3,
    nombre: 'Press de Banca',
    descripcion: 'Ejercicio clásico para el desarrollo del pectoral, deltoides anterior y tríceps. Trabaja potencia en empuje horizontal.',
    imagen: '/assets/images/bench.png',
    duracion: '40 min',
    dificultad: 'Intermedio',
    series: '4',
    repeticiones: '10',
    descanso: '75 seg',
    musculos: ['Pectoral', 'Deltoides', 'Tríceps'],
  },
];
import { supabase } from './lib/supabaseClient';
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
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'es';
  return window.localStorage.getItem('lang') || 'es';
}

function App() {
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [modalEjercicio, setModalEjercicio] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [activeSection, setActiveSection] = useState('inicio');
  const [toastMessage, setToastMessage]   = useState('');
  const [language, setLanguage]           = useState(getInitialLanguage);

  // Auth state
  const [session, setSession]   = useState(undefined); // undefined = loading
  const [view, setView]         = useState('landing'); // 'landing' | 'login' | 'dashboard'

  const pageData    = contentByLanguage[language];
  const t           = translations[language];

  // ── Supabase auth listener ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (!s) setView('landing');
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Handle Login Success ──
  const handleLoginSuccess = (newSession) => {
    setSession(newSession);
    setView('dashboard');
  };

  // ── Handle Logout ──
  const handleLogout = () => {
    setSession(null);
    setView('landing');
  };

  // ── Scroll detection ──
  useEffect(() => {
    if (view !== 'landing') return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let current = 'inicio';
      const sections = Array.from(document.querySelectorAll('section[id], .hero'));
      sections.forEach((section) => {
        const { id, offsetTop } = section;
        if (id && offsetTop <= scrollPosition) current = id;
      });
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  // ── Intersection observer for scroll reveal ──
  useEffect(() => {
    if (view !== 'landing') return;
    const targets = Array.from(document.querySelectorAll('section[id], .hero'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '-80px 0px -20% 0px' }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(''), 3500);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  useEffect(() => {
    window.localStorage.setItem('lang', language);
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-language', language);
  }, [language]);

  const openModal = (id) => {
    const ejercicio = FEATURED_EXERCISES.find((item) => item.id === id);
    setModalEjercicio(ejercicio || null);
  };

  const closeModal   = () => setModalEjercicio(null);
  const toggleWeek   = (weekId) =>
    setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }));
  const handleFormSubmit = (formData) => {
    const phoneNumber = '+14072323743';
    const message = [
      'Hola, quiero consultar sobre entrenamiento.',
      `Nombre: ${formData?.nombre || 'No proporcionado'}`,
      `Email: ${formData?.email || 'No proporcionado'}`,
      `Objetivo: ${formData?.objetivo || 'No proporcionado'}`,
      `Mensaje: ${formData?.mensaje || 'No proporcionado'}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setToastMessage(t.toast_success);
  };

  // ── Show login page ──
  if (view === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} onBack={() => setView('landing')} />;
  }

  // ── Show dashboard (only if authenticated) ──
  if (view === 'dashboard' && session) {
    return <Dashboard user={session.user} onLogout={handleLogout} />;
  }

  // ── Landing Page ──
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
        onLoginClick={() => setView('login')}
        isLoggedIn={!!session}
        onDashboardClick={() => setView('dashboard')}
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
