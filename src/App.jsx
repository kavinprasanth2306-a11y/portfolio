import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
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

const TOTAL_SECTIONS = 7 // Hero, About, Skills, Certificates, Experience, Projects, Contact

export const SECTION_META = [
  { hash: '', id: 'hero', title: 'Kavinprasanth KM | Full-Stack Developer, AI Engineer & Cyber Security Specialist' },
  { hash: '#about', id: 'about', title: 'About Kavinprasanth KM | Full-Stack Developer & AI Specialist' },
  { hash: '#skills', id: 'skills', title: 'Technical Skills & Arsenal | Kavinprasanth KM' },
  { hash: '#certifications', id: 'certifications', title: 'Certifications & Credentials | Kavinprasanth KM' },
  { hash: '#experience', id: 'experience', title: 'Journey & Experience | Kavinprasanth KM' },
  { hash: '#projects', id: 'projects', title: 'Featured Projects & Work | Kavinprasanth KM' },
  { hash: '#contact', id: 'contact', title: 'Contact Kavinprasanth KM | Get in Touch' },
]

function getInitialIndex() {
  try {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.toLowerCase()
      const foundIndex = SECTION_META.findIndex(s => s.hash && s.hash.toLowerCase() === hash)
      if (foundIndex !== -1) return foundIndex
    }
    const saved = sessionStorage.getItem('portfolio-section')
    return saved ? parseInt(saved, 10) : 0
  } catch {
    return 0
  }
}

function App() {
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  // Theme persistence — reads from localStorage, defaults to 'dark'
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') || 'dark' } catch { return 'dark' }
  })
  const [activeIndex, setActiveIndex] = useState(getInitialIndex)
  const activeIndexRef = useRef(0)

  // Persist active section and update URL hash + title for SEO and browser history
  useEffect(() => {
    try { sessionStorage.setItem('portfolio-section', String(activeIndex)) } catch {}
    
    const current = SECTION_META[activeIndex] || SECTION_META[0]
    if (document.title !== current.title) {
      document.title = current.title
    }

    const currentHash = window.location.hash
    const targetHash = current.hash
    if (targetHash && currentHash.toLowerCase() !== targetHash.toLowerCase()) {
      window.history.replaceState(null, '', targetHash)
    } else if (!targetHash && currentHash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [activeIndex])
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try { localStorage.setItem('portfolio-theme', theme) } catch {}
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Cmd+K to toggle command palette
  useEffect(() => {
    const handleCmdK = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdPaletteOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setCmdPaletteOpen(false)
        setTerminalOpen(false)
      }
    }
    window.addEventListener('keydown', handleCmdK)
    return () => window.removeEventListener('keydown', handleCmdK)
  }, [])

  const z = useMotionValue(0)

  useEffect(() => {
    animate(z, activeIndex * 1000, {
      type: "tween",
      duration: 0.5,
      ease: [0.32, 0.72, 0, 1]
    })
  }, [activeIndex, z])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  // Listen for browser hash changes (back/forward navigation, direct URL anchors)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase()
      const foundIndex = SECTION_META.findIndex(s => s.hash && s.hash.toLowerCase() === hash)
      if (foundIndex !== -1 && foundIndex !== activeIndexRef.current) {
        setActiveIndex(foundIndex)
      } else if (!hash && activeIndexRef.current !== 0) {
        setActiveIndex(0)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Listen for cross-component navigation events
  useEffect(() => {
    const handleNavigate = (e) => {
      const target = e.detail
      if (typeof target === 'number') setActiveIndex(target)
    }
    window.addEventListener('navigate-section', handleNavigate)
    return () => window.removeEventListener('navigate-section', handleNavigate)
  }, [])

  // Smart Scroll Decoder
  useEffect(() => {
    let isLocked = false
    const maxIndex = TOTAL_SECTIONS - 1
    const COOLDOWN = 600

    const navigate = (direction) => {
      if (isLocked) return
      isLocked = true
      if (direction > 0) {
        setActiveIndex(prev => Math.min(prev + 1, maxIndex))
      } else {
        setActiveIndex(prev => Math.max(prev - 1, 0))
      }
      setTimeout(() => { isLocked = false }, COOLDOWN)
    }

    const handleWheel = (e) => {
      const path = e.composedPath && e.composedPath()
      if (path) {
        for (const el of path) {
          if (el === document || el === window || !el.getBoundingClientRect) continue
          try {
            const style = window.getComputedStyle(el)
            const isScrollable = (style.overflowY === 'auto' || style.overflowY === 'scroll')
            if (isScrollable && el.scrollHeight > el.clientHeight + 1) {
              const atTop = el.scrollTop <= 0
              const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
              // Let the element scroll naturally if it's not at its boundary
              if (e.deltaY < 0 && !atTop) return
              if (e.deltaY > 0 && !atBottom) return
            }
          } catch {
            continue
          }
        }
      }

      e.preventDefault()
      const delta = Math.abs(e.deltaY)
      if (delta > 50) {
        navigate(e.deltaY > 0 ? 1 : -1)
      }
    }

    const handleKeyDown = (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        navigate(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        navigate(-1)
      }
    }

    let touchStartY = 0
    let touchHandled = false

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
      touchHandled = false
    }

    const handleTouchMove = (e) => {
      // Check if touch is inside a scrollable element that still has room to scroll
      const path = e.composedPath && e.composedPath()
      if (path) {
        for (const el of path) {
          if (el === document || el === window || !el.getBoundingClientRect) continue
          try {
            const style = window.getComputedStyle(el)
            const isScrollable = (style.overflowY === 'auto' || style.overflowY === 'scroll')
            if (isScrollable && el.scrollHeight > el.clientHeight + 1) {
              const atTop = el.scrollTop <= 0
              const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
              const touchDelta = touchStartY - e.touches[0].clientY
              if (touchDelta > 0 && !atBottom) return // scrolling down, not at bottom
              if (touchDelta < 0 && !atTop) return // scrolling up, not at top
            }
          } catch { continue }
        }
      }
      // Prevent browser pull-to-refresh and native scroll
      e.preventDefault()
    }

    const handleTouchEnd = (e) => {
      if (touchHandled) return
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      if (deltaY > 60) {
        touchHandled = true
        navigate(1)
      } else if (deltaY < -60) {
        touchHandled = true
        navigate(-1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative bg-[var(--bg-primary)]">
      <CustomCursor />
      
      {/* Particle Background */}
      <ParticleBackground />

      {/* Top Progress Bar */}
      <ProgressBar activeIndex={activeIndex} />

      {/* Section Progress Dots */}
      <SectionDots activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 w-full overflow-hidden pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <Navbar theme={theme} toggleTheme={toggleTheme} setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
          </div>
        </div>

        {/* Z-Axis Discrete Snap Layout with Shatter Effect */}
        <div className="h-[100dvh] w-full scene-container pointer-events-auto">
          <motion.div 
            style={{ z }} 
            className="w-full h-full scene-content absolute inset-0"
          >
            <ShatterSection z={z} index={0} activeIndex={activeIndex}><Hero /></ShatterSection>
            <ShatterSection z={z} index={1} activeIndex={activeIndex}><About /></ShatterSection>
            <ShatterSection z={z} index={2} activeIndex={activeIndex}><Skills /></ShatterSection>
            <ShatterSection z={z} index={3} activeIndex={activeIndex}><Certificates /></ShatterSection>
            <ShatterSection z={z} index={4} activeIndex={activeIndex}><Experience /></ShatterSection>
            <ShatterSection z={z} index={5} activeIndex={activeIndex}><Projects /></ShatterSection>
            <ShatterSection z={z} index={6} activeIndex={activeIndex}><Contact /></ShatterSection>
          </motion.div>
        </div>
      </motion.div>

      {/* Keyboard Navigation Hint (first visit only) */}
      <KeyboardHint />

      {/* Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        setActiveIndex={setActiveIndex}
        toggleTheme={toggleTheme}
        theme={theme}
        onOpenTerminal={() => {
          setCmdPaletteOpen(false)
          setTerminalOpen(true)
        }}
      />

      {/* Terminal Mode */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  )
}

export default App
