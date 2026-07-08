export default function Hero({ trainer, t }) {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true">
        <img src="/assets/images/hero.png" alt="" className="hero-bg-img" />
        <div className="hero-bg-gradient" />
      </div>

      <div className="hero-content">
        <div className="hero-badge" aria-label={t.hero_badge}>
          <span className="hero-badge-dot" />
          {t.hero_badge}
        </div>

        <h1 className="hero-title" id="hero-heading">
          {t.hero_title_line1}
          <br />
          <span className="hero-title-accent">{trainer.nombre}</span>
          <br />
          {t.hero_title_line2}
        </h1>

        <p className="hero-subtitle">{trainer.descripcion}</p>

        <div className="hero-actions">
          <a href="#planes" className="btn-primary">{t.hero_cta_primary}</a>
          <a href="#sobre-mi" className="btn-secondary">{t.hero_cta_secondary}</a>
        </div>

        <div className="hero-stats" role="list" aria-label={t.hero_stats_label}>
          {trainer.stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <div className="stat-number">{stat.numero}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
