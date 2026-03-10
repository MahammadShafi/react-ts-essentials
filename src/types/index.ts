export interface Topic {
  id: string;
  title: string;
  emoji: string;
  category: 'fundamentals' | 'hooks' | 'patterns';
  description: string;
  concepts: string[];
  codeExample: string;
  demo: React.ComponentType;
}

export interface Category {
  id: 'fundamentals' | 'hooks' | 'patterns';
  label: string;
}
