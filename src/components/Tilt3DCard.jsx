/**
 * Tilt3DCard
 * A motion.div wrapper that tracks mouse position and applies a live
 * 3-D perspective tilt + moving glare highlight. Accepts all common
 * framer-motion animation props so it can replace motion.div directly.
 */
import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function Tilt3DCard({
  children,
  className  = '',
  intensity  = 9,
  glare      = true,
  style      = {},
  /* framer-motion passthrough props */
  initial,
  animate,
  whileInView,
  whileHover,
  viewport,
  transition,
  variants,
}) {
  const ref  = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 280, damping: 32 })
  const y = useSpring(rawY, { stiffness: 280, damping: 32 })

  const rotateX   = useTransform(y, [-0.5, 0.5], [ intensity, -intensity])
  const rotateY   = useTransform(x, [-0.5, 0.5], [-intensity,  intensity])
  const glareLeft = useTransform(x, [-0.5, 0.5], ['12%', '88%'])
  const glareTop  = useTransform(y, [-0.5, 0.5], ['12%', '88%'])
  const glareOp   = useMotionValue(0)

  function onMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left)  / rect.width  - 0.5)
    rawY.set((e.clientY - rect.top)   / rect.height - 0.5)
    glareOp.set(1)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    glareOp.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle:      'preserve-3d',
        transformPerspective: 900,
        ...style,
      }}
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      whileHover={whileHover}
      viewport={viewport}
      transition={transition}
      variants={variants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}

      {glare && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
          style={{ opacity: glareOp, zIndex: 30 }}
        >
          <motion.div
            className="absolute w-52 h-52 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.11) 0%, transparent 68%)',
              left:  glareLeft,
              top:   glareTop,
              x:     '-50%',
              y:     '-50%',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
