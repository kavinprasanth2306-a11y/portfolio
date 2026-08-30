import { motion } from 'framer-motion'
import { HiCheckBadge } from 'react-icons/hi2'

const certsData = [
  { title: 'Google Cloud Digital Leader', issuer: 'Google Cloud', color: '#4285F4' },
  { title: 'Python Programming Fundamentals', issuer: 'DataCamp', color: '#3776AB' },
  { title: 'GitHub Foundations', issuer: 'DataCamp', color: '#333' },
  { title: 'MATLAB Onramp', issuer: 'MathWorks', color: '#0076A8' },
  { title: 'Git Fundamentals', issuer: 'DataCamp', color: '#F05032' },
  { title: 'Python Toolbox', issuer: 'DataCamp', color: '#3776AB' },
  { title: 'Intermediate GitHub Concepts', issuer: 'DataCamp', color: '#333' },
  { title: 'Advanced Git', issuer: 'DataCamp', color: '#F05032' },
]

import { GlassCracks, getCrackMask } from './Skills'

export default function Certificates() {
  return (
    <div className="w-full h-full flex flex-col justify-center relative bg-[var(--bg-primary)] p-4 md:p-20 overflow-hidden">
      
      <div 
        className="absolute top-1/3 left-0 text-[15vw] font-black text-[var(--text-primary)] opacity-5 whitespace-nowrap pointer-events-none select-none leading-none"
      >
        ACHIEVEMENTS
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col h-full justify-center">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-4 md:mb-10 gap-2">
          <h2 className="text-3xl md:text-6xl font-bold text-[var(--text-primary)] uppercase tracking-tighter">
            Key <span className="text-[#D4AF37]">Certifications</span>
          </h2>
          <p className="text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-widest">18 Certificates earned</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
          {certsData.map((cert, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-8 border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-bg)]/80 transition-colors group backdrop-blur-sm relative overflow-hidden"
              style={{
                borderRadius: i % 2 === 0 ? '1.5rem 0.25rem 1.5rem 0.25rem' : '0.25rem 1.5rem 0.25rem 1.5rem',
                WebkitMaskImage: getCrackMask(i),
                WebkitMaskSize: '100% 100%'
              }}
            >
              <GlassCracks index={i} />
              
              <HiCheckBadge className="mb-2 md:mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all relative z-10 text-2xl md:text-[40px]" style={{ color: cert.color }} />
              <h3 className="text-[9px] sm:text-[10px] md:text-sm font-bold text-[var(--text-primary)] text-center relative z-10 mb-1 md:mb-2 leading-snug">
                {cert.title}
              </h3>
              <p className="text-[7px] md:text-xs uppercase tracking-widest font-semibold relative z-10 text-center" style={{ color: cert.color }}>
                {cert.issuer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
