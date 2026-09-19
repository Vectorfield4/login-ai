import type { Case } from "@/entities/case/model/cases";
import { DEMO_APP_URL } from "@/shared/config/constants";

/**
 * Дефолтные данные кейсов («ответ бэкенда», которого пока нет).
 * Store инициализируется ими синхронно; получатель пробрасывает их as-is.
 */
export const caseFixtures: Case[] = [
  {
    slug: "retail-support-bot",
    title: "cases.retail-support-bot.title",
    tagline: "cases.retail-support-bot.tagline",
    description: "cases.retail-support-bot.description",
    icon: "support-agent",
    industryKey: "audiences.businessOwners",
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
    relevants: [
      {
        type: "solution",
        slug: "agentic-systems",
        noteKey: "relevants.retail-support-bot.agentic-systems",
      },
      {
        type: "solution",
        slug: "customer-experience",
        noteKey: "relevants.retail-support-bot.customer-experience",
      },
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.retail-support-bot.software-development",
      },
    ],
  },
  {
    slug: "quality-vision-line",
    title: "cases.quality-vision-line.title",
    tagline: "cases.quality-vision-line.tagline",
    description: "cases.quality-vision-line.description",
    icon: "fact-check",
    industryKey: "audiences.manufacturers",
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
    relevants: [
      {
        type: "solution",
        slug: "computer-vision",
        noteKey: "relevants.quality-vision-line.computer-vision",
      },
    ],
  },
  {
    slug: "clinic-ai-assistant",
    title: "cases.clinic-ai-assistant.title",
    tagline: "cases.clinic-ai-assistant.tagline",
    description: "cases.clinic-ai-assistant.description",
    icon: "local-hospital",
    industryKey: "audiences.clinics",
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
    relevants: [
      {
        type: "solution",
        slug: "medical-clinics",
        noteKey: "relevants.clinic-ai-assistant.medical-clinics",
      },
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.clinic-ai-assistant.software-development",
      },
    ],
  },
  {
    slug: "agency-content-pipeline",
    title: "cases.agency-content-pipeline.title",
    tagline: "cases.agency-content-pipeline.tagline",
    description: "cases.agency-content-pipeline.description",
    icon: "auto-awesome",
    industryKey: "audiences.adAgencies",
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
    relevants: [
      {
        type: "solution",
        slug: "content-generation",
        noteKey: "relevants.agency-content-pipeline.content-generation",
      },
      {
        type: "solution",
        slug: "video-generation",
        noteKey: "relevants.agency-content-pipeline.video-generation",
      },
      {
        type: "case",
        slug: "product-launch-video",
        noteKey: "relevants.agency-content-pipeline.product-launch-video",
      },
    ],
  },
  {
    slug: "product-launch-video",
    title: "cases.product-launch-video.title",
    tagline: "cases.product-launch-video.tagline",
    description: "cases.product-launch-video.description",
    icon: "video-camera-front",
    industryKey: "audiences.businessOwners",
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
    relevants: [
      {
        type: "solution",
        slug: "video-generation",
        noteKey: "relevants.product-launch-video.video-generation",
      },
      {
        type: "solution",
        slug: "content-generation",
        noteKey: "relevants.product-launch-video.content-generation",
      },
      {
        type: "case",
        slug: "agency-content-pipeline",
        noteKey: "relevants.product-launch-video.agency-content-pipeline",
      },
    ],
  },
  {
    slug: "marketplace-reputation",
    title: "cases.marketplace-reputation.title",
    tagline: "cases.marketplace-reputation.tagline",
    description: "cases.marketplace-reputation.description",
    icon: "rate-review",
    industryKey: "audiences.businessOwners",
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
    relevants: [
      {
        type: "solution",
        slug: "reputation-management",
        noteKey: "relevants.marketplace-reputation.reputation-management",
      },
      {
        type: "service",
        slug: "information-monitoring",
        noteKey: "relevants.marketplace-reputation.information-monitoring",
      },
      {
        type: "case",
        slug: "reputation-monitoring-platform",
        noteKey: "relevants.marketplace-reputation.reputation-monitoring-platform",
      },
    ],
  },
  {
    slug: "reputation-monitoring-platform",
    title: "cases.reputation-monitoring-platform.title",
    tagline: "cases.reputation-monitoring-platform.tagline",
    description: "cases.reputation-monitoring-platform.description",
    icon: "radar",
    industryKey: "audiences.businessOwners",
    demoUrl: DEMO_APP_URL,
    metrics: [
      {
        label: "cases.reputation-monitoring-platform.metrics.0.label",
        value: "cases.reputation-monitoring-platform.metrics.0.value",
      },
      {
        label: "cases.reputation-monitoring-platform.metrics.1.label",
        value: "cases.reputation-monitoring-platform.metrics.1.value",
      },
      {
        label: "cases.reputation-monitoring-platform.metrics.2.label",
        value: "cases.reputation-monitoring-platform.metrics.2.value",
      },
    ],
    relevants: [
      {
        type: "solution",
        slug: "content-generation",
        noteKey: "relevants.reputation-monitoring-platform.content-generation",
      },
      {
        type: "solution",
        slug: "customer-experience",
        noteKey: "relevants.reputation-monitoring-platform.customer-experience",
      },
      {
        type: "solution",
        slug: "reputation-management",
        noteKey: "relevants.reputation-monitoring-platform.reputation-management",
      },
      {
        type: "service",
        slug: "information-monitoring",
        noteKey: "relevants.reputation-monitoring-platform.information-monitoring",
      },
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.reputation-monitoring-platform.software-development",
      },
      {
        type: "case",
        slug: "marketplace-reputation",
        noteKey: "relevants.reputation-monitoring-platform.marketplace-reputation",
      },
    ],
  },
];
