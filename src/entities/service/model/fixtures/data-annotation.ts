import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; items, modality and quality scale the work, and guidelines are an add-on.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "items",
      label: "calculator.fields.data-annotation.items",
      min: 1000,
      max: 1000000,
      default: 10000,
    },
    {
      kind: "segmented",
      id: "modality",
      label: "calculator.fields.data-annotation.modality",
      options: [
        { value: "text", label: "calculator.options.text" },
        { value: "image", label: "calculator.options.image" },
        { value: "audio", label: "calculator.options.audio" },
        { value: "video", label: "calculator.options.video" },
      ],
      default: "text",
    },
    {
      kind: "segmented",
      id: "quality",
      label: "calculator.fields.data-annotation.quality",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "advanced", label: "calculator.options.advanced" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "guidelines",
      label: "calculator.fields.data-annotation.guidelines",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 300000, weeks: 1 },
    { kind: "perUnit", field: "items", rate: 10, weeksPerUnit: 0.0001 },
    {
      kind: "multiplier",
      field: "modality",
      factors: { text: 1, image: 1.3, audio: 1.5, video: 1.7 },
    },
    { kind: "multiplier", field: "quality", factors: { standard: 1, advanced: 1.4 } },
    { kind: "perOption", field: "guidelines", rates: { false: 0, true: 50000 } },
  ],
};

export const dataAnnotation: Service = {
  slug: "data-annotation",
  navTitle: "services.data-annotation.navTitle",
  title: "services.data-annotation.title",
  tagline: "services.data-annotation.tagline",
  description: "services.data-annotation.description",
  price: { amount: 300000, unit: "project" },
  calculator,
  icon: "fact-check",
  group: "data",
  features: [
    {
      title: "services.data-annotation.features.0.title",
      text: "services.data-annotation.features.0.text",
    },
    {
      title: "services.data-annotation.features.1.title",
      text: "services.data-annotation.features.1.text",
    },
    {
      title: "services.data-annotation.features.2.title",
      text: "services.data-annotation.features.2.text",
    },
    {
      title: "services.data-annotation.features.3.title",
      text: "services.data-annotation.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.data-annotation.ctaBanner.title",
    text: "services.data-annotation.ctaBanner.text",
    buttonLabel: "services.data-annotation.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.data-annotation.techStack.0.subtitle",
      description: "services.data-annotation.techStack.0.description",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary: "services.data-annotation.techStack.0.technologies.0.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.data-annotation.techStack.0.technologies.1.glossary",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.data-annotation.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.data-annotation.techStack.0.technologies.3.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.data-annotation.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.data-annotation.processSteps.0.title",
      text: "services.data-annotation.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.data-annotation.processSteps.1.title",
      text: "services.data-annotation.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.data-annotation.processSteps.2.title",
      text: "services.data-annotation.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.data-annotation.processSteps.3.title",
      text: "services.data-annotation.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.data-annotation.fitItems.0.title",
      text: "services.data-annotation.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.data-annotation.fitItems.1.title",
      text: "services.data-annotation.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.data-annotation.fitItems.2.title",
      text: "services.data-annotation.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.data-annotation.fitItems.3.title",
      text: "services.data-annotation.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.data-annotation.faqItems.0.question",
      answer: "services.data-annotation.faqItems.0.answer",
    },
    {
      question: "services.data-annotation.faqItems.1.question",
      answer: "services.data-annotation.faqItems.1.answer",
    },
    {
      question: "services.data-annotation.faqItems.2.question",
      answer: "services.data-annotation.faqItems.2.answer",
    },
    {
      question: "services.data-annotation.faqItems.3.question",
      answer: "services.data-annotation.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.data-annotation.tradeoffs.0.title",
      text: "services.data-annotation.tradeoffs.0.text",
    },
    {
      title: "services.data-annotation.tradeoffs.1.title",
      text: "services.data-annotation.tradeoffs.1.text",
    },
    {
      title: "services.data-annotation.tradeoffs.2.title",
      text: "services.data-annotation.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.data-annotation.deliverables.0.title",
      text: "services.data-annotation.deliverables.0.text",
    },
    {
      title: "services.data-annotation.deliverables.1.title",
      text: "services.data-annotation.deliverables.1.text",
    },
    {
      title: "services.data-annotation.deliverables.2.title",
      text: "services.data-annotation.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.data-annotation.mechanism.0.title",
      text: "services.data-annotation.mechanism.0.text",
    },
    {
      title: "services.data-annotation.mechanism.1.title",
      text: "services.data-annotation.mechanism.1.text",
    },
    {
      title: "services.data-annotation.mechanism.2.title",
      text: "services.data-annotation.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.data-annotation.outcomes.0.title",
      value: "services.data-annotation.outcomes.0.value",
      text: "services.data-annotation.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.data-annotation.outcomes.1.title",
      value: "services.data-annotation.outcomes.1.value",
      text: "services.data-annotation.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.data-annotation.outcomes.2.title",
      value: "services.data-annotation.outcomes.2.value",
      text: "services.data-annotation.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "computer-vision-systems" },
    { type: "solution", slug: "computer-vision" },
    { type: "case", slug: "quality-vision-line" },
  ],
};
