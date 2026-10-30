import { useEffect, useRef } from 'react';
import { engage } from '../../pages/researchData.js';
import { gsap, ScrollTrigger } from './gsap.js';

function Column({ variant, column, marker, icon }) {
  const ref = useRef(null);

  useEffect(() => {
    const col = ref.current;
    const items = col.querySelectorAll('.engage-list li');
    const st = ScrollTrigger.create({
      trigger: col,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }),
    });
    return () => st.kill();
  }, []);

  return (
    <div className={`engage-col engage-col--${variant}`} ref={ref}>
      <div className="engage-col__header">
        <div className={`engage-col__marker engage-col__marker--${variant}`}>{marker}</div>
        <h3 className="engage-col__title">
          {column.title.before}
          <em>{column.title.accent}</em>
        </h3>
      </div>
      <ul className="engage-list">
        {column.items.map((item) => (
          <li key={item.title}>
            <span className="engage-list__icon">{icon}</span>
            <div className="engage-list__text">
              <strong>{item.title}</strong>
              {item.body}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Engage() {
  return (
    <section className="engage bg-white" id="engageSection">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="engage__head text-center mb-14">
          <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
            {engage.tag}
          </span>
          <h2 className="reveal engage-heading">
            {engage.heading.before}
            <em>{engage.heading.accent}</em>
            {engage.heading.after}
          </h2>
        </div>

        <div className="engage__grid">
          <Column variant="yes" column={engage.yes} marker="✓" icon="→" />
          <Column variant="no" column={engage.no} marker="✕" icon="—" />
        </div>
      </div>
    </section>
  );
}
