import { motion } from 'framer-motion'
import { HiAcademicCap, HiBadgeCheck, HiShieldCheck } from 'react-icons/hi'
import { SiGooglecloud, SiPython, SiGit } from 'react-icons/si'

const timelineData = [
  {
    type: 'experience',
    title: 'Penetration Tester — Intern',
    org: 'HackersDaddy Cyber Security Solutions · London, UK (Remote)',
    period: 'Jun 2026 — Jul 2026',
    points: [
      'Conducted web application penetration testing, VAPT assessments, and API security audits across real-world lab environments',
      'Performed reconnaissance, vulnerability scanning, and exploitation using industry-standard offensive security methodologies',
      'Cleared the Junior WebApp Penetration Tester (JWPT) certification examination',
      'Selected through the competitive "Hashes Over Roses 3.0" cybersecurity event',
    ],
    icon: HiShieldCheck,
    color: '#ef4444',
    badge: 'WORK EXPERIENCE',
  },
  {
    type: 'education',
    title: 'B.Tech — Computer Science & Engineering',
    org: 'Karunya Institute of Technology and Sciences · Coimbatore',
    period: '2025 — 2029',
    points: [
      'Specializing in Artificial Intelligence, Deep Learning, and Full-Stack Development',
      'Building production-grade projects across web, mobile, and AI domains',
      'Active in cybersecurity communities and competitive programming',
    ],
    icon: HiAcademicCap,
    color: '#6366f1',
    badge: 'EDUCATION',
  },
  {
    type: 'cert',
    title: 'Google Cloud Digital Leader',
    org: 'Google Cloud · Credential ID: 5a0ef374',
    period: 'May 2026',
    points: [
      'Certified in cloud computing concepts, Google Cloud products & services, and digital transformation strategies',
      'Valid through May 2029',
    ],
    icon: SiGooglecloud,
    color: '#4285F4',
    badge: 'CERTIFICATION',
  },
  {
    type: 'cert',
    title: 'Python Programming — 6 Course Track',
    org: 'DataCamp · 13+ hours completed',
    period: 'Jan 2026',
    points: [
      'Introduction to Python, Intermediate Python for Developers, Data Types in Python',
      'Python Toolbox, Python Programming Fundamentals',
    ],
    icon: SiPython,
    color: '#3776AB',
    badge: 'CERTIFICATION',
  },
  {
    type: 'cert',
    title: 'Git & GitHub — 7 Course Track',
    org: 'DataCamp · 22+ hours completed',
    period: 'Jan 2026',
    points: [
      'Introduction to Git, Intermediate Git, Advanced Git, Git Fundamentals',
      'GitHub Foundations, Intro to GitHub Concepts, Intermediate GitHub Concepts',
    ],
    icon: SiGit,
    color: '#F05032',
    badge: 'CERTIFICATION',
  },
  {
    type: 'cert',
    title: 'MATLAB Onramp',
    org: 'MathWorks · Self-Paced',
    period: 'Jan 2026',
    points: [
      'Completed the official MATLAB fundamentals course with 100% score',
    ],
    icon: HiBadgeCheck,
    color: '#0076A8',
    badge: 'CERTIFICATION',
  },
]

// Timeline animation
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: { 
    opacity: 1, x: 0, scale: 1,
    transition: { type: 'spring', stiffness: 150, damping: 20 }
  }
}

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
          <h2 className="font-display text-3xl sm:text-4xl md:text-7xl font-light text-[var(--text-primary)] uppercase tracking-tighter" id="experience">
            Kavinprasanth's <span className="font-semibold text-gradient">Journey</span>
          </h2>
          <p className="text-[10px] md:text-sm text-[var(--text-secondary)] mt-2 font-light">
            Kavinprasanth KM's professional experience, education & certifications
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 via-indigo-500/30 to-[var(--glass-border)]"></div>

          <motion.div 
            className="flex flex-col gap-3 md:gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {timelineData.map((item, i) => {
              const Icon = item.icon
              const isExperience = item.type === 'experience'
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative pl-10 md:pl-16 group"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1 md:left-4 top-3 md:top-4 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center bg-[var(--bg-primary)] z-10 group-hover:scale-125 transition-transform duration-300 ${isExperience ? 'ring-2 ring-offset-1 ring-offset-[var(--bg-primary)]' : ''}`}
                    style={{ borderColor: item.color }}
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  </div>

                  {/* Content card */}
                  <div className={`glass-card p-3 md:p-5 group-hover:shadow-lg transition-all duration-300 ${isExperience ? 'border-l-2' : ''}`} style={isExperience ? { borderLeftColor: item.color } : {}}>
                    {/* Badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-1 md:mb-2">
                      <span 
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[6px] md:text-[8px] font-bold uppercase tracking-[2px]"
                        style={{ backgroundColor: item.color + '15', color: item.color }}
                      >
                        <Icon size={10} />
                        {item.badge}
                      </span>
                      <span className="text-[8px] md:text-[10px] text-[var(--text-secondary)] font-medium">
                        {item.period}
                      </span>
                    </div>

                    {/* Title & Org */}
                    <h3 className="text-[11px] sm:text-sm md:text-lg font-bold text-[var(--text-primary)] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[8px] md:text-xs text-[var(--text-secondary)] font-medium mb-1.5 md:mb-3">
                      {item.org}
                    </p>

                    {/* Bullet points */}
                    <ul className="flex flex-col gap-0.5 md:gap-1.5">
                      {item.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-1.5 md:gap-2 text-[8px] md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                          <span className="mt-1 md:mt-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color, opacity: 0.6 }}></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
