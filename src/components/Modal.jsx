import MediaViewer from './MediaViewer';

export default function Modal({ ejercicio, onClose, t }) {
  if (!ejercicio) return null;

  return (
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal" role="document" onClick={(event) => event.stopPropagation()}>
        <MediaViewer url={ejercicio.imagen} alt={ejercicio.nombre} className="modal-img" controls={true} />
        <div className="modal-body">
          <div className="modal-header">
            <h3 className="modal-title" id="modal-title">{ejercicio.nombre}</h3>
            <button className="modal-close" type="button" onClick={onClose} aria-label={t.modal_close}>
              ✕
            </button>
          </div>
          <div className="modal-tags" id="modal-tags">
            <span className={`modal-tag ${getDifficultyClass(ejercicio.dificultad)}`}>{ejercicio.dificultad}</span>
            <span className="modal-tag">⏱ {ejercicio.duracion}</span>
            {ejercicio.musculos.map((musculo) => (
              <span className="modal-tag" key={musculo}>{musculo}</span>
            ))}
          </div>
          <p className="modal-desc">{ejercicio.descripcion}</p>
          <div className="modal-sets" id="modal-sets">
            <div className="modal-set-chip"><strong>{ejercicio.series}</strong> {t.modal_series}</div>
            <div className="modal-set-chip"><strong>{ejercicio.repeticiones}</strong> {t.modal_reps}</div>
            <div className="modal-set-chip"><strong>{ejercicio.descanso}</strong> {t.modal_rest}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDifficultyClass(dificultad) {
  const map = {
    Facil: 'badge-facil',
    Intermedio: 'badge-intermedio',
    Avanzado: 'badge-avanzado',
    Cardio: 'badge-intermedio',
    Easy: 'badge-facil',
    Intermediate: 'badge-intermedio',
    Advanced: 'badge-avanzado'
  };
  return map[dificultad] || 'badge-intermedio';
}
