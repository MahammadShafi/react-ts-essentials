import { useState } from 'react';

interface AvatarProps {
  name: string;
  role: string;
  level: number;
  online: boolean;
}

function Avatar({ name, role, level, online }: AvatarProps) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '0.75rem',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '1rem',
        color: '#fff',
        flexShrink: 0,
        position: 'relative',
      }}>
        {initials}
        <span style={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: online ? '#22c55e' : '#9ca3af',
          border: '2px solid var(--bg)',
        }} />
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{role}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: '0.1rem' }}>
          Level {level} Developer
        </div>
      </div>
    </div>
  );
}

export default function PropsDemo() {
  const [name, setName] = useState('Jane Doe');
  const [role, setRole] = useState('Frontend Engineer');
  const [level, setLevel] = useState(3);
  const [online, setOnline] = useState(true);

  return (
    <div className="demo-area">
      <h4 className="demo-title">Props Flow Down</h4>

      <div className="demo-row">
        <label className="demo-label">Name:</label>
        <input className="demo-input" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="demo-row">
        <label className="demo-label">Role:</label>
        <input className="demo-input" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      <div className="demo-row">
        <label className="demo-label">Level: {level}</label>
        <input
          type="range"
          min={1} max={10}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          style={{ flex: 1 }}
        />
      </div>
      <div className="demo-row">
        <label className="demo-label">Status:</label>
        <button
          className={`demo-btn ${online ? 'active' : ''}`}
          onClick={() => setOnline(!online)}
        >
          {online ? 'Online' : 'Offline'}
        </button>
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <Avatar name={name || 'Anonymous'} role={role || 'Developer'} level={level} online={online} />
      </div>
    </div>
  );
}
