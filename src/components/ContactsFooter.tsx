import { useState } from 'react';
import Icon from '@/components/ui/icon';

const navLinks = [
  { href: '#about', label: 'О компании' },
  { href: '#services', label: 'Услуги' },
  { href: '#portfolio', label: 'Портфолио' },
  { href: '#contacts', label: 'Контакты' },
];

export default function ContactsFooter() {
  const [formState, setFormState] = useState<'idle' | 'sent'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('sent');
    setTimeout(() => setFormState('idle'), 3000);
  }

  return (
    <>
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
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="6" fill="#FF6B00"/>
              <path d="M8 26 L18 10 L28 26 Z" fill="white" opacity="0.9"/>
              <rect x="14" y="20" width="8" height="6" fill="white" opacity="0.7"/>
            </svg>
            <span className="font-heading text-sm tracking-widest uppercase text-[#999]">Стронг-Монтаж</span>
          </div>
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
    </>
  );
}
