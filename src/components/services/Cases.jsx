import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../research/gsap.js';
import { cases as staticCases } from '../../pages/servicesData.js';

// Desktop: the section pins and the case panels scroll sideways. Mobile: a normal stacked list.
export default function Cases({ cases = staticCases }) {
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track || !window.matchMedia('(min-width: 900px)').matches) return;

    const getDistance = () => track.scrollWidth - window.innerWidth + 64;

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="cases" aria-label="Selected work">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 cases__head">
        <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-5">
          {cases.tag}
        </span>
        <h2 className="cases__title">
          {cases.title.before}
          <em>{cases.title.accent}</em>
          {cases.title.after}
        </h2>
      </div>

      <div className="cases__pin" ref={pinRef}>
        <div className="cases__track" ref={trackRef}>
          {cases.items.map((item) => (
            <article key={item.num} className="case-panel">
              <span className="case-panel__num">{item.num}</span>
              <span className="case-panel__tag">{item.tag}</span>
              <h3 className="case-panel__title">
                {item.title.before}
                <em>{item.title.accent}</em>
                {item.title.after}
              </h3>
              <p className="case-panel__body">{item.body}</p>
              <div className="case-panel__stat">
                <span>{item.stat.value}</span>
                <label>{item.stat.label}</label>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}