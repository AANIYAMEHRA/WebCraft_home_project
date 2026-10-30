import { hero } from '../../pages/researchData.js';

const chipTone = {
  teal: { text: 'text-gm-teal', shadow: 'shadow-gm-teal/10', border: 'border-gm-teal/10' },
  blue: { text: 'text-gm-blue', shadow: 'shadow-gm-blue/10', border: 'border-gm-blue/10' },
  green: { text: 'text-gm-green', shadow: 'shadow-gm-green/10', border: 'border-gm-green/10' },
};

// Position + animation delay for each floating chip, matching the original layout.
const chipLayout = [
  { pos: 'top-[5%] left-[8%]', delay: undefined, duration: undefined, icon: 'user' },
  { pos: 'top-[5%] right-[5%]', delay: '1s', duration: '7s', icon: 'market' },
  { pos: 'bottom-[8%] left-[3%]', delay: '2s', duration: '8s', icon: 'report' },
  { pos: 'bottom-[8%] right-[3%]', delay: '4s', duration: '9s', icon: 'insight' },
];

function ChipIcon({ name, className }) {
  const common = { className, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.5, 'aria-hidden': true };
  switch (name) {
    case 'user':
      return (
        <svg {...common}>
          <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      );
    case 'market':
      return (
        <svg {...common}>
          <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      );
    case 'report':
      return (
        <svg {...common}>
          <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    default:
      return (
        <svg {...common} strokeWidth={1.5}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5.5" />
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden" aria-label="Page hero">
      <div className="absolute inset-0 hero-mesh" />
      <div className="orb w-[500px] h-[500px] bg-gm-teal/10 top-[-100px] right-[-100px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-3">
            <span className="reveal section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-6">
              {hero.tag}
            </span>
            <h1
              className="reveal text-5xl lg:text-6xl font-extrabold text-gm-deep leading-[1.08] tracking-tight"
              style={{ transitionDelay: '0.1s' }}
            >
              {hero.headline[0]}
              <br />
              <span className="bg-gradient-to-r from-gm-teal via-gm-blue to-gm-green bg-clip-text text-transparent">
                {hero.headline[1]}
              </span>
            </h1>
            <p className="reveal text-lg text-gm-muted mt-6 max-w-2xl leading-relaxed" style={{ transitionDelay: '0.2s' }}>
              {hero.body}
            </p>
            <div className="reveal flex flex-wrap gap-4 mt-10" style={{ transitionDelay: '0.3s' }}>
              <a
                href={hero.cta.href}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gm-teal to-gm-green text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-gm-teal/20 transition-all"
              >
                {hero.cta.label}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Animated visual (desktop only, as in the original) */}
          <div className="reveal hidden lg:block lg:col-span-2 relative" style={{ transitionDelay: '0.3s' }}>
            <div className="relative w-full aspect-square max-w-[480px] mx-auto">
              <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gm-teal/20 to-gm-green/20 backdrop-blur-sm border border-gm-teal/10 flex items-center justify-center">
                {/* .research-radar sets position:relative in style.css, which would override the
                    Tailwind `absolute` here and collapse the ring; the inline style keeps it sized. */}
                <div
                  className="rounded-full bg-gradient-to-br from-gm-teal/30 to-gm-blue/20 border border-white/30 flex items-center justify-center research-radar"
                  style={{ position: 'absolute', inset: '10%' }}
                >
                  <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gm-teal to-gm-green shadow-2xl shadow-gm-teal/30 flex items-center justify-center text-white about-pulse">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="M16 16l4.5 4.5" strokeLinecap="round" />
                      <circle cx="11" cy="11" r="2.5" strokeOpacity={0.5} />
                    </svg>
                  </div>
                </div>
              </div>

              {hero.chips.map((chip, i) => {
                const layout = chipLayout[i];
                const tone = chipTone[chip.tone];
                return (
                  <div
                    key={chip.label}
                    className={`absolute ${layout.pos} bg-white rounded-2xl shadow-lg ${tone.shadow} border ${tone.border} px-3 py-2 flex items-center gap-2 hero-card-float`}
                    style={layout.delay ? { animationDelay: layout.delay, animationDuration: layout.duration } : undefined}
                  >
                    <ChipIcon name={layout.icon} className={`w-5 h-5 ${tone.text}`} />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gm-muted">{chip.label}</span>
                      <span className="text-sm font-bold text-gm-deep">{chip.value}</span>
                    </div>
                  </div>
                );
              })}

              <div className="about-orbit-ring" aria-hidden="true">
                <span className="about-orbit-dot about-orbit-dot--a" />
                <span className="about-orbit-dot about-orbit-dot--b" />
                <span className="about-orbit-dot about-orbit-dot--c" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
