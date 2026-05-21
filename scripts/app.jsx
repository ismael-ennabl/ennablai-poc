function App() {
  // Boot flow: 'boot' (spinner) → 'terms' → 'ready' (full app) | 'logged-out'.
  // Triggered on every page load (reload) per spec.
  const [stage, setStage] = React.useState('boot');

  React.useEffect(() => {
    if (stage !== 'boot') return;
    const t = setTimeout(() => setStage('terms'), 5000);
    return () => clearTimeout(t);
  }, [stage]);

  const [activePage, setActivePage] = React.useState('home'); // 'home' | 'library' | 'chat'
  const [hasFiles, setHasFiles] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [chats, setChats] = React.useState([]); // [{id, title, messages: [{role, content, status}]}]
  const [activeChatId, setActiveChatId] = React.useState(null);

  // Track in-flight streaming timers per chat so regenerate / nav doesn't leak
  const timersRef = React.useRef({});

  React.useEffect(() => () => {
    Object.values(timersRef.current).forEach((t) => clearInterval(t));
  }, []);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const truncateTitle = (text) => {
    const t = text.replace(/\s+/g, ' ').trim();
    return t.length > 48 ? t.slice(0, 46) + '…' : t;
  };

  function streamInto(chatId, fullText) {
    // Clear any existing timer for this chat
    if (timersRef.current[chatId]) {
      clearInterval(timersRef.current[chatId]);
    }

    let position = 0;
    // 600ms "thinking" delay before chars start appearing
    const thinkingDelay = setTimeout(() => {
      const timer = setInterval(() => {
        const chunk = Math.floor(Math.random() * 5) + 3; // 3-7 chars per tick
        position = Math.min(position + chunk, fullText.length);
        const done = position >= fullText.length;

        setChats((cs) =>
          cs.map((c) => {
            if (c.id !== chatId) return c;
            const msgs = c.messages.slice();
            const lastIdx = msgs.length - 1;
            const last = msgs[lastIdx];
            if (!last || last.role !== 'assistant') return c;
            msgs[lastIdx] = {
              ...last,
              content: fullText.slice(0, position),
              status: done ? 'complete' : 'streaming',
            };
            return { ...c, messages: msgs };
          })
        );

        if (done) {
          clearInterval(timer);
          delete timersRef.current[chatId];
        }
      }, 22);
      timersRef.current[chatId] = timer;
    }, 600);

    // Track the timeout too so cancel works during the thinking phase
    timersRef.current[chatId] = thinkingDelay;
  }

  function handleSend(text) {
    if (!text || !text.trim()) return;
    const responseText = pickResponse(text);

    if (activePage !== 'chat' || !activeChat) {
      // Start a new chat
      const id = 'c' + Date.now();
      const newChat = {
        id,
        title: truncateTitle(text),
        messages: [
          { role: 'user', content: text },
          { role: 'assistant', content: '', status: 'streaming' },
        ],
      };
      setChats((cs) => [newChat, ...cs]);
      setActiveChatId(id);
      setActivePage('chat');
      streamInto(id, responseText);
    } else {
      // Append to active chat
      setChats((cs) =>
        cs.map((c) =>
          c.id === activeChat.id
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { role: 'user', content: text },
                  { role: 'assistant', content: '', status: 'streaming' },
                ],
              }
            : c
        )
      );
      streamInto(activeChat.id, responseText);
    }
  }

  function handleRegenerate(msgIdx) {
    if (!activeChat) return;
    // Find the user message immediately preceding this assistant message
    const userMsg = activeChat.messages[msgIdx - 1];
    if (!userMsg || userMsg.role !== 'user') return;
    const responseText = pickResponse(userMsg.content);

    // Reset the assistant message to empty + streaming
    setChats((cs) =>
      cs.map((c) => {
        if (c.id !== activeChat.id) return c;
        const msgs = c.messages.slice();
        msgs[msgIdx] = { role: 'assistant', content: '', status: 'streaming' };
        return { ...c, messages: msgs };
      })
    );
    streamInto(activeChat.id, responseText);
  }

  function navigate(page) {
    setActivePage(page);
    setSearchOpen(false);
    if (page === 'home') setActiveChatId(null);
  }

  function openChat(id) {
    setActiveChatId(id);
    setActivePage('chat');
    setSearchOpen(false);
  }

  return (
    <div className="flex h-full font-sans relative" style={{ background: '#f7f9fd' }}>
      {stage === 'boot' && <BootSpinner />}
      {stage === 'terms' && <TermsScreen onAccept={() => setStage('ready')} />}
      {stage === 'logged-out' && (
        <LoggedOutHome
          onLogin={() => setStage('ready')}
          onSignup={() => setStage('ready')}
        />
      )}
      {stage === 'ready' && (
        <React.Fragment>
          <Sidebar
        activePage={activePage}
        activeChatId={activeChatId}
        chats={chats}
        onNavigate={navigate}
        onSearchOpen={() => {
          setSearchOpen(true);
        }}
        onOpenChat={openChat}
        onLogout={() => setStage('logged-out')}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
      />

      <main className="flex flex-1 min-w-0 h-full overflow-hidden relative">
        <div className="absolute top-3 right-4 z-10">
          <button
            onClick={() => setAboutOpen(true)}
            className="text-xs font-medium text-[#4b5168] px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors"
          >
            About Ennabl AI
          </button>
        </div>

        {activePage === 'home' && <Home onSend={handleSend} />}
        {activePage === 'library' && (
          <Library
            hasFiles={hasFiles}
            onFilesUploaded={() => setHasFiles(true)}
            onChatWithFile={(file) =>
              handleSend(`Summarize the key terms and exposures in ${file.name}.`)
            }
          />
        )}
        {activePage === 'chat' && activeChat && (
          <Chat chat={activeChat} onSend={handleSend} onRegenerate={handleRegenerate} />
        )}
        {activePage === 'chat' && !activeChat && (
          <div className="flex items-center justify-center flex-1 text-sm text-[#737373]">
            No chat selected.
          </div>
        )}
      </main>

      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40" style={{backdropFilter:'blur(4px)'}} onClick={() => setAboutOpen(false)} />
          <div className="relative flex flex-col w-full bg-white rounded-2xl shadow-2xl overflow-hidden" style={{maxWidth:'1100px', height:'92vh'}}>
            <div className="flex items-center justify-between px-5 shrink-0" style={{borderBottom:'1px solid #e5e5e5', height:'48px'}}>
              <span className="text-sm font-semibold text-[#0a0a0a]">About ennabl AI</span>
              <button
                onClick={() => setAboutOpen(false)}
                className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-black/5 transition-colors text-[#0a0a0a]"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe src="about.html" style={{width:'100%',height:'100%',border:'none'}} title="About ennabl AI" />
            </div>
          </div>
        </div>
      )}
        </React.Fragment>
      )}

      {stage === 'ready' && searchOpen && (
        <SearchModal
          chats={chats}
          onClose={() => setSearchOpen(false)}
          onOpenChat={openChat}
          onNewChat={() => {
            setSearchOpen(false);
            navigate('home');
          }}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
