// 3 ejercicios estáticos que se muestran en la landing page
const FEATURED_EXERCISES = [
  {
    id: 1,
    nombre: 'Sentadilla con Barra',
    descripcion: 'El rey de los ejercicios. Activa cuádriceps, glúteos, isquiotibiales y core. Fundamental para construir fuerza de base.',
    imagen: '/assets/images/squat.png',
    duracion: '45 min',
    dificultad: 'Intermedio',
    series: '4',
    repeticiones: '12',
    descanso: '60 seg',
    musculos: ['Cuádriceps', 'Glúteos', 'Core'],
  },
  {
    id: 2,
    nombre: 'Peso Muerto',
    descripcion: 'Ejercicio compuesto que recluta la mayor cantidad de músculos del cuerpo. Fundamental para desarrollar fuerza posterior.',
    imagen: '/assets/images/deadlift.png',
    duracion: '50 min',
    dificultad: 'Avanzado',
    series: '3',
    repeticiones: '8',
    descanso: '90 seg',
    musculos: ['Isquiotibiales', 'Glúteos', 'Espalda baja'],
  },
  {
    id: 3,
    nombre: 'Press de Banca',
    descripcion: 'Ejercicio clásico para el desarrollo del pectoral, deltoides anterior y tríceps. Trabaja potencia en empuje horizontal.',
    imagen: '/assets/images/bench.png',
    duracion: '40 min',
    dificultad: 'Intermedio',
    series: '4',
    repeticiones: '10',
    descanso: '75 seg',
    musculos: ['Pectoral', 'Deltoides', 'Tríceps'],
  },
];

function getDifficultyClass(dificultad) {
  const map = {
    Facil: 'badge-facil',
    Intermedio: 'badge-intermedio',
    Avanzado: 'badge-avanzado',
    Cardio: 'badge-intermedio',
    Easy: 'badge-facil',
    Intermediate: 'badge-intermedio',
    Advanced: 'badge-avanzado',
  };
  return map[dificultad] || 'badge-intermedio';
}

function FeaturedCard({ ejercicio, onOpenModal, t }) {
  return (
    <div
      className="ejercicio-card featured-card"
      onClick={() => onOpenModal(ejercicio.id)}
      role="button"
      tabIndex={0}
      aria-label={`${t.view_details} ${ejercicio.nombre}`}
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
        <p className="ejercicio-desc">{ejercicio.descripcion.slice(0, 90)}...</p>
        <div className="ejercicio-sets">
          <span className="set-chip">{ejercicio.series} {t.series}</span>
          <span className="set-chip">{ejercicio.repeticiones} {t.reps}</span>
          <span className="set-chip">⏸ {ejercicio.descanso} {t.rest}</span>
        </div>
        {ejercicio.musculos && (
          <div className="featured-muscles">
            {ejercicio.musculos.map((m) => (
              <span key={m} className="muscle-pill">{m}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Plans({ onOpenModal, t }) {
  return (
    <section id="planes" aria-labelledby="planes-heading">
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <span className="section-tag">{t.plans_tag}</span>
        <h2 className="section-title" id="planes-heading">{t.plans_title}</h2>
        <p className="section-subtitle" style={{ margin: 0 }}>
          {t.plans_subtitle}
        </p>
      </div>

      {/* Featured exercises preview */}
      <div className="featured-exercises-wrap">
        <div className="featured-label-row">
          <span className="featured-label">⭐ Ejercicios Destacados</span>
          <span className="featured-hint">
            Iniciá sesión para acceder al plan completo de 4 semanas
          </span>
        </div>

        <div className="ejercicios-grid featured-grid" role="list" aria-label="Ejercicios destacados">
          {FEATURED_EXERCISES.map((ej) => (
            <FeaturedCard
              key={ej.id}
              ejercicio={ej}
              onOpenModal={onOpenModal}
              t={t}
            />
          ))}
        </div>

        {/* CTA to unlock full plans */}
        <div className="plans-unlock-banner">
          <div className="plans-unlock-content">
            <span className="plans-unlock-icon">🔐</span>
            <div>
              <h3 className="plans-unlock-title">Accedé al Plan Completo</h3>
              <p className="plans-unlock-text">
                4 semanas de entrenamiento · 20 ejercicios · Seguimiento personalizado
              </p>
            </div>
          </div>
          <a href="#contacto" className="btn-primary plans-unlock-btn">
            Contactarme →
          </a>
        </div>
      </div>
    </section>
  );
}
