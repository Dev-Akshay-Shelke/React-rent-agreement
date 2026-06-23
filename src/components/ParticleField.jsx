/**
 * ParticleField — interactive canvas-based particle network.
 * Particles float, connect with lines when close, and gently
 * repel from the user's cursor. Pointer-events are disabled so
 * clicks pass straight through to underlying content.
 */
import { useEffect, useRef } from 'react'

const PARTICLE_COUNT  = 40          // was 72 — halved to cut O(n²) link cost
const MAX_LINK_DIST   = 120
const MAX_LINK_DIST_SQ = MAX_LINK_DIST * MAX_LINK_DIST  // avoid sqrt in inner loop
const REPEL_DIST      = 100
const BASE_SPEED      = 0.28

export default function ParticleField({ color = '255,255,255', className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -9999, y: -9999 }

    /* ── size canvas to its CSS box ────────────────────────────────────── */
    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* ── seed particles ─────────────────────────────────────────────────── */
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:           Math.random() * canvas.width,
      y:           Math.random() * canvas.height,
      vx:          (Math.random() - 0.5) * BASE_SPEED,
      vy:          (Math.random() - 0.5) * BASE_SPEED,
      r:           Math.random() * 1.6 + 0.5,
      baseOpacity: Math.random() * 0.30 + 0.08,
    }))

    /* ── draw loop ──────────────────────────────────────────────────────── */
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        /* mouse repulsion */
        const mdx   = p.x - mouse.x
        const mdy   = p.y - mouse.y
        const mDist = Math.hypot(mdx, mdy)
        if (mDist < REPEL_DIST && mDist > 0) {
          const force = ((REPEL_DIST - mDist) / REPEL_DIST) * 0.9
          p.vx += (mdx / mDist) * force * 0.07
          p.vy += (mdy / mDist) * force * 0.07
        }

        /* damping keeps velocity bounded */
        p.vx *= 0.985
        p.vy *= 0.985

        p.x += p.vx
        p.y += p.vy

        /* wrap */
        if (p.x < -4)                p.x = canvas.width  + 4
        if (p.x > canvas.width  + 4) p.x = -4
        if (p.y < -4)                p.y = canvas.height + 4
        if (p.y > canvas.height + 4) p.y = -4

        /* draw dot */
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.baseOpacity})`
        ctx.fill()
      }

      /* draw connecting lines — use squared distance to skip sqrt */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dSq = dx * dx + dy * dy
          if (dSq < MAX_LINK_DIST_SQ) {
            const d = Math.sqrt(dSq)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${color}, ${(1 - d / MAX_LINK_DIST) * 0.09})`
            ctx.lineWidth   = 0.6
            ctx.stroke()
          }
        }
      }

      /* mouse attractor glow */
      if (mouse.x > 0 && mouse.y > 0) {
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80)
        grd.addColorStop(0, `rgba(${color}, 0.06)`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    /* ── pause when tab is hidden to save CPU ────────────────────────────── */
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(animId)
      } else {
        animId = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    /* ── mouse tracking via window (canvas has pointer-events:none) ─────── */
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      const x    = e.clientX - rect.left
      const y    = e.clientY - rect.top
      /* only repel when cursor is inside the canvas area */
      mouse.x = (x >= 0 && x <= rect.width  && y >= 0 && y <= rect.height) ? x : -9999
      mouse.y = (x >= 0 && x <= rect.width  && y >= 0 && y <= rect.height) ? y : -9999
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ willChange: 'contents' }}
      aria-hidden="true"
    />
  )
}
