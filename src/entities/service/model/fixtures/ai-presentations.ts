import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: `slides` drives the recurring period (price per
 * slide), the `design` tier scales it, and video export plus extra review
 * rounds are one-off add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  support: false,
  fields: [
    {
      kind: "slider",
      id: "slides",
      label: "calculator.fields.slides",
      min: 5,
      max: 60,
      step: 5,
      default: 15,
    },
    {
      kind: "segmented",
      id: "design",
      label: "calculator.fields.design",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "custom", label: "calculator.options.custom" },
      ],
      default: "standard",
    },
    { kind: "toggle", id: "video", label: "calculator.fields.video", default: false },
    {
      kind: "segmented",
      id: "review",
      label: "calculator.fields.review",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "extended", label: "calculator.options.extended" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 200000, weeks: 2 },
    { kind: "perUnit", field: "slides", rate: 4000, weeksPerUnit: 0.15 },
    { kind: "multiplier", field: "design", factors: { standard: 1, custom: 1.7 } },
    { kind: "perOption", field: "video", rates: { false: 0, true: 120000 } },
    { kind: "perOption", field: "review", rates: { standard: 0, extended: 50000 } },
  ],
};

export const aiPresentations: Service = {
  slug: "ai-presentations",
  navTitle: "services.ai-presentations.navTitle",
  title: "services.ai-presentations.title",
  tagline: "services.ai-presentations.tagline",
  description: "services.ai-presentations.description",
  price: { amount: 200000, unit: "project" },
  calculator,
  ctaBanner: {
    title: "services.ai-presentations.ctaBanner.title",
    text: "services.ai-presentations.ctaBanner.text",
    buttonLabel: "services.ai-presentations.ctaBanner.buttonLabel",
  },
  icon: "presentations",
  group: "content",
  features: [
    {
      title: "services.ai-presentations.features.0.title",
      text: "services.ai-presentations.features.0.text",
    },
    {
      title: "services.ai-presentations.features.1.title",
      text: "services.ai-presentations.features.1.text",
    },
    {
      title: "services.ai-presentations.features.2.title",
      text: "services.ai-presentations.features.2.text",
    },
    {
      title: "services.ai-presentations.features.3.title",
      text: "services.ai-presentations.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.ai-presentations.sections.0.title",
      items: [
        "services.ai-presentations.sections.0.items.0",
        "services.ai-presentations.sections.0.items.1",
        "services.ai-presentations.sections.0.items.2",
        "services.ai-presentations.sections.0.items.3",
        "services.ai-presentations.sections.0.items.4",
        "services.ai-presentations.sections.0.items.5",
      ],
    },
    {
      title: "services.ai-presentations.sections.1.title",
      items: [
        "services.ai-presentations.sections.1.items.0",
        "services.ai-presentations.sections.1.items.1",
        "services.ai-presentations.sections.1.items.2",
        "services.ai-presentations.sections.1.items.3",
        "services.ai-presentations.sections.1.items.4",
      ],
    },
    {
      title: "services.ai-presentations.sections.2.title",
      items: [
        "services.ai-presentations.sections.2.items.0",
        "services.ai-presentations.sections.2.items.1",
        "services.ai-presentations.sections.2.items.2",
        "services.ai-presentations.sections.2.items.3",
        "services.ai-presentations.sections.2.items.4",
        "services.ai-presentations.sections.2.items.5",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-presentations.processSteps.0.title",
      text: "services.ai-presentations.processSteps.0.text",
      processType: "requirements",
    },
    {
      title: "services.ai-presentations.processSteps.1.title",
      text: "services.ai-presentations.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "services.ai-presentations.processSteps.2.title",
      text: "services.ai-presentations.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ai-presentations.processSteps.3.title",
      text: "services.ai-presentations.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-presentations.fitItems.0.title",
      text: "services.ai-presentations.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-presentations.fitItems.1.title",
      text: "services.ai-presentations.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-presentations.fitItems.2.title",
      text: "services.ai-presentations.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-presentations.fitItems.3.title",
      text: "services.ai-presentations.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-presentations.proofItems.0.title",
      text: "services.ai-presentations.proofItems.0.text",
      metricValue: "services.ai-presentations.proofItems.0.metricValue",
      metricLabel: "services.ai-presentations.proofItems.0.metricLabel",
    },
    {
      title: "services.ai-presentations.proofItems.1.title",
      text: "services.ai-presentations.proofItems.1.text",
      metricValue: "services.ai-presentations.proofItems.1.metricValue",
      metricLabel: "services.ai-presentations.proofItems.1.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-presentations.faqItems.0.question",
      answer: "services.ai-presentations.faqItems.0.answer",
    },
    {
      question: "services.ai-presentations.faqItems.1.question",
      answer: "services.ai-presentations.faqItems.1.answer",
    },
    {
      question: "services.ai-presentations.faqItems.2.question",
      answer: "services.ai-presentations.faqItems.2.answer",
    },
    {
      question: "services.ai-presentations.faqItems.3.question",
      answer: "services.ai-presentations.faqItems.3.answer",
    },
    {
      question: "services.ai-presentations.faqItems.4.question",
      answer: "services.ai-presentations.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-presentations.tradeoffs.0.title",
      text: "services.ai-presentations.tradeoffs.0.text",
    },
    {
      title: "services.ai-presentations.tradeoffs.1.title",
      text: "services.ai-presentations.tradeoffs.1.text",
    },
    {
      title: "services.ai-presentations.tradeoffs.2.title",
      text: "services.ai-presentations.tradeoffs.2.text",
    },
    {
      title: "services.ai-presentations.tradeoffs.3.title",
      text: "services.ai-presentations.tradeoffs.3.text",
    },
    {
      title: "services.ai-presentations.tradeoffs.4.title",
      text: "services.ai-presentations.tradeoffs.4.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-presentations.outcomes.0.title",
      value: "services.ai-presentations.outcomes.0.value",
      text: "services.ai-presentations.outcomes.0.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-presentations.outcomes.1.title",
      value: "services.ai-presentations.outcomes.1.value",
      text: "services.ai-presentations.outcomes.1.text",
      icon: "presentations",
    },
    {
      title: "services.ai-presentations.outcomes.2.title",
      value: "services.ai-presentations.outcomes.2.value",
      text: "services.ai-presentations.outcomes.2.text",
      icon: "fact-check",
    },
    {
      title: "services.ai-presentations.outcomes.3.title",
      value: "services.ai-presentations.outcomes.3.value",
      text: "services.ai-presentations.outcomes.3.text",
      icon: "insights",
    },
    {
      title: "services.ai-presentations.outcomes.4.title",
      value: "services.ai-presentations.outcomes.4.value",
      text: "services.ai-presentations.outcomes.4.text",
      icon: "code",
    },
    {
      title: "services.ai-presentations.outcomes.5.title",
      value: "services.ai-presentations.outcomes.5.value",
      text: "services.ai-presentations.outcomes.5.text",
      icon: "support-agent",
    },
  ],
  deliverables: [
    {
      title: "services.ai-presentations.deliverables.0.title",
      text: "services.ai-presentations.deliverables.0.text",
    },
    {
      title: "services.ai-presentations.deliverables.1.title",
      text: "services.ai-presentations.deliverables.1.text",
    },
    {
      title: "services.ai-presentations.deliverables.2.title",
      text: "services.ai-presentations.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "content-generation",
      noteKey: "relevants.ai-presentations.content-generation",
    },
    {
      type: "service",
      slug: "corporate-ai-training",
      noteKey: "relevants.ai-presentations.corporate-ai-training",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.ai-presentations.agency-content-pipeline",
    },
  ],
};
