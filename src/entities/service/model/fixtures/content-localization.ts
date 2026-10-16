import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-language estimator: the billing unit is one target language, so
 * `languages` is the `perUnit` field and drives `unitCost` (price per language).
 * Content volume (`scope`) and media (`format`) scale that price as multipliers,
 * while extra QA and per-locale SEO are one-off add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "language",
  horizon: 1,
  fields: [
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
      id: "scope",
      label: "calculator.fields.scope",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "large", label: "calculator.options.large" },
      ],
      default: "standard",
    },
    {
      kind: "segmented",
      id: "format",
      label: "calculator.fields.format",
      options: [
        { value: "text", label: "calculator.options.text" },
        { value: "subtitles", label: "calculator.options.subtitles" },
      ],
      default: "text",
    },
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
    { kind: "toggle", id: "seo", label: "calculator.fields.seo", default: false },
  ],
  terms: [
    { kind: "setup", amount: 150000, weeks: 3 },
    { kind: "perUnit", field: "languages", rate: 200000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "scope", factors: { standard: 1, large: 1.9 } },
    { kind: "multiplier", field: "format", factors: { text: 1, subtitles: 1.35 } },
    { kind: "perOption", field: "review", rates: { standard: 0, extended: 60000 } },
    { kind: "perOption", field: "seo", rates: { false: 0, true: 50000 } },
  ],
};

export const contentLocalization: Service = {
  slug: "content-localization",
  navTitle: "services.content-localization.navTitle",
  title: "services.content-localization.title",
  tagline: "services.content-localization.tagline",
  description: "services.content-localization.description",
  price: { amount: 200000, unit: "language" },
  calculator,
  ctaBanner: {
    title: "services.content-localization.ctaBanner.title",
    text: "services.content-localization.ctaBanner.text",
    buttonLabel: "services.content-localization.ctaBanner.buttonLabel",
  },
  icon: "languages",
  group: "content",
  features: [
    {
      title: "services.content-localization.features.0.title",
      text: "services.content-localization.features.0.text",
    },
    {
      title: "services.content-localization.features.1.title",
      text: "services.content-localization.features.1.text",
    },
    {
      title: "services.content-localization.features.2.title",
      text: "services.content-localization.features.2.text",
    },
    {
      title: "services.content-localization.features.3.title",
      text: "services.content-localization.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.content-localization.sections.0.title",
      items: [
        "services.content-localization.sections.0.items.0",
        "services.content-localization.sections.0.items.1",
        "services.content-localization.sections.0.items.2",
        "services.content-localization.sections.0.items.3",
        "services.content-localization.sections.0.items.4",
        "services.content-localization.sections.0.items.5",
      ],
    },
    {
      title: "services.content-localization.sections.1.title",
      items: [
        "services.content-localization.sections.1.items.0",
        "services.content-localization.sections.1.items.1",
        "services.content-localization.sections.1.items.2",
        "services.content-localization.sections.1.items.3",
        "services.content-localization.sections.1.items.4",
      ],
    },
    {
      title: "services.content-localization.sections.2.title",
      items: [
        "services.content-localization.sections.2.items.0",
        "services.content-localization.sections.2.items.1",
        "services.content-localization.sections.2.items.2",
        "services.content-localization.sections.2.items.3",
        "services.content-localization.sections.2.items.4",
        "services.content-localization.sections.2.items.5",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.content-localization.processSteps.0.title",
      text: "services.content-localization.processSteps.0.text",
      processType: "requirements",
    },
    {
      title: "services.content-localization.processSteps.1.title",
      text: "services.content-localization.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "services.content-localization.processSteps.2.title",
      text: "services.content-localization.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.content-localization.processSteps.3.title",
      text: "services.content-localization.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.content-localization.fitItems.0.title",
      text: "services.content-localization.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.content-localization.fitItems.1.title",
      text: "services.content-localization.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.content-localization.fitItems.2.title",
      text: "services.content-localization.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.content-localization.fitItems.3.title",
      text: "services.content-localization.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.content-localization.proofItems.0.title",
      text: "services.content-localization.proofItems.0.text",
      metricValue: "services.content-localization.proofItems.0.metricValue",
      metricLabel: "services.content-localization.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.content-localization.faqItems.0.question",
      answer: "services.content-localization.faqItems.0.answer",
    },
    {
      question: "services.content-localization.faqItems.1.question",
      answer: "services.content-localization.faqItems.1.answer",
    },
    {
      question: "services.content-localization.faqItems.2.question",
      answer: "services.content-localization.faqItems.2.answer",
    },
    {
      question: "services.content-localization.faqItems.3.question",
      answer: "services.content-localization.faqItems.3.answer",
    },
    {
      question: "services.content-localization.faqItems.4.question",
      answer: "services.content-localization.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.content-localization.tradeoffs.0.title",
      text: "services.content-localization.tradeoffs.0.text",
    },
    {
      title: "services.content-localization.tradeoffs.1.title",
      text: "services.content-localization.tradeoffs.1.text",
    },
    {
      title: "services.content-localization.tradeoffs.2.title",
      text: "services.content-localization.tradeoffs.2.text",
    },
    {
      title: "services.content-localization.tradeoffs.3.title",
      text: "services.content-localization.tradeoffs.3.text",
    },
    {
      title: "services.content-localization.tradeoffs.4.title",
      text: "services.content-localization.tradeoffs.4.text",
    },
  ],
  outcomes: [
    {
      title: "services.content-localization.outcomes.0.title",
      value: "services.content-localization.outcomes.0.value",
      text: "services.content-localization.outcomes.0.text",
      icon: "rocket-launch",
    },
    {
      title: "services.content-localization.outcomes.1.title",
      value: "services.content-localization.outcomes.1.value",
      text: "services.content-localization.outcomes.1.text",
      icon: "languages",
    },
    {
      title: "services.content-localization.outcomes.2.title",
      value: "services.content-localization.outcomes.2.value",
      text: "services.content-localization.outcomes.2.text",
      icon: "fact-check",
    },
    {
      title: "services.content-localization.outcomes.3.title",
      value: "services.content-localization.outcomes.3.value",
      text: "services.content-localization.outcomes.3.text",
      icon: "travel-explore",
    },
    {
      title: "services.content-localization.outcomes.4.title",
      value: "services.content-localization.outcomes.4.value",
      text: "services.content-localization.outcomes.4.text",
      icon: "video-camera-front",
    },
    {
      title: "services.content-localization.outcomes.5.title",
      value: "services.content-localization.outcomes.5.value",
      text: "services.content-localization.outcomes.5.text",
      icon: "server",
    },
  ],
  deliverables: [
    {
      title: "services.content-localization.deliverables.0.title",
      text: "services.content-localization.deliverables.0.text",
    },
    {
      title: "services.content-localization.deliverables.1.title",
      text: "services.content-localization.deliverables.1.text",
    },
    {
      title: "services.content-localization.deliverables.2.title",
      text: "services.content-localization.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "content-generation",
      noteKey: "relevants.content-localization.content-generation",
    },
    {
      type: "service",
      slug: "seo-aeo",
      noteKey: "relevants.content-localization.seo-aeo",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.content-localization.agency-content-pipeline",
    },
  ],
};
