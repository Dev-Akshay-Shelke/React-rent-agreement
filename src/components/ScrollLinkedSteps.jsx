/**
 * ScrollLinkedSteps
 *
 * A reusable, scroll-scrubbed step indicator powered by Framer Motion's
 * useScroll + useTransform. Every visual state is derived directly from the
 * raw scrollYProgress value — no threshold polling, no one-shot animations —
 * so scrolling *back up* fully reverses every transition.
 *
 * Props
 * ─────
 * steps    { n: string, title: string, desc: string }[]   Required
 * className  string                                         Optional extra classes
 */

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// StepItem — isolated per-step component.
// Hooks (useTransform etc.) must be called unconditionally, so each step
// lives in its own component rather than inside .map() on the parent.
// ─────────────────────────────────────────────────────────────────────────────

function StepItem({ step, index, total, scrollYProgress, isLast }) {
  const [done, setDone] = useState(false)

  // ── Per-step scroll thresholds ─────────────────────────────────────────────
  //
  // The full [0 → 1] scroll range is divided evenly across `total` steps.
  // Each step starts dimly visible then transitions to full brightness as its
  // slice of the range is consumed.
  //
  //  Example for 3 steps:
  //    step 0 → activateStart = 0.00,  activateEnd ≈ 0.27
  //    step 1 → activateStart ≈ 0.33,  activateEnd ≈ 0.60
  //    step 2 → activateStart ≈ 0.66,  activateEnd ≈ 0.93
  //
  const sliceSize    = 1 / total
  const activateStart = index * sliceSize
  const activateEnd   = Math.min(activateStart + sliceSize * 0.82, 1)
  // A step is "complete" (shows checkmark) when scroll passes 55 % of its slice
  const completeAt    = Math.min(activateStart + sliceSize * 0.55, 1)

  // ── Scroll-derived motion values ───────────────────────────────────────────

  // Opacity: 0.28 when not yet reached → 1 when fully active
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, activateStart - 0.02), activateEnd],
    [0.28, 1],
  )

  // Left border colour: neutral grey → brand blue
  // Uses rgba strings so framer-motion can interpolate between them
  const borderColor = useTransform(
    scrollYProgress,
    [activateStart, Math.min(activateStart + sliceSize * 0.25, 1)],
    ['rgba(216,224,234,1)', 'rgba(0,85,218,1)'],
  )

  // Badge background: light cream → brand-deep navy
  const badgeBg = useTransform(
    scrollYProgress,
    [activateStart, Math.min(activateStart + sliceSize * 0.18, 1)],
    ['rgba(247,246,240,1)', 'rgba(26,43,73,1)'],
  )

  // Badge text: brand-deep → white (keeps readable contrast on dark badge)
  const badgeText = useTransform(
    scrollYProgress,
    [activateStart, Math.min(activateStart + sliceSize * 0.18, 1)],
    ['rgba(26,43,73,1)', 'rgba(255,255,255,1)'],
  )

  // Card elevation grows as the step activates
  const boxShadow = useTransform(
    scrollYProgress,
    [activateStart, activateEnd],
    [
      '0 1px 3px rgba(26,43,73,0.04), 0 2px 6px rgba(26,43,73,0.04)',
      '0 6px 20px rgba(0,85,218,0.09), 0 16px 40px rgba(0,85,218,0.07)',
    ],
  )

  // Tiny upward lift on the card content (parallax feel)
  const cardY = useTransform(
    scrollYProgress,
    [activateStart, activateEnd],
    [12, 0],
  )

  // Track when to swap number → checkmark (and reverse on scroll-up)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setDone(v >= completeAt)
  })

  return (
    <motion.div className="relative flex gap-4 sm:gap-6" style={{ opacity }}>

      {/* ── Left column: badge + vertical connector ───────────────────── */}
      <div className="flex flex-col items-center flex-shrink-0">

        {/* Step number / checkmark badge */}
        <motion.div
          className={[
            'relative z-10 w-14 h-14 rounded-2xl',
            'flex items-center justify-center overflow-hidden',
            'font-display font-black text-[15px]',
            'ring-4 ring-[#F1F0EA] flex-shrink-0',
          ].join(' ')}
          style={{ backgroundColor: badgeBg }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              /* Checkmark: path draws in from left to right */
              <motion.svg
                key="check"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.55 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{   opacity: 0, scale: 0.55 }}
                transition={{ duration: 0.2 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth={2.6}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.32, ease: 'easeOut', delay: 0.06 }}
                />
              </motion.svg>
            ) : (
              /* Step number, slides out upward when done */
              <motion.span
                key="num"
                style={{ color: badgeText }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{   opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {step.n}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Connecting line to next step (hidden on last step) */}
        {!isLast && (
          <div className="w-px flex-1 mt-1.5 bg-brand-border min-h-[3rem]" />
        )}
      </div>

      {/* ── Right column: content card ────────────────────────────────── */}
      <motion.div
        className={[
          'flex-1 bg-white rounded-2xl',
          'border border-brand-border border-l-[3px]',
          'p-6 sm:p-7',
          isLast ? '' : 'mb-5 sm:mb-6',
        ].join(' ')}
        style={{
          borderLeftColor: borderColor,
          boxShadow,
          y: cardY,
        }}
      >
        <h3 className="font-display font-bold text-brand-deep text-lg tracking-tight mb-1.5">
          {step.title}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
      </motion.div>

    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ScrollLinkedSteps — public export
// ─────────────────────────────────────────────────────────────────────────────

export default function ScrollLinkedSteps({ steps, className = '' }) {
  const containerRef = useRef(null)

  // ── Scroll tracking ────────────────────────────────────────────────────────
  //
  //  offset[0]  'start 72%'
  //    → progress = 0 when the container's TOP edge reaches 72 % of the viewport.
  //      The section is just entering from below, so nothing has activated yet.
  //
  //  offset[1]  'end 22%'
  //    → progress = 1 when the container's BOTTOM edge reaches 22 % of the viewport.
  //      The section is nearly scrolled past; all steps are complete.
  //
  //  On a 1 080 px viewport with a ~520 px section this gives ≈ 990 px of scroll
  //  travel to complete the full animation — roughly one full viewport height,
  //  which feels unhurried and satisfying to scrub.
  //
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 72%', 'end 22%'],
  })

  // The vertical timeline fill height maps 0 → 1 scroll progress to 0 % → 100 % height.
  // This is the single "source of truth" line that visually unifies all three steps.
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className={`relative ${className}`}>

      {/* ── Static grey track (full height behind all badges) ─────────── */}
      {/* Positioned at x = 28px — the horizontal centre of the 56px badge. */}
      <div
        className="absolute left-7 top-7 bottom-7 w-px bg-brand-border pointer-events-none"
        aria-hidden="true"
      >
        {/* Scroll-scrubbed gradient fill — grows top-to-bottom as you scroll */}
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            height: lineHeight,
            background: 'linear-gradient(to bottom, #0055DA 0%, #28A745 100%)',
          }}
        />
      </div>

      {/* ── Step items ─────────────────────────────────────────────────── */}
      {steps.map((step, i) => (
        <StepItem
          key={step.n}
          step={step}
          index={i}
          total={steps.length}
          scrollYProgress={scrollYProgress}
          isLast={i === steps.length - 1}
        />
      ))}

    </div>
  )
}
