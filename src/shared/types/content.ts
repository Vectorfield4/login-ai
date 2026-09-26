import type { LucideIcon } from "@/shared/data/iconCatalog";

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
