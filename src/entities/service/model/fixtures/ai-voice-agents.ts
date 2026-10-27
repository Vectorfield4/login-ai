import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while call
 * minutes and scenarios drive the recurring period and multilingual speech plus
 * telephony are one-off add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "slider",
      id: "minutes",
      label: "calculator.fields.ai-voice-agents.minutes",
      min: 1000,
      max: 50000,
      step: 1000,
      default: 5000,
    },
    {
      kind: "stepper",
      id: "scenarios",
      label: "calculator.fields.ai-voice-agents.scenarios",
      min: 1,
      max: 10,
      default: 2,
    },
    {
      kind: "toggle",
      id: "multilingual",
      label: "calculator.fields.ai-voice-agents.multilingual",
      default: false,
    },
    {
      kind: "toggle",
      id: "telephony",
      label: "calculator.fields.ai-voice-agents.telephony",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 900000, weeks: 3 },
    { kind: "perUnit", field: "minutes", rate: 40, weeksPerUnit: 0.0001 },
    { kind: "perUnit", field: "scenarios", rate: 100000, weeksPerUnit: 0.25 },
    { kind: "perOption", field: "multilingual", rates: { false: 0, true: 100000 } },
    { kind: "perOption", field: "telephony", rates: { false: 0, true: 150000 } },
  ],
};

export const aiVoiceAgents: Service = {
  slug: "ai-voice-agents",
  navTitle: "services.ai-voice-agents.navTitle",
  title: "services.ai-voice-agents.title",
  tagline: "services.ai-voice-agents.tagline",
  description: "services.ai-voice-agents.description",
  price: { amount: 900000, unit: "project" },
  calculator,
  icon: "audio",
  group: "conversational",
  features: [
    {
      title: "services.ai-voice-agents.features.0.title",
      text: "services.ai-voice-agents.features.0.text",
    },
    {
      title: "services.ai-voice-agents.features.1.title",
      text: "services.ai-voice-agents.features.1.text",
    },
    {
      title: "services.ai-voice-agents.features.2.title",
      text: "services.ai-voice-agents.features.2.text",
    },
    {
      title: "services.ai-voice-agents.features.3.title",
      text: "services.ai-voice-agents.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-voice-agents.ctaBanner.title",
    text: "services.ai-voice-agents.ctaBanner.text",
    buttonLabel: "services.ai-voice-agents.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-voice-agents.techStack.0.subtitle",
      description: "services.ai-voice-agents.techStack.0.description",
      technologies: [
        {
          id: "asterisk",
          name: "Asterisk",
          glossary: "services.ai-voice-agents.techStack.0.technologies.0.glossary",
        },
        {
          id: "whisper",
          name: "Whisper",
          glossary: "services.ai-voice-agents.techStack.0.technologies.1.glossary",
        },
        {
          id: "yandex-speechkit",
          name: "Yandex SpeechKit",
          glossary: "services.ai-voice-agents.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-voice-agents.techStack.0.technologies.3.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-voice-agents.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-voice-agents.processSteps.0.title",
      text: "services.ai-voice-agents.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-voice-agents.processSteps.1.title",
      text: "services.ai-voice-agents.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-voice-agents.processSteps.2.title",
      text: "services.ai-voice-agents.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-voice-agents.processSteps.3.title",
      text: "services.ai-voice-agents.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-voice-agents.fitItems.0.title",
      text: "services.ai-voice-agents.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-voice-agents.fitItems.1.title",
      text: "services.ai-voice-agents.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-voice-agents.fitItems.2.title",
      text: "services.ai-voice-agents.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-voice-agents.fitItems.3.title",
      text: "services.ai-voice-agents.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-voice-agents.faqItems.0.question",
      answer: "services.ai-voice-agents.faqItems.0.answer",
    },
    {
      question: "services.ai-voice-agents.faqItems.1.question",
      answer: "services.ai-voice-agents.faqItems.1.answer",
    },
    {
      question: "services.ai-voice-agents.faqItems.2.question",
      answer: "services.ai-voice-agents.faqItems.2.answer",
    },
    {
      question: "services.ai-voice-agents.faqItems.3.question",
      answer: "services.ai-voice-agents.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-voice-agents.tradeoffs.0.title",
      text: "services.ai-voice-agents.tradeoffs.0.text",
    },
    {
      title: "services.ai-voice-agents.tradeoffs.1.title",
      text: "services.ai-voice-agents.tradeoffs.1.text",
    },
    {
      title: "services.ai-voice-agents.tradeoffs.2.title",
      text: "services.ai-voice-agents.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-voice-agents.deliverables.0.title",
      text: "services.ai-voice-agents.deliverables.0.text",
    },
    {
      title: "services.ai-voice-agents.deliverables.1.title",
      text: "services.ai-voice-agents.deliverables.1.text",
    },
    {
      title: "services.ai-voice-agents.deliverables.2.title",
      text: "services.ai-voice-agents.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-voice-agents.mechanism.0.title",
      text: "services.ai-voice-agents.mechanism.0.text",
    },
    {
      title: "services.ai-voice-agents.mechanism.1.title",
      text: "services.ai-voice-agents.mechanism.1.text",
    },
    {
      title: "services.ai-voice-agents.mechanism.2.title",
      text: "services.ai-voice-agents.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.ai-voice-agents.precedents.0.title",
      text: "services.ai-voice-agents.precedents.0.text",
      metricValue: "services.ai-voice-agents.precedents.0.metricValue",
      metricLabel: "services.ai-voice-agents.precedents.0.metricLabel",
    },
    {
      title: "services.ai-voice-agents.precedents.1.title",
      text: "services.ai-voice-agents.precedents.1.text",
      metricValue: "services.ai-voice-agents.precedents.1.metricValue",
      metricLabel: "services.ai-voice-agents.precedents.1.metricLabel",
    },
    {
      title: "services.ai-voice-agents.precedents.2.title",
      text: "services.ai-voice-agents.precedents.2.text",
      metricValue: "services.ai-voice-agents.precedents.2.metricValue",
      metricLabel: "services.ai-voice-agents.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "solution", slug: "customer-experience" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "retail-support-bot" },
    { type: "service", slug: "speech-recognition-systems" },
  ],
};
