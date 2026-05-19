import { useState } from 'react'
import { Plus, ArrowUp } from 'lucide-react'

const suggestions = [
  'Find recent news on hospitality market appetite',
  "What's driving rate changes in commercial property right now?",
  'Draft a renewal recap one-pager',
  "Where's the cyber insurance market heading this year?",
]

export default function Home() {
  const [message, setMessage] = useState('')

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-w-0 pb-16 px-4">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-[#0a0a0a] tracking-tight pb-6">
        What can I help you with?
      </h2>

      {/* Suggestion chips */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-[672px] mb-4">
        {suggestions.map((text) => (
          <button
            key={text}
            onClick={() => setMessage(text)}
            className="bg-white border border-[#e5e5e5] rounded-[14px] px-4 py-3 text-sm text-[#0a0a0a] text-left hover:bg-gray-50 transition-colors leading-[1.375]"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Chat input */}
      <div className="w-full max-w-[672px]">
        <div className="bg-white rounded-[18px] shadow-[0px_0px_0px_1px_rgba(229,229,229,0.6),0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex items-end gap-2 px-4 py-2">
            <div className="flex flex-col h-[34px] justify-end pb-0.5 shrink-0">
              <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-colors">
                <Plus size={16} className="text-[#0a0a0a]" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Ennabl AI…"
                rows={1}
                className="w-full resize-none bg-transparent text-sm text-[#0a0a0a] placeholder-[#737373] outline-none leading-[22.75px] py-1.5 max-h-[200px] overflow-auto"
                style={{ height: 'auto', minHeight: '30px' }}
                onInput={(e) => {
                  const t = e.currentTarget
                  t.style.height = 'auto'
                  t.style.height = Math.min(t.scrollHeight, 200) + 'px'
                }}
              />
            </div>
            <div className="flex flex-col h-[34px] justify-end pb-px shrink-0">
              <button
                disabled={!message.trim()}
                className="flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-[#deebf8] disabled:opacity-50 hover:bg-[#c9ddf4] disabled:hover:bg-[#deebf8] transition-colors"
              >
                <ArrowUp size={16} className="text-[#0a0a0a]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
