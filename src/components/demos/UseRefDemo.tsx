import { useState, useRef, useEffect } from 'react';

export default function UseRefDemo() {
  const [renderCount, setRenderCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Ref persists without causing re-renders
  const clickCount = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValue = useRef('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    prevValue.current = inputValue;
  });

  const handleMuteClick = () => {
    clickCount.current += 1;
    // does NOT cause re-render
  };

  const focusInput = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  const startStop = () => {
    if (running) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setRunning(false);
    } else {
      timerRef.current = setInterval(() => setElapsed((e) => e + 100), 100);
      setRunning(true);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
    setElapsed(0);
  };

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${s.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  return (
    <div className="demo-area">
      <h4 className="demo-title">useRef — Three Use Cases</h4>

      {/* 1. Mutable value without re-render */}
      <div className="demo-section">
        <p className="demo-label">1. Mutable value that doesn't cause re-renders</p>
        <div className="demo-row">
          <button className="demo-btn" onClick={handleMuteClick}>
            Click (silent)
          </button>
          <button className="demo-btn active" onClick={() => setRenderCount((c) => c + 1)}>
            Force render
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Ref: {clickCount.current} clicks, renders: {renderCount}
          </span>
        </div>
      </div>

      {/* 2. DOM access */}
      <div className="demo-section">
        <p className="demo-label">2. Direct DOM access</p>
        <div className="demo-row">
          <input ref={inputRef} className="demo-input" defaultValue="Focus me!" />
          <button className="demo-btn active" onClick={focusInput}>
            Focus & Select
          </button>
        </div>
      </div>

      {/* 3. Previous value */}
      <div className="demo-section">
        <p className="demo-label">3. Track previous value</p>
        <input
          className="demo-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
          style={{ width: '100%' }}
        />
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontFamily: 'monospace' }}>
          Current: <strong>"{inputValue}"</strong> | Previous: <strong>"{prevValue.current}"</strong>
        </div>
      </div>

      {/* 4. Stopwatch (interval ref) */}
      <div className="demo-section">
        <p className="demo-label">4. Stopwatch — interval stored in ref</p>
        <div style={{ fontFamily: 'monospace', fontSize: '2rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem' }}>
          {formatTime(elapsed)}
        </div>
        <div className="demo-row">
          <button className={`demo-btn ${running ? '' : 'active'}`} onClick={startStop}>
            {running ? 'Stop' : 'Start'}
          </button>
          <button className="demo-btn" onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}
