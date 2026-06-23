/**
 * AnimatedHeroSVG
 * Scroll-reactive + continuous SVG animations layered behind the hero content.
 * Uses framer-motion for parallax and path-drawing effects.
 */
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AnimatedHeroSVG() {
  const { scrollY } = useScroll()

  // Parallax — elements drift as user scrolls away from hero
  const y1      = useTransform(scrollY, [0, 700], [0, -110])
  const y2      = useTransform(scrollY, [0, 700], [0,  75])
  const y3      = useTransform(scrollY, [0, 700], [0, -60])
  const opacity = useTransform(scrollY, [0, 480], [1, 0])

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Rotating concentric rings — top-right corner ─────────────────── */}
      <motion.div
        className="absolute -top-28 -right-28"
        style={{ y: y1, opacity }}
      >
        <motion.svg
          width="540" height="540" viewBox="0 0 540 540"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="270" cy="270" r="250" fill="none" stroke="white" strokeWidth="1"   strokeOpacity="0.06" strokeDasharray="16 28" />
          <circle cx="270" cy="270" r="200" fill="none" stroke="white" strokeWidth="0.7" strokeOpacity="0.04" />
          <circle cx="270" cy="270" r="152" fill="none" stroke="#28A745" strokeWidth="0.9" strokeOpacity="0.07" strokeDasharray="8 18" />
          <circle cx="270" cy="270" r="104" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.03" />
          {/* Tick marks on outer ring */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 2 * Math.PI
            const x1 = 270 + 245 * Math.cos(angle)
            const y1 = 270 + 245 * Math.sin(angle)
            const x2 = 270 + 255 * Math.cos(angle)
            const y2 = 270 + 255 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1" strokeOpacity="0.08" />
          })}
        </motion.svg>
      </motion.div>

      {/* ── Counter-rotating hexagon — bottom-left corner ─────────────────── */}
      <motion.div
        className="absolute -bottom-24 -left-24"
        style={{ y: y2, opacity }}
      >
        <motion.svg
          width="360" height="360" viewBox="0 0 360 360"
          animate={{ rotate: -360 }}
          transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
        >
          <polygon
            points="180,8 340,96 340,264 180,352 20,264 20,96"
            fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.05"
          />
          <polygon
            points="180,48 306,118 306,242 180,312 54,242 54,118"
            fill="none" stroke="#0055DA" strokeWidth="0.7" strokeOpacity="0.06"
            strokeDasharray="6 14"
          />
          <polygon
            points="180,88 272,140 272,220 180,272 88,220 88,140"
            fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.03"
          />
        </motion.svg>
      </motion.div>

      {/* ── Diamond — mid-left, slower float ────────────────────────────────── */}
      <motion.div
        className="absolute left-[7%] top-[55%]"
        style={{ y: y3, opacity }}
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <rect
            x="14" y="14" width="52" height="52"
            fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.10"
            transform="rotate(45 40 40)"
          />
          <rect
            x="22" y="22" width="36" height="36"
            fill="white" fillOpacity="0.03"
            transform="rotate(45 40 40)"
          />
        </svg>
      </motion.div>

      {/* ── Animated document / contract illustration — xl screens only ───── */}
      <motion.div
        className="hidden xl:block absolute right-[2.5%] top-1/2 -translate-y-1/2"
        style={{ opacity }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="210" height="280" viewBox="0 0 210 280" opacity="0.13">
          {/* Document body */}
          <rect x="8" y="8" width="194" height="264" rx="10" fill="none" stroke="white" strokeWidth="1.5" />
          {/* Dog-ear fold */}
          <path d="M163 8 L202 47 L163 47 Z" fill="white" fillOpacity="0.07" />
          <path d="M163 8 L202 47" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
          {/* Header bar */}
          <rect x="8" y="8" width="194" height="46" rx="10" fill="white" fillOpacity="0.06" />

          {/* Line 1 — draws in */}
          <motion.line
            x1="26" y1="72" x2="182" y2="72"
            stroke="white" strokeWidth="1.5" strokeOpacity="0.65" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
          />
          <motion.line
            x1="26" y1="94" x2="152" y2="94"
            stroke="white" strokeWidth="1.3" strokeOpacity="0.42" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          />
          <motion.line
            x1="26" y1="116" x2="170" y2="116"
            stroke="white" strokeWidth="1.3" strokeOpacity="0.42" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
          />
          <motion.line
            x1="26" y1="138" x2="142" y2="138"
            stroke="white" strokeWidth="1.3" strokeOpacity="0.42" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.85, delay: 1.15 }}
          />

          {/* Section divider */}
          <motion.line
            x1="26" y1="158" x2="182" y2="158"
            stroke="white" strokeWidth="0.5" strokeOpacity="0.18"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.35 }}
          />

          <motion.line
            x1="26" y1="176" x2="176" y2="176"
            stroke="white" strokeWidth="1.3" strokeOpacity="0.40" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.85, delay: 1.45 }}
          />
          <motion.line
            x1="26" y1="198" x2="148" y2="198"
            stroke="white" strokeWidth="1.3" strokeOpacity="0.40" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.80, delay: 1.62 }}
          />
          <motion.line
            x1="26" y1="220" x2="162" y2="220"
            stroke="white" strokeWidth="1.3" strokeOpacity="0.40" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.80, delay: 1.80 }}
          />

          {/* Signature line */}
          <motion.line
            x1="26" y1="252" x2="118" y2="252"
            stroke="white" strokeWidth="1" strokeOpacity="0.38" strokeDasharray="5 5"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            style={{ transformOrigin: '26px 252px' }}
            transition={{ duration: 0.9, delay: 2.0 }}
          />

          {/* Seal / stamp */}
          <motion.circle
            cx="163" cy="252" r="20"
            fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.55"
            initial={{ scale: 0, originX: '163px', originY: '252px' }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.1, type: 'spring', stiffness: 220 }}
          />
          <motion.circle
            cx="163" cy="252" r="13"
            fill="white" fillOpacity="0.06"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 2.2, type: 'spring' }}
          />
        </svg>
      </motion.div>

      {/* ── Floating dot grid — left, middle height ──────────────────────── */}
      <motion.div
        className="absolute left-[4%] top-[32%]"
        style={{ opacity }}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <svg width="66" height="66" viewBox="0 0 66 66">
          {[0, 1, 2].flatMap(r =>
            [0, 1, 2].map(c => (
              <circle key={`${r}-${c}`} cx={11 + c * 22} cy={11 + r * 22} r="2.5" fill="white" fillOpacity="0.13" />
            ))
          )}
        </svg>
      </motion.div>

      {/* ── Floating dot cluster — right lower ───────────────────────────── */}
      <motion.div
        className="absolute right-[13%] bottom-[24%]"
        style={{ opacity }}
        animate={{ y: [0, -11, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52">
          {[0, 1].flatMap(r =>
            [0, 1].map(c => (
              <circle key={`${r}-${c}`} cx={14 + c * 24} cy={14 + r * 24} r="2.2" fill="white" fillOpacity="0.10" />
            ))
          )}
        </svg>
      </motion.div>

      {/* ── Drifting plus marks ───────────────────────────────────────────── */}
      <motion.div
        className="absolute left-[22%] top-[18%]"
        style={{ opacity }}
        animate={{ y: [0, 10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="2" x2="12" y2="22" stroke="white" strokeWidth="1" strokeOpacity="0.15" strokeLinecap="round" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1" strokeOpacity="0.15" strokeLinecap="round" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-[28%] top-[25%]"
        style={{ opacity }}
        animate={{ y: [0, -8, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <line x1="10" y1="2" x2="10" y2="18" stroke="white" strokeWidth="1" strokeOpacity="0.12" strokeLinecap="round" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="white" strokeWidth="1" strokeOpacity="0.12" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  )
}
