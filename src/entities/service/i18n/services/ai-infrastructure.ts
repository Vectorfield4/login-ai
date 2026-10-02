export const ai_infrastructureRu = {
  ctaBanner: {
    title: "Обсудим вашу ИИ-инфраструктуру",
    text: "Расскажите об объемах данных, требованиях к безопасности и моделях. Подготовим архитектурный проект и смету за один рабочий день.",
    buttonLabel: "Запросить оценку ИИ-проекта",
  },
  navTitle: "ИИ-инфраструктура и RAG",
  title: "Проектирование ИИ-инфраструктуры",
  tagline:
    "Интеграция больших языковых моделей в закрытые корпоративные контуры с гарантией защиты данных.",
  description:
    "Проектирование и развертывание вычислительной инфраструктуры для работы искусственного интеллекта. Внедрение систем семантического поиска, оптимизация расходов на инференс и защита коммерческой тайны.",
  features: [
    {
      title: "Защита от галлюцинаций",
      text: "Жесткая изоляция ИИ-моделей в рамках верифицированных локальных документов компании.",
    },
    {
      title: "Контроль операционных затрат",
      text: "Эффективное семантическое кэширование, предотвращающее избыточную повторную отправку токенов.",
    },
    {
      title: "Безопасность данных",
      text: "Развертывание поисковых контуров и баз данных внутри приватного периметра организации.",
    },
    {
      title: "Гибридный поиск",
      text: "Одновременный учет смыслового сходства информации и точных совпадений по ключевым идентификаторам.",
    },
  ],
  techStack: [
    {
      subtitle: "Векторный слой и семантика",
      description:
        "Для работы со сложными массивами знаний разворачиваются производительные векторные базы данных [Qdrant] или специализированные расширения [pgvector] для PostgreSQL. Преобразование неструктурированных документов в математические векторы высокой размерности оптимизируется через изолированные [Embeddings API], исключающие рассинхронизацию индексов.",
      technologies: [
        {
          id: "qdrant",
          name: "Qdrant",
          glossary:
            "Векторная система управления базами данных на языке Rust, оптимизированная для быстрого поиска сходств.",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary:
            "Расширение для СУБД PostgreSQL, позволяющее хранить, индексировать и искать векторные эмбеддинги.",
        },
        {
          id: "embeddings-api",
          name: "Embeddings API",
          glossary:
            "Интерфейс преобразования текста в математические векторы для последующего семантического анализа.",
        },
      ],
    },
    {
      subtitle: "Оркестрация и обсервабилити",
      description:
        "Управление контекстными окнами и гибридный поиск осуществляются на базе легковесных нативных прослоек. Мониторинг стоимости запросов, логирование промптов и отладка цепочек вызовов в реальном времени интегрируются через [Langfuse], что гарантирует прозрачность операционных затрат.",
      technologies: [
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Открытая платформа для трейсинга, оценки качества ответов и аудита стоимости токенов в ИИ-системах.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Аудит данных",
      text: "Оценка структуры, объема и качества корпоративной информации, подлежащей индексации.",
    },
    {
      title: "Проектирование контура",
      text: "Выбор и развертывание векторных СУБД, настройка параметров HNSW-индексов и чанкинга.",
    },
    {
      title: "Сборка пайплайна",
      text: "Интеграция систем кэширования, механизмов переранжирования и промпт-инжиниринга.",
    },
    {
      title: "Тестирование и запуск",
      text: "Запуск сквозного трейсинга, верификация отсутствия галлюцинаций и фиксация SLA.",
    },
  ],
  fitItems: [
    {
      title: "Предприятия с развитыми базами знаний",
      text: "Организации со значительными объемами закрытых внутренних регламентов, технической документации и архивов.",
      positive: true,
    },
    {
      title: "Финтех и юридические платформы",
      text: "Продукты и внутренние сервисы, требующие автоматического анализа сложных договоров с абсолютной точностью.",
      positive: true,
    },
    {
      title: "Крупные e-commerce агрегаторы",
      text: "Торговые площадки, внедряющие умный мультиязычный поиск по миллионам распределенных карточек товаров.",
      positive: true,
    },
    {
      title: "Службы клиентской поддержки",
      text: "Контуры автоматизации первой и второй линии ответов пользователям на основе накопленной истории тикетов.",
      positive: true,
    },
    {
      title: "Компании без накопленных данных",
      text: "Новые проекты, не имеющие уникальной текстовой базы знаний, собственных регламентов или истории процессов.",
      positive: false,
    },
    {
      title: "Линейные сценарии автоматизации",
      text: "Системы взаимодействия, где для полного закрытия задач достаточно жесткого дерева условий программирования.",
      positive: false,
    },
    {
      title: "Продукты без бюджета на инфраструктуру",
      text: "Ранние прототипы, планирующие использовать исключительно публичные API без локального кэширования информации.",
      positive: false,
    },
    {
      title: "Динамически меняющиеся интерфейсы",
      text: "Сервисы обработки транзакций или котировок в реальном времени, где данные устаревают каждую секунду.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Снижение затрат на API-токены до 5 раз",
      text: "Подтвержденный результат оптимизации ИИ-инфраструктуры за счет внедрения семантического кэширования и контроля контекстных окон.",
      metricValue: "−80%",
      metricLabel: "расходов на токены LLM",
    },
  ],
  faqItems: [
    {
      question: "Как архитектура защищает систему от галлюцинаций?",
      answer:
        "Модель изолируется в рамках предоставленного RAG-контекста, извлеченного из векторной базы данных. Ей запрещается использовать скрытые веса обучения для генерации фактов, а prompt-инструктор блокирует ответ, если релевантные фрагменты текста не найдены локально.",
    },
    {
      question: "Каким образом семантическое кэширование снижает операционные затраты?",
      answer:
        "Внедрение семантического кэша на уровне инфраструктуры перехватывает большинство повторных обращений, определяя близость смысла вопросов из оперативной памяти. Это избавляет от необходимости повторно отправлять тяжелые контексты во внешние LLM-сервисы.",
    },
    {
      question: "Как обеспечивается безопасность коммерческой тайны?",
      answer:
        "Вся векторная база данных, парсеры документов и поисковые движки разворачиваются в защищенном приватном контуре клиента. Внешние API инференса получают только обезличенные и изолированные текстовые фрагменты, очищенные от персональной информации.",
    },
  ],
  sections: [
    {
      title: "Очистка данных и векторная индексация",
      items: [
        "Анализ и предварительная обработка неструктурированных текстовых массивов, файлов и внутренней документации.",
        "Очистка исходных данных от дубликатов, системного мусора и некорректных символов перед индексацией.",
        "Разработка оптимальных стратегий нарезки документов на логические фрагменты для сохранения контекста.",
        "Генерация векторных эмбеддингов высокой плотности с использованием оптимизированных моделей преобразования.",
        "Проектирование и настройка геометрии HNSW-графов в векторных хранилищах для ускорения поиска.",
        "Настройка автоматического обновления векторных индексов при изменении или добавлении исходных документов.",
      ],
    },
    {
      title: "Оптимизация RAG-пайплайнов и стоимости",
      items: [
        "Развертывание систем семантического кэширования для мгновенного перехвата частых повторных запросов.",
        "Интеграция алгоритмов переранжирования результатов поиска для повышения точности ответов моделей.",
        "Разработка и тестирование кастомных систем системных инструкций и шаблонов промпт-инжиниринга.",
        "Конфигурация механизмов динамического ограничения контекстных окон под текущие лимиты провайдеров.",
        "Внедрение сквозного распределенного трейсинга цепочек вызовов для контроля задержек сетевого ввода-вывода.",
        "Настройка систем автоматического аудита стоимости токенов и прогнозирования операционной нагрузки.",
      ],
    },
  ],
};

export const ai_infrastructureEn = {
  ctaBanner: {
    title: "Let's discuss your AI infrastructure",
    text: "Tell us about your data volumes, security requirements, and model workloads. We'll prepare an architecture design and estimate within one business day.",
    buttonLabel: "Request an AI project estimate",
  },
  navTitle: "AI Infrastructure & RAG",
  title: "AI Infrastructure Design",
  tagline:
    "Integrating large language models into closed corporate perimeters with guaranteed data protection.",
  description:
    "Design and deployment of computing infrastructure for artificial intelligence workloads. Implementation of semantic search systems, inference cost optimization, and trade secret security.",
  features: [
    {
      title: "Anti-hallucination guardrails",
      text: "Strict isolation of AI models within verified local company documents.",
    },
    {
      title: "Operating cost control",
      text: "Efficient semantic caching preventing redundant repeated token submissions.",
    },
    {
      title: "Data security",
      text: "Deployment of search perimeters and databases within the organization's private boundary.",
    },
    {
      title: "Hybrid search",
      text: "Simultaneous consideration of semantic information similarity and exact identifier matches.",
    },
  ],
  techStack: [
    {
      subtitle: "Vector layer and semantics",
      description:
        "To handle complex knowledge bases, high-performance vector databases like [Qdrant] or specialized extensions like [pgvector] for PostgreSQL are deployed. Transforming unstructured documents into high-dimensional mathematical vectors is optimized via isolated [Embeddings API] instances that prevent index drift.",
      technologies: [
        {
          id: "qdrant",
          name: "Qdrant",
          glossary:
            "A vector database management system written in Rust, optimized for fast similarity search.",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary:
            "A PostgreSQL extension enabling storage, indexing, and vector embedding similarity search.",
        },
        {
          id: "embeddings-api",
          name: "Embeddings API",
          glossary:
            "An interface for converting text into mathematical vectors for subsequent semantic analysis.",
        },
      ],
    },
    {
      subtitle: "Orchestration and observability",
      description:
        "Context window management and hybrid search run on lightweight native layers. Request cost monitoring, prompt logging, and real-time execution trace debugging are integrated via [Langfuse], ensuring operational transparency.",
      technologies: [
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "An open-source platform for tracing, response quality evaluation, and token cost auditing in AI systems.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Data audit",
      text: "Evaluation of the structure, volume, and quality of corporate information intended for indexing.",
    },
    {
      title: "Perimeter design",
      text: "Selection and deployment of vector DBMS, HNSW index parameter tuning, and chunking strategies.",
    },
    {
      title: "Pipeline assembly",
      text: "Integration of caching systems, reranking mechanisms, and prompt engineering frameworks.",
    },
    {
      title: "Testing and launch",
      text: "Enabling distributed tracing, verifying hallucination prevention, and fixing SLAs.",
    },
  ],
  fitItems: [
    {
      title: "Enterprises with developed knowledge bases",
      text: "Organizations with significant volumes of closed internal regulations, technical documentation, and archives.",
      positive: true,
    },
    {
      title: "Fintech and legal platforms",
      text: "Products and internal services requiring automated analysis of complex contracts with absolute precision.",
      positive: true,
    },
    {
      title: "Large e-commerce aggregators",
      text: "Marketplaces implementing intelligent multilingual search across millions of distributed product cards.",
      positive: true,
    },
    {
      title: "Customer support teams",
      text: "Automation loops for first- and second-line user answers based on accumulated ticket history.",
      positive: true,
    },
    {
      title: "Companies without accumulated data",
      text: "New projects lacking unique text knowledge bases, proprietary regulations, or process history.",
      positive: false,
    },
    {
      title: "Linear automation scenarios",
      text: "Interaction systems where rigid programming condition trees are sufficient to close tasks.",
      positive: false,
    },
    {
      title: "Products without infrastructure budget",
      text: "Early prototypes planning to use exclusively public APIs without local information caching.",
      positive: false,
    },
    {
      title: "Dynamic real-time interfaces",
      text: "Transaction processing or market quote services where data becomes outdated every second.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "API token cost reduction up to 5x",
      text: "Proven result of AI infrastructure optimization through semantic caching and context window control.",
      metricValue: "−80%",
      metricLabel: "LLM token expense",
    },
  ],
  faqItems: [
    {
      question: "How does the architecture protect against hallucinations?",
      answer:
        "The model is isolated within the provided RAG context retrieved from the vector database. It is forbidden to use hidden training weights for generating facts, and a prompt instructor blocks answers when relevant text fragments are not found locally.",
    },
    {
      question: "How does semantic caching lower operational costs?",
      answer:
        "Deploying a semantic cache at the infrastructure level intercepts most recurring queries by determining semantic proximity from RAM. This eliminates the need to repeatedly send heavy contexts to external LLM services.",
    },
    {
      question: "How is commercial secret security ensured?",
      answer:
        "The entire vector database, document parsers, and search engines are deployed within the client's secure private perimeter. External inference APIs receive only anonymized and isolated text fragments stripped of personal information.",
    },
  ],
  sections: [
    {
      title: "Data cleansing and vector indexing",
      items: [
        "Analysis and preliminary processing of unstructured text arrays, files, and internal documentation.",
        "Cleansing source data from duplicates, system garbage, and incorrect characters before indexing.",
        "Developing optimal document chunking strategies to preserve context across logical fragments.",
        "Generating high-density vector embeddings using optimized transformation models.",
        "Designing and tuning HNSW graph geometry in vector stores to accelerate search speed.",
        "Configuring automatic vector index updates when source documents are modified or added.",
      ],
    },
    {
      title: "RAG pipeline optimization and cost control",
      items: [
        "Deploying semantic caching systems for instant interception of frequent recurring queries.",
        "Integrating search result reranking algorithms to improve model answer accuracy.",
        "Developing and testing custom system prompt instructions and prompt engineering templates.",
        "Configuring dynamic context window limiting mechanisms to match current provider limits.",
        "Implementing end-to-end distributed tracing of call chains to monitor network I/O latency.",
        "Setting up automated token cost auditing systems and operational load forecasting.",
      ],
    },
  ],
};
