const HOME_SUGGESTIONS = [
  'Find recent news on hospitality market appetite',
  "What's driving rate changes in commercial property right now?",
  'Draft a renewal recap one-pager',
  "Where's the cyber insurance market heading this year?",
];

const FAKE_LIBRARY_DOCS = [
  { title: '25-26 Acme Commercial Renewal Policy', type: 'pdf' },
  { title: '2026 Acme Commercial Audit Statement', type: 'xls' },
  { title: '25-26 Acme Commercial Application', type: 'pdf' },
  { title: 'Acme Manufacturing Loss Run Report 2024', type: 'xls' },
  { title: 'Acme Holdings Certificate of Insurance', type: 'pdf' },
];

function DocChip({ title, type, onRemove }) {
  const bg = type === 'pdf' ? '#FF5C4D' : type === 'xls' ? '#21A66B' : '#3b3b3b';
  return (
    <div className="relative w-[168px] h-14 rounded-lg border border-[#E5EDFA] bg-white p-2 flex items-center gap-2 shrink-0">
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center text-white text-[9px] font-bold shrink-0 tracking-wide"
        style={{ background: bg }}
      >
        {type.toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium text-[#1e1e1e] leading-4 truncate">{title}</div>
        <div className="text-[11px] text-[rgba(130,135,176,0.8)] leading-[14px] uppercase tracking-wide">
          {type}
        </div>
      </div>
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#3B3B3B] hover:bg-[#1E1E1E] text-white flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
        aria-label="Remove"
      >
        <Icon name="x" size={8} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function Composer({
  message,
  setMessage,
  onSend,
  autoFocus = false,
  placeholder = 'Ask a question about your data, your documents or any insurance topic.',
}) {
  const textareaRef = React.useRef(null);
  const docWrapRef = React.useRef(null);
  const [focused, setFocused] = React.useState(false);
  const [docMenuOpen, setDocMenuOpen] = React.useState(false);
  const [chips, setChips] = React.useState([]);

  React.useEffect(() => {
    if (autoFocus && textareaRef.current) textareaRef.current.focus();
  }, [autoFocus]);

  React.useEffect(() => {
    if (!docMenuOpen) return;
    const handler = (e) => {
      if (docWrapRef.current && !docWrapRef.current.contains(e.target)) {
        setDocMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setDocMenuOpen(false));
    return () => document.removeEventListener('mousedown', handler);
  }, [docMenuOpen]);

  const send = () => {
    if (!message.trim()) return;
    onSend();
    setChips([]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const addChip = () => {
    const next = FAKE_LIBRARY_DOCS[chips.length % FAKE_LIBRARY_DOCS.length];
    setChips((cs) => [...cs, next]);
    setDocMenuOpen(false);
  };

  const removeChip = (idx) => setChips((cs) => cs.filter((_, i) => i !== idx));

  const canSend = message.trim().length > 0;

  return (
    <div
      className={`bg-white border rounded-[16px] transition-colors ${
        focused ? 'border-[#0000C5]' : 'border-[#e0eaf9]'
      }`}
    >
      {/* Doc chips */}
      {chips.length > 0 && (
        <div className="px-3 pt-3 pb-1 flex gap-3 flex-wrap">
          {chips.map((c, i) => (
            <DocChip key={i} {...c} onRemove={() => removeChip(i)} />
          ))}
        </div>
      )}

      {/* Textarea */}
      <div className="px-5 pt-3 pb-1">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={2}
          className="w-full resize-none bg-transparent text-[15px] text-[#1e1e1e] placeholder-[rgba(130,135,176,0.8)] outline-none leading-[22px] max-h-[200px] overflow-auto"
          style={{ minHeight: '44px' }}
          onInput={(e) => {
            const t = e.currentTarget;
            t.style.height = 'auto';
            t.style.height = Math.min(Math.max(t.scrollHeight, 44), 200) + 'px';
          }}
        />
      </div>

      {/* Toolbar */}
      <div className="px-3 pb-3 flex items-center gap-2">
        <div className="relative" ref={docWrapRef}>
          <button
            onClick={() => setDocMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={docMenuOpen}
            className={`flex items-center gap-2 h-9 px-3.5 rounded-lg border transition-colors text-[13px] font-medium text-[#1e1e1e] whitespace-nowrap ${
              docMenuOpen
                ? 'border-[#0000C5] bg-[rgba(0,0,197,0.04)]'
                : 'border-[#8287B0] hover:bg-[rgba(0,0,197,0.04)] hover:border-[#0000C5]'
            }`}
          >
            <Icon name="plus" size={14} className="text-[#8287B0]" strokeWidth={2} />
            Add Documents
            <Icon name="chevron-down" size={12} className="text-[#8287B0]" strokeWidth={2.5} />
          </button>

          {docMenuOpen && (
            <div
              role="menu"
              className="absolute top-[calc(100%+6px)] left-0 min-w-[240px] bg-white rounded-[12px] border border-[#e0eaf9] shadow-[0_12px_28px_-8px_rgba(27,35,55,0.18),0_3px_8px_-4px_rgba(27,35,55,0.08)] p-2 flex flex-col gap-1 z-20"
            >
              <button
                onClick={addChip}
                className="flex items-center gap-3 w-full h-8 px-3 rounded-lg text-sm text-[#1e1e1e] hover:bg-[rgba(0,0,197,0.04)] transition-colors text-left"
              >
                <Icon name="file-text" size={16} className="text-[#3b3b3b]" />
                From Documents Library
              </button>
              <button
                onClick={addChip}
                className="flex items-center gap-3 w-full h-8 px-3 rounded-lg text-sm text-[#1e1e1e] hover:bg-[rgba(0,0,197,0.04)] transition-colors text-left"
              >
                <Icon name="upload" size={16} className="text-[#3b3b3b]" />
                Upload from Computer
              </button>
            </div>
          )}
        </div>

        <button
          onClick={send}
          disabled={!canSend}
          aria-label="Send"
          title="Send"
          className={`ml-auto flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
            canSend
              ? 'bg-[#0000C5] hover:bg-[#000093] text-white'
              : 'bg-[#e0eaf9] text-[#9B9FC0] cursor-default'
          }`}
        >
          <Icon name="arrow-up" size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function Home({ onSend }) {
  const [message, setMessage] = React.useState('');

  const send = (text) => {
    const t = (text ?? message).trim();
    if (!t) return;
    onSend(t);
    setMessage('');
  };

  return (
    <div
      data-screen-label="Home"
      className="flex flex-col flex-1 items-center justify-center min-w-0 pb-16 px-4"
    >
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-[#1e1e1e] tracking-tight pb-6">
        What can I help you with?
      </h2>

      {/* Chat input */}
      <div className="w-full max-w-[672px] mb-4">
        <Composer message={message} setMessage={setMessage} onSend={() => send()} autoFocus />
      </div>

      {/* Suggestion chips */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-[672px]">
        {HOME_SUGGESTIONS.map((text) => (
          <button
            key={text}
            onClick={() => send(text)}
            className="bg-white border border-[#e0eaf9] rounded-[14px] px-4 py-3 text-sm text-[#1e1e1e] text-left hover:bg-[rgba(0,0,197,0.04)] hover:border-[#0000C5]/40 transition-colors leading-[1.375]"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Home, Composer, DocChip, HOME_SUGGESTIONS, FAKE_LIBRARY_DOCS });
