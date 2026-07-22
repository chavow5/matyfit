import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';
import MediaViewer from './MediaViewer';
import Modal from './Modal';

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

  // Search & Filter state
  const [searchTerm, setSearchTerm]           = useState('');
  const [checklistFilter, setChecklistFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // Modal state
  const [showModal, setShowModal]             = useState(false);
  const [editMode, setEditMode]               = useState(false);
  const [form, setForm]                       = useState(EMPTY_EXERCISE);
  const [saving, setSaving]                   = useState(false);
  const [uploadingMedia, setUploadingMedia]   = useState(false);
  const [modalError, setModalError]           = useState('');

  // Exercise Detail Modal
  const [detailExercise, setDetailExercise]   = useState(null);

  // Delete confirm
  const [deleteId, setDeleteId]               = useState(null);
  const [deleting, setDeleting]               = useState(false);

  // Toast
  const [toast, setToast]                     = useState('');
  const [profileExpanded, setProfileExpanded] = useState(false);

  const [activeTab, setActiveTab]             = useState('ejercicios'); // 'ejercicios' | 'usuarios'
  const [usuarios, setUsuarios]               = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [showUserModal, setShowUserModal]     = useState(false);
  const [userForm, setUserForm]               = useState({ email: '', password: '', role: 'visitante' });
  const [userSaving, setUserSaving]           = useState(false);
  const [userModalError, setUserModalError]   = useState('');
  const [deleteUserId, setDeleteUserId]       = useState(null);
  const [deletingUser, setDeletingUser]       = useState(false);

  const [completedExercises, setCompletedExercises] = useState([]);
  const [dbRole, setDbRole]                         = useState(user?.user_metadata?.role || null);

  useEffect(() => {
    async function checkAdminRole() {
      if (!user) return;
      if (user?.user_metadata?.role === 'admin') {
        setDbRole('admin');
        return;
      }
      const { data } = await supabase
        .from('usuarios')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (data?.role) {
        setDbRole(data.role);
      } else if (user.email?.toLowerCase().includes('admin')) {
        setDbRole('admin');
      }
    }
    checkAdminRole();
  }, [user]);

  const isAdmin = dbRole === 'admin' || user?.user_metadata?.role === 'admin';

  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`matyfit_completed_${user.id}`);
      if (stored) {
        try {
          setCompletedExercises(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [user]);

  const toggleExerciseCompleted = (ejercicioId) => {
    setCompletedExercises((prev) => {
      const isCompleted = prev.includes(ejercicioId);
      const next = isCompleted
        ? prev.filter((id) => id !== ejercicioId)
        : [...prev, ejercicioId];
      if (user?.id) {
        localStorage.setItem(`matyfit_completed_${user.id}`, JSON.stringify(next));
      }
      return next;
    });
  };

  const handleResetWeekProgress = (semanaId) => {
    const idsInWeek = ejercicios.filter((e) => e.semana_id === semanaId).map((e) => e.id);
    setCompletedExercises((prev) => {
      const next = prev.filter((id) => !idsInWeek.includes(id));
      if (user?.id) {
        localStorage.setItem(`matyfit_completed_${user.id}`, JSON.stringify(next));
      }
      return next;
    });
    setToast('🔄 Progreso de la semana desmarcado');
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchUsuarios();
    }
  }, [isAdmin]);

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
      setActiveWeek(semanasData[0].id);
    }
    setLoading(false);
  }

  const ejerciciosDeSemanaRaw = (semanaId) =>
    ejercicios.filter((ej) => ej.semana_id === semanaId);

  const ejerciciosDeSemana = (semanaId) => {
    let list = ejercicios.filter((ej) => ej.semana_id === semanaId);

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (ej) =>
          ej.nombre.toLowerCase().includes(q) ||
          ej.descripcion?.toLowerCase().includes(q) ||
          (Array.isArray(ej.musculos) && ej.musculos.some((m) => m.toLowerCase().includes(q)))
      );
    }

    if (checklistFilter === 'completed') {
      list = list.filter((ej) => completedExercises.includes(ej.id));
    } else if (checklistFilter === 'pending') {
      list = list.filter((ej) => !completedExercises.includes(ej.id));
    }

    return list;
  };

  // ── Open modal ──
  const openCreate = () => {
    if (!isAdmin) return;
    setForm({ ...EMPTY_EXERCISE, semana_id: activeWeek || (semanas[0] ? semanas[0].id : '') });
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

  // ── User Management Functions ──
  async function fetchUsuarios() {
    if (!isAdmin) return;
    setLoadingUsuarios(true);
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) {
      setUsuarios(data || []);
    }
    setLoadingUsuarios(false);
  }

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setUserModalError('');
    setUserSaving(true);

    const email = userForm.email.trim();
    const password = userForm.password;
    const role = userForm.role;

    if (!email || !password || password.length < 6) {
      setUserModalError('El email es obligatorio y la contraseña debe tener al menos 6 caracteres.');
      setUserSaving(false);
      return;
    }

    try {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const tempClient = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      });

      const { data: authData, error: authError } = await tempClient.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });

      if (authError) {
        setUserModalError(`Error: ${authError.message}`);
        setUserSaving(false);
        return;
      }

      const { error: dbError } = await supabase.from('usuarios').upsert({
        id: authData.user.id,
        email,
        role
      });

      if (dbError) {
        console.warn('DB Error:', dbError);
      }

      setToast('✅ Usuario creado');
      setShowUserModal(false);
      setUserForm({ email: '', password: '', role: 'visitante' });
      fetchUsuarios();
    } catch (err) {
      setUserModalError('Error al guardar el usuario.');
    } finally {
      setUserSaving(false);
    }
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingMedia(true);
    setModalError('');

    try {
      if (file.size > 25 * 1024 * 1024) {
        setModalError('El archivo es demasiado pesado (máximo 25MB).');
        setUploadingMedia(false);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('ejercicios')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.warn('Supabase storage upload error:', uploadError);
        // Fallback: If image file, convert to Data URL so saving works without storage bucket setup!
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            setForm((p) => ({ ...p, imagen: evt.target.result }));
            setToast('✅ Imagen cargada con éxito (Modo directo)');
            setUploadingMedia(false);
          };
          reader.onerror = () => {
            setModalError(`Error: ${uploadError.message}. Para solucionar permanentemente, crea el bucket "ejercicios" en Supabase Storage.`);
            setUploadingMedia(false);
          };
          reader.readAsDataURL(file);
          return;
        } else {
          throw new Error(`Falta crear el bucket "ejercicios" en Supabase Storage. Entrá al panel de Supabase -> Storage -> Create Bucket (Nombre: "ejercicios", Público: activado).`);
        }
      }

      const { data: { publicUrl } } = supabase.storage
        .from('ejercicios')
        .getPublicUrl(filePath);

      setForm((p) => ({ ...p, imagen: publicUrl }));
      setToast('✅ Archivo subido con éxito');
    } catch (err) {
      console.error(err);
      setModalError(err.message || 'Error al subir el archivo multimedia.');
    } finally {
      setUploadingMedia(false);
    }
  };

  const confirmDeleteUser = async () => {
    if (!isAdmin) return;
    setDeletingUser(true);
    const { error } = await supabase.from('usuarios').delete().eq('id', deleteUserId);
    setDeletingUser(false);
    setDeleteUserId(null);
    if (!error) {
      setToast('🗑️ Usuario eliminado');
      fetchUsuarios();
    } else {
      setToast('❌ Error al eliminar');
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
  const totalInWeek = ejerciciosDeSemanaRaw(activeWeek).length;
  const completedInWeek = ejerciciosDeSemanaRaw(activeWeek).filter((ej) =>
    completedExercises.includes(ej.id)
  ).length;
  const progressPercent = totalInWeek > 0 ? Math.round((completedInWeek / totalInWeek) * 100) : 0;
  const isWeekFullyCompleted = totalInWeek > 0 && completedInWeek === totalInWeek;

  return (
    <div className="dashboard">
      {/* ── Sidebar ── */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-brand">
          <img src="/assets/images/logo.png" alt="Logo" className="dash-logo" />
          <span>MATIFIT</span>
        </div>

        {isAdmin && (
          <div className="dash-sidebar-admin-nav" style={{ marginBottom: '1.5rem', padding: '0 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <p className="dash-sidebar-label" style={{ padding: '0' }}>ADMINISTRACIÓN</p>
            <button
              type="button"
              className={`dash-sidebar-item ${activeTab === 'ejercicios' ? 'active' : ''}`}
              onClick={() => setActiveTab('ejercicios')}
            >
              🏋️ Ver Ejercicios
            </button>
            <button
              type="button"
              className="dash-sidebar-item"
              onClick={() => {
                setActiveTab('ejercicios');
                openCreate();
              }}
              style={{
                background: 'var(--clr-text)',
                color: 'var(--clr-bg)',
                fontWeight: '700',
                border: 'none',
                marginTop: '0.15rem'
              }}
            >
              ➕ Cargar Ejercicio
            </button>
            <button
              type="button"
              className={`dash-sidebar-item ${activeTab === 'usuarios' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('usuarios');
                fetchUsuarios();
              }}
            >
              👥 Gestionar Usuarios
            </button>
          </div>
        )}

        <nav className="dash-sidebar-nav">
          <p className="dash-sidebar-label">SEMANAS DE ENTRENAMIENTO</p>
          {semanas.map((sem) => {
            const semExercises = ejerciciosDeSemanaRaw(sem.id);
            const semDone = semExercises.filter((e) => completedExercises.includes(e.id)).length;
            const isSemDone = semExercises.length > 0 && semDone === semExercises.length;

            return (
              <button
                key={sem.id}
                type="button"
                className={`dash-sidebar-item ${activeWeek === sem.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveWeek(sem.id);
                  if (activeTab !== 'ejercicios') setActiveTab('ejercicios');
                }}
              >
                <span className="dash-sem-num">{sem.orden}</span>
                <span className="dash-sem-name">
                  {sem.titulo.replace(/Semana \d+ — /, '')}
                </span>
                <span className="dash-sem-badge">
                  {isSemDone ? '✓ 100%' : `${semExercises.length} ej.`}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="dash-sidebar-footer">
          <button
            type="button"
            className="dash-footer-toggle"
            onClick={() => setProfileExpanded(!profileExpanded)}
          >
            <span>👤 Mi Perfil</span>
            <span className="dash-toggle-arrow" style={{ transform: profileExpanded ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}>▼</span>
          </button>
          <div className={`dash-footer-content ${profileExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="dash-user-info">
              <span className="dash-user-avatar">👤</span>
              <span className="dash-user-email">{user?.email}</span>
            </div>
            <button type="button" className="dash-logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
            <a href="/" className="dash-landing-link">← Ver Landing Page</a>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="dash-main">
        {activeTab === 'usuarios' ? (
          <>
            {/* Header for Users */}
            <header className="dash-header">
              <div>
                <h1 className="dash-page-title">Gestión de Usuarios</h1>
                <p className="dash-page-sub">Crear y administrar accesos para tus visitantes o administradores</p>
              </div>
              <button
                type="button"
                className="dash-add-btn"
                onClick={() => {
                  setUserForm({ email: '', password: '', role: 'visitante' });
                  setUserModalError('');
                  setShowUserModal(true);
                }}
              >
                + Nuevo Usuario
              </button>
            </header>

            {/* Users List */}
            {loadingUsuarios ? (
              <div className="dash-empty">
                <div className="dash-spinner" />
                <p>Cargando usuarios...</p>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="dash-empty">
                <span>👥</span>
                <p>No hay usuarios registrados aún.</p>
                <button
                  type="button"
                  className="dash-add-btn-sm"
                  onClick={() => {
                    setUserForm({ email: '', password: '', role: 'visitante' });
                    setUserModalError('');
                    setShowUserModal(true);
                  }}
                >
                  + Agregar usuario
                </button>
              </div>
            ) : (
              <div className="dash-users-container" style={{ marginTop: '2rem' }}>
                <div style={{ overflowX: 'auto', background: 'var(--clr-bg-2)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-md)' }}>
                  <table className="dash-users-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--clr-border)', background: 'rgba(255,255,255,0.02)' }}>
                        <th style={{ padding: '1rem' }}>Email</th>
                        <th style={{ padding: '1rem' }}>Rol</th>
                        <th style={{ padding: '1rem' }}>Fecha de Registro</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((u) => (
                        <tr key={u.id} style={{ borderBottom: '1px solid var(--clr-border)' }}>
                          <td style={{ padding: '1rem', fontWeight: '500' }}>{u.email}</td>
                          <td style={{ padding: '1rem' }}>
                            <span className={`ejercicio-badge ${u.role === 'admin' ? 'badge-avanzado' : 'badge-facil'}`} style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
                              {u.role}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--clr-text-dim)' }}>
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            {u.id !== user.id ? (
                              <button
                                type="button"
                                className="dash-delete-btn"
                                onClick={() => setDeleteUserId(u.id)}
                                style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer' }}
                              >
                                🗑 Eliminar
                              </button>
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-dim)', fontStyle: 'italic' }}>Tú (Actual)</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Header */}
            <header className="dash-header">
              <div>
                <h1 className="dash-page-title">
                  {isAdmin ? 'Panel de Entrenamientos (Admin)' : 'Mi Plan de Entrenamiento'}
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

            {/* Checklist progress bar & Filter toolbar */}
            {totalInWeek > 0 && (
              <div className="dash-progress-card">
                <div className="dash-progress-header">
                  <div className="dash-progress-info">
                    <span className="dash-progress-title">📈 Checklist de Progreso</span>
                    <span className="dash-progress-stats">
                      <strong>{completedInWeek}</strong> de <strong>{totalInWeek}</strong> completados ({progressPercent}%)
                    </span>
                  </div>
                  {completedInWeek > 0 && (
                    <button
                      type="button"
                      className="dash-reset-btn"
                      onClick={() => handleResetWeekProgress(activeWeek)}
                    >
                      🔄 Reiniciar semana
                    </button>
                  )}
                </div>

                <div className="dash-progress-bar-bg">
                  <div
                    className="dash-progress-bar-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {isWeekFullyCompleted && (
                  <div className="dash-completion-banner">
                    🎉 <strong>¡Felicitaciones!</strong> Completaste todos los ejercicios de esta semana.
                  </div>
                )}

                {/* Filter and search toolbar */}
                <div className="dash-toolbar">
                  <div className="dash-filter-tabs">
                    <button
                      type="button"
                      className={`dash-filter-tab ${checklistFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setChecklistFilter('all')}
                    >
                      Todos ({totalInWeek})
                    </button>
                    <button
                      type="button"
                      className={`dash-filter-tab ${checklistFilter === 'pending' ? 'active' : ''}`}
                      onClick={() => setChecklistFilter('pending')}
                    >
                      Pendientes ({totalInWeek - completedInWeek})
                    </button>
                    <button
                      type="button"
                      className={`dash-filter-tab ${checklistFilter === 'completed' ? 'active' : ''}`}
                      onClick={() => setChecklistFilter('completed')}
                    >
                      Completados ({completedInWeek})
                    </button>
                  </div>

                  <div className="dash-search-wrap">
                    <span className="dash-search-icon">🔍</span>
                    <input
                      type="text"
                      className="dash-search-input"
                      placeholder="Buscar ejercicio o músculo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        className="dash-search-clear"
                        onClick={() => setSearchTerm('')}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Exercise grid */}
            <div className="dash-exercises-grid">
              {ejerciciosDeSemana(activeWeek).length === 0 ? (
                <div className="dash-empty">
                  <span>🏋️</span>
                  <p>
                    {searchTerm || checklistFilter !== 'all'
                      ? 'No se encontraron ejercicios con los filtros seleccionados.'
                      : 'No hay ejercicios agregados en esta semana todavía.'}
                  </p>
                  {isAdmin && !searchTerm && (
                    <button type="button" className="dash-add-btn-sm" onClick={openCreate}>
                      + Agregar ejercicio
                    </button>
                  )}
                </div>
              ) : (
                ejerciciosDeSemana(activeWeek).map((ej) => {
                  const isDone = completedExercises.includes(ej.id);

                  return (
                    <div
                      key={ej.id}
                      className={`dash-exercise-card ${isDone ? 'completed' : ''}`}
                    >
                      {isAdmin && ej.es_destacado && (
                        <span className="dash-featured-badge">⭐ Landing</span>
                      )}

                      {/* Checklist Toggle Button */}
                      <button
                        type="button"
                        className={`dash-ex-check-btn ${isDone ? 'checked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExerciseCompleted(ej.id);
                        }}
                        aria-label={isDone ? `Marcar ${ej.nombre} como pendiente` : `Marcar ${ej.nombre} como completado`}
                      >
                        <span className="check-icon">{isDone ? '✓' : '⬜'}</span>
                        <span>{isDone ? 'Hecho' : 'Completar'}</span>
                      </button>

                      {/* Media Viewer Component */}
                      <div
                        className="dash-ex-img-wrap"
                        onClick={() => setDetailExercise(ej)}
                        role="button"
                        tabIndex={0}
                        title="Ver detalle del ejercicio"
                      >
                        <MediaViewer url={ej.imagen} alt={ej.nombre} className="dash-ex-img" />
                        <span className={`ejercicio-badge ${getDifficultyClass(ej.dificultad)}`}>
                          {ej.dificultad}
                        </span>
                      </div>

                      <div className="dash-ex-body">
                        <h3
                          className="dash-ex-name"
                          onClick={() => setDetailExercise(ej)}
                          style={{ cursor: 'pointer' }}
                        >
                          {ej.nombre}
                        </h3>
                        <p className="dash-ex-desc">{ej.descripcion?.slice(0, 85)}...</p>
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
                  );
                })
              )}
            </div>
          </>
        )}
      </main>

      {/* ── Modal: Exercise Detail (Enlarged video/image view) ── */}
      {detailExercise && (
        <Modal
          ejercicio={detailExercise}
          onClose={() => setDetailExercise(null)}
          t={{
            modal_close: 'Cerrar',
            modal_series: 'series',
            modal_reps: 'repeticiones',
            modal_rest: 'descanso',
          }}
        />
      )}

      {/* ── Modal: Create / Edit Exercise ── */}
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
                  placeholder="Descripción detallada o pasos para realizar el ejercicio..."
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

              <div className="dash-form-row">
                <div className="dash-form-field">
                  <label htmlFor="f-imagen">URL de imagen o Enlace de Video (YouTube / MP4)</label>
                  <input
                    id="f-imagen"
                    type="text"
                    placeholder="ej: https://www.youtube.com/watch?v=... o /assets/images/squat.png"
                    value={form.imagen}
                    onChange={(e) => setForm((p) => ({ ...p, imagen: e.target.value }))}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--clr-text-dim)' }}>
                    💡 Acepta enlaces de YouTube, Vimeo, videos MP4/WebM o imágenes.
                  </span>
                </div>
                <div className="dash-form-field">
                  <label htmlFor="f-file">O Subir Archivo (Video / Imagen / GIF)</label>
                  <input
                    id="f-file"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    disabled={uploadingMedia}
                    style={{ padding: '0.55rem' }}
                  />
                  {uploadingMedia && <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-dim)' }}>Subiendo archivo... 🔄</span>}
                </div>
              </div>

              {/* Live Media Preview inside Modal */}
              {form.imagen && (
                <div className="dash-form-field" style={{ marginTop: '0.5rem' }}>
                  <label>Vista previa del contenido multimedia:</label>
                  <div className="dash-modal-preview-box">
                    <MediaViewer url={form.imagen} alt="Vista previa" className="dash-modal-preview-media" controls={true} autoPlay={false} />
                  </div>
                </div>
              )}

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

      {/* ── Modal: Confirm Delete Exercise ── */}
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

      {/* ── Modal: Registrar Usuario ── */}
      {showUserModal && (
        <div
          className="dash-modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowUserModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="user-modal-title"
        >
          <div className="dash-modal dash-modal-sm">
            <div className="dash-modal-header">
              <h2 id="user-modal-title">+ Registrar Nuevo Usuario</h2>
              <button
                type="button"
                className="dash-modal-close"
                onClick={() => setShowUserModal(false)}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <form className="dash-modal-form" onSubmit={handleSaveUser}>
              <div className="dash-form-field">
                <label htmlFor="u-email">Email *</label>
                <input
                  id="u-email"
                  type="email"
                  placeholder="ej: cliente@email.com"
                  value={userForm.email}
                  onChange={(e) => setUserForm((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>

              <div className="dash-form-field">
                <label htmlFor="u-password">Contraseña (mín. 6 caracteres) *</label>
                <input
                  id="u-password"
                  type="password"
                  placeholder="••••••••"
                  value={userForm.password}
                  onChange={(e) => setUserForm((p) => ({ ...p, password: e.target.value }))}
                  required
                />
              </div>

              <div className="dash-form-field">
                <label htmlFor="u-role">Rol *</label>
                <select
                  id="u-role"
                  value={userForm.role}
                  onChange={(e) => setUserForm((p) => ({ ...p, role: e.target.value }))}
                  required
                >
                  <option value="visitante">Visitante / Cliente</option>
                  <option value="admin">Administrador (Acceso total)</option>
                </select>
              </div>

              {userModalError && (
                <div className="dash-form-error" role="alert">
                  ⚠ {userModalError}
                </div>
              )}

              <div className="dash-modal-footer">
                <button
                  type="button"
                  className="dash-btn-cancel"
                  onClick={() => setShowUserModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="dash-btn-save"
                  disabled={userSaving}
                >
                  {userSaving ? <span className="dash-spinner-sm" /> : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Confirm Delete User ── */}
      {deleteUserId && (
        <div
          className="dash-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-user-title"
        >
          <div className="dash-modal dash-modal-sm">
            <h2 id="confirm-user-title" className="dash-confirm-title">¿Eliminar usuario?</h2>
            <p className="dash-confirm-text">
              Esto eliminará al usuario del listado de la base de datos. ¿Estás seguro?
            </p>
            <div className="dash-modal-footer">
              <button
                type="button"
                className="dash-btn-cancel"
                onClick={() => setDeleteUserId(null)}
                disabled={deletingUser}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="dash-btn-danger"
                onClick={confirmDeleteUser}
                disabled={deletingUser}
              >
                {deletingUser ? <span className="dash-spinner-sm" /> : '🗑 Eliminar'}
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
