import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import Navbar from './components/Navbar'
import ShatterSection from './components/ShatterSection'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Certificates from './sections/Certificates'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import CustomCursor from './components/CustomCursor'

const TOTAL_SECTIONS = 7 // Hero, About, Skills, Certificates, Experience, Projects, Contact

function App() {
  const [theme, setTheme] = useState('light')
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const z = useMotionValue(0)

  // Animate Z dynamically whenever activeIndex changes
  useEffect(() => {
    animate(z, activeIndex * 1000, {
      type: "tween",
      duration: 0.8,
      ease: [0.25, 1, 0.35, 1]
    })
  }, [activeIndex, z])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  // Listen for cross-component navigation events (e.g. Hero "Explore Work" button)
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
    const COOLDOWN = 800 // ms — matches the z-axis transition duration

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
      e.preventDefault()
      const path = e.composedPath && e.composedPath()
      if (path) {
        for (const el of path) {
          if (el !== document && el.scrollHeight > el.clientHeight && 
              (window.getComputedStyle(el).overflowY === 'auto' || window.getComputedStyle(el).overflowY === 'scroll')) {
            return
          }
        }
      }

      const delta = Math.abs(e.deltaY)

      // Only react to intentional scrolls, ignore tiny trackpad jitter
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
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      if (deltaY > 60) {
        navigate(1)
      } else if (deltaY < -60) {
        navigate(-1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative bg-[var(--bg-primary)]">
      <CustomCursor />
      
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 w-full overflow-hidden pointer-events-none"
          >
            <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Navbar theme={theme} toggleTheme={toggleTheme} setActiveIndex={setActiveIndex} />
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
    </div>
  )
}

export default App
