import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while channels, tickets and integrations add build time and QA is an add-on.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "channels",
      label: "calculator.fields.ai-support-automation.channels",
      min: 1,
      max: 6,
      default: 2,
    },
    {
      kind: "stepper",
      id: "tickets",
      label: "calculator.fields.ai-support-automation.tickets",
      min: 100,
      max: 100000,
      default: 5000,
    },
    {
      kind: "stepper",
      id: "integrations",
      label: "calculator.fields.ai-support-automation.integrations",
      min: 0,
      max: 6,
      default: 2,
    },
    {
      kind: "toggle",
      id: "qa",
      label: "calculator.fields.ai-support-automation.qa",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 800000, weeks: 3 },
    { kind: "perUnit", field: "channels", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "tickets", rate: 20, weeksPerUnit: 0.0001 },
    { kind: "perUnit", field: "integrations", rate: 50000, weeksPerUnit: 0.5 },
    { kind: "perOption", field: "qa", rates: { false: 0, true: 150000 } },
  ],
};

export const aiSupportAutomation: Service = {
  slug: "ai-support-automation",
  navTitle: "services.ai-support-automation.navTitle",
  title: "services.ai-support-automation.title",
  tagline: "services.ai-support-automation.tagline",
  description: "services.ai-support-automation.description",
  price: { amount: 800000, unit: "project" },
  calculator,
  icon: "support-agent",
  group: "conversational",
  features: [
    {
      title: "services.ai-support-automation.features.0.title",
      text: "services.ai-support-automation.features.0.text",
    },
    {
      title: "services.ai-support-automation.features.1.title",
      text: "services.ai-support-automation.features.1.text",
    },
    {
      title: "services.ai-support-automation.features.2.title",
      text: "services.ai-support-automation.features.2.text",
    },
    {
      title: "services.ai-support-automation.features.3.title",
      text: "services.ai-support-automation.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-support-automation.ctaBanner.title",
    text: "services.ai-support-automation.ctaBanner.text",
    buttonLabel: "services.ai-support-automation.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-support-automation.techStack.0.subtitle",
      description: "services.ai-support-automation.techStack.0.description",
      technologies: [
        {
          id: "bitrix24",
          name: "Битрикс24",
          glossary: "services.ai-support-automation.techStack.0.technologies.0.glossary",
        },
        {
          id: "telegram-bot-api",
          name: "Telegram Bot API",
          glossary: "services.ai-support-automation.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-support-automation.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-support-automation.techStack.0.technologies.3.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-support-automation.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-support-automation.processSteps.0.title",
      text: "services.ai-support-automation.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-support-automation.processSteps.1.title",
      text: "services.ai-support-automation.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-support-automation.processSteps.2.title",
      text: "services.ai-support-automation.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-support-automation.processSteps.3.title",
      text: "services.ai-support-automation.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-support-automation.fitItems.0.title",
      text: "services.ai-support-automation.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-support-automation.fitItems.1.title",
      text: "services.ai-support-automation.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-support-automation.fitItems.2.title",
      text: "services.ai-support-automation.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-support-automation.fitItems.3.title",
      text: "services.ai-support-automation.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-support-automation.proofItems.0.title",
      text: "services.ai-support-automation.proofItems.0.text",
      metricValue: "services.ai-support-automation.proofItems.0.metricValue",
      metricLabel: "services.ai-support-automation.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-support-automation.faqItems.0.question",
      answer: "services.ai-support-automation.faqItems.0.answer",
    },
    {
      question: "services.ai-support-automation.faqItems.1.question",
      answer: "services.ai-support-automation.faqItems.1.answer",
    },
    {
      question: "services.ai-support-automation.faqItems.2.question",
      answer: "services.ai-support-automation.faqItems.2.answer",
    },
    {
      question: "services.ai-support-automation.faqItems.3.question",
      answer: "services.ai-support-automation.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-support-automation.tradeoffs.0.title",
      text: "services.ai-support-automation.tradeoffs.0.text",
    },
    {
      title: "services.ai-support-automation.tradeoffs.1.title",
      text: "services.ai-support-automation.tradeoffs.1.text",
    },
    {
      title: "services.ai-support-automation.tradeoffs.2.title",
      text: "services.ai-support-automation.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-support-automation.deliverables.0.title",
      text: "services.ai-support-automation.deliverables.0.text",
    },
    {
      title: "services.ai-support-automation.deliverables.1.title",
      text: "services.ai-support-automation.deliverables.1.text",
    },
    {
      title: "services.ai-support-automation.deliverables.2.title",
      text: "services.ai-support-automation.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-support-automation.mechanism.0.title",
      text: "services.ai-support-automation.mechanism.0.text",
    },
    {
      title: "services.ai-support-automation.mechanism.1.title",
      text: "services.ai-support-automation.mechanism.1.text",
    },
    {
      title: "services.ai-support-automation.mechanism.2.title",
      text: "services.ai-support-automation.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-support-automation.outcomes.0.title",
      value: "services.ai-support-automation.outcomes.0.value",
      text: "services.ai-support-automation.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.ai-support-automation.outcomes.1.title",
      value: "services.ai-support-automation.outcomes.1.value",
      text: "services.ai-support-automation.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-support-automation.outcomes.2.title",
      value: "services.ai-support-automation.outcomes.2.value",
      text: "services.ai-support-automation.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-chatbots" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
