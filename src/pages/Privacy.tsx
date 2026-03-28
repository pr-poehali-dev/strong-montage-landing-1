export default function Privacy() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-[#FF6B00] text-sm hover:underline mb-8 inline-block">← На главную</a>

        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
          Политика конфиденциальности
        </h1>
        <p className="text-[#999] text-sm mb-10">и обработки персональных данных</p>

        <div className="space-y-8 text-[#ccc] leading-relaxed text-sm">

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">1. Общие положения</h2>
            <p>Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки и защиты персональных данных физических лиц (далее — Пользователей) при использовании сайта <strong>strong-montage.ru</strong> (далее — Сайт), принадлежащего ООО «Стронг-Монтаж» (далее — Оператор).</p>
            <p className="mt-2">Оператор обрабатывает персональные данные в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и иными применимыми нормативными актами Российской Федерации.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">2. Сведения об Операторе</h2>
            <ul className="space-y-1">
              <li><span className="text-[#FF6B00]">Наименование:</span> Общество с ограниченной ответственностью «Стронг-Монтаж»</li>
              <li><span className="text-[#FF6B00]">ИНН:</span> 7724302834</li>
              <li><span className="text-[#FF6B00]">ОГРН:</span> 1157746041144</li>
              <li><span className="text-[#FF6B00]">Юридический адрес:</span> 115408, г. Москва, ул. Братеевская, д. 18, кор. 3, этаж 1, помещение VI, комната 1</li>
              <li><span className="text-[#FF6B00]">Email:</span> info@strong-montage.ru</li>
              <li><span className="text-[#FF6B00]">Телефон:</span> +7 (495) 978-00-55</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">3. Состав персональных данных</h2>
            <p>Оператор обрабатывает следующие персональные данные, предоставляемые Пользователем добровольно через форму обратной связи:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Имя (фамилия, имя, отчество при наличии);</li>
              <li>Номер телефона;</li>
              <li>Содержание сообщения (при заполнении поля «Сообщение»).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">4. Цели обработки</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>Обработка входящих обращений и заявок;</li>
              <li>Обратная связь с Пользователями по вопросам деятельности Оператора;</li>
              <li>Заключение и исполнение договоров.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">5. Правовое основание</h2>
            <p>Обработка персональных данных осуществляется на основании согласия Пользователя (ст. 9 Федерального закона № 152-ФЗ), выраженного путём проставления отметки в соответствующем чекбоксе перед отправкой формы.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">6. Срок хранения</h2>
            <p>Персональные данные хранятся не дольше, чем этого требуют цели их обработки, но не более <strong>3 (трёх) лет</strong> с момента получения согласия, либо до его отзыва.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">7. Передача третьим лицам</h2>
            <p>Оператор не передаёт персональные данные третьим лицам без согласия Пользователя, за исключением случаев, предусмотренных законодательством Российской Федерации.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">8. Использование Cookie</h2>
            <p>Сайт использует файлы cookie для обеспечения корректной работы функций сайта и аналитики. Продолжая использование Сайта, Пользователь соглашается с использованием cookie-файлов. Пользователь вправе отключить cookie в настройках браузера, однако это может повлиять на работу отдельных функций Сайта.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">9. Права Пользователя</h2>
            <p>Пользователь вправе:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Получать информацию об обработке его персональных данных;</li>
              <li>Требовать уточнения, блокирования или уничтожения персональных данных;</li>
              <li>Отозвать согласие на обработку, направив запрос на email: <a href="mailto:info@strong-montage.ru" className="text-[#FF6B00] hover:underline">info@strong-montage.ru</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">10. Защита данных</h2>
            <p>Оператор принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3 uppercase tracking-wide">11. Изменение Политики</h2>
            <p>Оператор вправе вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента её публикации на Сайте. Актуальная версия всегда доступна по адресу: <strong>/privacy</strong>.</p>
          </section>

          <p className="text-[#555] text-xs pt-4 border-t border-[#2a2a2a]">Дата последнего обновления: январь 2026 г.</p>
        </div>
      </div>
    </div>
  );
}