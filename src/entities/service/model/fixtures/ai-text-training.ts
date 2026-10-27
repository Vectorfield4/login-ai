import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-program estimator: `participants` drives the recurring period (price per
 * seat), the `depth` level scales it (basic vs advanced prompting), and onsite
 * delivery plus post-training support are one-off add-ons. The program floor
 * stays as `setup`.
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
      default: 15,
    },
    {
      kind: "segmented",
      id: "depth",
      label: "calculator.fields.depth",
      options: [
        { value: "basic", label: "calculator.options.basic" },
        { value: "advanced", label: "calculator.options.advanced" },
      ],
      default: "basic",
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
    { kind: "setup", amount: 180000, weeks: 1 },
    { kind: "perUnit", field: "participants", rate: 9000, weeksPerUnit: 0.05 },
    { kind: "multiplier", field: "depth", factors: { basic: 1, advanced: 1.6 } },
    { kind: "perOption", field: "format", rates: { online: 0, offline: 90000 } },
  ],
};

export const aiTextTraining: Service = {
  slug: "ai-text-training",
  navTitle: "services.ai-text-training.navTitle",
  title: "services.ai-text-training.title",
  tagline: "services.ai-text-training.tagline",
  description: "services.ai-text-training.description",
  price: { amount: 180000, unit: "program" },
  calculator,
  ctaBanner: {
    title: "services.ai-text-training.ctaBanner.title",
    text: "services.ai-text-training.ctaBanner.text",
    buttonLabel: "services.ai-text-training.ctaBanner.buttonLabel",
  },
  icon: "article",
  group: "training",
  features: [
    {
      title: "services.ai-text-training.features.0.title",
      text: "services.ai-text-training.features.0.text",
    },
    {
      title: "services.ai-text-training.features.1.title",
      text: "services.ai-text-training.features.1.text",
    },
    {
      title: "services.ai-text-training.features.2.title",
      text: "services.ai-text-training.features.2.text",
    },
    {
      title: "services.ai-text-training.features.3.title",
      text: "services.ai-text-training.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.ai-text-training.sections.0.title",
      items: [
        "services.ai-text-training.sections.0.items.0",
        "services.ai-text-training.sections.0.items.1",
        "services.ai-text-training.sections.0.items.2",
        "services.ai-text-training.sections.0.items.3",
        "services.ai-text-training.sections.0.items.4",
        "services.ai-text-training.sections.0.items.5",
      ],
    },
    {
      title: "services.ai-text-training.sections.1.title",
      items: [
        "services.ai-text-training.sections.1.items.0",
        "services.ai-text-training.sections.1.items.1",
        "services.ai-text-training.sections.1.items.2",
        "services.ai-text-training.sections.1.items.3",
        "services.ai-text-training.sections.1.items.4",
        "services.ai-text-training.sections.1.items.5",
      ],
    },
    {
      title: "services.ai-text-training.sections.2.title",
      items: [
        "services.ai-text-training.sections.2.items.0",
        "services.ai-text-training.sections.2.items.1",
        "services.ai-text-training.sections.2.items.2",
        "services.ai-text-training.sections.2.items.3",
        "services.ai-text-training.sections.2.items.4",
        "services.ai-text-training.sections.2.items.5",
      ],
    },
    {
      title: "services.ai-text-training.sections.3.title",
      items: [
        "services.ai-text-training.sections.3.items.0",
        "services.ai-text-training.sections.3.items.1",
        "services.ai-text-training.sections.3.items.2",
        "services.ai-text-training.sections.3.items.3",
        "services.ai-text-training.sections.3.items.4",
        "services.ai-text-training.sections.3.items.5",
        "services.ai-text-training.sections.3.items.6",
        "services.ai-text-training.sections.3.items.7",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-text-training.processSteps.0.title",
      text: "services.ai-text-training.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-text-training.processSteps.1.title",
      text: "services.ai-text-training.processSteps.1.text",
      processType: "requirements",
    },
    {
      title: "services.ai-text-training.processSteps.2.title",
      text: "services.ai-text-training.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ai-text-training.processSteps.3.title",
      text: "services.ai-text-training.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-text-training.fitItems.0.title",
      text: "services.ai-text-training.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-text-training.fitItems.1.title",
      text: "services.ai-text-training.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-text-training.fitItems.2.title",
      text: "services.ai-text-training.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-text-training.fitItems.3.title",
      text: "services.ai-text-training.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.ai-text-training.precedents.0.title",
      text: "services.ai-text-training.precedents.0.text",
      metricValue: "services.ai-text-training.precedents.0.metricValue",
      metricLabel: "services.ai-text-training.precedents.0.metricLabel",
    },
    {
      title: "services.ai-text-training.precedents.1.title",
      text: "services.ai-text-training.precedents.1.text",
      metricValue: "services.ai-text-training.precedents.1.metricValue",
      metricLabel: "services.ai-text-training.precedents.1.metricLabel",
    },
    {
      title: "services.ai-text-training.precedents.2.title",
      text: "services.ai-text-training.precedents.2.text",
      metricValue: "services.ai-text-training.precedents.2.metricValue",
      metricLabel: "services.ai-text-training.precedents.2.metricLabel",
    },
    {
      title: "services.ai-text-training.precedents.3.title",
      text: "services.ai-text-training.precedents.3.text",
      metricValue: "services.ai-text-training.precedents.3.metricValue",
      metricLabel: "services.ai-text-training.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-text-training.faqItems.0.question",
      answer: "services.ai-text-training.faqItems.0.answer",
    },
    {
      question: "services.ai-text-training.faqItems.1.question",
      answer: "services.ai-text-training.faqItems.1.answer",
    },
    {
      question: "services.ai-text-training.faqItems.2.question",
      answer: "services.ai-text-training.faqItems.2.answer",
    },
    {
      question: "services.ai-text-training.faqItems.3.question",
      answer: "services.ai-text-training.faqItems.3.answer",
    },
    {
      question: "services.ai-text-training.faqItems.4.question",
      answer: "services.ai-text-training.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-text-training.tradeoffs.0.title",
      text: "services.ai-text-training.tradeoffs.0.text",
    },
    {
      title: "services.ai-text-training.tradeoffs.1.title",
      text: "services.ai-text-training.tradeoffs.1.text",
    },
    {
      title: "services.ai-text-training.tradeoffs.2.title",
      text: "services.ai-text-training.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-text-training.deliverables.0.title",
      text: "services.ai-text-training.deliverables.0.text",
    },
    {
      title: "services.ai-text-training.deliverables.1.title",
      text: "services.ai-text-training.deliverables.1.text",
    },
    {
      title: "services.ai-text-training.deliverables.2.title",
      text: "services.ai-text-training.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "content-generation",
      noteKey: "relevants.ai-text-training.content-generation",
    },
    {
      type: "service",
      slug: "corporate-ai-training",
      noteKey: "relevants.ai-text-training.corporate-ai-training",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.ai-text-training.agency-content-pipeline",
    },
  ],
};
