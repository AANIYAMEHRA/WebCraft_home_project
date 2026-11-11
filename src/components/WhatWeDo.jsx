
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = 'http://localhost:5000/api/home'

const DEFAULT_CONTENT = {
  label: 'What We Do',
  heading: 'Four Capabilities, One Partner',
  description:
    'We combine AI, research, products, and engineering services into a single, integrated offering — so everything works together.',
  services: [
    {
      title: 'AI Solutions',
      description:
        'Machine learning, generative AI, NLP, intelligent automation, and AI strategy — applied to real business problems with measurable outcomes.',
      buttonText: 'Explore AI Solutions',
      buttonUrl: '/ai-solutions',
    },
    {
      title: 'Research',
      description:
        "Market research, competitive intelligence, UX research, innovation testing, and strategic advisory — to ensure you're building the right thing.",
      buttonText: 'See Research Capabilities',
      buttonUrl: '/research',
    },
    {
      title: 'Products',
      description:
        'Ready-to-deploy platforms — HRMS, TutorWand (AI-powered ed-tech), and WCSchool ERP — built from years of domain expertise and client feedback.',
      buttonText: 'Explore Products',
      buttonUrl: '/products',
    },
    {
      title: 'Services',
      description:
        'Web, mobile, UI/UX, cloud, system integration, QA, legacy modernization, and digital transformation — the engineering depth to ship it right.',
      buttonText: 'View All Services',
      buttonUrl: '/services',
    },
  ],
}

export default function WhatWeDo() {
  const [content, setContent] = useState(DEFAULT_CONTENT)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(API)

        if (!response.ok) {
          throw new Error('Failed to fetch home page content')
        }

        const data = await response.json()
        const home = data.home || data
        const cmsContent = home.whatWeDo || {}

        setContent({
          ...DEFAULT_CONTENT,
          ...cmsContent,
          services: DEFAULT_CONTENT.services.map((service, index) => ({
            ...service,
            ...(cmsContent.services?.[index] || {}),
          })),
        })
      } catch (error) {
        console.error('Error loading What We Do content:', error)
      }
    }

    loadContent()
  }, [])

  const headingParts = content.heading.split(',')
  const hasSecondHeading = headingParts.length > 1

  const headingFirst = hasSecondHeading
    ? headingParts[0].trim()
    : content.heading

  const headingSecond = hasSecondHeading
    ? headingParts.slice(1).join(',').trim()
    : ''

  const services = content.services || DEFAULT_CONTENT.services

  return (
    <>
      {/* WHAT WE DO */}
      <section
        className="py-28 lg:py-36 bg-gm-ghost overflow-hidden relative"
        aria-label="Our capabilities"
      >
        <div className="orb w-[400px] h-[400px] bg-gm-teal/8 bottom-[-100px] left-[-100px]"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">
              {content.label}
            </span>

            <h2
              className="reveal text-4xl lg:text-5xl font-extrabold text-gm-deep leading-tight"
              style={{ transitionDelay: '0.1s' }}
            >
              {headingFirst}
              {hasSecondHeading && (
                <>
                  <br />
                  <span className="bg-gradient-to-r from-gm-teal to-gm-green bg-clip-text text-transparent">
                    {headingSecond}
                  </span>
                </>
              )}
            </h2>

            <p
              className="reveal text-lg text-gm-muted mt-5 max-w-2xl mx-auto"
              style={{ transitionDelay: '0.15s' }}
            >
              {content.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI SOLUTIONS */}
            <Link
              to={services[0].buttonUrl || '/ai-solutions'}
              className="cap-card-wrap reveal"
              style={{ transitionDelay: '0.05s' }}
            >
              <div className="cap-card-inner">
                <div className="cap-visual cap-visual--ai">
                  <span className="cap-visual-num">01</span>

                  <svg
                    className="cap-visual-art"
                    viewBox="0 0 320 200"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {/* Connected AI nodes and sparkle */}
                    <circle cx="80" cy="100" r="14" strokeWidth="1.4" fill="rgba(255,255,255,0.2)" />
                    <circle cx="240" cy="60" r="14" strokeWidth="1.4" fill="rgba(255,255,255,0.2)" />
                    <circle cx="240" cy="140" r="14" strokeWidth="1.4" fill="rgba(255,255,255,0.2)" />
                    <line x1="80" y1="100" x2="240" y2="60" strokeWidth="1.2" strokeDasharray="3 4" />
                    <line x1="80" y1="100" x2="240" y2="140" strokeWidth="1.2" strokeDasharray="3 4" />
                    <line x1="240" y1="60" x2="240" y2="140" strokeWidth="1.2" strokeDasharray="3 4" />
                    <circle cx="80" cy="100" r="4" fill="currentColor" stroke="none" />
                    <circle cx="240" cy="60" r="4" fill="currentColor" stroke="none" />
                    <circle cx="240" cy="140" r="4" fill="currentColor" stroke="none" />
                    <path d="M155 50l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" strokeWidth="1.2" fill="rgba(255,255,255,0.25)" />
                  </svg>

                  <div className="cap-visual-label">
                    {services[0].title}
                  </div>
                </div>

                <div className="cap-content">
                  <div className="cap-tags">
                    <span className="cap-tag">Machine Learning</span>
                    <span className="cap-tag">GenAI</span>
                    <span className="cap-tag">Automation</span>
                  </div>

                  <p className="cap-desc">
                    {services[0].description}
                  </p>

                  <div className="cap-cta">
                    {services[0].buttonText}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* RESEARCH */}
            <Link
              to={services[1].buttonUrl || '/research'}
              className="cap-card-wrap reveal"
              style={{ transitionDelay: '0.1s' }}
            >
              <div className="cap-card-inner">
                <div className="cap-visual cap-visual--research">
                  <span className="cap-visual-num">02</span>

                  <svg
                    className="cap-visual-art"
                    viewBox="0 0 320 200"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {/* Research chart and magnifier */}
                    <rect x="60" y="120" width="20" height="50" rx="3" fill="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                    <rect x="92" y="100" width="20" height="70" rx="3" fill="rgba(255,255,255,0.32)" strokeWidth="1.2" />
                    <rect x="124" y="80" width="20" height="90" rx="3" fill="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                    <rect x="156" y="60" width="20" height="110" rx="3" fill="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                    <line x1="50" y1="170" x2="190" y2="170" strokeWidth="1" strokeOpacity="0.5" />
                    <circle cx="232" cy="78" r="28" strokeWidth="1.6" />
                    <circle cx="232" cy="78" r="16" strokeWidth="1" strokeOpacity="0.55" />
                    <line x1="252" y1="98" x2="270" y2="116" strokeWidth="2.4" strokeLinecap="round" />
                    <circle cx="232" cy="78" r="3" fill="currentColor" stroke="none" />
                  </svg>

                  <div className="cap-visual-label">
                    {services[1].title}
                  </div>
                </div>

                <div className="cap-content">
                  <div className="cap-tags">
                    <span className="cap-tag">Market Research</span>
                    <span className="cap-tag">UX Research</span>
                    <span className="cap-tag">Intelligence</span>
                  </div>

                  <p className="cap-desc">
                    {services[1].description}
                  </p>

                  <div className="cap-cta">
                    {services[1].buttonText}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* PRODUCTS */}
            <Link
              to={services[2].buttonUrl || '/products'}
              className="cap-card-wrap reveal"
              style={{ transitionDelay: '0.15s' }}
            >
              <div className="cap-card-inner">
                <div className="cap-visual cap-visual--products">
                  <span className="cap-visual-num">03</span>

                  <svg
                    className="cap-visual-art"
                    viewBox="0 0 320 200"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {/* Three stacked product layers */}
                    <g transform="translate(160 110)">
                      <rect x="-66" y="-36" width="132" height="44" rx="6" fill="rgba(255,255,255,0.18)" strokeWidth="1.4" />
                      <rect x="-78" y="-12" width="156" height="44" rx="6" fill="rgba(255,255,255,0.28)" strokeWidth="1.4" />
                      <rect x="-90" y="14" width="180" height="44" rx="6" fill="rgba(255,255,255,0.42)" strokeWidth="1.4" />
                    </g>
                    <circle cx="42" cy="42" r="4" fill="currentColor" stroke="none" />
                    <circle cx="278" cy="166" r="4" fill="currentColor" stroke="none" />
                    <circle cx="276" cy="40" r="3" fill="currentColor" stroke="none" opacity="0.6" />
                  </svg>

                  <div className="cap-visual-label">
                    {services[2].title}
                  </div>
                </div>

                <div className="cap-content">
                  <div className="cap-tags">
                    <span className="cap-tag">HRMS</span>
                    <span className="cap-tag">TutorWand</span>
                    <span className="cap-tag">WCSchool ERP</span>
                  </div>

                  <p className="cap-desc">
                    {services[2].description}
                  </p>

                  <div className="cap-cta">
                    {services[2].buttonText}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* SERVICES */}
            <Link
              to={services[3].buttonUrl || '/services'}
              className="cap-card-wrap reveal"
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="cap-card-inner">
                <div className="cap-visual cap-visual--services">
                  <span className="cap-visual-num">04</span>

                  <svg
                    className="cap-visual-art"
                    viewBox="0 0 320 200"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {/* Gear and code brackets */}
                    <g transform="translate(160 100)">
                      <circle r="38" strokeWidth="1.4" fill="rgba(255,255,255,0.18)" />
                      <circle r="14" strokeWidth="1.4" fill="rgba(255,255,255,0.4)" />
                      <g strokeWidth="1.4" strokeLinecap="round">
                        <line x1="0" y1="-44" x2="0" y2="-54" />
                        <line x1="0" y1="44" x2="0" y2="54" />
                        <line x1="-44" y1="0" x2="-54" y2="0" />
                        <line x1="44" y1="0" x2="54" y2="0" />
                        <line x1="-31" y1="-31" x2="-38" y2="-38" />
                        <line x1="31" y1="31" x2="38" y2="38" />
                        <line x1="-31" y1="31" x2="-38" y2="38" />
                        <line x1="31" y1="-31" x2="38" y2="-38" />
                      </g>
                    </g>

                    <text x="48" y="120" fontFamily="Space Mono, monospace" fontSize="48" fontWeight="700" fill="rgba(255,255,255,0.55)" stroke="none">
                      &lt;
                    </text>
                    <text x="248" y="120" fontFamily="Space Mono, monospace" fontSize="48" fontWeight="700" fill="rgba(255,255,255,0.55)" stroke="none">
                      /&gt;
                    </text>
                  </svg>

                  <div className="cap-visual-label">
                    {services[3].title}
                  </div>
                </div>

                <div className="cap-content">
                  <div className="cap-tags">
                    <span className="cap-tag">Web &amp; Mobile</span>
                    <span className="cap-tag">Cloud</span>
                    <span className="cap-tag">UI/UX</span>
                  </div>

                  <p className="cap-desc">
                    {services[3].description}
                  </p>

                  <div className="cap-cta">
                    {services[3].buttonText}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
