import type { SvgIconComponent } from "@mui/icons-material";
import type { WithRelevants } from "@/features/relevant-items/model/relevants.types";

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
}
