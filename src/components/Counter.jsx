import { useEffect, useRef, useState } from 'react'

// Scroll karke dikhne par 0 se `end` tak count-up (original data-count logic)
export default function Counter({ end, suffix = '', label, className = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(end) // SSR/no-JS fallback: final value

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setValue(0)
    let timer
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        const step = Math.max(1, Math.ceil(end / 60))
        let c = 0
        timer = setInterval(() => {
          c += step
          if (c >= end) {
            c = end
            clearInterval(timer)
          }
          setValue(c)
        }, 25)
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      clearInterval(timer)
    }
  }, [end])

  return (
    <div ref={ref} className={className} aria-label={label}>
      {value}
      {suffix}
    </div>
  )
}
