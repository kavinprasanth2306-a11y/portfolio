import { motion } from 'framer-motion'

const sectionNames = ['Home', 'About', 'Skills', 'Certs', 'Journey', 'Work', 'Contact']

export default function SectionDots({ activeIndex, setActiveIndex }) {
  return (
    <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 md:gap-3">
      {sectionNames.map((name, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className="group relative flex items-center justify-end"
          aria-label={`Go to ${name}`}
        >
          {/* Label tooltip */}
          <span className="absolute right-6 md:right-8 px-2 py-1 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap backdrop-blur-md">
            {name}
          </span>

          {/* Dot */}
          <motion.div
            className="rounded-full transition-colors duration-300"
            animate={{
              width: activeIndex === i ? 10 : 6,
              height: activeIndex === i ? 10 : 6,
              backgroundColor: activeIndex === i 
                ? 'rgb(34, 211, 238)' 
                : 'var(--text-secondary)',
              opacity: activeIndex === i ? 1 : 0.3,
            }}
            whileHover={{ opacity: 0.8, scale: 1.3 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      ))}
    </div>
  )
}
