import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSearch, HiMoon, HiSun, HiMail, HiCode, HiAcademicCap, HiShieldCheck, HiHome, HiUser, HiCollection, HiBadgeCheck, HiBriefcase, HiChat, HiExternalLink, HiClipboardCopy } from 'react-icons/hi'
import { FaGithub, FaLinkedinIn, FaTerminal } from 'react-icons/fa'

const ACTIONS = [
  // Navigation
  { id: 'home', label: 'Go to Home', icon: HiHome, section: 0, category: 'Navigation' },
  { id: 'about', label: 'Go to About', icon: HiUser, section: 1, category: 'Navigation' },
  { id: 'skills', label: 'Go to Skills', icon: HiCode, section: 2, category: 'Navigation' },
  { id: 'certs', label: 'Go to Certifications', icon: HiBadgeCheck, section: 3, category: 'Navigation' },
  { id: 'journey', label: 'Go to Journey', icon: HiBriefcase, section: 4, category: 'Navigation' },
  { id: 'projects', label: 'Go to Projects', icon: HiCollection, section: 5, category: 'Navigation' },
  { id: 'contact', label: 'Go to Contact', icon: HiChat, section: 6, category: 'Navigation' },

  // Actions
  { id: 'copy-email', label: 'Copy Email Address', icon: HiClipboardCopy, action: 'copy-email', category: 'Actions' },
  { id: 'toggle-theme', label: 'Toggle Dark/Light Mode', icon: HiMoon, action: 'toggle-theme', category: 'Actions' },
  { id: 'terminal', label: 'Open Terminal Mode', icon: FaTerminal, action: 'terminal', category: 'Actions' },

  // Links
  { id: 'github', label: 'Open GitHub', icon: FaGithub, url: 'https://github.com/kavinprasanth2306-a11y', category: 'Links' },
  { id: 'linkedin', label: 'Open LinkedIn', icon: FaLinkedinIn, url: 'https://linkedin.com/in/Kavinprasanthkm', category: 'Links' },
  { id: 'wazabi', label: 'Open Wazabi.in', icon: HiExternalLink, url: 'https://wazabi.in', category: 'Links' },
]

export default function CommandPalette({ isOpen, onClose, setActiveIndex, toggleTheme, theme, onOpenTerminal }) {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filtered = query
    ? ACTIONS.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
    : ACTIONS

  // Reset selection when query changes
  useEffect(() => { setSelectedIdx(0) }, [query])

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIdx(prev => Math.min(prev + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIdx(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && filtered[selectedIdx]) {
        executeAction(filtered[selectedIdx])
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, selectedIdx, filtered])

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const el = listRef.current.children[selectedIdx]
      if (el) el.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIdx])

  const executeAction = (action) => {
    onClose()
    if (action.section !== undefined) {
      setActiveIndex(action.section)
    } else if (action.action === 'copy-email') {
      navigator.clipboard.writeText('kavinprasanth2306@gmail.com')
    } else if (action.action === 'toggle-theme') {
      toggleTheme()
    } else if (action.action === 'terminal') {
      onOpenTerminal?.()
    } else if (action.url) {
      window.open(action.url, '_blank')
    }
  }

  // Group by category
  const grouped = {}
  filtered.forEach(a => {
    if (!grouped[a.category]) grouped[a.category] = []
    grouped[a.category].push(a)
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-[90vw] max-w-xl rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)] shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--glass-border)]">
              <HiSearch className="text-[var(--text-secondary)] flex-shrink-0" size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-[var(--text-primary)] text-sm placeholder:text-[var(--text-secondary)]/50 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded border border-[var(--glass-border)] text-[9px] text-[var(--text-secondary)] font-mono">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-center text-sm text-[var(--text-secondary)] py-8">No results found</p>
              )}
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-[3px] text-[var(--text-secondary)]/50">
                    {category}
                  </p>
                  {items.map((action) => {
                    const globalIdx = filtered.indexOf(action)
                    const Icon = action.icon
                    return (
                      <button
                        key={action.id}
                        onClick={() => executeAction(action)}
                        onMouseEnter={() => setSelectedIdx(globalIdx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          globalIdx === selectedIdx
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'text-[var(--text-primary)] hover:bg-[var(--glass-bg)]'
                        }`}
                      >
                        <Icon size={16} className="flex-shrink-0 opacity-60" />
                        <span className="text-sm font-medium">{action.label}</span>
                        {action.action === 'toggle-theme' && (
                          <span className="ml-auto text-[10px] text-[var(--text-secondary)]">
                            Currently: {theme}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--glass-border)] bg-[var(--glass-bg)]/50">
              <span className="text-[9px] text-[var(--text-secondary)]">
                ↑↓ Navigate · ↵ Select · ESC Close
              </span>
              <span className="text-[9px] text-[var(--text-secondary)]">
                ⌘K to toggle
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
