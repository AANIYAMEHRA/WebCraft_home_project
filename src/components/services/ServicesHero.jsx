import { hero as staticHero } from '../../pages/servicesData.js';

const TONE = {
  teal: { text: 'text-gm-teal', shadow: 'shadow-gm-teal/10', border: 'border-gm-teal/10' },
  blue: { text: 'text-gm-blue', shadow: 'shadow-gm-blue/10', border: 'border-gm-blue/10' },
  green: { text: 'text-gm-green', shadow: 'shadow-gm-green/10', border: 'border-gm-green/10' },
};

// Floating chip positions and icon paths, matching the original services.html layout.
const CHIP_LAYOUT = [
  { pos: 'top-[5%] left-[8%]', delay: undefined, duration: undefined },
  { pos: 'top-[5%] right-[5%]', delay: '1s', duration: '7s' },
  { pos: 'bottom-[8%] left-[3%]', delay: '2s', duration: '8s' },
  { pos: 'bottom-[8%] right-[3%]', delay: '4s', duration: '9s' },
];

const CHIP_ICONS = [
  'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  'M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M14.25 4.5l-4.5 15',
  'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
];

export default function ServicesHero({ hero = staticHero }) {
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
            <div className="relative w-full aspect-square max-w-[480px] mx-auto svc-hero-stage">
              <svg className="svc-dashed-ring" viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(42,157,143,0.32)" strokeWidth="1" strokeDasharray="3 8" />
              </svg>

              <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gm-teal/20 to-gm-green/20 backdrop-blur-sm border border-gm-teal/10 flex items-center justify-center">
                <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-gm-teal/30 to-gm-blue/20 border border-white/30 flex items-center justify-center svc-build-ring">
                  <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gm-teal to-gm-green shadow-2xl shadow-gm-teal/30 flex items-center justify-center text-white svc-cube">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                </div>
              </div>

              {hero.chips.map((chip, i) => {
                const layout = CHIP_LAYOUT[i];
                const tone = TONE[chip.tone] ?? TONE.teal;
                return (
                  <div
                    key={chip.label}
                    className={`absolute ${layout.pos} bg-white rounded-2xl shadow-lg ${tone.shadow} border ${tone.border} px-3 py-2 flex items-center gap-2 hero-card-float`}
                    style={layout.delay ? { animationDelay: layout.delay, animationDuration: layout.duration } : undefined}
                  >
                    <svg className={`w-5 h-5 ${tone.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path d={chip.icon || CHIP_ICONS[i]} />
                    </svg>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gm-muted">{chip.label}</span>
                      <span className="text-sm font-bold text-gm-deep">{chip.value}</span>
                    </div>
                  </div>
                );
              })}

              <svg className="svc-build-arc" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <linearGradient id="svcArcGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6EDAA0" />
                    <stop offset="100%" stopColor="#2A9D8F" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="62" fill="none" stroke="url(#svcArcGrad)" strokeWidth={3} strokeLinecap="round" strokeDasharray="60 320" />
              </svg>

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