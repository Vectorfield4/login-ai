/**
 * A trained LLM artifact. A model is not a technology and not a library: it is
 * weights you deploy. Keeping it in its own slice lets model selection grow
 * provider and family fields without touching the engineering stack.
 */
export interface LlmModel {
  /** Stable catalog key: React key and future add-on reference. */
  slug: string;
  /** Model family name, shown as is (`Qwen`, `Llama`). */
  name: string;
  /** Vendor that publishes the weights, shown as is. */
  provider: string;
}
