import { motion, useTransform } from 'framer-motion'

export default function ShatterSection({ children, z, index, activeIndex }) {
  const isVisible = Math.abs(activeIndex - index) <= 1

  // Simple opacity fade — no scale transform (scale causes heavy repaints)
  const contentOpacity = useTransform(
    z,
    [
      index * 1000 - 600,
      index * 1000 - 50,
      index * 1000 + 50,
      index * 1000 + 600
    ],
    [0, 1, 1, 0]
  )

  return (
    <section
      className="absolute inset-0 w-full h-full"
      style={{
        transform: `translateZ(${-index * 1000}px)`,
        pointerEvents: activeIndex === index ? 'auto' : 'none',
        // Hide far-away sections without unmounting (avoids remount lag)
        visibility: isVisible ? 'visible' : 'hidden',
        contain: 'layout style paint',
      }}
    >
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  )
}
