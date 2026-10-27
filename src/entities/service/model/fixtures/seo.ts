import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

const calculator: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    {
      kind: "stepper",
      id: "pages",
      label: "calculator.fields.seo-service.pages",
      min: 5,
      max: 100,
      default: 10,
    },
    {
      kind: "stepper",
      id: "queries",
      label: "calculator.fields.seo-service.queries",
      min: 10,
      max: 200,
      default: 30,
    },
    {
      kind: "stepper",
      id: "competitors",
      label: "calculator.fields.seo-service.competitors",
      min: 1,
      max: 10,
      default: 3,
    },
    {
      kind: "toggle",
      id: "reporting",
      label: "calculator.fields.seo-service.reporting",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 160000, weeks: 2 },
    { kind: "perUnit", field: "pages", rate: 5000, weeksPerUnit: 0.02 },
    { kind: "perUnit", field: "queries", rate: 5000, weeksPerUnit: 0.02 },
    { kind: "perOption", field: "reporting", rates: { false: 0, true: 40000 } },
  ],
};

export const seo: Service = {
  slug: "seo",
  navTitle: "services.seo.navTitle",
  title: "services.seo.title",
  tagline: "services.seo.tagline",
  description: "services.seo.description",
  price: { amount: 200000, unit: "month" },
  calculator,
  ctaBanner: {
    title: "services.seo.ctaBanner.title",
    text: "services.seo.ctaBanner.text",
    buttonLabel: "services.seo.ctaBanner.buttonLabel",
  },
  icon: "insights",
  group: "web-growth",
  features: [
    { title: "services.seo.features.0.title", text: "services.seo.features.0.text" },
    { title: "services.seo.features.1.title", text: "services.seo.features.1.text" },
    { title: "services.seo.features.2.title", text: "services.seo.features.2.text" },
    { title: "services.seo.features.3.title", text: "services.seo.features.3.text" },
  ],
  processSteps: [
    {
      title: "services.seo.processSteps.0.title",
      text: "services.seo.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.seo.processSteps.1.title",
      text: "services.seo.processSteps.1.text",
      processType: "architecture",
    },
    {
      title: "services.seo.processSteps.2.title",
      text: "services.seo.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.seo.processSteps.3.title",
      text: "services.seo.processSteps.3.text",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "services.seo.fitItems.0.title",
      text: "services.seo.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.seo.fitItems.1.title",
      text: "services.seo.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.seo.fitItems.2.title",
      text: "services.seo.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.seo.fitItems.3.title",
      text: "services.seo.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    { question: "services.seo.faqItems.0.question", answer: "services.seo.faqItems.0.answer" },
    { question: "services.seo.faqItems.1.question", answer: "services.seo.faqItems.1.answer" },
    { question: "services.seo.faqItems.2.question", answer: "services.seo.faqItems.2.answer" },
    { question: "services.seo.faqItems.3.question", answer: "services.seo.faqItems.3.answer" },
    { question: "services.seo.faqItems.4.question", answer: "services.seo.faqItems.4.answer" },
  ],
  precedents: [
    {
      title: "services.seo.precedents.0.title",
      text: "services.seo.precedents.0.text",
      metricValue: "services.seo.precedents.0.metricValue",
      metricLabel: "services.seo.precedents.0.metricLabel",
    },
    {
      title: "services.seo.precedents.1.title",
      text: "services.seo.precedents.1.text",
      metricValue: "services.seo.precedents.1.metricValue",
      metricLabel: "services.seo.precedents.1.metricLabel",
    },
    {
      title: "services.seo.precedents.2.title",
      text: "services.seo.precedents.2.text",
      metricValue: "services.seo.precedents.2.metricValue",
      metricLabel: "services.seo.precedents.2.metricLabel",
    },
  ],
  mechanism: [
    { title: "services.seo.mechanism.0.title", text: "services.seo.mechanism.0.text" },
    { title: "services.seo.mechanism.1.title", text: "services.seo.mechanism.1.text" },
    { title: "services.seo.mechanism.2.title", text: "services.seo.mechanism.2.text" },
  ],
  deliverables: [
    { title: "services.seo.deliverables.0.title", text: "services.seo.deliverables.0.text" },
    { title: "services.seo.deliverables.1.title", text: "services.seo.deliverables.1.text" },
    { title: "services.seo.deliverables.2.title", text: "services.seo.deliverables.2.text" },
  ],
  tradeoffs: [
    { title: "services.seo.tradeoffs.0.title", text: "services.seo.tradeoffs.0.text" },
    { title: "services.seo.tradeoffs.1.title", text: "services.seo.tradeoffs.1.text" },
    { title: "services.seo.tradeoffs.2.title", text: "services.seo.tradeoffs.2.text" },
  ],
  relevants: [
    { type: "service", slug: "seo-aeo" },
    { type: "solution", slug: "content-generation" },
    { type: "case", slug: "aeo-ai-visibility" },
  ],
};
