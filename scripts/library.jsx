const INITIAL_FILES = [
  { name: 'policy1 copy.pdf', modified: 'Today', modifiedTs: Date.now() - 1_000 * 60 * 30, size: '3.0 MB', sizeBytes: 3 * 1024 * 1024 },
  { name: 'test_wc (2) copy.pdf', modified: 'Today', modifiedTs: Date.now() - 1_000 * 60 * 90, size: '1.7 MB', sizeBytes: 1.7 * 1024 * 1024 },
  { name: 'test_auto (2) copy.pdf', modified: 'Today', modifiedTs: Date.now() - 1_000 * 60 * 200, size: '354.6 KB', sizeBytes: 354.6 * 1024 },
  { name: 'test_gl_cert (1) copy.pdf', modified: 'Today', modifiedTs: Date.now() - 1_000 * 60 * 320, size: '48.7 KB', sizeBytes: 48.7 * 1024 },
  { name: 'pxf.pdf', modified: 'Today', modifiedTs: Date.now() - 1_000 * 60 * 480, size: '151.4 KB', sizeBytes: 151.4 * 1024 },
];

function SortIcon({ dir }) {
  if (dir === 'asc') {
    return <Icon name="arrow-up" size={14} strokeWidth={2.2} />;
  }
  if (dir === 'desc') {
    return <Icon name="arrow-down" size={14} strokeWidth={2.2} />;
  }
  return <Icon name="chevrons-up-down" size={14} strokeWidth={2} />;
}

function SortableTh({ label, sortKey, sort, onToggle, width, className = '' }) {
  const active = sort.key === sortKey && sort.dir !== 'none';
  const dir = sort.key === sortKey ? sort.dir : 'none';
  return (
    <th
      onClick={() => onToggle(sortKey)}
      style={width ? { width } : undefined}
      className={`text-left text-[13px] font-medium py-3 px-4 select-none cursor-pointer transition-colors group ${className} ${
        active ? 'text-[#0000C5]' : 'text-[#1e1e1e]'
      }`}
    >
      <span className="inline-flex items-center gap-2">
        <span>{label}</span>
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded-md transition-colors ${
            active ? 'text-[#0000C5]' : 'text-[#9B9FC0] group-hover:bg-[rgba(0,0,197,0.04)]'
          }`}
        >
          <SortIcon dir={dir} />
        </span>
      </span>
    </th>
  );
}

function Library({ hasFiles, onFilesUploaded, onChatWithFile }) {
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sort, setSort] = React.useState({ key: 'name', dir: 'asc' }); // dir: 'asc' | 'desc' | 'none'

  const toggleSort = (key) => {
    setSort((s) => {
      if (s.key !== key) return { key, dir: 'asc' };
      if (s.dir === 'asc') return { key, dir: 'desc' };
      if (s.dir === 'desc') return { key: null, dir: 'none' };
      return { key, dir: 'asc' };
    });
  };

  const sortedFiles = React.useMemo(() => {
    const filtered = INITIAL_FILES.filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (!sort.key || sort.dir === 'none') return filtered;
    const map = { name: 'name', modified: 'modifiedTs', size: 'sizeBytes' };
    const k = map[sort.key];
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a[k];
      const bv = b[k];
      if (typeof av === 'number') {
        return sort.dir === 'asc' ? av - bv : bv - av;
      }
      const A = (av || '').toString().toLowerCase();
      const B = (bv || '').toString().toLowerCase();
      if (A < B) return sort.dir === 'asc' ? -1 : 1;
      if (A > B) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [sort, searchQuery]);

  return (
    <div
      data-screen-label="Library"
      className="flex flex-col flex-1 min-w-0 h-full overflow-auto"
    >
      <div className="w-full max-w-[960px] mx-auto px-6 pt-8 pb-10 flex flex-col gap-5">
        {/* Heading */}
        <h1 className="text-[28px] font-semibold text-[#1e1e1e] leading-9 tracking-tight">
          Library
        </h1>

        {/* Content card */}
        <div className="bg-white border border-[#e0eaf9] rounded-[14px] overflow-hidden">
          {/* Tabs + Upload row */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#e0eaf9]">
            <div className="inline-flex items-center gap-1 bg-[#eef0f7] rounded-lg p-1">
              {['All', 'Images', 'Files'].map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`h-8 px-4 rounded-md text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-[#1e1e1e] text-white shadow-[0_1px_2px_rgba(27,35,55,0.16)]'
                        : 'text-[rgba(130,135,176,0.95)] hover:text-[#1e1e1e]'
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
            <button
              onClick={onFilesUploaded}
              className="bg-[#0000C5] hover:bg-[#000093] text-white text-sm font-medium px-4 h-9 rounded-lg transition-colors flex items-center gap-2"
            >
              <Icon name="upload" size={14} strokeWidth={2.2} />
              Upload
            </button>
          </div>

          {/* Search input — full width of card, below tabs */}
          <div className="px-5 pt-4 pb-3 border-b border-[#e0eaf9]">
            <div className="flex items-center gap-2.5 bg-[#f7f9fd] border border-[#e0eaf9] rounded-lg px-3 h-10 focus-within:border-[#0000C5] transition-colors">
              <Icon name="search" size={16} className="text-[#9B9FC0] shrink-0" />
              <input
                type="text"
                placeholder="Search library"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#1e1e1e] placeholder-[rgba(130,135,176,0.95)] outline-none"
              />
            </div>
          </div>

          {hasFiles ? (
            /* File list */
            <div className="p-6">
              <div className="border border-[#e0eaf9] rounded-[12px] overflow-hidden">
              <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr className="bg-[#f7f9fd] border-b border-[#e0eaf9]">
                    <SortableTh label="Name" sortKey="name" sort={sort} onToggle={toggleSort} />
                    <SortableTh label="Modified" sortKey="modified" sort={sort} onToggle={toggleSort} width="180px" />
                    <SortableTh label="Size" sortKey="size" sort={sort} onToggle={toggleSort} width="140px" />
                    <th className="w-[88px]" />
                  </tr>
                </thead>
                <tbody>
                  {sortedFiles.map((file, idx, arr) => (
                    <tr
                      key={file.name}
                      className={`group transition-colors hover:bg-[rgba(0,0,197,0.04)] ${
                        idx < arr.length - 1 ? 'border-b border-[#e0eaf9]' : ''
                      }`}
                    >
                      <td className="py-3 px-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-[#f7f9fd] border border-[#e0eaf9] rounded-md shrink-0">
                            <Icon name="file-text" size={16} className="text-[#3b3b3b]" />
                          </div>
                          <span className="text-sm text-[#1e1e1e]">{file.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-[rgba(130,135,176,0.95)] align-middle">{file.modified}</td>
                      <td className="py-3 px-4 text-sm text-[rgba(130,135,176,0.95)] align-middle">{file.size}</td>
                      <td className="py-3 px-4 align-middle">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onChatWithFile && onChatWithFile(file)}
                            title="Chat with this file"
                            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white transition-colors"
                          >
                            <Icon name="message-square" size={16} className="text-[#3b3b3b]" />
                          </button>
                          <button
                            title="More"
                            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white transition-colors"
                          >
                            <Icon name="more-horizontal" size={16} className="text-[#3b3b3b]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          ) : (
            /* Empty state / drop zone — dashed border inside the card */
            <div className="p-6">
              <div className="flex flex-col items-center justify-center min-h-[420px] border-2 border-dashed border-[#c8d3e8] rounded-[14px]">
                <Icon name="upload" size={28} className="text-[#9B9FC0] mb-5" strokeWidth={1.8} />
                <button
                  onClick={onFilesUploaded}
                  className="bg-[#0000C5] hover:bg-[#000093] text-white text-sm font-medium px-4 h-9 rounded-lg transition-colors"
                >
                  Upload files
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Library });
