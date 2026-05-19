import { SquarePen, Search, BookMarked, ChevronsUpDown, PanelLeftClose } from 'lucide-react'

type Page = 'home' | 'library'

interface SidebarProps {
  activePage: Page
  onNavigate: (page: Page) => void
  onSearchOpen: () => void
}

export default function Sidebar({ activePage, onNavigate, onSearchOpen }: SidebarProps) {
  return (
    <aside className="flex flex-col h-full w-[260px] shrink-0 bg-[#f4f8fc] shadow-[1px_0px_0px_0px_rgba(30,36,56,0.07)]">
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-3">
        <img src="/assets/logo.png" alt="Ennabl AI" className="h-5" />
        <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors">
          <PanelLeftClose size={16} className="text-[#0a0a0a]" />
        </button>
      </div>

      {/* Nav buttons */}
      <div className="flex flex-col gap-0.5 px-2 pb-2 pt-1 shrink-0">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-[#0a0a0a] hover:bg-black/5 transition-colors text-left"
        >
          <SquarePen size={16} />
          New chat
        </button>
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-[#0a0a0a] hover:bg-black/5 transition-colors text-left"
        >
          <Search size={16} />
          Search chats
        </button>
        <button
          onClick={() => onNavigate('library')}
          className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm text-[#0a0a0a] transition-colors text-left ${
            activePage === 'library' ? 'bg-[rgba(222,235,248,0.6)]' : 'hover:bg-black/5'
          }`}
        >
          <BookMarked size={16} />
          Library
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-center py-6 px-3">
          <span className="text-xs text-[#737373]">No chats found</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#e5e5e5] shrink-0" />

      {/* User */}
      <div className="p-2 shrink-0">
        <button className="flex items-center gap-2.5 w-full p-2 rounded-lg hover:bg-black/5 transition-colors">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#deebf8] overflow-hidden shrink-0">
            <img src="/assets/avatar.png" alt="Ismael Viejo" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-medium text-[#0a0a0a] leading-4 truncate">Ismael Viejo</p>
            <p className="text-xs text-[#737373] leading-4 truncate">iviejo@ennabl.com</p>
          </div>
          <ChevronsUpDown size={14} className="text-[#737373] shrink-0" />
        </button>
      </div>
    </aside>
  )
}
