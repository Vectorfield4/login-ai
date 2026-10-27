import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-program estimator: `participants` drives the recurring period (price per
 * seat), the number of target `languages` scales it, and onsite delivery plus
 * post-training support are one-off add-ons. The program floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "program",
  horizon: 1,
  support: false,
  fields: [
    {
      kind: "slider",
      id: "participants",
      label: "calculator.fields.participants",
      min: 5,
      max: 60,
      step: 5,
      default: 12,
    },
    {
      kind: "stepper",
      id: "languages",
      label: "calculator.fields.languages",
      min: 1,
      max: 5,
      default: 3,
    },
    {
      kind: "segmented",
      id: "format",
      label: "calculator.fields.format",
      options: [
        { value: "online", label: "calculator.options.online" },
        { value: "offline", label: "calculator.options.offline" },
      ],
      default: "online",
    },
  ],
  terms: [
    { kind: "setup", amount: 200000, weeks: 1 },
    { kind: "perUnit", field: "participants", rate: 10000, weeksPerUnit: 0.05 },
    {
      kind: "multiplier",
      field: "languages",
      factors: { "1": 1, "2": 1.15, "3": 1.3, "4": 1.45, "5": 1.6 },
    },
    { kind: "perOption", field: "format", rates: { online: 0, offline: 90000 } },
  ],
};

export const aiLocalizationTraining: Service = {
  slug: "ai-localization-training",
  navTitle: "services.ai-localization-training.navTitle",
  title: "services.ai-localization-training.title",
  tagline: "services.ai-localization-training.tagline",
  description: "services.ai-localization-training.description",
  price: { amount: 200000, unit: "program" },
  calculator,
  ctaBanner: {
    title: "services.ai-localization-training.ctaBanner.title",
    text: "services.ai-localization-training.ctaBanner.text",
    buttonLabel: "services.ai-localization-training.ctaBanner.buttonLabel",
  },
  icon: "languages",
  group: "training",
  features: [
    {
      title: "services.ai-localization-training.features.0.title",
      text: "services.ai-localization-training.features.0.text",
    },
    {
      title: "services.ai-localization-training.features.1.title",
      text: "services.ai-localization-training.features.1.text",
    },
    {
      title: "services.ai-localization-training.features.2.title",
      text: "services.ai-localization-training.features.2.text",
    },
    {
      title: "services.ai-localization-training.features.3.title",
      text: "services.ai-localization-training.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.ai-localization-training.sections.0.title",
      items: [
        "services.ai-localization-training.sections.0.items.0",
        "services.ai-localization-training.sections.0.items.1",
        "services.ai-localization-training.sections.0.items.2",
        "services.ai-localization-training.sections.0.items.3",
        "services.ai-localization-training.sections.0.items.4",
        "services.ai-localization-training.sections.0.items.5",
      ],
    },
    {
      title: "services.ai-localization-training.sections.1.title",
      items: [
        "services.ai-localization-training.sections.1.items.0",
        "services.ai-localization-training.sections.1.items.1",
        "services.ai-localization-training.sections.1.items.2",
        "services.ai-localization-training.sections.1.items.3",
        "services.ai-localization-training.sections.1.items.4",
        "services.ai-localization-training.sections.1.items.5",
      ],
    },
    {
      title: "services.ai-localization-training.sections.2.title",
      items: [
        "services.ai-localization-training.sections.2.items.0",
        "services.ai-localization-training.sections.2.items.1",
        "services.ai-localization-training.sections.2.items.2",
        "services.ai-localization-training.sections.2.items.3",
        "services.ai-localization-training.sections.2.items.4",
        "services.ai-localization-training.sections.2.items.5",
      ],
    },
    {
      title: "services.ai-localization-training.sections.3.title",
      items: [
        "services.ai-localization-training.sections.3.items.0",
        "services.ai-localization-training.sections.3.items.1",
        "services.ai-localization-training.sections.3.items.2",
        "services.ai-localization-training.sections.3.items.3",
        "services.ai-localization-training.sections.3.items.4",
        "services.ai-localization-training.sections.3.items.5",
        "services.ai-localization-training.sections.3.items.6",
        "services.ai-localization-training.sections.3.items.7",
        "services.ai-localization-training.sections.3.items.8",
        "services.ai-localization-training.sections.3.items.9",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-localization-training.processSteps.0.title",
      text: "services.ai-localization-training.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-localization-training.processSteps.1.title",
      text: "services.ai-localization-training.processSteps.1.text",
      processType: "requirements",
    },
    {
      title: "services.ai-localization-training.processSteps.2.title",
      text: "services.ai-localization-training.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ai-localization-training.processSteps.3.title",
      text: "services.ai-localization-training.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-localization-training.fitItems.0.title",
      text: "services.ai-localization-training.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-localization-training.fitItems.1.title",
      text: "services.ai-localization-training.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-localization-training.fitItems.2.title",
      text: "services.ai-localization-training.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-localization-training.fitItems.3.title",
      text: "services.ai-localization-training.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.ai-localization-training.precedents.0.title",
      text: "services.ai-localization-training.precedents.0.text",
      metricValue: "services.ai-localization-training.precedents.0.metricValue",
      metricLabel: "services.ai-localization-training.precedents.0.metricLabel",
    },
    {
      title: "services.ai-localization-training.precedents.1.title",
      text: "services.ai-localization-training.precedents.1.text",
      metricValue: "services.ai-localization-training.precedents.1.metricValue",
      metricLabel: "services.ai-localization-training.precedents.1.metricLabel",
    },
    {
      title: "services.ai-localization-training.precedents.2.title",
      text: "services.ai-localization-training.precedents.2.text",
      metricValue: "services.ai-localization-training.precedents.2.metricValue",
      metricLabel: "services.ai-localization-training.precedents.2.metricLabel",
    },
    {
      title: "services.ai-localization-training.precedents.3.title",
      text: "services.ai-localization-training.precedents.3.text",
      metricValue: "services.ai-localization-training.precedents.3.metricValue",
      metricLabel: "services.ai-localization-training.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-localization-training.faqItems.0.question",
      answer: "services.ai-localization-training.faqItems.0.answer",
    },
    {
      question: "services.ai-localization-training.faqItems.1.question",
      answer: "services.ai-localization-training.faqItems.1.answer",
    },
    {
      question: "services.ai-localization-training.faqItems.2.question",
      answer: "services.ai-localization-training.faqItems.2.answer",
    },
    {
      question: "services.ai-localization-training.faqItems.3.question",
      answer: "services.ai-localization-training.faqItems.3.answer",
    },
    {
      question: "services.ai-localization-training.faqItems.4.question",
      answer: "services.ai-localization-training.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-localization-training.tradeoffs.0.title",
      text: "services.ai-localization-training.tradeoffs.0.text",
    },
    {
      title: "services.ai-localization-training.tradeoffs.1.title",
      text: "services.ai-localization-training.tradeoffs.1.text",
    },
    {
      title: "services.ai-localization-training.tradeoffs.2.title",
      text: "services.ai-localization-training.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-localization-training.deliverables.0.title",
      text: "services.ai-localization-training.deliverables.0.text",
    },
    {
      title: "services.ai-localization-training.deliverables.1.title",
      text: "services.ai-localization-training.deliverables.1.text",
    },
    {
      title: "services.ai-localization-training.deliverables.2.title",
      text: "services.ai-localization-training.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "content-localization",
      noteKey: "relevants.ai-localization-training.content-localization",
    },
    {
      type: "service",
      slug: "corporate-ai-training",
      noteKey: "relevants.ai-localization-training.corporate-ai-training",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.ai-localization-training.agency-content-pipeline",
    },
  ],
};
