import { motion } from 'framer-motion'
import BentoBox from '../components/BentoBox'

export default function About() {
  return (
    <div className="w-full h-full flex items-center justify-center relative p-4 md:p-8">
      
      {/* Ambient background glow for About */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-50 dark:opacity-20"></div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="max-w-6xl w-full flex flex-col md:flex-row gap-3 md:gap-12 items-center relative z-10 max-h-[90vh]"
      >
        
        <div className="w-full md:flex-[1.2] glass-card p-5 sm:p-6 md:p-16 relative overflow-hidden flex flex-col justify-center">
          {/* Decorative corner accent */}
          <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-3xl"></div>
          
          <div className="flex flex-row justify-between items-start gap-3 md:gap-4 mb-3 md:mb-8">
            <h2 className="font-display text-3xl sm:text-4xl md:text-7xl font-light text-[var(--text-primary)] uppercase tracking-tighter" id="about">
              The <span className="font-semibold text-gradient">Story</span>
            </h2>
            <img 
              src="/profile.png" 
              alt="Kavinprasanth KM — Full-Stack Developer and AI Specialist" 
              width="160"
              height="160"
              loading="lazy"
              decoding="async"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-40 md:h-40 object-cover rounded-xl md:rounded-3xl shadow-xl border border-[var(--glass-border)]" 
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-6 text-xs sm:text-sm md:text-xl text-[var(--text-secondary)] font-light leading-relaxed md:leading-relaxed relative overflow-hidden">
            <p>
              Kavinprasanth is a full-stack developer and AI engineer who builds 
              things that live on screens — from e-commerce platforms handling real 
              Razorpay payments to GAN-based AI systems that generate images from 
              scratch. Kavinprasanth doesn't just write code, he ships products.
            </p>
            <p>
              Currently pursuing B.Tech in Computer Science at Karunya Institute 
              of Technology, Kavinprasanth has hands-on experience across React, 
              Flutter, Python, PyTorch, and cybersecurity penetration testing. 
              Google Cloud Digital Leader certified, and a JWPT-certified 
              penetration tester from HackersDaddy.
            </p>
          </div>
        </div>

        <div className="w-full md:flex-[0.8] grid grid-cols-12 gap-2 md:gap-4 h-[180px] sm:h-[220px] md:h-[400px]">
          <BentoBox colSpan={6} rowSpan={2} delay={0.1} className="bg-gradient-to-br from-[var(--glass-bg)] to-cyan-900/10">
            <div className="flex flex-col items-center justify-center text-center h-full">
              <p className="font-display text-3xl sm:text-4xl md:text-7xl font-light text-[var(--text-primary)] mb-1 md:mb-2 drop-shadow-md">10+</p>
              <p className="text-[8px] sm:text-[9px] md:text-xs text-cyan-400 uppercase tracking-[2px] md:tracking-[4px] font-semibold">Projects</p>
            </div>
          </BentoBox>
          
          <BentoBox colSpan={6} rowSpan={1} delay={0.2} className="bg-gradient-to-br from-[var(--glass-bg)] to-indigo-900/10">
            <div className="flex flex-col items-center justify-center text-center h-full">
              <p className="font-display text-2xl sm:text-3xl md:text-5xl font-light text-[var(--text-primary)] mb-0 md:mb-1">19</p>
              <p className="text-[7px] sm:text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-[1px] md:tracking-[3px] font-bold">Tech Stack</p>
            </div>
          </BentoBox>

          <BentoBox colSpan={6} rowSpan={1} delay={0.3} className="bg-[var(--glass-bg)]">
            <div className="flex flex-col items-center justify-center text-center h-full">
              <p className="font-display text-2xl sm:text-3xl md:text-5xl font-light text-[var(--text-primary)] mb-0 md:mb-1">18</p>
              <p className="text-[7px] sm:text-[8px] md:text-[10px] text-[var(--text-secondary)] uppercase tracking-[1px] md:tracking-[3px] font-bold">Certifications</p>
            </div>
          </BentoBox>

          <BentoBox colSpan={12} rowSpan={1} delay={0.4} className="bg-gradient-to-r from-[var(--glass-bg)] to-cyan-900/20">
            <div className="flex flex-row items-center justify-center gap-3 md:gap-6 h-full text-center">
              <p className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-[var(--text-primary)]">1</p>
              <p className="text-[8px] sm:text-[10px] md:text-sm text-cyan-300 uppercase tracking-[2px] md:tracking-[5px] font-semibold">GCP Certified</p>
            </div>
          </BentoBox>
        </div>

      </motion.div>
    </div>
  )
}
