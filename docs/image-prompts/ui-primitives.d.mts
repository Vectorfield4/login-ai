export declare const UI_PRIMITIVES: {
  readonly generic: {
    readonly telemetry_grid: string;
    readonly analytics_chart: string;
    readonly bar_chart: string;
    readonly checkmark_dashboard: string;
    readonly data_nodes: string;
    readonly percentage_radial: string;
  };
  readonly content: {
    readonly filmstrip: string;
    readonly waveform_plate: string;
    readonly waveform: string;
    readonly text_layout: string;
    readonly timeline_tracks: string;
    readonly media_stack: string;
    readonly code_editor: string;
    readonly vector_canvas: string;
  };
  readonly cx: {
    readonly chat_threads: string;
    readonly user_avatars: string;
    readonly routing_matrix: string;
    readonly service_logos: string;
    readonly headset_glyph: string;
    readonly ticket_slots: string;
    readonly feedback_stars: string;
  };
  readonly reputation: {
    readonly star_rating: string;
    readonly sentiment_counters: string;
    readonly feedback_card: string;
    readonly defect_block: string;
    readonly security_shield: string;
    readonly validation_badge: string;
    readonly trend_heatmap: string;
    readonly alert_bell_icon: string;
  };
};

export type GenericPrimitive = keyof typeof UI_PRIMITIVES.generic;
export type ContentPrimitive = keyof typeof UI_PRIMITIVES.content;
export type CxPrimitive = keyof typeof UI_PRIMITIVES.cx;
export type ReputationPrimitive = keyof typeof UI_PRIMITIVES.reputation;

export type UIPrimitiveKey =
  | GenericPrimitive
  | ContentPrimitive
  | CxPrimitive
  | ReputationPrimitive;

export interface VisualComposition {
  /** Viewpoint and perspective of the frame. */
  readonly camera: string;
  /** What sits behind the subject. */
  readonly backdrop: string;
  /** How the screens sit; holds the `{{SCREENS}}` placeholder. */
  readonly formation: string;
  /** Where the crimson focal object sits. */
  readonly focal: string;
}

/** Shared scene compositions for every image kind, derived from the entity slug. */
export declare const VISUAL_COMPOSITIONS: {
  readonly orbital_hub: VisualComposition;
  readonly corridor_descent: VisualComposition;
  readonly macro_lens: VisualComposition;
  readonly flat_lay_studio: VisualComposition;
  readonly side_profile_console: VisualComposition;
  readonly isometric_line: VisualComposition;
  readonly threshold_frontal: VisualComposition;
  readonly ascending_diagonal: VisualComposition;
  readonly desk_workspace: VisualComposition;
  readonly factory_floor: VisualComposition;
  readonly document_flow: VisualComposition;
  readonly call_center: VisualComposition;
  readonly control_room: VisualComposition;
  readonly before_after_split: VisualComposition;
  readonly close_up_tool: VisualComposition;
  readonly wide_workshop: VisualComposition;
  readonly review_process: VisualComposition;
  readonly boardroom: VisualComposition;
};

export type VisualCompositionKey = keyof typeof VISUAL_COMPOSITIONS;

export declare const VISUAL_CONTROLS: {
  readonly slider_tracks: string;
  readonly rotary_dials: string;
  readonly toggle_switches: string;
};

export type VisualControlKey = keyof typeof VISUAL_CONTROLS;

/**
 * One clean, polished 3D sign of the subject, chosen via `visual_config.emblem`.
 * Unlike the abstract `focal_element`, an emblem makes the frame read as its
 * domain (a medical cross, a gear).
 *
 * **To add an emblem:** add a key to `VISUAL_EMBLEMS` in `ui-primitives.mjs` as
 * a NOUN PHRASE starting with "a"/"an" (no leading "polished single" — the
 * compiler adds the framing), then add the same key to this union. Keep each
 * emblem ONE clean object: no clutter, text, logos, faces or damaged material.
 */
export declare const VISUAL_EMBLEMS: {
  readonly medical_cross: string;
  readonly gear: string;
  readonly eye_lens: string;
  readonly headset: string;
  readonly clapperboard: string;
  readonly quill: string;
  readonly star: string;
  readonly node_hub: string;
  readonly terminal_cursor: string;
  readonly shield: string;
  readonly cart: string;
  readonly beaker: string;
};

export type VisualEmblemKey = keyof typeof VISUAL_EMBLEMS;

export declare function resolvePrimitiveToken(key: UIPrimitiveKey): string;
export declare function resolveDisplayElements(elements: readonly string[]): string[];
export declare function resolveControlElements(elements: readonly string[]): string[];
export declare function resolveEmblem(key?: VisualEmblemKey): string | undefined;
