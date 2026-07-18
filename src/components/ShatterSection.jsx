import { motion, useTransform } from 'framer-motion'

export default function ShatterSection({ children, z, index, activeIndex }) {
  // We receive the global 'z' transform from App.jsx (which goes from 0 to 5000)
  // This section is physically placed at Z = -index * 1000
  // When 'z' reaches (index * 1000 + 400), it means the section is passing through the camera.
  
  const shatterProgress = useTransform(
    z,
    [index * 1000 + 400, index * 1000 + 1200],
    [0, 1]
  );

  // The main content rapidly fades out and scales up as if hitting the camera
  const contentOpacity = useTransform(shatterProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(shatterProgress, [0, 1], [1, 1.8]);

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
