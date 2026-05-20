import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Library from './pages/Library'
import SearchModal from './pages/SearchModal'
import AboutModal from './components/AboutModal'
import './index.css'

type Page = 'home' | 'library'

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home')
  const [hasFiles, setHasFiles] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <div className="flex h-full font-sans relative">
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => { setActivePage(page); setSearchOpen(false) }}
        onSearchOpen={() => { setActivePage('library'); setSearchOpen(true) }}
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

        {activePage === 'home' && <Home />}
        {activePage === 'library' && (
          <Library
            hasFiles={hasFiles}
            onFilesUploaded={() => setHasFiles(true)}
          />
        )}
      </main>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </div>
  )
}
