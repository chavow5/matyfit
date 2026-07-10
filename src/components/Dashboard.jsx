import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function getDifficultyClass(dificultad) {
  const map = {
    Facil: 'badge-facil',
    Intermedio: 'badge-intermedio',
    Avanzado: 'badge-avanzado',
    Cardio: 'badge-intermedio',
  };
  return map[dificultad] || 'badge-intermedio';
}

const EMPTY_EXERCISE = {
  semana_id: '',
  nombre: '',
  descripcion: '',
  imagen: '/assets/images/squat.png',
  duracion: '',
  dificultad: 'Intermedio',
  series: '',
  repeticiones: '',
  descanso: '',
  musculos: '',
  es_destacado: false,
};

export default function Dashboard({ user, onLogout }) {
  const [semanas, setSemanas]         = useState([]);
  const [ejercicios, setEjercicios]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeWeek, setActiveWeek]   = useState(null);

  // Modal state
  const [showModal, setShowModal]     = useState(false);
  const [editMode, setEditMode]       = useState(false);
  const [form, setForm]               = useState(EMPTY_EXERCISE);
  const [saving, setSaving]           = useState(false);
  const [modalError, setModalError]   = useState('');

  // Delete confirm
  const [deleteId, setDeleteId]       = useState(null);
  const [deleting, setDeleting]       = useState(false);

  // Toast
  const [toast, setToast]             = useState('');

  const isAdmin = user?.user_metadata?.role === 'admin';
  const currentDay = new Date().getDate();
  const currentWeekOrden = Math.min(4, Math.ceil(currentDay / 7));

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  async function fetchAll() {
    setLoading(true);
    const [{ data: semanasData }, { data: ejerciciosData }] = await Promise.all([
      supabase.from('semanas').select('*').order('orden'),
      supabase.from('ejercicios').select('*').order('id'),
    ]);
    setSemanas(semanasData || []);
    setEjercicios(ejerciciosData || []);
    if (semanasData?.length) {
      const clientActiveWeek = semanasData.find(s => s.orden === currentWeekOrden) || semanasData[0];
      setActiveWeek(isAdmin ? semanasData[0].id : clientActiveWeek.id);
    }
    setLoading(false);
  }

  const ejerciciosDeSemana = (semanaId) =>
    ejercicios.filter((ej) => ej.semana_id === semanaId);

  const getWeekStartDay = (orden) => {
    if (orden === 1) return 1;
    if (orden === 2) return 8;
    if (orden === 3) return 15;
    return 22;
  };

  // ── Open modal ──
  const openCreate = () => {
    if (!isAdmin) return;
    setForm({ ...EMPTY_EXERCISE, semana_id: activeWeek || '' });
    setEditMode(false);
    setModalError('');
    setShowModal(true);
  };

  const openEdit = (ej) => {
    if (!isAdmin) return;
    setForm({
      ...ej,
      musculos: Array.isArray(ej.musculos) ? ej.musculos.join(', ') : ej.musculos || '',
    });
    setEditMode(true);
    setModalError('');
    setShowModal(true);
  };

  // ── Save ──
  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setModalError('');
    setSaving(true);

    const payload = {
      semana_id:    Number(form.semana_id),
      nombre:       form.nombre.trim(),
      descripcion:  form.descripcion.trim(),
      imagen:       form.imagen.trim() || '/assets/images/squat.png',
      duracion:     form.duracion.trim(),
      dificultad:   form.dificultad,
      series:       form.series.trim(),
      repeticiones: form.repeticiones.trim(),
      descanso:     form.descanso.trim(),
      musculos:     form.musculos.split(',').map((m) => m.trim()).filter(Boolean),
      es_destacado: form.es_destacado,
    };

    if (!payload.nombre || !payload.semana_id) {
      setModalError('El nombre y la semana son obligatorios.');
      setSaving(false);
      return;
    }

    let error;
    if (editMode) {
      ({ error } = await supabase.from('ejercicios').update(payload).eq('id', form.id));
    } else {
      ({ error } = await supabase.from('ejercicios').insert(payload));
    }

    setSaving(false);

    if (error) {
      setModalError('Error al guardar. Intentá de nuevo.');
      return;
    }

    setShowModal(false);
    setToast(editMode ? '✅ Ejercicio actualizado' : '✅ Ejercicio creado');
    fetchAll();
  };

  // ── Delete ──
  const confirmDelete = async () => {
    if (!isAdmin) return;
    setDeleting(true);
    const { error } = await supabase.from('ejercicios').delete().eq('id', deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (!error) {
      setToast('🗑️ Ejercicio eliminado');
      fetchAll();
    }
  };

  // ── Logout ──
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  // ── Render ──
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dash-spinner" />
        <p>Cargando datos...</p>
      </div>
    );
  }

  const selectedWeekObj = semanas.find((s) => s.id === activeWeek);
  const isWeekLocked = !isAdmin && selectedWeekObj && selectedWeekObj.orden !== currentWeekOrden;

  return (
    <div className="dashboard">
      {/* ── Sidebar ── */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-brand">
          <img src="/assets/images/logo.png" alt="Logo" className="dash-logo" />
          <span>MATIFIT</span>
        </div>

        <nav className="dash-sidebar-nav">
          <p className="dash-sidebar-label">SEMANAS</p>
          {semanas.map((sem) => {
            const isSemLocked = !isAdmin && sem.orden !== currentWeekOrden;
            return (
              <button
                key={sem.id}
                type="button"
                className={`dash-sidebar-item ${activeWeek === sem.id ? 'active' : ''} ${isSemLocked ? 'locked' : ''}`}
                onClick={() => setActiveWeek(sem.id)}
                aria-disabled={isSemLocked}
              >
                <span className="dash-sem-num">
                  {isSemLocked ? '🔒' : sem.orden}
                </span>
                <span className="dash-sem-name">
                  {sem.titulo.replace(/Semana \d+ — /, '')}
                </span>
                <span className="dash-sem-badge">
                  {isSemLocked ? 'Bloqueada' : ejerciciosDeSemana(sem.id).length}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="dash-sidebar-footer">
          <div className="dash-user-info">
            <span className="dash-user-avatar">👤</span>
            <span className="dash-user-email">{user?.email}</span>
          </div>
          <button type="button" className="dash-logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
          <a href="/" className="dash-landing-link">← Ver Landing Page</a>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="dash-main">
        {/* Header */}
        <header className="dash-header">
          <div>
            <h1 className="dash-page-title">
              {isAdmin ? 'Panel de Control (Admin)' : 'Mis Entrenamientos'}
            </h1>
            <p className="dash-page-sub">
              {selectedWeekObj ? selectedWeekObj.titulo : 'Seleccioná una semana'}
            </p>
          </div>
          {isAdmin && (
            <button
              type="button"
              className="dash-add-btn"
              onClick={openCreate}
              id="dashboard-add-exercise-btn"
            >
              + Nuevo Ejercicio
            </button>
          )}
        </header>

        {/* Stats bar (Admin only) */}
        {isAdmin && (
          <div className="dash-stats-bar">
            <div className="dash-stat">
              <span className="dash-stat-num">{ejercicios.length}</span>
              <span className="dash-stat-label">Total ejercicios</span>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-num">{semanas.length}</span>
              <span className="dash-stat-label">Semanas</span>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-num">
                {ejercicios.filter((e) => e.es_destacado).length}
              </span>
              <span className="dash-stat-label">En Landing Page</span>
            </div>
          </div>
        )}

        {/* Locked week view for client */}
        {isWeekLocked ? (
          <div className="dash-empty dash-locked-week">
            <span>🔒</span>
            <h2>Semana Bloqueada</h2>
            <p>
              Esta semana estará disponible de forma automática a partir del día{' '}
              <strong>{getWeekStartDay(selectedWeekObj.orden)} del mes</strong>.
            </p>
            <p className="dash-locked-tip">
              Actualmente estás en la semana {currentWeekOrden} del mes.
            </p>
          </div>
        ) : (
          /* Exercise grid */
          <div className="dash-exercises-grid">
            {ejerciciosDeSemana(activeWeek).length === 0 ? (
              <div className="dash-empty">
                <span>🏋️</span>
                <p>No hay ejercicios en esta semana todavía.</p>
                {isAdmin && (
                  <button type="button" className="dash-add-btn-sm" onClick={openCreate}>
                    + Agregar ejercicio
                  </button>
                )}
              </div>
            ) : (
              ejerciciosDeSemana(activeWeek).map((ej) => (
                <div key={ej.id} className="dash-exercise-card">
                  {isAdmin && ej.es_destacado && (
                    <span className="dash-featured-badge">⭐ Landing</span>
                  )}
                  <div className="dash-ex-img-wrap">
                    <img
                      src={ej.imagen}
                      alt={ej.nombre}
                      className="dash-ex-img"
                      onError={(e) => {
                        e.target.src = '/assets/images/squat.png';
                      }}
                    />
                    <span className={`ejercicio-badge ${getDifficultyClass(ej.dificultad)}`}>
                      {ej.dificultad}
                    </span>
                  </div>
                  <div className="dash-ex-body">
                    <h3 className="dash-ex-name">{ej.nombre}</h3>
                    <p className="dash-ex-desc">{ej.descripcion?.slice(0, 80)}...</p>
                    <div className="dash-ex-chips">
                      <span className="set-chip">{ej.series} series</span>
                      <span className="set-chip">{ej.repeticiones} reps</span>
                      <span className="set-chip">⏱ {ej.duracion}</span>
                    </div>
                    {Array.isArray(ej.musculos) && ej.musculos.length > 0 && (
                      <div className="dash-ex-muscles">
                        {ej.musculos.map((m) => (
                          <span key={m} className="dash-muscle-tag">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                    {isAdmin && (
                      <div className="dash-ex-actions">
                        <button
                          type="button"
                          className="dash-edit-btn"
                          onClick={() => openEdit(ej)}
                          aria-label={`Editar ${ej.nombre}`}
                        >
                          ✏ Editar
                        </button>
                        <button
                          type="button"
                          className="dash-delete-btn"
                          onClick={() => setDeleteId(ej.id)}
                          aria-label={`Eliminar ${ej.nombre}`}
                        >
                          🗑 Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* ── Modal: Create / Edit ── */}
      {showModal && (
        <div
          className="dash-modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="dash-modal">
            <div className="dash-modal-header">
              <h2 id="modal-title">
                {editMode ? '✏ Editar Ejercicio' : '+ Nuevo Ejercicio'}
              </h2>
              <button
                type="button"
                className="dash-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <form className="dash-modal-form" onSubmit={handleSave}>
              <div className="dash-form-row">
                <div className="dash-form-field">
                  <label htmlFor="f-semana">Semana *</label>
                  <select
                    id="f-semana"
                    value={form.semana_id}
                    onChange={(e) => setForm((p) => ({ ...p, semana_id: e.target.value }))}
                    required
                  >
                    <option value="">Seleccionar semana...</option>
                    {semanas.map((s) => (
                      <option key={s.id} value={s.id}>{s.titulo}</option>
                    ))}
                  </select>
                </div>
                <div className="dash-form-field">
                  <label htmlFor="f-dificultad">Dificultad</label>
                  <select
                    id="f-dificultad"
                    value={form.dificultad}
                    onChange={(e) => setForm((p) => ({ ...p, dificultad: e.target.value }))}
                  >
                    <option value="Facil">Fácil</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Cardio">Cardio</option>
                  </select>
                </div>
              </div>

              <div className="dash-form-field">
                <label htmlFor="f-nombre">Nombre del ejercicio *</label>
                <input
                  id="f-nombre"
                  type="text"
                  placeholder="ej: Sentadilla con Barra"
                  value={form.nombre}
                  onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                  required
                />
              </div>

              <div className="dash-form-field">
                <label htmlFor="f-desc">Descripción</label>
                <textarea
                  id="f-desc"
                  rows={3}
                  placeholder="Descripción del ejercicio..."
                  value={form.descripcion}
                  onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
                />
              </div>

              <div className="dash-form-row">
                <div className="dash-form-field">
                  <label htmlFor="f-series">Series</label>
                  <input
                    id="f-series"
                    type="text"
                    placeholder="ej: 4"
                    value={form.series}
                    onChange={(e) => setForm((p) => ({ ...p, series: e.target.value }))}
                  />
                </div>
                <div className="dash-form-field">
                  <label htmlFor="f-reps">Repeticiones</label>
                  <input
                    id="f-reps"
                    type="text"
                    placeholder="ej: 12"
                    value={form.repeticiones}
                    onChange={(e) => setForm((p) => ({ ...p, repeticiones: e.target.value }))}
                  />
                </div>
                <div className="dash-form-field">
                  <label htmlFor="f-descanso">Descanso</label>
                  <input
                    id="f-descanso"
                    type="text"
                    placeholder="ej: 60 seg"
                    value={form.descanso}
                    onChange={(e) => setForm((p) => ({ ...p, descanso: e.target.value }))}
                  />
                </div>
                <div className="dash-form-field">
                  <label htmlFor="f-duracion">Duración</label>
                  <input
                    id="f-duracion"
                    type="text"
                    placeholder="ej: 45 min"
                    value={form.duracion}
                    onChange={(e) => setForm((p) => ({ ...p, duracion: e.target.value }))}
                  />
                </div>
              </div>

              <div className="dash-form-field">
                <label htmlFor="f-musculos">Músculos trabajados (separados por coma)</label>
                <input
                  id="f-musculos"
                  type="text"
                  placeholder="ej: Cuádriceps, Glúteos, Core"
                  value={form.musculos}
                  onChange={(e) => setForm((p) => ({ ...p, musculos: e.target.value }))}
                />
              </div>

              <div className="dash-form-field">
                <label htmlFor="f-imagen">URL de imagen</label>
                <input
                  id="f-imagen"
                  type="text"
                  placeholder="/assets/images/squat.png"
                  value={form.imagen}
                  onChange={(e) => setForm((p) => ({ ...p, imagen: e.target.value }))}
                />
              </div>

              <div className="dash-form-checkbox">
                <input
                  id="f-destacado"
                  type="checkbox"
                  checked={form.es_destacado}
                  onChange={(e) => setForm((p) => ({ ...p, es_destacado: e.target.checked }))}
                />
                <label htmlFor="f-destacado">
                  ⭐ Mostrar en la Landing Page (máx. 3 recomendados)
                </label>
              </div>

              {modalError && (
                <div className="dash-form-error" role="alert">
                  ⚠ {modalError}
                </div>
              )}

              <div className="dash-modal-footer">
                <button
                  type="button"
                  className="dash-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="dash-btn-save"
                  disabled={saving}
                  id="dashboard-save-exercise-btn"
                >
                  {saving ? <span className="dash-spinner-sm" /> : editMode ? 'Guardar cambios' : 'Crear ejercicio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Confirm Delete ── */}
      {deleteId && (
        <div
          className="dash-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="dash-modal dash-modal-sm">
            <h2 id="confirm-title" className="dash-confirm-title">¿Eliminar ejercicio?</h2>
            <p className="dash-confirm-text">
              Esta acción no se puede deshacer. ¿Estás seguro?
            </p>
            <div className="dash-modal-footer">
              <button
                type="button"
                className="dash-btn-cancel"
                onClick={() => setDeleteId(null)}
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="dash-btn-danger"
                onClick={confirmDelete}
                disabled={deleting}
                id="dashboard-confirm-delete-btn"
              >
                {deleting ? <span className="dash-spinner-sm" /> : '🗑 Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="dash-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
