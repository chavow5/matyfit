export default function About({ trainer, t }) {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-heading">
      <div className="section-header">
        <span className="section-tag">{t.about_tag}</span>
        <h2 className="section-title" id="sobre-heading">{t.about_title}</h2>
        <p className="section-subtitle">{t.about_subtitle}</p>
      </div>

      <div className="about-grid">
        <div className="about-image-wrap">
          <img src="/assets/images/hero.png" alt="Matías García - Personal Trainer" className="about-image" />
          <div className="about-badge-float" aria-label="5 años de experiencia">
            <span className="about-badge-icon">🏆</span>
            <div className="about-badge-text">
              <strong>5+</strong>
              <span>{t.about_badge}</span>
            </div>
          </div>
        </div>

        <div className="about-text">
          <h3>{t.about_greeting}</h3>
          <p>{trainer.descripcion}</p>
          <p>{trainer.descripcion2}</p>
          <div className="about-features" role="list">
            {trainer.features.map((feature) => (
              <div className="feature-item" key={feature.titulo}>
                <span className="feature-icon">{feature.icon}</span>
                <div className="feature-text">
                  <strong>{feature.titulo}</strong>
                  <span>{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
