import { motion } from 'framer-motion'
import { HiAcademicCap, HiBadgeCheck } from 'react-icons/hi'
import { SiGooglecloud, SiPython, SiGit } from 'react-icons/si'

const timelineData = [
  {
    type: 'education',
    title: 'B.Tech — Computer Science & Engineering',
    org: 'Karunya Institute of Technology and Sciences',
    period: '2025 — 2029',
    description: 'Focusing on AI/Deep Learning, software engineering, and cross-platform development.',
    icon: HiAcademicCap,
    color: '#6366f1',
  },
  {
    type: 'cert',
    title: 'Google Cloud Digital Leader',
    org: 'Google Cloud',
    period: 'May 2026',
    description: 'Certified in cloud concepts, Google Cloud products, and digital transformation strategies.',
    icon: SiGooglecloud,
    color: '#4285F4',
  },
  {
    type: 'cert',
    title: 'Python Programming Track (6 Courses)',
    org: 'DataCamp',
    period: 'Jan 2026',
    description: 'Intro to Python, Intermediate Python, Data Types, Python Toolbox, and Programming Fundamentals.',
    icon: SiPython,
    color: '#3776AB',
  },
  {
    type: 'cert',
    title: 'Git & GitHub Track (7 Courses)',
    org: 'DataCamp',
    period: 'Jan 2026',
    description: 'Intro to Git, Intermediate Git, Advanced Git, Git Fundamentals, GitHub Foundations, and more.',
    icon: SiGit,
    color: '#F05032',
  },
  {
    type: 'cert',
    title: 'MATLAB Onramp',
    org: 'MathWorks',
    period: 'Jan 2026',
    description: 'Self-paced MATLAB fundamentals course — 100% completion.',
    icon: HiBadgeCheck,
    color: '#0076A8',
  },
]

export default function Experience() {
  return (
    <div className="w-full h-full flex flex-col items-center relative p-4 md:p-8 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-40 dark:opacity-20"></div>

      <div 
        className="max-w-5xl w-full relative z-10 flex flex-col h-full overflow-y-auto pt-14 md:pt-16 pb-4"
        data-lenis-prevent="true"
      >
        <div className="mb-4 md:mb-8 flex-shrink-0">
          <h2 className="font-display text-3xl sm:text-4xl md:text-7xl font-light text-[var(--text-primary)] uppercase tracking-tighter">
            My <span className="font-semibold text-gradient">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--glass-border)] via-cyan-500/30 to-[var(--glass-border)]"></div>

          <div className="flex flex-col gap-3 md:gap-4">
            {timelineData.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-10 md:pl-16 group"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-1 md:left-4 top-3 md:top-4 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center bg-[var(--bg-primary)] z-10 group-hover:scale-125 transition-transform duration-300"
                    style={{ borderColor: item.color }}
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  </div>

                  {/* Content card */}
                  <div className="glass-card p-3 md:p-5 group-hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 mb-0.5 md:mb-1">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Icon size={12} className="md:hidden" style={{ color: item.color }} />
                        <Icon size={14} className="hidden md:block" style={{ color: item.color }} />
                        <span className="text-[8px] md:text-[10px] uppercase tracking-[2px] md:tracking-[3px] font-bold" style={{ color: item.color }}>
                          {item.period}
                        </span>
                      </div>
                      <span className="text-[8px] md:text-xs text-[var(--text-secondary)] font-medium">
                        {item.org}
                      </span>
                    </div>
                    <h3 className="text-[11px] sm:text-sm md:text-lg font-bold text-[var(--text-primary)] mb-0.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[9px] md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
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
