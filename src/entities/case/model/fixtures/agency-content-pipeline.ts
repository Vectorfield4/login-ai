import type { Case } from "../cases";

export const agencyContentPipeline: Case = {
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
      type: "service",
      slug: "video-generation",
      noteKey: "relevants.agency-content-pipeline.video-generation",
    },
    {
      type: "case",
      slug: "product-launch-video",
      noteKey: "relevants.agency-content-pipeline.product-launch-video",
    },
  ],
};
