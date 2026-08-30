import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { HiPaperAirplane } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const to = 'kavinprasanth2306@gmail.com'
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)

    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=cm&to=${to}&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank', 'width=680,height=600,scrollbars=yes')
  }

  const openGmail = () => {
    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=cm&to=kavinprasanth2306@gmail.com`
    window.open(gmailUrl, '_blank', 'width=680,height=600,scrollbars=yes')
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-4 md:p-8">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50 dark:opacity-30"></div>

      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="glass-card p-5 sm:p-8 md:p-16 max-w-5xl w-full flex flex-col md:flex-row gap-6 md:gap-16 relative z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        
        {/* Left - Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-display text-3xl sm:text-5xl md:text-[6rem] font-light text-[var(--text-primary)] mb-3 md:mb-4 uppercase tracking-tighter drop-shadow-sm leading-none">
            Let's <span className="font-semibold text-gradient">Talk</span>
          </h2>
          
          <p className="font-sans text-xs sm:text-base md:text-lg text-[var(--text-secondary)] font-light mb-5 md:mb-8 leading-relaxed">
            Interested in working together or have a question? 
            Drop a message and I'll get back to you soon.
          </p>

          <button
            onClick={openGmail}
            className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 text-xs md:text-sm font-medium text-[var(--text-primary)] w-fit mb-5 md:mb-8"
            aria-label="Open Gmail to send email"
          >
            <span>kavinprasanth2306@gmail.com</span>
          </button>

          <div className="flex gap-3 md:gap-4">
            <a href="https://github.com/kavinprasanth2306-a11y" target="_blank" rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-cyan-500 hover:text-white hover:border-cyan-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 backdrop-blur-md">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/Kavinprasanthkm" target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-indigo-500 hover:text-white hover:border-indigo-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 backdrop-blur-md">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
            <div>
              <label htmlFor="name" className="text-[9px] md:text-[10px] uppercase tracking-[3px] font-bold text-[var(--text-secondary)] mb-1.5 md:mb-2 block">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2.5 md:px-5 md:py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-xs md:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-[9px] md:text-[10px] uppercase tracking-[3px] font-bold text-[var(--text-secondary)] mb-1.5 md:mb-2 block">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 md:px-5 md:py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-xs md:text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-[9px] md:text-[10px] uppercase tracking-[3px] font-bold text-[var(--text-secondary)] mb-1.5 md:mb-2 block">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-2.5 md:px-5 md:py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-xs md:text-sm resize-none"
              />
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 md:px-8 md:py-4 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs md:text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
            >
              Send Message <HiPaperAirplane className="rotate-90" />
            </motion.button>
          </form>
        </div>

      </motion.div>
    </div>
  )
}
