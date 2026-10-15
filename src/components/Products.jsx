import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Products() {
  const root = useRef(null)

  // Desktop par vertical scroll ko horizontal scroll me badalta hai (pinned)
  useLayoutEffect(() => {
    if (window.innerWidth <= 768) return
    const ctx = gsap.context(() => {
      const track = root.current.querySelector('#prodPanelsTrack')
      if (!track) return
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '#prodPanelsContainer',
          pin: true,
          scrub: 1,
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      {/* PRODUCTS — Horizontal Scroll */}
      <section className="prod-intro bg-gm-ghost" aria-label="Products intro">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">Our Products</span>
              <h2 className="reveal prod-intro__heading" style={{ transitionDelay: '0.08s' }}>
                  Platforms Built From<br /><em>Real Experience.</em>
              </h2>
          </div>
      </section>

      <section className="prod-panels-container bg-gm-ghost" id="prodPanelsContainer">
          <div className="prod-panels-track" id="prodPanelsTrack">

              {/* Panel 01 — HRMS */}
              <article className="prod-panel prod-panel--1">
                  <div className="prod-panel__inner">
                      <div className="prod-panel__num" aria-hidden="true">Product 001</div>
                      <h3 className="prod-panel__title">Webcraft<br /><em>HRMS.</em></h3>
                      <p className="prod-panel__summary">Complete HR management — attendance, leave, payroll, self-service portal, and role-based security. Flat ₹2,999/mo server cost, no per-user fees. Built for mid-size teams who need enterprise features without enterprise budgets.</p>
                      <div className="prod-panel__meta">
                          <div>Category<span>Enterprise HR</span></div>
                          <div>Users<span>500+ companies</span></div>
                          <div>Pricing<span>₹2,999/mo flat</span></div>
                      </div>
                      <Link to="/products" className="prod-panel__cta">Learn more →</Link>
                  </div>
              </article>

              {/* Panel 02 — TutorWand */}
              <article className="prod-panel prod-panel--2">
                  <div className="prod-panel__inner">
                      <div className="prod-panel__num" aria-hidden="true">Product 002</div>
                      <h3 className="prod-panel__title">Tutor<br /><em>Wand.</em></h3>
                      <p className="prod-panel__summary">AI-powered adaptive test prep for SAT, GRE, and more. 40K+ students, 2.7K+ teachers, 5000+ questions, and white-label options for institutes. The AI adjusts difficulty in real-time to each learner's pace.</p>
                      <div className="prod-panel__meta">
                          <div>Category<span>Ed-Tech · AI</span></div>
                          <div>Reach<span>40K+ students</span></div>
                          <div>Questions<span>5,000+ bank</span></div>
                      </div>
                      <Link to="/products" className="prod-panel__cta">Learn more →</Link>
                  </div>
              </article>

              {/* Panel 03 — WCSchool ERP */}
              <article className="prod-panel prod-panel--3">
                  <div className="prod-panel__inner">
                      <div className="prod-panel__num" aria-hidden="true">Product 003</div>
                      <h3 className="prod-panel__title">WCSchool<br /><em>ERP.</em></h3>
                      <p className="prod-panel__summary">School management platform — fees, schedules, exams, parent monitoring, and seamless communication between schools, parents, and students. One dashboard for the entire institution.</p>
                      <div className="prod-panel__meta">
                          <div>Category<span>School Mgmt</span></div>
                          <div>Modules<span>12+ integrated</span></div>
                          <div>Users<span>Schools · Parents</span></div>
                      </div>
                      <Link to="/products" className="prod-panel__cta">Learn more →</Link>
                  </div>
              </article>

          </div>
      </section>
    </div>
  )
}
