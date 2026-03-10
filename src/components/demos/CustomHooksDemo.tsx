import { useState, useEffect, useCallback } from 'react';

// Custom hook 1: useLocalStorage
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  const setStored = useCallback((v: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  return [value, setStored] as const;
}

// Custom hook 2: useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

// Custom hook 3: useToggle
function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState((s) => !s), []);
  return [state, toggle] as const;
}

// Custom hook 4: useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}

export default function CustomHooksDemo() {
  const [note, setNote] = useLocalStorage('demo-note', 'My persisted note!');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [isVisible, toggleVisible] = useToggle(true);
  const { width, height } = useWindowSize();

  return (
    <div className="demo-area">
      <h4 className="demo-title">Custom Hooks</h4>

      <div className="demo-section">
        <p className="demo-label">1. useLocalStorage — persists across refreshes</p>
        <input
          className="demo-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type something — it persists!"
          style={{ width: '100%' }}
        />
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Stored in localStorage under "demo-note". Refresh the page — it's still there!
        </p>
      </div>

      <div className="demo-section">
        <p className="demo-label">2. useDebounce — waits 400ms after typing stops</p>
        <input
          className="demo-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontFamily: 'monospace', marginTop: '0.4rem' }}>
          <span>Immediate: <strong>"{search}"</strong></span>
          <span>Debounced: <strong style={{ color: 'var(--accent)' }}>"{debouncedSearch}"</strong></span>
        </div>
      </div>

      <div className="demo-section">
        <p className="demo-label">3. useToggle — clean boolean state</p>
        <div className="demo-row">
          <button className="demo-btn active" onClick={toggleVisible}>Toggle</button>
          {isVisible && (
            <span style={{ padding: '0.3rem 0.6rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.8rem' }}>
              I'm visible!
            </span>
          )}
        </div>
      </div>

      <div className="demo-section">
        <p className="demo-label">4. useWindowSize — reactive to resize</p>
        <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--accent)' }}>
          {width} × {height} px
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          Resize your browser window to see it update!
        </p>
      </div>
    </div>
  );
}
