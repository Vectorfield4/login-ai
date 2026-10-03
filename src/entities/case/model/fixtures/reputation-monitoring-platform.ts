import { DEMO_APP_URL } from "@/shared/config/constants";
import type { Case } from "../cases";

export const reputationMonitoringPlatform: Case = {
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
};
