import { technologies } from "./fixtures";
import type { Technology, TechnologyCategory, TechnologyFamily } from "./technology";

const FAMILY_NAME_KEYS: Record<TechnologyFamily, string> = {
  llm: "technologies.llm",
  "computer-vision": "technologies.computerVision",
  agentic: "technologies.agentic",
  video: "technologies.video",
  image: "technologies.image",
  audio: "technologies.audio",
  rag: "technologies.rag",
  nlp: "technologies.nlp",
};

/** The whole catalog in fixture order. */
export const getTechnologies = (): Technology[] => technologies;

/** One technology by its stable slug. */
export const getTechnologyBySlug = (slug?: string): Technology | undefined =>
  technologies.find((technology) => technology.slug === slug);

/** Technologies of one global bucket. */
export const getTechnologiesByCategory = (category: TechnologyCategory): Technology[] =>
  technologies.filter((technology) => technology.category === category);

/** Granular AI features that belong to a broad capability family. */
export const getTechnologyChildren = (slug: string): Technology[] =>
  technologies.filter((technology) => technology.family === slug);

/** i18n key of a family label; families are keys, not records. */
export const getTechnologyFamilyNameKey = (family: TechnologyFamily): string =>
  FAMILY_NAME_KEYS[family];

/** Label key for a translated capability; `undefined` for proper nouns. */
export const getTechnologyLabelKey = (slug: string): string | undefined =>
  getTechnologyBySlug(slug)?.nameKey;
