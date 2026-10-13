# Article config in `articles/` + frontmatter bridge

Status: planned. The calendar is data (`content/plan/*.json`, contract in
`content/plan/contract.ts`). This plan moves the article collection config next
to the content and lets an article declare which plan row it is, so a test can
join the two.

## Part A — move the collection config into `articles/`

Today the collection lives in `src/content.config.ts`; Astro auto-reads that
path and exposes no option to point elsewhere. A true move is a spike.

**Low-risk shape.** Put the real definition in `articles/article.config.ts`
(the `news` collection, its loader and schema), and leave `src/content.config.ts`
as a one-line re-export:

```ts
export * from "../articles/article.config";
```

The source of truth moves next to the markdown, Astro still finds
`src/content.config.ts`, and the loader stays `base: "./articles"`. Confirm in
the spike that Vite resolves the re-export across `src/` → `articles/` in both
`astro build` and Vitest.

**Risks.** `tsconfig.app.json` includes only `src` and `test`; the re-export
pulls `articles/article.config.ts` into the graph, but it is not type-checked on
its own. Add `"articles/article.config.ts"` to `include` or accept graph-only
checking. A hard move (no re-export) needs a build-config hook that Astro 7 may
not offer — do not assume it.

## Part B — frontmatter bridge

Add optional fields to the schema so a published article names its plan row:

```ts
planNumber?: number;
funnel?: PlanFunnel;      // ToFu | MoFu | BoFu | HoFu
persona?: PlanPersona;    // CMO | CTO | COO-Operations | COO-Plant | …
pillar?: string;          // spoke → hub slug
targetQuery?: string;     // the row's `query`
```

**Enum source.** Import the `PLAN_*` arrays from `content/plan/contract.ts` and
build `z.enum(...)` from them, or keep zod enums and add a parity test. The
import goes `src` → `content`, against the downward import rule; if that is
unacceptable, keep the enums in zod and test them against the contract.

**Join test** (`test/content-plan.test.ts` or a new `test/article-plan.test.ts`):

- every `articles/<slug>.ru.md` with a plan row matches it on
  `funnel`, `persona`, `targetQuery`;
- every `pillar` resolves to a row and the plan graph agrees (enabler #1);
- the AEO window: `targetQuery` appears in the title, `excerpt` or the first 300
  characters (enabler #4, deterministic half).

An article without a plan row (a legacy live page) is exempt, like the
`GRANDFATHERED_FLOOR` list in `articles.test.ts`.

## Acceptance criteria

- [ ] `articles/article.config.ts` holds the collection; `src/content.config.ts`
      re-exports it; `npm run build` and `npm run test` are green.
- [ ] The schema accepts the five bridge fields; an article without them still
      validates.
- [ ] The join test maps at least one published article to its row.
- [ ] Import-direction decision recorded (contract import vs zod parity test).

## References

- Contract: `content/plan/contract.ts`.
- Current config: `src/content.config.ts`.
- Enablers: `docs/plans/content-plan-enablers.md`.
