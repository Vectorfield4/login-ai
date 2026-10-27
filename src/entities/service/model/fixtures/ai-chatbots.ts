import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while each
 * channel and scenario adds build and test time and multilingual support is a
 * one-off add-on.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "channels",
      label: "calculator.fields.ai-chatbots.channels",
      min: 1,
      max: 6,
      default: 1,
    },
    {
      kind: "stepper",
      id: "scenarios",
      label: "calculator.fields.ai-chatbots.scenarios",
      min: 1,
      max: 20,
      default: 2,
    },
    {
      kind: "toggle",
      id: "multilingual",
      label: "calculator.fields.ai-chatbots.multilingual",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 600000, weeks: 4 },
    { kind: "perUnit", field: "channels", rate: 100000, weeksPerUnit: 1 },
    { kind: "perUnit", field: "scenarios", rate: 50000, weeksPerUnit: 0.5 },
    { kind: "perOption", field: "multilingual", rates: { false: 0, true: 100000 } },
  ],
};

export const aiChatbots: Service = {
  slug: "ai-chatbots",
  navTitle: "services.ai-chatbots.navTitle",
  title: "services.ai-chatbots.title",
  tagline: "services.ai-chatbots.tagline",
  description: "services.ai-chatbots.description",
  price: { amount: 600000, unit: "project" },
  calculator,
  icon: "support-agent",
  group: "conversational",
  features: [
    {
      title: "services.ai-chatbots.features.0.title",
      text: "services.ai-chatbots.features.0.text",
    },
    {
      title: "services.ai-chatbots.features.1.title",
      text: "services.ai-chatbots.features.1.text",
    },
    {
      title: "services.ai-chatbots.features.2.title",
      text: "services.ai-chatbots.features.2.text",
    },
    {
      title: "services.ai-chatbots.features.3.title",
      text: "services.ai-chatbots.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-chatbots.ctaBanner.title",
    text: "services.ai-chatbots.ctaBanner.text",
    buttonLabel: "services.ai-chatbots.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-chatbots.techStack.0.subtitle",
      description: "services.ai-chatbots.techStack.0.description",
      technologies: [
        {
          id: "telegram-bot-api",
          name: "Telegram Bot API",
          glossary: "services.ai-chatbots.techStack.0.technologies.0.glossary",
        },
        {
          id: "whatsapp-cloud-api",
          name: "WhatsApp Cloud API",
          glossary: "services.ai-chatbots.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-chatbots.techStack.0.technologies.2.glossary",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary: "services.ai-chatbots.techStack.0.technologies.3.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-chatbots.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-chatbots.processSteps.0.title",
      text: "services.ai-chatbots.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-chatbots.processSteps.1.title",
      text: "services.ai-chatbots.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-chatbots.processSteps.2.title",
      text: "services.ai-chatbots.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-chatbots.processSteps.3.title",
      text: "services.ai-chatbots.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-chatbots.fitItems.0.title",
      text: "services.ai-chatbots.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-chatbots.fitItems.1.title",
      text: "services.ai-chatbots.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-chatbots.fitItems.2.title",
      text: "services.ai-chatbots.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-chatbots.fitItems.3.title",
      text: "services.ai-chatbots.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.ai-chatbots.precedents.0.title",
      text: "services.ai-chatbots.precedents.0.text",
      metricValue: "services.ai-chatbots.precedents.0.metricValue",
      metricLabel: "services.ai-chatbots.precedents.0.metricLabel",
    },
    {
      title: "services.ai-chatbots.precedents.1.title",
      text: "services.ai-chatbots.precedents.1.text",
      metricValue: "services.ai-chatbots.precedents.1.metricValue",
      metricLabel: "services.ai-chatbots.precedents.1.metricLabel",
    },
    {
      title: "services.ai-chatbots.precedents.2.title",
      text: "services.ai-chatbots.precedents.2.text",
      metricValue: "services.ai-chatbots.precedents.2.metricValue",
      metricLabel: "services.ai-chatbots.precedents.2.metricLabel",
    },
    {
      title: "services.ai-chatbots.precedents.3.title",
      text: "services.ai-chatbots.precedents.3.text",
      metricValue: "services.ai-chatbots.precedents.3.metricValue",
      metricLabel: "services.ai-chatbots.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-chatbots.faqItems.0.question",
      answer: "services.ai-chatbots.faqItems.0.answer",
    },
    {
      question: "services.ai-chatbots.faqItems.1.question",
      answer: "services.ai-chatbots.faqItems.1.answer",
    },
    {
      question: "services.ai-chatbots.faqItems.2.question",
      answer: "services.ai-chatbots.faqItems.2.answer",
    },
    {
      question: "services.ai-chatbots.faqItems.3.question",
      answer: "services.ai-chatbots.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-chatbots.tradeoffs.0.title",
      text: "services.ai-chatbots.tradeoffs.0.text",
    },
    {
      title: "services.ai-chatbots.tradeoffs.1.title",
      text: "services.ai-chatbots.tradeoffs.1.text",
    },
    {
      title: "services.ai-chatbots.tradeoffs.2.title",
      text: "services.ai-chatbots.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-chatbots.deliverables.0.title",
      text: "services.ai-chatbots.deliverables.0.text",
    },
    {
      title: "services.ai-chatbots.deliverables.1.title",
      text: "services.ai-chatbots.deliverables.1.text",
    },
    {
      title: "services.ai-chatbots.deliverables.2.title",
      text: "services.ai-chatbots.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-chatbots.mechanism.0.title",
      text: "services.ai-chatbots.mechanism.0.text",
    },
    {
      title: "services.ai-chatbots.mechanism.1.title",
      text: "services.ai-chatbots.mechanism.1.text",
    },
    {
      title: "services.ai-chatbots.mechanism.2.title",
      text: "services.ai-chatbots.mechanism.2.text",
    },
  ],
  relevants: [
    { type: "solution", slug: "customer-experience" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "retail-support-bot" },
    { type: "service", slug: "ai-crm-integration" },
  ],
};
