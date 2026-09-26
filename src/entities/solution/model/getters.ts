import { solutions } from "./fixtures";
import type { Solution } from "./solutions";

/** All solutions in fixture order. */
export const getSolutions = (): Solution[] => solutions;

/** One solution by its natural key; `undefined` for an unknown slug. */
export const getSolutionBySlug = (slug?: string): Solution | undefined =>
  solutions.find((solution) => solution.slug === slug);
