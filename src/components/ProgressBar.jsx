import { motion } from 'framer-motion'

const TOTAL_SECTIONS = 7

export default function ProgressBar({ activeIndex }) {
  const progress = (activeIndex / (TOTAL_SECTIONS - 1)) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 rounded-r-full"
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
      />
    </div>
  )
}
