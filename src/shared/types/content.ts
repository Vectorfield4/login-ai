import type { LucideIcon } from "@/shared/data/iconCatalog";

/**
 * Рубрика статьи. Объявлено здесь, а не в `entities/news`: тип нужен и
 * доменной модели, и shared-атомам (`NewsCategoryLabel`, `NewsMeta`,
 * `NewsPlaceholder`), а объявление одно на обоих.
 */
export type NewsCategory = "insights" | "case-study" | "research" | "product";

/**
 * Publication state shared by every generated entity (article frontmatter and
 * service/solution/case fixtures). `draft` hides the page and drops links to it;
 * `updatedAt` (ISO date) feeds the staleness report.
 */
export interface Publishable {
  draft?: boolean;
  updatedAt?: string;
}

/**
 * Render-ready image reference. The `src` is already produced by Astro's
 * optimizer (an `ImageMetadata.src` mapped in `app/data/*`), so an entity or
 * widget renders a plain `<img>` without importing `astro`. Optional: the
 * consumer falls back to an icon when the asset is missing.
 */
export interface ImageSource {
  src: string;
  alt?: string;
}

/**
 * Несколько SVG-вариантов одной диаграммы (светлый и тёмный), уже разрешённых
 * в `src` на странице. Механизм переключает их атрибутом `data-theme`.
 */
export interface DiagramSource {
  light: string;
  dark: string;
}

/** Текстовые поля — ключи i18n (см. src/shared/i18n/ru.ts / en.ts). */

/**
 * Тип шага процесса. Управляет только декором карточки (шестерёнки на
 * системном дизайне, запись в блокнот на сборе требований, поток данных на
 * обработке) — текст шага от типа не зависит, поэтому поле опциональное и
 * добавление нового типа не трогает словари.
 */
export type ProcessStepType =
  | "discovery"
  | "requirements"
  | "system-design"
  | "architecture"
  | "data-processing"
  | "prototyping"
  | "implementation"
  | "integration"
  | "testing"
  | "deployment"
  | "analysis"
  | "automation";

/** Шаг процесса/воркфлоу (ProcessHorizontal). */
export interface ProcessItem {
  title: string;
  text: string;
  /** Декор шага; не задан — нейтральный декор без анимации. */
  processType?: ProcessStepType;
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

/** Ограничение или цена решения (TradeoffsSection): короткое имя и объяснение. */
export interface TradeoffItem {
  /** Короткое имя ограничения. */
  title: string;
  /** Полное предложение с причиной или ценой. */
  text: string;
}

/**
 * Этап механизма (MechanismSection): заголовок, объяснение и, опционально,
 * схема. `diagram` — ключ i18n, значение которого является исходником Mermaid;
 * схему рисует клиентский остров, поэтому текст остаётся в статичном HTML.
 */
export interface MechanismItem {
  /** Короткий заголовок этапа. */
  title: string;
  /** Объяснение этапа. */
  text: string;
  /** Порядковый номер, если он отличается от позиции в массиве. */
  step?: number;
  /** Ключ i18n с исходником Mermaid для схемы этапа. */
  diagram?: string;
}

/**
 * Плитка результата (OutcomesSection): иконка, крупное значение, заголовок и
 * пояснение. Все поля обязательны, чтобы форма пункта была одинаковой во всех
 * блоках и у каждого пункта был визуальный якорь.
 */
export interface OutcomeItem {
  /** Короткий заголовок результата. */
  title: string;
  /** Крупное значение: число, срок, кратность или короткий факт. */
  value: string;
  /** Пояснение с конкретикой. */
  text: string;
  /** Ключ каталога иконок (`ENTITY_ICONS`). */
  icon: string;
}

/** Пункт чек-листа «что проверяем» (ScopeSection): короткое имя и пояснение. */
export interface ScopeItem {
  /** Короткий пункт проверки. */
  title: string;
  /** Опциональное пояснение. */
  text?: string;
}

/** Пункт состава поставки «что входит / что вы получаете» (DeliverablesSection). */
export interface DeliverableItem {
  /** Короткое имя пункта поставки. */
  title: string;
  /** Пояснение с конкретикой. */
  text: string;
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
