import { useEffect, useState } from 'react';
import '../components/services/services.css';
import ServicesHero from '../components/services/ServicesHero.jsx';
import Capabilities from '../components/services/Capabilities.jsx';
import TechStack from '../components/services/TechStack.jsx';
import EngagementModels from '../components/services/EngagementModels.jsx';
import Cases from '../components/services/Cases.jsx';
import ServicesFaq from '../components/services/ServicesFaq.jsx';
import ServicesCta from '../components/services/ServicesCta.jsx';
import * as servicesDefaults from './servicesData.js';

const API = 'http://localhost:5000/api/services';

const SECTION_KEYS = [
  'hero',
  'capabilitiesIntro',
  'capabilities',
  'techStack',
  'engagementModels',
  'cases',
  'faq',
  'servicesCta',
];

// Header and footer come from Layout (see App.jsx), so this page only renders its sections.
export default function Services() {
  // Starts with the static content, then replaces each section that the CMS has saved.
  const [content, setContent] = useState(() => ({ ...servicesDefaults }));

  useEffect(() => {
    let active = true;

    fetch(API)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const saved = data?.content || data;
        if (!active || !saved) return;

        setContent((prev) => {
          const next = { ...prev };
          SECTION_KEYS.forEach((key) => {
            if (saved[key]) next[key] = saved[key];
          });
          return next;
        });
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  // Reveal-on-scroll for elements with the .reveal class (same behaviour as the original page).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content]);

  return (
    <>
      <ServicesHero hero={content.hero} />
      <Capabilities
        key={`caps-${content.capabilities.length}`}
        capabilities={content.capabilities}
        capabilitiesIntro={content.capabilitiesIntro}
      />
      <TechStack techStack={content.techStack} />
      <EngagementModels engagementModels={content.engagementModels} />
      <Cases cases={content.cases} />
      <ServicesFaq faq={content.faq} />
      <ServicesCta servicesCta={content.servicesCta} />
    </>
  );
}