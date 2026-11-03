import { deliverables, deliverablesIntro } from '../../pages/researchData.js';

export default function Deliverables() {
  return (
    <section className="deliverables bg-white" id="deliverablesSection">
      <div className="deliv-head max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
          {deliverablesIntro.tag}
        </span>
        <h2 className="reveal deliv-heading">
          {deliverablesIntro.heading.before} <em>{deliverablesIntro.heading.accent}</em>
        </h2>
        <p className="reveal deliv-body">{deliverablesIntro.body}</p>
      </div>

      <div className="deliv-stack max-w-5xl mx-auto px-6 lg:px-8">
        {deliverables.map((d) => (
          <article key={d.number} className={`deliv-card ${d.last ? 'deliv-card--last' : ''}`}>
            <div>
              <div className="deliv-card__num" aria-hidden="true">{d.number}</div>
              <h3 className="deliv-card__title">
                {d.title} <em>{d.accent}</em>
              </h3>
              <p className="deliv-card__body">{d.body}</p>
            </div>
            <div className="deliv-card__specs">
              {d.specs.map(([label, value]) => (
                <div key={label}>
                  {label}
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
