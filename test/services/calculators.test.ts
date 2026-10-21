import { describe, expect, it } from "vitest";
import { getServices } from "@/entities/service";
import { getSolutions } from "@/entities/solution";

/**
 * Curated coverage guard for the estimator platform. Every service and solution
 * whose spec is authored by hand is listed here; the test fails if one of them
 * loses its `calculator`, or if a spec appears without being added to the list.
 * Coverage grows deliberately, one authored spec at a time — never by bulk
 * template attachment.
 */
const CALCULATOR_SERVICES = [
  "ai-agents",
  "ai-chatbots",
  "ai-voice-agents",
  "corporate-copilot",
  "ai-1c-integration",
  "ai-bitrix24-integration",
  "ai-amocrm-integration",
  "ai-telegram",
  "ai-max",
  "ai-n8n-make",
  "ai-support-automation",
  "speech-analytics",
  "ai-sales-agents",
  "ai-recruiter",
  "ai-workflow-automation",
  "data-engineering",
  "data-annotation",
  "synthetic-data",
  "data-readiness-audit",
  "conversational-bi",
  "llm-fine-tuning",
  "llm-evaluation",
  "ai-forecasting",
  "ai-consulting",
  "ai-readiness-audit",
  "ai-pilot",
  "ai-center-of-excellence",
  "ai-governance-compliance",
  "ai-security-gateway",
  "document-processing",
  "ai-application-rescue",
  "prompt-engineering",
  "content-generation",
  "video-generation",
  "image-generation",
  "voice-audio-generation",
  "content-localization",
  "ai-presentations",
  "corporate-ai-training",
  "ai-text-training",
  "ai-image-training",
  "ai-video-training",
  "ai-voice-training",
  "ai-localization-training",
  "ai-presentations-training",
  "software-development",
  "highload-backend",
  "ai-crm-integration",
  "ai-task-tracker-integration",
  "ai-erp-integration",
  "ai-cms-integration",
  "ai-infrastructure",
  "ai-infra-cost-optimization",
  "deterministic-rag-systems",
  "ai-security-audit",
  "sovereign-model-deployment",
  "computer-vision-systems",
  "predictive-analytics-systems",
  "anomaly-detection-systems",
  "mlops-platforms",
  "nlp-systems",
  "recommendation-systems",
  "speech-recognition-systems",
  "reinforcement-learning-systems",
  "corporate-websites",
  "landing-pages",
  "seo-aeo",
  "seo",
  "aeo",
  "geo-ai-search",
  "ai-for-site",
  "information-monitoring",
] as const;

const CALCULATOR_SOLUTIONS = [
  "content-generation",
  "agentic-systems",
  "computer-vision",
  "customer-experience",
  "app-development-systems",
  "medical-clinics",
  "manufacturers",
  "reputation-management",
] as const;

const sorted = (values: readonly string[]): string[] => [...values].sort();

describe("calculator coverage", () => {
  it("услуги с калькулятором совпадают с ручным списком", () => {
    const actual = getServices()
      .filter((service) => service.calculator)
      .map((service) => service.slug);
    expect(sorted(actual)).toEqual(sorted(CALCULATOR_SERVICES));
  });

  it("решения с калькулятором совпадают с ручным списком", () => {
    const actual = getSolutions()
      .filter((solution) => solution.calculator)
      .map((solution) => solution.slug);
    expect(sorted(actual)).toEqual(sorted(CALCULATOR_SOLUTIONS));
  });
});
