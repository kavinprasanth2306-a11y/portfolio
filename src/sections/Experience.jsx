import { motion } from 'framer-motion'
import { HiAcademicCap, HiDownload, HiBriefcase } from 'react-icons/hi'

const timelineData = [
  {
    type: 'education',
    title: 'B.Tech — Computer Science & Engineering',
    org: 'Karunya Institute of Technology and Sciences',
    period: '2022 — Present',
    description: 'Focusing on AI/Deep Learning, software engineering, and cross-platform development.',
    icon: HiAcademicCap,
    color: '#6366f1',
  },
  {
    type: 'cert',
    title: 'Deep Learning with PyTorch: Zero to GANs',
    org: 'Jovian',
    period: '2024',
    description: 'Mastered neural networks, CNNs, GANs, and transfer learning using PyTorch.',
    icon: HiAcademicCap,
    color: '#06b6d4',
  },
  {
    type: 'cert',
    title: 'Certified Ethical Hacker (CEH) Prep',
    org: 'EC-Council',
    period: '2024',
    description: 'Network security, penetration testing, and vulnerability assessment fundamentals.',
    icon: HiBriefcase,
    color: '#2e8b57',
  },
]

export default function Experience() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-8 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-40 dark:opacity-20"></div>

      <div className="max-w-5xl w-full relative z-10 flex flex-col h-full justify-center">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12 gap-4">
          <h2 className="font-display text-4xl md:text-7xl font-light text-[var(--text-primary)] uppercase tracking-tighter">
            My <span className="font-semibold text-gradient">Journey</span>
          </h2>
          
          {/* Resume Download Button */}
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 w-fit"
          >
            <HiDownload size={16} />
            Download Resume
          </motion.a>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--glass-border)] via-cyan-500/30 to-[var(--glass-border)]"></div>

          <div className="flex flex-col gap-4 md:gap-6">
            {timelineData.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-12 md:pl-16 group"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-2 md:left-4 top-5 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-[var(--bg-primary)] z-10 group-hover:scale-125 transition-transform duration-300"
                    style={{ borderColor: item.color }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  </div>

                  {/* Content card */}
                  <div className="glass-card p-5 md:p-8 group-hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon size={16} style={{ color: item.color }} />
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[3px] font-bold" style={{ color: item.color }}>
                          {item.period}
                        </span>
                      </div>
                      <span className="text-[9px] md:text-xs text-[var(--text-secondary)] font-medium">
                        {item.org}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-xl font-bold text-[var(--text-primary)] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[10px] md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
