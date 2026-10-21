import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while vacancies and channels add build time and screening depth scales it.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "vacancies",
      label: "calculator.fields.ai-recruiter.vacancies",
      min: 1,
      max: 100,
      default: 10,
    },
    {
      kind: "stepper",
      id: "channels",
      label: "calculator.fields.ai-recruiter.channels",
      min: 1,
      max: 5,
      default: 2,
    },
    {
      kind: "segmented",
      id: "screening",
      label: "calculator.fields.ai-recruiter.screening",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "advanced", label: "calculator.options.advanced" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 700000, weeks: 3 },
    { kind: "perUnit", field: "vacancies", rate: 10000, weeksPerUnit: 0.1 },
    { kind: "perUnit", field: "channels", rate: 50000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "screening", factors: { standard: 1, advanced: 1.4 } },
  ],
};

export const aiRecruiter: Service = {
  slug: "ai-recruiter",
  navTitle: "services.ai-recruiter.navTitle",
  title: "services.ai-recruiter.title",
  tagline: "services.ai-recruiter.tagline",
  description: "services.ai-recruiter.description",
  price: { amount: 700000, unit: "project" },
  calculator,
  icon: "rate-review",
  group: "conversational",
  features: [
    {
      title: "services.ai-recruiter.features.0.title",
      text: "services.ai-recruiter.features.0.text",
    },
    {
      title: "services.ai-recruiter.features.1.title",
      text: "services.ai-recruiter.features.1.text",
    },
    {
      title: "services.ai-recruiter.features.2.title",
      text: "services.ai-recruiter.features.2.text",
    },
    {
      title: "services.ai-recruiter.features.3.title",
      text: "services.ai-recruiter.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-recruiter.ctaBanner.title",
    text: "services.ai-recruiter.ctaBanner.text",
    buttonLabel: "services.ai-recruiter.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-recruiter.techStack.0.subtitle",
      description: "services.ai-recruiter.techStack.0.description",
      technologies: [
        {
          id: "telegram-bot-api",
          name: "Telegram Bot API",
          glossary: "services.ai-recruiter.techStack.0.technologies.0.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-recruiter.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-recruiter.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-recruiter.techStack.0.technologies.3.glossary",
        },
        {
          id: "python",
          name: "Python",
          glossary: "services.ai-recruiter.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-recruiter.processSteps.0.title",
      text: "services.ai-recruiter.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-recruiter.processSteps.1.title",
      text: "services.ai-recruiter.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-recruiter.processSteps.2.title",
      text: "services.ai-recruiter.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-recruiter.processSteps.3.title",
      text: "services.ai-recruiter.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-recruiter.fitItems.0.title",
      text: "services.ai-recruiter.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-recruiter.fitItems.1.title",
      text: "services.ai-recruiter.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-recruiter.fitItems.2.title",
      text: "services.ai-recruiter.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-recruiter.fitItems.3.title",
      text: "services.ai-recruiter.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-recruiter.faqItems.0.question",
      answer: "services.ai-recruiter.faqItems.0.answer",
    },
    {
      question: "services.ai-recruiter.faqItems.1.question",
      answer: "services.ai-recruiter.faqItems.1.answer",
    },
    {
      question: "services.ai-recruiter.faqItems.2.question",
      answer: "services.ai-recruiter.faqItems.2.answer",
    },
    {
      question: "services.ai-recruiter.faqItems.3.question",
      answer: "services.ai-recruiter.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-recruiter.tradeoffs.0.title",
      text: "services.ai-recruiter.tradeoffs.0.text",
    },
    {
      title: "services.ai-recruiter.tradeoffs.1.title",
      text: "services.ai-recruiter.tradeoffs.1.text",
    },
    {
      title: "services.ai-recruiter.tradeoffs.2.title",
      text: "services.ai-recruiter.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-recruiter.deliverables.0.title",
      text: "services.ai-recruiter.deliverables.0.text",
    },
    {
      title: "services.ai-recruiter.deliverables.1.title",
      text: "services.ai-recruiter.deliverables.1.text",
    },
    {
      title: "services.ai-recruiter.deliverables.2.title",
      text: "services.ai-recruiter.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-recruiter.mechanism.0.title",
      text: "services.ai-recruiter.mechanism.0.text",
    },
    {
      title: "services.ai-recruiter.mechanism.1.title",
      text: "services.ai-recruiter.mechanism.1.text",
    },
    {
      title: "services.ai-recruiter.mechanism.2.title",
      text: "services.ai-recruiter.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-recruiter.outcomes.0.title",
      value: "services.ai-recruiter.outcomes.0.value",
      text: "services.ai-recruiter.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.ai-recruiter.outcomes.1.title",
      value: "services.ai-recruiter.outcomes.1.value",
      text: "services.ai-recruiter.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-recruiter.outcomes.2.title",
      value: "services.ai-recruiter.outcomes.2.value",
      text: "services.ai-recruiter.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-chatbots" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
