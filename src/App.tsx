import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Library from './pages/Library'
import SearchModal from './pages/SearchModal'
import './index.css'

type Page = 'home' | 'library'

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home')
  const [hasFiles, setHasFiles] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="flex h-full font-sans relative">
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => { setActivePage(page); setSearchOpen(false) }}
        onSearchOpen={() => { setActivePage('library'); setSearchOpen(true) }}
      />

      <main className="flex flex-1 min-w-0 h-full overflow-hidden">
        {activePage === 'home' && <Home />}
        {activePage === 'library' && (
          <Library
            hasFiles={hasFiles}
            onFilesUploaded={() => setHasFiles(true)}
          />
        )}
      </main>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
