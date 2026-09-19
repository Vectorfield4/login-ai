import type { SvgIconComponent } from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CodeIcon from "@mui/icons-material/Code";
import DomainIcon from "@mui/icons-material/Domain";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import InsightsIcon from "@mui/icons-material/Insights";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import RadarIcon from "@mui/icons-material/Radar";
import RateReviewIcon from "@mui/icons-material/RateReview";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SchoolIcon from "@mui/icons-material/School";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

/**
 * Каталог иконок сущностей (услуги и кейсы). Фикстуры хранят icon как строку —
 * этот каталог держит маппинг строкового ключа → MUI-компонент. Иконки услуг
 * и кейсов — отдельные ключи, но один словарь (ключи не пересекаются).
 * Astro-сторона имеет зеркальный каталог на lucide-react
 * (astro/shared/data/iconCatalog.ts) с теми же ключами.
 */
export const ENTITY_ICONS: Record<string, SvgIconComponent> = {
  "auto-awesome": AutoAwesomeIcon,
  code: CodeIcon,
  domain: DomainIcon,
  "fact-check": FactCheckIcon,
  insights: InsightsIcon,
  "local-hospital": LocalHospitalIcon,
  radar: RadarIcon,
  "rate-review": RateReviewIcon,
  "rocket-launch": RocketLaunchIcon,
  school: SchoolIcon,
  "support-agent": SupportAgentIcon,
  "travel-explore": TravelExploreIcon,
  "video-camera-front": VideoCameraFrontIcon,
};

/** Фолбэк для неизвестного/отсутствующего ключа — не роняем рендер. */
const FALLBACK_ICON: SvgIconComponent = AutoAwesomeIcon;

/** Резолвер иконки сущности по строковому ключу (icon фикстуры услуги/кейса). */
export function resolveEntityIcon(iconKey: string | undefined): SvgIconComponent {
  return iconKey ? (ENTITY_ICONS[iconKey] ?? FALLBACK_ICON) : FALLBACK_ICON;
}
