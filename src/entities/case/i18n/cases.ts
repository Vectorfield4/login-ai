export const casesRu = {
  cases: {
    "retail-support-bot": {
      title: "Агентная поддержка интернет-магазина",
      tagline: "Заявки, заказы и документы – без участия оператора",
      description:
        "ИИ-агент принимает обращения из чата и почты, уточняет детали, оформляет заказы и передаёт их в CRM. Операторы подключаются только к нестандартным ситуациям.",
      metrics: [
        { label: "Время обработки обращения", value: "−70 %" },
        { label: "Обращения без оператора", value: "82 %" },
        { label: "Доступность", value: "24/7" },
      ],
      counters: [
        "Обращений в месяц",
        "Заказов без оператора, %",
        "Сэкономленных часов оператора в день",
      ],
      problem: {
        title: "Почему это критично",
        0: {
          title: "Ручная обработка не масштабируется",
          text: "Рост заказов означает новых операторов, а время ответа в пиковые часы растёт – покупатели уходят в магазины, где отвечают сразу.",
        },
        1: {
          title: "Ошибки повторяются",
          text: "Однотипные ошибки в ценах, наличии и сроках приводят к возвратам и негативным отзывам, которые видны всем покупателям.",
        },
      },
      solution: {
        title: "Что мы сделали",
        0: {
          title: "Агент в чате и почте",
          text: "ИИ-агент принимает обращения из чата сайта, мессенджеров и почты, уточняет детали и отвечает в стиле бренда.",
        },
        1: {
          title: "Заказы без оператора",
          text: "Интеграция с CRM: агент оформляет заказы, меняет статусы и формирует документы. Оператор подключается только к нестандартным ситуациям.",
        },
        2: {
          title: "Контроль качества",
          text: "Переписка проходит автоматическую проверку тональности, а спорные случаи эскалируются человеку с полным контекстом диалога.",
        },
      },
      dashboard: {
        title: "Показатели внедрения",
        0: { label: "Обращений в день", value: "4 000" },
        1: { label: "Автоответов", value: "91 %" },
        2: { label: "Среднее время ответа", value: "32 с" },
        3: { label: "Заказов без оператора", value: "78 %" },
        4: { label: "Возвратов", value: "−28 %" },
      },
      audiences: {
        title: "Кому это нужно",
        0: {
          title: "Магазины с большим потоком",
          text: "Интернет-магазины и маркетплейсы, где операторы тратят большую часть времени на однотипные вопросы.",
        },
        1: {
          title: "Омниканальная поддержка",
          text: "Компании, которым нужны единый стиль и быстрые ответы в чате, мессенджерах и на почте.",
        },
        2: {
          title: "Рост без найма",
          text: "Бизнес, готовящийся к сезонному всплеску и не желающий расширять штат операторов.",
        },
      },
    },
    "quality-vision-line": {
      title: "Контроль качества на производственной линии",
      tagline: "Компьютерное зрение видит брак раньше человека",
      description:
        "Камеры проверяют каждую единицу продукции в реальном времени и останавливают линию при браке. Модель обучали на архиве дефектов предприятия – и продолжают дообучать на новых данных.",
      metrics: [
        { label: "Пропущенный брак", value: "−90 %" },
        { label: "Скорость проверки", value: "в 5 раз быстрее" },
        { label: "Окупаемость", value: "8 месяцев" },
      ],
    },
    "clinic-ai-assistant": {
      title: "ИИ-ассистент для врачей клиники",
      tagline: "Меньше бумажной работы – больше времени на пациента",
      description:
        "Ассистент готовит записи приёма, подсказывает протоколы и ведёт дневник пациента между визитами. Документация заполняется автоматически – врач только проверяет.",
      metrics: [
        { label: "Время врача на документы", value: "−40 %" },
        { label: "Удержание пациентов на лечении", value: "+25 %" },
        { label: "Доступность ассистента", value: "24/7" },
      ],
    },
    "agency-content-pipeline": {
      title: "Контент-конвейер для рекламного агентства",
      tagline: "Посты, баннеры и рассылки в фирменном стиле",
      description:
        "Генерируем материалы по брифам, проверяем редактором и тональностью и публикуем по календарю. Агентство выпускает в разы больше контента без расширения команды.",
      metrics: [
        { label: "Объём публикаций", value: "×3" },
        { label: "Время на подготовку поста", value: "−60 %" },
        { label: "Вовлечённость аудитории", value: "+30 %" },
      ],
    },
    "product-launch-video": {
      title: "Проморолик запуска продукта",
      tagline: "От сценария до монтажа – за неделю",
      description:
        "Собрали референсы, сгенерировали кадры и смонтировали ролик под площадки: 16:9, 9:16 и 1:1. Согласование стиля с брендбуком заняло три итерации вместо обычных недель.",
      metrics: [
        { label: "Срок производства", value: "7 дней" },
        { label: "Версии под площадки", value: "5" },
        { label: "Стоимость ролика", value: "−50 %" },
      ],
    },
    "marketplace-reputation": {
      title: "Управление репутацией на маркетплейсах",
      tagline: "Мониторинг отзывов и ответы в тоне бренда",
      description:
        "Собираем отзывы с площадок, определяем тональность и отвечаем на каждый: негатив обрабатывается в течение часа. Разбор тем показывает, что улучшить в продукте и карточке товара.",
      metrics: [
        { label: "Время ответа на отзыв", value: "< 1 часа" },
        { label: "Доля негативных отзывов", value: "−35 %" },
        { label: "Рейтинг магазина", value: "4,8 из 5" },
      ],
    },
    "reputation-monitoring-platform": {
      title: "Часовой",
      tagline: "Мониторинг информационного поля в реальном времени",
      description:
        "Всё, что пишут о вашем бренде – 250 000 источников, 109 000 издателей, соцсети и СМИ – собирается в одном дашборде. Нейросеть определяет тональность, сюжеты и риски раньше человека.",
      metrics: [
        { label: "Индекс роста инфополя", value: "72 %" },
        { label: "Позитив в инфополе", value: "78 %" },
        { label: "Точность тональности", value: "95 %+" },
      ],
      counters: [
        "Источников мониторинга",
        "Сообщений СМИ в сутки",
        "Постов соцмедиа в сутки",
        "Издателей в базе",
      ],
      problem: {
        title: "Почему это критично",
        0: {
          title: "Внимание уходит в новые площадки",
          text: "За три года доля аудитории в соцсетях выросла с 23 % до 31 %, а телевидение просело с 59–62 % до 46 %. Репутация обсуждается там, где её сложно увидеть.",
        },
        1: {
          title: "Публикаций становится в разы больше",
          text: "За два года поток сообщений вырос с 20 000 до 300 000 материалов в сутки – в 12 раз. Вручную среагировать невозможно: критичные сигналы тонут в шуме.",
        },
      },
      solution: {
        title: "Решение – «Часовой»",
        0: {
          title: "Нейросеть вместо человека",
          text: "70+ индексов тональности и сущностей понимают смысл публикаций, а не просто упоминания. ИИ замечает угрозы и возможности раньше, чем их увидит пиарщик.",
        },
        1: {
          title: "Мониторинг мгновенный и сплошной",
          text: "250 000 источников и 109 000 издателей – от федеральных СМИ до городских пабликов и отзывов на картах. Свежесть данных – минуты, а не сутки.",
        },
        2: {
          title: "Аналитика под PR, маркетинг и антикризис",
          text: "Сюжеты ИИ, лидеры мнений, география и конкурентная карта – один интерфейс для отчёта руководству и быстрого репутационного аудита.",
        },
      },
      dashboard: {
        title: "Дашборд заказчика",
        0: { label: "Упоминания", value: "12 847" },
        1: { label: "Позитив", value: "78 %" },
        2: { label: "Охват", value: "2.4M" },
        3: { label: "Индекс роста", value: "72 %" },
        4: { label: "Источники", value: "847" },
      },
      depth: {
        title: "Сюжеты ИИ",
        fromLabel: "Общая картина",
        toLabel: "Детальный разбор",
        level: [
          {
            title: "Фон",
            text: "Краткая картина периода: объём упоминаний, топ источников и общая тональность повестки.",
          },
          {
            title: "Тренды",
            text: "Динамика по неделям и площадкам: где аудитория растёт, а где активность затихает.",
          },
          {
            title: "Сюжеты",
            text: "Автоматическая группировка публикаций в сюжетные линии с оценкой концентрации внимания.",
          },
          {
            title: "Герои",
            text: "Персоны и бренды, формирующие повестку: их роль, направленность высказываний и охват.",
          },
          {
            title: "Связи",
            text: "Перекрёстные связи героев и площадок, каналы распространения сюжетов.",
          },
          {
            title: "Прогноз",
            text: "Прогноз развития сюжетов: какие линии наберут вес и в какие сроки.",
          },
          {
            title: "Сценарии",
            text: "Готовые сценарии реакции с оценкой рисков и рекомендуемыми действиями.",
          },
        ],
      },
      audiences: {
        title: "Кому это нужно",
        0: {
          title: "PR-отделы",
          text: "Контроль повестки, своевременная реакция на инфоповоды и отчёты для руководства.",
        },
        1: {
          title: "Антикризисные команды",
          text: "Раннее обнаружение негатива, сценарии ответа и оценка последствий до того, как тема станет публичной.",
        },
        2: {
          title: "Маркетинг",
          text: "Поиск площадок и лидеров мнений, контроль кампаний и оценка их медиаэффекта.",
        },
      },
    },
  },
};

export type CasesRu = typeof casesRu;

export const casesEn: CasesRu = {
  cases: {
    "retail-support-bot": {
      title: "Agentic support for an online store",
      tagline: "Requests, orders and documents – no operator involved",
      description:
        "An AI agent picks up inquiries from chat and email, clarifies details, places orders and pushes them to the CRM. Operators step in only for edge cases.",
      metrics: [
        { label: "Request handling time", value: "−70%" },
        { label: "Inquiries without an operator", value: "82%" },
        { label: "Availability", value: "24/7" },
      ],
      counters: [
        "Inquiries per month",
        "Orders without an operator, %",
        "Operator hours saved per day",
      ],
      problem: {
        title: "Why it matters",
        0: {
          title: "Manual support does not scale",
          text: "Every order increase means hiring more operators, while response time grows at peak hours – customers switch to stores that reply instantly.",
        },
        1: {
          title: "Mistakes keep repeating",
          text: "The same operator errors in prices, stock and delivery times lead to returns and negative reviews that everyone can see.",
        },
      },
      solution: {
        title: "What we did",
        0: {
          title: "An agent in chat and email",
          text: "The AI agent picks up inquiries from the site chat, messengers and email, clarifies details and replies in the brand's tone.",
        },
        1: {
          title: "Orders without an operator",
          text: "A CRM integration: the agent places orders, updates statuses and prepares documents. Operators step in only for edge cases.",
        },
        2: {
          title: "Quality control",
          text: "Every conversation passes an automatic tone check, and disputes are escalated to a human with the full dialogue context.",
        },
      },
      dashboard: {
        title: "Implementation metrics",
        0: { label: "Inquiries per day", value: "4,000" },
        1: { label: "Auto replies", value: "91%" },
        2: { label: "Average response time", value: "32 s" },
        3: { label: "Orders without an operator", value: "78%" },
        4: { label: "Returns", value: "−28%" },
      },
      audiences: {
        title: "Who it is for",
        0: {
          title: "High-volume stores",
          text: "Online stores and marketplaces where operators spend most of their time on repetitive questions.",
        },
        1: {
          title: "Omnichannel support",
          text: "Companies that need one tone and fast replies across chat, messengers and email.",
        },
        2: {
          title: "Growth without hiring",
          text: "Businesses preparing for a seasonal spike without expanding the support team.",
        },
      },
    },
    "quality-vision-line": {
      title: "Quality control on a production line",
      tagline: "Computer vision catches defects before a human does",
      description:
        "Cameras inspect every unit in real time and stop the line when a defect appears. The model was trained on the plant's defect archive and keeps learning from new data.",
      metrics: [
        { label: "Escaped defects", value: "−90%" },
        { label: "Inspection speed", value: "5× faster" },
        { label: "Payback", value: "8 months" },
      ],
    },
    "clinic-ai-assistant": {
      title: "An AI assistant for clinic doctors",
      tagline: "Less paperwork – more time with patients",
      description:
        "The assistant drafts visit notes, suggests clinical protocols, and keeps the patient diary between visits. Documentation is filled in automatically – the doctor just reviews it.",
      metrics: [
        { label: "Doctor time on paperwork", value: "−40%" },
        { label: "Patients staying in treatment", value: "+25%" },
        { label: "Assistant availability", value: "24/7" },
      ],
    },
    "agency-content-pipeline": {
      title: "A content pipeline for an ad agency",
      tagline: "Posts, banners and mailings in brand style",
      description:
        "We generate material from briefs, validate it with an editor and a tone check, and publish on a calendar. The agency ships several times more content without growing the team.",
      metrics: [
        { label: "Publishing volume", value: "×3" },
        { label: "Time to prepare a post", value: "−60%" },
        { label: "Audience engagement", value: "+30%" },
      ],
    },
    "product-launch-video": {
      title: "A promo video for a product launch",
      tagline: "From script to final edit in a week",
      description:
        "We gathered references, generated shots and cut the video for every platform: 16:9, 9:16 and 1:1. Brand-book alignment took three iterations instead of the usual weeks.",
      metrics: [
        { label: "Production time", value: "7 days" },
        { label: "Platform versions", value: "5" },
        { label: "Cost per video", value: "−50%" },
      ],
    },
    "marketplace-reputation": {
      title: "Reputation management on marketplaces",
      tagline: "Review monitoring and on-brand replies",
      description:
        "We collect reviews across platforms, detect sentiment, and reply to every one: negative feedback is handled within the hour. Topic analysis shows what to improve in the product and the listing.",
      metrics: [
        { label: "Time to reply to a review", value: "< 1 hour" },
        { label: "Share of negative reviews", value: "−35%" },
        { label: "Store rating", value: "4.8 out of 5" },
      ],
    },
    "reputation-monitoring-platform": {
      title: "Chasovoy",
      tagline: "Real-time media monitoring",
      description:
        "Everything written about your brand – 250,000 sources, 109,000 publishers, social media and press – lands in one dashboard. A neural network detects sentiment, storylines and risks before a human does.",
      metrics: [
        { label: "Media field growth index", value: "72%" },
        { label: "Positive share", value: "78%" },
        { label: "Sentiment accuracy", value: "95%+" },
      ],
      counters: [
        "Monitored sources",
        "Media messages per day",
        "Social media posts per day",
        "Publishers in the database",
      ],
      problem: {
        title: "Why it matters",
        0: {
          title: "Attention is moving to new platforms",
          text: "In three years, social media's share of the audience grew from 23% to 31%, while TV fell from 59–62% to 46%. Reputation is discussed where it is hard to see.",
        },
        1: {
          title: "Publications multiply fast",
          text: "In two years, the flow of messages grew from 20,000 to 300,000 pieces a day – 12×. Reacting manually is impossible: critical signals drown in noise.",
        },
      },
      solution: {
        title: "The solution – “Chasovoy”",
        0: {
          title: "A neural network instead of a human",
          text: "70+ sentiment and entity indices understand the meaning of publications, not just mentions. AI spots threats and opportunities before the PR team does.",
        },
        1: {
          title: "Instant, continuous monitoring",
          text: "250,000 sources and 109,000 publishers – from federal media to city channels and map reviews. Data freshness: minutes, not days.",
        },
        2: {
          title: "Analytics for PR, marketing and crisis teams",
          text: "AI storylines, opinion leaders, geography and a competitor map – one interface for board reports and quick reputation audits.",
        },
      },
      dashboard: {
        title: "Customer dashboard",
        0: { label: "Mentions", value: "12,847" },
        1: { label: "Positive share", value: "78%" },
        2: { label: "Reach", value: "2.4M" },
        3: { label: "Growth index", value: "72%" },
        4: { label: "Sources", value: "847" },
      },
      depth: {
        title: "AI storylines",
        fromLabel: "Big picture",
        toLabel: "Deep dive",
        level: [
          {
            title: "Overview",
            text: "A quick picture of the period: mention volume, top sources, and the overall tone of the agenda.",
          },
          {
            title: "Trends",
            text: "Dynamics by week and platform: where the audience grows and where activity fades.",
          },
          {
            title: "Storylines",
            text: "Automatic grouping of publications into storylines with attention concentration scoring.",
          },
          {
            title: "Key figures",
            text: "People and brands shaping the agenda: their role, the stance of their statements, and their reach.",
          },
          {
            title: "Connections",
            text: "Cross-links between key figures and platforms, and the channels through which storylines spread.",
          },
          {
            title: "Forecast",
            text: "A forecast for storyline development: which threads will gain weight and when.",
          },
          {
            title: "Scenarios",
            text: "Ready-made response scenarios with risk assessment and recommended actions.",
          },
        ],
      },
      audiences: {
        title: "Who needs it",
        0: {
          title: "PR teams",
          text: "Agenda control, timely reaction to news hooks, and reports for management.",
        },
        1: {
          title: "Crisis teams",
          text: "Early detection of negativity, response scenarios, and impact assessment before a topic goes public.",
        },
        2: {
          title: "Marketing",
          text: "Finding platforms and opinion leaders, campaign tracking, and media impact evaluation.",
        },
      },
    },
  },
};
