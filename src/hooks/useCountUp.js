import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `target` once the element enters the viewport.
 * @param {number} target
 * @param {number} duration  ms
 */
export default function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref   = useRef(null)
  const done  = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true
          const startTime = performance.now()

          const step = (now) => {
            const elapsed  = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased    = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(target)
          }

          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}
