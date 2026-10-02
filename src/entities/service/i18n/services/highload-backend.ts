export const highload_backendRu = {
  ctaBanner: {
    title: "Разберём вашу нагрузку",
    text: "Пришлите профиль трафика или текущие замеры времени ответа. Покажем, где система теряет запросы, и посчитаем, во сколько обходится эта потеря в серверах.",
    buttonLabel: "Запросить профилирование",
  },
  navTitle: "Высоконагруженные системы",
  title: "Проектирование высоконагруженных бэкенд-систем",
  tagline:
    "Инженерные решения для распределённых систем с миллионными потоками данных и жёсткими требованиями к времени ответа.",
  description:
    "Проектируем и пишем серверные системы, которые держат нагрузку без деградации: снимаем профили и убираем узкие места в базах, сетевом вводе-выводе и сериализации. Отдельно считаем, во сколько обходится ваша текущая архитектура в серверах и что меняется после переноса контуров на асинхронный рантайм.",
  features: [
    {
      title: "Пропускная способность",
      text: "Держим сотни тысяч одновременных соединений на одном сервере: обработка идёт конкурентно, поэтому ядра не простаивают в ожидании сети.",
    },
    {
      title: "Экономия инфраструктуры",
      text: "Переносим контуры в нативный код и загружаем процессоры плотнее, а не добавляем машины. Тот же трафик обслуживаем меньшим числом серверов, и разницу показываем в смете до старта работ.",
    },
    {
      title: "Безопасность памяти",
      text: "Компилятор отсекает обращения к освобождённой памяти и гонки данных на этапе сборки. Сервис не падает из-за ошибки, которую не нашёл ни один тест.",
    },
    {
      title: "Предсказуемое время ответа",
      text: "Замеряем хвосты задержек, а не среднее: 99-й перцентиль остаётся в заявленном коридоре даже в момент пикового всплеска.",
    },
  ],
  processSteps: [
    {
      title: "Профильный аудит",
      text: "Снимаем профиль работающей системы: распределение памяти, сетевые ожидания, самые медленные запросы. Замеры идут на реальной нагрузке, а не на синтетике в стенде.",
    },
    {
      title: "Проектирование ядра",
      text: "Собираем асинхронные неблокирующие контуры, разводим чтение и запись и задаём границы отказов: что система отдаёт клиенту, когда зависимость лежит.",
    },
    {
      title: "Оптимизация хранения",
      text: "Настраиваем репликацию и шардирование, выносим отчётность в аналитическую СУБД, чтобы тяжёлые запросы не блокировали транзакции.",
    },
    {
      title: "Стресс-тестирование",
      text: "Имитируем всплески выше рабочего максимума и фиксируем задержки на хвостах. Результат – числа, по которым вы сравниваете нашу версию со своей, а не обещание «выдержит».",
    },
  ],
  fitItems: [
    {
      title: "Финтех-сервисы",
      text: "Тысячи транзакций в минуту и договорной уровень обслуживания на время ответа, который нельзя нарушить. Мы считаем задержку на хвостах, а не среднюю, и приводим её к заявленному коридору.",
      positive: true,
    },
    {
      title: "IoT-платформы",
      text: "Данные с датчиков приходят постоянно, и потерянный пакет – это потерянное событие, а не строчка в логе. Канал обработки держим неблокирующим, чтобы задержка не копилась в очереди.",
      positive: true,
    },
    {
      title: "Высоконагруженный SaaS",
      text: "Интерфейс тормозит под нагрузкой, хотя железо ещё не упирается в лимиты. Обычно виноваты обращения к базе на каждую строку списка, и мы находим их профилированием, а не закупкой машин помощнее.",
      positive: true,
    },
    {
      title: "Пайплайны агрегации",
      text: "Вы собираете данные из тысяч источников и считаете агрегаты потоково. Разводим контур сбора, контур хранения и контур отчётности, чтобы тяжёлый отчёт не блокировал запись новых данных.",
      positive: true,
    },
    {
      title: "Ранние MVP стартапов",
      text: "Вы проверяете гипотезу, а не оптимизируете рантайм. Нативный стек удлиняет путь до первой функции, и если проверка не оправдается, это время уже не вернуть.",
      positive: false,
    },
    {
      title: "Простые CRUD-системы",
      text: "Админка, визитка или портал без фоновых вычислительных задач. Управляемого рантайма там достаточно, и переход на нативный код не даст выигрыша, который можно измерить.",
      positive: false,
    },
    {
      title: "Замкнутые legacy-контуры",
      text: "Система построена вокруг частых вызовов закрытых C-библиотек без стабильного интерфейса. Обвязка таких вызовов съедает смысл перехода, и сначала придётся договариваться с вендором.",
      positive: false,
    },
    {
      title: "Редкие сетевые запросы",
      text: "Сервис делает десятки изолированных обращений в сутки. Асинхронный рантайм там не нужен, а стандартное решение имеет заметно более низкий порог входа.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Платформа мониторинга «Часовой»",
      text: "Перенесли потоковый контур сбора и обработки отзывов с виртуальных машин на асинхронный рантайм. Прирост дали загруженные процессоры и отсутствие пауз на очистку памяти, а не смена языка сама по себе; целевое время ответа при пиковом наплыве удержалось.",
      metricValue: "×4,5",
      metricLabel: "скорость обработки потоковых данных",
    },
  ],
  faqItems: [
    {
      question: "Как архитектура держит пиковую нагрузку без просадки скорости?",
      answer:
        "Запросы обрабатываются конкурентно на пуле потоков, а сетевое ожидание не занимает поток: пока сервис ждёт ответа базы, он берёт следующий запрос. В такой модели нет пауз на очистку памяти, поэтому задержки на 99-м перцентиле остаются в коридоре даже при резком наплыве пользователей.",
    },
    {
      question: "Как переход на асинхронный бэкенд снижает расходы на серверы?",
      answer:
        "Прямой эффект даёт загрузка процессоров: вместо ожидания сети поток занимается задачей, и на том же железе обслуживается больше трафика. На практике это означает меньше машин под тот же уровень обслуживания. Точную цифру считаем на ваших профилях нагрузки, потому что без ваших данных любое «в десять раз» будет догадкой.",
    },
    {
      question: "Что происходит с системой, когда база данных тормозит или падает?",
      answer:
        "В контур сетевых стримов включается обратное давление: при замедлении зависимости запросы буферизуются в очередях, а дальше срабатывает автоматический разрыв цепи. Часть функций при этом уходит в режим деградации, но система не разваливается лавинообразно, и клиент получает внятный ответ вместо таймаута в обслужную сеть.",
    },
  ],
  sections: [
    {
      title: "Что мы смотрим на профилировании",
      items: [
        "Профиль памяти снимаем по аллокациям, а не только по занятому объёму: видно, какой модуль удерживает память между запросами. Так находятся утечки в долгоживущих процессах – на синтетическом тесте их обычно нет, потому что воркеры там живут минуты.",
        "Сетевые ожидания меряем отдельно от вычислений. Если процессор занят на 4%, а время ответа растёт, узкое место в вводе-выводе или в разблокировках, и настройки операционной системы и пула соединений дают больше, чем переезд на другое железо.",
        "Медленные SQL-запросы находим по журналу и плану выполнения, а не по жалобам пользователей. Блокировка таблицы на 400 мс в пиковом окне превращается в очередь на минуты, когда через неё проходит транзакционный поток.",
        "Стратегию деградации задаём до написания кода: какие функции можно урезать, какие экраны отдавать из кэша, а где честнее вернуть ошибку, чем показать зависшие данные. Поведение под нагрузкой должно задаваться вами, а не оставаться на волю таймаутам.",
        "Распределённую трассировку внедряем, чтобы увидеть, где именно теряется время: в сети, в очереди, в базе или в сериализации. Без этого отчёт о медленном ответе начинается с догадок.",
        "Сериализацию оптимизируем отдельной задачей: под нагрузкой объём JSON заметно меняет стоимость запроса. Компактный формат и разбор без лишних копий освобождают процессор, который иначе уходит на упаковку данных.",
      ],
    },
    {
      title: "Как мы разводим данные по контурам",
      items: [
        "Репликацию настраиваем так, чтобы чтение шло с копий, а запись оставалась на мастере. Тогда долгие выборки перестают конкурировать с транзакциями за одни и те же блокировки.",
        "Кэширование делаем многоуровневым: частое чтение остаётся в памяти процесса, а повторные обращения к дорогому внешнему вызову уходят в общий Redis. Сначала смотрим, какие запросы повторяются, и только потом задаём сроки годности, иначе кэш начинает отдавать устаревшие ответы.",
        "Шардирование планируем до того, как упрёмся в физические лимиты, и подбираем ключ, по которому данные одного клиента попадают на один шард. Неверный ключ превращает точечный запрос в обход всей таблицы.",
        "Очереди сообщений делаем отказоустойчивыми: подтверждение после записи результата и повтор доставки при сбое потребителя. Тяжёлая фоновая задача тогда не теряется и не выполняется дважды, а на демо-данных это обычно не проверяют.",
        "Переключение на резервные узлы автоматизируем с проверкой ролей и задержкой в секунды. Плановое обслуживание базы перестаёт быть событием в календаре, о котором предупреждают за неделю.",
        "Индексы в аналитической СУБД настраиваем под конкретные отчёты, а не «на всякий случай»: лишний индекс замедляет запись и расходует память. Сначала меряем, во сколько обходится тяжёлая отчётность, и только потом решаем, выносить ли её в отдельный контур.",
      ],
    },
  ],
  techStack: [
    {
      subtitle: "Асинхронный рантайм",
      description:
        "Сервисы пишем на [Rust] с многопоточным асинхронным рантаймом [Tokio]. Строгий контроль владения памятью и отсутствие пауз на очистку мусора убирают непредсказуемые задержки под нагрузкой, а сетевой слой на [Axum] держит тысячи одновременных соединений на одном процессе.",
      technologies: [
        {
          id: "rust",
          name: "Rust",
          glossary:
            "Компилируемый системный язык: ошибки владения памятью и гонки данных находит компилятор, а не продакшен.",
        },
        {
          id: "tokio",
          name: "Tokio",
          glossary:
            "Рантайм для асинхронных приложений на Rust: задачи выполняются конкурентно на пуле потоков.",
        },
        {
          id: "axum",
          name: "Axum",
          glossary:
            "Модульный веб-фреймворк, оптимизированный под высокопроизводительные сетевые сервисы.",
        },
      ],
    },
    {
      subtitle: "Распределённые хранилища",
      description:
        "Транзакционные задачи закрывает кластер [PostgreSQL] с ограниченным пулом соединений. Кэш и очереди берут на [Redis], агрегаты по большим объёмам считает [ClickHouse], а полнотекстовый поиск ведёт [Elasticsearch].",
      technologies: [
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Реляционная СУБД для транзакций и сложных запросов, работает в кластере с репликацией.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Хранилище структур данных в оперативной памяти: кэш, сессии и очереди сообщений.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "Столбцовая СУБД: агрегаты по большим объёмам данных считает за секунды.",
        },
        {
          id: "elasticsearch",
          name: "Elasticsearch",
          glossary: "Распределённый поисковый движок для полнотекстового индексирования.",
        },
      ],
    },
  ],
};

export const highload_backendEn = {
  ctaBanner: {
    title: "Let's look at your load",
    text: "Send a traffic profile or your current response-time numbers. We'll show where the system drops requests and what that costs you in servers.",
    buttonLabel: "Request a profiling session",
  },
  navTitle: "High-Load Systems",
  title: "High-Load Backend Systems Design",
  tagline:
    "Engineering for distributed systems that move millions of events and hold a hard response-time budget.",
  description:
    "We design and build server systems that keep their load without degrading: we profile, then remove bottlenecks in databases, network I/O, and serialization. We also price your current architecture in servers, so you can see what changes after the workload moves to an async runtime.",
  features: [
    {
      title: "Throughput",
      text: "We hold hundreds of thousands of concurrent connections on one server: work runs concurrently, so cores don't sit waiting on the network.",
    },
    {
      title: "Lower infrastructure bill",
      text: "We move workloads to native code and put your CPUs to work instead of adding machines. The same traffic runs on fewer servers, and we show the difference in the quote before the work starts.",
    },
    {
      title: "Memory safety",
      text: "The compiler rejects use-after-free and data races at build time. The service doesn't crash on a bug that no test managed to catch.",
    },
    {
      title: "Predictable response time",
      text: "We measure the tail, not the average: the 99th percentile stays inside the agreed range even during a traffic spike.",
    },
  ],
  processSteps: [
    {
      title: "Profiling audit",
      text: "We profile the running system: memory distribution, network waits, slowest queries. Measurements come from real load, not from a synthetic staging setup.",
    },
    {
      title: "Core design",
      text: "We build async, non-blocking flows, split reads from writes, and set failure boundaries: what the system returns to a client while a dependency is down.",
    },
    {
      title: "Storage optimization",
      text: "We set up replication and sharding and move reporting to an analytical database, so heavy queries stop blocking transactions.",
    },
    {
      title: "Stress testing",
      text: "We push traffic above your working peak and record tail latency. You get numbers to compare our build against yours, not a promise that it will hold.",
    },
  ],
  fitItems: [
    {
      title: "Fintech services",
      text: "Thousands of transactions a minute under a contractual response-time SLA you can't miss. We measure the tail, not the average, and bring it inside the agreed range.",
      positive: true,
    },
    {
      title: "IoT platforms",
      text: "Sensor data arrives continuously, and a dropped packet is a lost event, not a lost log line. We keep the processing path non-blocking so latency doesn't pile up in a queue.",
      positive: true,
    },
    {
      title: "High-load SaaS",
      text: "The interface slows under load while your hardware is still far from its limits. A database call per row of a list is usually the cause, and we find it with a profile instead of buying bigger machines.",
      positive: true,
    },
    {
      title: "Aggregation pipelines",
      text: "You collect data from thousands of sources and aggregate it as a stream. We split collection, storage, and reporting so a heavy report never blocks new writes.",
      positive: true,
    },
    {
      title: "Early-stage MVPs",
      text: "You're testing a hypothesis, not tuning a runtime. A native stack lengthens the path to the first feature, and if the hypothesis fails that time is gone.",
      positive: false,
    },
    {
      title: "Simple CRUD systems",
      text: "An admin panel, a landing site, or a portal with no background computation. A managed runtime is enough there, and the switch to native code buys nothing you can measure.",
      positive: false,
    },
    {
      title: "Closed legacy estates",
      text: "The system is built around frequent calls into closed C libraries with no stable interface. Wrapping those calls eats the benefit, and you'd have to negotiate with the vendor first.",
      positive: false,
    },
    {
      title: "Infrequent network calls",
      text: "The service makes a few isolated requests a day. An async runtime is unnecessary there, and a standard solution has a much lower barrier to entry.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "The Chasovoy monitoring platform",
      text: "We moved the streaming collection and processing of reviews off virtual machines onto an async runtime. The gain came from busy CPUs and the absence of garbage collection pauses, not from the language change by itself; the target response time held during traffic spikes.",
      metricValue: "×4.5",
      metricLabel: "stream data processing speed",
    },
  ],
  faqItems: [
    {
      question: "How does the design hold peak load without slowing down?",
      answer:
        "Requests are handled concurrently on a thread pool, and a network wait doesn't hold a thread: while the service waits for the database, it picks up the next request. Nothing pauses for garbage collection, so 99th-percentile latency stays inside its range even when users arrive in a burst.",
    },
    {
      question: "How does moving to an async backend cut server costs?",
      answer:
        "The gain comes from putting your CPUs to work: instead of waiting on the network, a thread takes another task, and the same hardware carries more traffic. In practice that means fewer machines for the same SLA. We compute the exact number from your own load profiles, because without your data a claim like “ten times” is a guess.",
    },
    {
      question: "What happens when the database slows down or goes down?",
      answer:
        "Backpressure goes into the network streams: when a dependency lags, requests are buffered in queues and then a circuit breaker opens. Some features switch to a degraded mode while the system stays up, and your client gets a clear answer instead of a timeout into the support line.",
    },
  ],
  sections: [
    {
      title: "What we look at while profiling",
      items: [
        "We take a memory profile by allocation rather than by resident size: you see which module holds memory between requests. That is how leaks in long-running processes surface, and they don't show up on a synthetic test because the workers there live for minutes.",
        "We measure network waits separately from compute. When the CPU sits at 4% and response time still grows, the bottleneck is I/O or lock contention, and OS and connection-pool tuning buys more than moving to faster hardware.",
        "We find slow SQL in the query log and the execution plan, not in user complaints. A 400 ms table lock in a peak window becomes a queue of minutes once transactional traffic flows through it.",
        "We agree on degradation rules before writing code: which features to trim, which screens to serve from cache, and where an error is more honest than stale data. Behaviour under load should be your decision, not left to timeout defaults.",
        "We add distributed tracing so you can see where the time actually goes: the network, a queue, the database, or serialization. Without it, a slow-response report starts with guesses.",
        "We treat serialization as its own task: under load, the size of the JSON payload noticeably changes what a request costs. A compact format and a copy-free parser free up CPU that would otherwise go into packing data.",
      ],
    },
    {
      title: "How we split the data across tiers",
      items: [
        "Replication is set up so reads hit replicas while writes stay on the primary. Long selects then stop competing with transactions for the same locks.",
        "Caching is layered: frequent reads stay in process memory, and repeated calls to an expensive external service go to a shared Redis. We first look at which requests repeat and only then set expiry, otherwise the cache starts serving stale answers.",
        "We plan sharding before you hit the physical limits, and we pick a key that lands one customer's data on one shard. The wrong key turns a single lookup into a walk over the whole table.",
        "Queues are built to survive failure: acknowledgement after the result is written, and redelivery if the consumer dies. A heavy background job is then neither lost nor run twice, which synthetic demos rarely reveal.",
        "Failover to a standby node is automated, with role checks and a delay measured in seconds. Planned database maintenance stops being a calendar event you announce a week ahead.",
        "We build analytical indexes for the specific reports you run, not “just in case”: every extra index slows writes and takes memory. We measure what heavy reporting costs before deciding whether to move it to its own tier.",
      ],
    },
  ],
  techStack: [
    {
      subtitle: "Async runtime",
      description:
        "We write services in [Rust] on a multi-threaded async runtime, [Tokio]. Strict ownership rules and the absence of garbage collection pauses remove unpredictable latency under load, and the [Axum] network layer holds thousands of concurrent connections per process.",
      technologies: [
        {
          id: "rust",
          name: "Rust",
          glossary:
            "A compiled systems language: the compiler, not production, catches memory ownership errors and data races.",
        },
        {
          id: "tokio",
          name: "Tokio",
          glossary:
            "An async runtime for Rust applications: tasks run concurrently on a pool of threads.",
        },
        {
          id: "axum",
          name: "Axum",
          glossary: "A modular web framework built for high-throughput network services.",
        },
      ],
    },
    {
      subtitle: "Distributed storage",
      description:
        "A [PostgreSQL] cluster with a bounded connection pool handles transactional work. [Redis] covers the cache and the queues, [ClickHouse] aggregates large volumes, and [Elasticsearch] runs full-text search.",
      technologies: [
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "A relational database for transactions and complex queries, run as a replicated cluster.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "In-memory storage for data structures: cache, sessions, and message queues.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "A columnar database that aggregates large data volumes in seconds.",
        },
        {
          id: "elasticsearch",
          name: "Elasticsearch",
          glossary: "A distributed search engine for full-text indexing.",
        },
      ],
    },
  ],
};
