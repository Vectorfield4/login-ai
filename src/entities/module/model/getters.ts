import { isPublished } from "@/shared/data/publishable";
import { modules } from "./fixtures";
import type { Module } from "./modules";

/** Published modules in fixture order; drafts are not generated. */
export const getModules = (): Module[] => modules.filter(isPublished);

/** One published module by its natural key; `undefined` for a draft or unknown slug. */
export const getModuleBySlug = (slug?: string): Module | undefined =>
  modules.find((module) => module.slug === slug && isPublished(module));
