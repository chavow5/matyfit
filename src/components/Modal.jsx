export default function Modal({ ejercicio, onClose }) {
  if (!ejercicio) return null;

  return (
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal" role="document" onClick={(event) => event.stopPropagation()}>
        <img src={ejercicio.imagen} alt={ejercicio.nombre} className="modal-img" />
        <div className="modal-body">
          <div className="modal-header">
            <h3 className="modal-title" id="modal-title">{ejercicio.nombre}</h3>
            <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar modal">
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
            <div className="modal-set-chip"><strong>{ejercicio.series}</strong> Series</div>
            <div className="modal-set-chip"><strong>{ejercicio.repeticiones}</strong> Reps</div>
            <div className="modal-set-chip"><strong>{ejercicio.descanso}</strong> Descanso</div>
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
    Cardio: 'badge-intermedio'
  };
  return map[dificultad] || 'badge-intermedio';
}
