export default function Hero({ trainer }) {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true">
        <img src="/assets/images/hero.png" alt="" className="hero-bg-img" />
        <div className="hero-bg-gradient" />
        <div className="hero-bg-radial" />
      </div>

      <div className="hero-content">
        <div className="hero-badge" aria-label="Estado: Personal Trainer Certificado">
          <span className="hero-badge-dot" />
          {trainer.tag}
        </div>

        <h1 className="hero-title" id="hero-heading">
          Entrená con<br />
          <span className="hero-title-gradient">{trainer.nombre}</span>
          <br />
          Transforma tu vida
        </h1>

        <p className="hero-subtitle">{trainer.descripcion}</p>

        <div className="hero-actions">
          <a href="#planes" className="btn-primary">Ver planes 💪</a>
          <a href="#sobre-mi" className="btn-secondary">Conocerme mejor</a>
        </div>

        <div className="hero-stats" role="list" aria-label="Estadísticas">
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
