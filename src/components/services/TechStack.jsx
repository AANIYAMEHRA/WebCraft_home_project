import { techStack as staticTechStack } from '../../pages/servicesData.js';

export default function TechStack({ techStack = staticTechStack }) {
  // Items are rendered twice so the CSS marquee loops without a gap.
  const row = (
    <div className="techmq__row">
      {techStack.items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );

  return (
    <section className="techmq" aria-label="Tech stack">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 techmq__head">
        <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-5">
          {techStack.tag}
        </span>
        <h2 className="techmq__title">
          {techStack.title.before}
          <em>{techStack.title.accent}</em>
          {techStack.title.after}
        </h2>
      </div>
      <div className="techmq__track">
        {row}
        {row}
      </div>
    </section>
  );
}