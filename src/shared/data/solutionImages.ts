import type { ImageMetadata } from "astro";
import agenticSystemsImage from "@/shared/assets/images/agentic-systems.svg";
import appDevelopmentSystemsImage from "@/shared/assets/images/app-development-systems.svg";
import computerVisionImage from "@/shared/assets/images/computer-vision.svg";
import contentGenerationImage from "@/shared/assets/images/content-generation.svg";
import customerExperienceImage from "@/shared/assets/images/customer-experience.svg";
import manufacturersImage from "@/shared/assets/images/manufacturers.svg";
import medicalClinicsImage from "@/shared/assets/images/medical-clinics.svg";
import reputationManagementImage from "@/shared/assets/images/reputation-management.svg";
import videoGenerationImage from "@/shared/assets/images/video-generation.svg";

/**
 * Ассеты решений. Единственный слой, который знает про `ImageMetadata`:
 * сущности хранят `image?: string`, а страницы мапят сюда в `.astro`-frontmatter
 * (`image.src` для карточек, сам metadata — для og:image через `getImage`).
 */
export const solutionImages = {
  "agentic-systems": agenticSystemsImage,
  "app-development-systems": appDevelopmentSystemsImage,
  "computer-vision": computerVisionImage,
  "content-generation": contentGenerationImage,
  "customer-experience": customerExperienceImage,
  manufacturers: manufacturersImage,
  "medical-clinics": medicalClinicsImage,
  "reputation-management": reputationManagementImage,
  "video-generation": videoGenerationImage,
} satisfies Record<string, ImageMetadata>;

export function getSolutionImage(slug?: string): ImageMetadata | undefined {
  return slug ? solutionImages[slug as keyof typeof solutionImages] : undefined;
}
