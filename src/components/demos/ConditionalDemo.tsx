import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Notification {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

const notifications: Notification[] = [
  { type: 'info', message: 'New update available.' },
  { type: 'success', message: 'Changes saved successfully!' },
  { type: 'warning', message: 'Disk usage is above 80%.' },
  { type: 'error', message: 'Connection to server lost.' },
];

const notifStyles: Record<Notification['type'], { bg: string; icon: string }> = {
  info: { bg: '#3b82f6', icon: 'ℹ' },
  success: { bg: '#22c55e', icon: '✓' },
  warning: { bg: '#f59e0b', icon: '⚠' },
  error: { bg: '#ef4444', icon: '✕' },
};

function StatusButton({ status, onClick }: { status: Status; onClick: () => void }) {
  const config = {
    idle: { label: 'Fetch Data', color: 'var(--accent)' },
    loading: { label: 'Loading…', color: '#f59e0b' },
    success: { label: 'Refetch', color: '#22c55e' },
    error: { label: 'Retry', color: '#ef4444' },
  };

  const cfg = config[status];

  return (
    <button
      onClick={onClick}
      disabled={status === 'loading'}
      style={{
        background: cfg.color,
        color: '#fff',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '6px',
        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        fontSize: '0.8rem',
        fontWeight: 600,
        opacity: status === 'loading' ? 0.7 : 1,
      }}
    >
      {cfg.label}
    </button>
  );
}

export default function ConditionalDemo() {
  const [status, setStatus] = useState<Status>('idle');
  const [notifIndex, setNotifIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(0);

  const simulate = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? 'success' : 'error');
    }, 1200);
  };

  const notif = notifications[notifIndex];

  return (
    <div className="demo-area">
      <h4 className="demo-title">Conditional Rendering</h4>

      {/* If/else via ternary */}
      <div className="demo-section">
        <p className="demo-label">1. Ternary — if/else</p>
        <div className="demo-row">
          <button className="demo-btn" onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {isLoggedIn ? 'Log out' : 'Log in'}
          </button>
          <span style={{ fontSize: '0.85rem' }}>
            {isLoggedIn ? '👤 Welcome back!' : '🔒 Please log in'}
          </span>
        </div>
      </div>

      {/* && short circuit */}
      <div className="demo-section">
        <p className="demo-label">2. && short-circuit — render when truthy</p>
        <div className="demo-row">
          <button className="demo-btn active" onClick={() => setCount((c) => c + 1)}>Click</button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {count} click{count !== 1 ? 's' : ''}
          </span>
        </div>
        {count >= 5 && (
          <div style={{
            marginTop: '0.5rem',
            padding: '0.4rem 0.75rem',
            background: '#7c3aed22',
            border: '1px solid #7c3aed',
            borderRadius: '6px',
            fontSize: '0.8rem',
            color: '#a78bfa',
          }}>
            You're on fire! 🔥 {count} clicks and counting.
          </div>
        )}
      </div>

      {/* Status-based rendering */}
      <div className="demo-section">
        <p className="demo-label">3. Status-based — async state</p>
        <div className="demo-row">
          <StatusButton status={status} onClick={simulate} />
          {status === 'idle' && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click to fetch</span>}
          {status === 'loading' && <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Fetching data…</span>}
          {status === 'success' && <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>Data loaded!</span>}
          {status === 'error' && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>Something went wrong</span>}
        </div>
      </div>

      {/* Dynamic notification */}
      <div className="demo-section">
        <p className="demo-label">4. Dynamic notification variant</p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          background: notifStyles[notif.type].bg + '22',
          border: `1px solid ${notifStyles[notif.type].bg}`,
          borderRadius: '6px',
          fontSize: '0.8rem',
        }}>
          <span style={{ color: notifStyles[notif.type].bg, fontWeight: 700 }}>
            {notifStyles[notif.type].icon}
          </span>
          {notif.message}
        </div>
        <div className="demo-row" style={{ marginTop: '0.5rem' }}>
          {notifications.map((n, i) => (
            <button
              key={n.type}
              className={`demo-btn ${i === notifIndex ? 'active' : ''}`}
              onClick={() => setNotifIndex(i)}
            >
              {n.type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
