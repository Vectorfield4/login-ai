/**
 * The bridge between today's calculator `bundle` terms and the future add-on
 * catalogs. Every `bundle.ref` is a service; the target says what that service
 * is made of:
 *
 * - `software-type` — the integration service is replaced by a CRM/ERP add-on;
 * - `service` — the service stays a service and optionally delivers a
 *   `capability` from `entities/technology`;
 * - `open` — the role is still a question for `docs/plans/calculator/rfc.md`.
 *
 * A capability is not a technology artifact: libraries, tools and models live
 * in `entities/stack`. The calculator itself stays frozen.
 */
export type AddonTarget =
  | { kind: "software-type"; slug: string }
  | { kind: "service"; capability?: string }
  | { kind: "open"; note: string };

export const ADDON_TARGETS: Record<string, AddonTarget> = {
  "ai-crm-integration": { kind: "software-type", slug: "crm" },
  "ai-erp-integration": { kind: "software-type", slug: "erp" },
  "ai-presentations": { kind: "service", capability: "presentations" },
  "ai-security-audit": { kind: "service", capability: "ai-security" },
  "ai-video-training": { kind: "open", note: "training: service or add-on — see RFC" },
  "computer-vision-systems": { kind: "service", capability: "computer-vision" },
  "content-localization": { kind: "service", capability: "localization" },
  "deterministic-rag-systems": { kind: "service", capability: "rag" },
  "image-generation": { kind: "service", capability: "image" },
  "information-monitoring": { kind: "service", capability: "monitoring" },
  "mlops-platforms": { kind: "service", capability: "mlops" },
  "nlp-systems": { kind: "service", capability: "nlp" },
  "recommendation-systems": { kind: "service", capability: "recommendations" },
  "seo-aeo": { kind: "service", capability: "seo" },
  "sovereign-model-deployment": { kind: "service", capability: "sovereign-models" },
  "speech-recognition-systems": { kind: "service", capability: "speech-recognition" },
  "video-generation": { kind: "service", capability: "video" },
  "voice-audio-generation": { kind: "service", capability: "audio" },
};
