import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: content `contentTypes` drive the recurring period
 * (price per type), the `sync` mode scales it, and an editorial workflow plus
 * support are one-off add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "contentTypes",
      label: "calculator.fields.ai-cms-integration.contentTypes",
      min: 1,
      max: 20,
      default: 5,
    },
    {
      kind: "segmented",
      id: "sync",
      label: "calculator.fields.ai-cms-integration.sync",
      options: [
        { value: "batch", label: "calculator.options.batch" },
        { value: "realtime", label: "calculator.options.realtime" },
      ],
      default: "batch",
    },
    {
      kind: "toggle",
      id: "workflow",
      label: "calculator.fields.ai-cms-integration.workflow",
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
    { kind: "setup", amount: 700000, weeks: 2 },
    { kind: "perUnit", field: "contentTypes", rate: 60000, weeksPerUnit: 0.2 },
    { kind: "multiplier", field: "sync", factors: { batch: 1, realtime: 1.4 } },
    { kind: "perOption", field: "workflow", rates: { false: 0, true: 150000 } },
    {
      kind: "perOption",
      field: "support",
      rates: { standard: 0, priority: 150000, dedicated: 300000 },
    },
  ],
};

export const aiCmsIntegration: Service = {
  slug: "ai-cms-integration",
  navTitle: "services.ai-cms-integration.navTitle",
  title: "services.ai-cms-integration.title",
  tagline: "services.ai-cms-integration.tagline",
  description: "services.ai-cms-integration.description",
  price: { amount: 700000, unit: "project" },
  calculator,
  icon: "auto-awesome",
  group: "ai-integrations",
  features: [
    {
      title: "services.ai-cms-integration.features.0.title",
      text: "services.ai-cms-integration.features.0.text",
    },
    {
      title: "services.ai-cms-integration.features.1.title",
      text: "services.ai-cms-integration.features.1.text",
    },
    {
      title: "services.ai-cms-integration.features.2.title",
      text: "services.ai-cms-integration.features.2.text",
    },
    {
      title: "services.ai-cms-integration.features.3.title",
      text: "services.ai-cms-integration.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-cms-integration.ctaBanner.title",
    text: "services.ai-cms-integration.ctaBanner.text",
    buttonLabel: "services.ai-cms-integration.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-cms-integration.techStack.0.subtitle",
      description: "services.ai-cms-integration.techStack.0.description",
      technologies: [
        {
          id: "strapi",
          name: "Strapi",
          glossary: "services.ai-cms-integration.techStack.0.technologies.0.glossary",
        },
        {
          id: "wordpress",
          name: "WordPress",
          glossary: "services.ai-cms-integration.techStack.0.technologies.1.glossary",
        },
        {
          id: "contentful",
          name: "Contentful",
          glossary: "services.ai-cms-integration.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-cms-integration.techStack.0.technologies.3.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-cms-integration.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-cms-integration.processSteps.0.title",
      text: "services.ai-cms-integration.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-cms-integration.processSteps.1.title",
      text: "services.ai-cms-integration.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-cms-integration.processSteps.2.title",
      text: "services.ai-cms-integration.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-cms-integration.processSteps.3.title",
      text: "services.ai-cms-integration.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-cms-integration.fitItems.0.title",
      text: "services.ai-cms-integration.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-cms-integration.fitItems.1.title",
      text: "services.ai-cms-integration.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-cms-integration.fitItems.2.title",
      text: "services.ai-cms-integration.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-cms-integration.fitItems.3.title",
      text: "services.ai-cms-integration.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-cms-integration.proofItems.0.title",
      text: "services.ai-cms-integration.proofItems.0.text",
      metricValue: "services.ai-cms-integration.proofItems.0.metricValue",
      metricLabel: "services.ai-cms-integration.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-cms-integration.faqItems.0.question",
      answer: "services.ai-cms-integration.faqItems.0.answer",
    },
    {
      question: "services.ai-cms-integration.faqItems.1.question",
      answer: "services.ai-cms-integration.faqItems.1.answer",
    },
    {
      question: "services.ai-cms-integration.faqItems.2.question",
      answer: "services.ai-cms-integration.faqItems.2.answer",
    },
    {
      question: "services.ai-cms-integration.faqItems.3.question",
      answer: "services.ai-cms-integration.faqItems.3.answer",
    },
    {
      question: "services.ai-cms-integration.faqItems.4.question",
      answer: "services.ai-cms-integration.faqItems.4.answer",
    },
    {
      question: "services.ai-cms-integration.faqItems.5.question",
      answer: "services.ai-cms-integration.faqItems.5.answer",
    },
    {
      question: "services.ai-cms-integration.faqItems.6.question",
      answer: "services.ai-cms-integration.faqItems.6.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-cms-integration.tradeoffs.0.title",
      text: "services.ai-cms-integration.tradeoffs.0.text",
    },
    {
      title: "services.ai-cms-integration.tradeoffs.1.title",
      text: "services.ai-cms-integration.tradeoffs.1.text",
    },
    {
      title: "services.ai-cms-integration.tradeoffs.2.title",
      text: "services.ai-cms-integration.tradeoffs.2.text",
    },
    {
      title: "services.ai-cms-integration.tradeoffs.3.title",
      text: "services.ai-cms-integration.tradeoffs.3.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-cms-integration.outcomes.0.title",
      value: "services.ai-cms-integration.outcomes.0.value",
      text: "services.ai-cms-integration.outcomes.0.text",
      icon: "auto-awesome",
    },
    {
      title: "services.ai-cms-integration.outcomes.1.title",
      value: "services.ai-cms-integration.outcomes.1.value",
      text: "services.ai-cms-integration.outcomes.1.text",
      icon: "code",
    },
    {
      title: "services.ai-cms-integration.outcomes.2.title",
      value: "services.ai-cms-integration.outcomes.2.value",
      text: "services.ai-cms-integration.outcomes.2.text",
      icon: "fact-check",
    },
    {
      title: "services.ai-cms-integration.outcomes.3.title",
      value: "services.ai-cms-integration.outcomes.3.value",
      text: "services.ai-cms-integration.outcomes.3.text",
      icon: "support-agent",
    },
  ],
  deliverables: [
    {
      title: "services.ai-cms-integration.deliverables.0.title",
      text: "services.ai-cms-integration.deliverables.0.text",
    },
    {
      title: "services.ai-cms-integration.deliverables.1.title",
      text: "services.ai-cms-integration.deliverables.1.text",
    },
    {
      title: "services.ai-cms-integration.deliverables.2.title",
      text: "services.ai-cms-integration.deliverables.2.text",
    },
    {
      title: "services.ai-cms-integration.deliverables.3.title",
      text: "services.ai-cms-integration.deliverables.3.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-cms-integration.mechanism.0.title",
      text: "services.ai-cms-integration.mechanism.0.text",
      diagram: "draft-flow",
    },
    {
      title: "services.ai-cms-integration.mechanism.1.title",
      text: "services.ai-cms-integration.mechanism.1.text",
      diagram: "translation-flow",
    },
    {
      title: "services.ai-cms-integration.mechanism.2.title",
      text: "services.ai-cms-integration.mechanism.2.text",
      diagram: "meta-flow",
    },
    {
      title: "services.ai-cms-integration.mechanism.3.title",
      text: "services.ai-cms-integration.mechanism.3.text",
      diagram: "approval-flow",
    },
  ],
  relevants: [
    { type: "service", slug: "corporate-websites" },
    { type: "service", slug: "software-development" },
    { type: "solution", slug: "content-generation" },
  ],
};
