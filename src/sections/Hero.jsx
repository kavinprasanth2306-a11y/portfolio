import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Hero() {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: window.innerHeight * 2,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
      
      {/* Ambient background glow for Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50 dark:opacity-30"></div>

      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-card p-12 md:p-24 max-w-6xl w-full flex flex-col items-center text-center relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-block px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-bold uppercase tracking-[0.4em] mb-10 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          Hello, I'm
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-display text-6xl md:text-8xl lg:text-[9rem] font-light text-[var(--text-primary)] leading-[1.05] tracking-tighter mb-8 drop-shadow-sm"
        >
          Kavin<br className="md:hidden" /><span className="font-semibold text-gradient">prasanth</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-3xl text-[var(--text-secondary)] font-sans font-light mb-14 h-12"
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
          className="flex flex-wrap items-center justify-center gap-6 mt-4"
        >
          <a href="#projects" onClick={handleScrollToProjects} 
            className="px-10 py-5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-sm uppercase tracking-wider hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
            Explore Work
          </a>
          <div className="flex gap-4">
            <a href="https://github.com/kavinprasanth2306-a11y" target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:scale-110 transition-all duration-300 shadow-lg">
              <FaGithub size={22} />
            </a>
            <a href="https://linkedin.com/in/Kavinprasanthkm" target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:scale-110 transition-all duration-300 shadow-lg">
              <FaLinkedinIn size={22} />
            </a>
          </div>
        </motion.div>
      </motion.div>
      
    </div>
  )
}
