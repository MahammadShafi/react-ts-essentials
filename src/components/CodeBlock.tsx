import { useState } from 'react';

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Very lightweight syntax highlighting via regex replacements
  const highlight = (raw: string): string => {
    return raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // strings
      .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="tok-str">$1</span>')
      // keywords
      .replace(
        /\b(import|export|from|default|function|return|const|let|var|if|else|switch|case|new|typeof|instanceof|interface|type|extends|implements|as|readonly|null|undefined|true|false|void|async|await|for|of|in)\b/g,
        '<span class="tok-kw">$1</span>',
      )
      // types (capitalized words not at start of JSX)
      .replace(/\b([A-Z][a-zA-Z]+)\b(?!&gt;|&lt;)/g, '<span class="tok-type">$1</span>')
      // comments
      .replace(/(\/\/.*)/g, '<span class="tok-comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>');
  };

  const lines = code.trim().split('\n');

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">TypeScript</span>
        <button className="copy-btn" onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="code-body">
        <div className="line-numbers">
          {lines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre
          className="code-pre"
          dangerouslySetInnerHTML={{
            __html: lines.map((l) => highlight(l)).join('\n'),
          }}
        />
      </div>
    </div>
  );
}
