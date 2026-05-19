const INITIAL_FILES = [
  { name: 'policy1 copy.pdf', modified: 'Today', size: '3.0 MB' },
  { name: 'test_wc (2) copy.pdf', modified: 'Today', size: '1.7 MB' },
  { name: 'test_auto (2) copy.pdf', modified: 'Today', size: '354.6 KB' },
  { name: 'test_gl_cert (1) copy.pdf', modified: 'Today', size: '48.7 KB' },
  { name: 'pxf.pdf', modified: 'Today', size: '151.4 KB' },
];

function Library({ hasFiles, onFilesUploaded, onChatWithFile }) {
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div
      data-screen-label="Library"
      className="flex flex-col flex-1 min-w-0 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-[206px] pt-8 pb-4 shrink-0">
        <h1 className="text-[30px] font-semibold text-[#0a0a0a] leading-9">Library</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[rgba(245,245,245,0.4)] border border-[#e5e5e5] rounded-full px-3 py-1.5 w-[288px]">
            <Icon name="search" size={16} className="text-[#737373] shrink-0" />
            <input
              type="text"
              placeholder="Search library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#0a0a0a] placeholder-[rgba(10,10,10,0.5)] outline-none"
            />
          </div>
          <button
            onClick={onFilesUploaded}
            className="bg-[#0000C5] hover:bg-[#000093] text-white text-sm font-medium px-4 h-[34px] rounded-lg transition-colors"
          >
            Upload
          </button>
        </div>
      </div>

      {hasFiles ? (
        <>
          {/* Filter tabs */}
          <div className="flex items-center gap-2 px-[206px] pb-4 shrink-0">
            {['All', 'Images', 'Files'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  filter === f
                    ? 'bg-[#0a0a0a] text-white'
                    : 'text-[#0a0a0a] hover:bg-black/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* File list */}
          <div className="flex-1 overflow-auto px-[206px] pb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5]">
                  <th className="text-left text-xs text-[#737373] font-normal pb-2 pl-3">Name</th>
                  <th className="text-left text-xs text-[#737373] font-normal pb-2 w-[140px]">Modified</th>
                  <th className="text-left text-xs text-[#737373] font-normal pb-2 w-[100px]">Size</th>
                  <th className="w-10" />
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {INITIAL_FILES.filter((f) =>
                  f.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((file) => (
                  <tr key={file.name} className="border-b border-[#e5e5e5] group">
                    <td className="py-2 pl-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-[#f5f5f5] rounded-[4px] shrink-0">
                          <Icon name="file-text" size={16} className="text-[#737373]" />
                        </div>
                        <span className="text-sm text-[#0a0a0a]">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-2 text-sm text-[#737373]">{file.modified}</td>
                    <td className="py-2 text-sm text-[#737373]">{file.size}</td>
                    <td className="py-2">
                      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onChatWithFile && onChatWithFile(file)}
                          title="Chat with this file"
                          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors"
                        >
                          <Icon name="message-square" size={16} className="text-[#737373]" />
                        </button>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          title="More"
                          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors"
                        >
                          <Icon name="more-horizontal" size={16} className="text-[#737373]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Empty state / drop zone */
        <div className="flex-1 overflow-auto px-[206px] pb-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-[rgba(115,115,115,0.3)] rounded-[18px]">
            <Icon name="upload" size={32} className="text-[#737373] mb-4" />
            <button
              onClick={onFilesUploaded}
              className="bg-[#0000C5] hover:bg-[#000093] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Upload files
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Library });
