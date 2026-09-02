export default function ShatterSection({ children, index, activeIndex }) {
  const isActive = activeIndex === index

  return (
    <section
      className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-out"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 10 : 0,
      }}
    >
      {children}
    </section>
  )
}
