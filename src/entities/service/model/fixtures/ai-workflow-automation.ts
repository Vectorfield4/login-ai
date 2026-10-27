import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while processes and integrations add build time and volume scales it.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "processes",
      label: "calculator.fields.ai-workflow-automation.processes",
      min: 1,
      max: 20,
      default: 3,
    },
    {
      kind: "stepper",
      id: "integrations",
      label: "calculator.fields.ai-workflow-automation.integrations",
      min: 1,
      max: 10,
      default: 2,
    },
    {
      kind: "segmented",
      id: "volume",
      label: "calculator.fields.ai-workflow-automation.volume",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "extended", label: "calculator.options.extended" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 600000, weeks: 3 },
    { kind: "perUnit", field: "processes", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "integrations", rate: 50000, weeksPerUnit: 0.25 },
    { kind: "multiplier", field: "volume", factors: { standard: 1, extended: 1.2 } },
  ],
};

export const aiWorkflowAutomation: Service = {
  slug: "ai-workflow-automation",
  navTitle: "services.ai-workflow-automation.navTitle",
  title: "services.ai-workflow-automation.title",
  tagline: "services.ai-workflow-automation.tagline",
  description: "services.ai-workflow-automation.description",
  price: { amount: 600000, unit: "project" },
  calculator,
  icon: "auto-awesome",
  group: "agentic",
  features: [
    {
      title: "services.ai-workflow-automation.features.0.title",
      text: "services.ai-workflow-automation.features.0.text",
    },
    {
      title: "services.ai-workflow-automation.features.1.title",
      text: "services.ai-workflow-automation.features.1.text",
    },
    {
      title: "services.ai-workflow-automation.features.2.title",
      text: "services.ai-workflow-automation.features.2.text",
    },
    {
      title: "services.ai-workflow-automation.features.3.title",
      text: "services.ai-workflow-automation.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-workflow-automation.ctaBanner.title",
    text: "services.ai-workflow-automation.ctaBanner.text",
    buttonLabel: "services.ai-workflow-automation.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-workflow-automation.techStack.0.subtitle",
      description: "services.ai-workflow-automation.techStack.0.description",
      technologies: [
        {
          id: "n8n",
          name: "n8n",
          glossary: "services.ai-workflow-automation.techStack.0.technologies.0.glossary",
        },
        {
          id: "make",
          name: "Make",
          glossary: "services.ai-workflow-automation.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-workflow-automation.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-workflow-automation.techStack.0.technologies.3.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-workflow-automation.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-workflow-automation.processSteps.0.title",
      text: "services.ai-workflow-automation.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-workflow-automation.processSteps.1.title",
      text: "services.ai-workflow-automation.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-workflow-automation.processSteps.2.title",
      text: "services.ai-workflow-automation.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-workflow-automation.processSteps.3.title",
      text: "services.ai-workflow-automation.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-workflow-automation.fitItems.0.title",
      text: "services.ai-workflow-automation.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-workflow-automation.fitItems.1.title",
      text: "services.ai-workflow-automation.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-workflow-automation.fitItems.2.title",
      text: "services.ai-workflow-automation.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-workflow-automation.fitItems.3.title",
      text: "services.ai-workflow-automation.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.ai-workflow-automation.precedents.0.title",
      text: "services.ai-workflow-automation.precedents.0.text",
      metricValue: "services.ai-workflow-automation.precedents.0.metricValue",
      metricLabel: "services.ai-workflow-automation.precedents.0.metricLabel",
    },
    {
      title: "services.ai-workflow-automation.precedents.1.title",
      text: "services.ai-workflow-automation.precedents.1.text",
      metricValue: "services.ai-workflow-automation.precedents.1.metricValue",
      metricLabel: "services.ai-workflow-automation.precedents.1.metricLabel",
    },
    {
      title: "services.ai-workflow-automation.precedents.2.title",
      text: "services.ai-workflow-automation.precedents.2.text",
      metricValue: "services.ai-workflow-automation.precedents.2.metricValue",
      metricLabel: "services.ai-workflow-automation.precedents.2.metricLabel",
    },
    {
      title: "services.ai-workflow-automation.precedents.3.title",
      text: "services.ai-workflow-automation.precedents.3.text",
      metricValue: "services.ai-workflow-automation.precedents.3.metricValue",
      metricLabel: "services.ai-workflow-automation.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-workflow-automation.faqItems.0.question",
      answer: "services.ai-workflow-automation.faqItems.0.answer",
    },
    {
      question: "services.ai-workflow-automation.faqItems.1.question",
      answer: "services.ai-workflow-automation.faqItems.1.answer",
    },
    {
      question: "services.ai-workflow-automation.faqItems.2.question",
      answer: "services.ai-workflow-automation.faqItems.2.answer",
    },
    {
      question: "services.ai-workflow-automation.faqItems.3.question",
      answer: "services.ai-workflow-automation.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-workflow-automation.tradeoffs.0.title",
      text: "services.ai-workflow-automation.tradeoffs.0.text",
    },
    {
      title: "services.ai-workflow-automation.tradeoffs.1.title",
      text: "services.ai-workflow-automation.tradeoffs.1.text",
    },
    {
      title: "services.ai-workflow-automation.tradeoffs.2.title",
      text: "services.ai-workflow-automation.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-workflow-automation.deliverables.0.title",
      text: "services.ai-workflow-automation.deliverables.0.text",
    },
    {
      title: "services.ai-workflow-automation.deliverables.1.title",
      text: "services.ai-workflow-automation.deliverables.1.text",
    },
    {
      title: "services.ai-workflow-automation.deliverables.2.title",
      text: "services.ai-workflow-automation.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-workflow-automation.mechanism.0.title",
      text: "services.ai-workflow-automation.mechanism.0.text",
    },
    {
      title: "services.ai-workflow-automation.mechanism.1.title",
      text: "services.ai-workflow-automation.mechanism.1.text",
    },
    {
      title: "services.ai-workflow-automation.mechanism.2.title",
      text: "services.ai-workflow-automation.mechanism.2.text",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-n8n-make" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "agency-content-pipeline" },
  ],
};
