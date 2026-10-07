import {
  AudioLines,
  Building2,
  CheckCheck,
  Cloud,
  Code2,
  Compass,
  Cpu,
  FileText,
  GraduationCap,
  Headset,
  Hospital,
  Image,
  Languages,
  type LucideIcon,
  Presentation,
  Radar,
  Rocket,
  Server,
  Sparkles,
  Star,
  TrendingUp,
  Video,
  WandSparkles,
} from "lucide-react";

export type { LucideIcon };

/**
 * Icon reference stored in entity data: either a lucide component (feature
 * icons passed directly) or a string key resolved by `resolveEntityIcon`.
 */
export type SvgIconComponent = LucideIcon | string;

/**
 * Каталог иконок сущностей на lucide-react. Зеркалит ключи
 * `src/shared/ui/atoms/iconCatalog.ts` (ENTITY_ICONS): фикстуры услуг и кейсов
 * хранят `icon` строкой, маппинг ключ → компонент живёт на стороне каждого
 * рендера (src — MUI, astro — lucide).
 */
export const ENTITY_ICONS: Record<string, LucideIcon> = {
  article: FileText,
  audio: AudioLines,
  "auto-awesome": WandSparkles,
  cloud: Cloud,
  CloudIcon: Cloud,
  code: Code2,
  cpu: Cpu,
  domain: Building2,
  "fact-check": CheckCheck,
  image: Image,
  insights: TrendingUp,
  languages: Languages,
  "local-hospital": Hospital,
  presentations: Presentation,
  radar: Radar,
  "rate-review": Star,
  "rocket-launch": Rocket,
  school: GraduationCap,
  server: Server,
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
