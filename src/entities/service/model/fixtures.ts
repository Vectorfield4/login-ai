import { aiCmsIntegration } from "./fixtures/ai-cms-integration";
import { aiCrmIntegration } from "./fixtures/ai-crm-integration";
import { aiErpIntegration } from "./fixtures/ai-erp-integration";
import { aiImageTraining } from "./fixtures/ai-image-training";
import { aiInfraCostOptimization } from "./fixtures/ai-infra-cost-optimization";
import { aiInfrastructure } from "./fixtures/ai-infrastructure";
import { aiLocalizationTraining } from "./fixtures/ai-localization-training";
import { aiPresentations } from "./fixtures/ai-presentations";
import { aiPresentationsTraining } from "./fixtures/ai-presentations-training";
import { aiSecurityAudit } from "./fixtures/ai-security-audit";
import { aiTaskTrackerIntegration } from "./fixtures/ai-task-tracker-integration";
import { aiTextTraining } from "./fixtures/ai-text-training";
import { aiVideoTraining } from "./fixtures/ai-video-training";
import { aiVoiceTraining } from "./fixtures/ai-voice-training";
import { anomalyDetectionSystems } from "./fixtures/anomaly-detection-systems";
import { computerVisionSystems } from "./fixtures/computer-vision-systems";
import { contentGeneration } from "./fixtures/content-generation";
import { contentLocalization } from "./fixtures/content-localization";
import { corporateAiTraining } from "./fixtures/corporate-ai-training";
import { corporateWebsites } from "./fixtures/corporate-websites";
import { deterministicRagSystems } from "./fixtures/deterministic-rag-systems";
import { highloadBackend } from "./fixtures/highload-backend";
import { imageGeneration } from "./fixtures/image-generation";
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
import { videoGeneration } from "./fixtures/video-generation";
import { voiceAudioGeneration } from "./fixtures/voice-audio-generation";
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
  contentGeneration,
  videoGeneration,
  imageGeneration,
  voiceAudioGeneration,
  contentLocalization,
  aiPresentations,
  corporateAiTraining,
  aiTextTraining,
  aiImageTraining,
  aiVideoTraining,
  aiVoiceTraining,
  aiLocalizationTraining,
  aiPresentationsTraining,
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
