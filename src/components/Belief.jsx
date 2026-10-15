import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Belief() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#beliefPanel', {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        scrollTrigger: { trigger: '.belief-section', start: 'top top', end: '+=100%', scrub: 1, pin: false },
      })
      gsap.fromTo(
        '#beliefBody',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: { trigger: '.belief-section', start: '30% top', end: '60% top', scrub: 1 },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return <div ref={root}>
{/* BELIEF — Cover Expand Animation */}
<section className="belief-section" id="belief">
  <div className="belief-sticky">
    <div className="belief-panel" id="beliefPanel"></div>
    <div className="belief-content">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gm-teal/70 font-mono mb-8">Our Belief</span>
      <h2 className="belief-heading" id="beliefHeading">
        We listen before we propose.<br />We prototype before we <em>commit.</em>
      </h2>
      <p className="belief-body" id="beliefBody">
        We'd rather spend three months in research than three years rebuilding. It's a slower way to work. It's also the way that's kept us here since 2006 — and kept our clients with us long after the first engagement ended.
      </p>
      <div className="belief-hint">Keep scrolling ↓</div>
    </div>
  </div>
</section>


  </div>
}
