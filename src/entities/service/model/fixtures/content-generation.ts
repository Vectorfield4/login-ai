import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Year-one estimator for the content pipeline: the project floor stays as
 * `setup`, monthly volume drives the recurring period, and each selected video
 * modality is an add-on coefficient of the base.
 */
const calculator: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    {
      kind: "slider",
      id: "volume",
      label: "calculator.fields.volume",
      min: 4,
      max: 60,
      step: 4,
      default: 12,
    },
    {
      kind: "stepper",
      id: "languages",
      label: "calculator.fields.languages",
      min: 1,
      max: 5,
      default: 1,
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
    {
      kind: "toggle",
      id: "videoEnabled",
      label: "calculator.fields.video",
      default: false,
    },
    {
      kind: "multiselect",
      id: "video",
      label: "calculator.fields.content-generation.videoModes",
      options: [
        { value: "text-to-video", label: "technologies.textToVideo" },
        { value: "image-to-video", label: "technologies.imageToVideo" },
        { value: "video-to-video", label: "technologies.videoToVideo" },
      ],
      default: ["text-to-video"],
      minSelected: 1,
      visibleWhen: { field: "videoEnabled", equals: "true" },
    },
  ],
  terms: [
    { kind: "setup", amount: 1200000, weeks: 6 },
    { kind: "perUnit", field: "volume", rate: 40000, weeksPerUnit: 0.5 },
    {
      kind: "multiplier",
      field: "languages",
      factors: { "1": 1, "2": 1.2, "3": 1.4, "4": 1.6, "5": 1.8 },
    },
    { kind: "perOption", field: "review", rates: { standard: 0, extended: 150000 } },
    {
      kind: "addon",
      field: "video",
      equals: "text-to-video",
      ref: "text-to-video",
      when: { field: "videoEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "video",
      equals: "image-to-video",
      ref: "image-to-video",
      when: { field: "videoEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "video",
      equals: "video-to-video",
      ref: "video-to-video",
      when: { field: "videoEnabled", equals: "true" },
    },
  ],
  included: [
    { kind: "capability", slug: "content" },
    { kind: "technology", slug: "llm" },
  ],
};

export const contentGeneration: Service = {
  slug: "content-generation",
  navTitle: "services.content-generation.navTitle",
  title: "services.content-generation.title",
  tagline: "services.content-generation.tagline",
  description: "services.content-generation.description",
  price: { amount: 1200000, unit: "project" },
  calculator,
  ctaBanner: {
    title: "services.content-generation.ctaBanner.title",
    text: "services.content-generation.ctaBanner.text",
    buttonLabel: "services.content-generation.ctaBanner.buttonLabel",
  },
  icon: "article",
  group: "content",
  features: [
    {
      title: "services.content-generation.features.0.title",
      text: "services.content-generation.features.0.text",
    },
    {
      title: "services.content-generation.features.1.title",
      text: "services.content-generation.features.1.text",
    },
    {
      title: "services.content-generation.features.2.title",
      text: "services.content-generation.features.2.text",
    },
    {
      title: "services.content-generation.features.3.title",
      text: "services.content-generation.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.content-generation.sections.0.title",
      items: [
        "services.content-generation.sections.0.items.0",
        "services.content-generation.sections.0.items.1",
        "services.content-generation.sections.0.items.2",
        "services.content-generation.sections.0.items.3",
        "services.content-generation.sections.0.items.4",
        "services.content-generation.sections.0.items.5",
      ],
    },
    {
      title: "services.content-generation.sections.1.title",
      items: [
        "services.content-generation.sections.1.items.0",
        "services.content-generation.sections.1.items.1",
        "services.content-generation.sections.1.items.2",
        "services.content-generation.sections.1.items.3",
        "services.content-generation.sections.1.items.4",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.content-generation.processSteps.0.title",
      text: "services.content-generation.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.content-generation.processSteps.1.title",
      text: "services.content-generation.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.content-generation.processSteps.2.title",
      text: "services.content-generation.processSteps.2.text",
      processType: "prototyping",
    },
    {
      title: "services.content-generation.processSteps.3.title",
      text: "services.content-generation.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.content-generation.fitItems.0.title",
      text: "services.content-generation.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.content-generation.fitItems.1.title",
      text: "services.content-generation.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.content-generation.fitItems.2.title",
      text: "services.content-generation.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.content-generation.fitItems.3.title",
      text: "services.content-generation.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.content-generation.precedents.0.title",
      text: "services.content-generation.precedents.0.text",
      metricValue: "services.content-generation.precedents.0.metricValue",
      metricLabel: "services.content-generation.precedents.0.metricLabel",
    },
    {
      title: "services.content-generation.precedents.1.title",
      text: "services.content-generation.precedents.1.text",
      metricValue: "services.content-generation.precedents.1.metricValue",
      metricLabel: "services.content-generation.precedents.1.metricLabel",
    },
    {
      title: "services.content-generation.precedents.2.title",
      text: "services.content-generation.precedents.2.text",
      metricValue: "services.content-generation.precedents.2.metricValue",
      metricLabel: "services.content-generation.precedents.2.metricLabel",
    },
    {
      title: "services.content-generation.precedents.3.title",
      text: "services.content-generation.precedents.3.text",
      metricValue: "services.content-generation.precedents.3.metricValue",
      metricLabel: "services.content-generation.precedents.3.metricLabel",
    },
    {
      title: "services.content-generation.precedents.4.title",
      text: "services.content-generation.precedents.4.text",
      metricValue: "services.content-generation.precedents.4.metricValue",
      metricLabel: "services.content-generation.precedents.4.metricLabel",
    },
    {
      title: "services.content-generation.precedents.5.title",
      text: "services.content-generation.precedents.5.text",
      metricValue: "services.content-generation.precedents.5.metricValue",
      metricLabel: "services.content-generation.precedents.5.metricLabel",
    },
    {
      title: "services.content-generation.precedents.6.title",
      text: "services.content-generation.precedents.6.text",
      metricValue: "services.content-generation.precedents.6.metricValue",
      metricLabel: "services.content-generation.precedents.6.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.content-generation.faqItems.0.question",
      answer: "services.content-generation.faqItems.0.answer",
    },
    {
      question: "services.content-generation.faqItems.1.question",
      answer: "services.content-generation.faqItems.1.answer",
    },
    {
      question: "services.content-generation.faqItems.2.question",
      answer: "services.content-generation.faqItems.2.answer",
    },
    {
      question: "services.content-generation.faqItems.3.question",
      answer: "services.content-generation.faqItems.3.answer",
    },
    {
      question: "services.content-generation.faqItems.4.question",
      answer: "services.content-generation.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.content-generation.tradeoffs.0.title",
      text: "services.content-generation.tradeoffs.0.text",
    },
    {
      title: "services.content-generation.tradeoffs.1.title",
      text: "services.content-generation.tradeoffs.1.text",
    },
    {
      title: "services.content-generation.tradeoffs.2.title",
      text: "services.content-generation.tradeoffs.2.text",
    },
    {
      title: "services.content-generation.tradeoffs.3.title",
      text: "services.content-generation.tradeoffs.3.text",
    },
    {
      title: "services.content-generation.tradeoffs.4.title",
      text: "services.content-generation.tradeoffs.4.text",
    },
  ],
  deliverables: [
    {
      title: "services.content-generation.deliverables.0.title",
      text: "services.content-generation.deliverables.0.text",
    },
    {
      title: "services.content-generation.deliverables.1.title",
      text: "services.content-generation.deliverables.1.text",
    },
    {
      title: "services.content-generation.deliverables.2.title",
      text: "services.content-generation.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "video-generation",
      noteKey: "relevants.content-generation.video-generation",
    },
    {
      type: "solution",
      slug: "reputation-management",
      noteKey: "relevants.content-generation.reputation-management",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.content-generation.agency-content-pipeline",
    },
  ],
};
