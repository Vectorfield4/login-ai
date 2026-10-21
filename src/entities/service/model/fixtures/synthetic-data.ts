import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; modality and volume scale generation, privacy and validation are add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "segmented",
      id: "modality",
      label: "calculator.fields.synthetic-data.modality",
      options: [
        { value: "tabular", label: "calculator.options.tabular" },
        { value: "text", label: "calculator.options.text" },
        { value: "image", label: "calculator.options.image" },
      ],
      default: "tabular",
    },
    {
      kind: "stepper",
      id: "volume",
      label: "calculator.fields.synthetic-data.volume",
      min: 1000,
      max: 1000000,
      default: 10000,
    },
    {
      kind: "toggle",
      id: "privacy",
      label: "calculator.fields.synthetic-data.privacy",
      default: false,
    },
    {
      kind: "segmented",
      id: "validation",
      label: "calculator.fields.synthetic-data.validation",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "advanced", label: "calculator.options.advanced" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 500000, weeks: 2 },
    { kind: "multiplier", field: "modality", factors: { tabular: 1, text: 1.2, image: 1.4 } },
    { kind: "perUnit", field: "volume", rate: 5, weeksPerUnit: 0.0001 },
    { kind: "perOption", field: "privacy", rates: { false: 0, true: 100000 } },
    { kind: "multiplier", field: "validation", factors: { standard: 1, advanced: 1.3 } },
  ],
};

export const syntheticData: Service = {
  slug: "synthetic-data",
  navTitle: "services.synthetic-data.navTitle",
  title: "services.synthetic-data.title",
  tagline: "services.synthetic-data.tagline",
  description: "services.synthetic-data.description",
  price: { amount: 500000, unit: "project" },
  calculator,
  icon: "auto-awesome",
  group: "data",
  features: [
    {
      title: "services.synthetic-data.features.0.title",
      text: "services.synthetic-data.features.0.text",
    },
    {
      title: "services.synthetic-data.features.1.title",
      text: "services.synthetic-data.features.1.text",
    },
    {
      title: "services.synthetic-data.features.2.title",
      text: "services.synthetic-data.features.2.text",
    },
    {
      title: "services.synthetic-data.features.3.title",
      text: "services.synthetic-data.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.synthetic-data.ctaBanner.title",
    text: "services.synthetic-data.ctaBanner.text",
    buttonLabel: "services.synthetic-data.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.synthetic-data.techStack.0.subtitle",
      description: "services.synthetic-data.techStack.0.description",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary: "services.synthetic-data.techStack.0.technologies.0.glossary",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.synthetic-data.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.synthetic-data.techStack.0.technologies.2.glossary",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.synthetic-data.techStack.0.technologies.3.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.synthetic-data.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.synthetic-data.processSteps.0.title",
      text: "services.synthetic-data.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.synthetic-data.processSteps.1.title",
      text: "services.synthetic-data.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.synthetic-data.processSteps.2.title",
      text: "services.synthetic-data.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.synthetic-data.processSteps.3.title",
      text: "services.synthetic-data.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.synthetic-data.fitItems.0.title",
      text: "services.synthetic-data.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.synthetic-data.fitItems.1.title",
      text: "services.synthetic-data.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.synthetic-data.fitItems.2.title",
      text: "services.synthetic-data.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.synthetic-data.fitItems.3.title",
      text: "services.synthetic-data.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.synthetic-data.faqItems.0.question",
      answer: "services.synthetic-data.faqItems.0.answer",
    },
    {
      question: "services.synthetic-data.faqItems.1.question",
      answer: "services.synthetic-data.faqItems.1.answer",
    },
    {
      question: "services.synthetic-data.faqItems.2.question",
      answer: "services.synthetic-data.faqItems.2.answer",
    },
    {
      question: "services.synthetic-data.faqItems.3.question",
      answer: "services.synthetic-data.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.synthetic-data.tradeoffs.0.title",
      text: "services.synthetic-data.tradeoffs.0.text",
    },
    {
      title: "services.synthetic-data.tradeoffs.1.title",
      text: "services.synthetic-data.tradeoffs.1.text",
    },
    {
      title: "services.synthetic-data.tradeoffs.2.title",
      text: "services.synthetic-data.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.synthetic-data.deliverables.0.title",
      text: "services.synthetic-data.deliverables.0.text",
    },
    {
      title: "services.synthetic-data.deliverables.1.title",
      text: "services.synthetic-data.deliverables.1.text",
    },
    {
      title: "services.synthetic-data.deliverables.2.title",
      text: "services.synthetic-data.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.synthetic-data.mechanism.0.title",
      text: "services.synthetic-data.mechanism.0.text",
    },
    {
      title: "services.synthetic-data.mechanism.1.title",
      text: "services.synthetic-data.mechanism.1.text",
    },
    {
      title: "services.synthetic-data.mechanism.2.title",
      text: "services.synthetic-data.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.synthetic-data.outcomes.0.title",
      value: "services.synthetic-data.outcomes.0.value",
      text: "services.synthetic-data.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.synthetic-data.outcomes.1.title",
      value: "services.synthetic-data.outcomes.1.value",
      text: "services.synthetic-data.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.synthetic-data.outcomes.2.title",
      value: "services.synthetic-data.outcomes.2.value",
      text: "services.synthetic-data.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "computer-vision-systems" },
    { type: "solution", slug: "computer-vision" },
    { type: "case", slug: "quality-vision-line" },
  ],
};
