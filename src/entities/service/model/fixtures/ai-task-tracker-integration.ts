import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: synced `boards` drive the recurring period (price per
 * board), the `sync` mode scales it, and automations plus support are one-off
 * add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "boards",
      label: "calculator.fields.ai-task-tracker-integration.boards",
      min: 1,
      max: 20,
      default: 3,
    },
    {
      kind: "segmented",
      id: "sync",
      label: "calculator.fields.ai-task-tracker-integration.sync",
      options: [
        { value: "batch", label: "calculator.options.batch" },
        { value: "realtime", label: "calculator.options.realtime" },
      ],
      default: "batch",
    },
    {
      kind: "toggle",
      id: "automation",
      label: "calculator.fields.ai-task-tracker-integration.automation",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 600000, weeks: 2 },
    { kind: "perUnit", field: "boards", rate: 60000, weeksPerUnit: 0.2 },
    { kind: "multiplier", field: "sync", factors: { batch: 1, realtime: 1.5 } },
    { kind: "perOption", field: "automation", rates: { false: 0, true: 180000 } },
  ],
};

export const aiTaskTrackerIntegration: Service = {
  slug: "ai-task-tracker-integration",
  navTitle: "services.ai-task-tracker-integration.navTitle",
  title: "services.ai-task-tracker-integration.title",
  tagline: "services.ai-task-tracker-integration.tagline",
  description: "services.ai-task-tracker-integration.description",
  price: { amount: 600000, unit: "project" },
  calculator,
  icon: "fact-check",
  group: "ai-integrations",
  features: [
    {
      title: "services.ai-task-tracker-integration.features.0.title",
      text: "services.ai-task-tracker-integration.features.0.text",
    },
    {
      title: "services.ai-task-tracker-integration.features.1.title",
      text: "services.ai-task-tracker-integration.features.1.text",
    },
    {
      title: "services.ai-task-tracker-integration.features.2.title",
      text: "services.ai-task-tracker-integration.features.2.text",
    },
    {
      title: "services.ai-task-tracker-integration.features.3.title",
      text: "services.ai-task-tracker-integration.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-task-tracker-integration.ctaBanner.title",
    text: "services.ai-task-tracker-integration.ctaBanner.text",
    buttonLabel: "services.ai-task-tracker-integration.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-task-tracker-integration.techStack.0.subtitle",
      description: "services.ai-task-tracker-integration.techStack.0.description",
      technologies: [
        {
          id: "jira",
          name: "Jira",
          glossary: "services.ai-task-tracker-integration.techStack.0.technologies.0.glossary",
        },
        {
          id: "youtrack",
          name: "YouTrack",
          glossary: "services.ai-task-tracker-integration.techStack.0.technologies.1.glossary",
        },
        {
          id: "asana",
          name: "Asana",
          glossary: "services.ai-task-tracker-integration.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-task-tracker-integration.techStack.0.technologies.3.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-task-tracker-integration.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-task-tracker-integration.processSteps.0.title",
      text: "services.ai-task-tracker-integration.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-task-tracker-integration.processSteps.1.title",
      text: "services.ai-task-tracker-integration.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-task-tracker-integration.processSteps.2.title",
      text: "services.ai-task-tracker-integration.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-task-tracker-integration.processSteps.3.title",
      text: "services.ai-task-tracker-integration.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-task-tracker-integration.fitItems.0.title",
      text: "services.ai-task-tracker-integration.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-task-tracker-integration.fitItems.1.title",
      text: "services.ai-task-tracker-integration.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-task-tracker-integration.fitItems.2.title",
      text: "services.ai-task-tracker-integration.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-task-tracker-integration.fitItems.3.title",
      text: "services.ai-task-tracker-integration.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.ai-task-tracker-integration.precedents.0.title",
      text: "services.ai-task-tracker-integration.precedents.0.text",
      metricValue: "services.ai-task-tracker-integration.precedents.0.metricValue",
      metricLabel: "services.ai-task-tracker-integration.precedents.0.metricLabel",
    },
    {
      title: "services.ai-task-tracker-integration.precedents.1.title",
      text: "services.ai-task-tracker-integration.precedents.1.text",
      metricValue: "services.ai-task-tracker-integration.precedents.1.metricValue",
      metricLabel: "services.ai-task-tracker-integration.precedents.1.metricLabel",
    },
    {
      title: "services.ai-task-tracker-integration.precedents.2.title",
      text: "services.ai-task-tracker-integration.precedents.2.text",
      metricValue: "services.ai-task-tracker-integration.precedents.2.metricValue",
      metricLabel: "services.ai-task-tracker-integration.precedents.2.metricLabel",
    },
    {
      title: "services.ai-task-tracker-integration.precedents.3.title",
      text: "services.ai-task-tracker-integration.precedents.3.text",
      metricValue: "services.ai-task-tracker-integration.precedents.3.metricValue",
      metricLabel: "services.ai-task-tracker-integration.precedents.3.metricLabel",
    },
    {
      title: "services.ai-task-tracker-integration.precedents.4.title",
      text: "services.ai-task-tracker-integration.precedents.4.text",
      metricValue: "services.ai-task-tracker-integration.precedents.4.metricValue",
      metricLabel: "services.ai-task-tracker-integration.precedents.4.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-task-tracker-integration.faqItems.0.question",
      answer: "services.ai-task-tracker-integration.faqItems.0.answer",
    },
    {
      question: "services.ai-task-tracker-integration.faqItems.1.question",
      answer: "services.ai-task-tracker-integration.faqItems.1.answer",
    },
    {
      question: "services.ai-task-tracker-integration.faqItems.2.question",
      answer: "services.ai-task-tracker-integration.faqItems.2.answer",
    },
    {
      question: "services.ai-task-tracker-integration.faqItems.3.question",
      answer: "services.ai-task-tracker-integration.faqItems.3.answer",
    },
    {
      question: "services.ai-task-tracker-integration.faqItems.4.question",
      answer: "services.ai-task-tracker-integration.faqItems.4.answer",
    },
    {
      question: "services.ai-task-tracker-integration.faqItems.5.question",
      answer: "services.ai-task-tracker-integration.faqItems.5.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-task-tracker-integration.tradeoffs.0.title",
      text: "services.ai-task-tracker-integration.tradeoffs.0.text",
    },
    {
      title: "services.ai-task-tracker-integration.tradeoffs.1.title",
      text: "services.ai-task-tracker-integration.tradeoffs.1.text",
    },
    {
      title: "services.ai-task-tracker-integration.tradeoffs.2.title",
      text: "services.ai-task-tracker-integration.tradeoffs.2.text",
    },
    {
      title: "services.ai-task-tracker-integration.tradeoffs.3.title",
      text: "services.ai-task-tracker-integration.tradeoffs.3.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-task-tracker-integration.deliverables.0.title",
      text: "services.ai-task-tracker-integration.deliverables.0.text",
    },
    {
      title: "services.ai-task-tracker-integration.deliverables.1.title",
      text: "services.ai-task-tracker-integration.deliverables.1.text",
    },
    {
      title: "services.ai-task-tracker-integration.deliverables.2.title",
      text: "services.ai-task-tracker-integration.deliverables.2.text",
    },
    {
      title: "services.ai-task-tracker-integration.deliverables.3.title",
      text: "services.ai-task-tracker-integration.deliverables.3.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-task-tracker-integration.mechanism.0.title",
      text: "services.ai-task-tracker-integration.mechanism.0.text",
      diagram: "task-intake",
    },
    {
      title: "services.ai-task-tracker-integration.mechanism.1.title",
      text: "services.ai-task-tracker-integration.mechanism.1.text",
      diagram: "dedupe-flow",
    },
    {
      title: "services.ai-task-tracker-integration.mechanism.2.title",
      text: "services.ai-task-tracker-integration.mechanism.2.text",
      diagram: "status-sync",
    },
    {
      title: "services.ai-task-tracker-integration.mechanism.3.title",
      text: "services.ai-task-tracker-integration.mechanism.3.text",
      diagram: "estimate-flow",
    },
  ],
  relevants: [
    { type: "service", slug: "software-development" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "agency-content-pipeline" },
  ],
};
