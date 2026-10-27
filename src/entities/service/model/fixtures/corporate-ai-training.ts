import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-program estimator: `participants` drives the recurring period (price per
 * seat), the `depth` ladder scales it from a workshop to an academy, and onsite
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
      max: 120,
      step: 5,
      default: 25,
    },
    {
      kind: "segmented",
      id: "depth",
      label: "calculator.fields.depth",
      options: [
        { value: "workshop", label: "calculator.options.workshop" },
        { value: "track", label: "calculator.options.track" },
        { value: "academy", label: "calculator.options.academy" },
      ],
      default: "track",
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
    { kind: "setup", amount: 600000, weeks: 2 },
    { kind: "perUnit", field: "participants", rate: 15000, weeksPerUnit: 0.05 },
    {
      kind: "multiplier",
      field: "depth",
      factors: { workshop: 1, track: 2.2, academy: 5 },
    },
    { kind: "perOption", field: "format", rates: { online: 0, offline: 150000 } },
  ],
};

export const corporateAiTraining: Service = {
  slug: "corporate-ai-training",
  navTitle: "services.corporate-ai-training.navTitle",
  title: "services.corporate-ai-training.title",
  tagline: "services.corporate-ai-training.tagline",
  description: "services.corporate-ai-training.description",
  price: { amount: 600000, unit: "program" },
  calculator,
  ctaBanner: {
    title: "services.corporate-ai-training.ctaBanner.title",
    text: "services.corporate-ai-training.ctaBanner.text",
    buttonLabel: "services.corporate-ai-training.ctaBanner.buttonLabel",
  },
  icon: "school",
  group: "training",
  features: [
    {
      title: "services.corporate-ai-training.features.0.title",
      text: "services.corporate-ai-training.features.0.text",
    },
    {
      title: "services.corporate-ai-training.features.1.title",
      text: "services.corporate-ai-training.features.1.text",
    },
    {
      title: "services.corporate-ai-training.features.2.title",
      text: "services.corporate-ai-training.features.2.text",
    },
    {
      title: "services.corporate-ai-training.features.3.title",
      text: "services.corporate-ai-training.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "services.corporate-ai-training.processSteps.0.title",
      text: "services.corporate-ai-training.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.corporate-ai-training.processSteps.1.title",
      text: "services.corporate-ai-training.processSteps.1.text",
      processType: "requirements",
    },
    {
      title: "services.corporate-ai-training.processSteps.2.title",
      text: "services.corporate-ai-training.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.corporate-ai-training.processSteps.3.title",
      text: "services.corporate-ai-training.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.corporate-ai-training.fitItems.0.title",
      text: "services.corporate-ai-training.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.corporate-ai-training.fitItems.1.title",
      text: "services.corporate-ai-training.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.corporate-ai-training.fitItems.2.title",
      text: "services.corporate-ai-training.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.corporate-ai-training.fitItems.3.title",
      text: "services.corporate-ai-training.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.corporate-ai-training.precedents.0.title",
      text: "services.corporate-ai-training.precedents.0.text",
      metricValue: "services.corporate-ai-training.precedents.0.metricValue",
      metricLabel: "services.corporate-ai-training.precedents.0.metricLabel",
    },
    {
      title: "services.corporate-ai-training.precedents.1.title",
      text: "services.corporate-ai-training.precedents.1.text",
      metricValue: "services.corporate-ai-training.precedents.1.metricValue",
      metricLabel: "services.corporate-ai-training.precedents.1.metricLabel",
    },
    {
      title: "services.corporate-ai-training.precedents.2.title",
      text: "services.corporate-ai-training.precedents.2.text",
      metricValue: "services.corporate-ai-training.precedents.2.metricValue",
      metricLabel: "services.corporate-ai-training.precedents.2.metricLabel",
    },
    {
      title: "services.corporate-ai-training.precedents.3.title",
      text: "services.corporate-ai-training.precedents.3.text",
      metricValue: "services.corporate-ai-training.precedents.3.metricValue",
      metricLabel: "services.corporate-ai-training.precedents.3.metricLabel",
    },
    {
      title: "services.corporate-ai-training.precedents.4.title",
      text: "services.corporate-ai-training.precedents.4.text",
      metricValue: "services.corporate-ai-training.precedents.4.metricValue",
      metricLabel: "services.corporate-ai-training.precedents.4.metricLabel",
    },
    {
      title: "services.corporate-ai-training.precedents.5.title",
      text: "services.corporate-ai-training.precedents.5.text",
      metricValue: "services.corporate-ai-training.precedents.5.metricValue",
      metricLabel: "services.corporate-ai-training.precedents.5.metricLabel",
    },
    {
      title: "services.corporate-ai-training.precedents.6.title",
      text: "services.corporate-ai-training.precedents.6.text",
      metricValue: "services.corporate-ai-training.precedents.6.metricValue",
      metricLabel: "services.corporate-ai-training.precedents.6.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.corporate-ai-training.faqItems.0.question",
      answer: "services.corporate-ai-training.faqItems.0.answer",
    },
    {
      question: "services.corporate-ai-training.faqItems.1.question",
      answer: "services.corporate-ai-training.faqItems.1.answer",
    },
    {
      question: "services.corporate-ai-training.faqItems.2.question",
      answer: "services.corporate-ai-training.faqItems.2.answer",
    },
    {
      question: "services.corporate-ai-training.faqItems.3.question",
      answer: "services.corporate-ai-training.faqItems.3.answer",
    },
    {
      question: "services.corporate-ai-training.faqItems.4.question",
      answer: "services.corporate-ai-training.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.corporate-ai-training.tradeoffs.0.title",
      text: "services.corporate-ai-training.tradeoffs.0.text",
    },
    {
      title: "services.corporate-ai-training.tradeoffs.1.title",
      text: "services.corporate-ai-training.tradeoffs.1.text",
    },
    {
      title: "services.corporate-ai-training.tradeoffs.2.title",
      text: "services.corporate-ai-training.tradeoffs.2.text",
    },
    {
      title: "services.corporate-ai-training.tradeoffs.3.title",
      text: "services.corporate-ai-training.tradeoffs.3.text",
    },
    {
      title: "services.corporate-ai-training.tradeoffs.4.title",
      text: "services.corporate-ai-training.tradeoffs.4.text",
    },
    {
      title: "services.corporate-ai-training.tradeoffs.5.title",
      text: "services.corporate-ai-training.tradeoffs.5.text",
    },
  ],
  mechanism: [
    {
      title: "services.corporate-ai-training.mechanism.0.title",
      text: "services.corporate-ai-training.mechanism.0.text",
      diagram: "task-audit",
    },
    {
      title: "services.corporate-ai-training.mechanism.1.title",
      text: "services.corporate-ai-training.mechanism.1.text",
      diagram: "program-fit",
    },
    {
      title: "services.corporate-ai-training.mechanism.2.title",
      text: "services.corporate-ai-training.mechanism.2.text",
      diagram: "practice",
    },
    {
      title: "services.corporate-ai-training.mechanism.3.title",
      text: "services.corporate-ai-training.mechanism.3.text",
      diagram: "metrics-rollout",
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "agentic-systems",
      noteKey: "relevants.corporate-ai-training.agentic-systems",
    },
    {
      type: "solution",
      slug: "content-generation",
      noteKey: "relevants.corporate-ai-training.content-generation",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.corporate-ai-training.software-development",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.corporate-ai-training.agency-content-pipeline",
    },
  ],
};
