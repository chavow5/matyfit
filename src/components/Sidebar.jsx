export default function Sidebar({ open, semanas, activeSection, onClose, t, language, onLanguageChange, isLoggedIn, onLoginClick, onDashboardClick }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} role="complementary" aria-label="Navegación de planes">
      <p className="sidebar-title">{t.sidebar_nav}</p>
      <nav className="sidebar-nav" role="list" aria-label="Semanas de entrenamiento">
        {semanas.map((semana) => (
          <a
            key={semana.id}
            href={`#semana-${semana.id}`}
            className={`sidebar-link ${activeSection === `semana-${semana.id}` ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="sidebar-link-icon">💪</span>
            <span>{t.sidebar_week} {semana.id}</span>
            <span className="sidebar-link-badge">{semana.ejercicios.length}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <p className="sidebar-title">{t.sidebar_sections}</p>
      <nav className="sidebar-nav" role="list">
        <a href="#inicio" className="sidebar-link" onClick={onClose}>
          <span className="sidebar-link-icon">🏠</span> {t.nav_inicio}
        </a>
        <a href="#sobre-mi" className="sidebar-link" onClick={onClose}>
          <span className="sidebar-link-icon">👤</span> {t.nav_sobre}
        </a>
        <a href="#contacto" className="sidebar-link" onClick={onClose}>
          <span className="sidebar-link-icon">✉️</span> {t.nav_contacto}
        </a>
      </nav>
      {open && <button className="sidebar-close" type="button" onClick={onClose}>Cerrar</button>}
      <div className="sidebar-controls">
        <div className="lang-switcher" role="group" aria-label={t.lang_label}>
          <button
            type="button"
            className={`lang-btn ${language === 'es' ? 'active' : ''}`}
            onClick={() => onLanguageChange('es')}
            aria-pressed={language === 'es'}
          >
            ES
          </button>
          <button
            type="button"
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => onLanguageChange('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>

        {isLoggedIn ? (
          <button
            type="button"
            className="sidebar-login-btn sidebar-dashboard-btn"
            onClick={() => { onDashboardClick(); onClose(); }}
            aria-label="Ir al Dashboard"
          >
            📊 {t.nav_dashboard || 'Mi Panel'}
          </button>
        ) : (
          <button
            type="button"
            className="sidebar-login-btn"
            onClick={() => { onLoginClick(); onClose(); }}
            aria-label="Iniciar sesión"
          >
            🔐 {t.nav_login || 'Iniciar Sesión'}
          </button>
        )}
      </div>
    </aside>
  );
}
