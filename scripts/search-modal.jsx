function SearchModal({ chats, onClose, onOpenChat, onNewChat }) {
  const [query, setQuery] = React.useState('');
  const filtered = chats.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-[#e5e5e5] rounded-[10px] w-[576px] overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 h-12 px-4 border-b border-[#e5e5e5]">
          <Icon name="search" size={16} className="text-[#737373] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats…"
            autoFocus
            className="flex-1 text-sm text-[#0a0a0a] placeholder-[#737373] outline-none"
          />
          <button
            onClick={onClose}
            className="flex items-center justify-center w-4 h-4 shrink-0 hover:opacity-70 transition-opacity"
          >
            <Icon name="x" size={16} className="text-[#737373]" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2 max-h-[420px] overflow-auto">
          <button
            onClick={onNewChat}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg bg-[rgba(245,245,245,0.5)] hover:bg-[#f5f5f5] transition-colors text-left"
          >
            <Icon name="square-pen" size={16} className="text-[#0a0a0a] shrink-0" />
            <span className="text-sm text-[#0a0a0a]">New chat</span>
          </button>

          {chats.length === 0 ? (
            <div className="flex items-center justify-center py-6">
              <span className="text-xs text-[#737373]">No chats yet</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-6">
              <span className="text-xs text-[#737373]">No chats match "{query}"</span>
            </div>
          ) : (
            <>
              <div className="px-3 pt-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-[#737373]">
                Recents
              </div>
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onOpenChat(c.id)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-[#f5f5f5] transition-colors text-left"
                >
                  <Icon name="message-square" size={16} className="text-[#737373] shrink-0" />
                  <span className="text-sm text-[#0a0a0a] truncate">{c.title}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SearchModal });
