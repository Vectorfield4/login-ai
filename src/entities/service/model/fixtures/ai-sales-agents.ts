import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while leads, channels and scenarios add build and test time.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "leads",
      label: "calculator.fields.ai-sales-agents.leads",
      min: 100,
      max: 10000,
      default: 1000,
    },
    {
      kind: "stepper",
      id: "channels",
      label: "calculator.fields.ai-sales-agents.channels",
      min: 1,
      max: 5,
      default: 2,
    },
    {
      kind: "stepper",
      id: "scenarios",
      label: "calculator.fields.ai-sales-agents.scenarios",
      min: 1,
      max: 20,
      default: 3,
    },
  ],
  terms: [
    { kind: "setup", amount: 900000, weeks: 4 },
    { kind: "perUnit", field: "leads", rate: 50, weeksPerUnit: 0.0001 },
    { kind: "perUnit", field: "channels", rate: 75000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "scenarios", rate: 50000, weeksPerUnit: 0.25 },
  ],
};

export const aiSalesAgents: Service = {
  slug: "ai-sales-agents",
  navTitle: "services.ai-sales-agents.navTitle",
  title: "services.ai-sales-agents.title",
  tagline: "services.ai-sales-agents.tagline",
  description: "services.ai-sales-agents.description",
  price: { amount: 900000, unit: "project" },
  calculator,
  icon: "insights",
  group: "agentic",
  features: [
    {
      title: "services.ai-sales-agents.features.0.title",
      text: "services.ai-sales-agents.features.0.text",
    },
    {
      title: "services.ai-sales-agents.features.1.title",
      text: "services.ai-sales-agents.features.1.text",
    },
    {
      title: "services.ai-sales-agents.features.2.title",
      text: "services.ai-sales-agents.features.2.text",
    },
    {
      title: "services.ai-sales-agents.features.3.title",
      text: "services.ai-sales-agents.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-sales-agents.ctaBanner.title",
    text: "services.ai-sales-agents.ctaBanner.text",
    buttonLabel: "services.ai-sales-agents.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-sales-agents.techStack.0.subtitle",
      description: "services.ai-sales-agents.techStack.0.description",
      technologies: [
        {
          id: "amocrm",
          name: "amoCRM",
          glossary: "services.ai-sales-agents.techStack.0.technologies.0.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-sales-agents.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-sales-agents.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-sales-agents.techStack.0.technologies.3.glossary",
        },
        {
          id: "python",
          name: "Python",
          glossary: "services.ai-sales-agents.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-sales-agents.processSteps.0.title",
      text: "services.ai-sales-agents.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-sales-agents.processSteps.1.title",
      text: "services.ai-sales-agents.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-sales-agents.processSteps.2.title",
      text: "services.ai-sales-agents.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-sales-agents.processSteps.3.title",
      text: "services.ai-sales-agents.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-sales-agents.fitItems.0.title",
      text: "services.ai-sales-agents.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-sales-agents.fitItems.1.title",
      text: "services.ai-sales-agents.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-sales-agents.fitItems.2.title",
      text: "services.ai-sales-agents.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-sales-agents.fitItems.3.title",
      text: "services.ai-sales-agents.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-sales-agents.faqItems.0.question",
      answer: "services.ai-sales-agents.faqItems.0.answer",
    },
    {
      question: "services.ai-sales-agents.faqItems.1.question",
      answer: "services.ai-sales-agents.faqItems.1.answer",
    },
    {
      question: "services.ai-sales-agents.faqItems.2.question",
      answer: "services.ai-sales-agents.faqItems.2.answer",
    },
    {
      question: "services.ai-sales-agents.faqItems.3.question",
      answer: "services.ai-sales-agents.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-sales-agents.tradeoffs.0.title",
      text: "services.ai-sales-agents.tradeoffs.0.text",
    },
    {
      title: "services.ai-sales-agents.tradeoffs.1.title",
      text: "services.ai-sales-agents.tradeoffs.1.text",
    },
    {
      title: "services.ai-sales-agents.tradeoffs.2.title",
      text: "services.ai-sales-agents.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-sales-agents.deliverables.0.title",
      text: "services.ai-sales-agents.deliverables.0.text",
    },
    {
      title: "services.ai-sales-agents.deliverables.1.title",
      text: "services.ai-sales-agents.deliverables.1.text",
    },
    {
      title: "services.ai-sales-agents.deliverables.2.title",
      text: "services.ai-sales-agents.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-sales-agents.mechanism.0.title",
      text: "services.ai-sales-agents.mechanism.0.text",
    },
    {
      title: "services.ai-sales-agents.mechanism.1.title",
      text: "services.ai-sales-agents.mechanism.1.text",
    },
    {
      title: "services.ai-sales-agents.mechanism.2.title",
      text: "services.ai-sales-agents.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.ai-sales-agents.precedents.0.title",
      text: "services.ai-sales-agents.precedents.0.text",
      metricValue: "services.ai-sales-agents.precedents.0.metricValue",
      metricLabel: "services.ai-sales-agents.precedents.0.metricLabel",
    },
    {
      title: "services.ai-sales-agents.precedents.1.title",
      text: "services.ai-sales-agents.precedents.1.text",
      metricValue: "services.ai-sales-agents.precedents.1.metricValue",
      metricLabel: "services.ai-sales-agents.precedents.1.metricLabel",
    },
    {
      title: "services.ai-sales-agents.precedents.2.title",
      text: "services.ai-sales-agents.precedents.2.text",
      metricValue: "services.ai-sales-agents.precedents.2.metricValue",
      metricLabel: "services.ai-sales-agents.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-crm-integration" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
