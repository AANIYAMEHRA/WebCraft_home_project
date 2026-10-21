
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const API = 'http://localhost:5000/api/home'

const DEFAULT_APPROACH = {
  label: 'Our Approach',
  heading: "We don't start with code.",
  introDescription:
    'Every engagement begins with understanding. Through structured research, market analysis, and technology assessment, we help you define the right problem — then design and build the right solution.',
  steps: [
    {
      num: '01',
      title: 'Understand',
      card: 'Research, validate and define the opportunity before a line of code is written.',
      sub: 'We start with clarity.',
      desc: 'Research, validate, and define the opportunity. We listen carefully before we recommend — then we pressure-test the recommendation before we build.',
    },
    {
      num: '02',
      title: 'Design',
      card: 'Architect the solution around product thinking, user value and scalability.',
      sub: 'We design for leverage.',
      desc: 'Architect the solution around product thinking, user value, and scalability. Every decision gets a written rationale — so it holds up six months later.',
    },
    {
      num: '03',
      title: 'Deliver',
      card: 'Build, iterate and support at scale with full accountability from one team.',
      sub: 'We deliver, and we stay.',
      desc: 'Build, iterate, and support at scale. One team from first brief to last line of code — with full accountability, not handoffs.',
    },
  ],
}

export default function Approach() {
  const root = useRef(null)

  const [step, setStep] = useState(-1)
  const [content, setContent] = useState(DEFAULT_APPROACH)

  // Load Approach content from the Home CMS API.
  useEffect(() => {
    const controller = new AbortController()

    async function loadApproach() {
      try {
        const response = await fetch(API, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load Approach content')
        }

        const data = await response.json()
        const savedApproach = data.approach || {}

        setContent({
          ...DEFAULT_APPROACH,
          ...savedApproach,
          steps: DEFAULT_APPROACH.steps.map((defaultStep, index) => ({
            ...defaultStep,
            ...(savedApproach.steps?.[index] || {}),
          })),
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to load Approach content:', error)
        }
      }
    }

    loadApproach()

    return () => controller.abort()
  }, [])

  const steps = content.steps
  const current = steps[step]

  // Preserve the existing desktop scroll animation.
  useLayoutEffect(() => {
    if (window.innerWidth <= 768) return

    const ctx = gsap.context(() => {
      gsap.to('#apprLine', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.appr-spacer',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress
            setStep(p < 0.4 ? 0 : p < 0.75 ? 1 : 2)
          },
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="appr-outer bg-gm-ghost"
      id="approachSection"
    >
      <div className="appr-spacer">
        <div className="appr-sticky">
          <div className="appr-inner max-w-7xl mx-auto px-6 lg:px-8">
            <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
              {content.label}
            </span>

            <h2 className="appr-heading">
              {content.heading}
              <br />
              <em id="apprSub">
                {current ? current.sub : steps[0]?.sub || 'We start with clarity.'}
              </em>
            </h2>

            <p className="appr-desc" id="apprDesc">
              {current ? current.desc : content.introDescription}
            </p>

            {/* Timeline */}
            <div className="appr-timeline-row">
              <div className="appr-timeline-bg" />
              <div className="appr-timeline-fill" id="apprLine" />
            </div>

            <div className="appr-circles-row">
              {steps.map((s, i) => (
                <div
                  key={s.num || i}
                  className={`appr-circle ${step === i ? 'active' : ''}`}
                >
                  {s.num}
                </div>
              ))}
            </div>

            {/* Step cards */}
            <div className="appr-steps-grid">
              {steps.map((s, i) => (
                <div
                  key={s.num || i}
                  className={`appr-step-card ${step === i ? 'active' : ''}`}
                >
                  <h3>{s.title}</h3>
                  <p>{s.card}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
