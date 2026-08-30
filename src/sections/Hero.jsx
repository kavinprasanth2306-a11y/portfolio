import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-4 md:p-8">
      
      {/* Ambient background glow for Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50 dark:opacity-30"></div>

      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-card p-5 sm:p-8 md:p-20 max-w-6xl w-full flex flex-col items-center text-center relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-block px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs md:text-sm font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-10 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          Hello, I'm
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-light text-[var(--text-primary)] leading-[1.05] tracking-tighter mb-4 md:mb-8 drop-shadow-sm"
        >
          Kavin<br className="sm:hidden" /><span className="font-semibold text-gradient">prasanth</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-base sm:text-xl md:text-3xl text-[var(--text-secondary)] font-sans font-light mb-8 md:mb-14 h-8 md:h-12"
        >
          <TypeAnimation
            sequence={['Software Engineer', 2500, 'AI Specialist', 2500, 'Full Stack Dev', 2500]}
            wrapper="span"
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-2 md:mt-4"
        >
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigate-section', { detail: 5 }))}
            className="px-6 py-3 md:px-10 md:py-5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs md:text-sm uppercase tracking-wider hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
            Explore Work
          </button>
          <div className="flex gap-3 md:gap-4">
            <a href="https://github.com/kavinprasanth2306-a11y" target="_blank" rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:scale-110 transition-all duration-300 shadow-lg">
              <FaGithub size={18} className="md:hidden" />
              <FaGithub size={22} className="hidden md:block" />
            </a>
            <a href="https://linkedin.com/in/Kavinprasanthkm" target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:scale-110 transition-all duration-300 shadow-lg">
              <FaLinkedinIn size={18} className="md:hidden" />
              <FaLinkedinIn size={22} className="hidden md:block" />
            </a>
          </div>
        </motion.div>
      </motion.div>
      
    </div>
  )
}
