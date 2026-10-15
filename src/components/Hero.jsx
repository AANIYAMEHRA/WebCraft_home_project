import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Counter from './Counter.jsx'

export default function Hero() {
  const root = useRef(null)

  // Entrance animation (original script ka same timeline)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.3, defaults: { ease: 'power3.out' } })
        .to('#heroChip', { opacity: 1, y: 0, duration: 0.7 })
        .to('#heroLine1', { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
        .to('#heroLine2', { opacity: 1, y: 0, duration: 0.9 }, '-=0.55')
        .to('#heroSub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .to('#heroCtas', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .to('#heroStats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
{/* HERO */}
<section className="relative min-h-screen hero-mesh noise grid-bg flex items-center overflow-hidden" aria-label="Hero">
<div className="orb w-[500px] h-[500px] bg-gm-teal/10 top-[-100px] left-[-100px]"></div>
<div className="orb w-[400px] h-[400px] bg-gm-blue/10 bottom-[-50px] right-[-50px]" style={{ animationDelay: '3s' }}></div>
<div className="orb w-[250px] h-[250px] bg-gm-green/10 top-[40%] right-[20%]" style={{ animationDelay: '5s' }}></div>
<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 lg:pt-0 lg:pb-0">
<div className="grid lg:grid-cols-2 gap-16 items-center">
<div id="heroLeft">
    <div id="heroChip" className="hero-gsap inline-flex items-center gap-2 px-4 py-1.5 bg-gm-teal/10 border border-gm-teal/20 rounded-full mb-6 mt-8">
        <span className="w-2 h-2 rounded-full bg-gm-green pulse-dot"></span>
        <span className="text-xs font-mono font-bold text-gm-teal uppercase tracking-wider">AI-Led · Research-Backed · Delivery-Ready</span>
    </div>
    <h1 id="heroTitle" className="text-4xl lg:text-6xl font-extrabold text-gm-deep leading-[1.08] tracking-tight">
        <span className="hero-line" id="heroLine1">Smarter Decisions.</span><br />
        <span className="hero-line bg-gradient-to-r from-gm-teal via-gm-blue to-gm-green bg-clip-text text-transparent" id="heroLine2">Stronger Products.</span>
    </h1>
    <p id="heroSub" className="hero-gsap text-lg text-gm-muted mt-6 max-w-lg leading-relaxed">
        Webcraft combines AI solutions and deep research with proven engineering to help you decide what to build, then build it right.
    </p>
    <div id="heroCtas" className="hero-gsap flex flex-wrap gap-4 mt-10">
        <Link to="/ai-solutions" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gm-teal to-gm-green text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-gm-teal/20 transition-all">
            Explore AI Solutions
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </Link>
        <Link to="/research" className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gm-deep/10 text-gm-deep font-semibold rounded-full hover:border-gm-teal/30 hover:bg-gm-ghost transition-all">
            See Research Capabilities
        </Link>
    </div>
    <div id="heroStats" className="hero-gsap mt-14 flex items-center gap-8">
        <div className="text-center"><Counter end={17} suffix="+" label="17 plus years established" className="stat-num text-3xl font-extrabold text-gm-deep" /><div className="text-xs text-gm-muted font-medium mt-1">Years Established</div></div>
        <div className="w-px h-10 bg-gm-deep/10"></div>
        <div className="text-center"><Counter end={3000} suffix="+" label="3000 plus clients served" className="stat-num text-3xl font-extrabold text-gm-deep" /><div className="text-xs text-gm-muted font-medium mt-1">Clients Served</div></div>
        <div className="w-px h-10 bg-gm-deep/10"></div>
        <div className="text-center"><Counter end={230} suffix="+" label="230 plus professionals" className="stat-num text-3xl font-extrabold text-gm-deep" /><div className="text-xs text-gm-muted font-medium mt-1">Professionals</div></div>
        <div className="w-px h-10 bg-gm-deep/10 hidden sm:block"></div>
        <div className="text-center hidden sm:block"><Counter end={96} suffix="%" label="96 percent client retention" className="stat-num text-3xl font-extrabold text-gm-deep" /><div className="text-xs text-gm-muted font-medium mt-1">Client Retention</div></div>
    </div>
</div>
{/* Hero Visual */}
<div className="reveal hidden lg:block relative" style={{ transitionDelay: '0.3s' }}>
    <div className="relative w-full aspect-square max-w-[520px] mx-auto home-hero-stage">

        {/* Behind-everything SVG: dashed perimeter, ripples, connecting lines */}
        <svg className="home-hero-svg" viewBox="0 0 200 200" aria-hidden="true">
            {/* Dashed counter-rotating perimeter */}
            <circle className="home-perimeter" cx="100" cy="100" r="96" fill="none" stroke="rgba(42,157,143,0.28)" strokeWidth="1" strokeDasharray="2 7"/>
            {/* Connecting lines from center to each chip */}
            <line className="home-connect home-connect--1" x1="100" y1="100" x2="42" y2="22" strokeWidth="1" strokeDasharray="3 5"/>
            <line className="home-connect home-connect--2" x1="100" y1="100" x2="158" y2="22" strokeWidth="1" strokeDasharray="3 5"/>
            <line className="home-connect home-connect--3" x1="100" y1="100" x2="32"  y2="172" strokeWidth="1" strokeDasharray="3 5"/>
            <line className="home-connect home-connect--4" x1="100" y1="100" x2="168" y2="172" strokeWidth="1" strokeDasharray="3 5"/>
            {/* Three expanding ripple waves emanating from center */}
            <circle className="home-ripple"            cx="100" cy="100" r="22" fill="none" stroke="rgba(42,157,143,0.55)" strokeWidth="1.5"/>
            <circle className="home-ripple home-ripple--2" cx="100" cy="100" r="22" fill="none" stroke="rgba(42,157,143,0.55)" strokeWidth="1.5"/>
            <circle className="home-ripple home-ripple--3" cx="100" cy="100" r="22" fill="none" stroke="rgba(42,157,143,0.55)" strokeWidth="1.5"/>
        </svg>

        {/* Concentric translucent rings + center sparkle */}
        <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gm-teal/20 to-gm-green/20 backdrop-blur-sm border border-gm-teal/10 flex items-center justify-center">
            <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-gm-teal/30 to-gm-blue/20 border border-white/30 flex items-center justify-center">
                <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gm-teal to-gm-green shadow-2xl shadow-gm-teal/30 flex items-center justify-center home-center-pulse">
                    <svg className="w-16 h-16 text-white home-center-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/><path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"/></svg>
                </div>
            </div>
        </div>

        {/* Floating chip: top-left → AI Solutions */}
        <div className="absolute top-[4%] left-[6%] bg-white rounded-2xl shadow-lg shadow-gm-teal/10 border border-gm-teal/10 px-3 py-2 flex items-center gap-2 hero-card-float">
            <svg className="w-5 h-5 text-gm-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gm-muted">Smarter</span>
                <span className="text-sm font-bold text-gm-deep">AI Solutions</span>
            </div>
        </div>

        {/* Floating chip: top-right → Research */}
        <div className="absolute top-[4%] right-[6%] bg-white rounded-2xl shadow-lg shadow-gm-blue/10 border border-gm-blue/10 px-3 py-2 flex items-center gap-2 hero-card-float" style={{ animationDelay: '1s', animationDuration: '7s' }}>
            <svg className="w-5 h-5 text-gm-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>
            <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gm-muted">Sharper</span>
                <span className="text-sm font-bold text-gm-deep">Research</span>
            </div>
        </div>

        {/* Floating chip: bottom-left → Products */}
        <div className="absolute bottom-[8%] left-[3%] bg-white rounded-2xl shadow-lg shadow-gm-green/10 border border-gm-green/10 px-3 py-2 flex items-center gap-2 hero-card-float" style={{ animationDelay: '2s', animationDuration: '8s' }}>
            <svg className="w-5 h-5 text-gm-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>
            <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gm-muted">Built</span>
                <span className="text-sm font-bold text-gm-deep">Products</span>
            </div>
        </div>

        {/* Floating chip: bottom-right → Services */}
        <div className="absolute bottom-[8%] right-[3%] bg-white rounded-2xl shadow-lg shadow-gm-teal/10 border border-gm-teal/10 px-3 py-2 flex items-center gap-2 hero-card-float" style={{ animationDelay: '4s', animationDuration: '9s' }}>
            <svg className="w-5 h-5 text-gm-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gm-muted">Engineered</span>
                <span className="text-sm font-bold text-gm-deep">Services</span>
            </div>
        </div>

        {/* Slow-orbiting dots on outermost ring */}
        <div className="about-orbit-ring" aria-hidden="true">
            <span className="about-orbit-dot about-orbit-dot--a"></span>
            <span className="about-orbit-dot about-orbit-dot--b"></span>
            <span className="about-orbit-dot about-orbit-dot--c"></span>
        </div>
    </div>
</div>
</div>
</div>
</section>


    </div>
  )
}
