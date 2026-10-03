import { aiCmsIntegration } from "./fixtures/ai-cms-integration";
import { aiCrmIntegration } from "./fixtures/ai-crm-integration";
import { aiErpIntegration } from "./fixtures/ai-erp-integration";
import { aiInfraCostOptimization } from "./fixtures/ai-infra-cost-optimization";
import { aiInfrastructure } from "./fixtures/ai-infrastructure";
import { aiSecurityAudit } from "./fixtures/ai-security-audit";
import { aiTaskTrackerIntegration } from "./fixtures/ai-task-tracker-integration";
import { anomalyDetectionSystems } from "./fixtures/anomaly-detection-systems";
import { computerVisionSystems } from "./fixtures/computer-vision-systems";
import { corporateAiTraining } from "./fixtures/corporate-ai-training";
import { corporateWebsites } from "./fixtures/corporate-websites";
import { deterministicRagSystems } from "./fixtures/deterministic-rag-systems";
import { highloadBackend } from "./fixtures/highload-backend";
import { informationMonitoring } from "./fixtures/information-monitoring";
import { landingPages } from "./fixtures/landing-pages";
import { mlopsPlatforms } from "./fixtures/mlops-platforms";
import { nlpSystems } from "./fixtures/nlp-systems";
import { predictiveAnalyticsSystems } from "./fixtures/predictive-analytics-systems";
import { recommendationSystems } from "./fixtures/recommendation-systems";
import { reinforcementLearningSystems } from "./fixtures/reinforcement-learning-systems";
import { seoAeo } from "./fixtures/seo-aeo";
import { softwareDevelopment } from "./fixtures/software-development";
import { sovereignModelDeployment } from "./fixtures/sovereign-model-deployment";
import { speechRecognitionSystems } from "./fixtures/speech-recognition-systems";
import type { Service } from "./services";

/**
 * Single source of truth for services, assembled from per-service files in
 * `./fixtures/`. Content is read synchronously (SSG, no backend): pages and
 * widgets resolve it through `getServices()` / `getServiceBySlug()`.
 */
export const services: Service[] = [
  softwareDevelopment,
  highloadBackend,
  corporateWebsites,
  landingPages,
  seoAeo,
  informationMonitoring,
  corporateAiTraining,
  aiInfrastructure,
  aiCrmIntegration,
  aiTaskTrackerIntegration,
  aiErpIntegration,
  aiCmsIntegration,
  aiInfraCostOptimization,
  deterministicRagSystems,
  aiSecurityAudit,
  sovereignModelDeployment,
  computerVisionSystems,
  predictiveAnalyticsSystems,
  anomalyDetectionSystems,
  mlopsPlatforms,
  nlpSystems,
  recommendationSystems,
  speechRecognitionSystems,
  reinforcementLearningSystems,
];
