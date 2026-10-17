import { llmModels } from "./fixtures";
import type { LlmModel } from "./llm-model";

/** The whole model catalog. */
export const getLlmModels = (): LlmModel[] => llmModels;

/** One model by its stable slug. */
export const getLlmModelBySlug = (slug?: string): LlmModel | undefined =>
  llmModels.find((model) => model.slug === slug);

/** Resolves a service stack name (`Qwen`, `Llama`) to its model record. */
export const getLlmModelByName = (name: string): LlmModel | undefined => {
  const normalized = name.trim().toLowerCase();
  return llmModels.find((model) => model.name.trim().toLowerCase() === normalized);
};
