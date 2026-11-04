
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const API = 'http://localhost:5000/api/home'

export default function Belief() {
  const root = useRef(null)
  const [content, setContent] = useState(null)

  // Load saved Belief content from the backend
  useEffect(() => {
    async function loadBelief() {
      try {
        const response = await fetch(API)

        if (!response.ok) {
          throw new Error('Failed to load Belief content')
        }

        const data = await response.json()

        setContent({
          beliefLabel: data.beliefLabel ?? 'Our Belief',
          beliefHeading:
            data.beliefHeading ??
            'We listen before we propose. We prototype before we commit.',
          beliefDescription:
            data.beliefDescription ??
            "We'd rather spend three months in research than three years rebuilding. It's a slower way to work. It's also the way that's kept us here since 2006 — and kept our clients with us long after the first engagement ended.",
        })
      } catch (error) {
        console.error('Belief content error:', error)
      }
    }

    loadBelief()
  }, [])

  // Keep the original GSAP animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#beliefPanel', {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        scrollTrigger: {
          trigger: '.belief-section',
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: false,
        },
      })

      gsap.fromTo(
        '#beliefBody',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: '.belief-section',
            start: '30% top',
            end: '60% top',
            scrub: 1,
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  // Keep the original two-line heading layout
  const heading = content?.beliefHeading ?? ''
  const headingParts = heading.split('. ')
  const firstLine =
    headingParts.length > 1
      ? `${headingParts[0]}.`
      : heading

  const secondLine =
    headingParts.length > 1
      ? headingParts.slice(1).join('. ')
      : ''

  return (
    <div ref={root}>
      {/* BELIEF — Cover Expand Animation */}
      <section className="belief-section" id="belief">
        <div className="belief-sticky">
          <div className="belief-panel" id="beliefPanel"></div>

          <div className="belief-content">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gm-teal/70 font-mono mb-8">
              {content?.beliefLabel ?? 'Our Belief'}
            </span>

            <h2 className="belief-heading" id="beliefHeading">
              {firstLine}
              {secondLine && (
                <>
                  <br />
                  {secondLine}
                </>
              )}
            </h2>

            <p className="belief-body" id="beliefBody">
              {content?.beliefDescription ?? ''}
            </p>

            <div className="belief-hint">Keep scrolling ↓</div>
          </div>
        </div>
      </section>
    </div>
  )
}
