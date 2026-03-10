import { useState } from 'react';
import { topics, categories } from './data/topics';
import Sidebar from './components/Sidebar';
import TopicViewer from './components/TopicViewer';

export default function App() {
  const [activeId, setActiveId] = useState(topics[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeIndex = topics.findIndex((t) => t.id === activeId);
  const activeTopic = topics[activeIndex];

  const goTo = (id: string) => setActiveId(id);
  const goPrev = () => activeIndex > 0 && setActiveId(topics[activeIndex - 1].id);
  const goNext = () => activeIndex < topics.length - 1 && setActiveId(topics[activeIndex + 1].id);

  return (
    <div className="app">
      <Sidebar
        topics={topics}
        categories={categories}
        activeId={activeId}
        onSelect={goTo}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-content">
        {/* Mobile top bar */}
        <div className="mobile-bar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <span className="mobile-title">
            {activeTopic.emoji} {activeTopic.title}
          </span>
        </div>

        <TopicViewer
          topic={activeTopic}
          topicIndex={activeIndex}
          totalTopics={topics.length}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    </div>
  );
}
