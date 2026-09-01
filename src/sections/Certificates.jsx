import { motion } from 'framer-motion'
import { HiCheckBadge } from 'react-icons/hi2'
import { SiGooglecloud, SiPython, SiGit, SiGithub } from 'react-icons/si'
import { FaCode } from 'react-icons/fa'

const certsData = [
  // Google Cloud
  { title: 'Cloud Digital Leader', issuer: 'Google Cloud', color: '#4285F4', icon: SiGooglecloud, featured: true },
  
  // Python Track
  { title: 'Python Programming Fundamentals', issuer: 'DataCamp', color: '#3776AB', icon: SiPython, featured: true },
  { title: 'Intro to Python for Developers', issuer: 'DataCamp', color: '#3776AB', icon: SiPython },
  { title: 'Intermediate Python for Developers', issuer: 'DataCamp', color: '#3776AB', icon: SiPython },
  { title: 'Data Types in Python', issuer: 'DataCamp', color: '#3776AB', icon: SiPython },
  { title: 'Python Toolbox', issuer: 'DataCamp', color: '#3776AB', icon: SiPython },

  // Git Track
  { title: 'GitHub Foundations', issuer: 'DataCamp', color: '#333', icon: SiGithub, featured: true },
  { title: 'Git Fundamentals', issuer: 'DataCamp', color: '#F05032', icon: SiGit },
  { title: 'Introduction to Git', issuer: 'DataCamp', color: '#F05032', icon: SiGit },
  { title: 'Intermediate Git', issuer: 'DataCamp', color: '#F05032', icon: SiGit },
  { title: 'Advanced Git', issuer: 'DataCamp', color: '#F05032', icon: SiGit },
  { title: 'Intro to GitHub Concepts', issuer: 'DataCamp', color: '#333', icon: SiGithub },
  { title: 'Intermediate GitHub Concepts', issuer: 'DataCamp', color: '#333', icon: SiGithub },

  // MATLAB
  { title: 'MATLAB Onramp', issuer: 'MathWorks', color: '#0076A8', icon: FaCode, featured: true },

  // JWPT
  { title: 'JWPT Certification', issuer: 'JWPT', color: '#D4AF37', icon: HiCheckBadge, featured: true },
]

// Remove duplicates by title
const uniqueCerts = certsData.filter((cert, index, self) =>
  index === self.findIndex(c => c.title === cert.title)
)

// Stagger animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    scale: 0.9,
    rotateX: 15 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    }
  }
}

export default function Certificates() {
  return (
    <div className="w-full h-full flex flex-col items-center relative bg-[var(--bg-primary)] p-4 md:p-8 overflow-hidden">
      
      {/* Animated background text */}
      <motion.div 
        animate={{ x: [0, -200, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 left-0 text-[15vw] font-black text-[var(--text-primary)] opacity-[0.03] whitespace-nowrap pointer-events-none select-none leading-none"
      >
        ACHIEVEMENTS · CERTIFICATIONS · SKILLS · ACHIEVEMENTS · CERTIFICATIONS
      </motion.div>

      {/* Floating orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] right-[10%] w-32 h-32 md:w-64 md:h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[20%] left-[5%] w-40 h-40 md:w-48 md:h-48 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"
      />

      <div 
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col h-full overflow-y-auto pt-14 md:pt-16 pb-4"
        data-lenis-prevent="true"
      >
        {/* Header with count badge */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-4 md:mb-8 gap-2 flex-shrink-0">
          <div>
            <h2 className="text-3xl md:text-6xl font-bold text-[var(--text-primary)] uppercase tracking-tighter" id="certifications">
              Key <span className="text-[#D4AF37]">Certifications</span>
            </h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10"
          >
            <HiCheckBadge className="text-[#D4AF37]" size={16} />
            <span className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{uniqueCerts.length} Earned</span>
          </motion.div>
        </div>
        
        {/* Certificate Grid with stagger */}
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {uniqueCerts.map((cert, i) => {
            const Icon = cert.icon || HiCheckBadge
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: `0 20px 40px ${cert.color}20`,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col items-center justify-center p-2.5 sm:p-3 md:p-6 border bg-[var(--glass-bg)] group backdrop-blur-sm cursor-pointer overflow-hidden ${
                  cert.featured 
                    ? 'border-[#D4AF37]/30 col-span-1 sm:col-span-1' 
                    : 'border-[var(--glass-border)]'
                }`}
                style={{
                  borderRadius: i % 3 === 0 ? '1.2rem 0.25rem' : i % 3 === 1 ? '0.25rem 1.2rem' : '0.75rem',
                }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${cert.color}15, transparent 70%)` }}
                />

                {/* Featured badge */}
                {cert.featured && (
                  <div className="absolute top-1 right-1 md:top-2 md:right-2">
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4AF37]" />
                    </motion.div>
                  </div>
                )}
                
                {/* Icon with pulse on hover */}
                <Icon 
                  className="mb-1.5 md:mb-3 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 relative z-10 text-lg sm:text-xl md:text-3xl" 
                  style={{ color: cert.color }} 
                />
                
                <h3 className="text-[7px] sm:text-[8px] md:text-xs font-bold text-[var(--text-primary)] text-center relative z-10 mb-0.5 md:mb-1 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-[6px] sm:text-[7px] md:text-[10px] uppercase tracking-wider font-semibold relative z-10 text-center opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: cert.color }}>
                  {cert.issuer}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
