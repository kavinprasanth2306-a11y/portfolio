import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function KeyboardHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Don't show on touch devices / mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      setVisible(false)
      return
    }

    // Check if user has seen the hint before
    try {
      if (localStorage.getItem('portfolio-hint-seen')) {
        setVisible(false)
        return
      }
    } catch {}

    const timer = setTimeout(() => {
      setVisible(false)
      try { localStorage.setItem('portfolio-hint-seen', '1') } catch {}
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl shadow-lg"
        >
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-5 h-5 rounded border border-[var(--text-secondary)]/30 flex items-center justify-center text-[9px] text-[var(--text-secondary)]">↑</div>
            <div className="w-5 h-5 rounded border border-[var(--text-secondary)]/30 flex items-center justify-center text-[9px] text-[var(--text-secondary)]">↓</div>
          </div>
          <span className="text-[10px] md:text-xs text-[var(--text-secondary)] font-medium tracking-wide">
            Scroll or use arrow keys to navigate
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
