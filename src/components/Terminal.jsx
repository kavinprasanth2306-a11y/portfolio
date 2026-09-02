import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'

const COMMANDS = {
  help: () => [
    '  Available commands:',
    '  ──────────────────────────────',
    '  whoami       — About Kavinprasanth',
    '  skills       — Tech stack',
    '  projects     — Featured projects',
    '  certs        — Certifications',
    '  experience   — Work experience',
    '  contact      — Contact info',
    '  social       — Social links',
    '  education    — Education details',
    '  clear        — Clear terminal',
    '  exit         — Close terminal',
    '  help         — Show this help',
    '',
  ],

  whoami: () => [
    '  ╔═══════════════════════════════════════════════╗',
    '  ║  KAVINPRASANTH KM                             ║',
    '  ║  Full-Stack Developer · AI Engineer · Pentester║',
    '  ╚═══════════════════════════════════════════════╝',
    '',
    '  → Builds e-commerce platforms with real payments',
    '  → Trains GANs that generate images from scratch',
    '  → Breaks into web apps (legally) as a pentester',
    '  → Google Cloud Digital Leader certified',
    '  → B.Tech CSE @ Karunya Institute (2025-2029)',
    '',
  ],

  skills: () => [
    '  ┌─ Frontend ────────────────────────┐',
    '  │ React · TypeScript · JavaScript   │',
    '  │ HTML/CSS · Tailwind · Vite        │',
    '  ├─ Mobile ──────────────────────────┤',
    '  │ Flutter · Dart                    │',
    '  ├─ Backend ─────────────────────────┤',
    '  │ Node.js · Express · Flask         │',
    '  │ SQLite · Firebase                 │',
    '  ├─ AI / ML ─────────────────────────┤',
    '  │ Python · PyTorch · GANs           │',
    '  ├─ Cloud & DevOps ──────────────────┤',
    '  │ Google Cloud · Git                │',
    '  ├─ Security ────────────────────────┤',
    '  │ Kali Linux · Cyber Security       │',
    '  │ C/C++ · Penetration Testing       │',
    '  └───────────────────────────────────┘',
    '',
  ],

  projects: () => [
    '  [01] Wazabi — wazabi.in',
    '       Full-stack e-commerce · React · TypeScript · Razorpay',
    '',
    '  [02] AI Image Generator',
    '       GAN-based image gen · Python · PyTorch · Flask',
    '',
    '  [03] CTF Toolkit',
    '       Automated CTF solver · Python · Nmap · SQLMap',
    '',
    '  [04] MemSee',
    '       CPU addressing mode visualizer · React · Gemini AI',
    '',
  ],

  certs: () => [
    '  ✓ Google Cloud Digital Leader        (May 2026)',
    '  ✓ JWPT - Penetration Tester          (Jul 2026)',
    '  ✓ Python Programming Track ×6        (Jan 2026)',
    '  ✓ Git & GitHub Track ×7              (Jan 2026)',
    '  ✓ MATLAB Onramp                      (Jan 2026)',
    '  ─────────────────────────────────────',
    '  Total: 18 certifications earned',
    '',
  ],

  experience: () => [
    '  ┌─────────────────────────────────────────────┐',
    '  │ PENETRATION TESTER — Intern                  │',
    '  │ HackersDaddy Cyber Security Solutions        │',
    '  │ London, UK (Remote) · Jun–Jul 2026           │',
    '  ├─────────────────────────────────────────────┤',
    '  │ • Web app pentesting & VAPT assessments      │',
    '  │ • Recon, vuln scanning & API security audits │',
    '  │ • Cleared JWPT certification exam            │',
    '  │ • Selected via "Hashes Over Roses 3.0"       │',
    '  └─────────────────────────────────────────────┘',
    '',
  ],

  contact: () => [
    '  Email    → kavinprasanth2306@gmail.com',
    '  Website  → https://kavinprasanth.in',
    '  GitHub   → github.com/kavinprasanth2306-a11y',
    '  LinkedIn → linkedin.com/in/Kavinprasanthkm',
    '',
    '  (Use "copy email" to copy email to clipboard)',
    '',
  ],

  social: () => [
    '  GitHub   → https://github.com/kavinprasanth2306-a11y',
    '  LinkedIn → https://linkedin.com/in/Kavinprasanthkm',
    '  Wazabi   → https://wazabi.in',
    '',
  ],

  education: () => [
    '  B.Tech — Computer Science & Engineering',
    '  Karunya Institute of Technology and Sciences',
    '  Coimbatore, India · 2025 — 2029',
    '',
    '  Specializing in AI/Deep Learning,',
    '  Full-Stack Development & Cybersecurity',
    '',
  ],

  'copy email': () => {
    navigator.clipboard?.writeText('kavinprasanth2306@gmail.com')
    return ['  ✓ Email copied to clipboard!', '']
  },
}

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setHistory([
        { type: 'output', lines: [
          '',
          '  ██╗  ██╗██████╗',
          '  ██║ ██╔╝██╔══██╗',
          '  █████╔╝ ██████╔╝',
          '  ██╔═██╗ ██╔═══╝',
          '  ██║  ██╗██║      kavinprasanth.in',
          '  ╚═╝  ╚═╝╚═╝      v3.0.0',
          '',
          '  Welcome to Kavinprasanth\'s terminal.',
          '  Type "help" to see available commands.',
          '',
        ]}
      ])
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    setInput('')

    const newHistory = [...history, { type: 'input', text: cmd }]

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    if (cmd === 'exit' || cmd === 'quit') {
      onClose()
      return
    }

    if (cmd === '') {
      setHistory(newHistory)
      return
    }

    const handler = COMMANDS[cmd]
    if (handler) {
      const output = handler()
      newHistory.push({ type: 'output', lines: output })
    } else {
      newHistory.push({ type: 'output', lines: [
        `  bash: ${cmd}: command not found`,
        '  Type "help" to see available commands.',
        '',
      ]})
    }

    setHistory(newHistory)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed inset-4 md:inset-12 z-[100] rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-2xl flex flex-col"
          style={{ background: '#0a0a0f' }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#151520] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[11px] text-gray-500 font-mono ml-3">kavinprasanth@portfolio ~ %</span>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <HiX size={16} />
            </button>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-[11px] sm:text-[13px] leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <div key={i}>
                {entry.type === 'input' && (
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">kavinprasanth</span>
                    <span className="text-gray-500">$</span>
                    <span className="text-gray-300">{entry.text}</span>
                  </div>
                )}
                {entry.type === 'output' && (
                  <div className="text-gray-400 whitespace-pre">
                    {entry.lines.map((line, j) => (
                      <div key={j}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
              <span className="text-green-400">kavinprasanth</span>
              <span className="text-gray-500">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-gray-200 outline-none caret-green-400 font-mono"
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
