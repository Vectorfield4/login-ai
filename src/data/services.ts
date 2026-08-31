import type { SvgIconComponent } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import DomainIcon from "@mui/icons-material/Domain";
import InsightsIcon from "@mui/icons-material/Insights";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SchoolIcon from "@mui/icons-material/School";
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

/**
 * Текстовые поля — это ключи i18n (см. src/i18n/ru.ts и src/i18n/en.ts).
 * Компоненты вызывают `t(service.title)` и т.д. Новые поля добавляются
 * в оба словаря (ru/en) одновременно.
 */
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
    navTitle: "services.software-development.navTitle",
    title: "services.software-development.title",
    tagline: "services.software-development.tagline",
    description: "services.software-development.description",
    icon: CodeIcon,
    features: [
      {
        title: "services.software-development.features.0.title",
        text: "services.software-development.features.0.text",
      },
      {
        title: "services.software-development.features.1.title",
        text: "services.software-development.features.1.text",
      },
      {
        title: "services.software-development.features.2.title",
        text: "services.software-development.features.2.text",
      },
      {
        title: "services.software-development.features.3.title",
        text: "services.software-development.features.3.text",
      },
    ],
    categories: [
      {
        title: "services.software-development.categories.0.title",
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
        title: "services.software-development.categories.1.title",
        items: [
          "Swift (iOS)",
          "Kotlin (Android)",
          "Flutter (Dart)",
          "React Native",
          "Java (Android)",
        ],
      },
      {
        title: "services.software-development.categories.2.title",
        items: ["C# (.NET)", "C++", "Rust (Tauri)", "Electron (TypeScript)", "Python (Qt)"],
      },
      {
        title: "services.software-development.categories.3.title",
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
        title: "services.software-development.categories.4.title",
        items: ["Python (TensorFlow, PyTorch)", "C++", "R", "CUDA", "JavaScript (ONNX Runtime)"],
      },
      {
        title: "services.software-development.categories.5.title",
        items: ["Java", "C# (.NET)", "Python", "TypeScript", "1C:Enterprise"],
      },
      {
        title: "services.software-development.categories.6.title",
        items: ["TypeScript (Next.js)", "PHP (Laravel)", "Java", "Go", "Python (Django)"],
      },
      {
        title: "services.software-development.categories.7.title",
        items: ["Python", "TypeScript", "JavaScript", "Go"],
      },
      {
        title: "services.software-development.categories.8.title",
        items: ["C", "C++", "Rust", "Python (MicroPython)"],
      },
    ],
  },
  {
    slug: "corporate-websites",
    navTitle: "services.corporate-websites.navTitle",
    title: "services.corporate-websites.title",
    tagline: "services.corporate-websites.tagline",
    description: "services.corporate-websites.description",
    icon: DomainIcon,
    features: [
      {
        title: "services.corporate-websites.features.0.title",
        text: "services.corporate-websites.features.0.text",
      },
      {
        title: "services.corporate-websites.features.1.title",
        text: "services.corporate-websites.features.1.text",
      },
      {
        title: "services.corporate-websites.features.2.title",
        text: "services.corporate-websites.features.2.text",
      },
      {
        title: "services.corporate-websites.features.3.title",
        text: "services.corporate-websites.features.3.text",
      },
    ],
  },
  {
    slug: "landing-pages",
    navTitle: "services.landing-pages.navTitle",
    title: "services.landing-pages.title",
    tagline: "services.landing-pages.tagline",
    description: "services.landing-pages.description",
    icon: RocketLaunchIcon,
    features: [
      {
        title: "services.landing-pages.features.0.title",
        text: "services.landing-pages.features.0.text",
      },
      {
        title: "services.landing-pages.features.1.title",
        text: "services.landing-pages.features.1.text",
      },
      {
        title: "services.landing-pages.features.2.title",
        text: "services.landing-pages.features.2.text",
      },
      {
        title: "services.landing-pages.features.3.title",
        text: "services.landing-pages.features.3.text",
      },
    ],
  },
  {
    slug: "seo-aeo",
    navTitle: "services.seo-aeo.navTitle",
    title: "services.seo-aeo.title",
    tagline: "services.seo-aeo.tagline",
    description: "services.seo-aeo.description",
    icon: InsightsIcon,
    features: [
      {
        title: "services.seo-aeo.features.0.title",
        text: "services.seo-aeo.features.0.text",
      },
      {
        title: "services.seo-aeo.features.1.title",
        text: "services.seo-aeo.features.1.text",
      },
      {
        title: "services.seo-aeo.features.2.title",
        text: "services.seo-aeo.features.2.text",
      },
      {
        title: "services.seo-aeo.features.3.title",
        text: "services.seo-aeo.features.3.text",
      },
    ],
  },
  {
    slug: "information-monitoring",
    navTitle: "services.information-monitoring.navTitle",
    title: "services.information-monitoring.title",
    tagline: "services.information-monitoring.tagline",
    description: "services.information-monitoring.description",
    icon: TravelExploreIcon,
    features: [
      {
        title: "services.information-monitoring.features.0.title",
        text: "services.information-monitoring.features.0.text",
      },
      {
        title: "services.information-monitoring.features.1.title",
        text: "services.information-monitoring.features.1.text",
      },
      {
        title: "services.information-monitoring.features.2.title",
        text: "services.information-monitoring.features.2.text",
      },
      {
        title: "services.information-monitoring.features.3.title",
        text: "services.information-monitoring.features.3.text",
      },
    ],
  },
  {
    slug: "corporate-ai-training",
    navTitle: "services.corporate-ai-training.navTitle",
    title: "services.corporate-ai-training.title",
    tagline: "services.corporate-ai-training.tagline",
    description: "services.corporate-ai-training.description",
    icon: SchoolIcon,
    features: [
      {
        title: "services.corporate-ai-training.features.0.title",
        text: "services.corporate-ai-training.features.0.text",
      },
      {
        title: "services.corporate-ai-training.features.1.title",
        text: "services.corporate-ai-training.features.1.text",
      },
      {
        title: "services.corporate-ai-training.features.2.title",
        text: "services.corporate-ai-training.features.2.text",
      },
      {
        title: "services.corporate-ai-training.features.3.title",
        text: "services.corporate-ai-training.features.3.text",
      },
    ],
  },
];

export function getService(slug: string | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}
