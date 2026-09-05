import type { SvgIconComponent } from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

/** Одна метрика результата кейса. label/value — ключи i18n (cases.<slug>.metrics.N.*). */
export interface CaseMetric {
  label: string;
  value: string;
}

/**
 * Демонстрационный кейс. Все текстовые поля — ключи i18n (см. src/i18n/ru.ts и en.ts).
 * Пока нет реальных клиентских материалов — контент смоделирован по типовым задачам
 * и явно помечен на странице (casesPage.demoNotice).
 */
export interface CaseStudy {
  slug: string;
  title: string; // cases.<slug>.title
  tagline: string; // cases.<slug>.tagline
  description: string; // cases.<slug>.description
  /** Заглушка вместо скриншота — ассетов не добавляем */
  icon: SvgIconComponent;
  /** Переиспользуем существующие ключи audiences.* (чип отрасли) */
  industryKey: string;
  /** Slug решения из src/data/solutions.ts (опциональная ссылка) */
  relatedSolution?: string;
  /** 3 шт., ключи cases.<slug>.metrics.N.{label,value} */
  metrics: CaseMetric[];
}

export const cases: CaseStudy[] = [
  {
    slug: "retail-support-bot",
    title: "cases.retail-support-bot.title",
    tagline: "cases.retail-support-bot.tagline",
    description: "cases.retail-support-bot.description",
    icon: SupportAgentIcon,
    industryKey: "audiences.businessOwners",
    relatedSolution: "agentic-systems",
    metrics: [
      {
        label: "cases.retail-support-bot.metrics.0.label",
        value: "cases.retail-support-bot.metrics.0.value",
      },
      {
        label: "cases.retail-support-bot.metrics.1.label",
        value: "cases.retail-support-bot.metrics.1.value",
      },
      {
        label: "cases.retail-support-bot.metrics.2.label",
        value: "cases.retail-support-bot.metrics.2.value",
      },
    ],
  },
  {
    slug: "quality-vision-line",
    title: "cases.quality-vision-line.title",
    tagline: "cases.quality-vision-line.tagline",
    description: "cases.quality-vision-line.description",
    icon: FactCheckIcon,
    industryKey: "audiences.manufacturers",
    relatedSolution: "computer-vision",
    metrics: [
      {
        label: "cases.quality-vision-line.metrics.0.label",
        value: "cases.quality-vision-line.metrics.0.value",
      },
      {
        label: "cases.quality-vision-line.metrics.1.label",
        value: "cases.quality-vision-line.metrics.1.value",
      },
      {
        label: "cases.quality-vision-line.metrics.2.label",
        value: "cases.quality-vision-line.metrics.2.value",
      },
    ],
  },
  {
    slug: "clinic-ai-assistant",
    title: "cases.clinic-ai-assistant.title",
    tagline: "cases.clinic-ai-assistant.tagline",
    description: "cases.clinic-ai-assistant.description",
    icon: LocalHospitalIcon,
    industryKey: "audiences.clinics",
    relatedSolution: "medical-clinics",
    metrics: [
      {
        label: "cases.clinic-ai-assistant.metrics.0.label",
        value: "cases.clinic-ai-assistant.metrics.0.value",
      },
      {
        label: "cases.clinic-ai-assistant.metrics.1.label",
        value: "cases.clinic-ai-assistant.metrics.1.value",
      },
      {
        label: "cases.clinic-ai-assistant.metrics.2.label",
        value: "cases.clinic-ai-assistant.metrics.2.value",
      },
    ],
  },
  {
    slug: "agency-content-pipeline",
    title: "cases.agency-content-pipeline.title",
    tagline: "cases.agency-content-pipeline.tagline",
    description: "cases.agency-content-pipeline.description",
    icon: AutoAwesomeIcon,
    industryKey: "audiences.adAgencies",
    relatedSolution: "content-generation",
    metrics: [
      {
        label: "cases.agency-content-pipeline.metrics.0.label",
        value: "cases.agency-content-pipeline.metrics.0.value",
      },
      {
        label: "cases.agency-content-pipeline.metrics.1.label",
        value: "cases.agency-content-pipeline.metrics.1.value",
      },
      {
        label: "cases.agency-content-pipeline.metrics.2.label",
        value: "cases.agency-content-pipeline.metrics.2.value",
      },
    ],
  },
  {
    slug: "product-launch-video",
    title: "cases.product-launch-video.title",
    tagline: "cases.product-launch-video.tagline",
    description: "cases.product-launch-video.description",
    icon: VideoCameraFrontIcon,
    industryKey: "audiences.businessOwners",
    relatedSolution: "video-generation",
    metrics: [
      {
        label: "cases.product-launch-video.metrics.0.label",
        value: "cases.product-launch-video.metrics.0.value",
      },
      {
        label: "cases.product-launch-video.metrics.1.label",
        value: "cases.product-launch-video.metrics.1.value",
      },
      {
        label: "cases.product-launch-video.metrics.2.label",
        value: "cases.product-launch-video.metrics.2.value",
      },
    ],
  },
  {
    slug: "marketplace-reputation",
    title: "cases.marketplace-reputation.title",
    tagline: "cases.marketplace-reputation.tagline",
    description: "cases.marketplace-reputation.description",
    icon: RateReviewIcon,
    industryKey: "audiences.businessOwners",
    relatedSolution: "reputation-management",
    metrics: [
      {
        label: "cases.marketplace-reputation.metrics.0.label",
        value: "cases.marketplace-reputation.metrics.0.value",
      },
      {
        label: "cases.marketplace-reputation.metrics.1.label",
        value: "cases.marketplace-reputation.metrics.1.value",
      },
      {
        label: "cases.marketplace-reputation.metrics.2.label",
        value: "cases.marketplace-reputation.metrics.2.value",
      },
    ],
  },
];

export function getCase(slug: string | undefined): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
