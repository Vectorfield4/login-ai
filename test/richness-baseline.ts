/**
 * Richness debt for published services (plan: docs/plans/service-richness-audit.md).
 *
 * Ratchet: an entry lives only while the rule is violated. When a service is
 * brought up to the floor, delete its id — the "stale baseline" test fails while
 * an entry is no longer violated, so the list can only shrink. Drafts are not
 * listed here: they surface as warnings and never fail the suite.
 */
export const RICHNESS_BASELINE: Record<string, string[]> = {
  "software-development": ["proof>=2"],
  "highload-backend": ["proof>=2", "result-block", "faq>=4"],
  "corporate-websites": ["proof>=2", "relevants>=3+2types"],
  "landing-pages": ["proof>=2", "relevants>=3+2types"],
  "seo-aeo": ["proof>=2"],
  "information-monitoring": ["proof>=2"],
  "corporate-ai-training": ["proof>=2", "training:faq>=5"],
  "ai-infrastructure": [
    "proof>=2",
    "specialty>=2",
    "result-block",
    "faq>=4",
    "ml/ai-infra:mechanism+diagram",
  ],
  "ai-crm-integration": ["proof>=2"],
  "ai-task-tracker-integration": ["proof>=2", "ai-integrations:deliverables"],
  "ai-erp-integration": ["proof>=2"],
  "deterministic-rag-systems": ["proof>=2"],
  "ai-security-audit": ["proof>=2", "ml/ai-infra:mechanism+diagram"],
  "sovereign-model-deployment": [
    "proof>=2",
    "relevants>=3+2types",
    "ml/ai-infra:mechanism+diagram",
  ],
  "computer-vision-systems": ["proof>=2", "ml/ai-infra:mechanism+diagram"],
};
