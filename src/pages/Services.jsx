import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------- small helpers ---------- */
const Arrow = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Chip = ({ cls, num, title, color, children }) => (
  <div className={`svc-chip ${cls}`}>
    <svg className={`svc-chip__icon ${color}`} width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
    <div className="svc-chip__text">
      <span>{num}</span>
      <strong>{title}</strong>
    </div>
  </div>
);

/* ---------- data ---------- */
const CAPS = [
  { num: "01", name: "Strategy & Research", title: ["Strategy &", "Research"],
    pitch: "We start before the code. Market sizing, user interviews, product discovery, competitive teardown - so you build the right thing, not just any thing.",
    subs: [
      ["Product discovery sprints", "1-to-3 week engagements that replace six months of internal debate with tested prototypes."],
      ["Market & competitor analysis", "Primary research with buyers and users - not a deck of TAM charts pulled from Google."],
      ["Jobs-to-be-done interviews", "Structured qualitative research that maps why your users switch, stay, or leave."],
      ["Roadmap & prioritisation", "A 12-month plan your team can actually run - sequenced by risk, revenue and readiness."],
    ] },
  { num: "02", name: "AI & Automation", title: ["AI &", "Automation"],
    pitch: "We build AI into products and internal operations - assistants, copilots, classifiers, agents - with evaluation and guardrails from day one.",
    subs: [
      ["LLM applications & copilots", "Domain-tuned assistants with retrieval, tool use, and human-in-the-loop checkpoints."],
      ["Predictive ML models", "Forecasting, scoring, and classification pipelines - trained, monitored, retrained."],
      ["Process automation", "Workflow and document automation that removes busywork without replacing judgment."],
      ["Evaluation & safety", "Eval harnesses, red-teaming, and observability so you can ship AI with confidence."],
    ] },
  { num: "03", name: "Engineering", title: ["Engineering &", "Product"],
    pitch: "Full-stack product teams - design, frontend, backend, data, QA - working in short cycles with demos every two weeks.",
    subs: [
      ["Web applications", "React, Next.js, TypeScript - accessible, performant, measured."],
      ["Mobile (iOS + Android)", "Native where it matters, React Native where it doesn't."],
      ["API & backend services", "Typed, tested, documented - Node, Go, Python, Rust."],
      ["UX & product design", "Wireframes, prototypes, design systems - shipped, not just presented."],
    ] },
  { num: "04", name: "Cloud & Platform", title: ["Cloud &", "Platform"],
    pitch: "Production platforms on AWS, Azure and GCP - built with infrastructure-as-code, observability, and cost in mind from the first commit.",
    subs: [
      ["Cloud migrations", "Lift-shift, replatform, or refactor - staged with rollback at every milestone."],
      ["Kubernetes & containers", "Hardened clusters, GitOps delivery, and sensible autoscaling."],
      ["Data platforms", "Warehouses, lakes, streaming - Snowflake, BigQuery, Kafka, dbt."],
      ["Security & compliance", "SOC 2, ISO 27001, HIPAA - built in, not bolted on."],
    ] },
  { num: "05", name: "Modernization", title: ["Legacy", "Modernization"],
    pitch: "We untangle systems that have grown past their original design - monoliths, Oracle Forms, VB6, stored-proc spaghetti - without stopping the business.",
    subs: [
      ["Strangler-fig rewrites", "Incremental replacement; the old system keeps running until the new one earns trust."],
      ["Data migration", "Schema mapping, backfills, and dual-writes validated against reconciliation checks."],
      ["Integration layers", "APIs and event buses that let old and new systems coexist for as long as needed."],
      ["Risk-reviewed cutovers", "Rollback-capable releases with production shadowing before every go-live."],
    ] },
  { num: "06", name: "Sustain & Support", title: ["Sustain &", "Support"],
    pitch: "Software doesn't end at launch. We keep products healthy - monitoring, on-call, continuous improvement - so small issues stay small.",
    subs: [
      ["24x7 monitoring & on-call", "Paging with clear runbooks, and humans who already know the system."],
      ["Managed maintenance", "Dependency updates, security patching, and performance tuning on a monthly cadence."],
      ["Continuous improvement", "Small features, experiments, and polish shipped every sprint - not once a year."],
      ["SLA-backed support", "Tiered response times aligned to what the system actually costs you when it's down."],
    ] },
];

const STACK = ["Python", "TypeScript", "React", "Next.js", "Node.js", "Go", "Rust", "PostgreSQL", "Kafka",
  "Redis", "AWS", "Azure", "GCP", "Kubernetes", "Terraform", "PyTorch", "LangChain", "Figma"];

const MODELS = [
  { k: "01", t: "Project-based", l: "Fixed scope. Fixed outcome. Ideal when you already know what you want built.",
    items: ["Milestone-based billing with a defined end date", "Scoped statement of work signed before start",
      "Hand-off documentation and training at close", "Typical range: 8-16 weeks, 3-7 people"] },
  { k: "02", t: "Team extension", l: "Embedded engineers, designers and PMs who work in your workflow, not ours.",
    items: ["Dedicated people - not a rotating bench", "Monthly billing, 90-day minimum commitment",
      "Daily stand-up in your tooling (Slack, Linear, Jira)", "Typical range: 2-6 people, 6-18 months"] },
  { k: "03", t: "Retainer", l: "Always-on support, maintenance and continuous improvement for live systems.",
    items: ["Agreed SLA on response and resolution times", "Monthly hours bucket - carries forward, not wasted",
      "Named technical lead who knows your codebase", "Typical range: 40-160 hours / month"] },
];

const CASES = [
  { n: "01", tag: "Healthcare · AI", t: ["Clinical ", "co-pilot", "."],
    b: "Built a clinician-facing assistant that drafts visit notes from ambient audio. Doctors spend 42% less time on documentation and see 2 more patients per day.",
    s: "-42%", l: "time on notes" },
  { n: "02", tag: "Commerce · Platform", t: ["Bilingual B2B ", "commerce", "."],
    b: "Rebuilt a wholesale marketplace across English and Hindi with unified catalogue, pricing and fulfilment. 3× GMV in 9 months, with 60% mobile orders.",
    s: "3×", l: "GMV in 9 months" },
  { n: "03", tag: "Finance · Modernisation", t: ["Risk systems, ", "rebuilt", "."],
    b: "Replaced a fragile legacy risk engine with an event-driven Go service. Settlement latency dropped from 4.5s to 180ms - and regulators stopped flagging exceptions.",
    s: "180ms", l: "settlement latency" },
  { n: "04", tag: "Industrial · IoT", t: ["Factory ", "unfrozen", "."],
    b: "Wired a plant's disconnected PLCs into a single real-time dashboard with predictive maintenance. Unplanned downtime down 63%, OEE up 14 points.",
    s: "-63%", l: "unplanned downtime" },
];

const FAQ = [
  ["How do you price engagements?", "We price based on the shape of the work. Fixed-scope projects get a milestone-based fee with a defined end date. Team-extension engagements bill monthly on a per-role rate, with a 90-day minimum. Retainers bill monthly for an hours bucket. We send a written estimate before any work begins."],
  ["Do you sign NDAs and DPAs?", "Yes. We sign NDAs before any discovery conversation that involves specifics. For regulated industries - healthcare, financial services, public sector - we also sign data-processing addenda, BAAs (HIPAA), and can work inside your security review process."],
  ["Can you work alongside our existing team?", "Yes - most of our engagements look like that. Our engineers work inside your GitHub, your Slack, your standups. We're good at being the second team, not the only team. We align on code review standards, branching model and release cadence in week one."],
  ["How fast can you start?", "For a typical team-extension engagement, 10-14 days from signed SOW to people on your standup. Fixed-scope projects usually take 2-3 weeks because discovery runs first. Urgent retainer coverage can start within 72 hours for incidents on live systems."],
  ["What if our priorities shift mid-engagement?", "That's the normal case, not the exception. Team-extension engagements let you re-point the team sprint by sprint. Fixed-scope projects have a written change-order process, but we'd rather catch the shift in a weekly check-in and adapt than push a change order after the fact."],
  ["Where is your team located?", "Our engineering, design and research teams are based in Indore, India. We work with clients across the US, EU, UK, UAE and APAC. We overlap with US Eastern time in the morning and with EU / APAC through most of the day, and we run written-first so timezone is rarely the bottleneck."],
];

/* ---------- page ---------- */
export default function Services() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // sticky index + item reveal
      const items = gsap.utils.toArray("[data-cap]");
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el, start: "top 45%", end: "bottom 45%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
        gsap.from(el, {
          opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });

      // horizontal case strip (desktop only)
      const pin = root.current.querySelector("[data-cases]");
      const track = root.current.querySelector("[data-cases-track]");
      mm.add("(min-width: 900px)", () => {
        const dist = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -dist(), ease: "none",
          scrollTrigger: {
            trigger: pin, start: "top top", end: () => `+=${dist()}`,
            pin: true, scrub: 0.6, invalidateOnRefresh: true,
          },
        });
      });

      // marquee reacts to scroll velocity
      const row = root.current.querySelector(".svc-mq__row");
      ScrollTrigger.create({
        trigger: ".svc-mq", start: "top bottom", end: "bottom top",
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 800, 4);
          row.style.animationDuration = `${Math.max(8, 45 - v * 6)}s`;
          row.style.animationDirection = self.direction === -1 ? "reverse" : "normal";
        },
      });
    }, root);

    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(t); mm.revert(); ctx.revert(); };
  }, []);

  const glow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const magnet = (e) => {
    const btn = e.currentTarget.firstChild;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
  };
  const unmagnet = (e) => { e.currentTarget.firstChild.style.transform = ""; };

  const cap = CAPS[active];

  return (
    <main className="svc" ref={root}>
      {/* ================= HERO ================= */}
      <section className="svc-hero">
        <div className="svc-hero__inner">
          <div className="svc-hero__copy">
            <span className="svc-tag svc-fade" style={{ animationDelay: "0s" }}>Engineering &amp; Digital Services</span>
            <h1 className="svc-fade" style={{ animationDelay: ".1s" }}>
              Build It Right.<br />
              <span className="svc-grad">Scale It Smart.</span>
            </h1>
            <p className="svc-fade" style={{ animationDelay: ".2s" }}>
              From custom product development and cloud enablement to UX design and legacy modernization -
              Webcraft provides the engineering depth to turn strategies into working software.
            </p>
            <div className="svc-fade" style={{ animationDelay: ".3s" }}>
              <a href="/contact" className="svc-btn">Start a Conversation <Arrow /></a>
            </div>
          </div>

          <div className="svc-hero__visual svc-fade" style={{ animationDelay: ".3s" }}>
            <div className="svc-stage">
              <svg className="svc-dashed" viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(42,157,143,0.32)" strokeWidth="1" strokeDasharray="3 8" />
              </svg>

              <div className="svc-ring svc-ring--1">
                <div className="svc-ring svc-ring--2">
                  <div className="svc-ring svc-ring--3 svc-cube">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                </div>
              </div>

              <svg className="svc-arc" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <linearGradient id="svcArcGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6EDAA0" />
                    <stop offset="100%" stopColor="#2A9D8F" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="56" fill="none" stroke="url(#svcArcGrad)" strokeWidth="3"
                  strokeLinecap="round" strokeDasharray="60 320" />
              </svg>

              <div className="svc-orbit" aria-hidden="true">
                <span className="svc-dot svc-dot--a" />
                <span className="svc-dot svc-dot--b" />
                <span className="svc-dot svc-dot--c" />
              </div>

              <Chip cls="svc-chip--1" num="01" title="Strategy" color="c-teal">
                <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </Chip>
              <Chip cls="svc-chip--2" num="02" title="AI & Auto" color="c-blue">
                <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </Chip>
              <Chip cls="svc-chip--3" num="03" title="Engineering" color="c-green">
                <path d="M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M14.25 4.5l-4.5 15" />
              </Chip>
              <Chip cls="svc-chip--4" num="04" title="Cloud & Ops" color="c-teal">
                <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </Chip>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SIX CAPABILITIES ================= */}
      <section className="svc-caps">
        <div className="svc-wrap svc-caps__head">
          <span className="svc-tag">Six Capabilities</span>
          <h2 className="svc-h2">Everything you need to <em>ship software that matters</em>.</h2>
          <p className="svc-lede">From first strategy deck to post-launch iteration - one team, six capabilities, one standard of craft.</p>
        </div>

        <div className="svc-wrap svc-caps__grid">
          <aside className="svc-index">
            <div className="svc-index__inner">
              <span className="svc-index__label">Now reading</span>
              <span className="svc-index__num">{cap.num}</span>
              <h3 className="svc-index__name" key={cap.num}><em>{cap.name}</em></h3>
              <div className="svc-index__bar"><span style={{ width: `${((active + 1) / CAPS.length) * 100}%` }} /></div>
            </div>
          </aside>

          <div className="svc-caps__list">
            {CAPS.map((c) => (
              <article className="svc-item" data-cap key={c.num}>
                <div className="svc-item__meta">{c.num} / 06</div>
                <h3 className="svc-item__title">{c.title[0]} <em>{c.title[1]}</em></h3>
                <p className="svc-item__pitch">{c.pitch}</p>
                <div className="svc-item__grid">
                  {c.subs.map(([h, p]) => (
                    <div className="svc-sub" key={h}>
                      <span className="svc-sub__arrow">→</span>
                      <h4>{h}</h4>
                      <p>{p}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECH MARQUEE ================= */}
      <section className="svc-mq">
        <div className="svc-wrap svc-mq__head">
          <span className="svc-tag">The Stack</span>
          <h2 className="svc-h2">Fluent in the tools that ship in <em>production</em>.</h2>
        </div>
        <div className="svc-mq__track">
          <div className="svc-mq__row">
            {[...STACK, ...STACK].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
      </section>

      {/* ================= ENGAGEMENT MODELS ================= */}
      <section className="svc-models">
        <div className="svc-wrap">
          <div className="svc-models__head">
            <span className="svc-tag">Engagement Models</span>
            <h2 className="svc-h2">Three shapes, one standard of <em>accountability</em>.</h2>
          </div>
          <div className="svc-models__grid">
            {MODELS.map((m) => (
              <article className="svc-model" key={m.k} onMouseMove={glow}>
                <span className="svc-model__kicker">{m.k}</span>
                <h3 className="svc-model__title">{m.t}</h3>
                <p className="svc-model__lede">{m.l}</p>
                <div className="svc-model__reveal">
                  <ul>{m.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CASE STRIP ================= */}
      <section className="svc-cases">
        <div className="svc-wrap svc-cases__head">
          <span className="svc-tag">Selected Work</span>
          <h2 className="svc-h2">A few things we're <em>proud of</em>.</h2>
        </div>
        <div className="svc-cases__pin" data-cases>
          <div className="svc-cases__track" data-cases-track>
            {CASES.map((c) => (
              <article className="svc-case" key={c.n}>
                <div>
                  <span className="svc-case__num">{c.n}</span><br />
                  <span className="svc-case__tag">{c.tag}</span>
                  <h3 className="svc-case__title">{c.t[0]}<em>{c.t[1]}</em>{c.t[2]}</h3>
                  <p className="svc-case__body">{c.b}</p>
                </div>
                <div className="svc-case__stat"><span>{c.s}</span><label>{c.l}</label></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="svc-faq">
        <div className="svc-wrap">
          <div className="svc-faq__head">
            <span className="svc-tag">FAQ</span>
            <h2 className="svc-h2">Questions we <em>usually get</em>.</h2>
          </div>
          <div className="svc-faq__list">
            {FAQ.map(([q, a]) => (
              <details className="svc-faq__item" key={q}>
                <summary>
                  <span className="svc-faq__q">{q}</span>
                  <span className="svc-faq__toggle" aria-hidden="true" />
                </summary>
                <div className="svc-faq__a">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="svc-cta">
        <div className="svc-wrap svc-cta__inner">
          <span className="svc-tag">Next Step</span>
          <h2 className="svc-cta__title">Tell us what you're<br /><em>trying to build.</em></h2>
          <p className="svc-cta__body">One short note. One reply within a business day. No sales dance.</p>
          <div className="svc-magnet" onMouseMove={magnet} onMouseLeave={unmagnet}>
            <a href="/contact" className="svc-magnet__btn">Start a conversation <span aria-hidden="true">→</span></a>
          </div>
          <p className="svc-cta__alt">
            or email <a href="mailto:admin@webcraft.co.in">admin@webcraft.co.in</a> directly.
          </p>
        </div>
      </section>
    </main>
  );
}