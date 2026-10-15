import { Link } from 'react-router-dom'

export default function WhatWeDo() {
  return (
    <>
{/* WHAT WE DO */}
<section className="py-28 lg:py-36 bg-gm-ghost overflow-hidden relative" aria-label="Our capabilities">
<div className="orb w-[400px] h-[400px] bg-gm-teal/8 bottom-[-100px] left-[-100px]"></div>
<div className="max-w-7xl mx-auto px-6 lg:px-8">
<div className="text-center mb-20">
    <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">What We Do</span>
    <h2 className="reveal text-4xl lg:text-5xl font-extrabold text-gm-deep leading-tight" style={{ transitionDelay: '0.1s' }}>Four Capabilities,<br /><span className="bg-gradient-to-r from-gm-teal to-gm-green bg-clip-text text-transparent">One Partner</span></h2>
    <p className="reveal text-lg text-gm-muted mt-5 max-w-2xl mx-auto" style={{ transitionDelay: '0.15s' }}>We combine AI, research, products, and engineering services into a single, integrated offering — so everything works together.</p>
</div>
<div className="grid md:grid-cols-2 gap-6">

    {/* AI Solutions */}
    <Link to="/ai-solutions" className="cap-card-wrap reveal" style={{ transitionDelay: '0.05s' }}>
        <div className="cap-card-inner">
            <div className="cap-visual cap-visual--ai">
                <span className="cap-visual-num">01</span>
                <svg className="cap-visual-art" viewBox="0 0 320 200" fill="none" stroke="currentColor" aria-hidden="true">
                    {/* 3 nodes connected with pulses + sparkle */}
                    <circle cx="80"  cy="100" r="14" strokeWidth="1.4" fill="rgba(255,255,255,0.2)"/>
                    <circle cx="240" cy="60"  r="14" strokeWidth="1.4" fill="rgba(255,255,255,0.2)"/>
                    <circle cx="240" cy="140" r="14" strokeWidth="1.4" fill="rgba(255,255,255,0.2)"/>
                    <line x1="80" y1="100" x2="240" y2="60"  strokeWidth="1.2" strokeDasharray="3 4"/>
                    <line x1="80" y1="100" x2="240" y2="140" strokeWidth="1.2" strokeDasharray="3 4"/>
                    <line x1="240" y1="60" x2="240" y2="140" strokeWidth="1.2" strokeDasharray="3 4"/>
                    <circle cx="80"  cy="100" r="4" fill="currentColor" stroke="none"/>
                    <circle cx="240" cy="60"  r="4" fill="currentColor" stroke="none"/>
                    <circle cx="240" cy="140" r="4" fill="currentColor" stroke="none"/>
                    {/* sparkle accent */}
                    <path d="M155 50l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" strokeWidth="1.2" fill="rgba(255,255,255,0.25)"/>
                </svg>
                <div className="cap-visual-label">AI Solutions</div>
            </div>
            <div className="cap-content">
                <div className="cap-tags">
                    <span className="cap-tag">Machine Learning</span>
                    <span className="cap-tag">GenAI</span>
                    <span className="cap-tag">Automation</span>
                </div>
                <p className="cap-desc">Machine learning, generative AI, NLP, intelligent automation, and AI strategy — applied to real business problems with measurable outcomes.</p>
                <div className="cap-cta">Explore AI Solutions <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
            </div>
        </div>
    </Link>

    {/* Research */}
    <Link to="/research" className="cap-card-wrap reveal" style={{ transitionDelay: '0.1s' }}>
        <div className="cap-card-inner">
            <div className="cap-visual cap-visual--research">
                <span className="cap-visual-num">02</span>
                <svg className="cap-visual-art" viewBox="0 0 320 200" fill="none" stroke="currentColor" aria-hidden="true">
                    {/* bar chart bars + magnifier */}
                    <rect x="60"  y="120" width="20" height="50" rx="3" fill="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
                    <rect x="92"  y="100" width="20" height="70" rx="3" fill="rgba(255,255,255,0.32)" strokeWidth="1.2"/>
                    <rect x="124" y="80"  width="20" height="90" rx="3" fill="rgba(255,255,255,0.4)"  strokeWidth="1.2"/>
                    <rect x="156" y="60"  width="20" height="110" rx="3" fill="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                    <line x1="50" y1="170" x2="190" y2="170" strokeWidth="1" strokeOpacity="0.5"/>
                    {/* magnifier hovering top right */}
                    <circle cx="232" cy="78" r="28" strokeWidth="1.6"/>
                    <circle cx="232" cy="78" r="16" strokeWidth="1" strokeOpacity="0.55"/>
                    <line x1="252" y1="98" x2="270" y2="116" strokeWidth="2.4" strokeLinecap="round"/>
                    <circle cx="232" cy="78" r="3" fill="currentColor" stroke="none"/>
                </svg>
                <div className="cap-visual-label">Research</div>
            </div>
            <div className="cap-content">
                <div className="cap-tags">
                    <span className="cap-tag">Market Research</span>
                    <span className="cap-tag">UX Research</span>
                    <span className="cap-tag">Intelligence</span>
                </div>
                <p className="cap-desc">Market research, competitive intelligence, UX research, innovation testing, and strategic advisory — to ensure you're building the right thing.</p>
                <div className="cap-cta">See Research Capabilities <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
            </div>
        </div>
    </Link>

    {/* Products */}
    <Link to="/products" className="cap-card-wrap reveal" style={{ transitionDelay: '0.15s' }}>
        <div className="cap-card-inner">
            <div className="cap-visual cap-visual--products">
                <span className="cap-visual-num">03</span>
                <svg className="cap-visual-art" viewBox="0 0 320 200" fill="none" stroke="currentColor" aria-hidden="true">
                    {/* 3 stacked perspective layers */}
                    <g transform="translate(160 110)">
                        <rect x="-66" y="-36" width="132" height="44" rx="6" fill="rgba(255,255,255,0.18)" strokeWidth="1.4"/>
                        <rect x="-78" y="-12" width="156" height="44" rx="6" fill="rgba(255,255,255,0.28)" strokeWidth="1.4"/>
                        <rect x="-90" y="14"  width="180" height="44" rx="6" fill="rgba(255,255,255,0.42)" strokeWidth="1.4"/>
                    </g>
                    {/* floating dot accents */}
                    <circle cx="42"  cy="42"  r="4" fill="currentColor" stroke="none"/>
                    <circle cx="278" cy="166" r="4" fill="currentColor" stroke="none"/>
                    <circle cx="276" cy="40"  r="3" fill="currentColor" stroke="none" opacity="0.6"/>
                </svg>
                <div className="cap-visual-label">Products</div>
            </div>
            <div className="cap-content">
                <div className="cap-tags">
                    <span className="cap-tag">HRMS</span>
                    <span className="cap-tag">TutorWand</span>
                    <span className="cap-tag">WCSchool ERP</span>
                </div>
                <p className="cap-desc">Ready-to-deploy platforms — HRMS, TutorWand (AI-powered ed-tech), and WCSchool ERP — built from years of domain expertise and client feedback.</p>
                <div className="cap-cta">Explore Products <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
            </div>
        </div>
    </Link>

    {/* Services */}
    <Link to="/services" className="cap-card-wrap reveal" style={{ transitionDelay: '0.2s' }}>
        <div className="cap-card-inner">
            <div className="cap-visual cap-visual--services">
                <span className="cap-visual-num">04</span>
                <svg className="cap-visual-art" viewBox="0 0 320 200" fill="none" stroke="currentColor" aria-hidden="true">
                    {/* gear + code brackets */}
                    <g transform="translate(160 100)">
                        <circle r="38" strokeWidth="1.4" fill="rgba(255,255,255,0.18)"/>
                        <circle r="14" strokeWidth="1.4" fill="rgba(255,255,255,0.4)"/>
                        {/* 8 teeth */}
                        <g strokeWidth="1.4" strokeLinecap="round">
                            <line x1="0" y1="-44" x2="0" y2="-54"/>
                            <line x1="0" y1="44"  x2="0" y2="54"/>
                            <line x1="-44" y1="0" x2="-54" y2="0"/>
                            <line x1="44"  y1="0" x2="54"  y2="0"/>
                            <line x1="-31" y1="-31" x2="-38" y2="-38"/>
                            <line x1="31"  y1="31"  x2="38"  y2="38"/>
                            <line x1="-31" y1="31"  x2="-38" y2="38"/>
                            <line x1="31"  y1="-31" x2="38"  y2="-38"/>
                        </g>
                    </g>
                    {/* flanking code brackets */}
                    <text x="48"  y="120" fontFamily="Space Mono, monospace" fontSize="48" fontWeight="700" fill="rgba(255,255,255,0.55)" stroke="none">&lt;</text>
                    <text x="248" y="120" fontFamily="Space Mono, monospace" fontSize="48" fontWeight="700" fill="rgba(255,255,255,0.55)" stroke="none">/&gt;</text>
                </svg>
                <div className="cap-visual-label">Services</div>
            </div>
            <div className="cap-content">
                <div className="cap-tags">
                    <span className="cap-tag">Web &amp; Mobile</span>
                    <span className="cap-tag">Cloud</span>
                    <span className="cap-tag">UI/UX</span>
                </div>
                <p className="cap-desc">Web, mobile, UI/UX, cloud, system integration, QA, legacy modernization, and digital transformation — the engineering depth to ship it right.</p>
                <div className="cap-cta">View All Services <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
            </div>
        </div>
    </Link>

</div>
</div>
</section>


    </>
  )
}
