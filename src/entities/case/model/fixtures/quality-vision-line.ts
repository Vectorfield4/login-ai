import type { Case } from "../cases";

export const qualityVisionLine: Case = {
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
};
