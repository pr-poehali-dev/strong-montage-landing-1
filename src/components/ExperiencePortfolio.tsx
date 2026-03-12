import { useEffect, useRef, useState } from 'react';

function useCounter(target: number, started: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

function StatCard({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) {
  const count = useCounter(value, started);
  return (
    <div className="reveal card-hover rounded-2xl p-6 bg-[#111111] text-left">
      <div className="font-heading text-5xl gradient-text mb-1">{count}{suffix}</div>
      <div className="text-[#999] text-sm font-body">{label}</div>
    </div>
  );
}

const portfolio = [
  { img: 'https://picsum.photos/seed/datacenter/800/600', label: 'Центр обработки данных' },
  { img: 'https://picsum.photos/seed/officebuilding/800/600', label: 'Бизнес-центр' },
  { img: 'https://picsum.photos/seed/stadium2025/800/600', label: 'Спортивный комплекс' },
];

export default function ExperiencePortfolio() {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ─── НАШ ОПЫТ ──────────────────────────────────────────────────── */}
      <section className="section-pad px-6 max-w-7xl mx-auto" ref={statsRef}>
        <div className="mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Цифры</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Наш опыт
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard value={10} suffix="+" label="лет на рынке (с 2015)" started={statsStarted} />
          <StatCard value={50} suffix="+" label="завершённых объектов" started={statsStarted} />
          <StatCard value={4} suffix="" label="профильные лицензии СРО" started={statsStarted} />
          <StatCard value={3} suffix=" года" label="гарантия на работы" started={statsStarted} />
          <StatCard value={80} suffix="+" label="специалистов в штате" started={statsStarted} />
          <div className="reveal card-hover rounded-2xl p-6 bg-[#111111] text-left flex flex-col justify-between">
            <div className="font-heading text-3xl gradient-text mb-1">Под ключ</div>
            <div className="text-[#999] text-sm">от проекта до сдачи объекта</div>
          </div>
        </div>
      </section>

      {/* ─── ПОРТФОЛИО ─────────────────────────────────────────────────── */}
      <section id="portfolio" className="section-pad px-6 max-w-7xl mx-auto">
        <div className="mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Портфолио</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Наши объекты
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {portfolio.map((p, i) => (
            <div key={i}
              className="reveal rounded-2xl overflow-hidden relative group cursor-pointer"
              style={{
                transitionDelay: `${i * 100}ms`,
                aspectRatio: '4/3',
              }}>
              <img src={p.img} alt={p.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-heading text-lg uppercase tracking-wide text-white">{p.label}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <span className="font-heading text-sm uppercase tracking-widest text-[#f0f0f0]/80">{p.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
