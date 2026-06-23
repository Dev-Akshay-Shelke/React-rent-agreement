/**
 * ScrollProgressBar
 * A 2.5 px gradient line fixed to the top of the viewport.
 * Its width is driven by a spring-smoothed scrollYProgress so it
 * feels physically weighted — it slightly lags behind very fast
 * scrolling and snaps back when you stop.
 */
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  // Spring smoothing: stiffness controls responsiveness, damping prevents bounce.
  // restDelta stops micro-animations when effectively at rest.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping:   32,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(to right, #0055DA 0%, #28A745 100%)',
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  )
}
