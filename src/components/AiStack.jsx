import { Link } from 'react-router-dom'

export default function AiStack() {
  return (
    <>
      {/* AI SOLUTIONS SHOWCASE — Sticky Stacking Cards */}
      <section className="ai-stack-section bg-white relative" aria-label="AI Solutions">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"><svg className="w-full h-full" viewBox="0 0 1200 600" fill="none"><circle cx="600" cy="300" r="400" stroke="#2A9D8F" strokeWidth="1" strokeDasharray="4 10"/><circle cx="600" cy="300" r="260" stroke="#40B87D" strokeWidth="0.5" strokeDasharray="3 8"/></svg></div>

      {/* Section intro */}
      <div className="ai-stack-intro">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">AI Solutions</span>
              <h2 className="reveal ai-section-heading ai-section-heading--light mb-6" style={{ transitionDelay: '0.08s' }}>
                  The future belongs to businesses<br />that <em className="ai-section-em">know before they act</em>
              </h2>
              <p className="reveal text-base text-gm-muted max-w-xl leading-relaxed" style={{ transitionDelay: '0.14s' }}>
                  AI without research is noise. Research without AI is slow. Webcraft combines both — giving you the speed of intelligent automation and the confidence of informed strategy.
              </p>
          </div>
      </div>

      {/* Stacking cards */}
      <div className="ai-stack-deck max-w-5xl mx-auto px-6 lg:px-8">

          <article className="ai-stack-card ai-stack-card--1">
              <div className="ai-stack-card__num">01</div>
              <div className="ai-stack-card__body">
                  <div className="ai-stack-card__icon bg-gradient-to-br from-gm-teal to-gm-green">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/></svg>
                  </div>
                  <h3 className="ai-stack-card__title">Predictive <em>Analytics</em></h3>
                  <p className="ai-stack-card__desc">Surface patterns in your data before they become problems — or opportunities — for your competitors. We build models that turn raw signals into actionable forecasts.</p>
              </div>
          </article>

          <article className="ai-stack-card ai-stack-card--2">
              <div className="ai-stack-card__num">02</div>
              <div className="ai-stack-card__body">
                  <div className="ai-stack-card__icon bg-gradient-to-br from-gm-blue to-gm-teal">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  </div>
                  <h3 className="ai-stack-card__title">Primary <em>Research</em></h3>
                  <p className="ai-stack-card__desc">Face-to-face interviews, focus groups, and quantitative studies. We collect the data your strategy deserves — then structure it for AI-ready decision-making.</p>
              </div>
          </article>

          <article className="ai-stack-card ai-stack-card--3">
              <div className="ai-stack-card__num">03</div>
              <div className="ai-stack-card__body">
                  <div className="ai-stack-card__icon bg-gradient-to-br from-gm-green to-gm-mint">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
                  </div>
                  <h3 className="ai-stack-card__title">Automation at <em>Scale</em></h3>
                  <p className="ai-stack-card__desc">No-code RPA and conversational AI deployed across real workflows — cutting cost and accelerating timelines without replacing the teams who know the work best.</p>
              </div>
          </article>

          <article className="ai-stack-card ai-stack-card--4">
              <div className="ai-stack-card__num">04</div>
              <div className="ai-stack-card__body">
                  <div className="ai-stack-card__icon bg-gradient-to-br from-gm-navy to-gm-blue">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"/></svg>
                  </div>
                  <h3 className="ai-stack-card__title">LLM &amp; <em>Gen AI</em></h3>
                  <p className="ai-stack-card__desc">Generative AI integrated into your products and processes — with proprietary data reliability, guardrails, and enterprise-grade security baked in from day one.</p>
              </div>
          </article>

          <article className="ai-stack-card ai-stack-card--5">
              <div className="ai-stack-card__num">05</div>
              <div className="ai-stack-card__body">
                  <div className="ai-stack-card__icon bg-gradient-to-br from-gm-teal to-gm-blue">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>
                  </div>
                  <h3 className="ai-stack-card__title">Market <em>Intelligence</em></h3>
                  <p className="ai-stack-card__desc">Competitive landscapes and market analysis that back acquisition decisions before senior sign-off. Real intelligence, not recycled desk research.</p>
              </div>
          </article>

          <article className="ai-stack-card ai-stack-card--6">
              <div className="ai-stack-card__num">06</div>
              <div className="ai-stack-card__body">
                  <div className="ai-stack-card__icon bg-gradient-to-br from-gm-deep to-gm-navy">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                  </div>
                  <h3 className="ai-stack-card__title">AI Security &amp; <em>MLOps</em></h3>
                  <p className="ai-stack-card__desc">Fraud detection, predictive maintenance, and supply-chain optimisation — AI that processes and performs at scale with full auditability and compliance.</p>
              </div>
          </article>

      </div>

      {/* CTA */}
      <div className="ai-stack-cta">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
              <Link to="/ai-solutions" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gm-teal to-gm-green text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-gm-teal/30 transition-all">
                  See All AI Solutions
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
          </div>
      </div>

      </section>
    </>
  )
}
