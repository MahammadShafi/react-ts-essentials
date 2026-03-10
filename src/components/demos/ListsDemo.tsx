import { useState } from 'react';

interface Developer {
  id: number;
  name: string;
  lang: string;
  xp: number;
}

const initialDevs: Developer[] = [
  { id: 1, name: 'Alice Chen', lang: 'TypeScript', xp: 5 },
  { id: 2, name: 'Bob Kumar', lang: 'Rust', xp: 3 },
  { id: 3, name: 'Carol Smith', lang: 'Go', xp: 7 },
  { id: 4, name: 'Dan Park', lang: 'Python', xp: 4 },
  { id: 5, name: 'Eva Müller', lang: 'Kotlin', xp: 6 },
];

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  Rust: '#ce412b',
  Go: '#00acd7',
  Python: '#3572a5',
  Kotlin: '#7f52ff',
};

export default function ListsDemo() {
  const [devs, setDevs] = useState<Developer[]>(initialDevs);
  const [sortBy, setSortBy] = useState<'name' | 'xp'>('name');
  const [filter, setFilter] = useState('');

  const sorted = [...devs]
    .filter((d) => d.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : b.xp - a.xp);

  const remove = (id: number) => setDevs((prev) => prev.filter((d) => d.id !== id));
  const reset = () => setDevs(initialDevs);

  return (
    <div className="demo-area">
      <h4 className="demo-title">Lists & Keys</h4>

      <div className="demo-row">
        <input
          className="demo-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name..."
        />
        <button
          className={`demo-btn ${sortBy === 'name' ? 'active' : ''}`}
          onClick={() => setSortBy('name')}
        >
          A–Z
        </button>
        <button
          className={`demo-btn ${sortBy === 'xp' ? 'active' : ''}`}
          onClick={() => setSortBy('xp')}
        >
          XP
        </button>
      </div>

      <ul className="demo-list" style={{ marginTop: '0.5rem' }}>
        {sorted.map((dev) => (
          <li key={dev.id} className="demo-list-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              background: langColors[dev.lang] ?? '#888',
              color: '#fff',
              borderRadius: '4px',
              padding: '0.1rem 0.4rem',
              fontSize: '0.65rem',
              fontWeight: 600,
              minWidth: '72px',
              textAlign: 'center',
            }}>
              {dev.lang}
            </span>
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.85rem' }}>{dev.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{dev.xp} yrs</span>
            <button
              onClick={() => remove(dev.id)}
              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}
            >
              ✕
            </button>
          </li>
        ))}
        {sorted.length === 0 && (
          <li style={{ color: 'var(--text-muted)', fontSize: '0.8rem', padding: '0.5rem 0' }}>
            No results
          </li>
        )}
      </ul>

      <button className="demo-btn" style={{ marginTop: '0.5rem' }} onClick={reset}>
        Reset list
      </button>
    </div>
  );
}
