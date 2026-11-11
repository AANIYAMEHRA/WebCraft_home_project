import { faq as staticFaq } from '../../pages/servicesData.js';

export default function ServicesFaq({ faq = staticFaq }) {
  return (
    <section className="svc-faq" aria-label="Frequently asked questions">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="svc-faq__head">
          <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-5">
            {faq.tag}
          </span>
          <h2 className="svc-faq__title">
            {faq.title.before}
            <em>{faq.title.accent}</em>
            {faq.title.after}
          </h2>
        </div>

        <div className="svc-faq__list">
          {faq.items.map((item) => (
            <details key={item.q} className="svc-faq__item">
              <summary>
                <span className="svc-faq__q">{item.q}</span>
                <span className="svc-faq__toggle" aria-hidden="true">+</span>
              </summary>
              <div className="svc-faq__a">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}