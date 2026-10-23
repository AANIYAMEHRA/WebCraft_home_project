import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReveal from "../hooks/useReveal";
import useMagnet from "../hooks/useMagnet";
import { heroChips, milestones, ways, values, philSteps, stats } from "./aboutData";



gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Odometer digit counter (By the Numbers)                            */
/* ------------------------------------------------------------------ */
function Odometer({ target, ariaLabel }) {
    const rootRef = useRef(null);
    const digits = String(target).split("").map(Number);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const timers = [];
        const cols = root.querySelectorAll(".num-odometer-digit");

        const st = ScrollTrigger.create({
            trigger: root,
            start: "top 85%",
            once: true,
            onEnter: () => {
                cols.forEach((col, i) => {
                    const id = setTimeout(() => {
                        col.style.transform = `translateY(-${digits[i]}em)`;
                    }, i * 150);
                    timers.push(id);
                });
            },
        });

        return () => {
            st.kill();
            timers.forEach(clearTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);

    return (
        <span ref={rootRef} className="num-odometer" aria-label={ariaLabel}>
            {digits.map((d, i) => (
                <div className="num-odometer-digit" key={i}>
                    {Array.from({ length: d + 1 }, (_, n) => (
                        <span key={n}>{n}</span>
                    ))}
                </div>
            ))}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function About() {
    const pageRef = useRef(null);
    const yearRef = useRef(null);
    const contextRef = useRef(null);
    const philDescRef = useRef(null);
    const careersWrapRef = useRef(null);
    const careersBtnRef = useRef(null);
    const ctaWrapRef = useRef(null);
    const ctaBtnRef = useRef(null);

    // scroll-reveal (.reveal -> .visible)
    useReveal();
    // magnetic buttons
    useMagnet(careersWrapRef, careersBtnRef);
    useMagnet(ctaWrapRef, ctaBtnRef);

    // <title>
    useEffect(() => {
        const prev = document.title;
        document.title = "About Us — Webcraft | Research-Led, AI-Enabled Digital Transformation";
        return () => { document.title = prev; };
    }, []);

    // GSAP: story timeline + pinned delivery philosophy
    useEffect(() => {
        const ctx = gsap.context(() => {
            /* ---------- OUR STORY: sticky year + milestone fade-in ---------- */
            const yearEl = yearRef.current;
            const contextEl = contextRef.current;
            const mileEls = gsap.utils.toArray(".story-mile");
            let currentYear = yearEl ? yearEl.textContent : "";

            const setYear = (year, text) => {
                if (year === currentYear) return;
                currentYear = year;
                gsap.to(yearEl, {
                    yPercent: -100, opacity: 0, duration: 0.35, ease: "power2.in",
                    onComplete: () => {
                        yearEl.textContent = year;
                        gsap.fromTo(yearEl,
                            { yPercent: 100, opacity: 0 },
                            { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
                    },
                });
                gsap.to(contextEl, {
                    opacity: 0, duration: 0.2,
                    onComplete: () => {
                        contextEl.textContent = text;
                        gsap.to(contextEl, { opacity: 1, duration: 0.3 });
                    },
                });
            };

            mileEls.forEach((m) => {
                ScrollTrigger.create({
                    trigger: m, start: "top 60%", end: "bottom 40%",
                    onEnter: () => setYear(m.dataset.year, m.dataset.context),
                    onEnterBack: () => setYear(m.dataset.year, m.dataset.context),
                });
                gsap.to(m, {
                    opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
                    scrollTrigger: { trigger: m, start: "top 85%", once: true },
                });
            });

            /* ---------- DELIVERY PHILOSOPHY: pinned 4-step progression ---------- */
            const circles = gsap.utils.toArray(".phil-circ");
            const cards = gsap.utils.toArray(".phil-cd");
            const desc = philDescRef.current;

            if (window.innerWidth > 768) {
                gsap.to(".phil-line-fill", {
                    scaleX: 1, ease: "none",
                    scrollTrigger: {
                        trigger: ".phil-spacer",
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

        // layout (fonts/images) may shift after mount
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const t = setTimeout(refresh, 300);

        return () => {
            window.removeEventListener("load", refresh);
            clearTimeout(t);
            ctx.revert();
        };
    }, []);

    return (
        <div ref={pageRef}>
            <main id="main-content">
                {/* ============================ HERO ============================ */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden" aria-label="About hero">
                    <div className="absolute inset-0 hero-mesh" />
                    <div className="orb w-[500px] h-[500px] bg-gm-teal/10 top-[-100px] right-[-100px]" />
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                            {/* Left: copy */}
                            <div className="lg:col-span-3">
                                <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">About Webcraft</span>
                                <h1 className="reveal text-5xl lg:text-6xl font-extrabold text-gm-deep leading-[1.08] tracking-tight" style={{ transitionDelay: "0.1s" }}>
                                    The Company<br />
                                    <span className="bg-gradient-to-r from-gm-teal via-gm-blue to-gm-green bg-clip-text text-transparent">Behind the Work</span>
                                </h1>
                                <p className="reveal text-lg text-gm-muted mt-6 max-w-2xl leading-relaxed" style={{ transitionDelay: "0.2s" }}>
                                    Founded in 2006, Webcraft has grown from a web development firm into a research-led, AI-enabled digital transformation partner — serving 3000+ clients with a team of 230+ professionals.
                                </p>
                            </div>

                            {/* Right: animated visual */}
                            <div className="reveal hidden lg:block lg:col-span-2 relative" style={{ transitionDelay: "0.3s" }}>
                                <div className="relative w-full aspect-square max-w-[480px] mx-auto">
                                    {/* Concentric translucent rings */}
                                    <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gm-teal/20 to-gm-green/20 backdrop-blur-sm border border-gm-teal/10 flex items-center justify-center">
                                        <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-gm-teal/30 to-gm-blue/20 border border-white/30 flex items-center justify-center">
                                            <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gm-teal to-gm-green shadow-2xl shadow-gm-teal/30 flex flex-col items-center justify-center text-white">
                                                <span className="font-extrabold text-5xl leading-none about-pulse" style={{ fontFamily: "'Fraunces', serif" }}>
                                                    17<sup className="text-2xl align-top">+</sup>
                                                </span>
                                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase mt-2 opacity-90">Years</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating chips */}
                                    {heroChips.map((chip) => (
                                        <div
                                            key={chip.label}
                                            className={`absolute ${chip.pos} bg-white rounded-2xl shadow-lg ${chip.box} border px-3 py-2 flex items-center gap-2 hero-card-float`}
                                            style={chip.style}
                                        >
                                            <svg className={`w-5 h-5 ${chip.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path d={chip.icon} />
                                            </svg>
                                            <div className="flex flex-col leading-tight">
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-gm-muted">{chip.label}</span>
                                                <span className="text-sm font-bold text-gm-deep">{chip.value}</span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Slow-orbiting decorative dots */}
                                    <div className="about-orbit-ring" aria-hidden="true">
                                        <span className="about-orbit-dot about-orbit-dot--a" />
                                        <span className="about-orbit-dot about-orbit-dot--b" />
                                        <span className="about-orbit-dot about-orbit-dot--c" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================== OUR STORY (sticky year) ===================== */}
                <section className="story-section bg-white" id="storySection">
                    <div className="story-inner max-w-7xl mx-auto px-6 lg:px-8">
                        <aside className="story-sticky">
                            <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">Our Story</span>
                            <div className="story-year-wrap">
                                <span className="story-year" ref={yearRef}>{milestones[0].year}</span>
                            </div>
                            <div className="story-context" ref={contextRef}>{milestones[0].context}</div>
                        </aside>

                        <div className="story-milestones">
                            {milestones.map((m) => (
                                <article className="story-mile" key={m.year} data-year={m.year} data-context={m.context}>
                                    <div className="story-mile__year">{m.year} · {m.tag}</div>
                                    <h3 className="story-mile__title">{m.title[0]}<em>{m.title[1]}</em>{m.title[2]}</h3>
                                    <p className="story-mile__body">{m.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =================== SIX WAYS (sticky stacking cards) =================== */}
                <section className="ways-section bg-gm-ghost" id="waysSection">
                    <div className="ways-head max-w-7xl mx-auto px-6 lg:px-8">
                        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">What We Help You Do</span>
                        <h2 className="reveal ways-heading">Six Ways We <em>Create Value</em></h2>
                    </div>

                    <div className="ways-stack max-w-5xl mx-auto px-6 lg:px-8">
                        {ways.map((w, i) => (
                            <article className={`way-card-light${w.last ? " way-card-light--last" : ""}`} key={i}>
                                <div>
                                    <div className="way-card-light__num" aria-hidden="true">Way 0{i + 1}</div>
                                    <div
                                        className={`way-card-light__icon ${w.gradient}`}
                                        style={w.inlineBg ? { background: w.inlineBg } : undefined}
                                    >
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path d={w.icon} />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="way-card-light__title">{w.title[0]}<em>{w.title[1]}</em>{w.title[2] ?? ""}</h3>
                                    <p className="way-card-light__body">{w.body}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ========================= MISSION & VALUES ========================= */}
                <section className="py-20 lg:py-28 bg-white relative overflow-hidden" aria-label="Mission and values">
                    <div className="absolute inset-0 opacity-[0.03]">
                        <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
                            <circle cx="700" cy="200" r="200" stroke="#2A9D8F" strokeWidth="1" strokeDasharray="4 8" />
                            <circle cx="100" cy="100" r="150" stroke="#1A6FA0" strokeWidth="0.5" strokeDasharray="3 7" />
                        </svg>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">Our Values</span>
                            <h2 className="reveal values-heading" style={{ transitionDelay: "0.1s" }}>What We <em>Believe In</em></h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((v) => (
                                <div key={v.title} className="reveal bg-gm-ghost rounded-3xl p-8 border border-gm-teal/8" style={{ transitionDelay: v.delay }}>
                                    <h3 className="font-bold text-lg mb-3 text-gm-teal">{v.title}</h3>
                                    <p className="text-sm text-gm-muted leading-relaxed">{v.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============== DELIVERY PHILOSOPHY (pinned 4 steps) ============== */}
                <section className="phil-outer bg-gm-ghost" id="philSection">
                    <div className="phil-spacer">
                        <div className="phil-sticky">
                            <div className="phil-inner max-w-7xl mx-auto px-6 lg:px-8 text-center">
                                <div className="phil-head">
                                    <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">How We Work</span>
                                    <h2 className="phil-heading">Our Delivery <em>Philosophy</em></h2>
                                    <p className="phil-desc" ref={philDescRef}>
                                        Every engagement follows a rhythm we've refined across two decades — four stages that carry a project from first conversation to long-term stewardship.
                                    </p>
                                </div>

                                <div className="phil-track max-w-5xl mx-auto">
                                    <div className="phil-line-wrap">
                                        <div className="phil-line-bg" />
                                        <div className="phil-line-fill" />
                                        <div className="phil-circles">
                                            {philSteps.map((_, i) => (
                                                <div className="phil-circ" key={i}>0{i + 1}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="phil-cards">
                                        {philSteps.map((s) => (
                                            <div className="phil-cd" key={s.title}>
                                                <h3 className="phil-cd__title">{s.title}</h3>
                                                <p className="phil-cd__body">{s.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================== BY THE NUMBERS (odometer) ===================== */}
                <section className="numbers-section bg-white py-20 lg:py-28" id="numbersSection">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="mb-14">
                            <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">By the Numbers</span>
                            <h2 className="reveal numbers-heading">Two decades,<br /><em>counted carefully.</em></h2>
                        </div>
                        <div className="numbers-grid">
                            {stats.map((s) => (
                                <div className="num-stat" key={s.label}>
                                    <div className="num-stat__value">
                                        <Odometer target={s.target} ariaLabel={s.aria} />
                                        {s.suffix && <span className="num-stat__suffix" aria-hidden="true">{s.suffix}</span>}
                                    </div>
                                    <div className="num-stat__line" />
                                    <div className="num-stat__label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================== CAREERS ============================== */}
                <section className="careers-section bg-gm-ghost py-24 lg:py-32 text-center relative overflow-hidden" id="careersSection">
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px circle at 50% 50%, rgba(42,157,143,0.05), transparent 60%)" }} />
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">Careers</span>
                        <h2 className="reveal careers-title">We're <em>hiring.</em><br />Come build with us.</h2>
                        <p className="reveal careers-body">
                            If the values on this page sound like your kind of work, we'd like to hear from you. We hire slowly, onboard carefully, and keep people for a long time. Open roles across engineering, design, and research — in Indore, Bengaluru, and Amsterdam.
                        </p>
                        <div className="careers-magnet-wrap" ref={careersWrapRef}>
                            <Link to="/contact" className="careers-magnet-btn" ref={careersBtnRef}>See Open Roles →</Link>
                        </div>
                    </div>
                </section>

                {/* ================================ CTA ================================ */}
                <section className="page-cta" aria-label="Call to action">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
                        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">Let's Work Together</span>
                        <h2 className="reveal page-cta__title">Let's work<br /><em>together.</em></h2>
                        <p className="reveal page-cta__body">
                            Whether you're exploring a new product direction or modernizing an existing system — we'd like to hear about it.
                        </p>
                        <div className="page-magnet-wrap" ref={ctaWrapRef}>
                            <Link to="/contact" className="page-magnet-btn" ref={ctaBtnRef}>Start a Conversation →</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
