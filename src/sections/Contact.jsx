import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
      
      {/* Ambient background glow for Contact */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50 dark:opacity-30"></div>

      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="glass-card p-12 md:p-24 max-w-4xl w-full flex flex-col items-center text-center relative z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        
        <h2 className="font-display text-6xl md:text-[8rem] font-light text-[var(--text-primary)] mb-6 uppercase tracking-tighter drop-shadow-sm">
          Let's <span className="font-semibold text-gradient">Talk</span>
        </h2>
        
        <p className="font-sans text-xl md:text-2xl text-[var(--text-secondary)] font-light mb-14 max-w-2xl leading-relaxed">
          Interested in working together or have a question? 
          Drop a message and I'll get back to you soon.
        </p>

        <a href="mailto:kavinkm@example.com" 
          className="relative group px-12 py-6 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold rounded-full hover:scale-105 transition-all duration-500 text-xl mb-16 overflow-hidden shadow-2xl">
          <span className="relative z-10">kavinkm@example.com</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="absolute inset-0 z-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="relative z-10 group-hover:text-white transition-colors duration-500 absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100">kavinkm@example.com</span>
        </a>

        <div className="flex gap-8">
          <a href="https://github.com/kavinprasanth2306-a11y" target="_blank" rel="noopener noreferrer"
            className="w-16 h-16 rounded-full border border-white/10 bg-black/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-cyan-500 hover:text-white hover:border-cyan-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 backdrop-blur-md">
            <FaGithub size={28} />
          </a>
          <a href="https://linkedin.com/in/Kavinprasanthkm" target="_blank" rel="noopener noreferrer"
            className="w-16 h-16 rounded-full border border-white/10 bg-black/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-indigo-500 hover:text-white hover:border-indigo-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 backdrop-blur-md">
            <FaLinkedinIn size={28} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer"
            className="w-16 h-16 rounded-full border border-white/10 bg-black/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-blue-400 hover:text-white hover:border-blue-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all duration-300 backdrop-blur-md">
            <FaTwitter size={28} />
          </a>
        </div>

      </motion.div>
    </div>
  )
}
