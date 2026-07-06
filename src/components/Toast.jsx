export default function Toast({ message }) {
  return (
    <div className={`toast ${message ? 'show' : ''}`} id="toast" role="status" aria-live="polite">
      <div className="toast-message">{message}</div>
    </div>
  );
}
