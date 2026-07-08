export default function Navbar({ activeSection, isSidebarOpen, onOpenSidebar, language, onLanguageChange, t }) {
  const links = [
    { id: 'inicio', label: t.nav_inicio },
    { id: 'sobre-mi', label: t.nav_sobre },
    { id: 'planes', label: t.nav_planes },
    { id: 'contacto', label: t.nav_contacto }
  ];

  return (
    <nav className="navbar" aria-label={t.nav_aria_label}>
      <a href="#inicio" className="navbar-brand" aria-label="Matifit - Inicio">
        <img src="/assets/images/logo.png" alt="Logo Matifit" className="navbar-logo" />
        <span className="navbar-name">MATIFIT</span>
      </a>

      <ul className="navbar-nav" role="list">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              data-section={link.id}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-right-wrap">
        <div className="lang-switcher" role="group" aria-label={t.lang_label}>
          <button type="button" className={`lang-btn ${language === 'es' ? 'active' : ''}`} onClick={() => onLanguageChange('es')} aria-pressed={language === 'es'}>
            ES
          </button>
          <button type="button" className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => onLanguageChange('en')} aria-pressed={language === 'en'}>
            EN
          </button>
        </div>

        <a href="#contacto" className="navbar-cta">
          {t.nav_cta}
        </a>
      </div>

      <button
        className="hamburger"
        type="button"
        onClick={onOpenSidebar}
        aria-label={t.aria_open_menu}
        aria-expanded={isSidebarOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
