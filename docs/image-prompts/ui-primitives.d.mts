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

export declare const VISUAL_ARCHETYPES: {
  readonly control_dashboard: string;
  readonly spatial_lattice: string;
  readonly mainframe_rack: string;
};

export declare const VISUAL_CONTROLS: {
  readonly slider_tracks: string;
  readonly rotary_dials: string;
  readonly toggle_switches: string;
};

export type VisualControlKey = keyof typeof VISUAL_CONTROLS;

export declare function resolvePrimitiveToken(key: UIPrimitiveKey): string;
export declare function resolveDisplayElements(elements: readonly string[]): string[];
export declare function resolveControlElements(elements: readonly string[]): string[];
