import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (authError) {
      setError('Credenciales incorrectas. Verificá tu email y contraseña.');
      return;
    }

    if (data?.session) {
      onLoginSuccess(data.session);
    }
  };

  return (
    <div className="login-page">
      {/* Background decorative elements */}
      <div className="login-bg-glow login-bg-glow-1" aria-hidden="true" />
      <div className="login-bg-glow login-bg-glow-2" aria-hidden="true" />

      <div className="login-card" role="main">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo-wrap">
            <img src="/assets/images/logo.png" alt="Logo Matifit" className="login-logo" />
          </div>
          <span className="login-brand">MATIFIT</span>
          <h1 className="login-title">Acceso al Sistema</h1>
          <p className="login-subtitle">Ingresá tus credenciales para acceder al panel de ejercicios</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="login-email" className="login-label">
              Email
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon" aria-hidden="true">✉</span>
              <input
                id="login-email"
                type="email"
                className="login-input"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="login-password" className="login-label">
              Contraseña
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon" aria-hidden="true">🔒</span>
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                className="login-input login-input-pass"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-show-pass"
                onClick={() => setShowPass((p) => !p)}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert" aria-live="polite">
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading || !email || !password}
            id="login-submit-btn"
          >
            {loading ? (
              <span className="login-spinner" aria-label="Iniciando sesión..." />
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <span className="login-btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <a href="#inicio" className="login-back-link">
            ← Volver a la Landing Page
          </a>
        </div>
      </div>
    </div>
  );
}
