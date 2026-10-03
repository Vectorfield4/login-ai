import { agenticSystems } from "./fixtures/agentic-systems";
import { appDevelopmentSystems } from "./fixtures/app-development-systems";
import { computerVision } from "./fixtures/computer-vision";
import { contentGeneration } from "./fixtures/content-generation";
import { customerExperience } from "./fixtures/customer-experience";
import { manufacturers } from "./fixtures/manufacturers";
import { medicalClinics } from "./fixtures/medical-clinics";
import { reputationManagement } from "./fixtures/reputation-management";
import { videoGeneration } from "./fixtures/video-generation";
import type { Solution } from "./solutions";

/**
 * Single source of truth for solutions. Assembled from per-item files in
 * `./fixtures/`. Content is read synchronously (SSG, no backend).
 */
export const solutions: Solution[] = [
  agenticSystems,
  computerVision,
  customerExperience,
  contentGeneration,
  appDevelopmentSystems,
  medicalClinics,
  videoGeneration,
  manufacturers,
  reputationManagement,
];
