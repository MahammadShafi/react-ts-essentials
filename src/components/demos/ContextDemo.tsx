import { createContext, useContext, useState, ReactNode } from 'react';

// --- Theme Context ---
type AppTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: AppTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

// --- User Context ---
interface User {
  name: string;
  plan: 'free' | 'pro';
}

interface UserContextValue {
  user: User;
  setUser: (u: User) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}

// --- Leaf components (deeply nested, no prop drilling) ---
function ThemedCard({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <div style={{
      background: theme === 'dark' ? '#1e293b' : '#f8fafc',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '0.75rem',
      fontSize: '0.85rem',
    }}>
      {children}
    </div>
  );
}

function UserBadge() {
  const { user } = useUser();
  const { theme } = useTheme();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.85rem',
      }}>
        {user.name[0]}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user.name}</div>
        <div style={{
          fontSize: '0.65rem',
          color: user.plan === 'pro' ? '#f59e0b' : (theme === 'dark' ? '#94a3b8' : '#64748b'),
          fontWeight: 600,
        }}>
          {user.plan.toUpperCase()} plan
        </div>
      </div>
    </div>
  );
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="demo-btn active" onClick={toggleTheme} style={{ fontSize: '0.75rem' }}>
      {theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
    </button>
  );
}

// --- Provider wrapper for the demo ---
export default function ContextDemo() {
  const [theme, setTheme] = useState<AppTheme>('light');
  const [user, setUser] = useState<User>({ name: 'Alex', plan: 'free' });

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="demo-area">
          <h4 className="demo-title">Context API</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Two contexts (Theme + User) shared deep in the tree — no prop drilling!
          </p>

          <ThemedCard>
            <UserBadge />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Both components read from context independently.
            </div>
            <ThemeToggleButton />
          </ThemedCard>

          <div className="demo-section" style={{ marginTop: '0.75rem' }}>
            <p className="demo-label">Change user (updates UserContext):</p>
            <div className="demo-row">
              <input
                className="demo-input"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
              />
              <button
                className={`demo-btn ${user.plan === 'free' ? 'active' : ''}`}
                onClick={() => setUser({ ...user, plan: 'free' })}
              >
                Free
              </button>
              <button
                className={`demo-btn ${user.plan === 'pro' ? 'active' : ''}`}
                onClick={() => setUser({ ...user, plan: 'pro' })}
              >
                Pro
              </button>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
