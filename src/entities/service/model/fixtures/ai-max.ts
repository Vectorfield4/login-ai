import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor and includes MAX onboarding, KYC and legal support; extra bots and options are one-off add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "bots",
      label: "calculator.fields.ai-max.bots",
      min: 1,
      max: 10,
      default: 1,
    },
    {
      kind: "segmented",
      id: "kyc",
      label: "calculator.fields.ai-max.kyc",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "extended", label: "calculator.options.extended" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "miniApp",
      label: "calculator.fields.ai-max.miniApp",
      default: false,
    },
    {
      kind: "toggle",
      id: "payments",
      label: "calculator.fields.ai-max.payments",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 700000, weeks: 6 },
    { kind: "perUnit", field: "bots", rate: 150000, weeksPerUnit: 0.5 },
    { kind: "perOption", field: "kyc", rates: { standard: 0, extended: 200000 } },
    { kind: "perOption", field: "miniApp", rates: { false: 0, true: 150000 } },
    { kind: "perOption", field: "payments", rates: { false: 0, true: 100000 } },
  ],
};

export const aiMax: Service = {
  slug: "ai-max",
  navTitle: "services.ai-max.navTitle",
  title: "services.ai-max.title",
  tagline: "services.ai-max.tagline",
  description: "services.ai-max.description",
  price: { amount: 700000, unit: "project" },
  calculator,
  icon: "rocket-launch",
  group: "ai-integrations",
  features: [
    {
      title: "services.ai-max.features.0.title",
      text: "services.ai-max.features.0.text",
    },
    {
      title: "services.ai-max.features.1.title",
      text: "services.ai-max.features.1.text",
    },
    {
      title: "services.ai-max.features.2.title",
      text: "services.ai-max.features.2.text",
    },
    {
      title: "services.ai-max.features.3.title",
      text: "services.ai-max.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-max.ctaBanner.title",
    text: "services.ai-max.ctaBanner.text",
    buttonLabel: "services.ai-max.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-max.techStack.0.subtitle",
      description: "services.ai-max.techStack.0.description",
      technologies: [
        {
          id: "max-bot-api",
          name: "MAX Bot API",
          glossary: "services.ai-max.techStack.0.technologies.0.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-max.techStack.0.technologies.1.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-max.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-max.techStack.0.technologies.3.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.ai-max.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-max.processSteps.0.title",
      text: "services.ai-max.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-max.processSteps.1.title",
      text: "services.ai-max.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-max.processSteps.2.title",
      text: "services.ai-max.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-max.processSteps.3.title",
      text: "services.ai-max.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-max.fitItems.0.title",
      text: "services.ai-max.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-max.fitItems.1.title",
      text: "services.ai-max.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-max.fitItems.2.title",
      text: "services.ai-max.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-max.fitItems.3.title",
      text: "services.ai-max.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-max.faqItems.0.question",
      answer: "services.ai-max.faqItems.0.answer",
    },
    {
      question: "services.ai-max.faqItems.1.question",
      answer: "services.ai-max.faqItems.1.answer",
    },
    {
      question: "services.ai-max.faqItems.2.question",
      answer: "services.ai-max.faqItems.2.answer",
    },
    {
      question: "services.ai-max.faqItems.3.question",
      answer: "services.ai-max.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-max.tradeoffs.0.title",
      text: "services.ai-max.tradeoffs.0.text",
    },
    {
      title: "services.ai-max.tradeoffs.1.title",
      text: "services.ai-max.tradeoffs.1.text",
    },
    {
      title: "services.ai-max.tradeoffs.2.title",
      text: "services.ai-max.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-max.deliverables.0.title",
      text: "services.ai-max.deliverables.0.text",
    },
    {
      title: "services.ai-max.deliverables.1.title",
      text: "services.ai-max.deliverables.1.text",
    },
    {
      title: "services.ai-max.deliverables.2.title",
      text: "services.ai-max.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-max.mechanism.0.title",
      text: "services.ai-max.mechanism.0.text",
    },
    {
      title: "services.ai-max.mechanism.1.title",
      text: "services.ai-max.mechanism.1.text",
    },
    {
      title: "services.ai-max.mechanism.2.title",
      text: "services.ai-max.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-max.outcomes.0.title",
      value: "services.ai-max.outcomes.0.value",
      text: "services.ai-max.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.ai-max.outcomes.1.title",
      value: "services.ai-max.outcomes.1.value",
      text: "services.ai-max.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-max.outcomes.2.title",
      value: "services.ai-max.outcomes.2.value",
      text: "services.ai-max.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-chatbots" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
