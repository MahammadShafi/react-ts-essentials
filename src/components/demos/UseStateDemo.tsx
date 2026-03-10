import { useState } from 'react';

type Theme = 'light' | 'dark' | 'ocean';

interface ThemeConfig {
  bg: string;
  text: string;
  label: string;
}

const themes: Record<Theme, ThemeConfig> = {
  light: { bg: '#f8fafc', text: '#1e293b', label: 'Light' },
  dark: { bg: '#1e293b', text: '#f1f5f9', label: 'Dark' },
  ocean: { bg: '#0c4a6e', text: '#e0f2fe', label: 'Ocean' },
};

export default function UseStateDemo() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<Theme>('light');
  const [todos, setTodos] = useState(['Learn React', 'Master TypeScript']);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const cfg = themes[theme];

  return (
    <div className="demo-area">
      <h4 className="demo-title">useState — Three Examples</h4>

      {/* Counter */}
      <div className="demo-section">
        <p className="demo-label">1. Counter (number state)</p>
        <div className="demo-row">
          <button className="demo-btn" onClick={() => setCount((c) => c - 1)}>−</button>
          <span style={{ fontWeight: 700, fontSize: '1.25rem', minWidth: '3rem', textAlign: 'center' }}>
            {count}
          </span>
          <button className="demo-btn active" onClick={() => setCount((c) => c + 1)}>+</button>
          <button className="demo-btn" onClick={() => setCount(0)} style={{ marginLeft: '0.5rem' }}>
            Reset
          </button>
        </div>
      </div>

      {/* Theme switcher */}
      <div className="demo-section">
        <p className="demo-label">2. Theme switcher (union type state)</p>
        <div className="demo-row">
          {(Object.keys(themes) as Theme[]).map((t) => (
            <button
              key={t}
              className={`demo-btn ${theme === t ? 'active' : ''}`}
              onClick={() => setTheme(t)}
            >
              {themes[t].label}
            </button>
          ))}
        </div>
        <div style={{
          background: cfg.bg,
          color: cfg.text,
          padding: '0.6rem 0.75rem',
          borderRadius: '6px',
          fontSize: '0.8rem',
          border: '1px solid var(--border)',
          marginTop: '0.5rem',
        }}>
          Preview: {cfg.label} theme applied!
        </div>
      </div>

      {/* Todo list */}
      <div className="demo-section">
        <p className="demo-label">3. Todo list (array state)</p>
        <div className="demo-row">
          <input
            className="demo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="New todo..."
          />
          <button className="demo-btn active" onClick={addTodo}>Add</button>
        </div>
        <ul className="demo-list" style={{ marginTop: '0.5rem' }}>
          {todos.map((todo, i) => (
            <li key={i} className="demo-list-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
              {todo}
              <button
                onClick={() => removeTodo(i)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
