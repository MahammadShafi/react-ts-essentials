import { Topic } from '../types';
import JsxDemo from '../components/demos/JsxDemo';
import ComponentsDemo from '../components/demos/ComponentsDemo';
import PropsDemo from '../components/demos/PropsDemo';
import UseStateDemo from '../components/demos/UseStateDemo';
import UseEffectDemo from '../components/demos/UseEffectDemo';
import EventsDemo from '../components/demos/EventsDemo';
import ListsDemo from '../components/demos/ListsDemo';
import ConditionalDemo from '../components/demos/ConditionalDemo';
import UseRefDemo from '../components/demos/UseRefDemo';
import CustomHooksDemo from '../components/demos/CustomHooksDemo';
import ContextDemo from '../components/demos/ContextDemo';
import TypeScriptDemo from '../components/demos/TypeScriptDemo';

export const topics: Topic[] = [
  {
    id: 'jsx',
    title: 'JSX & TSX',
    emoji: '⚡',
    category: 'fundamentals',
    description:
      'JSX (JavaScript XML) lets you write HTML-like syntax directly in TypeScript. Vite compiles .tsx files so React knows how to render them. Expressions are embedded with curly braces {}, and the result is a virtual DOM description.',
    concepts: [
      'JSX is syntactic sugar for React.createElement()',
      'Use {} to embed any JS/TS expression',
      'className instead of class, htmlFor instead of for',
      'Every JSX element must have a single root (or <>…</>)',
      'Self-closing tags must end with />',
    ],
    codeExample: `// JsxDemo.tsx
function Greeting({ name }: { name: string }) {
  const items = ['React', 'TypeScript', 'Vite'];

  return (
    <>
      <h1>Hello, {name}!</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}`,
    demo: JsxDemo,
  },
  {
    id: 'components',
    title: 'Components',
    emoji: '🧩',
    category: 'fundamentals',
    description:
      'Components are the building blocks of React UIs. A functional component is just a TypeScript function that returns JSX. Components can be composed together, creating a tree of reusable UI pieces.',
    concepts: [
      'Functions that return JSX are components',
      'Components must be capitalized: <MyComponent />',
      'Break complex UIs into small, focused components',
      'Children prop lets you pass JSX between tags',
      'Components can import and use other components',
    ],
    codeExample: `// Reusable Badge component with TypeScript
interface BadgeProps {
  label: string;
  color: string;
}

function Badge({ label, color }: BadgeProps) {
  return (
    <span style={{ background: color, color: '#fff' }}>
      {label}
    </span>
  );
}

// Composed in Card
function Card({ title, tag }: CardProps) {
  return (
    <div>
      <strong>{title}</strong>
      <Badge label={tag} color="#3178c6" />
    </div>
  );
}`,
    demo: ComponentsDemo,
  },
  {
    id: 'props',
    title: 'Props & Interfaces',
    emoji: '🎁',
    category: 'fundamentals',
    description:
      'Props are the inputs to a component — they flow down from parent to child. TypeScript interfaces define the shape of props, giving you autocomplete and type errors when props are wrong or missing.',
    concepts: [
      'Props are read-only — never mutate them',
      'Define prop types with interface or type',
      'Optional props use ? (e.g. label?: string)',
      'Provide default values with destructuring defaults',
      'Spread props with {...props} when forwarding',
    ],
    codeExample: `interface AvatarProps {
  name: string;       // required
  role: string;       // required
  level: number;      // required
  online?: boolean;   // optional (defaults to false)
}

function Avatar({ name, role, level, online = false }: AvatarProps) {
  return (
    <div>
      <strong>{name}</strong>
      <span>{role} · Level {level}</span>
      {online && <span>🟢 Online</span>}
    </div>
  );
}

// Usage — TypeScript catches missing/wrong props:
<Avatar name="Jane" role="Engineer" level={5} online />`,
    demo: PropsDemo,
  },
  {
    id: 'usestate',
    title: 'useState',
    emoji: '🔄',
    category: 'hooks',
    description:
      'useState is the most fundamental React hook. It adds reactive state to a component — when state changes, React re-renders the component with the new value. TypeScript infers or lets you annotate the state type.',
    concepts: [
      'Returns [value, setter] — always destructure',
      'The setter can take a new value or an updater function',
      'Use updater (prev => ...) for updates based on previous state',
      'State updates are batched and asynchronous',
      'Each component instance has its own state',
    ],
    codeExample: `import { useState } from 'react';

// TypeScript infers number from initial value 0
const [count, setCount] = useState(0);

// Explicit type annotation for union types
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// Array state — use spread to avoid mutation
const [items, setItems] = useState<string[]>([]);

// Add item (functional update)
setItems(prev => [...prev, 'new item']);

// Remove item by index
setItems(prev => prev.filter((_, i) => i !== index));`,
    demo: UseStateDemo,
  },
  {
    id: 'useeffect',
    title: 'useEffect',
    emoji: '⏱',
    category: 'hooks',
    description:
      'useEffect handles side effects — things that happen outside of rendering, like timers, data fetching, subscriptions, or DOM mutations. The dependency array controls when the effect re-runs.',
    concepts: [
      '[] = run once on mount, cleanup on unmount',
      '[dep] = run on mount + whenever dep changes',
      'No array = run after every render (rare)',
      'Return a cleanup function to prevent memory leaks',
      'Fetch inside useEffect with AbortController for cleanup',
    ],
    codeExample: `import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Side effect: start an interval
    const id = setInterval(() => setTime(new Date()), 1000);

    // Cleanup: clear interval when component unmounts
    return () => clearInterval(id);
  }, []); // [] = run once on mount

  return <div>{time.toLocaleTimeString()}</div>;
}`,
    demo: UseEffectDemo,
  },
  {
    id: 'events',
    title: 'Event Handling',
    emoji: '🖱',
    category: 'fundamentals',
    description:
      'React wraps native browser events in SyntheticEvents for consistency. TypeScript provides specific event types for each element and event combination, so you always know what properties are available.',
    concepts: [
      'Handlers are camelCase: onClick, onChange, onSubmit',
      'TypeScript: MouseEvent, KeyboardEvent, ChangeEvent, FormEvent',
      'Always call e.preventDefault() to stop form page reload',
      'Pass handlers as props without calling them: onClick={handler}',
      'e.target.value for input value, e.key for keyboard key',
    ],
    codeExample: `import { MouseEvent, ChangeEvent, FormEvent } from 'react';

// MouseEvent on a div
const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  console.log('x:', e.clientX, 'y:', e.clientY);
};

// ChangeEvent on an input
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// FormEvent on a form
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // stop page reload
  submitData();
};`,
    demo: EventsDemo,
  },
  {
    id: 'lists',
    title: 'Lists & Keys',
    emoji: '📋',
    category: 'fundamentals',
    description:
      'Rendering lists in React uses .map() to transform arrays into JSX. The key prop is required — it helps React efficiently update only the items that changed, rather than re-rendering the entire list.',
    concepts: [
      'Use .map() to render arrays of JSX',
      'key must be unique among siblings',
      'Use stable IDs, not array indices (when items can reorder)',
      'Keys are not passed as props — they\'re React-internal',
      'Filter + sort before mapping for clean code',
    ],
    codeExample: `interface Developer {
  id: number;
  name: string;
  lang: string;
}

function DevList({ devs }: { devs: Developer[] }) {
  return (
    <ul>
      {devs
        .filter(d => d.lang !== 'COBOL')    // filter first
        .sort((a, b) => a.name.localeCompare(b.name)) // then sort
        .map((dev) => (
          // key must be stable and unique
          <li key={dev.id}>
            {dev.name} — {dev.lang}
          </li>
        ))}
    </ul>
  );
}`,
    demo: ListsDemo,
  },
  {
    id: 'conditional',
    title: 'Conditional Rendering',
    emoji: '🔀',
    category: 'fundamentals',
    description:
      'React components can conditionally render JSX using standard JavaScript/TypeScript operators. There\'s no special directive — just ternary expressions, && short-circuits, or switch statements.',
    concepts: [
      'Ternary for if/else: condition ? <A /> : <B />',
      '&& for optional: condition && <A /> (returns null when false)',
      'Null/undefined renders nothing — useful for empty states',
      'Extract complex conditions into variables for clarity',
      'Discriminated unions + switch = exhaustive rendering',
    ],
    codeExample: `// 1. Ternary (if/else)
{isLoggedIn ? <Dashboard /> : <LoginPage />}

// 2. && short-circuit (only renders when true)
{hasError && <ErrorBanner message={error} />}

// 3. Early return
if (isLoading) return <Spinner />;
if (error) return <Error message={error} />;
return <Data items={items} />;

// 4. Status-based (discriminated union)
{status === 'loading' && <Spinner />}
{status === 'success' && <Results data={data} />}
{status === 'error' && <ErrorMessage />}`,
    demo: ConditionalDemo,
  },
  {
    id: 'useref',
    title: 'useRef',
    emoji: '📌',
    category: 'hooks',
    description:
      'useRef gives you a mutable container (.current) that persists across renders without triggering re-renders. Use it for DOM access, storing previous values, or holding mutable data like interval IDs.',
    concepts: [
      'ref.current persists but changing it won\'t re-render',
      'Attach to elements with ref={myRef}',
      'TypeScript: useRef<HTMLInputElement>(null)',
      'Perfect for storing interval/timeout IDs',
      'Access previous render values by updating in useEffect',
    ],
    codeExample: `import { useRef, useEffect } from 'react';

function Component() {
  // DOM access — typed as the element type
  const inputRef = useRef<HTMLInputElement>(null);

  // Mutable value — no re-render on change
  const clickCount = useRef(0);

  // Interval ID — cleared on unmount
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const focus = () => inputRef.current?.focus();

  return <input ref={inputRef} />;
}`,
    demo: UseRefDemo,
  },
  {
    id: 'customhooks',
    title: 'Custom Hooks',
    emoji: '🪝',
    category: 'hooks',
    description:
      'Custom hooks are plain TypeScript functions that start with "use" and can call other hooks. They\'re the primary way to extract, share, and reuse stateful logic between components.',
    concepts: [
      'Must start with "use" — React enforces this convention',
      'Can call other hooks (useState, useEffect, etc.)',
      'Return whatever the component needs (values, setters, handlers)',
      'Stateful logic per component instance — not shared state',
      'Enable clean separation of concerns',
    ],
    codeExample: `// Custom hook: useLocalStorage
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  const setStored = (v: T) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, setStored] as const;
}

// Usage in any component
const [name, setName] = useLocalStorage('name', 'World');`,
    demo: CustomHooksDemo,
  },
  {
    id: 'context',
    title: 'Context API',
    emoji: '🌐',
    category: 'patterns',
    description:
      'Context lets you share data across any depth of the component tree without passing props manually at every level (prop drilling). It\'s ideal for global state like themes, auth, or locale.',
    concepts: [
      'createContext<T>(defaultValue) creates the context',
      'Provider wraps the tree that needs the data',
      'useContext(MyCtx) reads the nearest Provider value',
      'Re-renders consumers when context value changes',
      'TypeScript: type the context value with createContext<T>',
    ],
    codeExample: `interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 1. Create
const ThemeContext = createContext<ThemeContextValue | null>(null);

// 2. Provide (at a parent level)
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  <App />
</ThemeContext.Provider>

// 3. Consume (anywhere in the tree)
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)!;
  return <button onClick={toggleTheme}>{theme}</button>;
}`,
    demo: ContextDemo,
  },
  {
    id: 'typescript',
    title: 'TypeScript Patterns',
    emoji: '🔷',
    category: 'patterns',
    description:
      'TypeScript supercharges React by catching bugs at compile time. Key patterns include discriminated unions for exhaustive type checking, generics for reusable components, and utility types like Partial, Pick, and Omit.',
    concepts: [
      'Discriminated unions: type Shape = Circle | Rect | Triangle',
      'Generic components: function Select<T>({...}: Props<T>)',
      'Utility types: Partial<T>, Required<T>, Pick<T, K>, Omit<T, K>',
      'Type narrowing with typeof, instanceof, or "kind" checks',
      'as const for readonly tuple returns from hooks',
    ],
    codeExample: `// Discriminated union — exhaustive with switch
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'rectangle': return shape.width * shape.height;
    // TypeScript errors if a case is missing!
  }
}

// Generic component — infers T from options
function Select<T extends string | number>({
  options, value, onChange,
}: {
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
}) { ... }`,
    demo: TypeScriptDemo,
  },
];

export const categories = [
  { id: 'fundamentals' as const, label: 'Fundamentals' },
  { id: 'hooks' as const, label: 'Hooks' },
  { id: 'patterns' as const, label: 'Patterns' },
];
