import { Search, SquarePen, X } from 'lucide-react'

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div
        className="bg-white border border-[#e5e5e5] rounded-[10px] w-[576px] overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 h-12 px-4 border-b border-[#e5e5e5]">
          <Search size={16} className="text-[#737373] shrink-0" />
          <input
            type="text"
            placeholder="Search chats…"
            autoFocus
            className="flex-1 text-sm text-[#0a0a0a] placeholder-[#737373] outline-none"
          />
          <button
            onClick={onClose}
            className="flex items-center justify-center w-4 h-4 shrink-0 hover:opacity-70 transition-opacity"
          >
            <X size={16} className="text-[#737373]" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2">
          <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg bg-[rgba(245,245,245,0.5)] hover:bg-[#f5f5f5] transition-colors text-left">
            <SquarePen size={16} className="text-[#0a0a0a] shrink-0" />
            <span className="text-sm text-[#0a0a0a]">New chat</span>
          </button>
          <div className="flex items-center justify-center py-6">
            <span className="text-xs text-[#737373]">No chats yet</span>
          </div>
        </div>
      </div>
    </div>
  )
}
