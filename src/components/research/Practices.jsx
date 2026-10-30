import { useEffect, useRef } from 'react';
import { practices, practicesIntro } from '../../pages/researchData.js';
import { gsap, ScrollTrigger } from './gsap.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const MARKET_DOTS = [
  { x: 130, y: 130, r: 18 }, { x: 230, y: 100, r: 26 }, { x: 300, y: 180, r: 14 },
  { x: 100, y: 230, r: 10 }, { x: 180, y: 200, r: 22 }, { x: 270, y: 260, r: 16 },
  { x: 330, y: 140, r: 12 }, { x: 150, y: 290, r: 8 }, { x: 220, y: 160, r: 14 },
];

function MarketVisual({ triggerRef }) {
  const dotsRef = useRef(null);
  useEffect(() => {
    const group = dotsRef.current;
    const trigger = triggerRef.current;
    if (!group || !trigger) return;
    const circles = MARKET_DOTS.map((d) => {
      const c = document.createElementNS(SVG_NS, 'circle');
      c.setAttribute('cx', d.x);
      c.setAttribute('cy', d.y);
      c.setAttribute('r', 0);
      c.setAttribute('class', 'market-dot');
      c.dataset.finalR = d.r;
      group.appendChild(c);
      return c;
    });
    const st = ScrollTrigger.create({
      trigger,
      start: 'top 70%',
      once: true,
      onEnter: () =>
        gsap.to(circles, { attr: (i, el) => ({ r: el.dataset.finalR }), duration: 0.9, ease: 'back.out(1.5)', stagger: { each: 0.09, from: 'random' } }),
    });
    return () => {
      st.kill();
      circles.forEach((c) => c.remove());
    };
  }, [triggerRef]);

  return (
    <svg viewBox="0 0 400 400" id="market-svg">
      <g id="market-grid">
        {[80, 160, 240, 320].map((x) => <line key={x} className="market-grid" x1={x} y1="50" x2={x} y2="350" />)}
        {[110, 180, 250, 320].map((y) => <line key={y} className="market-grid" x1="50" y1={y} x2="370" y2={y} />)}
      </g>
      <line className="market-axis" x1="50" y1="350" x2="370" y2="350" />
      <line className="market-axis" x1="50" y1="50" x2="50" y2="350" />
      <text className="market-axis-label" x="210" y="385" textAnchor="middle">Market share →</text>
      <text className="market-axis-label" x="20" y="200" textAnchor="middle" transform="rotate(-90 20 200)">Growth →</text>
      <g id="market-dots" ref={dotsRef} />
    </svg>
  );
}

const PRODUCT_NODES = [
  { x: 30, y: 80, label: 'Discover', tx: 80, ty: 110 },
  { x: 160, y: 80, label: 'Explore', tx: 210, ty: 110 },
  { x: 290, y: 80, label: 'Compare', tx: 340, ty: 110 },
  { x: 160, y: 200, label: 'Decide', tx: 210, ty: 230 },
  { x: 160, y: 320, label: 'Commit', tx: 210, ty: 350 },
];
const PRODUCT_LINKS = ['M 130 105 L 160 105', 'M 260 105 L 290 105', 'M 340 130 Q 340 165, 260 225', 'M 210 250 L 210 320'];

function ProductVisual({ triggerRef }) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = svgRef.current;
    const trigger = triggerRef.current;
    if (!svg || !trigger) return;
    const nodes = svg.querySelectorAll('.product-node');
    const labels = svg.querySelectorAll('.product-node-label');
    const paths = svg.querySelectorAll('.product-link');
    gsap.set(nodes, { scale: 0, transformOrigin: 'center', transformBox: 'fill-box' });
    gsap.set(labels, { opacity: 0 });
    const st = ScrollTrigger.create({
      trigger,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        nodes.forEach((node, i) => {
          tl.to(node, { scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, i * 0.3)
            .to(labels[i], { opacity: 1, duration: 0.3 }, '-=0.25');
          if (i < paths.length) tl.to(paths[i], { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1');
        });
      },
    });
    return () => st.kill();
  }, [triggerRef]);

  return (
    <svg viewBox="0 0 400 400" id="product-svg" ref={svgRef}>
      {PRODUCT_NODES.map((n) => (
        <g key={n.label}>
          <rect className="product-node" x={n.x} y={n.y} width="100" height="50" rx="8" />
          <text className="product-node-label" x={n.tx} y={n.ty}>{n.label}</text>
        </g>
      ))}
      {PRODUCT_LINKS.map((d) => <path key={d} className="product-link" d={d} />)}
    </svg>
  );
}

function UserVisual({ quotes, triggerRef }) {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const nodes = trigger.querySelectorAll('.user-quote');
    let loop = null;
    const runLoop = () => {
      gsap.set(nodes, { opacity: 0, y: 10 });
      loop = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });
      nodes.forEach((q, i) => loop.to(q, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, i * 0.85));
      loop.to({}, { duration: 2.5 });
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!loop) runLoop();
          else loop.play();
        } else if (loop) loop.pause();
      },
      { threshold: 0.3 }
    );
    io.observe(trigger);
    return () => {
      io.disconnect();
      if (loop) loop.kill();
    };
  }, [triggerRef, quotes]);

  return quotes.map((q, i) => (
    <div key={q.source} className={`user-quote ${i % 2 === 0 ? 'user-quote--a' : 'user-quote--b'}`} data-idx={i + 1}>
      "{q.text}"
      <span className="user-quote__source">{q.source}</span>
    </div>
  ));
}

const STRATEGIC_CELLS = [
  { x: 60, y: 60 }, { x: 200, y: 60 }, { x: 60, y: 200 }, { x: 200, y: 200 },
];
const STRATEGIC_LABELS = [
  { text: 'BUILD', x: 130, y: 135 }, { text: 'PARTNER', x: 270, y: 135 },
  { text: 'IGNORE', x: 130, y: 275 }, { text: 'BUY', x: 270, y: 275 },
];

function StrategicVisual({ triggerRef }) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = svgRef.current;
    const trigger = triggerRef.current;
    if (!svg || !trigger) return;
    const cells = svg.querySelectorAll('.strategic-cell');
    const labels = svg.querySelectorAll('.strategic-cell-label');
    const st = ScrollTrigger.create({
      trigger,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.timeline()
          .to(cells, { opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' })
          .to(labels, { opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '-=0.4');
      },
    });
    return () => st.kill();
  }, [triggerRef]);

  return (
    <svg viewBox="0 0 400 400" id="strategic-svg" ref={svgRef}>
      {STRATEGIC_CELLS.map((c) => <rect key={`${c.x}-${c.y}`} className="strategic-cell" x={c.x} y={c.y} width="140" height="140" />)}
      {STRATEGIC_LABELS.map((l) => <text key={l.text} className="strategic-cell-label" x={l.x} y={l.y}>{l.text}</text>)}
      <text className="strategic-axis-label" x="200" y="370">MARKET READINESS →</text>
      <text className="strategic-axis-label" x="35" y="200" transform="rotate(-90 35 200)">STRATEGIC VALUE →</text>
    </svg>
  );
}

function Practice({ practice }) {
  const articleRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const article = articleRef.current;
    const feats = article.querySelectorAll('.practice__feature');
    const st = ScrollTrigger.create({
      trigger: article,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .to(tagRef.current, { opacity: 1, y: 0, duration: 0.6 })
          .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
          .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
          .to(feats, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, '-=0.5');
      },
    });
    return () => st.kill();
  }, []);

  const visual = {
    market: <MarketVisual triggerRef={articleRef} />,
    product: <ProductVisual triggerRef={articleRef} />,
    user: <UserVisual quotes={practice.quotes ?? []} triggerRef={articleRef} />,
    strategic: <StrategicVisual triggerRef={articleRef} />,
  }[practice.visual];

  return (
    <article className="practice" id={practice.id} ref={articleRef}>
      <div className="practice__inner max-w-7xl mx-auto px-6 lg:px-8">
        <div>
          <div className="practice__tag" ref={tagRef}>{practice.tag}</div>
          <h3 className="practice__title" ref={titleRef}>
            {practice.title} <em>{practice.accent}</em>
          </h3>
          <p className="practice__body" ref={bodyRef}>{practice.body}</p>
          <div className="practice__features">
            {practice.features.map((f) => <span key={f} className="practice__feature">{f}</span>)}
          </div>
        </div>
        <div className={`practice__visual ${practice.visual}-visual`} id={practice.visual === 'user' ? 'user-demo' : undefined}>
          {visual}
        </div>
      </div>
    </article>
  );
}

export default function Practices() {
  return (
    <section className="practices-section bg-white" id="practicesSection">
      <div className="practices-head max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
          {practicesIntro.tag}
        </span>
        <h2 className="reveal practices-heading">
          {practicesIntro.heading.before}
          <em>{practicesIntro.heading.accent}</em>
          <br />
          {practicesIntro.heading.after}
        </h2>
        <p className="reveal practices-body">{practicesIntro.body}</p>
      </div>

      {practices.map((p) => <Practice key={p.id} practice={p} />)}
    </section>
  );
}
