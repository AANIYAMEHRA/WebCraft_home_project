
import { useEffect, useRef, useState } from 'react'

// Count up when the element becomes visible on screen
export default function Counter({
  end,
  suffix = '',
  label,
  className = '',
}) {
  const ref = useRef(null)
  const isBlank = end === '' || end === null || end === undefined
  const numericEnd = Number(end)
  const [value, setValue] = useState(isBlank ? '' : numericEnd)

  useEffect(() => {
    if (isBlank || !Number.isFinite(numericEnd)) {
      setValue('')
      return
    }

    const el = ref.current
    if (!el) return

    setValue(0)

    let timer

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        obs.disconnect()

        const step = Math.max(1, Math.ceil(Math.abs(numericEnd) / 60))
        let current = 0

        timer = setInterval(() => {
          current += step

          if (current >= numericEnd) {
            current = numericEnd
            clearInterval(timer)
          }

          setValue(current)
        }, 25)
      },
      { threshold: 0.5 }
    )

    obs.observe(el)

    return () => {
      obs.disconnect()
      clearInterval(timer)
    }
  }, [end, isBlank, numericEnd])

  if (isBlank || !Number.isFinite(numericEnd)) {
    return <div ref={ref} className={className} aria-label={label} />
  }

  return (
    <div ref={ref} className={className} aria-label={label}>
      {value}
      {suffix}
    </div>
  )
}
