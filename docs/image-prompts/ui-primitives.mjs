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
 * Composition library — camera, staging and backdrop for all image kinds.
 *
 * The style block fixes materials, light and the crimson accent, but says
 * nothing about framing. Without this axis every record compiled to the same
 * centered "dark void with three panels" silhouette. `visual_config.composition`
 * or the slug-derived helper picks a view; the builder interpolates four phrases:
 *
 * - `camera` — viewpoint and perspective
 * - `backdrop` — what sits behind the subject
 * - `formation` — how the screens sit (holds the `{{SCREENS}}` placeholder)
 * - `focal` — where the crimson focal object sits
 *
 * Every entity kind uses this pool. Keep the same keys in
 * `ui-primitives.d.mts`.
 */
const CAMERA_COMPOSITIONS = {
  orbital_hub: {
    camera:
      "A high three-quarter camera looks down into the construct, the depth axis running diagonally across the frame.",
    backdrop:
      "Behind it, a deep charcoal void carries a faint radial glow that fades to black at the edges.",
    formation:
      "orbit the hub at staggered depths and tilted angles, none of them parallel to the picture plane: {{SCREENS}}",
    focal: "just left of the optical center, raised above the ring of panels",
  },
  corridor_descent: {
    camera:
      "A low eye-level camera looks straight down a receding corridor in one-point perspective, the vanishing point off-center to the right.",
    backdrop: "The far end of the corridor dissolves into cold graphite haze.",
    formation:
      "are set flush into the corridor walls at different distances, each tilted toward the camera: {{SCREENS}}",
    focal: "at the vanishing point in the mid-distance, partially screened by foreground blades",
  },
  macro_lens: {
    camera:
      "An extreme macro camera pushes close to a precision optical assembly that fills the left half of the frame, with very shallow depth of field.",
    backdrop:
      "The background falls off into a smooth out-of-focus gradient from steel grey to black.",
    formation: "hover diagonally in front of the optics like inspection targets: {{SCREENS}}",
    focal: "deep inside the lens core on the left, glowing through the aperture",
  },
  flat_lay_studio: {
    camera: "A perfectly top-down camera looks onto the scene as a flat lay, with no horizon line.",
    backdrop:
      "The scene rests on a matte brushed-graphite studio table with soft raking light and long thin shadows.",
    formation:
      "lie flat on the table, fanned at different rotations like physical print proofs: {{SCREENS}}",
    focal: "off-center toward the lower right, resting on the table beside the proofs",
  },
  side_profile_console: {
    camera:
      "A side-profile camera at desk height looks across the console from the left, so the scene reads as strong horizontal layers.",
    backdrop: "Behind the console, a soft vertical gradient shifts from smoke grey to near-black.",
    formation:
      "stand edge-on along the console depth, overlapping like a paper fan seen from the side: {{SCREENS}}",
    focal: "at the far right end of the console, near the front edge",
  },
  isometric_line: {
    camera:
      "A true isometric camera looks down at forty-five degrees, so the subject reads as a miniature model.",
    backdrop: "The line stands on a dark matte plinth surrounded by empty charcoal space.",
    formation:
      "stand upright along the line like station markers, each turned toward the isometric camera: {{SCREENS}}",
    focal: "at the head of the line in the lower-left quadrant",
  },
  threshold_frontal: {
    camera:
      "A frontal one-point camera faces the threshold dead-on, level and calm, with strict symmetry.",
    backdrop: "Beyond the threshold, a clean cool white-to-grey gradient glows softly.",
    formation: "form the side walls and the floating lintel of the threshold: {{SCREENS}}",
    focal: "at the center of the threshold, at chest height, framed by the side walls",
  },
  ascending_diagonal: {
    camera:
      "A three-quarter camera follows a strong diagonal that climbs from the lower-left corner to the upper-right.",
    backdrop:
      "The backdrop is a cool graphite gradient with a faint pale rim light tracing the diagonal.",
    formation:
      "step upward along the diagonal at increasing height and decreasing scale: {{SCREENS}}",
    focal: "near the upper-right end of the diagonal, catching the rim light",
  },
};

/**
 * Trade staging archetypes — distinct workspace silhouettes for business scenes.
 *
 * Services are trade scenes, not software consoles: the frame has to read as the
 * place the work happens, so these keys describe staging and camera, never a
 * centered abstract node. `visual_config.composition` picks one, and the builder
 * interpolates the four phrases:
 *
 * - `camera` — viewpoint and perspective
 * - `backdrop` — the room/surface behind the subject
 * - `formation` — how the screens sit (holds the `{{SCREENS}}` placeholder)
 * - `focal` — where the crimson focal object sits
 *
 * Repeating a key across slugs is allowed; variety comes from the subject and
 * concrete props, not from a unique camera per entity.
 */
const TRADE_COMPOSITIONS = {
  desk_workspace: {
    camera:
      "A medium eye-level camera looks across a thin desk from the operator's left, so the workbench runs horizontally through the frame.",
    backdrop:
      "Behind the desk, a matte graphite wall falls into a soft vertical gradient with a single narrow band of cool light.",
    formation: "stand on the desk at staggered depths, angled toward the operator: {{SCREENS}}",
    focal: "on the desk just left of center, beside the operator's hands",
  },
  factory_floor: {
    camera:
      "A wide low camera looks down a receding row of workstations, so the floor and its equipment carry the depth.",
    backdrop:
      "The far end of the floor dissolves into cold industrial haze beneath a high concrete ceiling.",
    formation:
      "stand upright along the row like station markers, each turned toward the aisle: {{SCREENS}}",
    focal: "at the head of the row in the lower-left quadrant, on a steel plinth",
  },
  document_flow: {
    camera:
      "A high three-quarter camera looks down onto a wide table, with the work surface filling the lower two-thirds.",
    backdrop:
      "The table edge and a dark, uncluttered floor beyond it close the frame without a horizon.",
    formation:
      "lie flat along the direction of the paper flow, overlapping like inspection panes: {{SCREENS}}",
    focal: "mid-flow, where the source stack meets the finished stack",
  },
  call_center: {
    camera:
      "A high quarter camera looks down across a curved operator console, close enough to read the headsets and the desk edge.",
    backdrop: "Behind the console, acoustic panels and a warm rim light fade into near-black.",
    formation: "hover above the console in a shallow arc, tilted toward the operator: {{SCREENS}}",
    focal: "at the right end of the console, next to the headset rest",
  },
  control_room: {
    camera:
      "A wide symmetrical camera looks over the shoulder of one seated operator toward a dashboard wall.",
    backdrop: "The dashboard wall glows faintly at the far end of a dark, calm operations room.",
    formation:
      "are mounted into the dashboard wall and the side consoles, facing the operator: {{SCREENS}}",
    focal: "on the operator's desk, below the center of the dashboard wall",
  },
  before_after_split: {
    camera:
      "A straight-on camera frames a vertical seam that divides the workspace into a before side and an after side.",
    backdrop:
      "The same matte wall runs behind both halves, so only the state of the work distinguishes them.",
    formation: "lean against the seam on both sides, mirroring the two states: {{SCREENS}}",
    focal: "on the seam itself, at the height where the work changes hands",
  },
  close_up_tool: {
    camera:
      "An extreme close-up camera pushes onto a single trade instrument, with shallow depth of field and the instrument filling the left half.",
    backdrop:
      "The background falls off into a smooth out-of-focus gradient from steel grey to black.",
    formation: "hover diagonally beside the instrument like calibration targets: {{SCREENS}}",
    focal: "inside the instrument's working area, glowing through its aperture",
  },
  wide_workshop: {
    camera:
      "A wide eye-level camera looks straight across a long workbench, with no operator in frame.",
    backdrop: "Above the bench, a dark pegboard wall holds the silhouette of hanging tools.",
    formation: "stand along the back edge of the bench, spaced like labelled stations: {{SCREENS}}",
    focal: "on the bench in the left third, resting on the work surface",
  },
  review_process: {
    camera:
      "A side camera at table height looks along a review table, with one moderator silhouette at the far head.",
    backdrop:
      "The room beyond the table is a calm dark void with a single soft overhead pool of light.",
    formation: "stand upright along the table, turned toward the moderator: {{SCREENS}}",
    focal: "at the moderator's end of the table, in front of the stacked reports",
  },
  boardroom: {
    camera:
      "A long three-quarter camera looks down a boardroom table toward the head seat, with deep perspective.",
    backdrop:
      "The far wall carries a muted screen glow; the rest of the room stays dark and uncluttered.",
    formation:
      "hang along the far wall and the side of the table, angled toward the head seat: {{SCREENS}}",
    focal: "at the head of the table, in front of the chair",
  },
};

/** One composition pool for articles, services and solutions. */
export const VISUAL_COMPOSITIONS = {
  ...CAMERA_COMPOSITIONS,
  ...TRADE_COMPOSITIONS,
};

/**
 * Control layer — physical input organs. Add only when the subject carries
 * management / moderation / control semantics, so the frame reads as an
 * interactive console rather than a passive status scene.
 */
export const VISUAL_CONTROLS = {
  slider_tracks:
    "three physical tactile slider tracks with metallic fader knobs set to variable levels",
  rotary_dials: "a row of miniature precise rotary tuning knobs milled into the dark slate base",
  toggle_switches: "two premium mechanical toggle switches with glowing crimson status indicators",
};

/**
 * Domain emblems — one clean, polished 3D sign of the subject. Use an emblem
 * when the subject has one unambiguous symbol (a medical cross, a gear), so the
 * frame reads as that domain instead of a generic software node.
 *
 * How to add an emblem:
 * 1. Add a key here with a NOUN PHRASE that starts with "a"/"an" — the compiler
 *    interpolates it verbatim as the focal object.
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
