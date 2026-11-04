import { useRef } from 'react'
import { cta } from '../../pages/researchData.js'
import useMagnet from '../../hooks/useMagnet.js'

export default function ResearchCTA() {
  const wrapRef = useRef(null)
  const btnRef = useRef(null)
  useMagnet(wrapRef, btnRef)

  return (
    <section className="research-cta" id="researchCtaSection">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
          {cta.tag}
        </span>
        <h2 className="reveal research-cta__title">
          {cta.title.before}
          <br />
          <em>{cta.title.accent}</em>
        </h2>
        <p className="reveal research-cta__body">{cta.body}</p>
        <div className="research-magnet-wrap" ref={wrapRef}>
          <a href={cta.button.href} className="research-magnet-btn" ref={btnRef}>
            {cta.button.label}
          </a>
        </div>
      </div>
    </section>
  )
}
