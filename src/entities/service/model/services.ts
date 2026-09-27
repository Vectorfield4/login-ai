import type { SvgIconComponent } from "@/shared/data/iconCatalog";
import type {
  ContentSection,
  CtaItem,
  FaqItem,
  FitItem,
  ProcessItem,
  ProofItem,
} from "@/shared/types/content";
import type { WithRelevants } from "@/shared/types/relevants";

export type { SvgIconComponent } from "@/shared/data/iconCatalog";

export interface ServiceFeature {
  title: string;
  text: string;
}

/**
 * Technology card of a stack group. `name` is shown as is (technology names
 * are not translated), `glossary` is an i18n key with a plain-language
 * explanation shown in the chip tooltip.
 */
export interface TechItem {
  /** Stable id: React key and tooltip state owner. */
  id: string;
  /** Display name, e.g. "TypeScript". */
  name: string;
  /** i18n key of the explanation. */
  glossary: string;
}

/**
 * Dense engineering group of the service stack: a heading, a description whose
 * `[TechName]` tokens are rendered inverted, and the chips of that group.
 * Both text fields are i18n keys.
 */
export interface TechGroup {
  /** i18n key, e.g. "services.software-development.techStack.0.subtitle". */
  subtitle: string;
  /** i18n key of a text with `[TechName]` tokens. */
  description: string;
  technologies: TechItem[];
}

/**
 * Текстовые поля — это ключи i18n (см. src/i18n/ru.ts и src/i18n/en.ts).
 * Компоненты вызывают `t(service.title)` и т.д. Новые поля добавляются
 * в оба словаря (ru/en) одновременно.
 */
export interface Service extends WithRelevants {
  slug: string;
  navTitle: string;
  title: string;
  tagline: string;
  description: string;
  icon: SvgIconComponent;
  features: ServiceFeature[];
  /** Технологический стек по группам (TechStackBlock) */
  techStack?: TechGroup[];
  /** Тематические блоки с пунктами (Section + список Dot) */
  sections?: ContentSection[];
  /** Шаги процесса «как мы работаем» */
  processSteps?: ProcessItem[];
  /** FAQ: вопросы и ответы */
  faqItems?: FaqItem[];
  /** Кому подходит / кому НЕ подходит */
  fitItems?: FitItem[];
  /** Кейс-доказательство с метрикой */
  proofItems?: ProofItem[];
  /** Контекстный CTA-баннер в середине страницы */
  ctaBanner?: CtaItem;
}
