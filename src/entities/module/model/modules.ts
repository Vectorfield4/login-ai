import type { SvgIconComponent } from "@/shared/data/iconCatalog";
import type { Publishable } from "@/shared/types/content";
import type { WithRelevants } from "@/shared/types/relevants";

export interface ModuleFeature {
  /** i18n key of the feature title. */
  title: string;
  /** i18n key of the feature text. */
  text: string;
}

/**
 * One data provider a module can run on. The module boundary is
 * provider-agnostic: the same module runs on PostgreSQL and on SQLite, and the
 * provider is chosen by configuration. `name` is shown as is (provider names
 * are not translated), `note` is an i18n key.
 */
export interface ModuleProvider {
  /** Stable id: React key and the `providers.<id>.note` key segment. */
  id: string;
  /** Display name, e.g. "SQLite". */
  name: string;
  /** i18n key of the short provider explanation. */
  note: string;
  /** The module runs on this provider. */
  supported: boolean;
  /** The provider a fresh deployment picks unless configured otherwise. */
  isDefault?: boolean;
}

/**
 * Текстовые поля это ключи i18n (см. src/shared/i18n/dict.ts). Компоненты
 * вызывают `t(module.title)` и т.д. Новые поля добавляются в оба словаря
 * (ru/en) одновременно.
 */
export interface Module extends WithRelevants, Publishable {
  slug: string;
  /** Icon key from `ENTITY_ICONS` (`src/shared/data/iconCatalog.ts`). */
  icon: SvgIconComponent;
  navTitle: string;
  title: string;
  tagline: string;
  description: string;
  features: ModuleFeature[];
  /** Data providers the module supports; every module supports SQLite. */
  providers: ModuleProvider[];
}
