import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const navLinks = [
  { href: '#about', label: 'О компании' },
  { href: '#services', label: 'Услуги' },
  { href: '#portfolio', label: 'Портфолио' },
  { href: '#contacts', label: 'Контакты' },
];

export default function HeaderHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ─── HEADER ────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        style={{ height: 72 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-6">
          <a href="#" className="flex items-center shrink-0 min-h-[44px]">
            <svg viewBox="0 0 200 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 48, width: 'auto' }}>
              {/* Cube left face */}
              <polygon points="18,14 42,28 42,56 18,42" fill="#F5A800"/>
              {/* Cube right face */}
              <polygon points="42,28 66,14 66,42 42,56" fill="#D63B10"/>
              {/* Cube top face */}
              <polygon points="18,14 42,0 66,14 42,28" fill="#E84C0E"/>
              {/* Highlight */}
              <line x1="18" y1="14" x2="42" y2="0" stroke="#FFD080" strokeWidth="1" opacity="0.7"/>
              {/* Text line 1 */}
              <text x="76" y="32" fontFamily="Oswald,Arial,sans-serif" fontWeight="700" fontSize="20" fill="#FF6B00" letterSpacing="1.5">СТРОНГ-</text>
              {/* Text line 2 */}
              <text x="76" y="56" fontFamily="Oswald,Arial,sans-serif" fontWeight="700" fontSize="20" fill="#FF6B00" letterSpacing="1.5">МОНТАЖ</text>
            </svg>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-[#999] hover:text-[#FF6B00] transition-colors duration-200 min-h-[44px] flex items-center">
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contacts"
            className="hidden md:flex items-center gap-2 gradient-bg text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity min-h-[44px]">
            Связаться
          </a>

          <button onClick={() => setMenuOpen(v => !v)}
            className="md:hidden text-[#f0f0f0] min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Меню">
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.06)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px shimmer-line" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-1.5 text-xs text-[#999] mb-8 reveal">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            Работаем с 2015 года · Москва
          </div>

          <h1 className="font-heading gradient-text uppercase tracking-wide leading-none mb-6 reveal"
            style={{ fontSize: 'clamp(3rem,8vw,7rem)' }}>
            Стронг-Монтаж
          </h1>

          <p className="font-heading uppercase tracking-[0.08em] text-[#f0f0f0] mb-6 reveal"
            style={{ fontSize: 'clamp(1.1rem,2.5vw,1.6rem)' }}>
            Безопасные сети. Яркие решения.
          </p>

          <p className="text-[#999] leading-relaxed mx-auto mb-10 reveal"
            style={{ maxWidth: '56ch', fontSize: 'clamp(0.95rem,1.5vw,1.05rem)' }}>
            Полный цикл монтажа инженерных систем: от проектирования и поставки оборудования
            до строительно-монтажных и пусконаладочных работ.
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555]">
          <span className="text-xs tracking-widest uppercase">Прокрутите</span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </div>
      </section>
    </>
  );
}