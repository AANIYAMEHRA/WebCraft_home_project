
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observe existing reveal elements
    const observeElements = (element) => {
      if (element.matches?.('.reveal')) {
        obs.observe(element)
      }

      element.querySelectorAll?.('.reveal').forEach((el) => {
        obs.observe(el)
      })
    }

    document.querySelectorAll('.reveal').forEach((el) => {
      obs.observe(el)
    })

    // Detect dynamically rendered elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            observeElements(node)
          }
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      obs.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname])
}
