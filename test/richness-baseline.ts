/**
 * Richness debt for published services (plan: docs/plans/service-richness-audit.md).
 *
 * Ratchet: an entry lives only while the rule is violated. When a service is
 * brought up to the floor, delete its id — the "stale baseline" test fails while
 * an entry is no longer violated, so the list can only shrink. Drafts are not
 * listed here: they surface as warnings and never fail the suite.
 * `proof>=2` is a soft rule (warning), so it never appears here.
 */
export const RICHNESS_BASELINE: Record<string, string[]> = {
  "highload-backend": ["result-block", "faq>=4"],
  "corporate-websites": ["relevants>=3+2types"],
  "landing-pages": ["relevants>=3+2types"],
  "corporate-ai-training": ["training:faq>=5"],
  "ai-infrastructure": ["specialty>=2", "result-block", "faq>=4"],
  "ai-task-tracker-integration": ["ai-integrations:deliverables"],
  "sovereign-model-deployment": ["relevants>=3+2types", "ml/ai-infra:mechanism+diagram"],
};
