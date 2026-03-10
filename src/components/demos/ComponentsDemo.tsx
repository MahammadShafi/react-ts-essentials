import { useState } from 'react';

interface BadgeProps {
  label: string;
  color: string;
}

function Badge({ label, color }: BadgeProps) {
  return (
    <span style={{
      background: color,
      color: '#fff',
      padding: '0.2rem 0.6rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
    }}>
      {label}
    </span>
  );
}

interface CardProps {
  title: string;
  description: string;
  tag: string;
}

function Card({ title, description, tag }: CardProps) {
  const tagColors: Record<string, string> = {
    React: '#61dafb',
    TypeScript: '#3178c6',
    Vite: '#bd34fe',
  };

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '0.75rem',
      marginBottom: '0.5rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <strong style={{ fontSize: '0.9rem' }}>{title}</strong>
        <Badge label={tag} color={tagColors[tag] ?? '#888'} />
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
        {description}
      </p>
    </div>
  );
}

const cards: CardProps[] = [
  { title: 'Reactive UI', description: 'Build UIs that update automatically with state changes.', tag: 'React' },
  { title: 'Type Safety', description: 'Catch errors at compile time, not runtime.', tag: 'TypeScript' },
  { title: 'Lightning Fast', description: 'Near-instant HMR and optimized builds.', tag: 'Vite' },
];

export default function ComponentsDemo() {
  const [count, setCount] = useState(cards.length);

  return (
    <div className="demo-area">
      <h4 className="demo-title">Composable Components</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        <code>Card</code> and <code>Badge</code> are reusable components used below:
      </p>

      {cards.slice(0, count).map((card) => (
        <Card key={card.title} {...card} />
      ))}

      <div className="demo-row" style={{ marginTop: '0.75rem' }}>
        <button
          className="demo-btn"
          onClick={() => setCount((c) => Math.max(1, c - 1))}
          disabled={count <= 1}
        >
          Remove card
        </button>
        <button
          className="demo-btn active"
          onClick={() => setCount((c) => Math.min(cards.length, c + 1))}
          disabled={count >= cards.length}
        >
          Add card
        </button>
      </div>
    </div>
  );
}
