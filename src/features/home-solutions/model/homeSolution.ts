import type { Solution } from "@/entities/solution";

/**
 * Trimmed solution shape handed to the home island: the page builds it from
 * the entity data so the hydrated payload stays small.
 */
export interface HomeSolution {
  slug: string;
  navTitle: string;
  tagline: string;
  image?: string;
  audiences: string[];
  tags: string[];
}

/**
 * Narrows a full solution to the island input. `imageSrc` comes from the page
 * (`getSolutionImage(slug)?.src`): entities never see `ImageMetadata`, so the
 * asset is substituted above the layers.
 */
export function toHomeSolution(solution: Solution, imageSrc?: string): HomeSolution {
  return {
    slug: solution.slug,
    navTitle: solution.navTitle,
    tagline: solution.tagline,
    image: imageSrc,
    audiences: solution.audiences,
    tags: solution.tags,
  };
}
