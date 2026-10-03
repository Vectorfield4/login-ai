import type { Case } from "./cases";
import { aeoAiVisibility } from "./fixtures/aeo-ai-visibility";
import { agencyContentPipeline } from "./fixtures/agency-content-pipeline";
import { clinicAiAssistant } from "./fixtures/clinic-ai-assistant";
import { commentSentimentScoring } from "./fixtures/comment-sentiment-scoring";
import { erpDataReconciliation } from "./fixtures/erp-data-reconciliation";
import { marketplaceReputation } from "./fixtures/marketplace-reputation";
import { packagingCvInspection } from "./fixtures/packaging-cv-inspection";
import { productLaunchVideo } from "./fixtures/product-launch-video";
import { qualityVisionLine } from "./fixtures/quality-vision-line";
import { reputationMonitoringPlatform } from "./fixtures/reputation-monitoring-platform";
import { retailSupportBot } from "./fixtures/retail-support-bot";

/**
 * Single source of truth for cases. Assembled from per-item files in
 * `./fixtures/`. Content is read synchronously (SSG, no backend).
 */
export const cases: Case[] = [
  retailSupportBot,
  qualityVisionLine,
  clinicAiAssistant,
  agencyContentPipeline,
  productLaunchVideo,
  marketplaceReputation,
  reputationMonitoringPlatform,
  aeoAiVisibility,
  commentSentimentScoring,
  erpDataReconciliation,
  packagingCvInspection,
];
