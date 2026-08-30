import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowRight, HiX } from 'react-icons/hi'
import { GlassCracks, getCrackMask } from './Skills'

const projectsData = [
  {
    title: 'Wazabi',
    accent: '#818cf8',
    mockup: '/projects/wazabi.png',
    context: 'A full-stack premium e-commerce platform with product catalog, cart, wishlist, Razorpay payments, admin dashboard, and user authentication.',
    challenge: 'Building a complete shopping experience with JWT auth, SQLite database, Razorpay payment integration, admin product management, and responsive mobile-first design.',
    outcome: 'Live e-commerce site with auth (login/register), cart & checkout flow, Razorpay payments, admin dashboard with analytics, wishlist, and search — all production-ready.',
    link: 'https://wazabi.in',
    tech: ["React", "TypeScript", "Express", "Razorpay"],
    monogram: "WZ",
    glow: "bg-indigo-500"
  },
  {
    title: 'AI Image Generator',
    accent: '#f43f5e',
    mockup: 'https://placehold.co/800x450/1a0a0f/f43f5e?text=AI+Image+Gen',
    context: 'A GAN-based image generation system with a Flask API and web interface — type a class name and generate images from trained models.',
    challenge: 'Training stable GANs and autoencoders on custom datasets, balancing generator/discriminator, and serving models via a real-time Flask API with CUDA support.',
    outcome: 'Trained Generator + Autoencoder models (.pth), REST API for on-demand image generation, and a clean web UI for interacting with the models.',
    link: 'https://github.com/kavinprasanth2306-a11y',
    tech: ["Python", "PyTorch", "Flask", "GANs"],
    monogram: "AI",
    glow: "bg-rose-500"
  },
  {
    title: 'CTF Toolkit',
    accent: '#2e8b57',
    mockup: 'https://placehold.co/800x450/0a1a0f/2e8b57?text=CTF+Toolkit',
    context: 'An automated Capture The Flag challenge solver — a comprehensive Python CLI toolkit for recon, web exploitation, crypto, and more.',
    challenge: 'Building modular solvers that chain together: port scanning → directory busting → SQL injection → XSS detection → crypto decoding, all from a single CLI.',
    outcome: 'A full CTF automation suite with Nmap wrappers, SQLMap integration, XSS/LFI detection, hash cracking, and auto-solve pipelines.',
    link: 'https://github.com/kavinprasanth2306-a11y',
    tech: ["Python", "Nmap", "SQLMap", "Cyber Sec"],
    monogram: "CT",
    glow: "bg-emerald-500"
  },
  {
    title: 'MemSee',
    accent: '#38bdf8',
    mockup: 'https://placehold.co/800x450/050520/38bdf8?text=MemSee',
    context: 'An interactive addressing mode visualizer for computer architecture — watch data flow between IR, ALU, MAR, and Memory in real-time.',
    challenge: 'Simulating CPU data paths with animated visualizations, computing effective addresses live, and integrating Google Gemini AI for contextual explanations.',
    outcome: 'A complete learning tool with real-time CPU simulation, AI-powered insights via Gemini, and support for Immediate, Register, Direct, Indirect, and Indexed modes.',
    link: 'https://github.com/kavinprasanth2306-a11y',
    tech: ["React", "TypeScript", "Gemini AI", "Vite"],
    monogram: "MS",
    glow: "bg-sky-500"
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null)
      }
    }
    
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown)
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject])

  return (
    <div className="w-full min-h-screen bg-[var(--bg-secondary)] relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute -top-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[var(--accent-glow)] blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute top-[40%] -left-[10%] w-[30vw] h-[30vw] rounded-full bg-teal-500 blur-[150px] opacity-10 pointer-events-none" />

      <div 
        className="w-full max-w-7xl h-full flex flex-col relative z-10 overflow-y-auto custom-scrollbar rounded-3xl pb-16 pt-12 md:pt-0"
        data-lenis-prevent="true"
      >
        <div className="sticky top-0 z-30 pt-2 md:pt-12 pb-3 md:pb-6 bg-[var(--bg-secondary)]/90 backdrop-blur-xl border-b border-[var(--glass-border)] mb-4 md:mb-12 px-3 md:px-10">
          <h2 className="text-2xl md:text-6xl font-bold text-[var(--text-primary)] mb-1 md:mb-4 uppercase tracking-tighter">
            Featured <span className="text-teal-400">Work</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--glass-border)] rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 px-2 md:px-10">
          {projectsData.map((project, idx) => (
            <motion.div 
              key={project.title}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={() => setSelectedProject(project)}
              className="relative overflow-hidden cursor-pointer group flex flex-col h-[180px] sm:h-[220px] md:h-[280px] border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-xl dark:shadow-2xl"
              style={{
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -4px 10px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.1)',
                borderRadius: idx % 2 === 0 ? '2rem 0.5rem 2rem 0.5rem' : '0.5rem 2rem 0.5rem 2rem',
                WebkitMaskImage: getCrackMask(idx),
                WebkitMaskSize: '100% 100%'
              }}
            >
              <GlassCracks index={idx} />
              
              {/* Project Image Area */}
              <div className="w-full h-1/2 relative overflow-hidden z-10 bg-black/5">
                 <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay ${project.glow}`} />
                 
                 <img 
                    src={project.mockup} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 
                 <div className="absolute top-2 right-2 flex gap-1">
                    {project.tech.slice(0, 1).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 text-[7px] md:text-[8px] font-bold tracking-widest uppercase bg-black/40 text-white backdrop-blur-md rounded-full border border-white/10">
                        {t}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Project Info Area */}
              <div className="w-full h-1/2 p-3 md:p-5 relative z-20 flex flex-col justify-center bg-[var(--bg-secondary)]/60 backdrop-blur-md border-t border-[var(--glass-border)]">
                <div className="absolute top-0 left-0 w-full h-[2px] opacity-80 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundColor: project.accent }}></div>
                
                <h3 className="text-sm md:text-lg font-bold text-[var(--text-primary)] mb-1 tracking-tight group-hover:text-teal-500 transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-[10px] md:text-xs line-clamp-2 leading-relaxed mb-2 md:mb-3">
                  {project.context}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)] opacity-70 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-300">
                  View Details <HiArrowRight />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar relative flex flex-col lg:flex-row border border-[var(--glass-border)] rounded-3xl bg-[var(--bg-primary)] shadow-2xl"
              data-lenis-prevent="true"
            >
              <button 
                ref={closeButtonRef}
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors backdrop-blur-md border border-white/10"
                aria-label="Close modal"
              >
                <HiX size={20} />
              </button>

              <div className="w-full lg:w-1/2 h-48 md:h-64 lg:h-auto relative bg-black/20">
                <div 
                  className="absolute inset-0 blur-3xl opacity-20"
                  style={{ backgroundColor: selectedProject.accent }}
                ></div>
                <img 
                  src={selectedProject.mockup} 
                  className="w-full h-full object-cover relative z-10" 
                  alt={selectedProject.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--bg-primary)] z-10"></div>
              </div>

              <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col gap-5 md:gap-8 relative z-10">
                <div>
                  <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-md" style={{ color: selectedProject.accent }}>
                    {selectedProject.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base lg:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                    {selectedProject.context}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 text-[9px] md:text-[10px] font-bold tracking-widest uppercase rounded-full border border-[var(--glass-border)] text-[var(--text-secondary)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex flex-col gap-2 p-4 md:p-5 rounded-2xl bg-[var(--text-primary)]/5 border border-[var(--glass-border)] backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: selectedProject.accent, opacity: 0.5 }}></div>
                    <h4 className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">The Challenge</h4>
                    <p className="font-sans text-xs md:text-sm text-[var(--text-primary)] font-light leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 p-4 md:p-5 rounded-2xl bg-[var(--text-primary)]/5 border border-[var(--glass-border)] backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
                    <h4 className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">The Outcome</h4>
                    <p className="font-sans text-xs md:text-sm text-[var(--text-primary)] font-light leading-relaxed">
                      {selectedProject.outcome}
                    </p>
                  </div>
                </div>
                
                {selectedProject.link !== '#' && (
                  <div className="mt-auto pt-4 md:pt-8">
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 font-sans text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all hover:gap-5 group/btn"
                      style={{ color: selectedProject.accent }}
                    >
                      {selectedProject.link.includes('github') ? 'View on GitHub' : 'Visit Website'}
                      <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--text-primary)]/5 flex items-center justify-center border border-[var(--glass-border)] group-hover/btn:bg-[var(--text-primary)]/10 transition-colors">
                        <HiArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
