import { motion } from 'framer-motion'
import { HiCheckBadge } from 'react-icons/hi2'

const certsData = [
  { title: 'Deep Learning with PyTorch: Zero to GANs', issuer: 'Jovian' },
  { title: 'Mastering REST APIs with Node.js and Express', issuer: 'Postman' },
  { title: 'Fundamentals of App Development', issuer: 'Apple' },
  { title: 'Certified Ethical Hacker (CEH) prep', issuer: 'EC-Council' },
]

import { GlassCracks, getCrackMask } from './Skills'

export default function Certificates() {
  return (
    <div className="w-full h-full flex flex-col justify-center relative bg-[var(--bg-primary)] p-8 md:p-20 overflow-hidden">
      
      <div 
        className="absolute top-1/3 left-0 text-[15vw] font-black text-[var(--text-primary)] opacity-5 whitespace-nowrap pointer-events-none select-none leading-none"
      >
        ACHIEVEMENTS
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col h-full justify-center">
        <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-12 uppercase tracking-tighter">
          Key <span className="text-[#D4AF37]">Certifications</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certsData.map((cert, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center p-10 border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-bg)]/80 transition-colors group backdrop-blur-sm relative overflow-hidden"
              style={{
                borderRadius: i % 2 === 0 ? '2.5rem 0.5rem 2.5rem 0.5rem' : '0.5rem 2.5rem 0.5rem 2.5rem',
                WebkitMaskImage: getCrackMask(i),
                WebkitMaskSize: '100% 100%'
              }}
            >
              <GlassCracks index={i} />
              
              <HiCheckBadge className="text-[#D4AF37] mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all relative z-10" size={50} />
              <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] text-center relative z-10 mb-3 leading-snug">
                {cert.title}
              </h3>
              <p className="text-sm text-[#D4AF37] uppercase tracking-widest font-semibold relative z-10 text-center">
                {cert.issuer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

