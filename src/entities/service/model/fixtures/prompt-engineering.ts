import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; each use
 * case adds prompt work, the prompt count scales the library, and evaluation
 * plus team training are one-off add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "useCases",
      label: "calculator.fields.prompt-engineering.useCases",
      min: 1,
      max: 8,
      default: 3,
    },
    {
      kind: "stepper",
      id: "prompts",
      label: "calculator.fields.prompt-engineering.prompts",
      min: 5,
      max: 100,
      default: 20,
    },
    {
      kind: "toggle",
      id: "eval",
      label: "calculator.fields.prompt-engineering.eval",
      default: false,
    },
    {
      kind: "toggle",
      id: "training",
      label: "calculator.fields.prompt-engineering.training",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 250000, weeks: 2 },
    { kind: "perUnit", field: "useCases", rate: 40000, weeksPerUnit: 0.4 },
    { kind: "perUnit", field: "prompts", rate: 2000, weeksPerUnit: 0.02 },
    { kind: "perOption", field: "eval", rates: { false: 0, true: 80000 } },
    { kind: "perOption", field: "training", rates: { false: 0, true: 60000 } },
  ],
};

export const promptEngineering: Service = {
  slug: "prompt-engineering",
  navTitle: "services.prompt-engineering.navTitle",
  title: "services.prompt-engineering.title",
  tagline: "services.prompt-engineering.tagline",
  description: "services.prompt-engineering.description",
  price: { amount: 250000, unit: "project" },
  calculator,
  icon: "auto-awesome",
  group: "content",
  features: [
    {
      title: "services.prompt-engineering.features.0.title",
      text: "services.prompt-engineering.features.0.text",
    },
    {
      title: "services.prompt-engineering.features.1.title",
      text: "services.prompt-engineering.features.1.text",
    },
    {
      title: "services.prompt-engineering.features.2.title",
      text: "services.prompt-engineering.features.2.text",
    },
    {
      title: "services.prompt-engineering.features.3.title",
      text: "services.prompt-engineering.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.prompt-engineering.ctaBanner.title",
    text: "services.prompt-engineering.ctaBanner.text",
    buttonLabel: "services.prompt-engineering.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.prompt-engineering.techStack.0.subtitle",
      description: "services.prompt-engineering.techStack.0.description",
      technologies: [
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary: "services.prompt-engineering.techStack.0.technologies.0.glossary",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary: "services.prompt-engineering.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.prompt-engineering.techStack.0.technologies.2.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.prompt-engineering.processSteps.0.title",
      text: "services.prompt-engineering.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.prompt-engineering.processSteps.1.title",
      text: "services.prompt-engineering.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.prompt-engineering.processSteps.2.title",
      text: "services.prompt-engineering.processSteps.2.text",
      processType: "testing",
    },
    {
      title: "services.prompt-engineering.processSteps.3.title",
      text: "services.prompt-engineering.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.prompt-engineering.fitItems.0.title",
      text: "services.prompt-engineering.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.prompt-engineering.fitItems.1.title",
      text: "services.prompt-engineering.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.prompt-engineering.fitItems.2.title",
      text: "services.prompt-engineering.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.prompt-engineering.fitItems.3.title",
      text: "services.prompt-engineering.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.prompt-engineering.faqItems.0.question",
      answer: "services.prompt-engineering.faqItems.0.answer",
    },
    {
      question: "services.prompt-engineering.faqItems.1.question",
      answer: "services.prompt-engineering.faqItems.1.answer",
    },
    {
      question: "services.prompt-engineering.faqItems.2.question",
      answer: "services.prompt-engineering.faqItems.2.answer",
    },
    {
      question: "services.prompt-engineering.faqItems.3.question",
      answer: "services.prompt-engineering.faqItems.3.answer",
    },
    {
      question: "services.prompt-engineering.faqItems.4.question",
      answer: "services.prompt-engineering.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.prompt-engineering.tradeoffs.0.title",
      text: "services.prompt-engineering.tradeoffs.0.text",
    },
    {
      title: "services.prompt-engineering.tradeoffs.1.title",
      text: "services.prompt-engineering.tradeoffs.1.text",
    },
    {
      title: "services.prompt-engineering.tradeoffs.2.title",
      text: "services.prompt-engineering.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.prompt-engineering.deliverables.0.title",
      text: "services.prompt-engineering.deliverables.0.text",
    },
    {
      title: "services.prompt-engineering.deliverables.1.title",
      text: "services.prompt-engineering.deliverables.1.text",
    },
    {
      title: "services.prompt-engineering.deliverables.2.title",
      text: "services.prompt-engineering.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.prompt-engineering.mechanism.0.title",
      text: "services.prompt-engineering.mechanism.0.text",
    },
    {
      title: "services.prompt-engineering.mechanism.1.title",
      text: "services.prompt-engineering.mechanism.1.text",
    },
    {
      title: "services.prompt-engineering.mechanism.2.title",
      text: "services.prompt-engineering.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.prompt-engineering.precedents.0.title",
      text: "services.prompt-engineering.precedents.0.text",
      metricValue: "services.prompt-engineering.precedents.0.metricValue",
      metricLabel: "services.prompt-engineering.precedents.0.metricLabel",
    },
    {
      title: "services.prompt-engineering.precedents.1.title",
      text: "services.prompt-engineering.precedents.1.text",
      metricValue: "services.prompt-engineering.precedents.1.metricValue",
      metricLabel: "services.prompt-engineering.precedents.1.metricLabel",
    },
    {
      title: "services.prompt-engineering.precedents.2.title",
      text: "services.prompt-engineering.precedents.2.text",
      metricValue: "services.prompt-engineering.precedents.2.metricValue",
      metricLabel: "services.prompt-engineering.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-agents" },
    { type: "service", slug: "llm-evaluation" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
