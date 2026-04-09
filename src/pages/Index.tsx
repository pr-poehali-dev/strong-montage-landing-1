import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import func2url from '../../backend/func2url.json';

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
    <div className="reveal card-hover rounded-2xl p-4 sm:p-6 bg-[#111111] text-left">
      <div className="font-heading text-3xl sm:text-5xl gradient-text mb-1">{count}{suffix}</div>
      <div className="text-[#999] text-xs sm:text-sm font-body leading-snug">{label}</div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch(func2url['send-email'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setPhone('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section-pad px-4 sm:px-6 border-t border-[#2a2a2a] bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto">
        <div className="reveal mb-8 text-center">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Заявка</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
            Оставьте заявку
          </h2>
          <p className="text-[#777] mt-3 text-sm">Перезвоним в течение 30 минут в рабочее время</p>
        </div>

        {status === 'success' ? (
          <div className="reveal flex flex-col items-center gap-4 py-10">
            <div className="w-16 h-16 rounded-full bg-[#FF6B00]/15 flex items-center justify-center">
              <Icon name="CheckCircle" size={32} className="text-[#FF6B00]" />
            </div>
            <p className="font-heading text-white text-xl uppercase tracking-wide">Заявка отправлена!</p>
            <p className="text-[#777] text-sm text-center">Мы получили вашу заявку и свяжемся с вами в ближайшее время</p>
            <button onClick={() => setStatus('idle')}
              className="mt-2 text-[#FF6B00] text-sm hover:underline">
              Отправить ещё одну
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal space-y-4">
            <div>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-[#111111] border border-[#2a2a2a] hover:border-[#444] focus:border-[#FF6B00] rounded-xl px-5 py-4 text-white placeholder-[#555] outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Номер телефона"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="w-full bg-[#111111] border border-[#2a2a2a] hover:border-[#444] focus:border-[#FF6B00] rounded-xl px-5 py-4 text-white placeholder-[#555] outline-none transition-colors text-sm"
              />
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <Icon name="AlertCircle" size={16} />
                Ошибка отправки. Попробуйте ещё раз или позвоните нам.
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full gradient-bg text-white font-heading uppercase tracking-wide text-sm py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all min-h-[54px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {status === 'loading' ? (
                <>
                  <Icon name="Loader" size={18} className="animate-spin" />
                  Отправка...
                </>
              ) : 'Оставить заявку'}
            </button>
            <p className="text-[#444] text-xs text-center">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <a href="/privacy" className="hover:text-[#FF6B00] transition-colors">политикой конфиденциальности</a>
            </p>
          </form>
        )}
      </div>
    </section>
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
  const [formConsent, setFormConsent] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(() => localStorage.getItem('cookie_accepted') === '1');
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
    if (!formConsent) return;
    setFormState('sent');
    setTimeout(() => setFormState('idle'), 3000);
  }

  function acceptCookies() {
    localStorage.setItem('cookie_accepted', '1');
    setCookieAccepted(true);
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
    {
      img: 'https://cdn.poehali.dev/files/c5d9ad6a-296b-45cc-aaff-7074e414bf28.jpg',
      label: 'ВТБ АРЕНА',
      address: 'г. Москва, Ленинградский пр-т, д. 36',
      year: '2021',
      works: [
        'ТЦ «Арена Плаза» — СКС; АПС; ОТС и СКУД; КРС телевизионной системы.',
        'Фирменный магазин ФК «ДИНАМО-МОСКВА» — СМР (Автоматическая пожарная сигнализация).',
        'Pizza Hut, ВабиСаби — СМР по системам АПС и СОУЭ.',
        'Гимнастический центр «Baby Gim» — система пожарной сигнализации, система спринклерного водяного пожаротушения.',
        'Здание СКРК ВТБ Арена – Центральный стадион «Динамо» им. Льва Яшина — АУПТ; АПЗ + ПНР.',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/99c51ae9-a143-473a-bec4-b7bd993e6a32.jpg',
      label: 'Музей Криптографии',
      address: 'г. Москва, ул. Ботаническая, вл. 25, строен. 4',
      year: '2021',
      works: [
        'Автоматизация систем противопожарной защиты (АПЗ).',
        'Системы оповещения, озвучивания и управления эвакуацией при пожаре (СОУЭ).',
        'Автоматическая пожарная сигнализация (САПС).',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/41fd911f-1c49-488b-8fa8-eb1abe83c660.jpg',
      label: 'Военно-патриотический парк «Патриот»',
      address: 'Московская обл., Одинцовский район, г. Кубинка, 55 км Минского шоссе',
      year: '2017',
      works: [
        'Установка светодиодного медиафасада.',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/db75009d-e823-4282-a6a5-7bc8ac79408e.jpg',
      label: 'Штаб-квартира «Ростелеком»',
      address: 'г. Москва, Киевское шоссе, 22-й километр, 6, стр. 1',
      year: '2016',
      works: [
        'АПС — автоматическая пожарная сигнализация.',
        'СОУЭ — система оповещения и управления эвакуацией.',
        'АПЗ — система автоматической противопожарной защиты.',
        'АУГПТ — автоматическая установка газового пожаротушения.',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/1bdcb0ba-fc39-4cf8-a273-c4b5b9e28969.jpg',
      label: 'Торговый центр «Леруа Мерлен»',
      address: 'Липецкая область, г. Липецк, шоссе Елецкое',
      year: '2021',
      works: [
        'Комплекс работ по монтажу и пусконаладке системы автоматизации пожарной насосной станции.',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/0608a7f4-b17f-45ad-b47c-bc13678d6712.jpg',
      label: 'Офисные помещения МАТК «Оружейный»',
      address: 'г. Москва, Оружейный переулок, д. 41',
      year: '2017',
      works: [
        'АУГПТ — автоматическая установка газового пожаротушения.',
        'СОТ — система охранного телевидения.',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/da1ca4ca-afba-4b4d-8c44-0da7ee18fa11.jpg',
      label: 'Военная академия РВСН им. Петра Великого',
      address: 'г. Балашиха',
      year: '2018',
      works: [
        'Монтажные работы по оснащению комплекса мультимедийных систем.',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/bc58ab77-4f1a-419c-aaec-49cfda5cae94.jpg',
      label: 'ТЦ VEGAS 2 «Крокус», 1 этаж, помещение № 1-168, магазин «Other Stories»',
      address: 'Московская область, г. Красногорск, ул. Международная, д. 12',
      year: '2020',
      works: [
        'Демонтажные, монтажные и пусконаладочные работы систем: АСПТ, ВПВ, АПС, СОУЭ.',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/2a77113a-f4f1-4453-b94d-6c9141b3146a.jpg',
      label: 'Многофункциональный жилой комплекс с подземной автостоянкой',
      address: 'г. Москва, поселение Московский, вблизи дер. Румянцево, уч. 3.2 (корп. 7)',
      year: '2021',
      works: [
        'Внутренние инженерные системы.',
        'Внутренние системы водоснабжения.',
        'Внутренние слаботочные системы.',
        'СС — слаботочные системы связи, автоматизации, диспетчеризации.',
      ],
    },
    {
      img: 'https://cdn.poehali.dev/files/06af141e-e745-4ffc-97e0-cb45587eb79d.jpg',
      label: 'ЦОД СБЕРБАНК',
      address: 'г. Москва, Большой бул., 64, с. 1',
      year: '2018',
      works: [
        'АУГПТ — автоматическая установка газового пожаротушения.',
      ],
    },
  ];
  const [portfolioIdx, setPortfolioIdx] = useState(0);
  const [portfolioFlipped, setPortfolioFlipped] = useState(false);

  function portfolioPrev() {
    setPortfolioFlipped(false);
    setPortfolioIdx(i => (i - 1 + portfolio.length) % portfolio.length);
  }
  function portfolioNext() {
    setPortfolioFlipped(false);
    setPortfolioIdx(i => (i + 1) % portfolio.length);
  }
  function portfolioGoTo(i: number) {
    setPortfolioFlipped(false);
    setPortfolioIdx(i);
  }

  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] font-body min-h-screen overflow-x-hidden">

      {/* ─── HEADER ────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        style={{ height: 64 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="shrink-0 flex items-center">
            <img src="https://cdn.poehali.dev/files/e27b0206-9ac5-4550-810a-31cb94bf6f77.png" alt="Стронг-Монтаж" fetchPriority="high" decoding="async" className="h-10 sm:h-14 w-auto" />
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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

          {/* Mobile: phone + burger */}
          <div className="flex items-center gap-2 md:hidden">
            <a href="tel:+74959780055"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF6B00]/10 text-[#FF6B00]"
              aria-label="Позвонить">
              <Icon name="Phone" size={18} />
            </a>
            <button onClick={() => setMenuOpen(v => !v)}
              className="text-[#f0f0f0] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Меню">
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0f0f0f]/97 backdrop-blur-md border-t border-[#2a2a2a] px-4 py-4 flex flex-col gap-1">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-[#f0f0f0] text-base py-3 px-3 min-h-[52px] flex items-center border-b border-[#1a1a1a] last:border-0 hover:text-[#FF6B00] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)}
              className="mt-3 gradient-bg text-white text-sm font-medium px-5 py-3 rounded-full flex items-center justify-center min-h-[48px]">
              Связаться с нами
            </a>
          </div>
        )}
      </header>

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-16 sm:pt-20">
        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
          >
            <source src="https://cdn.poehali.dev/projects/b67fe31a-828a-418e-bfcc-fa51e1a5d562/bucket/cdef851c-5764-49e5-8d9d-4b3bfd3eb4fa.mp4" type="video/mp4" />
            <img src={HERO_BG} alt="" fetchPriority="high" className="w-full h-full object-cover" style={{ filter: 'brightness(0.28)' }} />
          </video>
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />
          {/* orange radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.08)_0%,transparent_65%)]" />
          {/* shimmer bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-px shimmer-line" />
        </div>

        <div className="relative z-10 max-w-4xl w-full">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a]/80 border border-[#2a2a2a] rounded-full px-4 py-1.5 text-xs text-[#999] mb-6 sm:mb-8 reveal">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            Работаем с 2015 года
          </div>

          <h1 className="font-heading gradient-text uppercase tracking-wide leading-none mb-4 sm:mb-6 reveal"
            style={{ fontSize: 'clamp(2.4rem,8vw,7rem)' }}>
            Стронг-Монтаж
          </h1>

          <p className="font-heading uppercase tracking-[0.08em] text-[#f0f0f0] mb-4 sm:mb-6 reveal"
            style={{ fontSize: 'clamp(1rem,2.5vw,1.6rem)' }}>
            Безопасные сети. Яркие решения.
          </p>

          <p className="text-[#bbb] leading-relaxed mx-auto mb-8 sm:mb-10 reveal px-2"
            style={{ maxWidth: '60ch', fontSize: 'clamp(0.9rem,1.5vw,1.05rem)' }}>
            Вне зависимости от того, идет ли речь о небольшом офисе или масштабном инфраструктурном объекте, мы берем на себя полную ответственность.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 reveal w-full sm:w-auto">
            <a href="#services"
              className="w-full sm:w-auto gradient-bg text-white font-medium px-7 py-3.5 rounded-full hover:opacity-90 transition-all hover:scale-105 min-h-[52px] sm:min-h-[44px] flex items-center justify-center gap-2 text-base sm:text-sm">
              Узнать больше
              <Icon name="ArrowRight" size={16} />
            </a>
            <a href="#contacts"
              className="w-full sm:w-auto border border-[#2a2a2a] text-[#f0f0f0] font-medium px-7 py-3.5 rounded-full hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all min-h-[52px] sm:min-h-[44px] flex items-center justify-center text-base sm:text-sm">
              Связаться
            </a>
          </div>
        </div>

        {/* Scroll indicator — hidden on small phones to save space */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[#555]">
          <span className="text-xs tracking-widest uppercase">Прокрутите</span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </div>
      </section>

      {/* ─── О КОМПАНИИ ────────────────────────────────────────────────── */}
      <section id="about" className="section-pad px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">О компании</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)' }}>
            Комплексный подход
          </h2>
          <p className="text-[#999] mt-3 sm:mt-4 max-w-2xl leading-relaxed text-sm sm:text-base">
            Мы специализируемся на комплексном подходе: от проектирования и поставки оборудования
            до строительно-монтажных и пусконаладочных работ на объектах любой сложности.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: 'PencilRuler', title: 'Проектирование', desc: 'Техдокументация и рабочие чертежи' },
            { icon: 'PackageCheck', title: 'Поставка', desc: 'Сертифицированное оборудование' },
            { icon: 'Wrench', title: 'Монтаж', desc: 'Собственный штат специалистов' },
            { icon: 'Settings', title: 'Пусконаладка', desc: 'Тестирование и сдача объекта' },
          ].map((c, i) => (
            <div key={i} className="reveal card-hover rounded-2xl p-4 sm:p-6 bg-[#111111]"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 mb-3 sm:mb-4 flex items-center justify-center rounded-xl bg-[#FF6B00]/10">
                <Icon name={c.icon} fallback="Settings" size={18} className="text-[#FF6B00]" />
              </div>
              <h3 className="font-heading text-sm sm:text-lg uppercase tracking-wide mb-1">{c.title}</h3>
              <p className="text-[#999] text-xs sm:text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── КЛИЕНТЫ ───────────────────────────────────────────────────── */}
      <section className="section-pad border-y border-[#2a2a2a] bg-[#0d0d0d] content-lazy">
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
                <img src={logo.url} alt={logo.name} loading="lazy" decoding="async" className={`${logo.h} w-auto object-contain`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КАК МЫ РАБОТАЕМ ───────────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Процесс</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)' }}>
            Как мы работаем
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {steps.map((s, i) => (
            <div key={i} className="reveal card-hover rounded-2xl p-4 sm:p-6 bg-[#111111] relative overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="font-heading text-5xl sm:text-7xl font-bold text-[#FF6B00]/10 absolute -top-2 -right-2 leading-none select-none">
                {s.n}
              </div>
              <div className="font-heading text-[#FF6B00] text-xs sm:text-sm mb-2 sm:mb-3">{s.n}</div>
              <h3 className="font-heading text-xs sm:text-base uppercase tracking-wide mb-1 sm:mb-2 leading-tight">{s.title}</h3>
              <p className="text-[#999] text-xs sm:text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── УСЛУГИ ────────────────────────────────────────────────────── */}
      <section id="services" className="section-pad px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="reveal">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Направления</span>
            <h2 className="font-heading uppercase tracking-wide mt-2"
              style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)' }}>
              Наши услуги
            </h2>
          </div>
          <div className="flex items-start gap-3 sm:gap-5">
            <span className="font-heading text-[#FF6B00] shrink-0 leading-none" style={{ fontSize: 'clamp(2rem,6vw,5rem)', opacity: 0.25 }}>01</span>
            <h3 className="font-heading uppercase tracking-wide pt-1 sm:pt-2"
              style={{ fontSize: 'clamp(1.1rem,3vw,2.5rem)' }}>
              Системы электропитания<br />и освещения
            </h3>
          </div>
          <ul className="mt-5 sm:mt-8 space-y-3 sm:space-y-4">
            {[
              'Внутреннее электроосвещение.',
              'Внутренняя розеточная сеть.',
              'Системы бесперебойного питания.',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 sm:gap-4 text-[#999]"
                style={{ fontSize: 'clamp(0.9rem,2vw,1.4rem)' }}>
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 sm:mt-16 border-t border-[#2a2a2a] pt-10 sm:pt-16 relative rounded-2xl overflow-hidden">
            {/* Фоновый баннер */}
            <div className="absolute inset-0 z-0">
              <img src="https://cdn.poehali.dev/files/f47d5c62-66f9-4b45-912a-4ee0b2b74fb2.png"
                alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0a0a0a]/75" />
            </div>
            {/* Контент поверх */}
            <div className="relative z-10 p-5 sm:p-8 md:p-12">
              <div className="flex items-start gap-3 sm:gap-5">
                <span className="font-heading text-[#FF6B00] shrink-0 leading-none" style={{ fontSize: 'clamp(2rem,6vw,5rem)', opacity: 0.25 }}>02</span>
                <h3 className="font-heading uppercase tracking-wide pt-1 sm:pt-2"
                  style={{ fontSize: 'clamp(1.1rem,3vw,2.5rem)' }}>
                  Структурированные кабельные системы
                </h3>
              </div>
              <ul className="mt-5 sm:mt-8 space-y-3 sm:space-y-4">
                {[
                  'Локально-вычислительные сети.',
                  'Беспроводные сети WIFI.',
                  'Волоконно-оптические линии связи.',
                  'Системы телефонной связи.',
                  'Центры обработки данных.',
                  'Системы администрирования и мониторинга ЛВС.',
                  'Системы коллективного приема телевидения.',
                  'Системы радиофикации.',
                  'Системы часофикации.',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 sm:gap-4 text-[#ccc]"
                    style={{ fontSize: 'clamp(0.9rem,2vw,1.4rem)' }}>
                    <span className="w-2 h-2 rounded-full bg-[#FF6B00] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 sm:mt-16 border-t border-[#2a2a2a] pt-10 sm:pt-16">
            <div className="flex items-start gap-3 sm:gap-5">
              <span className="font-heading text-[#FF6B00] shrink-0 leading-none" style={{ fontSize: 'clamp(2rem,6vw,5rem)', opacity: 0.25 }}>03</span>
              <h3 className="font-heading uppercase tracking-wide pt-1 sm:pt-2"
                style={{ fontSize: 'clamp(1.1rem,3vw,2.5rem)' }}>
                Системы физической и пожарной безопасности
              </h3>
            </div>
            <ul className="mt-5 sm:mt-8 space-y-3 sm:space-y-4">
              {[
                'Автоматические системы пожарной сигнализации.',
                'Системы речевого оповещения, управления эвакуацией.',
                'Противопожарная автоматика.',
                'Системы видеонаблюдения.',
                'Видео-аналитические системы.',
                'Системы контроля и управления доступом.',
                'Системы охраны периметра.',
                'Системы охранной сигнализации.',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 sm:gap-4 text-[#999]"
                  style={{ fontSize: 'clamp(0.9rem,2vw,1.4rem)' }}>
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 sm:mt-16 border-t border-[#2a2a2a] pt-10 sm:pt-16">
            <div className="flex items-start gap-3 sm:gap-5">
              <span className="font-heading text-[#FF6B00] shrink-0 leading-none" style={{ fontSize: 'clamp(2rem,6vw,5rem)', opacity: 0.25 }}>04</span>
              <h3 className="font-heading uppercase tracking-wide pt-1 sm:pt-2"
                style={{ fontSize: 'clamp(1.1rem,3vw,2.5rem)' }}>
                Системы автоматического пожаротушения
              </h3>
            </div>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { title: 'Тонкораспыленная вода', icon: 'Droplets' },
                { title: 'Порошковое', icon: 'Wind' },
                { title: 'Аэрозольное', icon: 'CloudFog' },
                { title: 'Газовое', icon: 'Flame' },
                { title: 'Противопожарный водопровод', icon: 'Pipette' },
                { title: 'Спринклерная система', icon: 'Sprout' },
              ].map((item, i) => (
                <div key={i}
                  className="group rounded-2xl border border-[#FF6B00] bg-[#111] p-4 sm:p-6 cursor-default shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center mb-3 sm:mb-4">
                    <Icon name={item.icon} fallback="Flame" size={18} className="text-[#FF6B00]" />
                  </div>
                  <p className="font-heading uppercase tracking-wide text-xs sm:text-sm text-white leading-tight">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Фото реализованных объектов */}
            <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  url: 'https://cdn.poehali.dev/files/bc20d88a-1f60-4326-8b8e-a769ca57276a.JPG',
                  alt: 'Монтаж трубопровода системы пожаротушения на промышленном объекте',
                },
                {
                  url: 'https://cdn.poehali.dev/files/3b2de87b-c306-4d64-b31b-f2950107cdb7.JPG',
                  alt: 'Разводка трубопровода пожаротушения в металлоконструкциях перекрытия',
                },
              ].map((photo, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-[#2a2a2a] group cursor-pointer"
                  style={{ aspectRatio: '16/10' }}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white/90 text-xs sm:text-sm font-medium leading-snug">{photo.alt}</p>
                  </div>
                  {/* orange corner accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── АХП ───────────────────────────────────────────────────────── */}
      <section className="border-y border-[#2a2a2a] overflow-hidden content-lazy relative" style={{ minHeight: 'clamp(280px, 50vw, 560px)' }}>
        {/* Фоновое изображение */}
        <img
          src="https://cdn.poehali.dev/files/77238577-73bb-4a6c-ac4e-5e8d3a1e0d58.png"
          alt="Архитектурно-художественная подсветка"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Затемняющий градиент сверху — затемняем небо для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/60" />

        {/* Подпись в зоне чистого неба */}
        <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="font-heading text-[#FF6B00] shrink-0 leading-none drop-shadow-lg" style={{ fontSize: 'clamp(2rem,6vw,5rem)', opacity: 0.7 }}>05</span>
            <h2 className="font-heading uppercase tracking-wide text-white drop-shadow-lg"
              style={{ fontSize: 'clamp(1.3rem,3.5vw,3rem)', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
              Архитектурно-художественная подсветка
            </h2>
          </div>
        </div>
      </section>

      {/* ─── ДИНАМИЧЕСКАЯ ПОДСВЕТКА ─────────────────────────────────────── */}
      <section className="border-b border-[#2a2a2a] content-lazy">
        <img
          src="https://cdn.poehali.dev/files/31860322-6c88-483c-8ef8-d091fd1cdfda.png"
          alt="Динамическая подсветка — учитываем индивидуальность каждого проекта"
          loading="lazy"
          decoding="async"
          className="w-full block"
        />
      </section>

      {/* ─── НАШ ОПЫТ ──────────────────────────────────────────────────── */}
      <section className="section-pad px-4 sm:px-6 max-w-7xl mx-auto" ref={statsRef}>
        <div className="mb-8 sm:mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Цифры</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)' }}>
            Наш опыт
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatCard value={10} suffix="+" label="лет на рынке (с 2015)" started={statsStarted} />
          <StatCard value={50} suffix="+" label="завершённых объектов" started={statsStarted} />
          <StatCard value={4} suffix="" label="профильные лицензии СРО" started={statsStarted} />
          <StatCard value={3} suffix=" года" label="гарантия на работы" started={statsStarted} />
          <StatCard value={80} suffix="+" label="специалистов в штате" started={statsStarted} />
          <div className="reveal card-hover rounded-2xl p-4 sm:p-6 bg-[#111111] text-left flex flex-col justify-between">
            <div className="font-heading text-2xl sm:text-3xl gradient-text mb-1">Под ключ</div>
            <div className="text-[#999] text-sm">от проекта до сдачи объекта</div>
          </div>
        </div>
      </section>

      {/* ─── ПОРТФОЛИО ─────────────────────────────────────────────────── */}
      <section id="portfolio" className="section-pad px-4 sm:px-6 max-w-7xl mx-auto content-lazy">
        <div className="mb-8 sm:mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Портфолио</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)' }}>
            Наши объекты
          </h2>
        </div>

        {/* Карусель с flip — адаптивное соотношение сторон */}
        <div className="reveal relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0">
          {portfolio.map((p, i) => {
            const isActive = i === portfolioIdx;
            const hasInfo = !!(p.address || p.year || (p.works && p.works.length));
            return (
              <div key={i}
                className="absolute inset-0"
                style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: isActive ? 'auto' : 'none' }}>

                <div className="portfolio-flip-scene">
                  <div className={`portfolio-flip-card${isActive && portfolioFlipped ? ' flipped' : ''}`}>

                    {/* ЛИЦО */}
                    <div className="portfolio-flip-front">
                      <img src={p.img} alt={p.label} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase mb-1">
                            {portfolioIdx + 1} / {portfolio.length}
                          </p>
                          <span className="font-heading text-white uppercase tracking-wide block truncate"
                            style={{ fontSize: 'clamp(0.95rem,2.5vw,2rem)' }}>
                            {p.label}
                          </span>
                        </div>
                        {hasInfo && (
                          <button
                            onClick={() => setPortfolioFlipped(true)}
                            className="flex items-center gap-1.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-medium px-3 py-2 sm:px-4 rounded-full transition-all shrink-0 z-10 min-h-[36px]">
                            <Icon name="Info" size={13} />
                            <span className="hidden xs:inline">Подробнее</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ОБОРОТ */}
                    <div className="portfolio-flip-back p-4 sm:p-8 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
                        <h3 className="font-heading text-white uppercase tracking-wide text-sm sm:text-base leading-tight">
                          {p.label}
                        </h3>
                        <button onClick={() => setPortfolioFlipped(false)}
                          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#FF6B00] transition-colors">
                          <Icon name="X" size={16} className="text-white" />
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3 mb-4 sm:mb-6">
                        {p.address && (
                          <div>
                            <p className="text-[#FF6B00] text-xs uppercase tracking-[0.15em] mb-1">Адрес</p>
                            <p className="text-[#ccc] text-xs sm:text-sm">{p.address}</p>
                          </div>
                        )}
                        {p.year && (
                          <div>
                            <p className="text-[#FF6B00] text-xs uppercase tracking-[0.15em] mb-1">Год окончания работ</p>
                            <p className="text-[#ccc] text-xs sm:text-sm">{p.year}</p>
                          </div>
                        )}
                      </div>
                      {p.works && p.works.length > 0 && (
                        <>
                          <p className="text-[#FF6B00] text-xs uppercase tracking-[0.15em] mb-2 sm:mb-3">Работы</p>
                          <ul className="space-y-2 overflow-y-auto">
                            {p.works.map((w, wi) => (
                              <li key={wi} className="flex gap-2 sm:gap-3 text-xs sm:text-sm text-[#bbb] leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
          </div>

          {/* Кнопки навигации */}
          <button onClick={portfolioPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/20 hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-all z-10">
            <Icon name="ChevronLeft" size={18} className="text-white" />
          </button>
          <button onClick={portfolioNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/20 hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-all z-10">
            <Icon name="ChevronRight" size={18} className="text-white" />
          </button>

          {/* Точки */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 sm:left-auto sm:right-8 -translate-x-1/2 sm:translate-x-0 flex gap-1.5 sm:gap-2 z-10">
            {portfolio.map((_, i) => (
              <button key={i} onClick={() => portfolioGoTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === portfolioIdx ? 'w-5 sm:w-6 bg-[#FF6B00]' : 'w-1.5 bg-white/40 hover:bg-white/70'}`} />
            ))}
          </div>
        </div>

        {/* Превью миниатюр — на мобильных горизонтальный скролл */}
        <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {portfolio.map((p, i) => (
            <button key={i} onClick={() => portfolioGoTo(i)}
              className={`rounded-xl overflow-hidden transition-all duration-300 shrink-0 w-[22vw] sm:w-auto ${i === portfolioIdx ? 'ring-2 ring-[#FF6B00] opacity-100' : 'opacity-50 hover:opacity-80'}`}
              style={{ aspectRatio: '4/3' }}>
              <img src={p.img} alt={p.label} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* ─── ФОРМА ОБРАТНОЙ СВЯЗИ ──────────────────────────────────────── */}
      <ContactForm />

      {/* ─── КОНТАКТЫ ──────────────────────────────────────────────────── */}
      <section id="contacts" className="section-pad px-4 sm:px-6 bg-[#0d0d0d] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12 reveal">
            <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Контакты</span>
            <h2 className="font-heading uppercase tracking-wide mt-2"
              style={{ fontSize: 'clamp(1.8rem,4vw,3.5rem)' }}>
              Свяжитесь с нами
            </h2>
          </div>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: 'Phone', label: '+7 (495) 978-00-55', href: 'tel:+74959780055' },
              { icon: 'Mail', label: 'info@strong-montage.ru', href: 'mailto:info@strong-montage.ru' },
              { icon: 'Send', label: '@strongmontage', href: 'https://t.me/strongmontage' },
              { icon: 'MapPin', label: 'Москва, ул. Братеевская, д. 18, кор. 3', href: '#' },
            ].map((c, i) => (
              <a key={i} href={c.href}
                className="flex items-center gap-3 sm:gap-4 group min-h-[52px] p-4 sm:p-5 rounded-2xl bg-[#111111] border border-[#2a2a2a] hover:border-[#FF6B00] transition-colors active:border-[#FF6B00]">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] group-hover:border-[#FF6B00] transition-colors">
                  <Icon name={c.icon} fallback="Phone" size={18} className="text-[#FF6B00]" />
                </div>
                <span className="text-[#999] group-hover:text-[#f0f0f0] transition-colors text-sm">{c.label}</span>
              </a>
            ))}
          </div>
          <div className="reveal mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#2a2a2a]">
            <p className="text-[#999] text-sm leading-relaxed">
              Работаем с юридическими лицами и ИП. Заключаем договор, предоставляем полный пакет закрывающих документов.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#2a2a2a] px-4 sm:px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <a href="#" className="flex items-center shrink-0">
              <img src="https://cdn.poehali.dev/files/e27b0206-9ac5-4550-810a-31cb94bf6f77.png" alt="Стронг-Монтаж" loading="lazy" decoding="async" className="h-12 sm:h-14 w-auto" />
            </a>
            {/* Nav — скрываем на малых экранах, показываем на md+ */}
            <nav className="hidden md:flex gap-6 flex-wrap justify-center">
              {navLinks.map(l => (
                <a key={l.href} href={l.href}
                  className="text-[#555] text-sm hover:text-[#FF6B00] transition-colors min-h-[44px] flex items-center">
                  {l.label}
                </a>
              ))}
            </nav>
            {/* На мобильных — компактная сетка */}
            <nav className="md:hidden grid grid-cols-2 gap-x-8 gap-y-1 w-full">
              {navLinks.map(l => (
                <a key={l.href} href={l.href}
                  className="text-[#555] text-sm hover:text-[#FF6B00] transition-colors py-2 flex items-center">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="border-t border-[#1a1a1a] pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="text-[#444] text-xs space-y-0.5">
              <p>© 2015–2026 ООО «Стронг-Монтаж»</p>
              <p className="hidden sm:block">ИНН: 7724302834 · ОГРН: 1157746041144 · 115408, г. Москва, ул. Братеевская, д. 18, кор. 3, этаж 1, пом. VI, ком. 1</p>
              <p className="sm:hidden">ИНН: 7724302834 · г. Москва</p>
            </div>
            <a href="/privacy" className="text-[#555] text-xs hover:text-[#FF6B00] transition-colors whitespace-nowrap">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </footer>

      {/* ─── ПЛАВАЮЩАЯ КНОПКА "ПОЗВОНИТЬ" (только мобайл) ───────────────── */}
      <a href="tel:+74959780055"
        className="mobile-cta fixed bottom-6 right-4 z-40 items-center gap-2 gradient-bg text-white font-medium px-5 py-3.5 rounded-full shadow-lg shadow-[#FF6B00]/30 hover:opacity-90 transition-all active:scale-95 min-h-[52px]">
        <Icon name="Phone" size={18} />
        <span className="text-sm font-semibold">Позвонить</span>
      </a>

      {/* ─── COOKIE-БАННЕР ──────────────────────────────────────────────── */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t border-[#2a2a2a] px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-[#999] text-xs sm:text-sm leading-relaxed">
              Мы используем файлы cookie для корректной работы сайта.{' '}
              <a href="/privacy" className="text-[#FF6B00] hover:underline">Подробнее</a>.
            </p>
            <button onClick={acceptCookies}
              className="w-full sm:w-auto shrink-0 gradient-bg text-white text-sm font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-all whitespace-nowrap min-h-[44px]">
              Принять
            </button>
          </div>
        </div>
      )}
    </div>
  );
}