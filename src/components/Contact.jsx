export default function Contact({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
    event.target.reset();
  };

  return (
    <section id="contacto" aria-labelledby="contacto-heading">
      <div className="section-header">
        <span className="section-tag">Hablemos</span>
        <h2 className="section-title" id="contacto-heading">¿Listo para empezar?</h2>
        <p className="section-subtitle">Contactame y diseñamos tu plan personalizado</p>
      </div>

      <div className="contacto-inner">
        <div className="contacto-info">
          <h3>Encontrame en</h3>
          <p>Seguime en redes sociales para ver contenido diario de entrenamiento, nutrición y motivación.</p>

          <div className="social-links" role="list">
            <a
              href="https://instagram.com/matifit"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Matifit"
            >
              <span className="social-icon">📸</span>
              <span>@matifit en Instagram</span>
              <span style={{ marginLeft: 'auto', color: 'var(--clr-text-dim)', fontSize: '0.8rem' }}>→</span>
            </a>
            <a
              href="https://wa.me/5491100000000"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Matifit"
            >
              <span className="social-icon">💬</span>
              <span>WhatsApp directo</span>
              <span style={{ marginLeft: 'auto', color: 'var(--clr-text-dim)', fontSize: '0.8rem' }}>→</span>
            </a>
            <a
              href="mailto:matifit@gmail.com"
              className="social-link"
              aria-label="Email de Matifit"
            >
              <span className="social-icon">✉️</span>
              <span>matifit@gmail.com</span>
              <span style={{ marginLeft: 'auto', color: 'var(--clr-text-dim)', fontSize: '0.8rem' }}>→</span>
            </a>
          </div>
        </div>

        <div>
          <form className="contacto-form" id="contact-form" onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">
            <div className="form-group">
              <label htmlFor="form-nombre">Nombre</label>
              <input type="text" id="form-nombre" name="nombre" placeholder="Tu nombre completo" required autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="form-email">Email</label>
              <input type="email" id="form-email" name="email" placeholder="tu@email.com" required autoComplete="email" />
            </div>
            <div className="form-group">
              <label htmlFor="form-objetivo">Objetivo</label>
              <input type="text" id="form-objetivo" name="objetivo" placeholder="¿Qué querés lograr?" />
            </div>
            <div className="form-group">
              <label htmlFor="form-mensaje">Mensaje</label>
              <textarea id="form-mensaje" name="mensaje" rows="4" placeholder="Contame más sobre vos y tus metas..." />
            </div>
            <button type="submit" className="btn-submit">Enviar mensaje 🚀</button>
          </form>
        </div>
      </div>
    </section>
  );
}
