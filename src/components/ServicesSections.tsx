import Icon from '@/components/ui/icon';

const clients = [
  'Ростелеком', 'ВТБ Арена', 'Лужники', 'Мегафон', 'МКЖД',
  'Парк Патриот', 'Леруа Мерлен', 'ГБУ МФЦ', 'Мед. Кластер', 'Сбер', 'Сколково'
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

export default function ServicesSections() {
  return (
    <>
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
        <div className="marquee-wrapper overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-0" style={{ width: 'max-content' }}>
            {[...clients, ...clients].map((c, i) => (
              <span key={i}
                className="font-heading text-2xl uppercase tracking-widest text-[#555] hover:text-[#FF6B00] transition-colors cursor-default px-8"
                style={{ userSelect: 'none' }}>
                {c}
              </span>
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
        <div className="mb-12 reveal">
          <span className="text-[#FF6B00] text-xs font-medium tracking-[0.2em] uppercase">Направления</span>
          <h2 className="font-heading uppercase tracking-wide mt-2"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}>
            Наши услуги
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <div key={i} className="reveal card-hover rounded-2xl p-8 bg-[#111111]"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-[#FF6B00]/10">
                  <Icon name={s.icon} fallback="Settings" size={22} className="text-[#FF6B00]" />
                </div>
                <h3 className="font-heading text-xl uppercase tracking-wide pt-2">{s.title}</h3>
              </div>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-[#999] text-sm">
                    <span className="w-1 h-1 rounded-full bg-[#FF6B00] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
    </>
  );
}
