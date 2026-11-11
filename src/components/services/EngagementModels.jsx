import { engagementModels as staticModels } from '../../pages/servicesData.js';

// Cards show a cursor-following glow (the original --mx / --my effect).
function handleMove(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

export default function EngagementModels({ engagementModels = staticModels }) {
  const { tag, title, models } = engagementModels;

  return (
    <section className="models" aria-label="Engagement models">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="models__head">
          <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-5">
            {tag}
          </span>
          <h2 className="models__title">
            {title.before}
            <em>{title.accent}</em>
            {title.after}
          </h2>
        </div>

        <div className="models__grid">
          {models.map((model) => (
            <article key={model.kicker} className="model-card" onMouseMove={handleMove}>
              <span className="model-card__kicker">{model.kicker}</span>
              <h3 className="model-card__title">{model.title}</h3>
              <p className="model-card__lede">{model.lede}</p>
              <div className="model-card__reveal">
                <ul>
                  {model.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}