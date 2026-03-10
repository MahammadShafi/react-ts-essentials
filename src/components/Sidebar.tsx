import { Topic, Category } from '../types';

interface SidebarProps {
  topics: Topic[];
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ topics, categories, activeId, onSelect, isOpen, onClose }: SidebarProps) {
  const progress = topics.filter((t) => t.id === activeId || topics.indexOf(t) < topics.findIndex((x) => x.id === activeId)).length;

  const handleSelect = (id: string) => {
    onSelect(id);
    onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">⚛</span>
            <div>
              <div className="logo-title">React Essentials</div>
              <div className="logo-sub">Interactive Learning</div>
            </div>
          </div>

          <div className="progress-bar-wrap">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${(progress / topics.length) * 100}%` }}
              />
            </div>
            <span className="progress-label">{progress}/{topics.length} topics</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {categories.map((cat) => (
            <div key={cat.id} className="nav-section">
              <div className="nav-section-label">{cat.label}</div>
              {topics
                .filter((t) => t.category === cat.id)
                .map((topic) => {
                  const visited = topics.indexOf(topic) <= topics.findIndex((x) => x.id === activeId);
                  return (
                    <button
                      key={topic.id}
                      className={`nav-item ${activeId === topic.id ? 'active' : ''} ${visited ? 'visited' : ''}`}
                      onClick={() => handleSelect(topic.id)}
                    >
                      <span className="nav-emoji">{topic.emoji}</span>
                      <span className="nav-label">{topic.title}</span>
                      {visited && activeId !== topic.id && (
                        <span className="nav-check">✓</span>
                      )}
                    </button>
                  );
                })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span>React 19 · TypeScript 5 · Vite 6</span>
        </div>
      </aside>
    </>
  );
}
