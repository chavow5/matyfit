export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-brand">
        <img
          src="/assets/images/logo.png"
          alt="Logo Matifit"
          style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }}
        />
        <span>
          MATI<span className="footer-brand-cyan">FIT</span>
        </span>
      </div>
      <p className="footer-copy">© 2026 Matifit. Todos los derechos reservados.</p>
      <p className="footer-copy">Hecho con 💪 por Matías García</p>
    </footer>
  );
}
