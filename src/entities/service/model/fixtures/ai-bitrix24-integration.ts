import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while portals, users and scenarios add build and test time.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "portals",
      label: "calculator.fields.ai-bitrix24-integration.portals",
      min: 1,
      max: 20,
      default: 1,
    },
    {
      kind: "stepper",
      id: "users",
      label: "calculator.fields.ai-bitrix24-integration.users",
      min: 10,
      max: 1000,
      default: 50,
    },
    {
      kind: "stepper",
      id: "scenarios",
      label: "calculator.fields.ai-bitrix24-integration.scenarios",
      min: 1,
      max: 20,
      default: 3,
    },
  ],
  terms: [
    { kind: "setup", amount: 700000, weeks: 3 },
    { kind: "perUnit", field: "portals", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "users", rate: 1000, weeksPerUnit: 0.002 },
    { kind: "perUnit", field: "scenarios", rate: 50000, weeksPerUnit: 0.25 },
  ],
};

export const aiBitrix24Integration: Service = {
  slug: "ai-bitrix24-integration",
  navTitle: "services.ai-bitrix24-integration.navTitle",
  title: "services.ai-bitrix24-integration.title",
  tagline: "services.ai-bitrix24-integration.tagline",
  description: "services.ai-bitrix24-integration.description",
  price: { amount: 700000, unit: "project" },
  calculator,
  icon: "domain",
  group: "ai-integrations",
  features: [
    {
      title: "services.ai-bitrix24-integration.features.0.title",
      text: "services.ai-bitrix24-integration.features.0.text",
    },
    {
      title: "services.ai-bitrix24-integration.features.1.title",
      text: "services.ai-bitrix24-integration.features.1.text",
    },
    {
      title: "services.ai-bitrix24-integration.features.2.title",
      text: "services.ai-bitrix24-integration.features.2.text",
    },
    {
      title: "services.ai-bitrix24-integration.features.3.title",
      text: "services.ai-bitrix24-integration.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-bitrix24-integration.ctaBanner.title",
    text: "services.ai-bitrix24-integration.ctaBanner.text",
    buttonLabel: "services.ai-bitrix24-integration.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-bitrix24-integration.techStack.0.subtitle",
      description: "services.ai-bitrix24-integration.techStack.0.description",
      technologies: [
        {
          id: "bitrix24",
          name: "Битрикс24",
          glossary: "services.ai-bitrix24-integration.techStack.0.technologies.0.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-bitrix24-integration.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-bitrix24-integration.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-bitrix24-integration.techStack.0.technologies.3.glossary",
        },
        {
          id: "python",
          name: "Python",
          glossary: "services.ai-bitrix24-integration.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-bitrix24-integration.processSteps.0.title",
      text: "services.ai-bitrix24-integration.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-bitrix24-integration.processSteps.1.title",
      text: "services.ai-bitrix24-integration.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-bitrix24-integration.processSteps.2.title",
      text: "services.ai-bitrix24-integration.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-bitrix24-integration.processSteps.3.title",
      text: "services.ai-bitrix24-integration.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-bitrix24-integration.fitItems.0.title",
      text: "services.ai-bitrix24-integration.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-bitrix24-integration.fitItems.1.title",
      text: "services.ai-bitrix24-integration.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-bitrix24-integration.fitItems.2.title",
      text: "services.ai-bitrix24-integration.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-bitrix24-integration.fitItems.3.title",
      text: "services.ai-bitrix24-integration.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-bitrix24-integration.proofItems.0.title",
      text: "services.ai-bitrix24-integration.proofItems.0.text",
      metricValue: "services.ai-bitrix24-integration.proofItems.0.metricValue",
      metricLabel: "services.ai-bitrix24-integration.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-bitrix24-integration.faqItems.0.question",
      answer: "services.ai-bitrix24-integration.faqItems.0.answer",
    },
    {
      question: "services.ai-bitrix24-integration.faqItems.1.question",
      answer: "services.ai-bitrix24-integration.faqItems.1.answer",
    },
    {
      question: "services.ai-bitrix24-integration.faqItems.2.question",
      answer: "services.ai-bitrix24-integration.faqItems.2.answer",
    },
    {
      question: "services.ai-bitrix24-integration.faqItems.3.question",
      answer: "services.ai-bitrix24-integration.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-bitrix24-integration.tradeoffs.0.title",
      text: "services.ai-bitrix24-integration.tradeoffs.0.text",
    },
    {
      title: "services.ai-bitrix24-integration.tradeoffs.1.title",
      text: "services.ai-bitrix24-integration.tradeoffs.1.text",
    },
    {
      title: "services.ai-bitrix24-integration.tradeoffs.2.title",
      text: "services.ai-bitrix24-integration.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-bitrix24-integration.deliverables.0.title",
      text: "services.ai-bitrix24-integration.deliverables.0.text",
    },
    {
      title: "services.ai-bitrix24-integration.deliverables.1.title",
      text: "services.ai-bitrix24-integration.deliverables.1.text",
    },
    {
      title: "services.ai-bitrix24-integration.deliverables.2.title",
      text: "services.ai-bitrix24-integration.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-bitrix24-integration.mechanism.0.title",
      text: "services.ai-bitrix24-integration.mechanism.0.text",
    },
    {
      title: "services.ai-bitrix24-integration.mechanism.1.title",
      text: "services.ai-bitrix24-integration.mechanism.1.text",
    },
    {
      title: "services.ai-bitrix24-integration.mechanism.2.title",
      text: "services.ai-bitrix24-integration.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-bitrix24-integration.outcomes.0.title",
      value: "services.ai-bitrix24-integration.outcomes.0.value",
      text: "services.ai-bitrix24-integration.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.ai-bitrix24-integration.outcomes.1.title",
      value: "services.ai-bitrix24-integration.outcomes.1.value",
      text: "services.ai-bitrix24-integration.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-bitrix24-integration.outcomes.2.title",
      value: "services.ai-bitrix24-integration.outcomes.2.value",
      text: "services.ai-bitrix24-integration.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-crm-integration" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
