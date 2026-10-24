/**
 * Keyword motifs — the enhancer dictionary for the cover/backdrop builder.
 *
 * A queue record carries exactly ten English `keywords`; each one resolves to a
 * concrete physical object (a motif) that the builder injects into the
 * `{{VISUAL_IDEA}}` slot. Keywords are a controlled vocabulary: a keyword that
 * is missing here fails the queue guard (`test/generation-queue.test.ts`), so a
 * cover is always built from motifs the dictionary can name.
 *
 * Motifs are physical objects, never people, faces or readable lettering; they
 * sit inside the abstract software scene and name the subject the way a prop
 * names a trade (a theatrical mask for `deepfake`, a wax-sealed document for
 * `consent`). Types live in `keyword-motifs.d.mts`.
 */
export const KEYWORD_MOTIFS = {
  // AI, software and automation
  ai: "a matte black neural-core orb",
  automation: "a chain of glowing relay nodes",
  agent: "a small articulated actuator arm cradling a glass task card",
  agents: "a cluster of small articulated actuator arms",
  chatbot: "a pair of floating speech-bubble glass panes",
  llm: "a monolithic slate block etched with token rows",
  model: "a sealed translucent compute module",
  inference: "a single beam passing through a polished prism",
  rag: "a lattice of document sheets feeding one glowing socket",
  chunking: "a long document strip cut into even matte blocks",
  embedding: "a nest of nested translucent shells",
  prompt: "a stack of engraved command plates",
  fine_tuning: "a calibration jig clamped over a glowing model core",
  neural_network: "a suspended web of interlinked glass nodes",
  mlops: "a rack of sealed model modules under a focused lamp",
  benchmark: "a graduated measuring rail with a single marker",
  deployment: "a sealed module sliding into a rack slot",
  api: "a pair of mating socket connectors",
  integration: "two slate blocks joined by a glowing seam",
  toolkit: "an open matte tray of connector blocks",
  connector: "a single brass connector pin on a felt pad",
  crm: "a tiered card-filing console",
  erp: "a grid of interlocked ledger blocks",
  cms: "a stack of page plates slotted in a rail",
  database: "a column of stacked data discs",
  cloud: "a weightless cluster of frosted modules",
  server: "a vertical blade rack of matte modules",
  infrastructure: "a wide platform of interlocking support beams",
  backend: "a dense bank of matte processing fins",
  highload: "a wide conduit of converging light channels",
  data: "a field of floating micro-data cubes",
  dataset: "a tray of tagged sample blocks",
  analytics: "a rising line-graph plate",
  dashboard: "a tiered console of blank dial panels",
  monitoring: "a ring of watchful sensor lenses",
  telemetry: "a grid of small calibrated gauges",
  anomaly: "a single displaced bead in a calm row",
  predictive: "a trend plate rising past a marker notch",
  recommendation: "a shelf of boxes with three lifted forward",
  personalization: "a set of matched tag plates",
  search: "a small magnifier resting over a slate page",
  nlp: "a paper strip with small floating tag chips",
  entity: "small suspended tag chips above a document strip",
  extraction: "a pair of tweezers lifting a chip from a page",
  computer_vision: "a calibrated camera lens mounted on a rail",
  camera: "a precision camera lens on a matte base",
  sensor: "a small sensor dome on a matte puck",
  rl_learning: "a set of blank gear pieces looping on a rail",
  simulator: "a matte grid board with movable tokens",
  scheduling: "a row of evenly spaced time blocks",
  security: "a reinforced vault door with a glowing seam",
  privacy: "a sealed opaque glass envelope",
  encryption: "an interlocked cipher ring",
  injection: "a sealed vial inside a protective cage",
  bug_bounty: "a board of small blank reward chips",
  permissions: "a ring of blank keycards by a single gate",
  incident: "a toppled marker cone beside a calm console",
  risk: "a balance scale tipped to one side",
  audit: "a stamped certification seal on a matte plate",

  // Content, media and language
  content: "a fan of blank card sheets",
  text: "a floating manuscript plate",
  image: "a framed frosted glass picture",
  video: "a levitating filmstrip loop",
  audio: "an oscillating waveform plate",
  voice: "a monolith microphone on a stand",
  speech: "a mirrored acoustic dish",
  podcast: "a boom microphone over a blank console",
  webinar: "a lectern before a wide blank screen",
  presentation: "a fan of blank slide plates",
  localization: "two mirrored page plates split by frosted glass",
  translation: "a frosted glass pane between two sheets",
  glossary: "an indexed lexicon binder",
  branding: "a set of matched colour swatch plates",
  design: "a vector artboard with anchor pins",
  seo: "a rising magnifier over a slate page",
  aeo: "a glowing answer-card plate",
  marketing: "a funnel of stacked glass plates",
  advertising: "a blank billboard frame on a stand",
  campaign: "a fan of blank channel cards",
  conversion: "a narrowing funnel of light",
  social_media: "a cluster of blank message tiles",
  email: "a sealed envelope with a glowing edge",
  media: "a wide bank of blank screen panels",
  filmstrip: "a coiled strip of blank film frames",
  interview: "a recorder between two blank documents",
  ama: "a semicircle of blank placards before a microphone",
  webinar_qa: "a raised blank card before a muted microphone",
  digest: "a fan of four quarter-plates",
  podcast_production: "a boom microphone aimed at a blank console",
  brand_style: "a row of frames settling onto one palette",

  // Legal, trust and reputation
  deepfake: "a stylized theatrical mask on a display stand",
  synthetic_media: "a hovering mirrored card catching two light sources",
  likeness: "a blank portrait frame holding a light silhouette",
  consent: "a signed document with a wax seal",
  copyright: "a stamped seal pressed on a matte plate",
  license: "a framed permit card on a stand",
  contract: "a folded, sealed contract",
  legal: "a balanced scale of slate",
  law: "a matte gavel block",
  regulation: "a frosted glass gate",
  compliance: "a bound rulebook with a metal clasp",
  marking: "a small tag label on a fine tether",
  transparency: "a clear crystal window",
  ethics: "a balanced plumb of light",
  trust: "an unbroken chain link",
  reputation: "a rising star-rating plate",
  review: "a stack of feedback cards",
  sentiment: "a balanced plus-minus dial",
  feedback: "a tray of comment slips",
  moderation: "a gated slot sorting blank cards",
  marketplace: "a row of small storefront plates",
  ecommerce: "a floating matte shopping basket",
  customer: "a blank service counter bell",
  support: "a headset resting on a slate hook",
  ticket: "a fan of service tickets",
  retail: "a rack of blank product blocks",
  question: "a raised blank placard",
  rating: "a five-point star plate",
  complaint: "a single blank alert card on a tray",

  // Manufacturing and operations
  manufacturing: "a matte press block over a tray of parts",
  factory: "a vertical bank of blank control dials",
  quality: "a magnifier over a matte sample",
  defect: "a textured sample block with one flawed chip",
  inspection: "a precision camera lens over a part",
  packaging: "a nested tray of matte cartons",
  conveyor: "a rail of evenly spaced matte trays",
  bearing: "a real metal bearing resting on a matte tray",
  maintenance: "a folded service cloth beside a matte part",
  equipment: "a rack of matte machine modules",
  production: "a queue of blank output bins",
  workshop: "a long matte bench with clamped parts",

  // Business, org and learning
  efficiency: "a narrowed hourglass of light",
  productivity: "a stack of completed task plates",
  optimization: "a tuned pair of dials on a slate base",
  cost: "a small stack of blank metal coins",
  budget: "a divided ledger plate",
  roi: "an ascending bar plate",
  investment: "a rising stack of blank chips",
  planning: "a matte board of movable blocks",
  forecast: "a trend plate with a marked horizon notch",
  growth: "a rising staircase of slate blocks",
  roadmap: "a looping rail of milestone plates",
  release: "a broken wax seal on a slate plate",
  training: "a small stack of blank manuals",
  education: "a lectern before a wide blank board",
  university: "a frosted glass disc over a document",
  partnership: "two slate blocks joined by a low bridge",
  team: "a row of blank name plates",
  hiring: "a fan of blank résumé sheets",
  community: "a ring of blank placards",
  hackathon: "a long table strewn with idea cards",
  scholarship: "a framed certificate plate",
  program: "a bound programme booklet",
  case: "a bound case dossier",
  comparison: "two identical blocks under twin lamps",
  market: "a row of blank price tags",
  regulation_market: "a frosted glass gate beside a price tag",
  rollout: "a row of blank deployment cards",
  year_review: "four quarter-plates aligned into one board",
  checkout: "a matte checkout slot at the end of a funnel",
  website: "a blank browser frame on a stand",
  landing: "a single blank page plate",
  funnel: "a narrowing glass funnel catching light",

  // UI/UX and 3D design
  wireframe: "a stack of translucent layout sheets with grey placeholders",
  prototype: "a hinged wireframe board with raised click pads",
  design_system: "a grid of identical component tiles on a rail",
  figma: "an artboard easel with pinned layer cards",

  // 3D and architecture
  floorplan: "a flat plan plate with wall segments and door arcs",
  whitebox: "a bare room shell with matte surfaces",
  interior: "a cutaway room vignette on a wooden base",
  render3d: "a lit camera frame aimed at a miniature room",
  viewer3d: "a browser frame holding a small rotatable model",
  material_switch: "a fan of material swatches beside a lit sample",
};

/**
 * Resolve the motif for one keyword, or `undefined` when the keyword is unknown.
 * Matching is case-insensitive and trims whitespace.
 */
export function keywordMotif(keyword) {
  return KEYWORD_MOTIFS[String(keyword).trim().toLowerCase()];
}

/**
 * Map a keyword list to its motifs: unknown keywords are dropped, duplicates
 * collapse, and the result is capped so the scene stays readable.
 */
export function resolveKeywordMotifs(keywords, limit = 3) {
  const out = [];
  for (const keyword of keywords) {
    const motif = keywordMotif(keyword);
    if (motif && !out.includes(motif)) out.push(motif);
    if (out.length >= limit) break;
  }
  return out;
}

/** Every keyword the dictionary can name. */
export function knownKeywords() {
  return Object.keys(KEYWORD_MOTIFS);
}
