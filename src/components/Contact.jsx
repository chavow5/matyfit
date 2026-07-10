export default function Contact({ onSubmit, t }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      nombre: formData.get('nombre')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      objetivo: formData.get('objetivo')?.toString().trim() || '',
      mensaje: formData.get('mensaje')?.toString().trim() || '',
    };

    onSubmit(payload);
    event.currentTarget.reset();
  };

  return (
    <section id="contacto" aria-labelledby="contacto-heading">
      <div className="section-header">
        <span className="section-tag">{t.contact_tag}</span>
        <h2 className="section-title" id="contacto-heading">{t.contact_title}</h2>
        <p className="section-subtitle">{t.contact_subtitle}</p>
      </div>

      <div className="contacto-inner">
        <div className="contacto-info">
          <h3>{t.contact_info_title}</h3>
          <p>{t.contact_info_desc}</p>

          <div className="social-links" role="list">
            <a
              href="https://www.instagram.com/brizuelamatias_/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Matías Brizuela"
            >
              <span className="social-icon">📸</span>
              <span>@brizuelamatias_ en Instagram</span>
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
              <span>{t.contact_wa}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--clr-text-dim)', fontSize: '0.8rem' }}>→</span>
            </a>
            <a href="mailto:matifit@gmail.com" className="social-link" aria-label="Email de Matifit">
              <span className="social-icon">✉️</span>
              <span>matifit@gmail.com</span>
              <span style={{ marginLeft: 'auto', color: 'var(--clr-text-dim)', fontSize: '0.8rem' }}>→</span>
            </a>
          </div>
        </div>

        <div>
          <form className="contacto-form" id="contact-form" onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">
            <div className="form-group">
              <label htmlFor="form-nombre">{t.form_name}</label>
              <input type="text" id="form-nombre" name="nombre" placeholder={t.form_placeholder_name} required autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="form-email">{t.form_email}</label>
              <input type="email" id="form-email" name="email" placeholder={t.form_placeholder_email} required autoComplete="email" />
            </div>
            <div className="form-group">
              <label htmlFor="form-objetivo">{t.form_goal}</label>
              <input type="text" id="form-objetivo" name="objetivo" placeholder={t.form_placeholder_goal} />
            </div>
            <div className="form-group">
              <label htmlFor="form-mensaje">{t.form_message}</label>
              <textarea id="form-mensaje" name="mensaje" rows="4" placeholder={t.form_placeholder_message} />
            </div>
            <button type="submit" className="btn-submit">{t.form_submit}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
