export const reputation_monitoring_platformRu = {
  title: "Часовой",
  tagline: "Мониторинг информационного поля в реальном времени",
  description:
    "Всё, что пишут о вашем бренде – 250 000 источников, 109 000 издателей, соцсети и СМИ – собирается в одном дашборде. Нейросеть определяет тональность, сюжеты и риски раньше человека.",
  metrics: [
    { label: "Скорость обработки потоковых данных", value: "×4,5" },
    { label: "Доля позитивных публикаций", value: "78 %" },
    { label: "Точность определения тональности", value: "95 %+" },
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
    3: { label: "Новых сюжетов за сутки", value: "37" },
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
};

export const reputation_monitoring_platformEn = {
  title: "Chasovoy",
  tagline: "Real-time media monitoring",
  description:
    "Everything written about your brand – 250,000 sources, 109,000 publishers, social media and press – lands in one dashboard. A neural network detects sentiment, storylines and risks before a human does.",
  metrics: [
    { label: "Stream data processing speed", value: "×4.5" },
    { label: "Share of positive publications", value: "78%" },
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
    3: { label: "New storylines per day", value: "37" },
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
};
