
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const API = 'http://localhost:5000/api/home'

const DEFAULT_WHY_WEBCRAFT = {
  label: 'The Difference',
  heading: 'Why serious businesses choose Webcraft',
  description:
    'Most technology partners start with a scope document. We start with the right questions. Webcraft combines research rigour with engineering depth so that what gets built actually solves the problem it was designed for.',
  image: '/images/why.webp',
  cards: [
    {
      title: 'Research-backed decisions',
      description:
        'We validate assumptions with data before committing resources to build.',
    },
    {
      title: 'AI with delivery realism',
      description:
        'Practical AI implementations grounded in real business constraints and ROI.',
    },
    {
      title: 'Product thinking',
      description:
        'We approach projects as products — with user value, scalability, and lifecycle in mind.',
    },
    {
      title: 'Long-term partnership',
      description:
        '96% client retention built on reliable delivery, transparent communication, and ongoing support.',
    },
  ],
}

export default function WhyWebcraft() {
  const root = useRef(null)
  const [content, setContent] = useState(DEFAULT_WHY_WEBCRAFT)

  useEffect(() => {
    let cancelled = false

    async function loadWhyWebcraft() {
      try {
        const response = await fetch(API)

        if (!response.ok) {
          throw new Error('Failed to load Why Webcraft content')
        }

        const data = await response.json()

        if (!cancelled && data.whyWebcraft) {
          setContent({
            ...DEFAULT_WHY_WEBCRAFT,
            ...data.whyWebcraft,
            cards:
              Array.isArray(data.whyWebcraft.cards) &&
              data.whyWebcraft.cards.length > 0
                ? DEFAULT_WHY_WEBCRAFT.cards.map((defaultCard, index) => ({
                    ...defaultCard,
                    ...(data.whyWebcraft.cards[index] || {}),
                  }))
                : DEFAULT_WHY_WEBCRAFT.cards,
          })
        }
      } catch (error) {
        console.error('Unable to load Why Webcraft CMS content:', error)
      }
    }

    loadWhyWebcraft()

    return () => {
      cancelled = true
    }
  }, [])

  useLayoutEffect(() => {
    if (!root.current) return

    const ctx = gsap.context(() => {
      const section = root.current?.querySelector('#whyScrub')
      if (!section) return

      const cards = section.querySelectorAll('.why-scrub-card')

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to('.why-scrub-kicker', {
            opacity: 1,
            duration: 0.6,
          })
          gsap.to('.why-scrub-heading', {
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
          })
        },
      })

      gsap.to('#whyScrubPara .word', {
        opacity: 1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'center 50%',
          scrub: 1,
        },
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 40%',
        end: 'bottom 60%',
        scrub: 0.5,
        onUpdate: (self) => {
          cards.forEach((card, index) => {
            card.classList.toggle(
              'active',
              self.progress >= 0.1 + index * 0.2
            )
          })
        },
      })
    }, root)

    return () => ctx.revert()
  }, [content.description])

  const cards = DEFAULT_WHY_WEBCRAFT.cards.map((defaultCard, index) => ({
    ...defaultCard,
    ...(content.cards?.[index] || {}),
  }))

  return (
    <div ref={root}>
      <section
        className="why-scrub-section relative bg-white"
        id="whyScrub"
        aria-label="Why Webcraft"
      >
        <div className="orb w-[350px] h-[350px] bg-gm-teal/6 top-[-80px] right-[-80px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="why-scrub-layout">
            <div className="why-scrub-left">
              <span className="why-scrub-kicker section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest mb-5">
                {content.label}
              </span>

              <h2 className="why-scrub-heading">
                {content.heading}
              </h2>

              <p className="why-scrub-para" id="whyScrubPara">
                {content.description.split(/\s+/).map((word, index) => (
                  <span key={index}>
                    <span className="word">{word}</span>{' '}
                  </span>
                ))}
              </p>

              <img
                src={content.image || '/images/why.webp'}
                alt=""
                role="presentation"
                loading="lazy"
                decoding="async"
                className="why-img mt-8 rounded-2xl w-full max-w-md"
              />
            </div>

            <div className="why-scrub-grid">
              <div className="why-scrub-card">
                <div className="why-card-icon bg-gradient-to-br from-gm-teal to-gm-green">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="why-card-title">{cards[0].title}</h3>
                <p className="why-card-body">{cards[0].description}</p>
              </div>

              <div className="why-scrub-card">
                <div className="why-card-icon bg-gradient-to-br from-gm-blue to-gm-teal">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="why-card-title">{cards[1].title}</h3>
                <p className="why-card-body">{cards[1].description}</p>
              </div>

              <div className="why-scrub-card">
                <div className="why-card-icon bg-gradient-to-br from-gm-green to-gm-mint">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="why-card-title">{cards[2].title}</h3>
                <p className="why-card-body">{cards[2].description}</p>
              </div>

              <div className="why-scrub-card">
                <div className="why-card-icon bg-gradient-to-br from-gm-navy to-gm-blue">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="why-card-title">{cards[3].title}</h3>
                <p className="why-card-body">{cards[3].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
