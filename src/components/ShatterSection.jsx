import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'

export default function ShatterSection({ children, z, index, activeIndex }) {
  // Only render content for active section and immediate neighbors
  // Far-away sections are completely unmounted to save CPU
  const isNearby = Math.abs(activeIndex - index) <= 1

  const contentOpacity = useTransform(
    z,
    [
      index * 1000 - 800,
      index * 1000 - 100,
      index * 1000 + 100,
      index * 1000 + 800
    ],
    [0, 1, 1, 0]
  )

  const contentScale = useTransform(
    z,
    [index * 1000, index * 1000 + 1200],
    [1, 1.8]
  )

  return (
    <section
      className="absolute inset-0 w-full h-full"
      style={{
        transform: `translateZ(${-index * 1000}px)`,
        pointerEvents: activeIndex === index ? 'auto' : 'none',
        // GPU-accelerate the section container
        contain: 'layout style paint',
      }}
    >
      {isNearby ? (
        <motion.div 
          style={{ opacity: contentOpacity, scale: contentScale, willChange: 'transform, opacity' }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      ) : (
        // Placeholder for far-away sections — zero CPU cost
        <div className="w-full h-full" />
      )}
    </section>
  )
}
