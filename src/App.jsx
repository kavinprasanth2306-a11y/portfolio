import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import PageLoader from './components/PageLoader'
import Navbar from './components/Navbar'
import ShatterSection from './components/ShatterSection'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Certificates from './sections/Certificates'
import Skills from './sections/Skills'

function App() {
  const [loaded, setLoaded] = useState(true)
  const [theme, setTheme] = useState('light')
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  
  const z = useMotionValue(0)

  // Animate Z dynamically whenever activeIndex changes
  useEffect(() => {
    animate(z, activeIndex * 1000, {
      type: "tween",
      duration: 1.0,
      ease: [0.36, 1, 0.36, 1] // Custom smooth easing
    })
  }, [activeIndex, z])

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

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const scrollLock = useRef(false)

  // Handle discrete scroll transitions
  useEffect(() => {
    let touchStartY = 0
    let momentumTimeout = null
    let isMomentumLocked = false
    const ANIMATION_DURATION = 1500 // Lock scrolling so one swipe = one section

    const isScrollable = (el) => {
      if (!el || !el.getBoundingClientRect) return false
      // Check if we explicitly marked it as scrollable
      if (el.hasAttribute && el.hasAttribute('data-lenis-prevent')) return true
      
      // Otherwise check if it actually has overflow auto/scroll and has scrolling content
      if (el.scrollHeight > el.clientHeight) {
        const style = window.getComputedStyle(el)
        return style.overflowY === 'auto' || style.overflowY === 'scroll'
      }
      return false
    }

    const setMomentumLock = () => {
      isMomentumLocked = true
      clearTimeout(momentumTimeout)
      momentumTimeout = setTimeout(() => { isMomentumLocked = false }, 350)
    }

    const handleWheel = (e) => {
      const path = e.composedPath && e.composedPath()
      if (path) {
        for (const el of path) {
          if (isScrollable(el)) {
            const isAtTop = el.scrollTop <= 0
            const isAtBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 2
            
            if (e.deltaY > 0) {
              if (!isAtBottom) {
                setMomentumLock()
                return
              } else if (isMomentumLocked) {
                setMomentumLock() // refresh lock while momentum continues
                return
              }
            } else if (e.deltaY < 0) {
              if (!isAtTop) {
                setMomentumLock()
                return
              } else if (isMomentumLocked) {
                setMomentumLock()
                return
              }
            }
          }
        }
      }

      if (scrollLock.current || isMomentumLocked) return

      if (e.deltaY > 30) {
        if (activeIndexRef.current < 5) {
          scrollLock.current = true
          setActiveIndex(prev => prev + 1)
          setTimeout(() => { scrollLock.current = false }, ANIMATION_DURATION)
        }
      } else if (e.deltaY < -30) {
        if (activeIndexRef.current > 0) {
          scrollLock.current = true
          setActiveIndex(prev => prev - 1)
          setTimeout(() => { scrollLock.current = false }, ANIMATION_DURATION)
        }
      }
    }

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      const path = e.composedPath && e.composedPath()
      if (path) {
        for (const el of path) {
          if (isScrollable(el)) {
            const isAtTop = el.scrollTop <= 0
            const isAtBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 2
            
            const touchY = e.touches[0].clientY
            const deltaY = touchStartY - touchY
            
            if (deltaY > 0) {
              if (!isAtBottom) {
                setMomentumLock()
                return
              } else if (isMomentumLocked) {
                setMomentumLock()
                return
              }
            } else if (deltaY < 0) {
              if (!isAtTop) {
                setMomentumLock()
                return
              } else if (isMomentumLocked) {
                setMomentumLock()
                return
              }
            }
          }
        }
      }

      if (scrollLock.current || isMomentumLocked) return

      const touchEndY = e.touches[0].clientY
      const deltaY = touchStartY - touchEndY

      if (deltaY > 50) {
        if (activeIndexRef.current < 5) {
          scrollLock.current = true
          setActiveIndex(prev => prev + 1)
          setTimeout(() => { scrollLock.current = false }, ANIMATION_DURATION)
        }
      } else if (deltaY < -50) {
        if (activeIndexRef.current > 0) {
          scrollLock.current = true
          setActiveIndex(prev => prev - 1)
          setTimeout(() => { scrollLock.current = false }, ANIMATION_DURATION)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Navbar theme={theme} toggleTheme={toggleTheme} setActiveIndex={setActiveIndex} />
                </div>
            </div>

            {/* Z-Axis Discrete Snap Layout with Shatter Effect */}
            <div className="h-[100dvh] w-full relative overflow-hidden bg-[var(--bg-primary)]">
              <div className="h-[100dvh] w-full scene-container">
                <motion.div 
                  style={{ z }} 
                  className="w-full h-full scene-content absolute inset-0"
                >
                  <ShatterSection z={z} index={0} activeIndex={activeIndex}><Hero /></ShatterSection>
                  <ShatterSection z={z} index={1} activeIndex={activeIndex}><About /></ShatterSection>
                  <ShatterSection z={z} index={2} activeIndex={activeIndex}><Skills /></ShatterSection>
                  <ShatterSection z={z} index={3} activeIndex={activeIndex}><Certificates /></ShatterSection>
                  <ShatterSection z={z} index={4} activeIndex={activeIndex}><Projects /></ShatterSection>
                  <ShatterSection z={z} index={5} activeIndex={activeIndex}><Contact /></ShatterSection>
                </motion.div>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
