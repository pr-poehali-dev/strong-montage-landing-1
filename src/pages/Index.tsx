import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

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

const HERO_BG = 'https://cdn.poehali.dev/files/91c5419c-3d2f-4411-a0f8-8bde507e9cb0.png';

function LogoSVG({ className }: { className?: string }) {
  // Cube points:  T(48,2) L(2,26) R(94,26) M(48,50) BL(2,74) BR(94,74) B(48,98)
  return (
    <svg className={className} viewBox="0 0 250 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="sm-top"><polygon points="2,26 48,2 94,26 48,50"/></clipPath>
        <clipPath id="sm-left"><polygon points="2,26 48,50 48,98 2,74"/></clipPath>
        <clipPath id="sm-right"><polygon points="48,50 94,26 94,74 48,98"/></clipPath>
      </defs>

      {/* TOP FACE — red base, orange convex arc at bottom edge */}
      <polygon points="2,26 48,2 94,26 48,50" fill="#F52400"/>
      {/* orange sliver along bottom of top face */}
      <path d="M2,26 C26,42 70,42 94,26 C70,36 26,36 2,26Z" fill="#F5A200" clipPath="url(#sm-top)"/>

      {/* LEFT FACE — orange base */}
      <polygon points="2,26 48,50 48,98 2,74" fill="#F5A200"/>
      {/* red curved band: from top (near center edge M) sweeping left/down to BL corner */}
      {/* shape: top-inner-corner M→ curve left to L → down to BL → curve back to ~bottom-center */}
      <path d="M48,50 C36,50 2,26 2,26 L2,74 C2,74 20,82 48,98 C34,80 30,64 48,50Z"
        fill="#F52400" clipPath="url(#sm-left)"/>

      {/* RIGHT FACE — orange base */}
      <polygon points="48,50 94,26 94,74 48,98" fill="#F5A200"/>
      {/* red curved band mirrored */}
      <path d="M48,50 C60,50 94,26 94,26 L94,74 C94,74 76,82 48,98 C62,80 66,64 48,50Z"
        fill="#F52400" clipPath="url(#sm-right)"/>

      {/* WHITE EDGE LINES */}
      <line x1="2" y1="26" x2="48" y2="2"   stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="48" y1="2"  x2="94" y2="26"  stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="2" y1="26"  x2="48" y2="50"  stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="94" y1="26" x2="48" y2="50"  stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="2" y1="26"  x2="2"  y2="74"  stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="94" y1="26" x2="94" y2="74"  stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="48" y1="50" x2="48" y2="98"  stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="2" y1="74"  x2="48" y2="98"  stroke="white" strokeWidth="1.8" opacity="0.9"/>
      <line x1="94" y1="74" x2="48" y2="98"  stroke="white" strokeWidth="1.8" opacity="0.9"/>

      {/* TEXT — centred at cube mid Y = (2+98)/2 = 50 → lines at 38 and 64 */}
      <text x="104" y="40" fontFamily="Oswald, Arial, sans-serif" fontWeight="700"
        fontSize="21" fill="#FF6B00" letterSpacing="1.5">СТРОНГ-</text>
      <text x="104" y="65" fontFamily="Oswald, Arial, sans-serif" fontWeight="700"
        fontSize="21" fill="#FF6B00" letterSpacing="1.5">МОНТАЖ</text>
    </svg>
  );
}

export default function Index() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sent'>('idle');
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('sent');
    setTimeout(() => setFormState('idle'), 3000);
  }

  const navLinks = [
    { href: '#about', label: 'О компании' },
    { href: '#services', label: 'Услуги' },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#contacts', label: 'Контакты' },
  ];

  const clients = [
    'Ростелеком', 'ВТБ Арена', 'Лужники', 'Мегафон', 'МКЖД',
    'Парк Патриот', 'Леруа Мерлен', 'ГБУ МФЦ', 'Мед. Кластер', 'Сбер', 'Сколково'
  ];

  const clientLogos = [
    { name: 'Мегафон', url: 'https://cdn.poehali.dev/files/a4ca8004-cf90-4a26-a617-600a473ae493.png', h: 'h-14' },
    { name: 'МКЖД', url: 'https://cdn.poehali.dev/files/6b03bdb6-d73d-44eb-8bbd-d26a356ab7e5.png', h: 'h-28' },
    { name: 'Сбер', url: 'https://cdn.poehali.dev/files/9815535f-55c1-49a0-9758-d9025db72d91.jpg', h: 'h-14' },
    { name: 'Ростелеком', url: 'https://cdn.poehali.dev/files/8dcb670d-fa6f-4b9b-8e21-27960d703e9c.png', h: 'h-20' },
    { name: 'ВТБ', url: 'https://cdn.poehali.dev/files/a1d43d83-7f7b-4b1a-82eb-6ad0d6507116.jpg', h: 'h-14' },
    { name: 'Мои Документы', url: 'https://cdn.poehali.dev/files/98798ebd-7825-4c54-ac90-96735cf32589.jpg', h: 'h-14' },
    { name: 'Сколково', url: 'https://cdn.poehali.dev/files/db09b6dc-2eed-4fa8-8715-f7d8c1615fc5.png', h: 'h-20' },
    { name: 'Лемана Про', url: 'https://cdn.poehali.dev/files/a6d26004-8102-42f4-b5ae-84f2a2f35fb2.png', h: 'h-28' },
  ];

  const steps = [
    { n: '01', title: 'Выявление потребности', desc: 'Изучаем объект и задачи заказчика' },
    { n: '02', title: 'Концепция', desc: 'Формируем техническое решение' },
    { n: '03', title: 'Согласование', desc: 'Утверждаем план и смету' },
    { n: '04', title: 'Проектирование', desc: 'Разрабатываем рабочую документацию' },
    { n: '05', title: 'Закупка оборудования', desc: 'Поставляем сертифицированное оборудование' },
    { n: '06', title: 'Монтажные работы', desc: 'Выполняем монтаж собственным штатом' },
    { n: '07', title: 'Пусконаладка', desc: 'Тестируем и сдаём систему под ключ' },
  ];

  const services = [
    {
      icon: 'Zap',
      title: 'Электропитание и освещение',
      items: ['Освещение всех типов', 'Силовые розетки и щиты', 'ИБП и резервное питание', 'Заземление и молниезащита'],
    },
    {
      icon: 'Network',
      title: 'СКС и сети',
      items: ['ЛВС / Wi-Fi / ВОЛС', 'Телефония и АТС', 'Центры обработки данных', 'ТВ, радио, часофикация'],
    },
    {
      icon: 'ShieldCheck',
      title: 'Системы безопасности',
      items: ['АПС и СОУЭ', 'Видеонаблюдение', 'СКУД и охрана периметра', 'ОПС и автоматика'],
    },
    {
      icon: 'Flame',
      title: 'Пожаротушение',
      items: ['Водяное и спринклерное', 'Порошковое и аэрозольное', 'Газовое пожаротушение', 'Внутренний водопровод'],
    },
  ];

  const portfolio = [
    { img: 'https://picsum.photos/seed/datacenter/800/600', label: 'Центр обработки данных' },
    { img: 'https://picsum.photos/seed/officebuilding/800/600', label: 'Бизнес-центр' },
    { img: 'https://picsum.photos/seed/stadium2025/800/600', label: 'Спортивный комплекс' },
  ];

  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] font-body min-h-screen overflow-x-hidden">

      {/* ─── HEADER ────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        style={{ height: 72 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="shrink-0 flex items-center">
            <img src="https://cdn.poehali.dev/files/e27b0206-9ac5-4550-810a-31cb94bf6f77.png" alt="Стронг-Монтаж" className="h-14 w-auto" />
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-[#999] hover:text-[#FF6B00] transition-colors duration-200 min-h-[44px] flex items-center">
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a href="#contacts"
            className="hidden md:flex items-center gap-2 gradient-bg text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity min-h-[44px]">
            Связаться
          </a>

          {/* Burger */}
          <button onClick={() => setMenuOpen(v => !v)}
            className="md:hidden text-[#f0f0f0] min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Меню">
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#111111] border-t border-[#2a2a2a] px-6 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-[#f0f0f0] text-base py-2 min-h-[44px] flex items-center">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.28)' }}
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />
          {/* orange radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.08)_0%,transparent_65%)]" />
          {/* shimmer bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-px shimmer-line" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a]/80 border border-[#2a2a2a] rounded-full px-4 py-1.5 text-xs text-[#999] mb-8 reveal">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            Работаем с 2015 года
          </div>

          <h1 className="font-heading gradient-text uppercase tracking-wide leading-none mb-6 reveal"
            style={{ fontSize: 'clamp(3rem,8vw,7rem)' }}>
            Стронг-Монтаж
          </h1>

          <p className="font-heading uppercase tracking-[0.08em] text-[#f0f0f0] mb-6 reveal"
            style={{ fontSize: 'clamp(1.1rem,2.5vw,1.6rem)' }}>
            Безопасные сети. Яркие решения.
          </p>

          <p className="text-[#bbb] leading-relaxed mx-auto mb-10 reveal"
            style={{ maxWidth: '60ch', fontSize: 'clamp(0.95rem,1.5vw,1.05rem)' }}>
            Вне зависимости от того, идет ли речь о небольшом офисе или масштабном инфраструктурном объекте, мы берем на себя полную ответственность.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 reveal">
            <a href="#services"
              className="gradient-bg text-white font-medium px-7 py-3.5 rounded-full hover:opacity-90 transition-all hover:scale-105 min-h-[44px] flex items-center gap-2">
              Узнать больше
              <Icon name="ArrowRight" size={16} />
            </a>
            <a href="#contacts"
              className="border border-[#2a2a2a] text-[#f0f0f0] font-medium px-7 py-3.5 rounded-full hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all min-h-[44px] flex items-center">
              Связаться
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555]">
          <span className="text-xs tracking-widest uppercase">Прокрутите</span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </div>
      </section>

      {/* ─── О КОМПАНИИ ────────────────────────────────────────────────── */}
      <section id="about" className="section-pad px-6 max-w-7xl mx-auto">
        <div className="mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">О компании</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Комплексный подход
          </h2>
          <p className="text-[#999] mt-4 max-w-2xl leading-relaxed">
            Мы специализируемся на комплексном подходе: от проектирования и поставки оборудования
            до строительно-монтажных и пусконаладочных работ на объектах любой сложности.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'Compass', title: 'Проектирование', desc: 'Техдокументация и рабочие чертежи' },
            { icon: 'Truck', title: 'Поставка', desc: 'Сертифицированное оборудование' },
            { icon: 'Wrench', title: 'Монтаж', desc: 'Собственный штат специалистов' },
            { icon: 'Settings', title: 'Пусконаладка', desc: 'Тестирование и сдача объекта' },
          ].map((c, i) => (
            <div key={i} className="reveal card-hover rounded-2xl p-6 bg-[#111111]"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-xl bg-[#FF6B00]/10">
                <Icon name={c.icon} fallback="Settings" size={20} className="text-[#FF6B00]" />
              </div>
              <h3 className="font-heading text-lg uppercase tracking-wide mb-1">{c.title}</h3>
              <p className="text-[#999] text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── КЛИЕНТЫ ───────────────────────────────────────────────────── */}
      <section className="section-pad border-y border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="text-center mb-10 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Клиенты</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)' }}>
            Нам доверяют
          </h2>
        </div>
        <div className="marquee-wrapper overflow-hidden bg-white rounded-xl py-4">
          <div className="flex animate-marquee whitespace-nowrap gap-0 items-center" style={{ width: 'max-content' }}>
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="flex items-center justify-center px-10 opacity-80 hover:opacity-100 transition-opacity cursor-default">
                <img src={logo.url} alt={logo.name} className={`${logo.h} w-auto object-contain`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КАК МЫ РАБОТАЕМ ───────────────────────────────────────────── */}
      <section className="section-pad px-6 max-w-7xl mx-auto">
        <div className="mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Процесс</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Как мы работаем
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="reveal card-hover rounded-2xl p-6 bg-[#111111] relative overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="font-heading text-7xl font-bold text-[#FF6B00]/10 absolute -top-2 -right-2 leading-none select-none">
                {s.n}
              </div>
              <div className="font-heading text-[#FF6B00] text-sm mb-3">{s.n}</div>
              <h3 className="font-heading text-base uppercase tracking-wide mb-2">{s.title}</h3>
              <p className="text-[#999] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── УСЛУГИ ────────────────────────────────────────────────────── */}
      <section id="services" className="section-pad px-6 max-w-7xl mx-auto">
        <div className="reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Направления</span>
          <h2 className="font-heading uppercase tracking-wide mt-2 mb-10"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Наши услуги
          </h2>
          <h3 className="font-heading uppercase tracking-wide"
            style={{ fontSize: 'clamp(1.4rem,3vw,2.5rem)' }}>
            Системы электропитания<br />и освещения
          </h3>
          <ul className="mt-8 space-y-4">
            {[
              'Внутреннее электроосвещение.',
              'Внутренняя розеточная сеть.',
              'Системы бесперебойного питания.',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-[#999]"
                style={{ fontSize: 'clamp(1rem,2vw,1.4rem)' }}>
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── АХП ───────────────────────────────────────────────────────── */}
      <section className="section-pad px-6 bg-[#0d0d0d] border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-8">
          <div className="reveal flex-1">
            <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">АХП</span>
            <h2 className="font-heading uppercase tracking-wide mt-2"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)' }}>
              Сопровождение объектов
            </h2>
            <p className="text-[#999] mt-4 max-w-xl leading-relaxed">
              После сдачи объекта обеспечиваем техническое обслуживание и эксплуатационное
              сопровождение всех инженерных систем — плановое и экстренное.
            </p>
          </div>
          <div className="reveal flex flex-wrap gap-3 md:justify-end">
            {['Плановое ТО', 'Аварийный выезд', 'Ежегодные проверки', 'Замена расходников'].map((t, i) => (
              <span key={i}
                className="border border-[#2a2a2a] text-[#999] text-sm px-4 py-2 rounded-full hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

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
              style={{ transitionDelay: `${i * 100}ms`, aspectRatio: '4/3' }}>
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

      {/* ─── КОНТАКТЫ ──────────────────────────────────────────────────── */}
      <section id="contacts" className="section-pad px-6 bg-[#0d0d0d] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 reveal">
            <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Контакты</span>
            <h2 className="font-heading uppercase tracking-wide mt-2"
              style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
              Свяжитесь с нами
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal space-y-6">
              {[
                { icon: 'Phone', label: '+7 (495) 978-00-55', href: 'tel:+74959780055' },
                { icon: 'Mail', label: 'info@strong-montage.ru', href: 'mailto:info@strong-montage.ru' },
                { icon: 'Send', label: '@strongmontage', href: 'https://t.me/strongmontage' },
                { icon: 'MapPin', label: 'Москва, ул. Луганская 3к3', href: '#' },
              ].map((c, i) => (
                <a key={i} href={c.href}
                  className="flex items-center gap-4 group min-h-[44px]">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] group-hover:border-[#FF6B00] transition-colors">
                    <Icon name={c.icon} fallback="Phone" size={18} className="text-[#FF6B00]" />
                  </div>
                  <span className="text-[#999] group-hover:text-[#f0f0f0] transition-colors">{c.label}</span>
                </a>
              ))}
              <div className="pt-4 p-6 rounded-2xl bg-[#111111] border border-[#2a2a2a]">
                <p className="text-[#999] text-sm leading-relaxed">
                  Работаем с юридическими лицами и ИП. Заключаем договор, предоставляем полный пакет закрывающих документов.
                </p>
              </div>
            </div>

            <div className="reveal">
              <form onSubmit={handleSubmit}
                className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 space-y-4">
                <div>
                  <label className="text-xs text-[#999] uppercase tracking-widest mb-2 block">Имя</label>
                  <input type="text" required placeholder="Как к вам обращаться?"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#FF6B00] transition-colors min-h-[44px]" />
                </div>
                <div>
                  <label className="text-xs text-[#999] uppercase tracking-widest mb-2 block">Телефон</label>
                  <input type="tel" required placeholder="+7 (___) ___-__-__"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#FF6B00] transition-colors min-h-[44px]" />
                </div>
                <div>
                  <label className="text-xs text-[#999] uppercase tracking-widest mb-2 block">Сообщение</label>
                  <textarea rows={4} placeholder="Опишите ваш объект или задачу..."
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#FF6B00] transition-colors resize-none" />
                </div>
                <button type="submit"
                  className={`w-full font-medium py-3.5 rounded-xl transition-all min-h-[44px] ${
                    formState === 'sent'
                      ? 'bg-green-600 text-white'
                      : 'gradient-bg text-white hover:opacity-90 hover:scale-[1.02]'
                  }`}>
                  {formState === 'sent' ? '✓ Отправлено!' : 'Отправить →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#2a2a2a] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center shrink-0">
            <LogoSVG className="h-10 w-auto opacity-70" />
          </a>
          <p className="text-[#555] text-sm">© 2015–2026 ООО «Стронг-Монтаж»</p>
          <nav className="flex gap-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="text-[#555] text-sm hover:text-[#FF6B00] transition-colors min-h-[44px] flex items-center">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}