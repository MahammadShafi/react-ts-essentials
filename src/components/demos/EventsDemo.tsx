import { useState, MouseEvent, KeyboardEvent, ChangeEvent, FormEvent } from 'react';

interface LogEntry {
  id: number;
  type: string;
  detail: string;
}

let nextId = 1;

export default function EventsDemo() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [form, setForm] = useState({ username: '', email: '' });

  const addLog = (type: string, detail: string) => {
    setLog((prev) => [{ id: nextId++, type, detail }, ...prev].slice(0, 6));
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    addLog('mousemove', `x: ${e.clientX}, y: ${e.clientY}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    addLog('keydown', `key: "${e.key}"`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLog('submit', `${form.username} / ${form.email}`);
  };

  const typeColors: Record<string, string> = {
    mousemove: '#8b5cf6',
    keydown: '#f59e0b',
    submit: '#22c55e',
  };

  return (
    <div className="demo-area">
      <h4 className="demo-title">Typed Event Handlers</h4>

      <div className="demo-section">
        <p className="demo-label">1. MouseEvent — hover to track</p>
        <div
          onMouseMove={handleMouseMove}
          style={{
            height: '60px',
            background: 'var(--surface)',
            border: '1px dashed var(--border)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            cursor: 'crosshair',
          }}
        >
          Move mouse here
        </div>
      </div>

      <div className="demo-section">
        <p className="demo-label">2. KeyboardEvent — type below</p>
        <input
          className="demo-input"
          onKeyDown={handleKeyDown}
          placeholder="Press keys..."
          style={{ width: '100%' }}
        />
      </div>

      <div className="demo-section">
        <p className="demo-label">3. FormEvent — submit the form</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input
            className="demo-input"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            className="demo-input"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button type="submit" className="demo-btn active">Submit</button>
        </form>
      </div>

      {log.length > 0 && (
        <div className="demo-section">
          <p className="demo-label">Event log:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {log.map((entry) => (
              <div key={entry.id} style={{
                display: 'flex',
                gap: '0.5rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}>
                <span style={{
                  color: typeColors[entry.type] ?? '#888',
                  fontWeight: 600,
                  minWidth: '80px',
                }}>
                  {entry.type}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{entry.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
