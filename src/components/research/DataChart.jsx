import { useEffect, useRef, useState } from 'react';
import { chart } from '../../pages/researchData.js';

const STAGGER_MS = 120;
const COUNT_MS = 1400;

// One bar + animated count-up. Starts only once the chart is in view.
function ChartRow({ label, value, index, active }) {
  const [filled, setFilled] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      setFilled(true);
      start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / COUNT_MS);
        const eased = 1 - Math.pow(1 - t, 4);
        setCount(Math.round(value * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, index * STAGGER_MS);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, index, value]);

  return (
    <div className="chart-row" data-value={value}>
      <div className="chart-row__label">{label}</div>
      <div className="chart-row__bar-wrap">
        <div className="chart-row__bar" style={{ width: filled ? `${value}%` : '0%' }} />
      </div>
      <div className="chart-row__value">{count}%</div>
    </div>
  );
}

export default function DataChart() {
  const chartRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -25% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="dataviz bg-gm-ghost" id="datavizSection">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="dataviz__head mb-14">
          <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-7">
            {chart.tag}
          </span>
          <h2 className="reveal dataviz-heading">
            {chart.heading.before}
            <em>{chart.heading.accent}</em>
            {chart.heading.after}
          </h2>
          <p className="reveal dataviz-body">{chart.body}</p>
        </div>

        <div className="chart" id="chart" ref={chartRef} aria-label={chart.title}>
          <div className="chart__meta">
            <span className="title">{chart.title}</span>
            <span>{chart.sampleSize}</span>
          </div>

          <div className="chart__rows" id="chart-rows">
            {chart.rows.map((row, i) => (
              <ChartRow key={row.label} label={row.label} value={row.value} index={i} active={active} />
            ))}
          </div>

          <div className="chart__note">
            <span>{chart.source}</span>
            <span>{chart.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
