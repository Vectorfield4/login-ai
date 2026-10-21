import type { RuDict } from "@/shared/i18n/ru";

export const servicesGroups: RuDict["servicesGroups"] = {
  agentic: {
    label: "Agentic systems",
    title: "AI agents with tools and memory",
    subtitle: "Autonomous scenarios: tools, memory, quality evaluation and production guardrails.",
  },
  conversational: {
    label: "Conversational systems",
    title: "Chatbots, voice agents and copilots",
    subtitle: "Support and sales in chats and calls: RAG, human handoff, quality control.",
  },
  data: {
    label: "Data",
    title: "Data for AI: collection, labeling, quality",
    subtitle:
      "Pipelines, warehouses, labeling and synthetic data: data that makes a model predictable.",
  },
  models: {
    label: "Models",
    title: "Model fine-tuning and evaluation",
    subtitle: "Fine-tuning, quality evaluation, red teaming and model observability.",
  },
  ml: {
    label: "ML services",
    title: "ML services: vision, forecasts, language",
    subtitle: "Computer vision, predictive analytics, NLP, recommendations and MLOps platforms.",
  },
  "ai-infra": {
    label: "AI infrastructure",
    title: "AI infrastructure inside your perimeter",
    subtitle: "RAG, sovereign models, token-cost control and security, all inside the company.",
  },
  security: {
    label: "AI security",
    title: "AI application security",
    subtitle: "Audit, prompt-injection defense, DLP and leak control in LLMs.",
  },
  engineering: {
    label: "Engineering",
    title: "Product engineering and high-load systems",
    subtitle: "Full-cycle product development and high-load backend systems.",
  },
  "ai-integrations": {
    label: "AI integrations",
    title: "We bring AI into your systems",
    subtitle:
      "CRM, ERP, CMS and task trackers: the agent works in the tools the team already uses.",
  },
  content: {
    label: "Content & creative",
    title: "A content pipeline for your brand",
    subtitle:
      "Text, images, video, voice, localization and presentations: one pipeline from brief to publication.",
  },
  "web-growth": {
    label: "Web & growth",
    title: "Web & growth",
    subtitle: "Corporate websites, landing pages, SEO and AEO, information monitoring.",
  },
  strategy: {
    label: "Strategy",
    title: "AI strategy and roadmap",
    subtitle:
      "Scenario selection, readiness assessment and an implementation plan with measurable stages.",
  },
  governance: {
    label: "Governance & compliance",
    title: "AI governance and compliance",
    subtitle: "Policies, risk register, model cards and EU AI Act and ISO 42001 requirements.",
  },
  training: {
    label: "Training",
    title: "Corporate AI training",
    subtitle: "Programs for teams and managers: prompt engineering and process automation.",
  },
};
