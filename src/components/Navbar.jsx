export default function Navbar({ activeSection, isSidebarOpen, onOpenSidebar }) {
  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'planes', label: 'Planes' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <nav className="navbar" aria-label="Navegación principal">
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

      <a href="#contacto" className="navbar-cta">
        Comenzar ahora →
      </a>

      <button
        className="hamburger"
        type="button"
        onClick={onOpenSidebar}
        aria-label="Abrir menú de navegación"
        aria-expanded={isSidebarOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
