import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  
  // High-performance motion values
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Spring config for smooth follow
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if it's a touch device - don't show custom cursor on mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      cursorX.set(e.clientX - 16) // Center the 32px cursor
      cursorY.set(e.clientY - 16)
    }
    
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(56, 189, 248, 0) 70%)',
        boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
      }}
    >
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
    </motion.div>
  )
}
