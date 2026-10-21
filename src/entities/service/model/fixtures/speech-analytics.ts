import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Retainer estimator: hours drive the monthly period, QA depth scales it, and a CRM integration is a one-off add-on; the 300k setup is separate.
 */
const calculator: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    {
      kind: "stepper",
      id: "hours",
      label: "calculator.fields.speech-analytics.hours",
      min: 100,
      max: 10000,
      default: 1000,
    },
    {
      kind: "segmented",
      id: "qa",
      label: "calculator.fields.speech-analytics.qa",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "advanced", label: "calculator.options.advanced" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "crm",
      label: "calculator.fields.speech-analytics.crm",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 300000, weeks: 3 },
    { kind: "perUnit", field: "hours", rate: 150 },
    { kind: "multiplier", field: "qa", factors: { standard: 1, advanced: 1.4 } },
    { kind: "perOption", field: "crm", rates: { false: 0, true: 100000 } },
  ],
};

export const speechAnalytics: Service = {
  slug: "speech-analytics",
  navTitle: "services.speech-analytics.navTitle",
  title: "services.speech-analytics.title",
  tagline: "services.speech-analytics.tagline",
  description: "services.speech-analytics.description",
  price: { amount: 150000, unit: "month" },
  calculator,
  icon: "audio",
  group: "conversational",
  features: [
    {
      title: "services.speech-analytics.features.0.title",
      text: "services.speech-analytics.features.0.text",
    },
    {
      title: "services.speech-analytics.features.1.title",
      text: "services.speech-analytics.features.1.text",
    },
    {
      title: "services.speech-analytics.features.2.title",
      text: "services.speech-analytics.features.2.text",
    },
    {
      title: "services.speech-analytics.features.3.title",
      text: "services.speech-analytics.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.speech-analytics.ctaBanner.title",
    text: "services.speech-analytics.ctaBanner.text",
    buttonLabel: "services.speech-analytics.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.speech-analytics.techStack.0.subtitle",
      description: "services.speech-analytics.techStack.0.description",
      technologies: [
        {
          id: "whisper",
          name: "Whisper",
          glossary: "services.speech-analytics.techStack.0.technologies.0.glossary",
        },
        {
          id: "yandex-speechkit",
          name: "Yandex SpeechKit",
          glossary: "services.speech-analytics.techStack.0.technologies.1.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.speech-analytics.techStack.0.technologies.2.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.speech-analytics.techStack.0.technologies.3.glossary",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "services.speech-analytics.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.speech-analytics.processSteps.0.title",
      text: "services.speech-analytics.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.speech-analytics.processSteps.1.title",
      text: "services.speech-analytics.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.speech-analytics.processSteps.2.title",
      text: "services.speech-analytics.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.speech-analytics.processSteps.3.title",
      text: "services.speech-analytics.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.speech-analytics.fitItems.0.title",
      text: "services.speech-analytics.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.speech-analytics.fitItems.1.title",
      text: "services.speech-analytics.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.speech-analytics.fitItems.2.title",
      text: "services.speech-analytics.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.speech-analytics.fitItems.3.title",
      text: "services.speech-analytics.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.speech-analytics.faqItems.0.question",
      answer: "services.speech-analytics.faqItems.0.answer",
    },
    {
      question: "services.speech-analytics.faqItems.1.question",
      answer: "services.speech-analytics.faqItems.1.answer",
    },
    {
      question: "services.speech-analytics.faqItems.2.question",
      answer: "services.speech-analytics.faqItems.2.answer",
    },
    {
      question: "services.speech-analytics.faqItems.3.question",
      answer: "services.speech-analytics.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.speech-analytics.tradeoffs.0.title",
      text: "services.speech-analytics.tradeoffs.0.text",
    },
    {
      title: "services.speech-analytics.tradeoffs.1.title",
      text: "services.speech-analytics.tradeoffs.1.text",
    },
    {
      title: "services.speech-analytics.tradeoffs.2.title",
      text: "services.speech-analytics.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.speech-analytics.deliverables.0.title",
      text: "services.speech-analytics.deliverables.0.text",
    },
    {
      title: "services.speech-analytics.deliverables.1.title",
      text: "services.speech-analytics.deliverables.1.text",
    },
    {
      title: "services.speech-analytics.deliverables.2.title",
      text: "services.speech-analytics.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.speech-analytics.mechanism.0.title",
      text: "services.speech-analytics.mechanism.0.text",
    },
    {
      title: "services.speech-analytics.mechanism.1.title",
      text: "services.speech-analytics.mechanism.1.text",
    },
    {
      title: "services.speech-analytics.mechanism.2.title",
      text: "services.speech-analytics.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.speech-analytics.outcomes.0.title",
      value: "services.speech-analytics.outcomes.0.value",
      text: "services.speech-analytics.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.speech-analytics.outcomes.1.title",
      value: "services.speech-analytics.outcomes.1.value",
      text: "services.speech-analytics.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.speech-analytics.outcomes.2.title",
      value: "services.speech-analytics.outcomes.2.value",
      text: "services.speech-analytics.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "speech-recognition-systems" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
