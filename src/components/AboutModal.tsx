import { X } from 'lucide-react'

export default function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex flex-col w-full max-w-[1100px] h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5e5e5] shrink-0">
          <span className="text-sm font-semibold text-[#0a0a0a]">About ennabl AI</span>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-black/5 transition-colors"
          >
            <X size={15} className="text-[#0a0a0a]" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src="/about.html"
            className="w-full h-full border-0"
            title="About ennabl AI"
          />
        </div>
      </div>
    </div>
  )
}
