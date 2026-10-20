import type {
  UIPrimitiveKey,
  VisualCompositionKey,
  VisualControlKey,
  VisualEmblemKey,
} from "../docs/image-prompts/ui-primitives.mjs";

export type QueueKind = "article" | "service" | "solution";

/** Only software semantics are permitted; industrial / anthropomorphic is banned. */
export type SemanticDomain = "software";

export type VisualFocalElement =
  | "quantum_crystal"
  | "laser_prism"
  | "monolithic_cube"
  | "automation_bot"
  | "monolith_microphone"
  | "laser_scanner_head"
  | "keyhole_portal"
  | "glowing_orb";

export type VisualEnvironmentGlow =
  | "laser_lines"
  | "precise_vectors"
  | "volumetric_beams"
  | "conic_projection"
  | "ambient_aurora"
  | "radial_frequency_waves"
  | "glowing_bus_traces";

/** Structured scene spec the builder compiles into the `{{VISUAL_IDEA}}` slot. */
export interface VisualConfig {
  focal_element: VisualFocalElement;
  environment_glow: VisualEnvironmentGlow;
  /** Up to three UI primitive design tokens rendered within the composition. */
  display_elements: UIPrimitiveKey[];
  /**
   * One clean domain sign (a medical cross, a gear), so the frame reads as its
   * domain instead of a generic software node. Falls back to the abstract
   * `focal_element` when omitted. Allowed keys: `VisualEmblemKey`
   * in `docs/image-prompts/ui-primitives.d.mts`.
   */
  emblem?: VisualEmblemKey;
  /**
   * Scene staging override. When omitted, a deterministic key is derived from
   * the slug through `docs/image-prompts/composition.mjs`. The same composition
   * pool and prompt template serve every entity kind.
   */
  composition?: VisualCompositionKey;
  /** Physical input organs; added when the solution carries control semantics. */
  control_layer?: VisualControlKey[];
  /** Context filter; only `software` is allowed. */
  semantic_domain?: SemanticDomain;
}

export interface QueueEntry {
  kind: QueueKind;
  slug: string;
  title: string;
  keywords: string[];
  /** @deprecated free-form scene; superseded by `visual_config`. */
  story?: string;
  /** Structured scene spec; preferred over `story` when both are present. */
  visual_config?: VisualConfig;
  /** Short Latin topic the opener interpolates; falls back to `keywords`. */
  topic?: string;
  /**
   * Short Latin subject of the image — the concrete entity the frame is about.
   * Required for `service` and `solution` records; feeds the `{{OBJECT}}` slot.
   */
  object?: string;
}

export const ROOT: string;
export const QUEUE_PATH: string;
export const KIND_DIRS: Record<QueueKind, string>;
export const KINDS: QueueKind[];

export function targetRel(kind: QueueKind, slug: string): string;
export function targetPath(kind: QueueKind, slug: string): string;
export function readQueue(): QueueEntry[];
export function getEntry(kind: QueueKind, slug: string): QueueEntry | undefined;
export function pendingSlugs(kind?: QueueKind): string[];
export function removeEntry(kind: QueueKind, slug: string): number;
export function setStory(kind: QueueKind, slug: string, story: string): QueueEntry;
export function setTopic(kind: QueueKind, slug: string, topic: string): QueueEntry;
export function setObject(kind: QueueKind, slug: string, object: string): QueueEntry;
export function setVisualConfig(kind: QueueKind, slug: string, config: VisualConfig): QueueEntry;
export function setKeywords(kind: QueueKind, slug: string, keywords: string[]): QueueEntry;
export function addEntry(entry: QueueEntry): QueueEntry;
