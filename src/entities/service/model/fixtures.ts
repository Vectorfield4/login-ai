import { threeDDesign } from "./fixtures/3d-design";
import { aeo } from "./fixtures/aeo";
import { ai1cIntegration } from "./fixtures/ai-1c-integration";
import { aiAgents } from "./fixtures/ai-agents";
import { aiAmocrmIntegration } from "./fixtures/ai-amocrm-integration";
import { aiApplicationRescue } from "./fixtures/ai-application-rescue";
import { aiBitrix24Integration } from "./fixtures/ai-bitrix24-integration";
import { aiCenterOfExcellence } from "./fixtures/ai-center-of-excellence";
import { aiChatbots } from "./fixtures/ai-chatbots";
import { aiCmsIntegration } from "./fixtures/ai-cms-integration";
import { aiConsulting } from "./fixtures/ai-consulting";
import { aiCrmIntegration } from "./fixtures/ai-crm-integration";
import { aiErpIntegration } from "./fixtures/ai-erp-integration";
import { aiForSite } from "./fixtures/ai-for-site";
import { aiForecasting } from "./fixtures/ai-forecasting";
import { aiGovernanceCompliance } from "./fixtures/ai-governance-compliance";
import { aiImageTraining } from "./fixtures/ai-image-training";
import { aiInfraCostOptimization } from "./fixtures/ai-infra-cost-optimization";
import { aiInfrastructure } from "./fixtures/ai-infrastructure";
import { aiLocalizationTraining } from "./fixtures/ai-localization-training";
import { aiMax } from "./fixtures/ai-max";
import { aiN8nMake } from "./fixtures/ai-n8n-make";
import { aiPilot } from "./fixtures/ai-pilot";
import { aiPresentations } from "./fixtures/ai-presentations";
import { aiPresentationsTraining } from "./fixtures/ai-presentations-training";
import { aiReadinessAudit } from "./fixtures/ai-readiness-audit";
import { aiRecruiter } from "./fixtures/ai-recruiter";
import { aiSalesAgents } from "./fixtures/ai-sales-agents";
import { aiSecurityAudit } from "./fixtures/ai-security-audit";
import { aiSecurityGateway } from "./fixtures/ai-security-gateway";
import { aiSupportAutomation } from "./fixtures/ai-support-automation";
import { aiTaskTrackerIntegration } from "./fixtures/ai-task-tracker-integration";
import { aiTelegram } from "./fixtures/ai-telegram";
import { aiTextTraining } from "./fixtures/ai-text-training";
import { aiVideoTraining } from "./fixtures/ai-video-training";
import { aiVoiceAgents } from "./fixtures/ai-voice-agents";
import { aiVoiceTraining } from "./fixtures/ai-voice-training";
import { aiWorkflowAutomation } from "./fixtures/ai-workflow-automation";
import { anomalyDetectionSystems } from "./fixtures/anomaly-detection-systems";
import { computerVisionSystems } from "./fixtures/computer-vision-systems";
import { contentGeneration } from "./fixtures/content-generation";
import { contentLocalization } from "./fixtures/content-localization";
import { conversationalBi } from "./fixtures/conversational-bi";
import { corporateAiTraining } from "./fixtures/corporate-ai-training";
import { corporateCopilot } from "./fixtures/corporate-copilot";
import { corporateWebsites } from "./fixtures/corporate-websites";
import { dataAnnotation } from "./fixtures/data-annotation";
import { dataEngineering } from "./fixtures/data-engineering";
import { dataReadinessAudit } from "./fixtures/data-readiness-audit";
import { deterministicRagSystems } from "./fixtures/deterministic-rag-systems";
import { documentProcessing } from "./fixtures/document-processing";
import { geoAiSearch } from "./fixtures/geo-ai-search";
import { highloadBackend } from "./fixtures/highload-backend";
import { imageGeneration } from "./fixtures/image-generation";
import { informationMonitoring } from "./fixtures/information-monitoring";
import { landingPages } from "./fixtures/landing-pages";
import { llmEvaluation } from "./fixtures/llm-evaluation";
import { llmFineTuning } from "./fixtures/llm-fine-tuning";
import { mlopsPlatforms } from "./fixtures/mlops-platforms";
import { nlpSystems } from "./fixtures/nlp-systems";
import { predictiveAnalyticsSystems } from "./fixtures/predictive-analytics-systems";
import { promptEngineering } from "./fixtures/prompt-engineering";
import { recommendationSystems } from "./fixtures/recommendation-systems";
import { reinforcementLearningSystems } from "./fixtures/reinforcement-learning-systems";
import { seo } from "./fixtures/seo";
import { seoAeo } from "./fixtures/seo-aeo";
import { softwareDevelopment } from "./fixtures/software-development";
import { sovereignModelDeployment } from "./fixtures/sovereign-model-deployment";
import { speechAnalytics } from "./fixtures/speech-analytics";
import { speechRecognitionSystems } from "./fixtures/speech-recognition-systems";
import { syntheticData } from "./fixtures/synthetic-data";
import { uiUxDesign } from "./fixtures/ui-ux-design";
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
  uiUxDesign,
  threeDDesign,
  seoAeo,
  seo,
  aeo,
  geoAiSearch,
  aiForSite,
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
  aiAgents,
  aiChatbots,
  aiVoiceAgents,
  corporateCopilot,
  ai1cIntegration,
  aiBitrix24Integration,
  aiAmocrmIntegration,
  aiTelegram,
  aiMax,
  aiN8nMake,
  aiSupportAutomation,
  speechAnalytics,
  aiSalesAgents,
  aiRecruiter,
  aiWorkflowAutomation,
  dataEngineering,
  dataAnnotation,
  syntheticData,
  dataReadinessAudit,
  conversationalBi,
  llmFineTuning,
  llmEvaluation,
  aiForecasting,
  aiConsulting,
  aiReadinessAudit,
  aiGovernanceCompliance,
  aiSecurityGateway,
  documentProcessing,
  aiApplicationRescue,
  promptEngineering,
  aiPilot,
  aiCenterOfExcellence,
];
