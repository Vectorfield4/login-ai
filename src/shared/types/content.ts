import type { LucideIcon } from "@/shared/data/iconCatalog";

/**
 * Рубрика статьи. Объявлено здесь, а не в `entities/news`: тип нужен и
 * доменной модели, и shared-атомам (`NewsCategoryLabel`, `NewsMeta`,
 * `NewsPlaceholder`), а объявление одно на обоих.
 */
export type NewsCategory = "insights" | "case-study" | "research" | "product";

/** Текстовые поля — ключи i18n (см. src/shared/i18n/ru.ts / en.ts). */

/** Шаг процесса/воркфлоу (ProcessSection). */
export interface ProcessItem {
  title: string;
  text: string;
}

/**
 * Шаг нумерованного списка-ссылки (StepList): кружок с номером, заголовок,
 * пояснение и иконка. Поля — i18n-ключи, ссылка — путь от корня сайта
 * (`routeUrl` добавит префикс языка сам).
 */
export interface StepListItem {
  title: string;
  text: string;
  href: string;
  /** Ключ каталога иконок или готовый lucide-компонент. */
  icon: string | LucideIcon;
}

/** Тематический блок с пунктами-строками (Section + список Dot). */
export interface ContentSection {
  title: string;
  items: string[];
}

/** Вопрос-ответ FAQ (FaqSection). */
export interface FaqItem {
  question: string;
  answer: string;
}

/** Карточка «кому подходит / кому НЕ подходит» (FitSection). */
export interface FitItem {
  title: string;
  text: string;
  /** true — «подходит», false — «не подходит». */
  positive: boolean;
}

/** Кейс-доказательство с метрикой (ProofSection). */
export interface ProofItem {
  title: string;
  text: string;
  /** Значение метрики (например, «−38%»). */
  metricValue: string;
  /** Подпись метрики (например, «время ответа поддержки»). */
  metricLabel: string;
}

/** Контекстный CTA-блок страницы (поля — i18n-ключи). */
export interface CtaItem {
  title: string;
  text: string;
  buttonLabel: string;
}

/** Один ролик видео-витрины (VideoShowcase). */
export interface ShowcaseItem {
  title: string;
  videoUrl?: string;
}

/** Видео-витрина: заголовок, примечание и список роликов. */
export interface SolutionShowcase {
  title: string;
  note: string;
  items: ShowcaseItem[];
}

/** Метрика результата кейса (label/value — i18n-ключи `cases.<slug>.metrics.N.*`). */
export interface CaseMetric {
  label: string;
  value: string;
}

/** Число, анимируемое на странице кейса (CountersSection). */
export interface CounterItem {
  value: number;
  /** i18n key of the counter label. */
  label: string;
}

/** «заголовок + текст» card (TileSection, FitSection). */
export interface TextItem {
  /** i18n key of the title. */
  title: string;
  /** i18n key of the text. */
  text: string;
}

/** KPI stat (StatGrid, StatsSection). */
export interface StatItem {
  /** i18n key of the stat label. */
  label: string;
  /** i18n key of the value (string, no number formatting). */
  value: string;
}

/** Depth slider level description (index = level, AiVisualSlider). */
export interface SliderLevel {
  /** i18n key of the depth mode name. */
  title: string;
  /** i18n key of the mode description. */
  text: string;
}
