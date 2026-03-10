import { useState } from 'react';

export default function JsxDemo() {
  const [name, setName] = useState('World');
  const [showGreeting, setShowGreeting] = useState(true);
  const items = ['React', 'TypeScript', 'Vite'];

  return (
    <div className="demo-area">
      <h4 className="demo-title">JSX in Action</h4>

      <div className="demo-row">
        <label className="demo-label">Your name:</label>
        <input
          className="demo-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="demo-row">
        <label className="demo-label">Show greeting?</label>
        <button
          className={`demo-btn ${showGreeting ? 'active' : ''}`}
          onClick={() => setShowGreeting(!showGreeting)}
        >
          {showGreeting ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="demo-output">
        {/* Expressions in JSX with {} */}
        {showGreeting && (
          <p className="demo-result">Hello, <strong>{name || 'World'}</strong>!</p>
        )}

        {/* JSX lists */}
        <p className="demo-label" style={{ marginTop: '0.75rem' }}>Tech stack:</p>
        <ul className="demo-list">
          {items.map((item) => (
            <li key={item} className="demo-list-item">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
