import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while workflows, integrations and hosting add build time.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "workflows",
      label: "calculator.fields.ai-n8n-make.workflows",
      min: 1,
      max: 30,
      default: 3,
    },
    {
      kind: "stepper",
      id: "integrations",
      label: "calculator.fields.ai-n8n-make.integrations",
      min: 1,
      max: 10,
      default: 2,
    },
    {
      kind: "toggle",
      id: "hosting",
      label: "calculator.fields.ai-n8n-make.hosting",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 300000, weeks: 2 },
    { kind: "perUnit", field: "workflows", rate: 50000, weeksPerUnit: 0.25 },
    { kind: "perUnit", field: "integrations", rate: 50000, weeksPerUnit: 0.25 },
    { kind: "perOption", field: "hosting", rates: { false: 0, true: 100000 } },
  ],
};

export const aiN8nMake: Service = {
  slug: "ai-n8n-make",
  navTitle: "services.ai-n8n-make.navTitle",
  title: "services.ai-n8n-make.title",
  tagline: "services.ai-n8n-make.tagline",
  description: "services.ai-n8n-make.description",
  price: { amount: 300000, unit: "project" },
  calculator,
  icon: "code",
  group: "ai-integrations",
  features: [
    {
      title: "services.ai-n8n-make.features.0.title",
      text: "services.ai-n8n-make.features.0.text",
    },
    {
      title: "services.ai-n8n-make.features.1.title",
      text: "services.ai-n8n-make.features.1.text",
    },
    {
      title: "services.ai-n8n-make.features.2.title",
      text: "services.ai-n8n-make.features.2.text",
    },
    {
      title: "services.ai-n8n-make.features.3.title",
      text: "services.ai-n8n-make.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-n8n-make.ctaBanner.title",
    text: "services.ai-n8n-make.ctaBanner.text",
    buttonLabel: "services.ai-n8n-make.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-n8n-make.techStack.0.subtitle",
      description: "services.ai-n8n-make.techStack.0.description",
      technologies: [
        {
          id: "n8n",
          name: "n8n",
          glossary: "services.ai-n8n-make.techStack.0.technologies.0.glossary",
        },
        {
          id: "make",
          name: "Make",
          glossary: "services.ai-n8n-make.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-n8n-make.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-n8n-make.techStack.0.technologies.3.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-n8n-make.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-n8n-make.processSteps.0.title",
      text: "services.ai-n8n-make.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-n8n-make.processSteps.1.title",
      text: "services.ai-n8n-make.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-n8n-make.processSteps.2.title",
      text: "services.ai-n8n-make.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-n8n-make.processSteps.3.title",
      text: "services.ai-n8n-make.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-n8n-make.fitItems.0.title",
      text: "services.ai-n8n-make.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-n8n-make.fitItems.1.title",
      text: "services.ai-n8n-make.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-n8n-make.fitItems.2.title",
      text: "services.ai-n8n-make.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-n8n-make.fitItems.3.title",
      text: "services.ai-n8n-make.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-n8n-make.proofItems.0.title",
      text: "services.ai-n8n-make.proofItems.0.text",
      metricValue: "services.ai-n8n-make.proofItems.0.metricValue",
      metricLabel: "services.ai-n8n-make.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-n8n-make.faqItems.0.question",
      answer: "services.ai-n8n-make.faqItems.0.answer",
    },
    {
      question: "services.ai-n8n-make.faqItems.1.question",
      answer: "services.ai-n8n-make.faqItems.1.answer",
    },
    {
      question: "services.ai-n8n-make.faqItems.2.question",
      answer: "services.ai-n8n-make.faqItems.2.answer",
    },
    {
      question: "services.ai-n8n-make.faqItems.3.question",
      answer: "services.ai-n8n-make.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-n8n-make.tradeoffs.0.title",
      text: "services.ai-n8n-make.tradeoffs.0.text",
    },
    {
      title: "services.ai-n8n-make.tradeoffs.1.title",
      text: "services.ai-n8n-make.tradeoffs.1.text",
    },
    {
      title: "services.ai-n8n-make.tradeoffs.2.title",
      text: "services.ai-n8n-make.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-n8n-make.deliverables.0.title",
      text: "services.ai-n8n-make.deliverables.0.text",
    },
    {
      title: "services.ai-n8n-make.deliverables.1.title",
      text: "services.ai-n8n-make.deliverables.1.text",
    },
    {
      title: "services.ai-n8n-make.deliverables.2.title",
      text: "services.ai-n8n-make.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-n8n-make.mechanism.0.title",
      text: "services.ai-n8n-make.mechanism.0.text",
    },
    {
      title: "services.ai-n8n-make.mechanism.1.title",
      text: "services.ai-n8n-make.mechanism.1.text",
    },
    {
      title: "services.ai-n8n-make.mechanism.2.title",
      text: "services.ai-n8n-make.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-n8n-make.outcomes.0.title",
      value: "services.ai-n8n-make.outcomes.0.value",
      text: "services.ai-n8n-make.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.ai-n8n-make.outcomes.1.title",
      value: "services.ai-n8n-make.outcomes.1.value",
      text: "services.ai-n8n-make.outcomes.1.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-n8n-make.outcomes.2.title",
      value: "services.ai-n8n-make.outcomes.2.value",
      text: "services.ai-n8n-make.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-crm-integration" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "agency-content-pipeline" },
  ],
};
