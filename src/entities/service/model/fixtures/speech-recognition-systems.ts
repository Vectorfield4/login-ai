import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: supported `languages` drive the recurring period (price
 * per language), the `complexity` scales it, and streaming plus diarization are
 * one-off add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "languages",
      label: "calculator.fields.languages",
      min: 1,
      max: 5,
      default: 2,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.speech-recognition-systems.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "realtime",
      label: "calculator.fields.speech-recognition-systems.realtime",
      default: false,
    },
    {
      kind: "toggle",
      id: "diarization",
      label: "calculator.fields.speech-recognition-systems.diarization",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 1500000, weeks: 3 },
    { kind: "perUnit", field: "languages", rate: 150000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "perOption", field: "realtime", rates: { false: 0, true: 400000 } },
    { kind: "perOption", field: "diarization", rates: { false: 0, true: 300000 } },
  ],
};

export const speechRecognitionSystems: Service = {
  slug: "speech-recognition-systems",
  navTitle: "services.speech-recognition-systems.navTitle",
  title: "services.speech-recognition-systems.title",
  tagline: "services.speech-recognition-systems.tagline",
  description: "services.speech-recognition-systems.description",
  price: { amount: 1500000, unit: "project" },
  calculator,
  icon: "support-agent",
  group: "ml",
  features: [
    {
      title: "services.speech-recognition-systems.features.0.title",
      text: "services.speech-recognition-systems.features.0.text",
    },
    {
      title: "services.speech-recognition-systems.features.1.title",
      text: "services.speech-recognition-systems.features.1.text",
    },
    {
      title: "services.speech-recognition-systems.features.2.title",
      text: "services.speech-recognition-systems.features.2.text",
    },
    {
      title: "services.speech-recognition-systems.features.3.title",
      text: "services.speech-recognition-systems.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.speech-recognition-systems.ctaBanner.title",
    text: "services.speech-recognition-systems.ctaBanner.text",
    buttonLabel: "services.speech-recognition-systems.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.speech-recognition-systems.techStack.0.subtitle",
      description: "services.speech-recognition-systems.techStack.0.description",
      technologies: [
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.speech-recognition-systems.techStack.0.technologies.0.glossary",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.speech-recognition-systems.techStack.0.technologies.1.glossary",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary: "services.speech-recognition-systems.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.speech-recognition-systems.techStack.0.technologies.3.glossary",
        },
      ],
    },
  ],
  sections: [
    {
      title: "services.speech-recognition-systems.sections.0.title",
      items: [
        "services.speech-recognition-systems.sections.0.items.0",
        "services.speech-recognition-systems.sections.0.items.1",
      ],
    },
    {
      title: "services.speech-recognition-systems.sections.1.title",
      items: [
        "services.speech-recognition-systems.sections.1.items.0",
        "services.speech-recognition-systems.sections.1.items.1",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.speech-recognition-systems.processSteps.0.title",
      text: "services.speech-recognition-systems.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.speech-recognition-systems.processSteps.1.title",
      text: "services.speech-recognition-systems.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.speech-recognition-systems.processSteps.2.title",
      text: "services.speech-recognition-systems.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.speech-recognition-systems.processSteps.3.title",
      text: "services.speech-recognition-systems.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.speech-recognition-systems.fitItems.0.title",
      text: "services.speech-recognition-systems.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.speech-recognition-systems.fitItems.1.title",
      text: "services.speech-recognition-systems.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.speech-recognition-systems.fitItems.2.title",
      text: "services.speech-recognition-systems.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.speech-recognition-systems.fitItems.3.title",
      text: "services.speech-recognition-systems.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.speech-recognition-systems.precedents.0.title",
      text: "services.speech-recognition-systems.precedents.0.text",
      metricValue: "services.speech-recognition-systems.precedents.0.metricValue",
      metricLabel: "services.speech-recognition-systems.precedents.0.metricLabel",
    },
    {
      title: "services.speech-recognition-systems.precedents.1.title",
      text: "services.speech-recognition-systems.precedents.1.text",
      metricValue: "services.speech-recognition-systems.precedents.1.metricValue",
      metricLabel: "services.speech-recognition-systems.precedents.1.metricLabel",
    },
    {
      title: "services.speech-recognition-systems.precedents.2.title",
      text: "services.speech-recognition-systems.precedents.2.text",
      metricValue: "services.speech-recognition-systems.precedents.2.metricValue",
      metricLabel: "services.speech-recognition-systems.precedents.2.metricLabel",
    },
    {
      title: "services.speech-recognition-systems.precedents.3.title",
      text: "services.speech-recognition-systems.precedents.3.text",
      metricValue: "services.speech-recognition-systems.precedents.3.metricValue",
      metricLabel: "services.speech-recognition-systems.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.speech-recognition-systems.faqItems.0.question",
      answer: "services.speech-recognition-systems.faqItems.0.answer",
    },
    {
      question: "services.speech-recognition-systems.faqItems.1.question",
      answer: "services.speech-recognition-systems.faqItems.1.answer",
    },
    {
      question: "services.speech-recognition-systems.faqItems.2.question",
      answer: "services.speech-recognition-systems.faqItems.2.answer",
    },
    {
      question: "services.speech-recognition-systems.faqItems.3.question",
      answer: "services.speech-recognition-systems.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.speech-recognition-systems.tradeoffs.0.title",
      text: "services.speech-recognition-systems.tradeoffs.0.text",
    },
    {
      title: "services.speech-recognition-systems.tradeoffs.1.title",
      text: "services.speech-recognition-systems.tradeoffs.1.text",
    },
    {
      title: "services.speech-recognition-systems.tradeoffs.2.title",
      text: "services.speech-recognition-systems.tradeoffs.2.text",
    },
    {
      title: "services.speech-recognition-systems.tradeoffs.3.title",
      text: "services.speech-recognition-systems.tradeoffs.3.text",
    },
  ],
  mechanism: [
    {
      title: "services.speech-recognition-systems.mechanism.0.title",
      text: "services.speech-recognition-systems.mechanism.0.text",
      diagram: "audio-pipeline",
    },
    {
      title: "services.speech-recognition-systems.mechanism.1.title",
      text: "services.speech-recognition-systems.mechanism.1.text",
    },
    {
      title: "services.speech-recognition-systems.mechanism.2.title",
      text: "services.speech-recognition-systems.mechanism.2.text",
    },
    {
      title: "services.speech-recognition-systems.mechanism.3.title",
      text: "services.speech-recognition-systems.mechanism.3.text",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-infrastructure" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
