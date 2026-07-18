import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function BentoBox({ children, className = '', colSpan = 4, rowSpan = 1, delay = 0 }) {
  const ref = useRef(null)
  
  // Mouse position values
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Smooth springs for rotation (max 6 degrees tilt)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  const colSpanClasses = {
    1: 'col-span-12 md:col-span-1',
    2: 'col-span-12 md:col-span-2',
    3: 'col-span-12 md:col-span-3',
    4: 'col-span-12 md:col-span-4',
    5: 'col-span-12 md:col-span-5',
    6: 'col-span-12 md:col-span-6',
    7: 'col-span-12 md:col-span-7',
    8: 'col-span-12 md:col-span-8',
    9: 'col-span-12 md:col-span-9',
    10: 'col-span-12 md:col-span-10',
    11: 'col-span-12 md:col-span-11',
    12: 'col-span-12',
  }

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
  }

  const gridClass = `${colSpanClasses[colSpan] || 'col-span-12'} ${rowSpanClasses[rowSpan] || 'row-span-1'}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      className={`${gridClass} group z-10 hover:z-20`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`glass-card p-6 flex flex-col h-full w-full ${className}`}
      >
        <div style={{ transform: 'translateZ(40px)', transformStyle: "preserve-3d" }} className="h-full flex flex-col">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
