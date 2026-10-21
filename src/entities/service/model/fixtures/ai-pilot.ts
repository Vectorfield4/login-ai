import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor. The first
 * scenario arrives inside the base eight weeks; extra scenarios add time, each
 * integration adds half a week, and the data toggle adds a one-off preparation
 * block. The timeline choice scales the calendar between six and ten weeks.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "scenarios",
      label: "calculator.fields.ai-pilot.scenarios",
      min: 0,
      max: 4,
      default: 0,
    },
    {
      kind: "toggle",
      id: "data",
      label: "calculator.fields.ai-pilot.data",
      default: false,
    },
    {
      kind: "stepper",
      id: "integrations",
      label: "calculator.fields.ai-pilot.integrations",
      min: 0,
      max: 6,
      default: 0,
    },
    {
      kind: "segmented",
      id: "timeline",
      label: "calculator.fields.ai-pilot.timeline",
      options: [
        { value: "6", label: "calculator.options.weeks6" },
        { value: "8", label: "calculator.options.weeks8" },
        { value: "10", label: "calculator.options.weeks10" },
      ],
      default: "8",
      showOnResults: true,
    },
  ],
  terms: [
    { kind: "setup", amount: 700000, weeks: 6 },
    { kind: "perUnit", field: "scenarios", rate: 150000, weeksPerUnit: 2 },
    { kind: "perOption", field: "data", rates: { false: 0, true: 120000 } },
    { kind: "perUnit", field: "integrations", rate: 80000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "timeline", factors: { "6": 0.75, "8": 1, "10": 1.25 } },
  ],
};

export const aiPilot: Service = {
  slug: "ai-pilot",
  navTitle: "services.ai-pilot.navTitle",
  title: "services.ai-pilot.title",
  tagline: "services.ai-pilot.tagline",
  description: "services.ai-pilot.description",
  price: { amount: 700000, unit: "project" },
  calculator,
  icon: "rocket-launch",
  group: "strategy",
  features: [
    {
      title: "services.ai-pilot.features.0.title",
      text: "services.ai-pilot.features.0.text",
    },
    {
      title: "services.ai-pilot.features.1.title",
      text: "services.ai-pilot.features.1.text",
    },
    {
      title: "services.ai-pilot.features.2.title",
      text: "services.ai-pilot.features.2.text",
    },
    {
      title: "services.ai-pilot.features.3.title",
      text: "services.ai-pilot.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-pilot.ctaBanner.title",
    text: "services.ai-pilot.ctaBanner.text",
    buttonLabel: "services.ai-pilot.ctaBanner.buttonLabel",
  },
  processSteps: [
    {
      title: "services.ai-pilot.processSteps.0.title",
      text: "services.ai-pilot.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-pilot.processSteps.1.title",
      text: "services.ai-pilot.processSteps.1.text",
      processType: "analysis",
    },
    {
      title: "services.ai-pilot.processSteps.2.title",
      text: "services.ai-pilot.processSteps.2.text",
      processType: "system-design",
    },
    {
      title: "services.ai-pilot.processSteps.3.title",
      text: "services.ai-pilot.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-pilot.fitItems.0.title",
      text: "services.ai-pilot.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-pilot.fitItems.1.title",
      text: "services.ai-pilot.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-pilot.fitItems.2.title",
      text: "services.ai-pilot.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-pilot.fitItems.3.title",
      text: "services.ai-pilot.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-pilot.faqItems.0.question",
      answer: "services.ai-pilot.faqItems.0.answer",
    },
    {
      question: "services.ai-pilot.faqItems.1.question",
      answer: "services.ai-pilot.faqItems.1.answer",
    },
    {
      question: "services.ai-pilot.faqItems.2.question",
      answer: "services.ai-pilot.faqItems.2.answer",
    },
    {
      question: "services.ai-pilot.faqItems.3.question",
      answer: "services.ai-pilot.faqItems.3.answer",
    },
    {
      question: "services.ai-pilot.faqItems.4.question",
      answer: "services.ai-pilot.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-pilot.tradeoffs.0.title",
      text: "services.ai-pilot.tradeoffs.0.text",
    },
    {
      title: "services.ai-pilot.tradeoffs.1.title",
      text: "services.ai-pilot.tradeoffs.1.text",
    },
    {
      title: "services.ai-pilot.tradeoffs.2.title",
      text: "services.ai-pilot.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-pilot.deliverables.0.title",
      text: "services.ai-pilot.deliverables.0.text",
    },
    {
      title: "services.ai-pilot.deliverables.1.title",
      text: "services.ai-pilot.deliverables.1.text",
    },
    {
      title: "services.ai-pilot.deliverables.2.title",
      text: "services.ai-pilot.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-pilot.mechanism.0.title",
      text: "services.ai-pilot.mechanism.0.text",
    },
    {
      title: "services.ai-pilot.mechanism.1.title",
      text: "services.ai-pilot.mechanism.1.text",
    },
    {
      title: "services.ai-pilot.mechanism.2.title",
      text: "services.ai-pilot.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-pilot.outcomes.0.title",
      value: "services.ai-pilot.outcomes.0.value",
      text: "services.ai-pilot.outcomes.0.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-pilot.outcomes.1.title",
      value: "services.ai-pilot.outcomes.1.value",
      text: "services.ai-pilot.outcomes.1.text",
      icon: "insights",
    },
    {
      title: "services.ai-pilot.outcomes.2.title",
      value: "services.ai-pilot.outcomes.2.value",
      text: "services.ai-pilot.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-consulting" },
    { type: "service", slug: "ai-readiness-audit" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
