import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; models and test sets add run time, while red teaming and observability are add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "models",
      label: "calculator.fields.llm-evaluation.models",
      min: 1,
      max: 10,
      default: 2,
    },
    {
      kind: "stepper",
      id: "testSets",
      label: "calculator.fields.llm-evaluation.testSets",
      min: 1,
      max: 20,
      default: 3,
    },
    {
      kind: "toggle",
      id: "redTeaming",
      label: "calculator.fields.llm-evaluation.redTeaming",
      default: false,
    },
    {
      kind: "toggle",
      id: "observability",
      label: "calculator.fields.llm-evaluation.observability",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 400000, weeks: 3 },
    { kind: "perUnit", field: "models", rate: 50000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "testSets", rate: 50000, weeksPerUnit: 0.5 },
    { kind: "perOption", field: "redTeaming", rates: { false: 0, true: 100000 } },
    { kind: "perOption", field: "observability", rates: { false: 0, true: 100000 } },
  ],
};

export const llmEvaluation: Service = {
  slug: "llm-evaluation",
  navTitle: "services.llm-evaluation.navTitle",
  title: "services.llm-evaluation.title",
  tagline: "services.llm-evaluation.tagline",
  description: "services.llm-evaluation.description",
  price: { amount: 400000, unit: "project" },
  calculator,
  icon: "fact-check",
  group: "models",
  features: [
    {
      title: "services.llm-evaluation.features.0.title",
      text: "services.llm-evaluation.features.0.text",
    },
    {
      title: "services.llm-evaluation.features.1.title",
      text: "services.llm-evaluation.features.1.text",
    },
    {
      title: "services.llm-evaluation.features.2.title",
      text: "services.llm-evaluation.features.2.text",
    },
    {
      title: "services.llm-evaluation.features.3.title",
      text: "services.llm-evaluation.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.llm-evaluation.ctaBanner.title",
    text: "services.llm-evaluation.ctaBanner.text",
    buttonLabel: "services.llm-evaluation.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.llm-evaluation.techStack.0.subtitle",
      description: "services.llm-evaluation.techStack.0.description",
      technologies: [
        {
          id: "langfuse",
          name: "Langfuse",
          glossary: "services.llm-evaluation.techStack.0.technologies.0.glossary",
        },
        {
          id: "python",
          name: "Python",
          glossary: "services.llm-evaluation.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.llm-evaluation.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.llm-evaluation.techStack.0.technologies.3.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.llm-evaluation.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.llm-evaluation.processSteps.0.title",
      text: "services.llm-evaluation.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.llm-evaluation.processSteps.1.title",
      text: "services.llm-evaluation.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.llm-evaluation.processSteps.2.title",
      text: "services.llm-evaluation.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.llm-evaluation.processSteps.3.title",
      text: "services.llm-evaluation.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.llm-evaluation.fitItems.0.title",
      text: "services.llm-evaluation.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.llm-evaluation.fitItems.1.title",
      text: "services.llm-evaluation.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.llm-evaluation.fitItems.2.title",
      text: "services.llm-evaluation.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.llm-evaluation.fitItems.3.title",
      text: "services.llm-evaluation.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.llm-evaluation.faqItems.0.question",
      answer: "services.llm-evaluation.faqItems.0.answer",
    },
    {
      question: "services.llm-evaluation.faqItems.1.question",
      answer: "services.llm-evaluation.faqItems.1.answer",
    },
    {
      question: "services.llm-evaluation.faqItems.2.question",
      answer: "services.llm-evaluation.faqItems.2.answer",
    },
    {
      question: "services.llm-evaluation.faqItems.3.question",
      answer: "services.llm-evaluation.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.llm-evaluation.tradeoffs.0.title",
      text: "services.llm-evaluation.tradeoffs.0.text",
    },
    {
      title: "services.llm-evaluation.tradeoffs.1.title",
      text: "services.llm-evaluation.tradeoffs.1.text",
    },
    {
      title: "services.llm-evaluation.tradeoffs.2.title",
      text: "services.llm-evaluation.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.llm-evaluation.deliverables.0.title",
      text: "services.llm-evaluation.deliverables.0.text",
    },
    {
      title: "services.llm-evaluation.deliverables.1.title",
      text: "services.llm-evaluation.deliverables.1.text",
    },
    {
      title: "services.llm-evaluation.deliverables.2.title",
      text: "services.llm-evaluation.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.llm-evaluation.mechanism.0.title",
      text: "services.llm-evaluation.mechanism.0.text",
    },
    {
      title: "services.llm-evaluation.mechanism.1.title",
      text: "services.llm-evaluation.mechanism.1.text",
    },
    {
      title: "services.llm-evaluation.mechanism.2.title",
      text: "services.llm-evaluation.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.llm-evaluation.precedents.0.title",
      text: "services.llm-evaluation.precedents.0.text",
      metricValue: "services.llm-evaluation.precedents.0.metricValue",
      metricLabel: "services.llm-evaluation.precedents.0.metricLabel",
    },
    {
      title: "services.llm-evaluation.precedents.1.title",
      text: "services.llm-evaluation.precedents.1.text",
      metricValue: "services.llm-evaluation.precedents.1.metricValue",
      metricLabel: "services.llm-evaluation.precedents.1.metricLabel",
    },
    {
      title: "services.llm-evaluation.precedents.2.title",
      text: "services.llm-evaluation.precedents.2.text",
      metricValue: "services.llm-evaluation.precedents.2.metricValue",
      metricLabel: "services.llm-evaluation.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "deterministic-rag-systems" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
