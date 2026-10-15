import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function CtaSection() {
  const wrapRef = useRef(null)
  const btnRef = useRef(null)

  // Magnetic button: mouse ke saath button thoda khinchta hai
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const wrap = wrapRef.current
    const btn = btnRef.current
    if (!wrap || !btn) return
    const onMove = (e) => {
      const r = btn.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`
    }
    const onLeave = () => {
      btn.style.transform = ''
    }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      {/* ===================== CTA ===================== */}
      <section className="page-cta" aria-label="Call to action">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">Start A Conversation</span>
          <h2 className="reveal page-cta__title">Ready to make<br /><em>smarter decisions?</em></h2>
          <p className="reveal page-cta__body">Whether you need AI strategy, market research, product development, or digital engineering — start with a conversation.</p>
          <div className="page-magnet-wrap" ref={wrapRef}>
            <Link to="/contact" className="page-magnet-btn" ref={btnRef}>Book a Consultation →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
