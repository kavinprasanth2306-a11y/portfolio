import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * A vertical 3D bone/skeleton spine that runs down the entire page.
 * Each bone joint is a node where content sections connect.
 * Scroll drives the "activation" of each bone — it glows and rotates as you reach it.
 */

function Bone({ index, total, children, side = 'left' }) {
  const boneRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: boneRef,
    offset: ['start end', 'center center'],
  })

  // Bone activation progress
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.6])
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0])
  const rotateY = useTransform(scrollYProgress, [0, 1], [side === 'left' ? -15 : 15, 0])
  const z = useTransform(scrollYProgress, [0, 1], [-150, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // Bone connector line opacity
  const lineOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.8])
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])

  return (
    <div ref={boneRef} className="relative flex items-stretch min-h-[70vh]">
      {/* Bone joint (the node on the spine) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center z-0 pointer-events-none">
        {/* Vertical connector line */}
        <motion.div
          style={{ opacity: lineOpacity, scaleY: lineScale }}
          className="w-[1px] flex-grow bg-gradient-to-b from-primary/60 via-accent/40 to-transparent origin-top"
        />
        
        {/* Joint node */}
        <motion.div
          style={{ opacity: glow }}
          className="relative flex-shrink-0"
        >
          {/* Outer glow ring */}
          <motion.div
            style={{ scale: glow }}
            className="w-6 h-6 rounded-full border border-primary/40 absolute -inset-1.5"
          />
          {/* Inner dot */}
          <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
          
          {/* Bone arm extending to content */}
          <motion.div
            style={{ opacity: lineOpacity }}
            className={`absolute top-1/2 -translate-y-1/2 h-[1px] w-16 md:w-24 bg-gradient-to-r ${
              side === 'left' 
                ? 'right-full mr-1 from-transparent to-primary/50' 
                : 'left-full ml-1 from-primary/50 to-transparent'
            }`}
          />
        </motion.div>

        {/* Bottom connector */}
        <motion.div
          style={{ opacity: lineOpacity }}
          className="w-[1px] flex-grow bg-gradient-to-b from-transparent via-accent/30 to-primary/20"
        />
      </div>

      {/* Content attached to this bone */}
      <motion.div
        style={{ rotateX, rotateY, z, scale, opacity }}
        className={`relative z-10 w-full px-4 md:px-0 ${
          side === 'left' 
            ? 'md:w-[45%] md:mr-auto md:pr-20' 
            : 'md:w-[45%] md:ml-auto md:pl-20'
        }`}
      >
        <div style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

function SpineTop() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="absolute left-1/2 -translate-x-1/2 top-0 h-32 w-[1px] overflow-hidden">
      <motion.div style={{ height }} className="w-full bg-gradient-to-b from-transparent to-primary/60" />
    </div>
  )
}

export default function SkeletonSpine({ children }) {
  return (
    <div className="relative">
      {/* Central spine line (always visible faint) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none" />
      
      {children}
    </div>
  )
}

export { Bone, SkeletonSpine }
