import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Year-one retainer estimator: tracked `topics` drive the monthly period, the
 * number of `languages` scales it, and content production plus AEO work are
 * one-off add-ons. The monthly floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    {
      kind: "stepper",
      id: "topics",
      label: "calculator.fields.seo-aeo.topics",
      min: 5,
      max: 50,
      default: 10,
    },
    {
      kind: "stepper",
      id: "languages",
      label: "calculator.fields.languages",
      min: 1,
      max: 5,
      default: 1,
    },
    { kind: "toggle", id: "content", label: "calculator.fields.seo-aeo.content", default: false },
    {
      kind: "toggle",
      id: "technical",
      label: "calculator.fields.seo-aeo.technical",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 250000, weeks: 2 },
    { kind: "perUnit", field: "topics", rate: 12000, weeksPerUnit: 0.05 },
    {
      kind: "multiplier",
      field: "languages",
      factors: { "1": 1, "2": 1.15, "3": 1.3, "4": 1.45, "5": 1.6 },
    },
    { kind: "perOption", field: "content", rates: { false: 0, true: 80000 } },
    { kind: "perOption", field: "technical", rates: { false: 0, true: 60000 } },
  ],
};

export const seoAeo: Service = {
  slug: "seo-aeo",
  navTitle: "services.seo-aeo.navTitle",
  title: "services.seo-aeo.title",
  tagline: "services.seo-aeo.tagline",
  description: "services.seo-aeo.description",
  price: { amount: 120000, unit: "month" },
  calculator,
  ctaBanner: {
    title: "services.seo-aeo.ctaBanner.title",
    text: "services.seo-aeo.ctaBanner.text",
    buttonLabel: "services.seo-aeo.ctaBanner.buttonLabel",
  },
  icon: "insights",
  group: "web-growth",
  features: [
    {
      title: "services.seo-aeo.features.0.title",
      text: "services.seo-aeo.features.0.text",
    },
    {
      title: "services.seo-aeo.features.1.title",
      text: "services.seo-aeo.features.1.text",
    },
    {
      title: "services.seo-aeo.features.2.title",
      text: "services.seo-aeo.features.2.text",
    },
    {
      title: "services.seo-aeo.features.3.title",
      text: "services.seo-aeo.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "services.seo-aeo.processSteps.0.title",
      text: "services.seo-aeo.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.seo-aeo.processSteps.1.title",
      text: "services.seo-aeo.processSteps.1.text",
      processType: "architecture",
    },
    {
      title: "services.seo-aeo.processSteps.2.title",
      text: "services.seo-aeo.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.seo-aeo.processSteps.3.title",
      text: "services.seo-aeo.processSteps.3.text",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "services.seo-aeo.fitItems.0.title",
      text: "services.seo-aeo.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.seo-aeo.fitItems.1.title",
      text: "services.seo-aeo.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.seo-aeo.fitItems.2.title",
      text: "services.seo-aeo.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.seo-aeo.fitItems.3.title",
      text: "services.seo-aeo.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.seo-aeo.precedents.0.title",
      text: "services.seo-aeo.precedents.0.text",
      metricValue: "services.seo-aeo.precedents.0.metricValue",
      metricLabel: "services.seo-aeo.precedents.0.metricLabel",
    },
    {
      title: "services.seo-aeo.precedents.1.title",
      text: "services.seo-aeo.precedents.1.text",
      metricValue: "services.seo-aeo.precedents.1.metricValue",
      metricLabel: "services.seo-aeo.precedents.1.metricLabel",
    },
    {
      title: "services.seo-aeo.precedents.2.title",
      text: "services.seo-aeo.precedents.2.text",
      metricValue: "services.seo-aeo.precedents.2.metricValue",
      metricLabel: "services.seo-aeo.precedents.2.metricLabel",
    },
    {
      title: "services.seo-aeo.precedents.3.title",
      text: "services.seo-aeo.precedents.3.text",
      metricValue: "services.seo-aeo.precedents.3.metricValue",
      metricLabel: "services.seo-aeo.precedents.3.metricLabel",
    },
    {
      title: "services.seo-aeo.precedents.4.title",
      text: "services.seo-aeo.precedents.4.text",
      metricValue: "services.seo-aeo.precedents.4.metricValue",
      metricLabel: "services.seo-aeo.precedents.4.metricLabel",
    },
    {
      title: "services.seo-aeo.precedents.5.title",
      text: "services.seo-aeo.precedents.5.text",
      metricValue: "services.seo-aeo.precedents.5.metricValue",
      metricLabel: "services.seo-aeo.precedents.5.metricLabel",
    },
    {
      title: "services.seo-aeo.precedents.6.title",
      text: "services.seo-aeo.precedents.6.text",
      metricValue: "services.seo-aeo.precedents.6.metricValue",
      metricLabel: "services.seo-aeo.precedents.6.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.seo-aeo.faqItems.0.question",
      answer: "services.seo-aeo.faqItems.0.answer",
    },
    {
      question: "services.seo-aeo.faqItems.1.question",
      answer: "services.seo-aeo.faqItems.1.answer",
    },
    {
      question: "services.seo-aeo.faqItems.2.question",
      answer: "services.seo-aeo.faqItems.2.answer",
    },
    {
      question: "services.seo-aeo.faqItems.3.question",
      answer: "services.seo-aeo.faqItems.3.answer",
    },
  ],
  mechanism: [
    {
      title: "services.seo-aeo.mechanism.0.title",
      text: "services.seo-aeo.mechanism.0.text",
      diagram: "answer-flow",
    },
    {
      title: "services.seo-aeo.mechanism.1.title",
      text: "services.seo-aeo.mechanism.1.text",
      diagram: "topic-map",
    },
    {
      title: "services.seo-aeo.mechanism.2.title",
      text: "services.seo-aeo.mechanism.2.text",
      diagram: "single-answer",
    },
    {
      title: "services.seo-aeo.mechanism.3.title",
      text: "services.seo-aeo.mechanism.3.text",
      diagram: "authority",
    },
    {
      title: "services.seo-aeo.mechanism.4.title",
      text: "services.seo-aeo.mechanism.4.text",
      diagram: "update-loop",
    },
    {
      title: "services.seo-aeo.mechanism.5.title",
      text: "services.seo-aeo.mechanism.5.text",
      diagram: "faq-schema",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "seo",
    },
    {
      type: "service",
      slug: "aeo",
    },
    {
      type: "service",
      slug: "geo-ai-search",
    },
    {
      type: "service",
      slug: "ai-for-site",
    },
    {
      type: "solution",
      slug: "content-generation",
      noteKey: "relevants.seo-aeo.content-generation",
    },
    {
      type: "case",
      slug: "aeo-ai-visibility",
      noteKey: "relevants.seo-aeo.aeo-ai-visibility",
    },
  ],
};
