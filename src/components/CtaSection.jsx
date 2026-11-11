
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const API = 'http://localhost:5000/api/home'

const DEFAULT_CTA_SECTION = {
  label: 'Start A Conversation',
  headingLine1: 'Ready to make',
  headingLine2: 'smarter decisions?',
  description:
    'Whether you need AI strategy, market research, product development, or digital engineering — start with a conversation.',
  buttonText: 'Book a Consultation →',
  buttonUrl: '/contact',
}

export default function CtaSection() {
  const wrapRef = useRef(null)
  const btnRef = useRef(null)

  const [content, setContent] = useState(DEFAULT_CTA_SECTION)

  useEffect(() => {
    async function loadCtaSection() {
      try {
        const response = await fetch(API)

        if (!response.ok) {
          throw new Error('Failed to load CTA section')
        }

        const data = await response.json()

        setContent({
          ...DEFAULT_CTA_SECTION,
          ...(data.ctaSection || {}),
        })
      } catch (error) {
        console.error('Failed to load CTA section:', error)
      }
    }

    loadCtaSection()
  }, [])

  // Magnetic button animation
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
          <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
            {content.label}
          </span>

          <h2 className="reveal page-cta__title">
            {content.headingLine1}
            <br />
            <em>{content.headingLine2}</em>
          </h2>

          <p className="reveal page-cta__body">
            {content.description}
          </p>

          <div className="page-magnet-wrap" ref={wrapRef}>
            <Link
              to={content.buttonUrl || '/contact'}
              className="page-magnet-btn"
              ref={btnRef}
            >
              {content.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
