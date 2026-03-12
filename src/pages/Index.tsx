import { useEffect } from 'react';
import HeaderHero from '@/components/HeaderHero';
import ServicesSections from '@/components/ServicesSections';
import ExperiencePortfolio from '@/components/ExperiencePortfolio';
import ContactsFooter from '@/components/ContactsFooter';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Index() {
  useReveal();

  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] font-body min-h-screen overflow-x-hidden">
      <HeaderHero />
      <ServicesSections />
      <ExperiencePortfolio />
      <ContactsFooter />
    </div>
  );
}
