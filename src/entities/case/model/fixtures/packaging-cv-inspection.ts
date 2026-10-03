import type { Case } from "../cases";

export const packagingCvInspection: Case = {
  slug: "packaging-cv-inspection",
  title: "cases.packaging-cv-inspection.title",
  tagline: "cases.packaging-cv-inspection.tagline",
  description: "cases.packaging-cv-inspection.description",
  icon: "video-camera-front",
  industryKey: "audiences.manufacturers",
  metrics: [
    {
      label: "cases.packaging-cv-inspection.metrics.0.label",
      value: "cases.packaging-cv-inspection.metrics.0.value",
    },
    {
      label: "cases.packaging-cv-inspection.metrics.1.label",
      value: "cases.packaging-cv-inspection.metrics.1.value",
    },
    {
      label: "cases.packaging-cv-inspection.metrics.2.label",
      value: "cases.packaging-cv-inspection.metrics.2.value",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "computer-vision-systems",
      noteKey: "relevants.packaging-cv-inspection.computer-vision-systems",
    },
    {
      type: "solution",
      slug: "computer-vision",
      noteKey: "relevants.packaging-cv-inspection.computer-vision",
    },
    {
      type: "case",
      slug: "quality-vision-line",
      noteKey: "relevants.packaging-cv-inspection.quality-vision-line",
    },
  ],
};
