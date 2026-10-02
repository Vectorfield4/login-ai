export const information_monitoringRu = {
  ctaBanner: {
    title: "Настроим мониторинг под ваши темы",
    text: "Назовите источники и запросы. Покажем демо-дашборд с упоминаниями, тональностью и динамикой на ваших данных.",
    buttonLabel: "Запросить демо",
  },
  navTitle: "Мониторинг информации",
  title: "Сбор и мониторинг информации на заказ",
  tagline: "Парсинг, мониторинг цен, конкурентов и упоминаний – нужные данные в нужный момент.",
  description:
    "Собираем информацию из открытых источников: сайты, маркетплейсы, соцсети, СМИ. Настраиваем регулярный мониторинг с отчётами и оповещениями, чтобы вы всегда знали, что происходит на рынке.",
  features: [
    {
      title: "Парсинг данных",
      text: "Сбор данных с сайтов и маркетплейсов по заданным правилам: каталоги, цены, характеристики, отзывы.",
    },
    {
      title: "Мониторинг конкурентов",
      text: "Следим за ценами, акциями, ассортиментом и контентом конкурентов – изменения фиксируются автоматически.",
    },
    {
      title: "Мониторинг СМИ и соцсетей",
      text: "Упоминания бренда и тематики в новостях, Telegram, VK и отзывах – с тональностью и источниками.",
    },
    {
      title: "Отчёты и оповещения",
      text: "Регулярные дайджесты, алерты при важных изменениях и выгрузка данных в Excel, API или вашу CRM.",
    },
  ],
  processSteps: [
    {
      title: "Определение задачи",
      text: "Фиксируем, какие данные нужны: источники, поля, периодичность и формат выдачи.",
    },
    {
      title: "Сборка парсера",
      text: "Настраиваем сбор с учётом объёмов, изменений вёрстки и ограничений источников. Пишем под ваш стек или разворачиваем готовый.",
    },
    {
      title: "Тест и валидация",
      text: "Сверяем собранные данные с контрольной выборкой. Убеждаемся, что цифры не теряются и не дублируются.",
    },
    {
      title: "Мониторинг в проде",
      text: "Запускаем по графику, настраиваем алерты и отчёты. Обновляем сбор при изменениях на источниках.",
    },
  ],
  fitItems: [
    {
      title: "Цены и ассортимент рынка",
      text: "Нужно знать цену конкурентов сегодня, а не через месяц. Регулярный парсинг даёт свежие данные и экономит ручной труд.",
      positive: true,
    },
    {
      title: "Упоминания и репутация",
      text: "Бренд обсуждают на площадках и в СМИ. Мониторинг с тональностью показывает, где отвечать.",
      positive: true,
    },
    {
      title: "Разовый сбор данных",
      text: "Одноразовая выгрузка на 100 строк дешевле ручной работы, чем разработка: оценим, что выгоднее.",
      positive: false,
    },
    {
      title: "Закрытые или нестабильные источники",
      text: "Если данные защищены авторизацией или их структура меняется каждый день, сбор дорожает и требует поддержки.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Ежедневный мониторинг цен конкурентов",
      text: "Парсер собирал цены и наличие по каталогу конкурентов в ежедневный отчёт. Менеджеры перестали перепроверять вручную и стали быстрее реагировать на рынок.",
      metricValue: "−80%",
      metricLabel: "времени на ручной мониторинг цен",
    },
  ],
  faqItems: [
    {
      question: "Не нарушает ли парсинг закон?",
      answer:
        "Собираем только открытые данные и соблюдаем условия источников. Для закрытых данных обсуждаем альтернативы и проверяем правовую сторону до старта.",
    },
    {
      question: "Какие источники поддерживаются?",
      answer:
        "Сайты, маркетплейсы, соцсети, СМИ, Telegram и открытые API. Любой источник с доступным HTML или API можно разобрать.",
    },
    {
      question: "Как часто обновляются данные?",
      answer:
        "От раза в час до раза в день по заданию. График и объёмы фиксируем, чтобы сбор успевал за изменениями источников.",
    },
    {
      question: "Что придёт с первым запуском?",
      answer:
        "Рабочий сбор, контрольная проверка данных и настройка отчётов или алертов. Дальше поддерживаем и дорабатываем.",
    },
  ],
  sections: [
    {
      title: "Как данные остаются точными",
      items: [
        "Контрольную выборку сверяем вручную на старте: пятьдесят записей из каталога и отчёта. Если число в парсере расходится с источником, мы находим причину до того, как на эти данные будут приняты решения о ценах.",
        "Сбор фиксирует дату и время каждой выгрузки. Когда цена меняется, видно момент изменения, а не только текущее значение, и это отличает работающий мониторинг от простого скриншота страницы.",
        "Схему данных закрепляем: артикул, производитель, цена, наличие, рейтинг. Поля, которых нет на странице поставщика, помечаем отдельно, чтобы пустая ячейка не превратилась в «продаж нет».",
        "Сбой источника не маскируем под «данные собраны». Если сайт вернул ошибку, алерт приходит вам в течение часа, а не в пятничном отчёте, где цифра уже выглядит правдоподобной.",
        "Версии вёрстки отслеживаем автоматически. Когда магазин меняет страницу каталога, сбор обновляется за день, и история цен не прерывается из-за того, что селектор устарел.",
        "Юридическую сторону проясняем до старта: какие источники можно использовать и на каких условиях. Потом не прилетает внезапное письмо от источника с требованием прекратить сбор.",
      ],
    },
    {
      title: "Куда уходят собранные данные",
      items: [
        "Отчёт в Excel или Google Sheets собирается по графику: утром понедельника вы открываете свежие цифры, а не тратите два часа на ручной обход пяти каталогов.",
        "Алерты срабатывают на события: цена конкурента упала на десять процентов, товар закончился, появился новый конкурент. Уведомление в Telegram приходит в момент изменения, и вы реагируете в тот же день.",
        "Загрузку в вашу CRM или ERP настраиваем через API: данные попадают в рабочие процессы без промежуточных таблиц. Интеграцию тестируем на небольшом объеме, чтобы ошибка формата не завалила базу.",
        "Дайджест для коллег без доступа к системе собирается отдельно от сырых данных. Сводка показывает только то, что нужно для решения, и не тонет в тысяче строк исходной выгрузки.",
        "Историю накапливаем три месяца и больше, чтобы тренд был виден, а не только точка. Сезонные колебания перестают выглядеть как внезапное падение или взлёт вашего отдела закупок.",
        "Если данные нужны разово, считаем оба варианта: ручной сбор против парсинга. Для выгрузки на сто строк ручной труд часто дешевле поддержки парсера, и мы честно говорим об этом до старта.",
      ],
    },
  ],
};

export const information_monitoringEn = {
  ctaBanner: {
    title: "We'll set up monitoring for your topics",
    text: "Name your sources and queries. We'll show a demo dashboard with mentions, sentiment, and dynamics on your data.",
    buttonLabel: "Request a demo",
  },
  navTitle: "Information Monitoring",
  title: "Custom Data Collection and Monitoring",
  tagline: "Parsing, price, competitor, and mention monitoring – the right data at the right time.",
  description:
    "We collect information from open sources: websites, marketplaces, social media, and press. We set up regular monitoring with reports and alerts so you always know what's happening in the market.",
  features: [
    {
      title: "Data parsing",
      text: "Collecting data from websites and marketplaces by custom rules: catalogs, prices, specs, reviews.",
    },
    {
      title: "Competitor monitoring",
      text: "We track competitors' prices, promotions, assortment, and content – changes are captured automatically.",
    },
    {
      title: "Media & social monitoring",
      text: "Brand and topic mentions in news, Telegram, VK, and reviews – with sentiment and sources.",
    },
    {
      title: "Reports and alerts",
      text: "Regular digests, alerts on important changes, and data export to Excel, API, or your CRM.",
    },
  ],
  processSteps: [
    {
      title: "Define the task",
      text: "We fix which data you need: sources, fields, frequency, and delivery format.",
    },
    {
      title: "Build the parser",
      text: "We set up collection for volume, layout changes, and source limits. We build for your stack or deploy a ready one.",
    },
    {
      title: "Test and validation",
      text: "We compare collected data against a control sample. We make sure no numbers are lost or duplicated.",
    },
    {
      title: "Production monitoring",
      text: "We run on schedule, add alerts and reports. We update collection when sources change layout.",
    },
  ],
  fitItems: [
    {
      title: "Market prices and assortment",
      text: "You need to know competitors' prices today, not in a month. Regular parsing gives fresh data and saves manual work.",
      positive: true,
    },
    {
      title: "Mentions and reputation",
      text: "Your brand is discussed across platforms and press. Sentiment monitoring shows where to reply.",
      positive: true,
    },
    {
      title: "A one-off data pull",
      text: "For a single export of a hundred rows, manual work is cheaper than engineering. We estimate which makes sense.",
      positive: false,
    },
    {
      title: "Closed or unstable sources",
      text: "If data is behind a login or the structure changes daily, collection gets expensive and needs support.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Daily competitor price monitoring",
      text: "A parser collected competitor prices and availability into a daily report. Managers stopped double-checking by hand and reacted to the market faster.",
      metricValue: "−80%",
      metricLabel: "time spent on manual price checks",
    },
  ],
  faqItems: [
    {
      question: "Is parsing legal?",
      answer:
        "We collect only open data and respect source terms. For closed data we discuss alternatives and verify the legal side before starting.",
    },
    {
      question: "Which sources are supported?",
      answer:
        "Websites, marketplaces, social media, press, Telegram, and open APIs. Any source with readable HTML or an API can be parsed.",
    },
    {
      question: "How often is data updated?",
      answer:
        "From once an hour to once a day per your spec. We fix the schedule and volumes so collection keeps up with source changes.",
    },
    {
      question: "What do we get at first launch?",
      answer:
        "A working collection, a control check of the data, and configured reports or alerts. Then we support and extend it.",
    },
  ],
  sections: [
    {
      title: "How the data stays accurate",
      items: [
        "We verify a control sample by hand at the start: fifty catalog and report records. If a number in the parser differs from the source, we find the cause before decisions about pricing are made on that data.",
        "Collection records the date and time of every export. When a price changes, you see the moment of change, not just the current value, and that separates working monitoring from a simple page screenshot.",
        "We fix the data schema: SKU, manufacturer, price, availability, rating. Fields missing from a supplier page are marked separately, so an empty cell never becomes “out of stock”.",
        "A source failure is not masked as “data collected”. If a site returns an error, an alert reaches you within an hour instead of appearing in Friday's report looking plausible.",
        "We track layout versions automatically. When a store redesigns its catalog page, collection updates within a day and the price history is not interrupted by an outdated selector.",
        "We clarify the legal side before starting: which sources may be used and under what terms. Then no abrupt letter from a source lands asking you to stop collecting.",
      ],
    },
    {
      title: "Where the collected data goes",
      items: [
        "A report in Excel or Google Sheets is built on schedule: you open fresh numbers on Monday morning instead of spending two hours walking five catalogs by hand.",
        "Alerts fire on events: a competitor price dropped ten percent, a product ran out, a new competitor appeared. A Telegram notification arrives at the moment of change, and you react the same day.",
        "We load data into your CRM or ERP over an API so it enters working processes without intermediate spreadsheets. The integration is tested on a small volume so a format error does not flood the database.",
        "A digest for colleagues who do not have system access is built separately from raw data. The summary shows only what is needed for a decision and does not sink in a thousand rows of source output.",
        "We keep history for three months and longer so a trend is visible, not just a point. Seasonal swings stop looking like a sudden drop or surge in your purchasing department.",
        "If you need data once, we estimate both options: manual collection versus parsing. For an export of a hundred rows, manual work is often cheaper than parser support, and we say so honestly before you commit.",
      ],
    },
  ],
};
