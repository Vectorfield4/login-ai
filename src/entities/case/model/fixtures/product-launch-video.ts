import type { Case } from "../cases";

export const productLaunchVideo: Case = {
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
};
