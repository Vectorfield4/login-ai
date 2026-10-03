import { isPublished } from "@/shared/data/publishable";
import { solutions } from "./fixtures";
import type { Solution } from "./solutions";

/** Published solutions in fixture order; drafts are not generated. */
export const getSolutions = (): Solution[] => solutions.filter(isPublished);

/** One published solution by its natural key; `undefined` for a draft or unknown slug. */
export const getSolutionBySlug = (slug?: string): Solution | undefined =>
  solutions.find((solution) => solution.slug === slug && isPublished(solution));
