function SidebarNavButton({ icon, label, active, collapsed, onClick }) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-2 w-full h-8 px-2 rounded-lg text-sm transition-colors text-left whitespace-nowrap ${
        active ? 'bg-[rgba(222,235,248,0.6)] text-[#0a0a0a]' : 'text-[#0a0a0a] hover:bg-black/5'
      }`}
    >
      <Icon name={icon} size={16} className="shrink-0" />
      <span
        className={`min-w-0 transition-opacity duration-150 ${
          collapsed ? 'opacity-0' : 'opacity-100 delay-150'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function Sidebar({
  activePage,
  activeChatId,
  chats,
  onNavigate,
  onSearchOpen,
  onOpenChat,
  onLogout,
  collapsed,
  onToggleCollapse,
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);
  return (
    <aside
      data-screen-label="Sidebar"
      style={{ width: collapsed ? 60 : 260 }}
      className="flex flex-col h-full shrink-0 bg-white shadow-[1px_0px_0px_0px_rgba(30,36,56,0.07)] overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
    >
      {/* Header */}
      <div className="flex items-center h-14 px-3 shrink-0 gap-2">
        <div
          className={`flex-1 min-w-0 transition-opacity duration-150 ${
            collapsed ? 'opacity-0' : 'opacity-100 delay-150'
          }`}
        >
          <img src="public/assets/logo.svg" alt="ennabl AI" className="h-5 w-auto" />
        </div>
        <button
          onClick={onToggleCollapse}
          title={collapsed ? 'Open sidebar' : 'Close sidebar'}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors"
        >
          <Icon
            name="panel-left-close"
            size={16}
            className={`text-[#0a0a0a] transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Nav buttons */}
      <div className="flex flex-col gap-0.5 px-2 pb-2 pt-1 shrink-0">
        <SidebarNavButton
          icon="square-pen"
          label="New chat"
          collapsed={collapsed}
          onClick={() => onNavigate('home')}
        />
        <SidebarNavButton
          icon="search"
          label="Search chats"
          collapsed={collapsed}
          onClick={onSearchOpen}
        />
        <SidebarNavButton
          icon="book-marked"
          label="Library"
          active={activePage === 'library'}
          collapsed={collapsed}
          onClick={() => onNavigate('library')}
        />
      </div>

      {/* Chat list */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-hidden min-h-0 transition-opacity duration-150 ${
          collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-150'
        }`}
      >
        {chats.length === 0 ? (
          <div className="flex items-center justify-center py-6 px-3">
            <span className="text-xs text-[#737373]">No chats found</span>
          </div>
        ) : (
          <div className="px-2 pt-2 min-w-[244px]">
            <div className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-[#737373]">
              Recents
            </div>
            <div className="flex flex-col gap-px">
              {chats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onOpenChat(c.id)}
                  title={c.title}
                  className={`flex w-full px-2 py-1.5 rounded-lg text-sm transition-colors text-left ${
                    activePage === 'chat' && activeChatId === c.id
                      ? 'bg-[rgba(222,235,248,0.6)] text-[#0a0a0a]'
                      : 'text-[#0a0a0a] hover:bg-black/5'
                  }`}
                >
                  <span className="truncate">{c.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#e5e5e5] shrink-0" />

      {/* User */}
      <div className="p-2 shrink-0 relative" ref={menuRef}>
        {menuOpen && (
          <div
            className="absolute left-2 right-2 bottom-[58px] bg-white rounded-[10px] border border-[#e0eaf9] shadow-[0_12px_28px_-8px_rgba(27,35,55,0.18),0_3px_8px_-4px_rgba(27,35,55,0.08)] p-1 z-30"
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                onLogout && onLogout();
              }}
              className="flex items-center gap-2.5 w-full px-3 h-9 rounded-lg text-sm text-[#1e1e1e] hover:bg-[rgba(0,0,197,0.04)] transition-colors text-left"
            >
              <Icon name="log-out" size={16} className="text-[#3b3b3b]" />
              Log out
            </button>
          </div>
        )}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          title={collapsed ? 'Ismael Viejo' : undefined}
          className={`flex items-center gap-2.5 w-full p-2 rounded-lg transition-colors whitespace-nowrap ${
            menuOpen ? 'bg-[rgba(0,0,197,0.04)]' : 'hover:bg-black/5'
          }`}
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#deebf8] overflow-hidden shrink-0">
            <img
              src="public/assets/avatar.png"
              alt="Ismael Viejo"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`flex-1 min-w-0 text-left transition-opacity duration-150 ${
              collapsed ? 'opacity-0' : 'opacity-100 delay-150'
            }`}
          >
            <p className="text-xs font-medium text-[#0a0a0a] leading-4 truncate">Ismael Viejo</p>
            <p className="text-xs text-[#737373] leading-4 truncate">iviejo@ennabl.com</p>
          </div>
          <Icon
            name="chevrons-up-down"
            size={14}
            className={`text-[#737373] shrink-0 transition-opacity duration-150 ${
              collapsed ? 'opacity-0' : 'opacity-100 delay-150'
            }`}
          />
        </button>
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar });
