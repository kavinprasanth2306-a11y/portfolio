import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import ShatterSection from './components/ShatterSection'
import SectionDots from './components/SectionDots'
import ParticleBackground from './components/ParticleBackground'
import ProgressBar from './components/ProgressBar'
import KeyboardHint from './components/KeyboardHint'
import CommandPalette from './components/CommandPalette'
import Terminal from './components/Terminal'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Certificates from './sections/Certificates'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import CustomCursor from './components/CustomCursor'

const TOTAL_SECTIONS = 7

export const SECTION_META = [
  { hash: '', id: 'hero', title: 'Kavinprasanth KM | Full-Stack Developer, AI Engineer & Cyber Security Specialist' },
  { hash: '#about', id: 'about', title: 'About Kavinprasanth KM | Full-Stack Developer & AI Specialist' },
  { hash: '#skills', id: 'skills', title: 'Technical Skills & Arsenal | Kavinprasanth KM' },
  { hash: '#certifications', id: 'certifications', title: 'Certifications & Credentials | Kavinprasanth KM' },
  { hash: '#experience', id: 'experience', title: 'Journey & Experience | Kavinprasanth KM' },
  { hash: '#projects', id: 'projects', title: 'Featured Projects & Work | Kavinprasanth KM' },
  { hash: '#contact', id: 'contact', title: 'Contact Kavinprasanth KM | Get in Touch' },
]

const sections = [Hero, About, Skills, Certificates, Experience, Projects, Contact]

function getInitialIndex() {
  try {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.toLowerCase()
      const idx = SECTION_META.findIndex(s => s.hash && s.hash.toLowerCase() === hash)
      if (idx !== -1) return idx
    }
    const saved = sessionStorage.getItem('portfolio-section')
    return saved ? parseInt(saved, 10) : 0
  } catch { return 0 }
}

function App() {
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') || 'dark' } catch { return 'dark' }
  })
  const [activeIndex, setActiveIndex] = useState(getInitialIndex)
  const activeIndexRef = useRef(0)

  // Persist section + update URL hash + title
  useEffect(() => {
    try { sessionStorage.setItem('portfolio-section', String(activeIndex)) } catch {}
    const current = SECTION_META[activeIndex] || SECTION_META[0]
    document.title = current.title
    const targetHash = current.hash
    if (targetHash && window.location.hash.toLowerCase() !== targetHash.toLowerCase()) {
      window.history.replaceState(null, '', targetHash)
    } else if (!targetHash && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [activeIndex])
  
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    try { localStorage.setItem('portfolio-theme', theme) } catch {}
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])

  // Cmd+K + Escape
  useEffect(() => {
    const handle = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdPaletteOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setCmdPaletteOpen(false)
        setTerminalOpen(false)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  // Hash changes
  useEffect(() => {
    const handle = () => {
      const hash = window.location.hash.toLowerCase()
      const idx = SECTION_META.findIndex(s => s.hash && s.hash.toLowerCase() === hash)
      if (idx !== -1 && idx !== activeIndexRef.current) setActiveIndex(idx)
      else if (!hash && activeIndexRef.current !== 0) setActiveIndex(0)
    }
    window.addEventListener('hashchange', handle)
    return () => window.removeEventListener('hashchange', handle)
  }, [])

  // Cross-component navigation
  useEffect(() => {
    const handle = (e) => {
      if (typeof e.detail === 'number') setActiveIndex(e.detail)
    }
    window.addEventListener('navigate-section', handle)
    return () => window.removeEventListener('navigate-section', handle)
  }, [])

  // Scroll / Touch / Keyboard navigation
  useEffect(() => {
    let isLocked = false
    const maxIndex = TOTAL_SECTIONS - 1
    const COOLDOWN = 600

    const navigate = (dir) => {
      if (isLocked) return
      isLocked = true
      setActiveIndex(prev => dir > 0 ? Math.min(prev + 1, maxIndex) : Math.max(prev - 1, 0))
      setTimeout(() => { isLocked = false }, COOLDOWN)
    }

    const isInsideScrollable = (e, delta) => {
      const path = e.composedPath?.() || []
      for (const el of path) {
        if (el === document || el === window || !el.getBoundingClientRect) continue
        try {
          const s = window.getComputedStyle(el)
          if ((s.overflowY === 'auto' || s.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
            if (delta > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true
            if (delta < 0 && el.scrollTop > 0) return true
          }
        } catch { continue }
      }
      return false
    }

    const onWheel = (e) => {
      if (isInsideScrollable(e, e.deltaY)) return
      e.preventDefault()
      if (Math.abs(e.deltaY) > 50) navigate(e.deltaY > 0 ? 1 : -1)
    }

    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); navigate(1) }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); navigate(-1) }
    }

    let touchY = 0, handled = false
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; handled = false }
    const onTouchMove = (e) => {
      const delta = touchY - e.touches[0].clientY
      if (isInsideScrollable(e, delta)) return
      e.preventDefault()
    }
    const onTouchEnd = (e) => {
      if (handled) return
      const delta = touchY - e.changedTouches[0].clientY
      if (delta > 60) { handled = true; navigate(1) }
      else if (delta < -60) { handled = true; navigate(-1) }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative bg-[var(--bg-primary)]">
      <CustomCursor />
      <ParticleBackground />
      <ProgressBar activeIndex={activeIndex} />
      <SectionDots activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar theme={theme} toggleTheme={toggleTheme} setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
      </div>

      {/* Sections — simple stacked crossfade, no 3D */}
      <div className="h-[100dvh] w-full relative">
        {sections.map((Section, i) => (
          <ShatterSection key={i} index={i} activeIndex={activeIndex}>
            <Section />
          </ShatterSection>
        ))}
      </div>

      <KeyboardHint />
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        setActiveIndex={setActiveIndex}
        toggleTheme={toggleTheme}
        theme={theme}
        onOpenTerminal={() => { setCmdPaletteOpen(false); setTerminalOpen(true) }}
      />
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  )
}

export default App
