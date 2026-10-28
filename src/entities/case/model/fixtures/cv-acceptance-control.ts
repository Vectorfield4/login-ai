import type { Case } from "../cases";

export const cvAcceptanceControl: Case = {
  slug: "cv-acceptance-control",
  title: "cases.cv-acceptance-control.title",
  tagline: "cases.cv-acceptance-control.tagline",
  description: "cases.cv-acceptance-control.description",
  icon: "radar",
  industryKey: "audiences.businessOwners",
  metrics: [
    {
      label: "cases.cv-acceptance-control.metrics.0.label",
      value: "cases.cv-acceptance-control.metrics.0.value",
    },
    {
      label: "cases.cv-acceptance-control.metrics.1.label",
      value: "cases.cv-acceptance-control.metrics.1.value",
    },
    {
      label: "cases.cv-acceptance-control.metrics.2.label",
      value: "cases.cv-acceptance-control.metrics.2.value",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "computer-vision-systems",
      noteKey: "relevants.cv-acceptance-control.computer-vision-systems",
    },
    { type: "service", slug: "3d-design", noteKey: "relevants.cv-acceptance-control.3d-design" },
    {
      type: "service",
      slug: "document-processing",
      noteKey: "relevants.cv-acceptance-control.document-processing",
    },
    {
      type: "solution",
      slug: "real-estate",
      noteKey: "relevants.cv-acceptance-control.real-estate",
    },
  ],
};
