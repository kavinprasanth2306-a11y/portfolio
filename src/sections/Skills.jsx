import { motion, useTransform } from 'framer-motion'
import { FaHtml5, FaJs, FaPython, FaLinux } from 'react-icons/fa'
import { SiFlutter, SiPytorch } from 'react-icons/si'
import { HiShieldCheck, HiCode } from 'react-icons/hi'

const skillsData = [
  { name: 'HTML & CSS', icon: FaHtml5, color: '#e34f26' },
  { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
  { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'PyTorch & AI', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'C / C++', icon: HiCode, color: '#00599C' },
  { name: 'Kali Linux', icon: FaLinux, color: '#557C94' },
  { name: 'Cyber Security', icon: HiShieldCheck, color: '#2e8b57' },
]

export const crackPatterns = [
  // Pattern 0
  {
    gap: "40,29 52,33 43,43 48,42 38,37",
    paths: [
      { d: "M10,-10 L40,29", w: 1.2 },
      { d: "M52,33 L110,15", w: 1.2 },
      { d: "M43,43 L25,110", w: 1 },
      { d: "M48,42 L80,110", w: 0.6 },
      { d: "M80,-10 L65,55 L110,85", w: 0.8 },
      { d: "M-10,55 L38,37", w: 0.8 }
    ],
    polylines: [
      { points: "20,10 30,25 60,15", w: 0.5 }
    ],
    shard: "0,0 45,35 0,70"
  },
  // Pattern 1
  {
    gap: "68,50 55,43 55,56 59,58",
    paths: [
      { d: "M110,50 L68,50", w: 1.2 },
      { d: "M55,43 L20,-10", w: 1.2 },
      { d: "M55,56 L10,110", w: 1 },
      { d: "M59,58 L50,110", w: 0.6 },
      { d: "M110,20 L80,35 L50,-10", w: 0.8 }
    ],
    polylines: [
      { points: "80,60 70,75 110,90", w: 0.5 }
    ],
    shard: "100,20 60,50 100,80"
  },
  // Pattern 2
  {
    gap: "34,66 48,62 38,52 43,53 18,47 32,53",
    paths: [
      { d: "M-10,110 L34,66", w: 1.2 },
      { d: "M48,62 L110,80", w: 1.2 },
      { d: "M38,52 L20,-10", w: 1 },
      { d: "M43,53 L70,-10", w: 0.8 },
      { d: "M-10,40 L18,47", w: 0.6 },
      { d: "M32,53 L50,-10", w: 0.6 }
    ],
    polylines: [
      { points: "50,70 65,50 110,40", w: 0.5 }
    ],
    shard: "0,100 40,60 70,100"
  },
  // Pattern 3
  {
    gap: "42,45 58,48 48,58",
    paths: [
      { d: "M20,35 L30,-10", w: 0.8 },
      { d: "M48,58 L40,110", w: 1 },
      { d: "M80,40 L90,-10", w: 0.6 },
      { d: "M80,40 L110,80", w: 0.5 }
    ],
    polylines: [
      { points: "-10,45 20,35 42,45", w: 1.2 },
      { points: "58,48 80,40 110,45", w: 1.2 }
    ],
    shard: "0,40 100,30 100,60 0,55"
  }
];

export const getCrackMask = (index) => {
  const p = crackPatterns[index % 4];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
    <rect width="100%" height="100%" fill="white" />
    <polygon points="${p.gap}" fill="black" />
    <polygon points="${p.shard}" fill="black" opacity="0.15" />
    ${p.paths.map(path => `<path d="${path.d}" stroke="black" stroke-width="${path.w * 1.5}" fill="none" vector-effect="non-scaling-stroke" stroke-linejoin="miter" />`).join('')}
    ${p.polylines.map(poly => `<polyline points="${poly.points}" stroke="black" stroke-width="${poly.w * 1.5}" fill="none" vector-effect="non-scaling-stroke" stroke-linejoin="miter" />`).join('')}
  </svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

export const GlassCracks = ({ index = 0 }) => {
  const p = crackPatterns[index % 4];
  const gold = "#D4AF37";
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70 dark:opacity-90 z-20" style={{ filter: 'drop-shadow(0px 0px 4px rgba(212,175,55,0.4))' }}>
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <polygon points={p.shard} fill={gold} opacity="0.08" />
        {p.paths.map((path, i) => (
          <path key={`p-${i}`} d={path.d} stroke={gold} strokeWidth={path.w} fill="none" vectorEffect="non-scaling-stroke" strokeLinejoin="miter" />
        ))}
        {p.polylines.map((poly, i) => (
          <polyline key={`pl-${i}`} points={poly.points} stroke={gold} strokeWidth={poly.w} fill="none" vectorEffect="non-scaling-stroke" strokeLinejoin="miter" />
        ))}
      </svg>
    </div>
  )
}

export default function Skills() {
  return (
    <div className="w-full h-full flex flex-col justify-center relative bg-[var(--bg-primary)] p-8 md:p-20 overflow-hidden">
      <div 
        className="absolute top-1/4 left-0 text-[20vw] font-black text-[var(--text-primary)] opacity-5 whitespace-nowrap pointer-events-none select-none leading-none"
      >
        ARSENAL
      </div>


      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full justify-center">
        <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-12 uppercase tracking-tighter">
          Tech <span className="text-teal-400">Stack</span>
        </h2>
        
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 px-2 md:px-10 pb-16 md:pb-32">
          {skillsData.map((skill, idx) => (
            <motion.div 
              key={skill.name}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card relative flex flex-col items-center justify-center p-3 md:p-8 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md group overflow-hidden cursor-pointer h-24 md:h-auto"
              style={{
                 borderRadius: idx % 2 === 0 ? '1rem 0.25rem 1rem 0.25rem' : '0.25rem 1rem 0.25rem 1rem',
                 WebkitMaskImage: getCrackMask(idx),
                 WebkitMaskSize: '100% 100%'
              }}
            >
              <GlassCracks index={idx} />
              <skill.icon className="text-2xl md:text-5xl mb-2 md:mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 relative z-10" style={{ color: skill.color }} />
              <span className="font-sans font-bold tracking-widest text-[8px] md:text-xs uppercase text-[var(--text-primary)] opacity-70 group-hover:opacity-100 transition-opacity relative z-10 text-center leading-tight">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
