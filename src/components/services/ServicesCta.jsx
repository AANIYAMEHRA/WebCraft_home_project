import { useRef } from 'react';
import { servicesCta as staticCta } from '../../pages/servicesData.js';

// Magnetic button: the button drifts toward the cursor (disabled for reduced-motion users).
export default function ServicesCta({ servicesCta = staticCta }) {
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function handleMove(event) {
    if (reduceMotion) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
  }

  function handleLeave() {
    if (btnRef.current) btnRef.current.style.transform = '';
  }

  return (
    <section className="page-cta" aria-label="Next step">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
          {servicesCta.tag}
        </span>
        <h2 className="reveal page-cta__title">
          {servicesCta.title.before}
          <br />
          <em>{servicesCta.title.accent}</em>
        </h2>
        <p className="reveal page-cta__body">{servicesCta.body}</p>

        <div className="page-magnet-wrap" ref={wrapRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
          <a href={servicesCta.button.href} className="page-magnet-btn" ref={btnRef}>
            {servicesCta.button.label} <span aria-hidden="true">→</span>
          </a>
        </div>

        <p className="reveal page-cta__alt mt-2 text-sm text-gm-muted">
          or email{' '}
          <a href={`mailto:${servicesCta.email}`} className="underline decoration-gm-teal/30 hover:decoration-gm-teal hover:text-gm-teal transition">
            {servicesCta.email}
          </a>{' '}
          directly.
        </p>
      </div>
    </section>
  );
}