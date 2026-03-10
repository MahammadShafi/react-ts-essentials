import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id); // cleanup
  }, []); // empty deps = run once on mount

  return (
    <div style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>
      {time.toLocaleTimeString()}
    </div>
  );
}

interface Post {
  id: number;
  title: string;
  body: string;
}

function PostFetcher() {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPost(null);
    const controller = new AbortController();

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data: Post) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => controller.abort(); // cleanup on re-run
  }, [postId]); // runs whenever postId changes

  return (
    <div>
      <div className="demo-row">
        <label className="demo-label">Post ID: {postId}</label>
        <button className="demo-btn" onClick={() => setPostId((n) => Math.max(1, n - 1))} disabled={postId <= 1}>Prev</button>
        <button className="demo-btn active" onClick={() => setPostId((n) => Math.min(10, n + 1))} disabled={postId >= 10}>Next</button>
      </div>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '0.75rem',
        minHeight: '60px',
        fontSize: '0.8rem',
        marginTop: '0.5rem',
      }}>
        {loading && <span style={{ color: 'var(--text-muted)' }}>Loading...</span>}
        {post && (
          <>
            <strong>{post.title}</strong>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.4 }}>
              {post.body.slice(0, 100)}...
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function UseEffectDemo() {
  return (
    <div className="demo-area">
      <h4 className="demo-title">useEffect — Side Effects</h4>

      <div className="demo-section">
        <p className="demo-label">1. Timer — empty dependency array (mount only)</p>
        <Clock />
      </div>

      <div className="demo-section">
        <p className="demo-label">2. Data fetching — runs on dependency change</p>
        <PostFetcher />
      </div>
    </div>
  );
}
