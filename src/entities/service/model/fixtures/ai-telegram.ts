import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; extra bots, a mini app and payments are one-off add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "bots",
      label: "calculator.fields.ai-telegram.bots",
      min: 1,
      max: 10,
      default: 1,
    },
    {
      kind: "toggle",
      id: "miniApp",
      label: "calculator.fields.ai-telegram.miniApp",
      default: false,
    },
    {
      kind: "toggle",
      id: "payments",
      label: "calculator.fields.ai-telegram.payments",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 300000, weeks: 2 },
    { kind: "perUnit", field: "bots", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perOption", field: "miniApp", rates: { false: 0, true: 150000 } },
    { kind: "perOption", field: "payments", rates: { false: 0, true: 100000 } },
  ],
};

export const aiTelegram: Service = {
  slug: "ai-telegram",
  navTitle: "services.ai-telegram.navTitle",
  title: "services.ai-telegram.title",
  tagline: "services.ai-telegram.tagline",
  description: "services.ai-telegram.description",
  price: { amount: 300000, unit: "project" },
  calculator,
  icon: "auto-awesome",
  group: "ai-integrations",
  features: [
    {
      title: "services.ai-telegram.features.0.title",
      text: "services.ai-telegram.features.0.text",
    },
    {
      title: "services.ai-telegram.features.1.title",
      text: "services.ai-telegram.features.1.text",
    },
    {
      title: "services.ai-telegram.features.2.title",
      text: "services.ai-telegram.features.2.text",
    },
    {
      title: "services.ai-telegram.features.3.title",
      text: "services.ai-telegram.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-telegram.ctaBanner.title",
    text: "services.ai-telegram.ctaBanner.text",
    buttonLabel: "services.ai-telegram.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-telegram.techStack.0.subtitle",
      description: "services.ai-telegram.techStack.0.description",
      technologies: [
        {
          id: "telegram-bot-api",
          name: "Telegram Bot API",
          glossary: "services.ai-telegram.techStack.0.technologies.0.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-telegram.techStack.0.technologies.1.glossary",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary: "services.ai-telegram.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-telegram.techStack.0.technologies.3.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-telegram.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-telegram.processSteps.0.title",
      text: "services.ai-telegram.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-telegram.processSteps.1.title",
      text: "services.ai-telegram.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-telegram.processSteps.2.title",
      text: "services.ai-telegram.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-telegram.processSteps.3.title",
      text: "services.ai-telegram.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-telegram.fitItems.0.title",
      text: "services.ai-telegram.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-telegram.fitItems.1.title",
      text: "services.ai-telegram.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-telegram.fitItems.2.title",
      text: "services.ai-telegram.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-telegram.fitItems.3.title",
      text: "services.ai-telegram.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-telegram.proofItems.0.title",
      text: "services.ai-telegram.proofItems.0.text",
      metricValue: "services.ai-telegram.proofItems.0.metricValue",
      metricLabel: "services.ai-telegram.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-telegram.faqItems.0.question",
      answer: "services.ai-telegram.faqItems.0.answer",
    },
    {
      question: "services.ai-telegram.faqItems.1.question",
      answer: "services.ai-telegram.faqItems.1.answer",
    },
    {
      question: "services.ai-telegram.faqItems.2.question",
      answer: "services.ai-telegram.faqItems.2.answer",
    },
    {
      question: "services.ai-telegram.faqItems.3.question",
      answer: "services.ai-telegram.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-telegram.tradeoffs.0.title",
      text: "services.ai-telegram.tradeoffs.0.text",
    },
    {
      title: "services.ai-telegram.tradeoffs.1.title",
      text: "services.ai-telegram.tradeoffs.1.text",
    },
    {
      title: "services.ai-telegram.tradeoffs.2.title",
      text: "services.ai-telegram.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-telegram.deliverables.0.title",
      text: "services.ai-telegram.deliverables.0.text",
    },
    {
      title: "services.ai-telegram.deliverables.1.title",
      text: "services.ai-telegram.deliverables.1.text",
    },
    {
      title: "services.ai-telegram.deliverables.2.title",
      text: "services.ai-telegram.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-telegram.mechanism.0.title",
      text: "services.ai-telegram.mechanism.0.text",
    },
    {
      title: "services.ai-telegram.mechanism.1.title",
      text: "services.ai-telegram.mechanism.1.text",
    },
    {
      title: "services.ai-telegram.mechanism.2.title",
      text: "services.ai-telegram.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-telegram.outcomes.0.title",
      value: "services.ai-telegram.outcomes.0.value",
      text: "services.ai-telegram.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.ai-telegram.outcomes.1.title",
      value: "services.ai-telegram.outcomes.1.value",
      text: "services.ai-telegram.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-telegram.outcomes.2.title",
      value: "services.ai-telegram.outcomes.2.value",
      text: "services.ai-telegram.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-chatbots" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
