import type { ImageMetadata } from "astro";
import agenticSystemsImage from "../../../assets/images/solutions/agentic-systems.svg";
import appDevelopmentSystemsImage from "../../../assets/images/solutions/app-development-systems.svg";
import computerVisionImage from "../../../assets/images/solutions/computer-vision.svg";
import contentGenerationImage from "../../../assets/images/solutions/content-generation.svg";
import customerExperienceImage from "../../../assets/images/solutions/customer-experience.svg";
import manufacturersImage from "../../../assets/images/solutions/manufacturers.svg";
import medicalClinicsImage from "../../../assets/images/solutions/medical-clinics.svg";
import reputationManagementImage from "../../../assets/images/solutions/reputation-management.svg";

/**
 * Solution asset manifest. The only layer aware of `ImageMetadata`: entities
 * keep `image?: string`, and pages map the metadata here in their frontmatter
 * (`image.src` for cards, the metadata itself for og:image via `getImage`).
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
} satisfies Record<string, ImageMetadata>;

export function getSolutionImage(slug?: string): ImageMetadata | undefined {
  return slug ? solutionImages[slug as keyof typeof solutionImages] : undefined;
}
