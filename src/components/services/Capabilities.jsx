import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../research/gsap.js';
import { capabilities as staticCapabilities, capabilitiesIntro as staticIntro } from '../../pages/servicesData.js';

// Six capabilities: a sticky index on the left follows the item being read on the right.
export default function Capabilities({ capabilities = staticCapabilities, capabilitiesIntro = staticIntro }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);
  const total = capabilities.length;

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);

    const triggers = items.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      })
    );

    const fades = items.map((el) =>
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      })
    );

    return () => {
      triggers.forEach((t) => t.kill());
      fades.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  const current = capabilities[active];

  return (
    <section className="caps-section" aria-label="Six capabilities">
      <div className="caps-head">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-5">
            {capabilitiesIntro.tag}
          </span>
          <h2 className="caps-title">
            {capabilitiesIntro.title.before}
            <em>{capabilitiesIntro.title.accent}</em>
            {capabilitiesIntro.title.after}
          </h2>
          <p className="caps-sub">{capabilitiesIntro.body}</p>
        </div>
      </div>

      <div className="caps-wrap max-w-7xl mx-auto px-6 lg:px-8">
        <aside className="caps-index">
          <div className="caps-index__inner">
            <span className="caps-index__label">Now reading</span>
            <span className="caps-index__num">{current.num}</span>
            <h3 className="caps-index__name">
              <em>{current.name}</em>
            </h3>
            <div className="caps-index__bar">
              <span style={{ width: `${((active + 1) / total) * 100}%` }} />
            </div>
          </div>
        </aside>

        <div className="caps-list">
          {capabilities.map((cap, i) => (
            <article
              key={cap.num}
              className="caps-item"
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            >
              <div className="caps-item__meta" aria-hidden="true">
                <span>{cap.num} / {String(total).padStart(2, '0')}</span>
              </div>
              <h3 className="caps-item__title">
                {cap.title.before}
                <em>{cap.title.accent}</em>
              </h3>
              <p className="caps-item__pitch">{cap.pitch}</p>
              <div className="caps-item__grid">
                {cap.subs.map((sub) => (
                  <div key={sub.title} className="caps-sub">
                    <span className="caps-sub__arrow">→</span>
                    <h4>{sub.title}</h4>
                    <p>{sub.body}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}