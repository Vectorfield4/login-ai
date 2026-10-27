import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; model size, dataset and method scale the work, while evaluation and deployment are add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "segmented",
      id: "model",
      label: "calculator.fields.llm-fine-tuning.model",
      options: [
        { value: "7b", label: "calculator.options.model7b" },
        { value: "13b", label: "calculator.options.model13b" },
        { value: "70b", label: "calculator.options.model70b" },
      ],
      default: "7b",
    },
    {
      kind: "stepper",
      id: "dataset",
      label: "calculator.fields.llm-fine-tuning.dataset",
      min: 1,
      max: 100,
      default: 10,
    },
    {
      kind: "segmented",
      id: "method",
      label: "calculator.fields.llm-fine-tuning.method",
      options: [
        { value: "lora", label: "calculator.options.lora" },
        { value: "sft", label: "calculator.options.sft" },
        { value: "dpo", label: "calculator.options.dpo" },
      ],
      default: "lora",
    },
    {
      kind: "toggle",
      id: "eval",
      label: "calculator.fields.llm-fine-tuning.eval",
      default: false,
    },
    {
      kind: "toggle",
      id: "deployment",
      label: "calculator.fields.llm-fine-tuning.deployment",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 800000, weeks: 4 },
    { kind: "multiplier", field: "model", factors: { "7b": 1, "13b": 1.4, "70b": 2 } },
    { kind: "perUnit", field: "dataset", rate: 20000, weeksPerUnit: 0.2 },
    { kind: "multiplier", field: "method", factors: { lora: 1, sft: 1.3, dpo: 1.5 } },
    { kind: "perOption", field: "eval", rates: { false: 0, true: 100000 } },
    { kind: "perOption", field: "deployment", rates: { false: 0, true: 200000 } },
  ],
};

export const llmFineTuning: Service = {
  slug: "llm-fine-tuning",
  navTitle: "services.llm-fine-tuning.navTitle",
  title: "services.llm-fine-tuning.title",
  tagline: "services.llm-fine-tuning.tagline",
  description: "services.llm-fine-tuning.description",
  price: { amount: 800000, unit: "project" },
  calculator,
  icon: "cpu",
  group: "models",
  features: [
    {
      title: "services.llm-fine-tuning.features.0.title",
      text: "services.llm-fine-tuning.features.0.text",
    },
    {
      title: "services.llm-fine-tuning.features.1.title",
      text: "services.llm-fine-tuning.features.1.text",
    },
    {
      title: "services.llm-fine-tuning.features.2.title",
      text: "services.llm-fine-tuning.features.2.text",
    },
    {
      title: "services.llm-fine-tuning.features.3.title",
      text: "services.llm-fine-tuning.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.llm-fine-tuning.ctaBanner.title",
    text: "services.llm-fine-tuning.ctaBanner.text",
    buttonLabel: "services.llm-fine-tuning.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.llm-fine-tuning.techStack.0.subtitle",
      description: "services.llm-fine-tuning.techStack.0.description",
      technologies: [
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.llm-fine-tuning.techStack.0.technologies.0.glossary",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary: "services.llm-fine-tuning.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.llm-fine-tuning.techStack.0.technologies.2.glossary",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.llm-fine-tuning.techStack.0.technologies.3.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.llm-fine-tuning.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.llm-fine-tuning.processSteps.0.title",
      text: "services.llm-fine-tuning.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.llm-fine-tuning.processSteps.1.title",
      text: "services.llm-fine-tuning.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.llm-fine-tuning.processSteps.2.title",
      text: "services.llm-fine-tuning.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.llm-fine-tuning.processSteps.3.title",
      text: "services.llm-fine-tuning.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.llm-fine-tuning.fitItems.0.title",
      text: "services.llm-fine-tuning.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.llm-fine-tuning.fitItems.1.title",
      text: "services.llm-fine-tuning.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.llm-fine-tuning.fitItems.2.title",
      text: "services.llm-fine-tuning.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.llm-fine-tuning.fitItems.3.title",
      text: "services.llm-fine-tuning.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.llm-fine-tuning.faqItems.0.question",
      answer: "services.llm-fine-tuning.faqItems.0.answer",
    },
    {
      question: "services.llm-fine-tuning.faqItems.1.question",
      answer: "services.llm-fine-tuning.faqItems.1.answer",
    },
    {
      question: "services.llm-fine-tuning.faqItems.2.question",
      answer: "services.llm-fine-tuning.faqItems.2.answer",
    },
    {
      question: "services.llm-fine-tuning.faqItems.3.question",
      answer: "services.llm-fine-tuning.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.llm-fine-tuning.tradeoffs.0.title",
      text: "services.llm-fine-tuning.tradeoffs.0.text",
    },
    {
      title: "services.llm-fine-tuning.tradeoffs.1.title",
      text: "services.llm-fine-tuning.tradeoffs.1.text",
    },
    {
      title: "services.llm-fine-tuning.tradeoffs.2.title",
      text: "services.llm-fine-tuning.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.llm-fine-tuning.deliverables.0.title",
      text: "services.llm-fine-tuning.deliverables.0.text",
    },
    {
      title: "services.llm-fine-tuning.deliverables.1.title",
      text: "services.llm-fine-tuning.deliverables.1.text",
    },
    {
      title: "services.llm-fine-tuning.deliverables.2.title",
      text: "services.llm-fine-tuning.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.llm-fine-tuning.mechanism.0.title",
      text: "services.llm-fine-tuning.mechanism.0.text",
    },
    {
      title: "services.llm-fine-tuning.mechanism.1.title",
      text: "services.llm-fine-tuning.mechanism.1.text",
    },
    {
      title: "services.llm-fine-tuning.mechanism.2.title",
      text: "services.llm-fine-tuning.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.llm-fine-tuning.precedents.0.title",
      text: "services.llm-fine-tuning.precedents.0.text",
      metricValue: "services.llm-fine-tuning.precedents.0.metricValue",
      metricLabel: "services.llm-fine-tuning.precedents.0.metricLabel",
    },
    {
      title: "services.llm-fine-tuning.precedents.1.title",
      text: "services.llm-fine-tuning.precedents.1.text",
      metricValue: "services.llm-fine-tuning.precedents.1.metricValue",
      metricLabel: "services.llm-fine-tuning.precedents.1.metricLabel",
    },
    {
      title: "services.llm-fine-tuning.precedents.2.title",
      text: "services.llm-fine-tuning.precedents.2.text",
      metricValue: "services.llm-fine-tuning.precedents.2.metricValue",
      metricLabel: "services.llm-fine-tuning.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "deterministic-rag-systems" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
