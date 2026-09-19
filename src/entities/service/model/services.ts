import type { LucideIcon } from "lucide-react";
export type SvgIconComponent = LucideIcon | string;

import type { WithRelevants } from "@/features/relevant-items/model/relevants.types";
import type {
  ContentSection,
  CtaItem,
  FaqItem,
  FitItem,
  ProcessItem,
  ProofItem,
} from "@/shared/types/content";

export interface ServiceFeature {
  title: string;
  text: string;
}

/**
 * Тип ПО и рекомендуемые (best practice) языки и технологии для него.
 * Категории (items) не переводятся — это имена технологий.
 */
export interface ServiceCategory {
  title: string;
  items: string[];
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
  /** Дополнительные блоки, например «виды ПО и языки» */
  categories?: ServiceCategory[];
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
