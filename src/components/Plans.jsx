function getDifficultyClass(dificultad) {
  const map = {
    Facil: 'badge-facil',
    Intermedio: 'badge-intermedio',
    Avanzado: 'badge-avanzado',
    Cardio: 'badge-intermedio'
  };
  return map[dificultad] || 'badge-intermedio';
}

function EjercicioCard({ ejercicio, isHidden, onOpenModal }) {
  return (
    <div
      className={`ejercicio-card ${isHidden ? 'hidden-card' : ''}`}
      onClick={() => onOpenModal(ejercicio.id)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${ejercicio.nombre}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpenModal(ejercicio.id);
        }
      }}
    >
      <div className="ejercicio-img-wrap">
        <img className="ejercicio-img" src={ejercicio.imagen} alt={ejercicio.nombre} loading="lazy" />
        <div className="ejercicio-overlay" />
        <span className={`ejercicio-badge ${getDifficultyClass(ejercicio.dificultad)}`}>
          {ejercicio.dificultad}
        </span>
        <span className="ejercicio-duration">⏱ {ejercicio.duracion}</span>
      </div>
      <div className="ejercicio-body">
        <h4 className="ejercicio-name">{ejercicio.nombre}</h4>
        <p className="ejercicio-desc">{ejercicio.descripcion.slice(0, 80)}...</p>
        <div className="ejercicio-sets">
          <span className="set-chip">{ejercicio.series} series</span>
          <span className="set-chip">{ejercicio.repeticiones} reps</span>
          <span className="set-chip">⏸ {ejercicio.descanso}</span>
        </div>
      </div>
    </div>
  );
}

export default function Plans({ semanas, expandedWeeks, onToggleWeek, onOpenModal }) {
  return (
    <section id="planes" aria-labelledby="planes-heading">
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <span className="section-tag">Contenido</span>
        <h2 className="section-title" id="planes-heading">Planes de Entrenamiento</h2>
        <p className="section-subtitle" style={{ margin: 0 }}>
          Programas diseñados para todos los niveles, organizados semana a semana.
        </p>
      </div>

      <div className="planes-container" role="list" aria-label="Planes de entrenamiento por semana">
        {semanas.map((semana) => {
          const isExpanded = expandedWeeks[semana.id];
          return (
            <section
              className="semana-section"
              id={`semana-${semana.id}`}
              data-index={semana.id}
              key={semana.id}
            >
              <div className="semana-header">
                <div className="semana-header-left">
                  <div className="semana-number">{semana.id}</div>
                  <div className="semana-info">
                    <h2 className="semana-title">
                      {semana.titulo}
                      <span className="semana-tag">{semana.tag}</span>
                    </h2>
                    <p className="semana-subtitle">{semana.subtitulo}</p>
                  </div>
                </div>
                {semana.ejercicios.length > 4 && (
                  <button
                    className={`btn-ver-todo ${isExpanded ? 'expanded' : ''}`}
                    type="button"
                    onClick={() => onToggleWeek(semana.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`grid-semana-${semana.id}`}
                  >
                    {isExpanded ? (
                      <>
                        Ocultar <span className="arrow" style={{ transform: 'rotate(180deg)' }}>▼</span>
                      </>
                    ) : (
                      <>
                        Ver todo <span className="arrow">▼</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="ejercicios-grid" id={`grid-semana-${semana.id}`}>
                {semana.ejercicios.map((ejercicio, index) => (
                  <EjercicioCard
                    key={ejercicio.id}
                    ejercicio={ejercicio}
                    isHidden={!isExpanded && index >= 4}
                    onOpenModal={onOpenModal}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
