import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "pages",
      label: "calculator.fields.ai-for-site.pages",
      min: 5,
      max: 200,
      default: 20,
    },
    {
      kind: "stepper",
      id: "products",
      label: "calculator.fields.ai-for-site.products",
      min: 0,
      max: 10000,
      default: 100,
    },
    { kind: "toggle", id: "search", label: "calculator.fields.ai-for-site.search", default: false },
    {
      kind: "toggle",
      id: "personalization",
      label: "calculator.fields.ai-for-site.personalization",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 500000 },
    { kind: "perUnit", field: "pages", rate: 3000 },
    { kind: "perUnit", field: "products", rate: 1400 },
    { kind: "perOption", field: "search", rates: { false: 0, true: 60000 } },
    { kind: "perOption", field: "personalization", rates: { false: 0, true: 80000 } },
  ],
};

export const aiForSite: Service = {
  slug: "ai-for-site",
  navTitle: "services.ai-for-site.navTitle",
  title: "services.ai-for-site.title",
  tagline: "services.ai-for-site.tagline",
  description: "services.ai-for-site.description",
  price: { amount: 500000, unit: "project" },
  calculator,
  ctaBanner: {
    title: "services.ai-for-site.ctaBanner.title",
    text: "services.ai-for-site.ctaBanner.text",
    buttonLabel: "services.ai-for-site.ctaBanner.buttonLabel",
  },
  icon: "code",
  group: "web-growth",
  features: [
    {
      title: "services.ai-for-site.features.0.title",
      text: "services.ai-for-site.features.0.text",
    },
    {
      title: "services.ai-for-site.features.1.title",
      text: "services.ai-for-site.features.1.text",
    },
    {
      title: "services.ai-for-site.features.2.title",
      text: "services.ai-for-site.features.2.text",
    },
    {
      title: "services.ai-for-site.features.3.title",
      text: "services.ai-for-site.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "services.ai-for-site.processSteps.0.title",
      text: "services.ai-for-site.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-for-site.processSteps.1.title",
      text: "services.ai-for-site.processSteps.1.text",
      processType: "architecture",
    },
    {
      title: "services.ai-for-site.processSteps.2.title",
      text: "services.ai-for-site.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ai-for-site.processSteps.3.title",
      text: "services.ai-for-site.processSteps.3.text",
      processType: "testing",
    },
  ],
  fitItems: [
    {
      title: "services.ai-for-site.fitItems.0.title",
      text: "services.ai-for-site.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-for-site.fitItems.1.title",
      text: "services.ai-for-site.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-for-site.fitItems.2.title",
      text: "services.ai-for-site.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-for-site.fitItems.3.title",
      text: "services.ai-for-site.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-for-site.faqItems.0.question",
      answer: "services.ai-for-site.faqItems.0.answer",
    },
    {
      question: "services.ai-for-site.faqItems.1.question",
      answer: "services.ai-for-site.faqItems.1.answer",
    },
    {
      question: "services.ai-for-site.faqItems.2.question",
      answer: "services.ai-for-site.faqItems.2.answer",
    },
    {
      question: "services.ai-for-site.faqItems.3.question",
      answer: "services.ai-for-site.faqItems.3.answer",
    },
    {
      question: "services.ai-for-site.faqItems.4.question",
      answer: "services.ai-for-site.faqItems.4.answer",
    },
  ],
  outcomes: [
    {
      title: "services.ai-for-site.outcomes.0.title",
      value: "services.ai-for-site.outcomes.0.value",
      text: "services.ai-for-site.outcomes.0.text",
      icon: "radar",
    },
    {
      title: "services.ai-for-site.outcomes.1.title",
      value: "services.ai-for-site.outcomes.1.value",
      text: "services.ai-for-site.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-for-site.outcomes.2.title",
      value: "services.ai-for-site.outcomes.2.value",
      text: "services.ai-for-site.outcomes.2.text",
      icon: "fact-check",
    },
  ],
  mechanism: [
    {
      title: "services.ai-for-site.mechanism.0.title",
      text: "services.ai-for-site.mechanism.0.text",
    },
    {
      title: "services.ai-for-site.mechanism.1.title",
      text: "services.ai-for-site.mechanism.1.text",
    },
    {
      title: "services.ai-for-site.mechanism.2.title",
      text: "services.ai-for-site.mechanism.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-for-site.deliverables.0.title",
      text: "services.ai-for-site.deliverables.0.text",
    },
    {
      title: "services.ai-for-site.deliverables.1.title",
      text: "services.ai-for-site.deliverables.1.text",
    },
    {
      title: "services.ai-for-site.deliverables.2.title",
      text: "services.ai-for-site.deliverables.2.text",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-for-site.tradeoffs.0.title",
      text: "services.ai-for-site.tradeoffs.0.text",
    },
    {
      title: "services.ai-for-site.tradeoffs.1.title",
      text: "services.ai-for-site.tradeoffs.1.text",
    },
    {
      title: "services.ai-for-site.tradeoffs.2.title",
      text: "services.ai-for-site.tradeoffs.2.text",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-chatbots" },
    { type: "solution", slug: "content-generation" },
    { type: "case", slug: "aeo-ai-visibility" },
  ],
};
