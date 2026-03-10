import { Topic } from '../types';
import CodeBlock from './CodeBlock';

interface TopicViewerProps {
  topic: Topic;
  topicIndex: number;
  totalTopics: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function TopicViewer({ topic, topicIndex, totalTopics, onPrev, onNext }: TopicViewerProps) {
  const Demo = topic.demo;

  return (
    <main className="viewer">
      {/* Header */}
      <div className="viewer-header">
        <div className="viewer-title-row">
          <span className="viewer-emoji">{topic.emoji}</span>
          <div>
            <h1 className="viewer-title">{topic.title}</h1>
            <span className="viewer-badge">{topic.category}</span>
          </div>
        </div>

        <div className="viewer-nav-btns">
          <button className="nav-arrow" onClick={onPrev} disabled={topicIndex === 0}>
            ← Prev
          </button>
          <span className="viewer-count">{topicIndex + 1} / {totalTopics}</span>
          <button className="nav-arrow active" onClick={onNext} disabled={topicIndex === totalTopics - 1}>
            Next →
          </button>
        </div>
      </div>

      {/* Content grid */}
      <div className="viewer-grid">
        {/* Left column: explanation */}
        <div className="viewer-left">
          <section className="content-section">
            <h2 className="section-heading">Overview</h2>
            <p className="section-text">{topic.description}</p>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Key Concepts</h2>
            <ul className="concept-list">
              {topic.concepts.map((c, i) => (
                <li key={i} className="concept-item">
                  <span className="concept-bullet">→</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section className="content-section">
            <h2 className="section-heading">Code Example</h2>
            <CodeBlock code={topic.codeExample} />
          </section>
        </div>

        {/* Right column: interactive demo */}
        <div className="viewer-right">
          <section className="content-section demo-section-wrap">
            <h2 className="section-heading">
              <span className="live-dot" /> Live Demo
            </h2>
            <Demo />
          </section>
        </div>
      </div>
    </main>
  );
}
