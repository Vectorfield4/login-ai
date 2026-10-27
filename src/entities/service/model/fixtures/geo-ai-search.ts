import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

const calculator: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    {
      kind: "stepper",
      id: "engines",
      label: "calculator.fields.geo-ai-search.engines",
      min: 1,
      max: 6,
      default: 3,
    },
    {
      kind: "stepper",
      id: "queries",
      label: "calculator.fields.geo-ai-search.queries",
      min: 10,
      max: 200,
      default: 40,
    },
    {
      kind: "stepper",
      id: "competitors",
      label: "calculator.fields.geo-ai-search.competitors",
      min: 1,
      max: 10,
      default: 3,
    },
    {
      kind: "toggle",
      id: "reporting",
      label: "calculator.fields.geo-ai-search.reporting",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 155000, weeks: 2 },
    { kind: "perUnit", field: "engines", rate: 0, weeksPerUnit: 0.05 },
    { kind: "perUnit", field: "queries", rate: 5000, weeksPerUnit: 0.02 },
    { kind: "perOption", field: "reporting", rates: { false: 0, true: 40000 } },
  ],
};

export const geoAiSearch: Service = {
  slug: "geo-ai-search",
  navTitle: "services.geo-ai-search.navTitle",
  title: "services.geo-ai-search.title",
  tagline: "services.geo-ai-search.tagline",
  description: "services.geo-ai-search.description",
  price: { amount: 200000, unit: "month" },
  calculator,
  ctaBanner: {
    title: "services.geo-ai-search.ctaBanner.title",
    text: "services.geo-ai-search.ctaBanner.text",
    buttonLabel: "services.geo-ai-search.ctaBanner.buttonLabel",
  },
  icon: "travel-explore",
  group: "web-growth",
  features: [
    {
      title: "services.geo-ai-search.features.0.title",
      text: "services.geo-ai-search.features.0.text",
    },
    {
      title: "services.geo-ai-search.features.1.title",
      text: "services.geo-ai-search.features.1.text",
    },
    {
      title: "services.geo-ai-search.features.2.title",
      text: "services.geo-ai-search.features.2.text",
    },
    {
      title: "services.geo-ai-search.features.3.title",
      text: "services.geo-ai-search.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "services.geo-ai-search.processSteps.0.title",
      text: "services.geo-ai-search.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.geo-ai-search.processSteps.1.title",
      text: "services.geo-ai-search.processSteps.1.text",
      processType: "architecture",
    },
    {
      title: "services.geo-ai-search.processSteps.2.title",
      text: "services.geo-ai-search.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.geo-ai-search.processSteps.3.title",
      text: "services.geo-ai-search.processSteps.3.text",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "services.geo-ai-search.fitItems.0.title",
      text: "services.geo-ai-search.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.geo-ai-search.fitItems.1.title",
      text: "services.geo-ai-search.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.geo-ai-search.fitItems.2.title",
      text: "services.geo-ai-search.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.geo-ai-search.fitItems.3.title",
      text: "services.geo-ai-search.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.geo-ai-search.faqItems.0.question",
      answer: "services.geo-ai-search.faqItems.0.answer",
    },
    {
      question: "services.geo-ai-search.faqItems.1.question",
      answer: "services.geo-ai-search.faqItems.1.answer",
    },
    {
      question: "services.geo-ai-search.faqItems.2.question",
      answer: "services.geo-ai-search.faqItems.2.answer",
    },
    {
      question: "services.geo-ai-search.faqItems.3.question",
      answer: "services.geo-ai-search.faqItems.3.answer",
    },
    {
      question: "services.geo-ai-search.faqItems.4.question",
      answer: "services.geo-ai-search.faqItems.4.answer",
    },
  ],
  precedents: [
    {
      title: "services.geo-ai-search.precedents.0.title",
      text: "services.geo-ai-search.precedents.0.text",
      metricValue: "services.geo-ai-search.precedents.0.metricValue",
      metricLabel: "services.geo-ai-search.precedents.0.metricLabel",
    },
    {
      title: "services.geo-ai-search.precedents.1.title",
      text: "services.geo-ai-search.precedents.1.text",
      metricValue: "services.geo-ai-search.precedents.1.metricValue",
      metricLabel: "services.geo-ai-search.precedents.1.metricLabel",
    },
    {
      title: "services.geo-ai-search.precedents.2.title",
      text: "services.geo-ai-search.precedents.2.text",
      metricValue: "services.geo-ai-search.precedents.2.metricValue",
      metricLabel: "services.geo-ai-search.precedents.2.metricLabel",
    },
  ],
  mechanism: [
    {
      title: "services.geo-ai-search.mechanism.0.title",
      text: "services.geo-ai-search.mechanism.0.text",
    },
    {
      title: "services.geo-ai-search.mechanism.1.title",
      text: "services.geo-ai-search.mechanism.1.text",
    },
    {
      title: "services.geo-ai-search.mechanism.2.title",
      text: "services.geo-ai-search.mechanism.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.geo-ai-search.deliverables.0.title",
      text: "services.geo-ai-search.deliverables.0.text",
    },
    {
      title: "services.geo-ai-search.deliverables.1.title",
      text: "services.geo-ai-search.deliverables.1.text",
    },
    {
      title: "services.geo-ai-search.deliverables.2.title",
      text: "services.geo-ai-search.deliverables.2.text",
    },
  ],
  tradeoffs: [
    {
      title: "services.geo-ai-search.tradeoffs.0.title",
      text: "services.geo-ai-search.tradeoffs.0.text",
    },
    {
      title: "services.geo-ai-search.tradeoffs.1.title",
      text: "services.geo-ai-search.tradeoffs.1.text",
    },
    {
      title: "services.geo-ai-search.tradeoffs.2.title",
      text: "services.geo-ai-search.tradeoffs.2.text",
    },
  ],
  relevants: [
    { type: "service", slug: "seo" },
    { type: "solution", slug: "content-generation" },
    { type: "case", slug: "aeo-ai-visibility" },
  ],
};
