import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-program estimator: `participants` drives the recurring period (price per
 * seat), the `depth` level scales it (basic vs advanced video prompting), and
 * onsite delivery plus post-training support are one-off add-ons. The program
 * floor stays as `setup`.
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
    { kind: "setup", amount: 240000, weeks: 2 },
    { kind: "perUnit", field: "participants", rate: 15000, weeksPerUnit: 0.1 },
    { kind: "multiplier", field: "depth", factors: { basic: 1, advanced: 1.8 } },
    { kind: "perOption", field: "format", rates: { online: 0, offline: 120000 } },
  ],
};

export const aiVideoTraining: Service = {
  slug: "ai-video-training",
  navTitle: "services.ai-video-training.navTitle",
  title: "services.ai-video-training.title",
  tagline: "services.ai-video-training.tagline",
  description: "services.ai-video-training.description",
  price: { amount: 240000, unit: "program" },
  calculator,
  ctaBanner: {
    title: "services.ai-video-training.ctaBanner.title",
    text: "services.ai-video-training.ctaBanner.text",
    buttonLabel: "services.ai-video-training.ctaBanner.buttonLabel",
  },
  icon: "video-camera-front",
  group: "training",
  features: [
    {
      title: "services.ai-video-training.features.0.title",
      text: "services.ai-video-training.features.0.text",
    },
    {
      title: "services.ai-video-training.features.1.title",
      text: "services.ai-video-training.features.1.text",
    },
    {
      title: "services.ai-video-training.features.2.title",
      text: "services.ai-video-training.features.2.text",
    },
    {
      title: "services.ai-video-training.features.3.title",
      text: "services.ai-video-training.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.ai-video-training.sections.0.title",
      items: [
        "services.ai-video-training.sections.0.items.0",
        "services.ai-video-training.sections.0.items.1",
        "services.ai-video-training.sections.0.items.2",
        "services.ai-video-training.sections.0.items.3",
        "services.ai-video-training.sections.0.items.4",
        "services.ai-video-training.sections.0.items.5",
      ],
    },
    {
      title: "services.ai-video-training.sections.1.title",
      items: [
        "services.ai-video-training.sections.1.items.0",
        "services.ai-video-training.sections.1.items.1",
        "services.ai-video-training.sections.1.items.2",
        "services.ai-video-training.sections.1.items.3",
        "services.ai-video-training.sections.1.items.4",
        "services.ai-video-training.sections.1.items.5",
      ],
    },
    {
      title: "services.ai-video-training.sections.2.title",
      items: [
        "services.ai-video-training.sections.2.items.0",
        "services.ai-video-training.sections.2.items.1",
        "services.ai-video-training.sections.2.items.2",
        "services.ai-video-training.sections.2.items.3",
        "services.ai-video-training.sections.2.items.4",
        "services.ai-video-training.sections.2.items.5",
      ],
    },
    {
      title: "services.ai-video-training.sections.3.title",
      items: [
        "services.ai-video-training.sections.3.items.0",
        "services.ai-video-training.sections.3.items.1",
        "services.ai-video-training.sections.3.items.2",
        "services.ai-video-training.sections.3.items.3",
        "services.ai-video-training.sections.3.items.4",
        "services.ai-video-training.sections.3.items.5",
        "services.ai-video-training.sections.3.items.6",
        "services.ai-video-training.sections.3.items.7",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-video-training.processSteps.0.title",
      text: "services.ai-video-training.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-video-training.processSteps.1.title",
      text: "services.ai-video-training.processSteps.1.text",
      processType: "requirements",
    },
    {
      title: "services.ai-video-training.processSteps.2.title",
      text: "services.ai-video-training.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ai-video-training.processSteps.3.title",
      text: "services.ai-video-training.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-video-training.fitItems.0.title",
      text: "services.ai-video-training.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-video-training.fitItems.1.title",
      text: "services.ai-video-training.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-video-training.fitItems.2.title",
      text: "services.ai-video-training.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-video-training.fitItems.3.title",
      text: "services.ai-video-training.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.ai-video-training.precedents.0.title",
      text: "services.ai-video-training.precedents.0.text",
      metricValue: "services.ai-video-training.precedents.0.metricValue",
      metricLabel: "services.ai-video-training.precedents.0.metricLabel",
    },
    {
      title: "services.ai-video-training.precedents.1.title",
      text: "services.ai-video-training.precedents.1.text",
      metricValue: "services.ai-video-training.precedents.1.metricValue",
      metricLabel: "services.ai-video-training.precedents.1.metricLabel",
    },
    {
      title: "services.ai-video-training.precedents.2.title",
      text: "services.ai-video-training.precedents.2.text",
      metricValue: "services.ai-video-training.precedents.2.metricValue",
      metricLabel: "services.ai-video-training.precedents.2.metricLabel",
    },
    {
      title: "services.ai-video-training.precedents.3.title",
      text: "services.ai-video-training.precedents.3.text",
      metricValue: "services.ai-video-training.precedents.3.metricValue",
      metricLabel: "services.ai-video-training.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-video-training.faqItems.0.question",
      answer: "services.ai-video-training.faqItems.0.answer",
    },
    {
      question: "services.ai-video-training.faqItems.1.question",
      answer: "services.ai-video-training.faqItems.1.answer",
    },
    {
      question: "services.ai-video-training.faqItems.2.question",
      answer: "services.ai-video-training.faqItems.2.answer",
    },
    {
      question: "services.ai-video-training.faqItems.3.question",
      answer: "services.ai-video-training.faqItems.3.answer",
    },
    {
      question: "services.ai-video-training.faqItems.4.question",
      answer: "services.ai-video-training.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-video-training.tradeoffs.0.title",
      text: "services.ai-video-training.tradeoffs.0.text",
    },
    {
      title: "services.ai-video-training.tradeoffs.1.title",
      text: "services.ai-video-training.tradeoffs.1.text",
    },
    {
      title: "services.ai-video-training.tradeoffs.2.title",
      text: "services.ai-video-training.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-video-training.deliverables.0.title",
      text: "services.ai-video-training.deliverables.0.text",
    },
    {
      title: "services.ai-video-training.deliverables.1.title",
      text: "services.ai-video-training.deliverables.1.text",
    },
    {
      title: "services.ai-video-training.deliverables.2.title",
      text: "services.ai-video-training.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "video-generation",
      noteKey: "relevants.ai-video-training.video-generation",
    },
    {
      type: "service",
      slug: "corporate-ai-training",
      noteKey: "relevants.ai-video-training.corporate-ai-training",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.ai-video-training.agency-content-pipeline",
    },
  ],
};
