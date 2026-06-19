import useCountUp from '../hooks/useCountUp'

export default function CounterCard({ target, suffix = '+', label }) {
  const { count, ref } = useCountUp(target, 1800)

  return (
    <div
      ref={ref}
      className="flex h-full flex-col items-center justify-center text-center px-4 sm:px-8 py-6 sm:py-2"
    >
      <span className="font-display text-3xl md:text-4xl font-black text-white leading-none tracking-tight tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="mt-2 block h-px w-8 bg-brand-teal/40 mx-auto" />
      <span className="mt-2.5 text-[11px] font-semibold text-white/55 uppercase tracking-[0.15em] min-h-[2.2rem] sm:min-h-0 flex items-center">
        {label}
      </span>
    </div>
  )
}
