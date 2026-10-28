import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReveal from "../hooks/useReveal";
import useMagnet from "../hooks/useMagnet";
import AiNeuralNetwork from "../components/AiNeuralNetwork";
import { heroBadges, manifesto, panels, stackTags, orbitRings, philSteps } from "./aiSolutionsData";

gsap.registerPlugin(ScrollTrigger);

const ArrowIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

/* Manifesto: every word becomes a <span class="word"> so GSAP can fade them in on scroll */
function ManifestoText() {
    let k = 0;
    return (
        <p className="manifesto-text" id="manifestoText">
            {manifesto.map((seg, i) => {
                const words = seg.text.split(/(\s+)/).map((w) => {
                    if (/^\s+$/.test(w)) return w;
                    if (!w.length) return null;
                    return <span className="word" key={k++}>{w}</span>;
                });
                return seg.em ? <em key={i}>{words}</em> : <Fragment key={i}>{words}</Fragment>;
            })}
        </p>
    );
}

/* One service panel (image left/right alternates) */
function ServicePanel({ p }) {
    const image = (
        <div className="reveal" style={{ transitionDelay: "0s" }}>
            <img
                src={p.image}
                alt=""
                role="presentation"
                width="520"
                height="520"
                loading="lazy"
                decoding="async"
                onLoad={() => ScrollTrigger.refresh()}
                className={`rounded-3xl w-full max-w-md mx-auto shadow-2xl border ${p.imageClass}`}
            />
        </div>
    );
    const content = (
        <div>
            <div className="reveal mb-4" style={{ transitionDelay: "0.1s" }}>
                <span className={`inline-block font-mono text-sm font-bold ${p.numColor} tracking-widest`} aria-hidden="true">{p.num}</span>
            </div>
            <h2 className="reveal text-3xl lg:text-4xl font-extrabold text-gm-deep leading-tight mb-6 font-['Fraunces']" style={{ transitionDelay: "0.15s" }}>
                {p.title}
            </h2>
            <p className="reveal text-base text-gm-muted leading-relaxed mb-8" style={{ transitionDelay: "0.2s" }}>{p.body}</p>
            <Link
                to="/contact"
                className={`reveal inline-flex items-center gap-2 ${p.linkColor} font-semibold hover:gap-3 transition-all group`}
                style={{ transitionDelay: "0.25s" }}
            >
                Explore
                <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );

    return (
        <div className={p.border ? "border-b border-gm-teal/8" : undefined}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {p.imageLeft ? <>{image}{content}</> : <>{content}{image}</>}
                </div>
            </div>
        </div>
    );
}

const polar = (radius, deg) => {
    const a = (deg * Math.PI) / 180;
    return `translate(${250 + Math.cos(a) * radius}, ${250 + Math.sin(a) * radius})`;
};

export default function AiSolutions() {
    const pageRef = useRef(null);
    const orbitRef = useRef(null);
    const philDescRef = useRef(null);
    const ctaWrapRef = useRef(null);
    const ctaBtnRef = useRef(null);

    useReveal();
    useMagnet(ctaWrapRef, ctaBtnRef);

    useEffect(() => {
        const prev = document.title;
        document.title = "AI Solutions — Webcraft";
        return () => { document.title = prev; };
    }, []);

    /* GSAP: manifesto word reveal + pinned philosophy */
    useEffect(() => {
        const ctx = gsap.context(() => {
            // OUR POSITION — scrubbed word reveal
            gsap.to("#manifestoText .word", {
                opacity: 1,
                stagger: 0.03,
                scrollTrigger: { trigger: "#manifestoText", start: "top 75%", end: "bottom 60%", scrub: 1 },
            });

            // OUR AI PHILOSOPHY — pinned 4-step progression
            const circles = gsap.utils.toArray(".ai-phil-circ");
            const cards = gsap.utils.toArray(".ai-phil-cd");
            const desc = philDescRef.current;

            if (window.innerWidth > 768) {
                gsap.to(".ai-phil-line-fill", {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".ai-phil-spacer",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.8,
                        onUpdate: (self) => {
                            const p = self.progress;
                            const step = p < 0.3 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3;
                            circles.forEach((c, i) => c.classList.toggle("active", i === step));
                            cards.forEach((c, i) => c.classList.toggle("active", i === step));
                            if (desc) desc.textContent = philSteps[step].desc;
                        },
                    },
                });
            } else {
                circles.forEach((c) => c.classList.add("active"));
                cards.forEach((c) => c.classList.add("active"));
            }
        }, pageRef);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const t = setTimeout(refresh, 300);
        return () => {
            window.removeEventListener("load", refresh);
            clearTimeout(t);
            ctx.revert();
        };
    }, []);

    /* TECH ORBIT — items rotate around the centre (runs only while visible) */
    useEffect(() => {
        const vis = orbitRef.current;
        if (!vis) return;
        const rings = vis.querySelectorAll(".orbit-ring-group");
        let t = 0;
        let rafId = null;

        const tick = () => {
            t += 0.01;
            rings.forEach((ring) => {
                const radius = +ring.dataset.radius;
                const speed = +ring.dataset.speed;
                ring.querySelectorAll(".orbit-item").forEach((item) => {
                    const angle = ((+item.dataset.angle) + t * 20 * speed) * (Math.PI / 180);
                    item.setAttribute(
                        "transform",
                        `translate(${250 + Math.cos(angle) * radius}, ${250 + Math.sin(angle) * radius})`
                    );
                });
            });
            rafId = requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (!rafId) tick();
                } else {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            },
            { threshold: 0.1 }
        );
        io.observe(vis);
        return () => {
            io.disconnect();
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={pageRef}>
            <main id="main-content">
                {/* ============================ 1. HERO ============================ */}
                <section className="relative min-h-screen flex flex-col bg-white overflow-hidden pt-20" aria-label="Page hero">
                    <div className="absolute inset-0 hero-mesh" />
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="orb w-[600px] h-[600px] bg-gm-teal/12 top-[-150px] right-[-150px]" />
                    <div className="orb w-[400px] h-[400px] bg-gm-green/8 bottom-[100px] left-[-100px]" style={{ animationDelay: "2s" }} />

                    <div className="relative flex-1 flex items-center">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-28">
                            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                                {/* Left column */}
                                <div className="lg:col-span-3">
                                    <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 border border-gm-teal/15 px-4 py-1.5 rounded-full mb-8">AI Solutions</span>
                                    <h1 className="reveal text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gm-deep leading-[1.06] tracking-tight mb-6" style={{ transitionDelay: "0.1s" }}>
                                        Intelligent AI.<br />
                                        <span className="bg-gradient-to-r from-gm-teal via-gm-blue to-gm-green bg-clip-text text-transparent">Measurable Outcomes.</span>
                                    </h1>
                                    <p className="reveal text-lg lg:text-xl text-gm-muted leading-relaxed max-w-xl mb-10" style={{ transitionDelay: "0.2s" }}>
                                        Five AI disciplines. One integrated team. We design, build, and deploy AI systems that run in production — not in sandboxes — and generate returns your board can see.
                                    </p>
                                    <div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: "0.3s" }}>
                                        <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gm-teal to-gm-green text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-gm-teal/20 transition-all">
                                            Book a Consultation
                                            <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link to="/research" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gm-deep/12 text-gm-deep font-semibold rounded-full hover:border-gm-teal/30 hover:bg-gm-ghost transition-all">
                                            See Research Capabilities
                                        </Link>
                                    </div>
                                </div>

                                {/* Right column: neural-network SVG + floating badges */}
                                <div className="lg:col-span-2 flex items-center justify-center relative">
                                    {heroBadges.map((b) => (
                                        <div
                                            key={b.label}
                                            className={`hero-card-float absolute ${b.pos} z-10 bg-white border ${b.border} rounded-2xl px-4 py-3 flex items-center gap-2 shadow-lg ${b.shadow}`}
                                            style={{ animationDelay: b.delay }}
                                        >
                                            <div className={`w-7 h-7 rounded-lg ${b.iconBg} flex items-center justify-center`}>
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path d={b.icon} />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-semibold text-gm-deep">{b.label}</span>
                                        </div>
                                    ))}
                                    <AiNeuralNetwork />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================== 2. OUR POSITION — Manifesto ===================== */}
                <section className="manifesto-section" id="manifestoSection">
                    <div className="manifesto-bg-orbs">
                        <div className="manifesto-orb manifesto-orb--1" />
                        <div className="manifesto-orb manifesto-orb--2" />
                    </div>
                    <div className="manifesto-inner max-w-5xl mx-auto px-6 lg:px-8">
                        <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-8">Our Position</span>
                        <ManifestoText />
                    </div>
                </section>

                {/* ===================== 3. SERVICE PANELS ===================== */}
                <div className="bg-gm-ghost" aria-label="Featured AI service panels">
                    {panels.map((p) => (
                        <ServicePanel p={p} key={p.num} />
                    ))}
                </div>

                {/* ===================== 4. THE STACK — Tech Orbit ===================== */}
                <section className="orbit-section bg-white" id="orbitSection" aria-label="Technology stack">
                    <div className="orbit-inner max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="orbit-left">
                            <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">The Stack</span>
                            <h2 className="reveal orbit-heading">The tools <em>behind the work.</em></h2>
                            <p className="reveal orbit-body">
                                We don't have a favorite framework — we have a favorite way of choosing one. Research-grade tools for research, production-grade for production, and clear documentation of why each was picked.
                            </p>
                            <div className="orbit-stack reveal">
                                {stackTags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="orbit-visual" id="orbitVisual" ref={orbitRef}>
                            <svg viewBox="0 0 500 500">
                                <circle className="orbit-ring" cx="250" cy="250" r="90" />
                                <circle className="orbit-ring" cx="250" cy="250" r="160" />
                                <circle className="orbit-ring" cx="250" cy="250" r="220" />

                                <circle className="orbit-center" cx="250" cy="250" r="32" />
                                <text className="orbit-center-label" x="250" y="253">AI</text>

                                {orbitRings.map((ring) => (
                                    <g className="orbit-ring-group" data-radius={ring.radius} data-speed={ring.speed} key={ring.radius}>
                                        {ring.items.map((it) => (
                                            <g className="orbit-item" data-angle={it.angle} transform={polar(ring.radius, it.angle)} key={it.label}>
                                                <circle className="orbit-item-dot" r="4" />
                                                <text className="orbit-item-label" y="-10">{it.label}</text>
                                            </g>
                                        ))}
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>
                </section>

                {/* ===================== 5. OUR AI PHILOSOPHY — Pinned 4-Step ===================== */}
                <section className="ai-phil-outer" id="aiPhilSection">
                    <div className="ai-phil-spacer">
                        <div className="ai-phil-sticky">
                            <div className="ai-phil-inner max-w-7xl mx-auto px-6 lg:px-8 text-center">
                                <div className="ai-phil-head">
                                    <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">Our AI Philosophy</span>
                                    <h2 className="ai-phil-heading">Four <em>disciplines</em> every model passes through.</h2>
                                    <p className="ai-phil-desc" ref={philDescRef}>
                                        Every model we deploy follows the same four-stage discipline. No exceptions — for proof-of-concepts, for production, for research prototypes. Stage one filters out the bad ideas before money is spent.
                                    </p>
                                </div>

                                <div className="ai-phil-track max-w-5xl mx-auto">
                                    <div className="ai-phil-line-wrap">
                                        <div className="ai-phil-line-bg" />
                                        <div className="ai-phil-line-fill" />
                                        <div className="ai-phil-circles">
                                            {philSteps.map((_, i) => (
                                                <div className="ai-phil-circ" key={i}>0{i + 1}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="ai-phil-cards">
                                        {philSteps.map((s) => (
                                            <div className="ai-phil-cd" key={s.title}>
                                                <h3 className="ai-phil-cd__title">{s.title}</h3>
                                                <p className="ai-phil-cd__body">{s.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================================ 6. CTA ================================ */}
                <section className="page-cta" aria-label="Call to action">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
                        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">Let's Build</span>
                        <h2 className="reveal page-cta__title">Ready to apply AI to<br /><em>your business?</em></h2>
                        <p className="reveal page-cta__body">
                            Let's identify where AI creates the most value for your organisation — and build it right.
                        </p>
                        <div className="page-magnet-wrap" ref={ctaWrapRef}>
                            <Link to="/contact" className="page-magnet-btn" ref={ctaBtnRef}>Book a Consultation →</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}