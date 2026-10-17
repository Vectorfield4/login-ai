import { technologies } from "./fixtures";
import type { Technology, TechnologyCategory } from "./technology";

/** The whole catalog in fixture order. */
export const getTechnologies = (): Technology[] => technologies;

/** One technology by its stable slug. */
export const getTechnologyBySlug = (slug?: string): Technology | undefined =>
  technologies.find((technology) => technology.slug === slug);

/** Technologies of one global bucket. */
export const getTechnologiesByCategory = (category: TechnologyCategory): Technology[] =>
  technologies.filter((technology) => technology.category === category);

/** Label key for a translated capability; `undefined` for proper nouns. */
export const getTechnologyLabelKey = (slug: string): string | undefined =>
  getTechnologyBySlug(slug)?.nameKey;
