import type { LlmModel } from "./llm-model";

/** Single source of truth for the LLM models named in service stacks. */
export const llmModels: LlmModel[] = [
  { slug: "qwen", name: "Qwen", provider: "Alibaba" },
  { slug: "llama", name: "Llama", provider: "Meta" },
];
