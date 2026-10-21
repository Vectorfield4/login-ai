import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

const calculator: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    {
      kind: "stepper",
      id: "pages",
      label: "calculator.fields.aeo.pages",
      min: 5,
      max: 100,
      default: 10,
    },
    {
      kind: "stepper",
      id: "queries",
      label: "calculator.fields.aeo.queries",
      min: 10,
      max: 200,
      default: 10,
    },
    { kind: "toggle", id: "schema", label: "calculator.fields.aeo.schema", default: false },
    { kind: "toggle", id: "reporting", label: "calculator.fields.aeo.reporting", default: false },
  ],
  terms: [
    { kind: "setup", amount: 110000, weeks: 2 },
    { kind: "perUnit", field: "pages", rate: 5000, weeksPerUnit: 0.02 },
    { kind: "perUnit", field: "queries", rate: 10000, weeksPerUnit: 0.02 },
    { kind: "perOption", field: "schema", rates: { false: 0, true: 50000 } },
    { kind: "perOption", field: "reporting", rates: { false: 0, true: 40000 } },
  ],
};

export const aeo: Service = {
  slug: "aeo",
  navTitle: "services.aeo.navTitle",
  title: "services.aeo.title",
  tagline: "services.aeo.tagline",
  description: "services.aeo.description",
  price: { amount: 150000, unit: "month" },
  calculator,
  ctaBanner: {
    title: "services.aeo.ctaBanner.title",
    text: "services.aeo.ctaBanner.text",
    buttonLabel: "services.aeo.ctaBanner.buttonLabel",
  },
  icon: "radar",
  group: "web-growth",
  features: [
    { title: "services.aeo.features.0.title", text: "services.aeo.features.0.text" },
    { title: "services.aeo.features.1.title", text: "services.aeo.features.1.text" },
    { title: "services.aeo.features.2.title", text: "services.aeo.features.2.text" },
    { title: "services.aeo.features.3.title", text: "services.aeo.features.3.text" },
  ],
  processSteps: [
    {
      title: "services.aeo.processSteps.0.title",
      text: "services.aeo.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.aeo.processSteps.1.title",
      text: "services.aeo.processSteps.1.text",
      processType: "architecture",
    },
    {
      title: "services.aeo.processSteps.2.title",
      text: "services.aeo.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.aeo.processSteps.3.title",
      text: "services.aeo.processSteps.3.text",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "services.aeo.fitItems.0.title",
      text: "services.aeo.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.aeo.fitItems.1.title",
      text: "services.aeo.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.aeo.fitItems.2.title",
      text: "services.aeo.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.aeo.fitItems.3.title",
      text: "services.aeo.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    { question: "services.aeo.faqItems.0.question", answer: "services.aeo.faqItems.0.answer" },
    { question: "services.aeo.faqItems.1.question", answer: "services.aeo.faqItems.1.answer" },
    { question: "services.aeo.faqItems.2.question", answer: "services.aeo.faqItems.2.answer" },
    { question: "services.aeo.faqItems.3.question", answer: "services.aeo.faqItems.3.answer" },
    { question: "services.aeo.faqItems.4.question", answer: "services.aeo.faqItems.4.answer" },
  ],
  outcomes: [
    {
      title: "services.aeo.outcomes.0.title",
      value: "services.aeo.outcomes.0.value",
      text: "services.aeo.outcomes.0.text",
      icon: "radar",
    },
    {
      title: "services.aeo.outcomes.1.title",
      value: "services.aeo.outcomes.1.value",
      text: "services.aeo.outcomes.1.text",
      icon: "fact-check",
    },
    {
      title: "services.aeo.outcomes.2.title",
      value: "services.aeo.outcomes.2.value",
      text: "services.aeo.outcomes.2.text",
      icon: "rocket-launch",
    },
  ],
  mechanism: [
    { title: "services.aeo.mechanism.0.title", text: "services.aeo.mechanism.0.text" },
    { title: "services.aeo.mechanism.1.title", text: "services.aeo.mechanism.1.text" },
    { title: "services.aeo.mechanism.2.title", text: "services.aeo.mechanism.2.text" },
  ],
  deliverables: [
    { title: "services.aeo.deliverables.0.title", text: "services.aeo.deliverables.0.text" },
    { title: "services.aeo.deliverables.1.title", text: "services.aeo.deliverables.1.text" },
    { title: "services.aeo.deliverables.2.title", text: "services.aeo.deliverables.2.text" },
  ],
  tradeoffs: [
    { title: "services.aeo.tradeoffs.0.title", text: "services.aeo.tradeoffs.0.text" },
    { title: "services.aeo.tradeoffs.1.title", text: "services.aeo.tradeoffs.1.text" },
    { title: "services.aeo.tradeoffs.2.title", text: "services.aeo.tradeoffs.2.text" },
  ],
  relevants: [
    { type: "service", slug: "seo" },
    { type: "solution", slug: "content-generation" },
    { type: "case", slug: "aeo-ai-visibility" },
  ],
};
