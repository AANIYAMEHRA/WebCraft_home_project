import { useLayoutEffect, useRef } from 'react';
import { manifesto } from '../../pages/researchData.js';
import { gsap } from './gsap.js';

// Splits the copy into word spans so each word can fade in as the user scrolls.
function toWords(segments) {
  const out = [];
  segments.forEach((seg, si) => {
    seg.text.split(/(\s+)/).forEach((w, wi) => {
      if (!w) return;
      if (/^\s+$/.test(w)) out.push({ space: true, key: `s${si}-${wi}` });
      else out.push({ word: w, em: !!seg.em, key: `w${si}-${wi}` });
    });
  });
  return out;
}

export default function Manifesto() {
  const textRef = useRef(null);
  const words = toWords(manifesto.segments);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#manifestoText .word', {
        opacity: 1,
        stagger: 0.03,
        scrollTrigger: { trigger: textRef.current, start: 'top 75%', end: 'bottom 60%', scrub: 1 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto-section" id="manifestoSection">
      <div className="manifesto-bg-orbs">
        <div className="manifesto-orb manifesto-orb--1" />
        <div className="manifesto-orb manifesto-orb--2" />
      </div>
      <div className="manifesto-inner max-w-5xl mx-auto px-6 lg:px-8">
        <span className="section-tag inline-block text-xs text-gm-teal font-bold uppercase tracking-widest bg-gm-teal/8 px-4 py-1.5 rounded-full mb-8">
          {manifesto.tag}
        </span>
        <p className="manifesto-text" id="manifestoText" ref={textRef}>
          {words.map((w) =>
            w.space ? (
              <span key={w.key}>{' '}</span>
            ) : w.em ? (
              <em key={w.key}><span className="word">{w.word}</span></em>
            ) : (
              <span key={w.key} className="word">{w.word}</span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
