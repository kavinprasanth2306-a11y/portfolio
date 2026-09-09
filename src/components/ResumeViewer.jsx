import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiEye } from 'react-icons/hi'

export default function ResumeViewer({ isOpen, onClose }) {
  const [obscured, setObscured] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    // Block right-click (Save Image As / Print)
    const blockContext = (e) => { e.preventDefault(); return false }

    // Block Ctrl/Cmd+S, Ctrl+P, and PrintScreen key
    const blockKeys = (e) => {
      const k = e.key.toLowerCase()
      if ((e.ctrlKey || e.metaKey) && (k === 's' || k === 'p' || k === 'u')) {
        e.preventDefault()
        return false
      }
      if (k === 'printscreen') {
        // Best-effort: wipe clipboard and briefly obscure
        try { navigator.clipboard.writeText('') } catch {}
        setObscured(true)
        setTimeout(() => setObscured(false), 1200)
      }
    }

    // Obscure the resume whenever the tab/window loses focus
    // (defeats many screen-capture tools that need the window active)
    const onBlur = () => setObscured(true)
    const onFocus = () => setObscured(false)
    const onVisibility = () => setObscured(document.hidden)

    document.addEventListener('contextmenu', blockContext)
    document.addEventListener('keydown', blockKeys)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('contextmenu', blockContext)
      document.removeEventListener('keydown', blockKeys)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-3 md:inset-8 z-[101] flex flex-col rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[var(--bg-primary)] shadow-2xl"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--glass-border)] bg-[var(--glass-bg)] flex-shrink-0">
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <HiEye size={16} className="text-cyan-400" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Resume — View Only</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--text-primary)]/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close resume viewer"
              >
                <HiX size={18} />
              </button>
            </div>

            {/* Resume image — protected */}
            <div
              className="flex-1 overflow-y-auto bg-neutral-800 p-3 md:p-6 flex justify-center select-none"
              style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="relative w-full max-w-3xl">
                <img
                  src="/resume-view/page-1.png"
                  alt="Kavinprasanth KM — Resume (view only)"
                  draggable={false}
                  className="w-full h-auto rounded-lg shadow-2xl pointer-events-none select-none"
                  style={{ WebkitUserSelect: 'none', userSelect: 'none', WebkitTouchCallout: 'none' }}
                />

                {/* Invisible overlay to block long-press / drag save on mobile */}
                <div className="absolute inset-0" style={{ background: 'transparent' }} onContextMenu={(e) => e.preventDefault()} />

                {/* Repeating watermark */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.10] flex flex-wrap content-start gap-x-10 gap-y-16 overflow-hidden rounded-lg"
                  style={{ transform: 'rotate(-24deg) scale(1.4)', transformOrigin: 'center' }}
                >
                  {Array.from({ length: 60 }).map((_, i) => (
                    <span key={i} className="text-[11px] font-bold text-black whitespace-nowrap">
                      kavinprasanth.in
                    </span>
                  ))}
                </div>

                {/* Obscure layer — activates on blur / PrintScreen */}
                <AnimatePresence>
                  {obscured && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 rounded-lg bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-2 backdrop-blur-2xl"
                    >
                      <HiEye size={28} className="text-cyan-400" />
                      <p className="text-xs md:text-sm text-[var(--text-secondary)] font-medium text-center px-6">
                        Content hidden while the window is inactive
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer note */}
            <div className="px-4 py-2 border-t border-[var(--glass-border)] bg-[var(--glass-bg)] text-center flex-shrink-0">
              <p className="text-[9px] md:text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">
                &copy; Kavinprasanth KM — This resume is view-only. Downloading &amp; copying are not permitted.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
