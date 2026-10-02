export const software_developmentRu = {
  ctaBanner: {
    title: "Обсудим вашу разработку",
    text: "Расскажите о продукте, сроках и ограничениях. Вернёмся с оценкой этапов, команды и стоимости в течение рабочего дня.",
    buttonLabel: "Получить оценку проекта",
  },
  navTitle: "Разработка ПО",
  title: "Разработка программного обеспечения",
  tagline: "Создаём надёжное ПО под ваши задачи: от веб-сервисов до ИИ-платформ.",
  description:
    "Проектируем и разрабатываем программное обеспечение полного цикла: анализ требований, архитектура, разработка, тестирование и сопровождение. Подбираем стек по best practice под конкретный тип продукта – чтобы система была быстрой, безопасной и масштабируемой.",
  features: [
    {
      title: "Полный цикл разработки",
      text: "От прототипа и архитектуры до релиза и поддержки: вы получаете готовый продукт, а не набор кода.",
    },
    {
      title: "Грамотная архитектура",
      text: "Проектируем модульные, тестируемые и масштабируемые системы – под нагрузку и развитие бизнеса.",
    },
    {
      title: "Качество и безопасность",
      text: "Автотесты, код-ревью, аудит безопасности и соответствие стандартам индустрии.",
    },
    {
      title: "Поддержка и развитие",
      text: "Сопровождаем продукт после запуска: обновления, новые фичи и оптимизация.",
    },
  ],
  techStack: [
    {
      subtitle: "Веб-приложения и высоконагруженный SaaS",
      description:
        "Клиентскую часть пишем на [React] и [Next.js], а [TypeScript] ловит ошибку в типах до релиза. Бэкенд разворачиваем на [Node.js], а там, где нужна отказоустойчивость, пишем сервисы на [Go] и [Python].",
      technologies: [
        {
          id: "typescript",
          glossary:
            "JavaScript с типами: ошибку в типах находит компилятор до запуска, а не пользователь в продакшене.",
        },
        {
          id: "react",
          glossary:
            "Библиотека для интерфейсов: страница собрана из компонентов, изменение состояния перерисовывает только нужные части.",
        },
        {
          id: "nextjs",
          glossary:
            "Фреймворк над React: серверный рендеринг и генерация страниц на сборке, поэтому первая отрисовка приходит быстро.",
        },
        {
          id: "nodejs",
          glossary:
            "Среда выполнения JavaScript на движке V8: бэкенд пишется на том же языке, что и фронтенд.",
        },
        {
          id: "go",
          glossary:
            "Компилируемый язык от Google: горутины держат тысячи соединений без большого числа потоков.",
        },
        {
          id: "python",
          glossary:
            "Язык с готовыми библиотеками для данных, API и автоматизации, на нём прототип собирается быстрее всего.",
        },
      ],
    },
    {
      subtitle: "Мобильные экосистемы",
      description:
        "Под iOS пишем нативно на [Swift], под Android на [Kotlin]. Когда приложению нужна одна кодовая база, берём [Flutter] или [React Native] и выпускаем быстрее.",
      technologies: [
        {
          id: "swift",
          glossary:
            "Язык Apple для iOS с безопасным управлением памятью, доступом к системным API и строгой проверкой на этапе сборки.",
        },
        {
          id: "kotlin",
          glossary:
            "Официальный язык Android: null-safety в типах и совместимость с существующим Java-кодом.",
        },
        {
          id: "flutter",
          glossary:
            "UI-фреймворк от Google на Dart: он рисует собственный виджетный слой, поэтому обе платформы выглядят одинаково.",
        },
        {
          id: "react-native",
          glossary:
            "Нативные компоненты iOS и Android, отрисованные из JavaScript: логика общая, производительность системная.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Анализ требований",
      text: "Разбираем задачу, фиксируем цели, пользователей и ограничения. Результат – техническое задание и смета.",
    },
    {
      title: "Архитектура",
      text: "Проектируем модули, данные и интеграции. Согласуем стек и план, прежде чем писать код.",
    },
    {
      title: "Разработка по спринтам",
      text: "Работаем короткими спринтами с демо: вы видите продукт и правите приоритеты каждые 1–2 недели.",
    },
    {
      title: "Тестирование и релиз",
      text: "Автотесты, код-ревью, нагрузка и аудит безопасности. После релиза сопровождаем и развиваем.",
    },
  ],
  fitItems: [
    {
      title: "Продукт с нуля или рефакторинг",
      text: "Новый сервис, платформа или модернизация легаси. Нужен полный цикл: от идеи до продакшена.",
      positive: true,
    },
    {
      title: "Рост без найма",
      text: "Задач больше, чем может закрыть команда. Внешняя команда добирает мощность без длительного найма.",
      positive: true,
    },
    {
      title: "Проект на 2 недели",
      text: "Короткий одноразовый скрипт или прототип: полный процесс разработки не окупит формальные процедуры.",
      positive: false,
    },
    {
      title: "Жёсткие сроки без ТЗ",
      text: "Если нужен продукт «вчера», а требования неизвестны, закладываем итеративный план, а не фиксированную смету.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Платформа под корпоративные процессы",
      text: "Собрали веб-систему с интеграцией ERP и аналитики: от проектирования до релиза. Данные перестали жить в таблицах, ручные выгрузки ушли.",
      metricValue: "−50%",
      metricLabel: "времени на ручные отчёты",
    },
  ],
  faqItems: [
    {
      question: "Как формируется стоимость?",
      answer:
        "По ТЗ и объёму работ. Даём смету до старта, согласуем состав и оплату по этапам, фиксируем правки через изменения ТЗ.",
    },
    {
      question: "Кто владеет кодом?",
      answer:
        "Вы. Код, документация и доступы передаются вам, код хранится в вашем репозитории с самого начала.",
    },
    {
      question: "Как контролируете качество?",
      answer:
        "Автотесты, код-ревью и аудит безопасности. Нагрузку и сценарии отказа прогоняем до релиза, а не после.",
    },
    {
      question: "Что после релиза?",
      answer:
        "Сопровождение: обновления, новые функции и оптимизация. Формат SLA обговариваем отдельно.",
    },
  ],
  sections: [
    {
      title: "Что проверяем до первой строки кода",
      items: [
        "Собираем требования через интервью с ключевыми пользователями: сценарии, ограничения по нагрузке, требования к интеграциям. Пробел в ТЗ обходится дороже любой правки кода.",
        "Проверяем архитектуру на прототипе. Нагрузочный тест на 10 тысяч пользователей выявляет узкие места, пока менять их дёшево, а не когда система уже в продакшене.",
        "Согласуем стек под тип продукта: для внутренней системы берём один набор технологий, для публичного сервиса другой. Решение фиксируем в документе с обоснованием.",
        "Оцениваем риски заранее: зависимость от внешних поставщиков, миграция легаси-данных, совместимость версий. Каждый риск получает свой план на случай отказа.",
        "Определяем метрики успеха до старта: время ответа, конверсия, доступность. Без чисел нельзя решить, что релиз удался, а что только выпущен.",
        "Фиксируем границы первой версии: что обязательно для запуска, а что подождёт. Узкий MVP экономит бюджет и сокращает путь до полезного результата.",
      ],
    },
    {
      title: "Как устроен процесс разработки",
      items: [
        "Работаем спринтами по 1–2 недели и в конце каждого показываем работающий код, а не слайды. Вы видите продукт своими глазами, а не обещания на словах.",
        "Приоритеты задач согласуем в начале спринта. Скорректировать план до старта дешевле, чем переделывать готовый результат.",
        "Разработчик ведёт задачу целиком: от анализа до собственного теста. Передача работы между специалистами съедает время и прячет мелкие ошибки.",
        "Каждое изменение проходит код-ревью. Второй взгляд ловит баги и заставляет делать архитектурные решения осознанными, а не случайными.",
        "Сборка и деплой в тестовое окружение работают каждый спринт. Интеграции проверяются на стенде, а не встречаются с продакшеном в первый раз.",
        "Замечания из демо попадают в план следующего спринта. Так продукт подстраивается под ваше видение постепенно, а не рывками после релиза.",
      ],
    },
    {
      title: "Что защищает продукт после релиза",
      items: [
        "Код принадлежит вам и хранится в вашем репозитории. Если команда уйдёт, система останется и продолжит развиваться без заложников и блокировок.",
        "Документация идёт вместе с кодом: архитектура, точки интеграции, схема данных. Новый человек разбирается в проекте за дни, а не за месяцы.",
        "Мониторинг и алерты настраиваем до запуска: время ответа, доля ошибок, нагрузка на сервер. Сбой виден через пять минут, а не через неделю жалоб клиентов.",
        "Автотесты покрывают критические сценарии. Регрессия после новой функции ловится автоматически, а не первыми пользователями на проде.",
        "Безопасность проверяем и после релиза: обновление зависимостей, аудит доступа, шифрование данных. Уязвимость закрывается до того, как ею воспользуются.",
        "Соглашение об уровне обслуживания определяет время реакции: критичный инцидент решаем в течение часа в рабочее время. Объём поддержки подбираем под бюджет.",
      ],
    },
  ],
};

export const software_developmentEn = {
  ctaBanner: {
    title: "Let's discuss your build",
    text: "Tell us about the product, timeline, and constraints. We'll come back with a stage, team, and cost estimate within one business day.",
    buttonLabel: "Get a project estimate",
  },
  navTitle: "Software Development",
  title: "Custom Software Development",
  tagline: "We build reliable software for your needs: from web services to AI platforms.",
  description:
    "We design and develop full-cycle software: requirements analysis, architecture, development, testing, and maintenance. We pick a best-practice stack for each product type – so the system is fast, secure, and scalable.",
  features: [
    {
      title: "Full-cycle development",
      text: "From prototype and architecture to release and support: you get a finished product, not a pile of code.",
    },
    {
      title: "Solid architecture",
      text: "We design modular, testable, and scalable systems – ready for load and business growth.",
    },
    {
      title: "Quality and security",
      text: "Automated tests, code review, security audits, and industry-standard compliance.",
    },
    {
      title: "Support and growth",
      text: "We maintain the product after launch: updates, new features, and optimization.",
    },
  ],
  techStack: [
    {
      subtitle: "Web apps and high-load SaaS",
      description:
        "We write the client side in [React] and [Next.js], and [TypeScript] catches type errors before release. The backend runs on [Node.js]; where we need fault tolerance, we write services in [Go] and [Python].",
      technologies: [
        {
          id: "typescript",
          glossary:
            "JavaScript with types: the compiler finds a type error before release instead of your users in production.",
        },
        {
          id: "react",
          glossary:
            "UI library: the page is built from components, and a state change re-renders only the parts that changed.",
        },
        {
          id: "nextjs",
          glossary:
            "React framework with server rendering and build-time page generation, so the first paint arrives fast.",
        },
        {
          id: "nodejs",
          glossary:
            "JavaScript runtime on the V8 engine, so the backend shares one language with the frontend.",
        },
        {
          id: "go",
          glossary:
            "Compiled language from Google: goroutines hold thousands of connections without a large number of threads.",
        },
        {
          id: "python",
          glossary:
            "Language with ready libraries for data, APIs, and automation, so a prototype comes together faster.",
        },
      ],
    },
    {
      subtitle: "Mobile ecosystems",
      description:
        "Native iOS code is written in [Swift], Android code in [Kotlin]. When one codebase has to cover both, we pick [Flutter] or [React Native] and ship sooner.",
      technologies: [
        {
          id: "swift",
          glossary:
            "Apple's language for iOS with safe memory handling, direct access to system APIs, and strict checks at build time.",
        },
        {
          id: "kotlin",
          glossary:
            "The official Android language: null safety in the type system and interop with existing Java code.",
        },
        {
          id: "flutter",
          glossary:
            "Google's Dart UI framework: it draws its own widget layer, so both platforms look the same.",
        },
        {
          id: "react-native",
          glossary:
            "Real iOS and Android components rendered from JavaScript: shared logic, native performance.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Requirements analysis",
      text: "We break down the task and fix goals, users, and constraints. You get a spec and a quote.",
    },
    {
      title: "Architecture",
      text: "We design modules, data, and integrations. We agree the stack and plan before writing code.",
    },
    {
      title: "Sprint development",
      text: "We work in short sprints with demos: you see the product and reprioritize every 1–2 weeks.",
    },
    {
      title: "Testing and release",
      text: "Automated tests, code review, load, and security audit. After release we support and grow the product.",
    },
  ],
  fitItems: [
    {
      title: "A product from scratch or a refactor",
      text: "A new service, platform, or legacy modernization. You need the full cycle: from idea to production.",
      positive: true,
    },
    {
      title: "Growth without hiring",
      text: "More tasks than the team can handle. An external team adds capacity without a long hiring process.",
      positive: true,
    },
    {
      title: "A two-week project",
      text: "A short one-off script or prototype: a full dev process outweighs the formalities.",
      positive: false,
    },
    {
      title: "Tight deadlines without a spec",
      text: "If the product is needed “yesterday” and requirements are unknown, we plan iteratively instead of a fixed quote.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "A platform for corporate processes",
      text: "We built a web system with ERP integration and analytics: from design to release. Data stopped living in spreadsheets, and manual exports disappeared.",
      metricValue: "−50%",
      metricLabel: "time spent on manual reports",
    },
  ],
  faqItems: [
    {
      question: "How is the cost formed?",
      answer:
        "From the spec and scope. We give a quote before start, agree the scope and stage payments, and track changes through spec updates.",
    },
    {
      question: "Who owns the code?",
      answer:
        "You do. Code, documentation, and access are handed to you; the code lives in your repository from day one.",
    },
    {
      question: "How do you control quality?",
      answer:
        "Automated tests, code review, and security audits. We run load and failure scenarios before release, not after.",
    },
    {
      question: "What happens after release?",
      answer:
        "Support: updates, new features, and optimization. The SLA format is agreed separately.",
    },
  ],
  sections: [
    {
      title: "What we check before the first line of code",
      items: [
        "We gather requirements through interviews with key stakeholders: scenarios, load constraints, integration requirements. A gap in the spec costs more than any code revision.",
        "We validate architecture on a prototype: a load test with 10k users exposes bottlenecks while they're still cheap to fix, not when the system is already in production.",
        "We align the stack to the product type: one set of technologies for an internal system, another for a public service. The decision is documented with justification.",
        "We assess risks upfront: dependency on external suppliers, legacy data migration, version compatibility. Each risk gets its own fallback plan.",
        "We define success metrics before the start: response time, conversion, availability. Without numbers you can't tell whether the release succeeded or merely shipped.",
        "We lock the first version's boundaries: what's mandatory for launch and what can wait. A narrow MVP saves budget and shortens the path to a usable result.",
      ],
    },
    {
      title: "How the development process is structured",
      items: [
        "We work in 1–2 week sprints and show working code at the end of each one — you see the product, not slide decks.",
        "Sprint priorities are agreed upfront. Changing the plan before the start is cheaper than reworking a finished result.",
        "The developer owns the task end-to-end: from analysis to their own test. Handoffs between specialists eat time and hide small errors.",
        "Every change goes through code review. A second pair of eyes catches bugs and makes architectural decisions deliberate rather than accidental.",
        "Build and deploy to staging run every sprint. Integrations are tested on a staging environment, not introduced to production for the first time.",
        "Notes from demos feed into the next sprint's plan, so the product adapts to your vision gradually, not in jumps after release.",
      ],
    },
    {
      title: "What protects the product after release",
      items: [
        "The code stays yours and in your repository. If the team leaves, the system remains and keeps evolving with no lock-in.",
        "Documentation travels with the code: architecture, integration points, data schema. A new person gets up to speed in days, not months.",
        "Monitoring and alerts are configured before launch: response time, error rate, server load. A failure is visible in five minutes, not after a week of customer complaints.",
        "Automated tests cover critical scenarios. Regression after a new feature is caught automatically, not by the first production users.",
        "Security is audited post-release too: dependency updates, access audits, data encryption. A vulnerability is closed before it can be exploited.",
        "The SLA defines the response time: a critical incident is resolved within business hours. Support volume is scaled to your budget.",
      ],
    },
  ],
};
