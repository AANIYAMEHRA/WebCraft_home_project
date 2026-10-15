import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// `.reveal` elements jab viewport me aayein tab `.visible` class lagao (original IntersectionObserver)
export default function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [pathname])
}
