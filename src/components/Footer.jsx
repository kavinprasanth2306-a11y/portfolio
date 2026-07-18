export default function Footer() {
  return (
    <footer className="text-center py-8 border-t border-white/5">
      <p className="text-gray-600 text-xs tracking-wider uppercase">
        &copy; {new Date().getFullYear()} Kavinprasanth km &mdash; Built with React, Three.js & GSAP
      </p>
    </footer>
  )
}
