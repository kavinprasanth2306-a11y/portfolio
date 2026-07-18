import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function PageLoader({ onComplete }) {
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            onComplete?.()
          }, 400)
          return 100
        }
        return prev + 2
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950"
        >
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          
          {/* Spinning arcs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-48 h-48 border border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute w-64 h-64 border border-accent/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              className="absolute w-80 h-80 border border-pink-500/5 rounded-full"
            />
          </div>

          <div className="relative text-center z-10">
            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-8xl font-display font-bold gradient-text tabular-nums"
            >
              {String(count).padStart(3, '0')}
            </motion.div>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm tracking-[8px] uppercase text-gray-500"
            >
              Kavinprasanth
            </motion.p>

            {/* Loading bar */}
            <div className="mt-8 w-48 h-[1px] bg-white/10 mx-auto overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
