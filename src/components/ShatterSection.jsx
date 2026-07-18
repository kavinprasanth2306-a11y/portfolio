import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'

export default function ShatterSection({ children, z, index }) {
  // We receive the global 'z' transform from App.jsx (which goes from 0 to 3000)
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
  const contentBlur = useTransform(shatterProgress, [0, 0.4], ["blur(0px)", "blur(20px)"]);

  // Generate 15 glass shards with random trajectories
  const shards = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 15 + (Math.random() * 0.5);
      const distance = 1000 + Math.random() * 1500;
      return {
        targetX: Math.cos(angle) * distance,
        targetY: Math.sin(angle) * distance,
        targetRotate: Math.random() * 1080 - 540, // spin a lot
        shapeIndex: i % 4
      };
    });
  }, []);

  const clipPaths = [
    "polygon(50% 0%, 0% 100%, 100% 100%)", // Triangle
    "polygon(20% 0%, 100% 30%, 80% 100%, 0% 70%)", // Jagged quad
    "polygon(0% 0%, 100% 50%, 0% 100%)", // Sideways triangle
    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" // Diamond
  ];

  return (
    <section className="absolute inset-0 w-full h-full" style={{ transform: `translateZ(${-index * 1000}px)` }}>
      
      {/* Main Section Content */}
      <motion.div 
        style={{ opacity: contentOpacity, scale: contentScale, filter: contentBlur, willChange: 'transform, opacity, filter' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Flying Glass Shards Overlay */}
      {shards.map((shard, i) => {
        // Map the 0-1 shatterProgress to actual movement for each shard
        const x = useTransform(shatterProgress, [0, 1], [0, shard.targetX]);
        const y = useTransform(shatterProgress, [0, 1], [0, shard.targetY]);
        const rotate = useTransform(shatterProgress, [0, 1], [0, shard.targetRotate]);
        
        // Shards appear suddenly, then fade out
        const opacity = useTransform(shatterProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
        
        // Shards scale up aggressively to simulate hitting the camera
        const scale = useTransform(shatterProgress, [0, 1], [0.1, 4]);

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-40 h-40 bg-[var(--text-primary)]/10 border-2 border-[var(--glass-border)] shadow-[0_0_30px_var(--glass-border)]"
            style={{
              x, y, rotate, opacity, scale,
              clipPath: clipPaths[shard.shapeIndex],
              marginLeft: '-5rem', // Center the shape initially
              marginTop: '-5rem',
              pointerEvents: 'none', // Don't block clicks when not shattered
              willChange: 'transform, opacity' // Hardware acceleration hint
            }}
          />
        )
      })}
    </section>
  )
}
