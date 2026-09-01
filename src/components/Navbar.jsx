import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi'

const navLinks = [
  { name: 'About', target: 1, href: '#about' },
  { name: 'Skills', target: 2, href: '#skills' },
  { name: 'Certs', target: 3, href: '#certifications' },
  { name: 'Journey', target: 4, href: '#experience' },
  { name: 'Work', target: 5, href: '#projects' },
  { name: 'Contact', target: 6, href: '#contact' },
]

export default function Navbar({ theme, toggleTheme, setActiveIndex, activeIndex = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScrollTo = (e, targetIndex) => {
    e.preventDefault()
    setMenuOpen(false)
    if (setActiveIndex !== undefined) {
      setActiveIndex(targetIndex)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="nav-glass"
      aria-label="Primary Navigation"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          onClick={(e) => handleScrollTo(e, 0)} 
          className="font-display font-bold text-lg md:text-xl text-current hover:opacity-80 transition-opacity"
          aria-label="Kavinprasanth KM Portfolio Home"
        >
          <span className="text-gradient">KP</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link, i) => {
            const isActive = activeIndex === link.target
            return (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.08 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.target)}
                  className={`text-xs lg:text-sm font-medium tracking-wide transition-colors duration-300 relative ${
                    isActive 
                      ? 'text-[var(--text-primary)]' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            )
          })}
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + navLinks.length * 0.08 }}
          >
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--glass-bg)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>
          </motion.li>
        </ul>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--glass-bg)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
          </button>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
          >
            <span className={`w-5 h-[1.5px] bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-5 h-[1.5px] bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-[1.5px] bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden flex flex-col gap-3 pt-3 pb-2 overflow-hidden"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleScrollTo(e, link.target)}
                  className={`text-sm font-medium ${
                    activeIndex === link.target 
                      ? 'text-cyan-400' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  aria-current={activeIndex === link.target ? 'page' : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
