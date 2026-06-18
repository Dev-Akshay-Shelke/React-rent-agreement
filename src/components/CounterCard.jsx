import useCountUp from '../hooks/useCountUp'

export default function CounterCard({ icon, target, suffix = '+', label }) {
  const { count, ref } = useCountUp(target, 1800)

  return (
    <div
      ref={ref}
      className="glass flex flex-col items-center rounded-2xl px-8 py-7 text-center w-full hover:-translate-y-1.5 hover:shadow-glass transition-all duration-300"
    >
      <span className="text-3xl mb-3.5 filter drop-shadow">{icon}</span>
      <span className="font-display text-3xl md:text-4xl font-black text-white leading-none tracking-tight">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="mt-2.5 text-[11px] font-bold text-brand-mint/80 uppercase tracking-[0.16em]">{label}</span>
    </div>
  )
}
