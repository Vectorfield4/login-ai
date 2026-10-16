import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-program estimator: `participants` drives the recurring period (price per
 * seat), the `depth` level scales it (basic vs advanced deck design), and onsite
 * delivery plus post-training support are one-off add-ons. The program floor
 * stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "program",
  horizon: 1,
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
    { kind: "toggle", id: "support", label: "calculator.fields.support", default: false },
  ],
  terms: [
    { kind: "setup", amount: 180000, weeks: 1 },
    { kind: "perUnit", field: "participants", rate: 10000, weeksPerUnit: 0.05 },
    { kind: "multiplier", field: "depth", factors: { basic: 1, advanced: 1.6 } },
    { kind: "perOption", field: "format", rates: { online: 0, offline: 90000 } },
    { kind: "perOption", field: "support", rates: { false: 0, true: 60000 } },
  ],
};

export const aiPresentationsTraining: Service = {
  slug: "ai-presentations-training",
  navTitle: "services.ai-presentations-training.navTitle",
  title: "services.ai-presentations-training.title",
  tagline: "services.ai-presentations-training.tagline",
  description: "services.ai-presentations-training.description",
  price: { amount: 180000, unit: "program" },
  calculator,
  ctaBanner: {
    title: "services.ai-presentations-training.ctaBanner.title",
    text: "services.ai-presentations-training.ctaBanner.text",
    buttonLabel: "services.ai-presentations-training.ctaBanner.buttonLabel",
  },
  icon: "presentations",
  group: "training",
  features: [
    {
      title: "services.ai-presentations-training.features.0.title",
      text: "services.ai-presentations-training.features.0.text",
    },
    {
      title: "services.ai-presentations-training.features.1.title",
      text: "services.ai-presentations-training.features.1.text",
    },
    {
      title: "services.ai-presentations-training.features.2.title",
      text: "services.ai-presentations-training.features.2.text",
    },
    {
      title: "services.ai-presentations-training.features.3.title",
      text: "services.ai-presentations-training.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.ai-presentations-training.sections.0.title",
      items: [
        "services.ai-presentations-training.sections.0.items.0",
        "services.ai-presentations-training.sections.0.items.1",
        "services.ai-presentations-training.sections.0.items.2",
        "services.ai-presentations-training.sections.0.items.3",
        "services.ai-presentations-training.sections.0.items.4",
        "services.ai-presentations-training.sections.0.items.5",
      ],
    },
    {
      title: "services.ai-presentations-training.sections.1.title",
      items: [
        "services.ai-presentations-training.sections.1.items.0",
        "services.ai-presentations-training.sections.1.items.1",
        "services.ai-presentations-training.sections.1.items.2",
        "services.ai-presentations-training.sections.1.items.3",
        "services.ai-presentations-training.sections.1.items.4",
        "services.ai-presentations-training.sections.1.items.5",
      ],
    },
    {
      title: "services.ai-presentations-training.sections.2.title",
      items: [
        "services.ai-presentations-training.sections.2.items.0",
        "services.ai-presentations-training.sections.2.items.1",
        "services.ai-presentations-training.sections.2.items.2",
        "services.ai-presentations-training.sections.2.items.3",
        "services.ai-presentations-training.sections.2.items.4",
        "services.ai-presentations-training.sections.2.items.5",
      ],
    },
    {
      title: "services.ai-presentations-training.sections.3.title",
      items: [
        "services.ai-presentations-training.sections.3.items.0",
        "services.ai-presentations-training.sections.3.items.1",
        "services.ai-presentations-training.sections.3.items.2",
        "services.ai-presentations-training.sections.3.items.3",
        "services.ai-presentations-training.sections.3.items.4",
        "services.ai-presentations-training.sections.3.items.5",
        "services.ai-presentations-training.sections.3.items.6",
        "services.ai-presentations-training.sections.3.items.7",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-presentations-training.processSteps.0.title",
      text: "services.ai-presentations-training.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-presentations-training.processSteps.1.title",
      text: "services.ai-presentations-training.processSteps.1.text",
      processType: "requirements",
    },
    {
      title: "services.ai-presentations-training.processSteps.2.title",
      text: "services.ai-presentations-training.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ai-presentations-training.processSteps.3.title",
      text: "services.ai-presentations-training.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-presentations-training.fitItems.0.title",
      text: "services.ai-presentations-training.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-presentations-training.fitItems.1.title",
      text: "services.ai-presentations-training.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-presentations-training.fitItems.2.title",
      text: "services.ai-presentations-training.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-presentations-training.fitItems.3.title",
      text: "services.ai-presentations-training.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-presentations-training.proofItems.0.title",
      text: "services.ai-presentations-training.proofItems.0.text",
      metricValue: "services.ai-presentations-training.proofItems.0.metricValue",
      metricLabel: "services.ai-presentations-training.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-presentations-training.faqItems.0.question",
      answer: "services.ai-presentations-training.faqItems.0.answer",
    },
    {
      question: "services.ai-presentations-training.faqItems.1.question",
      answer: "services.ai-presentations-training.faqItems.1.answer",
    },
    {
      question: "services.ai-presentations-training.faqItems.2.question",
      answer: "services.ai-presentations-training.faqItems.2.answer",
    },
    {
      question: "services.ai-presentations-training.faqItems.3.question",
      answer: "services.ai-presentations-training.faqItems.3.answer",
    },
    {
      question: "services.ai-presentations-training.faqItems.4.question",
      answer: "services.ai-presentations-training.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-presentations-training.tradeoffs.0.title",
      text: "services.ai-presentations-training.tradeoffs.0.text",
    },
    {
      title: "services.ai-presentations-training.tradeoffs.1.title",
      text: "services.ai-presentations-training.tradeoffs.1.text",
    },
    {
      title: "services.ai-presentations-training.tradeoffs.2.title",
      text: "services.ai-presentations-training.tradeoffs.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-presentations-training.outcomes.0.title",
      value: "services.ai-presentations-training.outcomes.0.value",
      text: "services.ai-presentations-training.outcomes.0.text",
      icon: "presentations",
    },
    {
      title: "services.ai-presentations-training.outcomes.1.title",
      value: "services.ai-presentations-training.outcomes.1.value",
      text: "services.ai-presentations-training.outcomes.1.text",
      icon: "insights",
    },
    {
      title: "services.ai-presentations-training.outcomes.2.title",
      value: "services.ai-presentations-training.outcomes.2.value",
      text: "services.ai-presentations-training.outcomes.2.text",
      icon: "fact-check",
    },
  ],
  deliverables: [
    {
      title: "services.ai-presentations-training.deliverables.0.title",
      text: "services.ai-presentations-training.deliverables.0.text",
    },
    {
      title: "services.ai-presentations-training.deliverables.1.title",
      text: "services.ai-presentations-training.deliverables.1.text",
    },
    {
      title: "services.ai-presentations-training.deliverables.2.title",
      text: "services.ai-presentations-training.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "ai-presentations",
      noteKey: "relevants.ai-presentations-training.ai-presentations",
    },
    {
      type: "service",
      slug: "corporate-ai-training",
      noteKey: "relevants.ai-presentations-training.corporate-ai-training",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.ai-presentations-training.agency-content-pipeline",
    },
  ],
};
