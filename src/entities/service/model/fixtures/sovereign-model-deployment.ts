import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: deployment `nodes` drive the recurring period (price
 * per node), the `model` size scales it, and fine-tuning plus support are
 * one-off add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "nodes",
      label: "calculator.fields.sovereign-model-deployment.nodes",
      min: 1,
      max: 32,
      default: 4,
    },
    {
      kind: "segmented",
      id: "model",
      label: "calculator.fields.sovereign-model-deployment.model",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "premium", label: "calculator.options.premium" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "finetuning",
      label: "calculator.fields.sovereign-model-deployment.finetuning",
      default: false,
    },
    {
      kind: "segmented",
      id: "support",
      label: "calculator.fields.support",
      options: [
        { value: "standard", label: "calculator.options.supportStandard" },
        { value: "priority", label: "calculator.options.supportPriority" },
        { value: "dedicated", label: "calculator.options.supportDedicated" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 3000000, weeks: 6 },
    { kind: "perUnit", field: "nodes", rate: 250000, weeksPerUnit: 0.4 },
    { kind: "multiplier", field: "model", factors: { standard: 1, premium: 1.5 } },
    { kind: "perOption", field: "finetuning", rates: { false: 0, true: 800000 } },
    {
      kind: "perOption",
      field: "support",
      rates: { standard: 0, priority: 700000, dedicated: 1400000 },
    },
  ],
};

export const sovereignModelDeployment: Service = {
  slug: "sovereign-model-deployment",
  navTitle: "services.sovereign-model-deployment.navTitle",
  title: "services.sovereign-model-deployment.title",
  tagline: "services.sovereign-model-deployment.tagline",
  description: "services.sovereign-model-deployment.description",
  price: { amount: 3000000, unit: "project" },
  calculator,
  icon: "server",
  group: "ai-infra",
  features: [
    {
      title: "services.sovereign-model-deployment.features.0.title",
      text: "services.sovereign-model-deployment.features.0.text",
    },
    {
      title: "services.sovereign-model-deployment.features.1.title",
      text: "services.sovereign-model-deployment.features.1.text",
    },
    {
      title: "services.sovereign-model-deployment.features.2.title",
      text: "services.sovereign-model-deployment.features.2.text",
    },
    {
      title: "services.sovereign-model-deployment.features.3.title",
      text: "services.sovereign-model-deployment.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.sovereign-model-deployment.ctaBanner.title",
    text: "services.sovereign-model-deployment.ctaBanner.text",
    buttonLabel: "services.sovereign-model-deployment.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.sovereign-model-deployment.techStack.0.subtitle",
      description: "services.sovereign-model-deployment.techStack.0.description",
      technologies: [
        {
          id: "qwen",
          name: "Qwen",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.0.glossary",
        },
        {
          id: "llama",
          name: "Llama",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.1.glossary",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.2.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.3.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.sovereign-model-deployment.processSteps.0.title",
      text: "services.sovereign-model-deployment.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.sovereign-model-deployment.processSteps.1.title",
      text: "services.sovereign-model-deployment.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.sovereign-model-deployment.processSteps.2.title",
      text: "services.sovereign-model-deployment.processSteps.2.text",
      processType: "deployment",
    },
    {
      title: "services.sovereign-model-deployment.processSteps.3.title",
      text: "services.sovereign-model-deployment.processSteps.3.text",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "services.sovereign-model-deployment.fitItems.0.title",
      text: "services.sovereign-model-deployment.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.sovereign-model-deployment.fitItems.1.title",
      text: "services.sovereign-model-deployment.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.sovereign-model-deployment.fitItems.2.title",
      text: "services.sovereign-model-deployment.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.sovereign-model-deployment.fitItems.3.title",
      text: "services.sovereign-model-deployment.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.sovereign-model-deployment.proofItems.0.title",
      text: "services.sovereign-model-deployment.proofItems.0.text",
      metricValue: "services.sovereign-model-deployment.proofItems.0.metricValue",
      metricLabel: "services.sovereign-model-deployment.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.sovereign-model-deployment.faqItems.0.question",
      answer: "services.sovereign-model-deployment.faqItems.0.answer",
    },
    {
      question: "services.sovereign-model-deployment.faqItems.1.question",
      answer: "services.sovereign-model-deployment.faqItems.1.answer",
    },
    {
      question: "services.sovereign-model-deployment.faqItems.2.question",
      answer: "services.sovereign-model-deployment.faqItems.2.answer",
    },
    {
      question: "services.sovereign-model-deployment.faqItems.3.question",
      answer: "services.sovereign-model-deployment.faqItems.3.answer",
    },
    {
      question: "services.sovereign-model-deployment.faqItems.4.question",
      answer: "services.sovereign-model-deployment.faqItems.4.answer",
    },
    {
      question: "services.sovereign-model-deployment.faqItems.5.question",
      answer: "services.sovereign-model-deployment.faqItems.5.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.sovereign-model-deployment.tradeoffs.0.title",
      text: "services.sovereign-model-deployment.tradeoffs.0.text",
    },
    {
      title: "services.sovereign-model-deployment.tradeoffs.1.title",
      text: "services.sovereign-model-deployment.tradeoffs.1.text",
    },
    {
      title: "services.sovereign-model-deployment.tradeoffs.2.title",
      text: "services.sovereign-model-deployment.tradeoffs.2.text",
    },
    {
      title: "services.sovereign-model-deployment.tradeoffs.3.title",
      text: "services.sovereign-model-deployment.tradeoffs.3.text",
    },
    {
      title: "services.sovereign-model-deployment.tradeoffs.4.title",
      text: "services.sovereign-model-deployment.tradeoffs.4.text",
    },
    {
      title: "services.sovereign-model-deployment.tradeoffs.5.title",
      text: "services.sovereign-model-deployment.tradeoffs.5.text",
    },
    {
      title: "services.sovereign-model-deployment.tradeoffs.6.title",
      text: "services.sovereign-model-deployment.tradeoffs.6.text",
    },
    {
      title: "services.sovereign-model-deployment.tradeoffs.7.title",
      text: "services.sovereign-model-deployment.tradeoffs.7.text",
    },
  ],
  outcomes: [
    {
      title: "services.sovereign-model-deployment.outcomes.0.title",
      value: "services.sovereign-model-deployment.outcomes.0.value",
      text: "services.sovereign-model-deployment.outcomes.0.text",
      icon: "server",
    },
    {
      title: "services.sovereign-model-deployment.outcomes.1.title",
      value: "services.sovereign-model-deployment.outcomes.1.value",
      text: "services.sovereign-model-deployment.outcomes.1.text",
      icon: "insights",
    },
    {
      title: "services.sovereign-model-deployment.outcomes.2.title",
      value: "services.sovereign-model-deployment.outcomes.2.value",
      text: "services.sovereign-model-deployment.outcomes.2.text",
      icon: "rocket-launch",
    },
    {
      title: "services.sovereign-model-deployment.outcomes.3.title",
      value: "services.sovereign-model-deployment.outcomes.3.value",
      text: "services.sovereign-model-deployment.outcomes.3.text",
      icon: "fact-check",
    },
  ],
  deliverables: [
    {
      title: "services.sovereign-model-deployment.deliverables.0.title",
      text: "services.sovereign-model-deployment.deliverables.0.text",
    },
    {
      title: "services.sovereign-model-deployment.deliverables.1.title",
      text: "services.sovereign-model-deployment.deliverables.1.text",
    },
    {
      title: "services.sovereign-model-deployment.deliverables.2.title",
      text: "services.sovereign-model-deployment.deliverables.2.text",
    },
    {
      title: "services.sovereign-model-deployment.deliverables.3.title",
      text: "services.sovereign-model-deployment.deliverables.3.text",
    },
    {
      title: "services.sovereign-model-deployment.deliverables.4.title",
      text: "services.sovereign-model-deployment.deliverables.4.text",
    },
  ],
  mechanism: [
    {
      title: "services.sovereign-model-deployment.mechanism.0.title",
      text: "services.sovereign-model-deployment.mechanism.0.text",
      diagram: "local-loop",
    },
    {
      title: "services.sovereign-model-deployment.mechanism.1.title",
      text: "services.sovereign-model-deployment.mechanism.1.text",
      diagram: "local-inference",
    },
    {
      title: "services.sovereign-model-deployment.mechanism.2.title",
      text: "services.sovereign-model-deployment.mechanism.2.text",
      diagram: "quantization",
    },
    {
      title: "services.sovereign-model-deployment.mechanism.3.title",
      text: "services.sovereign-model-deployment.mechanism.3.text",
      diagram: "planned-update",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-infrastructure" },
    { type: "service", slug: "ai-security-audit" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
