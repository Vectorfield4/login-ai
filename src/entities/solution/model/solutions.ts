/**
 * Типы решений. Все текстовые поля — ключи i18n (см. src/i18n/ru.ts и src/i18n/en.ts);
 * компоненты вызывают `t(solution.title)` и т.д. Новые поля добавляются в оба
 * словаря (ru/en) одновременно.
 */

import type {
  CtaItem,
  FaqItem,
  FitItem,
  ProcessItem,
  ProofItem,
  Publishable,
  SolutionShowcase,
} from "@/shared/types/content";
import type { WithRelevants } from "@/shared/types/relevants";

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

/**
 * Теги для фильтров на главной. Значения — i18n-ключи из пространств
 * `audiences.*` (для кого) и `technologies.*` (технология).
 */
export type SolutionTag = string;

export interface Solution extends WithRelevants, Publishable {
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
