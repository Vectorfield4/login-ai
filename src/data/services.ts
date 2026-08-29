import type { SvgIconComponent } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import DomainIcon from "@mui/icons-material/Domain";
import InsightsIcon from "@mui/icons-material/Insights";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

export interface ServiceFeature {
  title: string;
  text: string;
}

/** Тип ПО и рекомендуемые (best practice) языки и технологии для него */
export interface ServiceCategory {
  title: string;
  items: string[];
}

export interface Service {
  slug: string;
  navTitle: string;
  title: string;
  tagline: string;
  description: string;
  icon: SvgIconComponent;
  features: ServiceFeature[];
  /** Дополнительные блоки, например «виды ПО и языки» */
  categories?: ServiceCategory[];
}

export const services: Service[] = [
  {
    slug: "software-development",
    navTitle: "Разработка ПО",
    title: "Разработка программного обеспечения",
    tagline: "Создаём надёжное ПО под ваши задачи: от веб-сервисов до ИИ-платформ.",
    description:
      "Проектируем и разрабатываем программное обеспечение полного цикла: анализ требований, архитектура, разработка, тестирование и сопровождение. Подбираем стек по best practice под конкретный тип продукта — чтобы система была быстрой, безопасной и масштабируемой.",
    icon: CodeIcon,
    features: [
      {
        title: "Полный цикл разработки",
        text: "От прототипа и архитектуры до релиза и поддержки: вы получаете готовый продукт, а не набор кода.",
      },
      {
        title: "Грамотная архитектура",
        text: "Проектируем модульные, тестируемые и масштабируемые системы — под нагрузку и развитие бизнеса.",
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
    categories: [
      {
        title: "Веб-приложения и SaaS",
        items: [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Vue.js",
          "Angular",
          "Node.js",
          "Python (Django, FastAPI)",
          "Go",
          "PHP (Laravel)",
        ],
      },
      {
        title: "Мобильные приложения",
        items: [
          "Swift (iOS)",
          "Kotlin (Android)",
          "Flutter (Dart)",
          "React Native",
          "Java (Android)",
        ],
      },
      {
        title: "Десктопные приложения",
        items: ["C# (.NET)", "C++", "Rust (Tauri)", "Electron (TypeScript)", "Python (Qt)"],
      },
      {
        title: "Backend и API",
        items: [
          "Go",
          "Rust",
          "TypeScript (Node.js)",
          "Python (FastAPI)",
          "Java (Spring Boot)",
          "C# (.NET)",
        ],
      },
      {
        title: "ИИ и машинное обучение",
        items: ["Python (TensorFlow, PyTorch)", "C++", "R", "CUDA", "JavaScript (ONNX Runtime)"],
      },
      {
        title: "Корпоративные системы (ERP, CRM)",
        items: ["Java", "C# (.NET)", "Python", "TypeScript", "1С:Предприятие"],
      },
      {
        title: "E-commerce",
        items: ["TypeScript (Next.js)", "PHP (Laravel)", "Java", "Go", "Python (Django)"],
      },
      {
        title: "Боты и автоматизация",
        items: ["Python", "TypeScript", "JavaScript", "Go"],
      },
      {
        title: "Встраиваемое ПО и IoT",
        items: ["C", "C++", "Rust", "Python (MicroPython)"],
      },
    ],
  },
  {
    slug: "corporate-websites",
    navTitle: "Корпоративные сайты",
    title: "Разработка корпоративных сайтов",
    tagline: "Современный сайт компании: презентация, доверие и поток заявок.",
    description:
      "Создаём корпоративные сайты, которые работают на бизнес: продуманная структура, фирменный дизайн, удобная админ-панель и интеграции с CRM, аналитикой и платёжными системами.",
    icon: DomainIcon,
    features: [
      {
        title: "Структура и UX",
        text: "Проектируем информационную архитектуру и пользовательские сценарии — посетитель быстро находит нужное.",
      },
      {
        title: "Фирменный дизайн",
        text: "Дизайн в вашем стиле: адаптивная вёрстка под все устройства, единый визуальный язык.",
      },
      {
        title: "Удобная админ-панель",
        text: "Редактируйте контент без программиста: новости, страницы, каталог и заявки.",
      },
      {
        title: "Интеграции",
        text: "CRM, телефония, аналитика, карты, формы и платёжные системы — всё работает из коробки.",
      },
    ],
  },
  {
    slug: "landing-pages",
    navTitle: "Лендинги",
    title: "Разработка лендингов",
    tagline: "Продающие одностраничники, которые превращают посетителей в клиентов.",
    description:
      "Разрабатываем лендинги под рекламные кампании и продукты: продающая структура, быстрая загрузка, A/B-тесты и аналитика воронки. Запускаемся за считанные дни.",
    icon: RocketLaunchIcon,
    features: [
      {
        title: "Продающая структура",
        text: "Оффер, преимущества, доказательства, призыв к действию — каждый блок работает на конверсию.",
      },
      {
        title: "Высокая скорость",
        text: "Оптимизируем загрузку и Core Web Vitals — страница открывается мгновенно даже на мобильных.",
      },
      {
        title: "A/B-тестирование",
        text: "Тестируем заголовки, офферы и кнопки — усиливаем то, что приносит больше заявок.",
      },
      {
        title: "Интеграция с CRM",
        text: "Заявки сразу попадают в amoCRM, Bitrix24 или на почту, настроены уведомления и триггерные письма.",
      },
    ],
  },
  {
    slug: "seo-aeo",
    navTitle: "SEO & AEO",
    title: "SEO и AEO — оптимизация для поиска и ИИ-агентов",
    tagline: "Будьте видимы и в классическом поиске, и в ответах ИИ-ассистентов.",
    description:
      "SEO выводит сайт в топ классической выдачи, а AEO (Agent Engine Optimization) делает ваш контент понятным для ИИ-агентов — ChatGPT, Perplexity и поисковых ИИ. Вместе они дают рост трафика и доверия.",
    icon: InsightsIcon,
    features: [
      {
        title: "Технический SEO",
        text: "Индексация, скорость, структура URL, микроразметка и карта сайта — база для роста позиций.",
      },
      {
        title: "Контент-стратегия",
        text: "Семантика, структура страниц и тексты, которые отвечают на реальные вопросы пользователей.",
      },
      {
        title: "AEO — оптимизация под ИИ",
        text: "Структурированные данные, FAQ, чёткие ответы и цитируемые блоки — ваш контент попадает в ответы ИИ.",
      },
      {
        title: "Мониторинг и отчёты",
        text: "Отслеживаем позиции, трафик и упоминания в ИИ-ответах, показываем измеримый результат.",
      },
    ],
  },
  {
    slug: "information-monitoring",
    navTitle: "Мониторинг информации",
    title: "Сбор и мониторинг информации на заказ",
    tagline: "Парсинг, мониторинг цен, конкурентов и упоминаний — нужные данные в нужный момент.",
    description:
      "Собираем информацию из открытых источников: сайты, маркетплейсы, соцсети, СМИ. Настраиваем регулярный мониторинг с отчётами и оповещениями, чтобы вы всегда знали, что происходит на рынке.",
    icon: TravelExploreIcon,
    features: [
      {
        title: "Парсинг данных",
        text: "Сбор данных с сайтов и маркетплейсов по заданным правилам: каталоги, цены, характеристики, отзывы.",
      },
      {
        title: "Мониторинг конкурентов",
        text: "Следим за ценами, акциями, ассортиментом и контентом конкурентов — изменения фиксируются автоматически.",
      },
      {
        title: "Мониторинг СМИ и соцсетей",
        text: "Упоминания бренда и тематики в новостях, Telegram, VK и отзывах — с тональностью и источниками.",
      },
      {
        title: "Отчёты и оповещения",
        text: "Регулярные дайджесты, алерты при важных изменениях и выгрузка данных в Excel, API или вашу CRM.",
      },
    ],
  },
];

export function getService(slug: string | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}
