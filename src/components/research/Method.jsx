import { useEffect, useRef, useState } from 'react';
import { method } from '../../pages/researchData.js';
import { gsap, ScrollTrigger } from './gsap.js';

const MOBILE_BREAKPOINT = 768;

export default function Method() {
  const spacerRef = useRef(null);
  const lineRef = useRef(null);
  // -1 = every stage shown (mobile stacked layout); 0-4 = the pinned active stage.
  const [step, setStep] = useState(0);

  useEffect(() => {
    const spacer = spacerRef.current;
    if (!spacer) return;
    const ctx = gsap.context(() => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setStep(-1);
        return;
      }
      gsap.to(lineRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            const next = p < 0.22 ? 0 : p < 0.44 ? 1 : p < 0.66 ? 2 : p < 0.85 ? 3 : 4;
            setStep((prev) => (prev === next ? prev : next));
          },
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const isActive = (i) => step === -1 || step === i;

  return (
    <section className="method-outer" id="methodSection">
      <div className="method-spacer" ref={spacerRef}>
        <div className="method-sticky">
          <div className="method-inner max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="method__head">
              <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
                {method.tag}
              </span>
              <h2 className="method-heading">
                {method.heading.before}
                <em>{method.heading.accent}</em>
                {method.heading.after}
              </h2>
              <p className="method__desc" id="method-desc" aria-live="polite">
                {step >= 0 ? method.stages[step].long : method.intro}
              </p>
            </div>

            <div className="method__track max-w-5xl mx-auto">
              <div className="method__line-wrap">
                <div className="method__line-bg" />
                <div className="method__line-fill" id="method-line" ref={lineRef} />
                <div className="method__circles">
                  {method.stages.map((s, i) => (
                    <div key={s.title} className={`meth-circle ${isActive(i) ? 'active' : ''}`}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  ))}
                </div>
              </div>
              <div className="method__cards">
                {method.stages.map((s, i) => (
                  <div key={s.title} className={`meth-card ${isActive(i) ? 'active' : ''}`}>
                    <h3 className="meth-card__title">{s.title}</h3>
                    <p className="meth-card__body">{s.short}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
