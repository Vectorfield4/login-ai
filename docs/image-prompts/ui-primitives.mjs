/**
 * UI Primitives Library — one domain-stratified dictionary of explicit visual
 * tokens for the cover/backdrop scene compiler.
 *
 * A `visual_config.display_elements` entry is either a key from this dictionary
 * (preferred) or a legacy free-text phrase. `resolveDisplayElements` maps keys to
 * their prompt phrase and passes unknown strings through untouched, so old
 * records keep compiling. Types live in `ui-primitives.d.mts`.
 */
export const UI_PRIMITIVES = {
  generic: {
    telemetry_grid: "a precision telemetry grid with micro-data cells",
    analytics_chart: "a clean line-graph plotting a rising data trend",
    bar_chart: "a modular vertical bar chart tracking performance metrics",
    checkmark_dashboard: "a system status dashboard with glowing validation checkmarks",
    data_nodes: "an interconnected matrix of micro-data nodes",
    percentage_radial: "a minimalist circular radial gauge tracking processing efficiency",
  },
  content: {
    filmstrip: "a vector filmstrip with clean transparent frame thumbnails",
    waveform_plate: "a matte plate engraved with an oscillating audio waveform",
    waveform: "a rising acoustic voice waveform monitor",
    text_layout: "a schematic article text block with paragraph indicators",
    timeline_tracks: "a multi-track editing timeline with clip markers",
    media_stack: "a vertical stack of floating cards with image and video icons",
    code_editor: "an etched code-editor window with structured syntax lines",
    vector_canvas: "a graphic design artboard wireframe with vector anchor points",
  },
  cx: {
    chat_threads: "overlapping speech bubbles with neon chat lines",
    user_avatars: "a panel of outlined user silhouettes with operator headset icons",
    routing_matrix: "a tree diagram of request-routing paths",
    service_logos: "square slate plates with neon external-service icons",
    headset_glyph: "a sleek communications widget with light-engraved headset glyphs",
    ticket_slots: "a systematic service matrix layout mapping open support tickets",
    feedback_stars: "a localized micro-panel showing glowing customer rating stars",
  },
  reputation: {
    star_rating: "a bold glass panel laser-engraved with a glowing five-star rating matrix",
    sentiment_counters: "graphic blocks with plus and minus signs marking sentiment tone",
    feedback_card: "a review card with text lines and a validation badge",
    defect_block: "a physical textured block with a chip or crack lit by a laser",
    security_shield: "a glass user-profile widget with a neon shield and verification check",
    validation_badge: "a sleek security panel showcasing clean verification badges",
    trend_heatmap: "a dense analytical calendar matrix mapping brand mention velocity",
    alert_bell_icon: "an etched notifications widget featuring a miniature glowing alert symbol",
  },
};

/**
 * Environment archetypes (axis A) — they set the construct only, never the
 * geometry. No industrial or anthropomorphic framing: a software console, a
 * weightless computing void, or a hardware mainframe rack.
 */
export const VISUAL_ARCHETYPES = {
  control_dashboard:
    "configured as a high-end physical software console with tiered dashboards of sandblasted anodized dark slate",
  spatial_lattice:
    "configured as a weightless computing void where elements float in a spacious spatial lattice with deep perspective",
  mainframe_rack:
    "configured as a premium hardware mainframe rack with deep, monolithic architectural slots and vertical server-blade structures",
};

/**
 * Control layer — physical input organs. Added only when a solution carries
 * management / moderation / control semantics, so the frame reads as an
 * interactive console rather than a passive status screen.
 */
export const VISUAL_CONTROLS = {
  slider_tracks:
    "three physical tactile slider tracks with metallic fader knobs set to variable levels",
  rotary_dials: "a row of miniature precise rotary tuning knobs milled into the dark slate base",
  toggle_switches: "two premium mechanical toggle switches with glowing crimson status indicators",
};

/**
 * Domain emblems — one clean, polished 3D sign of the subject, placed at the
 * absolute focal center. Use an emblem when the solution's domain has one
 * unambiguous symbol (a medical cross, a gear), so the frame reads as that
 * domain instead of a generic software node.
 *
 * How to add an emblem:
 * 1. Add a key here with a NOUN PHRASE that starts with "a"/"an" — the compiler
 *    interpolates it verbatim after "At the absolute focal center sits …".
 * 2. Keep it ONE clean object: no clutter, text, logos, faces or damage.
 * 3. Add the same key to `VisualEmblemKey` in `ui-primitives.d.mts`.
 */
export const VISUAL_EMBLEMS = {
  medical_cross: "a clean three-dimensional medical cross",
  gear: "a precision-machined metallic gear",
  eye_lens: "a glass camera-lens ring with an iris",
  headset: "a sleek communications headset",
  clapperboard: "a matte film clapperboard",
  quill: "a stylized writing quill",
  star: "a bold five-point star",
  node_hub: "a cluster of interlocking glowing nodes",
  terminal_cursor: "a glowing terminal cursor block",
  shield: "a polished glass shield",
  cart: "a minimal polished shopping cart",
  beaker: "a laboratory beaker with a soft glow",
};

/**
 * Resolve a known design token to its prompt phrase. Strict: a key missing from
 * the dictionary throws, so a typo in a typed caller fails loudly.
 */
export function resolvePrimitiveToken(key) {
  for (const domain of Object.values(UI_PRIMITIVES)) {
    if (Object.hasOwn(domain, key)) return domain[key];
  }
  throw new Error(`CRITICAL: UI Primitive design token "${key}" is missing from the dictionary.`);
}

/**
 * Resolve a list where each item is either a known token (mapped) or a legacy
 * raw phrase (passed through). Backward-compatible with unmigrated records.
 */
export function resolveDisplayElements(elements) {
  return elements.map((element) => {
    for (const domain of Object.values(UI_PRIMITIVES)) {
      if (Object.hasOwn(domain, element)) return domain[element];
    }
    return element;
  });
}

/** Resolve control-layer tokens; an unknown key is dropped, never thrown. */
export function resolveControlElements(elements) {
  return elements.map((element) => VISUAL_CONTROLS[element]).filter(Boolean);
}

/**
 * Resolve a domain-emblem key to its focal noun phrase. Returns `undefined` for
 * a missing/unknown key, so the compiler falls back to the abstract
 * `focal_element` instead of throwing.
 */
export function resolveEmblem(key) {
  return key ? VISUAL_EMBLEMS[key] : undefined;
}
