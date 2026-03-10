import { useState } from 'react';

// TypeScript concepts shown interactively

// 1. Discriminated union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'rectangle': return shape.width * shape.height;
    case 'triangle': return 0.5 * shape.base * shape.height;
  }
}

// 2. Generic component
interface Option<T> {
  value: T;
  label: string;
}

function Select<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <select
      value={String(value)}
      onChange={(e) => {
        const opt = options.find((o) => String(o.value) === e.target.value);
        if (opt) onChange(opt.value);
      }}
      className="demo-input"
    >
      {options.map((o) => (
        <option key={String(o.value)} value={String(o.value)}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default function TypeScriptDemo() {
  const [shape, setShape] = useState<Shape>({ kind: 'circle', radius: 5 });
  const [radius, setRadius] = useState(5);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(6);
  const [base, setBase] = useState(3);
  const [triHeight, setTriHeight] = useState(8);

  const shapeOptions: Option<Shape['kind']>[] = [
    { value: 'circle', label: 'Circle' },
    { value: 'rectangle', label: 'Rectangle' },
    { value: 'triangle', label: 'Triangle' },
  ];

  const updateShape = (kind: Shape['kind']) => {
    if (kind === 'circle') setShape({ kind: 'circle', radius });
    if (kind === 'rectangle') setShape({ kind: 'rectangle', width, height });
    if (kind === 'triangle') setShape({ kind: 'triangle', base, height: triHeight });
  };

  return (
    <div className="demo-area">
      <h4 className="demo-title">TypeScript + React Patterns</h4>

      {/* Discriminated union */}
      <div className="demo-section">
        <p className="demo-label">1. Discriminated union — exhaustive shape switcher</p>

        <div className="demo-row">
          <Select
            options={shapeOptions}
            value={shape.kind}
            onChange={updateShape}
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          {shape.kind === 'circle' && (
            <div className="demo-row">
              <label className="demo-label">Radius: {radius}</label>
              <input
                type="range" min={1} max={20} value={radius}
                onChange={(e) => {
                  const r = Number(e.target.value);
                  setRadius(r);
                  setShape({ kind: 'circle', radius: r });
                }}
                style={{ flex: 1 }}
              />
            </div>
          )}
          {shape.kind === 'rectangle' && (
            <>
              <div className="demo-row">
                <label className="demo-label">Width: {width}</label>
                <input type="range" min={1} max={20} value={width}
                  onChange={(e) => { const w = Number(e.target.value); setWidth(w); setShape({ kind: 'rectangle', width: w, height }); }}
                  style={{ flex: 1 }}
                />
              </div>
              <div className="demo-row">
                <label className="demo-label">Height: {height}</label>
                <input type="range" min={1} max={20} value={height}
                  onChange={(e) => { const h = Number(e.target.value); setHeight(h); setShape({ kind: 'rectangle', width, height: h }); }}
                  style={{ flex: 1 }}
                />
              </div>
            </>
          )}
          {shape.kind === 'triangle' && (
            <>
              <div className="demo-row">
                <label className="demo-label">Base: {base}</label>
                <input type="range" min={1} max={20} value={base}
                  onChange={(e) => { const b = Number(e.target.value); setBase(b); setShape({ kind: 'triangle', base: b, height: triHeight }); }}
                  style={{ flex: 1 }}
                />
              </div>
              <div className="demo-row">
                <label className="demo-label">Height: {triHeight}</label>
                <input type="range" min={1} max={20} value={triHeight}
                  onChange={(e) => { const h = Number(e.target.value); setTriHeight(h); setShape({ kind: 'triangle', base, height: h }); }}
                  style={{ flex: 1 }}
                />
              </div>
            </>
          )}
        </div>

        <div style={{
          marginTop: '0.5rem',
          padding: '0.5rem 0.75rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
        }}>
          area({shape.kind}) = <strong style={{ color: 'var(--accent)' }}>
            {area(shape).toFixed(2)}
          </strong> units²
        </div>
      </div>

      {/* Generic component */}
      <div className="demo-section">
        <p className="demo-label">2. Generic {'<Select<T>>'} component — type-safe options</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          The <code>Select</code> component above uses generics so it works with any
          value type (<code>string</code>, <code>number</code>, etc.) while staying fully type-safe.
          TypeScript infers <code>T</code> from the <code>options</code> prop automatically.
        </p>
      </div>
    </div>
  );
}
