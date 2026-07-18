import { motion, useTransform } from 'framer-motion'

export default function ShatterSection({ children, z, index, activeIndex }) {
  // We receive the global 'z' transform from App.jsx (which goes from 0 to 5000)
  // This section is physically placed at Z = -index * 1000
  
  // Fade in as camera approaches, stay visible while active, fade out as camera passes through
  const contentOpacity = useTransform(
    z,
    [
      index * 1000 - 800,   // Starts fading in
      index * 1000 - 100,   // Fully visible when active
      index * 1000 + 100,   // Starts fading out as we leave
      index * 1000 + 800    // Completely invisible by the time next section lands
    ],
    [0, 1, 1, 0]
  );

  // Scale up rapidly as it passes through the camera to create the "fly-through" effect
  const contentScale = useTransform(
    z,
    [
      index * 1000,
      index * 1000 + 1200
    ],
    [1, 1.8]
  );

  return (
    <section className="absolute inset-0 w-full h-full" style={{ transform: `translateZ(${-index * 1000}px)`, pointerEvents: activeIndex === index ? 'auto' : 'none' }}>
      
      {/* Main Section Content */}
      <motion.div 
        style={{ opacity: contentOpacity, scale: contentScale, willChange: 'transform, opacity' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  )
}
