import type { Case } from "../cases";

export const clinicAiAssistant: Case = {
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
};
