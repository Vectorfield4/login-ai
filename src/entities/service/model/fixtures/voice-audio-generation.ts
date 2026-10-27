import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator for finished audio: `minutes` drives the recurring
 * period, extra voices are a one-off cloning/calibration add-on, `languages`
 * scales the period and timeline for localisation, and rights/review are
 * one-off tiers. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "slider",
      id: "minutes",
      label: "calculator.fields.minutes",
      min: 5,
      max: 120,
      step: 5,
      default: 10,
    },
    {
      kind: "stepper",
      id: "voices",
      label: "calculator.fields.voices",
      min: 1,
      max: 5,
      default: 1,
    },
    {
      kind: "stepper",
      id: "languages",
      label: "calculator.fields.languages",
      min: 1,
      max: 5,
      default: 1,
    },
    { kind: "toggle", id: "rights", label: "calculator.fields.rights", default: false },
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
    { kind: "setup", amount: 300000, weeks: 4 },
    { kind: "perUnit", field: "minutes", rate: 3000, weeksPerUnit: 0.1 },
    {
      kind: "perOption",
      field: "voices",
      rates: { "1": 0, "2": 25000, "3": 50000, "4": 75000, "5": 100000 },
    },
    {
      kind: "multiplier",
      field: "languages",
      factors: { "1": 1, "2": 1.2, "3": 1.4, "4": 1.6, "5": 1.8 },
    },
    { kind: "perOption", field: "rights", rates: { true: 80000, false: 0 } },
    { kind: "perOption", field: "review", rates: { standard: 0, extended: 60000 } },
  ],
};

export const voiceAudioGeneration: Service = {
  slug: "voice-audio-generation",
  navTitle: "services.voice-audio-generation.navTitle",
  title: "services.voice-audio-generation.title",
  tagline: "services.voice-audio-generation.tagline",
  description: "services.voice-audio-generation.description",
  price: { amount: 300000, unit: "project" },
  calculator,
  ctaBanner: {
    title: "services.voice-audio-generation.ctaBanner.title",
    text: "services.voice-audio-generation.ctaBanner.text",
    buttonLabel: "services.voice-audio-generation.ctaBanner.buttonLabel",
  },
  icon: "audio",
  group: "content",
  features: [
    {
      title: "services.voice-audio-generation.features.0.title",
      text: "services.voice-audio-generation.features.0.text",
    },
    {
      title: "services.voice-audio-generation.features.1.title",
      text: "services.voice-audio-generation.features.1.text",
    },
    {
      title: "services.voice-audio-generation.features.2.title",
      text: "services.voice-audio-generation.features.2.text",
    },
    {
      title: "services.voice-audio-generation.features.3.title",
      text: "services.voice-audio-generation.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.voice-audio-generation.sections.0.title",
      items: [
        "services.voice-audio-generation.sections.0.items.0",
        "services.voice-audio-generation.sections.0.items.1",
        "services.voice-audio-generation.sections.0.items.2",
        "services.voice-audio-generation.sections.0.items.3",
        "services.voice-audio-generation.sections.0.items.4",
        "services.voice-audio-generation.sections.0.items.5",
      ],
    },
    {
      title: "services.voice-audio-generation.sections.1.title",
      items: [
        "services.voice-audio-generation.sections.1.items.0",
        "services.voice-audio-generation.sections.1.items.1",
        "services.voice-audio-generation.sections.1.items.2",
        "services.voice-audio-generation.sections.1.items.3",
        "services.voice-audio-generation.sections.1.items.4",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.voice-audio-generation.processSteps.0.title",
      text: "services.voice-audio-generation.processSteps.0.text",
      processType: "requirements",
    },
    {
      title: "services.voice-audio-generation.processSteps.1.title",
      text: "services.voice-audio-generation.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "services.voice-audio-generation.processSteps.2.title",
      text: "services.voice-audio-generation.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.voice-audio-generation.processSteps.3.title",
      text: "services.voice-audio-generation.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.voice-audio-generation.fitItems.0.title",
      text: "services.voice-audio-generation.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.voice-audio-generation.fitItems.1.title",
      text: "services.voice-audio-generation.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.voice-audio-generation.fitItems.2.title",
      text: "services.voice-audio-generation.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.voice-audio-generation.fitItems.3.title",
      text: "services.voice-audio-generation.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.voice-audio-generation.precedents.0.title",
      text: "services.voice-audio-generation.precedents.0.text",
      metricValue: "services.voice-audio-generation.precedents.0.metricValue",
      metricLabel: "services.voice-audio-generation.precedents.0.metricLabel",
    },
    {
      title: "services.voice-audio-generation.precedents.1.title",
      text: "services.voice-audio-generation.precedents.1.text",
      metricValue: "services.voice-audio-generation.precedents.1.metricValue",
      metricLabel: "services.voice-audio-generation.precedents.1.metricLabel",
    },
    {
      title: "services.voice-audio-generation.precedents.2.title",
      text: "services.voice-audio-generation.precedents.2.text",
      metricValue: "services.voice-audio-generation.precedents.2.metricValue",
      metricLabel: "services.voice-audio-generation.precedents.2.metricLabel",
    },
    {
      title: "services.voice-audio-generation.precedents.3.title",
      text: "services.voice-audio-generation.precedents.3.text",
      metricValue: "services.voice-audio-generation.precedents.3.metricValue",
      metricLabel: "services.voice-audio-generation.precedents.3.metricLabel",
    },
    {
      title: "services.voice-audio-generation.precedents.4.title",
      text: "services.voice-audio-generation.precedents.4.text",
      metricValue: "services.voice-audio-generation.precedents.4.metricValue",
      metricLabel: "services.voice-audio-generation.precedents.4.metricLabel",
    },
    {
      title: "services.voice-audio-generation.precedents.5.title",
      text: "services.voice-audio-generation.precedents.5.text",
      metricValue: "services.voice-audio-generation.precedents.5.metricValue",
      metricLabel: "services.voice-audio-generation.precedents.5.metricLabel",
    },
    {
      title: "services.voice-audio-generation.precedents.6.title",
      text: "services.voice-audio-generation.precedents.6.text",
      metricValue: "services.voice-audio-generation.precedents.6.metricValue",
      metricLabel: "services.voice-audio-generation.precedents.6.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.voice-audio-generation.faqItems.0.question",
      answer: "services.voice-audio-generation.faqItems.0.answer",
    },
    {
      question: "services.voice-audio-generation.faqItems.1.question",
      answer: "services.voice-audio-generation.faqItems.1.answer",
    },
    {
      question: "services.voice-audio-generation.faqItems.2.question",
      answer: "services.voice-audio-generation.faqItems.2.answer",
    },
    {
      question: "services.voice-audio-generation.faqItems.3.question",
      answer: "services.voice-audio-generation.faqItems.3.answer",
    },
    {
      question: "services.voice-audio-generation.faqItems.4.question",
      answer: "services.voice-audio-generation.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.voice-audio-generation.tradeoffs.0.title",
      text: "services.voice-audio-generation.tradeoffs.0.text",
    },
    {
      title: "services.voice-audio-generation.tradeoffs.1.title",
      text: "services.voice-audio-generation.tradeoffs.1.text",
    },
    {
      title: "services.voice-audio-generation.tradeoffs.2.title",
      text: "services.voice-audio-generation.tradeoffs.2.text",
    },
    {
      title: "services.voice-audio-generation.tradeoffs.3.title",
      text: "services.voice-audio-generation.tradeoffs.3.text",
    },
    {
      title: "services.voice-audio-generation.tradeoffs.4.title",
      text: "services.voice-audio-generation.tradeoffs.4.text",
    },
  ],
  deliverables: [
    {
      title: "services.voice-audio-generation.deliverables.0.title",
      text: "services.voice-audio-generation.deliverables.0.text",
    },
    {
      title: "services.voice-audio-generation.deliverables.1.title",
      text: "services.voice-audio-generation.deliverables.1.text",
    },
    {
      title: "services.voice-audio-generation.deliverables.2.title",
      text: "services.voice-audio-generation.deliverables.2.text",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "content-generation",
      noteKey: "relevants.voice-audio-generation.content-generation",
    },
    {
      type: "service",
      slug: "video-generation",
      noteKey: "relevants.voice-audio-generation.video-generation",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.voice-audio-generation.agency-content-pipeline",
    },
  ],
};
