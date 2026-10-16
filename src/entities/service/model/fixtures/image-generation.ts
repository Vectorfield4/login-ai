import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/** Per-batch estimator: images drive volume, resolution and rights are one-off tiers. */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "images",
      label: "calculator.fields.images",
      min: 5,
      max: 100,
      default: 20,
    },
    {
      kind: "segmented",
      id: "resolution",
      label: "calculator.fields.resolution",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "4k", label: "calculator.options.4k" },
      ],
      default: "standard",
    },
    {
      kind: "segmented",
      id: "rights",
      label: "calculator.fields.rights",
      options: [
        { value: "none", label: "calculator.options.none" },
        { value: "extended", label: "calculator.options.extended" },
      ],
      default: "none",
    },
  ],
  terms: [
    { kind: "setup", amount: 250000, weeks: 2 },
    { kind: "perUnit", field: "images", rate: 1500, weeksPerUnit: 0.05 },
    { kind: "perOption", field: "resolution", rates: { standard: 0, "4k": 60000 } },
    { kind: "perOption", field: "rights", rates: { none: 0, extended: 90000 } },
  ],
};

export const imageGeneration: Service = {
  slug: "image-generation",
  navTitle: "services.image-generation.navTitle",
  title: "services.image-generation.title",
  tagline: "services.image-generation.tagline",
  description: "services.image-generation.description",
  price: { amount: 250000, unit: "project" },
  calculator,
  ctaBanner: {
    title: "services.image-generation.ctaBanner.title",
    text: "services.image-generation.ctaBanner.text",
    buttonLabel: "services.image-generation.ctaBanner.buttonLabel",
  },
  icon: "image",
  group: "content",
  features: [
    {
      title: "services.image-generation.features.0.title",
      text: "services.image-generation.features.0.text",
    },
    {
      title: "services.image-generation.features.1.title",
      text: "services.image-generation.features.1.text",
    },
    {
      title: "services.image-generation.features.2.title",
      text: "services.image-generation.features.2.text",
    },
    {
      title: "services.image-generation.features.3.title",
      text: "services.image-generation.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.image-generation.sections.0.title",
      items: [
        "services.image-generation.sections.0.items.0",
        "services.image-generation.sections.0.items.1",
        "services.image-generation.sections.0.items.2",
        "services.image-generation.sections.0.items.3",
        "services.image-generation.sections.0.items.4",
        "services.image-generation.sections.0.items.5",
      ],
    },
    {
      title: "services.image-generation.sections.1.title",
      items: [
        "services.image-generation.sections.1.items.0",
        "services.image-generation.sections.1.items.1",
        "services.image-generation.sections.1.items.2",
        "services.image-generation.sections.1.items.3",
        "services.image-generation.sections.1.items.4",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.image-generation.processSteps.0.title",
      text: "services.image-generation.processSteps.0.text",
      processType: "requirements",
    },
    {
      title: "services.image-generation.processSteps.1.title",
      text: "services.image-generation.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "services.image-generation.processSteps.2.title",
      text: "services.image-generation.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.image-generation.processSteps.3.title",
      text: "services.image-generation.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.image-generation.fitItems.0.title",
      text: "services.image-generation.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.image-generation.fitItems.1.title",
      text: "services.image-generation.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.image-generation.fitItems.2.title",
      text: "services.image-generation.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.image-generation.fitItems.3.title",
      text: "services.image-generation.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.image-generation.proofItems.0.title",
      text: "services.image-generation.proofItems.0.text",
      metricValue: "services.image-generation.proofItems.0.metricValue",
      metricLabel: "services.image-generation.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.image-generation.faqItems.0.question",
      answer: "services.image-generation.faqItems.0.answer",
    },
    {
      question: "services.image-generation.faqItems.1.question",
      answer: "services.image-generation.faqItems.1.answer",
    },
    {
      question: "services.image-generation.faqItems.2.question",
      answer: "services.image-generation.faqItems.2.answer",
    },
    {
      question: "services.image-generation.faqItems.3.question",
      answer: "services.image-generation.faqItems.3.answer",
    },
    {
      question: "services.image-generation.faqItems.4.question",
      answer: "services.image-generation.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.image-generation.tradeoffs.0.title",
      text: "services.image-generation.tradeoffs.0.text",
    },
    {
      title: "services.image-generation.tradeoffs.1.title",
      text: "services.image-generation.tradeoffs.1.text",
    },
    {
      title: "services.image-generation.tradeoffs.2.title",
      text: "services.image-generation.tradeoffs.2.text",
    },
    {
      title: "services.image-generation.tradeoffs.3.title",
      text: "services.image-generation.tradeoffs.3.text",
    },
    {
      title: "services.image-generation.tradeoffs.4.title",
      text: "services.image-generation.tradeoffs.4.text",
    },
  ],
  outcomes: [
    {
      title: "services.image-generation.outcomes.0.title",
      value: "services.image-generation.outcomes.0.value",
      text: "services.image-generation.outcomes.0.text",
      icon: "image",
    },
    {
      title: "services.image-generation.outcomes.1.title",
      value: "services.image-generation.outcomes.1.value",
      text: "services.image-generation.outcomes.1.text",
      icon: "insights",
    },
    {
      title: "services.image-generation.outcomes.2.title",
      value: "services.image-generation.outcomes.2.value",
      text: "services.image-generation.outcomes.2.text",
      icon: "fact-check",
    },
    {
      title: "services.image-generation.outcomes.3.title",
      value: "services.image-generation.outcomes.3.value",
      text: "services.image-generation.outcomes.3.text",
      icon: "rate-review",
    },
    {
      title: "services.image-generation.outcomes.4.title",
      value: "services.image-generation.outcomes.4.value",
      text: "services.image-generation.outcomes.4.text",
      icon: "server",
    },
    {
      title: "services.image-generation.outcomes.5.title",
      value: "services.image-generation.outcomes.5.value",
      text: "services.image-generation.outcomes.5.text",
      icon: "presentations",
    },
  ],
  deliverables: [
    {
      title: "services.image-generation.deliverables.0.title",
      text: "services.image-generation.deliverables.0.text",
    },
    {
      title: "services.image-generation.deliverables.1.title",
      text: "services.image-generation.deliverables.1.text",
    },
    {
      title: "services.image-generation.deliverables.2.title",
      text: "services.image-generation.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "content-generation",
      noteKey: "relevants.image-generation.content-generation",
    },
    {
      type: "service",
      slug: "video-generation",
      noteKey: "relevants.image-generation.video-generation",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.image-generation.agency-content-pipeline",
    },
  ],
};
