import {
  Building2,
  CheckCheck,
  Code2,
  Compass,
  GraduationCap,
  Headset,
  Hospital,
  type LucideIcon,
  Radar,
  Rocket,
  Sparkles,
  Star,
  TrendingUp,
  Video,
  WandSparkles,
} from "lucide-react";

export type { LucideIcon };

/**
 * Каталог иконок сущностей на lucide-react. Зеркалит ключи
 * `src/shared/ui/atoms/iconCatalog.ts` (ENTITY_ICONS): фикстуры услуг и кейсов
 * хранят `icon` строкой, маппинг ключ → компонент живёт на стороне каждого
 * рендера (src — MUI, astro — lucide).
 */
export const ENTITY_ICONS: Record<string, LucideIcon> = {
  "auto-awesome": WandSparkles,
  code: Code2,
  domain: Building2,
  "fact-check": CheckCheck,
  insights: TrendingUp,
  "local-hospital": Hospital,
  radar: Radar,
  "rate-review": Star,
  "rocket-launch": Rocket,
  school: GraduationCap,
  "support-agent": Headset,
  "travel-explore": Compass,
  "video-camera-front": Video,
};

/** Фолбэк для неизвестного/отсутствующего ключа — не роняем рендер. */
const FALLBACK_ICON: LucideIcon = Sparkles;

/** Резолвер иконки сущности по строковому ключу (icon фикстуры услуги/кейса). */
export function resolveEntityIcon(iconKey: string | undefined): LucideIcon {
  return iconKey ? (ENTITY_ICONS[iconKey] ?? FALLBACK_ICON) : FALLBACK_ICON;
}
