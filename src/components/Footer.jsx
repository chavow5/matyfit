export default function Footer({ t }) {
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
      <p className="footer-copy">{t.footer_copy}</p>
      <p className="footer-copy">
        {t.footer_by}{' '}
        <a
          href="https://www.instagram.com/davidramirez_651/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          @davidramirez_651
        </a>
      </p>
    </footer>
  );
}
