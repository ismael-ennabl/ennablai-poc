/* Markdown-lite renderer: handles **bold**, `code`, headings, bullets, numbered lists */

function renderInline(text, keyPrefix = '') {
  // Split on **bold** and `code` while preserving them
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/);
  return parts.map((p, i) => {
    const key = keyPrefix + i;
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={key} className="font-semibold text-[#0a0a0a]">
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.startsWith('`') && p.endsWith('`')) {
      return (
        <code key={key} className="px-1 py-0.5 rounded bg-[#f5f5f5] text-[13px] text-[#0a0a0a] font-mono">
          {p.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={key}>{p}</React.Fragment>;
  });
}

function MarkdownBlock({ text }) {
  const lines = text.split('\n');
  const blocks = [];
  let currentList = null;
  const flush = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };
  for (const line of lines) {
    if (line.startsWith('### ')) {
      flush();
      blocks.push({ type: 'h3', text: line.slice(4) });
    } else if (line.startsWith('## ')) {
      flush();
      blocks.push({ type: 'h2', text: line.slice(3) });
    } else if (/^\d+\.\s/.test(line)) {
      if (!currentList || currentList.type !== 'ol') {
        flush();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(line.replace(/^\d+\.\s/, ''));
    } else if (line.startsWith('- ')) {
      if (!currentList || currentList.type !== 'ul') {
        flush();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(line.slice(2));
    } else if (line.trim() === '') {
      flush();
    } else {
      flush();
      blocks.push({ type: 'p', text: line });
    }
  }
  flush();

  return (
    <div className="text-[15px] leading-[1.65] text-[#262626] flex flex-col gap-3">
      {blocks.map((b, i) => {
        if (b.type === 'h2') return <h2 key={i} className="text-lg font-semibold text-[#0a0a0a] mt-1">{renderInline(b.text)}</h2>;
        if (b.type === 'h3') return <h3 key={i} className="text-[15px] font-semibold text-[#0a0a0a] mt-1">{renderInline(b.text)}</h3>;
        if (b.type === 'p') return <p key={i}>{renderInline(b.text)}</p>;
        if (b.type === 'ul')
          return (
            <ul key={i} className="flex flex-col gap-1.5 pl-5 list-disc marker:text-[#a3a3a3]">
              {b.items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
            </ul>
          );
        if (b.type === 'ol')
          return (
            <ol key={i} className="flex flex-col gap-1.5 pl-5 list-decimal marker:text-[#a3a3a3]">
              {b.items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
            </ol>
          );
        return null;
      })}
    </div>
  );
}

function UserMessage({ content }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] bg-[#e6edf9] text-[15px] text-[#0a0a0a] rounded-[18px] px-4 py-2.5 whitespace-pre-wrap leading-[1.5]">
        {content}
      </div>
    </div>
  );
}

function AssistantActions({ onRegenerate, onCopy }) {
  const [copied, setCopied] = React.useState(false);
  const [vote, setVote] = React.useState(null);
  const handleCopy = () => {
    onCopy && onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="flex items-center gap-0.5 -ml-1 mt-1 text-[#737373]">
      <button
        onClick={handleCopy}
        title="Copy"
        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors"
      >
        <Icon name={copied ? 'check' : 'copy'} size={15} />
      </button>
      <button
        onClick={onRegenerate}
        title="Regenerate"
        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors"
      >
        <Icon name="refresh-cw" size={15} />
      </button>
      <button
        onClick={() => setVote(vote === 'up' ? null : 'up')}
        title="Good response"
        className={`flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors ${
          vote === 'up' ? 'text-[#0a0a0a] bg-black/5' : ''
        }`}
      >
        <Icon name="thumbs-up" size={15} />
      </button>
      <button
        onClick={() => setVote(vote === 'down' ? null : 'down')}
        title="Bad response"
        className={`flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors ${
          vote === 'down' ? 'text-[#0a0a0a] bg-black/5' : ''
        }`}
      >
        <Icon name="thumbs-down" size={15} />
      </button>
    </div>
  );
}

function AssistantMessage({ content, status, onRegenerate, onCopy }) {
  const showThinking = status === 'streaming' && content.length === 0;
  const showCursor = status === 'streaming' && content.length > 0;
  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#deebf8] shrink-0 mt-px">
          <Icon name="sparkles" size={14} className="text-[#0a0a0a]" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          {showThinking ? (
            <div className="flex items-center gap-1.5 h-7 text-sm text-[#737373]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#737373] animate-pulse" />
              <span>Thinking…</span>
            </div>
          ) : (
            <div className="relative">
              <MarkdownBlock text={content} />
              {showCursor && (
                <span className="inline-block w-1.5 h-4 bg-[#0a0a0a] align-middle ml-0.5 animate-pulse" />
              )}
            </div>
          )}
        </div>
      </div>
      {status === 'complete' && (
        <div className="pl-10">
          <AssistantActions onRegenerate={onRegenerate} onCopy={onCopy} />
        </div>
      )}
    </div>
  );
}

function Chat({ chat, onSend, onRegenerate }) {
  const [message, setMessage] = React.useState('');
  const scrollRef = React.useRef(null);
  const messagesSig = chat.messages.map((m) => m.content.length + ':' + (m.status || '')).join('|');

  // Auto-scroll to bottom on new content
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messagesSig]);

  const send = () => {
    const t = message.trim();
    if (!t) return;
    onSend(t);
    setMessage('');
  };

  const copy = (text) => {
    try {
      navigator.clipboard && navigator.clipboard.writeText(text);
    } catch (e) {}
  };

  return (
    <div
      data-screen-label="Chat"
      className="flex flex-col flex-1 min-w-0 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 shrink-0">
        <h1 className="text-sm text-[#0a0a0a] font-medium truncate max-w-[60%]">{chat.title}</h1>
        <div className="flex items-center gap-1">
          <button
            title="Share"
            className="flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-sm text-[#0a0a0a] hover:bg-black/5 transition-colors"
          >
            <Icon name="share" size={14} />
            Share
          </button>
          <button
            title="More"
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors"
          >
            <Icon name="more-horizontal" size={16} className="text-[#0a0a0a]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto min-h-0">
        <div className="max-w-[768px] mx-auto px-6 pt-2 pb-6 flex flex-col gap-6">
          {chat.messages.map((m, i) =>
            m.role === 'user' ? (
              <UserMessage key={i} content={m.content} />
            ) : (
              <AssistantMessage
                key={i}
                content={m.content}
                status={m.status}
                onCopy={() => copy(m.content)}
                onRegenerate={() => onRegenerate(i)}
              />
            )
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="shrink-0 px-4 pb-6 pt-2">
        <div className="max-w-[768px] mx-auto">
          <Composer
            message={message}
            setMessage={setMessage}
            onSend={send}
            placeholder="Reply to ennabl AI…"
          />
          <p className="text-center text-[11px] text-[#a3a3a3] mt-2">
            ennabl AI can make mistakes. Verify against source documents before client use.
          </p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Chat, MarkdownBlock, UserMessage, AssistantMessage });
