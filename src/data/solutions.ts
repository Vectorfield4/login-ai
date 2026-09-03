import agenticSystemsImage from "../assets/images/agentic-systems.svg";
import appDevelopmentSystemsImage from "../assets/images/app-development-systems.svg";
import computerVisionImage from "../assets/images/computer-vision.svg";
import contentGenerationImage from "../assets/images/content-generation.svg";
import customerExperienceImage from "../assets/images/customer-experience.svg";
import manufacturersImage from "../assets/images/manufacturers.svg";
import medicalClinicsImage from "../assets/images/medical-clinics.svg";
import reputationManagementImage from "../assets/images/reputation-management.svg";
import videoGenerationImage from "../assets/images/video-generation.svg";

export interface SolutionFeature {
  title: string;
  text: string;
}

export interface SolutionSection {
  title: string;
  items: string[];
}

export interface Technology {
  title: string;
  text: string;
}

export interface BusinessCategory {
  title: string;
  text: string;
}

export interface ShowcaseItem {
  title: string;
  videoUrl?: string;
}

export interface SolutionShowcase {
  title: string;
  note: string;
  items: ShowcaseItem[];
}

/**
 * Теги для фильтров на главной. Значения — i18n-ключи из пространств
 * `audiences.*` (для кого) и `technologies.*` (технология).
 */
export type SolutionTag = string;

/**
 * Текстовые поля — это ключи i18n (см. src/i18n/ru.ts и src/i18n/en.ts).
 * Компоненты вызывают `t(solution.title)` и т.д. Новые поля добавляются
 * в оба словаря (ru/en) одновременно.
 */
export interface Solution {
  slug: string;
  navTitle: string;
  title: string;
  tagline: string;
  description: string;
  /**
   * Опциональная тематическая иллюстрация (URL ассета из src/assets,
   * импорт через Vite). Рендерится условно в карточке на главной и
   * в hero-секции страницы решения.
   */
  image?: string;
  features?: SolutionFeature[];
  sections?: SolutionSection[];
  technologies?: Technology[];
  referencesNote?: string;
  businessCategories?: BusinessCategory[];
  showcase?: SolutionShowcase;
  /** Фильтр «для кого»: ключи audiences.* */
  audiences: SolutionTag[];
  /** Фильтр «технология»: ключи technologies.* */
  tags: SolutionTag[];
}

export const solutions: Solution[] = [
  {
    slug: "agentic-systems",
    navTitle: "solutions.agentic-systems.navTitle",
    title: "solutions.agentic-systems.title",
    tagline: "solutions.agentic-systems.tagline",
    description: "solutions.agentic-systems.description",
    image: agenticSystemsImage,
    audiences: ["audiences.manufacturers", "audiences.businessOwners"],
    tags: ["technologies.agentic"],
    features: [
      {
        title: "solutions.agentic-systems.features.0.title",
        text: "solutions.agentic-systems.features.0.text",
      },
      {
        title: "solutions.agentic-systems.features.1.title",
        text: "solutions.agentic-systems.features.1.text",
      },
      {
        title: "solutions.agentic-systems.features.2.title",
        text: "solutions.agentic-systems.features.2.text",
      },
      {
        title: "solutions.agentic-systems.features.3.title",
        text: "solutions.agentic-systems.features.3.text",
      },
    ],
  },
  {
    slug: "computer-vision",
    navTitle: "solutions.computer-vision.navTitle",
    title: "solutions.computer-vision.title",
    tagline: "solutions.computer-vision.tagline",
    description: "solutions.computer-vision.description",
    image: computerVisionImage,
    audiences: ["audiences.manufacturers"],
    tags: ["technologies.computerVision"],
    features: [
      {
        title: "solutions.computer-vision.features.0.title",
        text: "solutions.computer-vision.features.0.text",
      },
      {
        title: "solutions.computer-vision.features.1.title",
        text: "solutions.computer-vision.features.1.text",
      },
      {
        title: "solutions.computer-vision.features.2.title",
        text: "solutions.computer-vision.features.2.text",
      },
      {
        title: "solutions.computer-vision.features.3.title",
        text: "solutions.computer-vision.features.3.text",
      },
    ],
  },
  {
    slug: "customer-experience",
    navTitle: "solutions.customer-experience.navTitle",
    title: "solutions.customer-experience.title",
    tagline: "solutions.customer-experience.tagline",
    description: "solutions.customer-experience.description",
    image: customerExperienceImage,
    audiences: ["audiences.clinics", "audiences.businessOwners"],
    tags: ["technologies.llm"],
    features: [
      {
        title: "solutions.customer-experience.features.0.title",
        text: "solutions.customer-experience.features.0.text",
      },
      {
        title: "solutions.customer-experience.features.1.title",
        text: "solutions.customer-experience.features.1.text",
      },
      {
        title: "solutions.customer-experience.features.2.title",
        text: "solutions.customer-experience.features.2.text",
      },
      {
        title: "solutions.customer-experience.features.3.title",
        text: "solutions.customer-experience.features.3.text",
      },
    ],
  },
  {
    slug: "content-generation",
    navTitle: "solutions.content-generation.navTitle",
    title: "solutions.content-generation.title",
    tagline: "solutions.content-generation.tagline",
    description: "solutions.content-generation.description",
    image: contentGenerationImage,
    audiences: ["audiences.clinics", "audiences.adAgencies", "audiences.businessOwners"],
    tags: ["technologies.content"],
    features: [
      {
        title: "solutions.content-generation.features.0.title",
        text: "solutions.content-generation.features.0.text",
      },
      {
        title: "solutions.content-generation.features.1.title",
        text: "solutions.content-generation.features.1.text",
      },
      {
        title: "solutions.content-generation.features.2.title",
        text: "solutions.content-generation.features.2.text",
      },
      {
        title: "solutions.content-generation.features.3.title",
        text: "solutions.content-generation.features.3.text",
      },
    ],
  },
  {
    slug: "app-development-systems",
    navTitle: "solutions.app-development-systems.navTitle",
    title: "solutions.app-development-systems.title",
    tagline: "solutions.app-development-systems.tagline",
    description: "solutions.app-development-systems.description",
    image: appDevelopmentSystemsImage,
    audiences: ["audiences.businessOwners"],
    tags: ["technologies.agentic"],
    features: [
      {
        title: "solutions.app-development-systems.features.0.title",
        text: "solutions.app-development-systems.features.0.text",
      },
      {
        title: "solutions.app-development-systems.features.1.title",
        text: "solutions.app-development-systems.features.1.text",
      },
      {
        title: "solutions.app-development-systems.features.2.title",
        text: "solutions.app-development-systems.features.2.text",
      },
      {
        title: "solutions.app-development-systems.features.3.title",
        text: "solutions.app-development-systems.features.3.text",
      },
    ],
  },
  {
    slug: "medical-clinics",
    navTitle: "solutions.medical-clinics.navTitle",
    title: "solutions.medical-clinics.title",
    tagline: "solutions.medical-clinics.tagline",
    description: "solutions.medical-clinics.description",
    image: medicalClinicsImage,
    audiences: ["audiences.clinics"],
    tags: ["technologies.llm", "technologies.computerVision"],
    features: [
      {
        title: "solutions.medical-clinics.features.0.title",
        text: "solutions.medical-clinics.features.0.text",
      },
      {
        title: "solutions.medical-clinics.features.1.title",
        text: "solutions.medical-clinics.features.1.text",
      },
      {
        title: "solutions.medical-clinics.features.2.title",
        text: "solutions.medical-clinics.features.2.text",
      },
      {
        title: "solutions.medical-clinics.features.3.title",
        text: "solutions.medical-clinics.features.3.text",
      },
      {
        title: "solutions.medical-clinics.features.4.title",
        text: "solutions.medical-clinics.features.4.text",
      },
      {
        title: "solutions.medical-clinics.features.5.title",
        text: "solutions.medical-clinics.features.5.text",
      },
    ],
  },
  {
    slug: "video-generation",
    navTitle: "solutions.video-generation.navTitle",
    title: "solutions.video-generation.title",
    tagline: "solutions.video-generation.tagline",
    description: "solutions.video-generation.description",
    image: videoGenerationImage,
    audiences: ["audiences.adAgencies", "audiences.businessOwners"],
    tags: ["technologies.video"],
    sections: [
      {
        title: "solutions.video-generation.sections.0.title",
        items: [
          "solutions.video-generation.sections.0.items.0",
          "solutions.video-generation.sections.0.items.1",
          "solutions.video-generation.sections.0.items.2",
          "solutions.video-generation.sections.0.items.3",
          "solutions.video-generation.sections.0.items.4",
          "solutions.video-generation.sections.0.items.5",
        ],
      },
      {
        title: "solutions.video-generation.sections.1.title",
        items: [
          "solutions.video-generation.sections.1.items.0",
          "solutions.video-generation.sections.1.items.1",
          "solutions.video-generation.sections.1.items.2",
          "solutions.video-generation.sections.1.items.3",
        ],
      },
      {
        title: "solutions.video-generation.sections.2.title",
        items: [
          "solutions.video-generation.sections.2.items.0",
          "solutions.video-generation.sections.2.items.1",
          "solutions.video-generation.sections.2.items.2",
          "solutions.video-generation.sections.2.items.3",
          "solutions.video-generation.sections.2.items.4",
        ],
      },
      {
        title: "solutions.video-generation.sections.3.title",
        items: [
          "solutions.video-generation.sections.3.items.0",
          "solutions.video-generation.sections.3.items.1",
          "solutions.video-generation.sections.3.items.2",
          "solutions.video-generation.sections.3.items.3",
        ],
      },
    ],
    technologies: [
      {
        title: "solutions.video-generation.technologies.0.title",
        text: "solutions.video-generation.technologies.0.text",
      },
      {
        title: "solutions.video-generation.technologies.1.title",
        text: "solutions.video-generation.technologies.1.text",
      },
      {
        title: "solutions.video-generation.technologies.2.title",
        text: "solutions.video-generation.technologies.2.text",
      },
    ],
    referencesNote: "solutions.video-generation.referencesNote",
    businessCategories: [
      {
        title: "solutions.video-generation.businessCategories.0.title",
        text: "solutions.video-generation.businessCategories.0.text",
      },
      {
        title: "solutions.video-generation.businessCategories.1.title",
        text: "solutions.video-generation.businessCategories.1.text",
      },
      {
        title: "solutions.video-generation.businessCategories.2.title",
        text: "solutions.video-generation.businessCategories.2.text",
      },
      {
        title: "solutions.video-generation.businessCategories.3.title",
        text: "solutions.video-generation.businessCategories.3.text",
      },
      {
        title: "solutions.video-generation.businessCategories.4.title",
        text: "solutions.video-generation.businessCategories.4.text",
      },
      {
        title: "solutions.video-generation.businessCategories.5.title",
        text: "solutions.video-generation.businessCategories.5.text",
      },
    ],
    showcase: {
      title: "solutions.video-generation.showcase.title",
      note: "solutions.video-generation.showcase.note",
      items: [
        { title: "solutions.video-generation.showcase.items.0.title" },
        { title: "solutions.video-generation.showcase.items.1.title" },
        { title: "solutions.video-generation.showcase.items.2.title" },
        { title: "solutions.video-generation.showcase.items.3.title" },
        { title: "solutions.video-generation.showcase.items.4.title" },
        { title: "solutions.video-generation.showcase.items.5.title" },
      ],
    },
  },
  {
    slug: "manufacturers",
    navTitle: "solutions.manufacturers.navTitle",
    title: "solutions.manufacturers.title",
    tagline: "solutions.manufacturers.tagline",
    description: "solutions.manufacturers.description",
    image: manufacturersImage,
    audiences: ["audiences.manufacturers"],
    tags: ["technologies.computerVision", "technologies.agentic"],
    features: [
      {
        title: "solutions.manufacturers.features.0.title",
        text: "solutions.manufacturers.features.0.text",
      },
      {
        title: "solutions.manufacturers.features.1.title",
        text: "solutions.manufacturers.features.1.text",
      },
      {
        title: "solutions.manufacturers.features.2.title",
        text: "solutions.manufacturers.features.2.text",
      },
      {
        title: "solutions.manufacturers.features.3.title",
        text: "solutions.manufacturers.features.3.text",
      },
      {
        title: "solutions.manufacturers.features.4.title",
        text: "solutions.manufacturers.features.4.text",
      },
      {
        title: "solutions.manufacturers.features.5.title",
        text: "solutions.manufacturers.features.5.text",
      },
    ],
  },
  {
    slug: "reputation-management",
    navTitle: "solutions.reputation-management.navTitle",
    title: "solutions.reputation-management.title",
    tagline: "solutions.reputation-management.tagline",
    description: "solutions.reputation-management.description",
    image: reputationManagementImage,
    audiences: ["audiences.manufacturers", "audiences.adAgencies", "audiences.businessOwners"],
    tags: ["technologies.reputation"],
    features: [
      {
        title: "solutions.reputation-management.features.0.title",
        text: "solutions.reputation-management.features.0.text",
      },
      {
        title: "solutions.reputation-management.features.1.title",
        text: "solutions.reputation-management.features.1.text",
      },
      {
        title: "solutions.reputation-management.features.2.title",
        text: "solutions.reputation-management.features.2.text",
      },
      {
        title: "solutions.reputation-management.features.3.title",
        text: "solutions.reputation-management.features.3.text",
      },
      {
        title: "solutions.reputation-management.features.4.title",
        text: "solutions.reputation-management.features.4.text",
      },
    ],
  },
];

export function getSolution(slug: string | undefined): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
