---
name: find-ready-article
description: Use when finding which news articles in the login-ai repo are ready to publish — a draft (`draft: true` in articles/<slug>.ru.md) whose cover already exists under articles/images/. Triggers: "find-ready-article", "ready for publishing", "ready article", "какие статьи готовы к публикации", "статьи к публикации", "article readiness", "article cover", "articles/images/README.md".
---

# find-ready-article

One predicate, one place: an article is ready when it is a draft and its cover
file exists. The script reports that pair and nothing else — it never edits or
publishes.

| Concern | Owner |
| --- | --- |
| Is this draft's cover ready? | this script |
| Volume, frontmatter, prose, lexicon | `test/articles.test.ts` (`npm run test`) |
| Writing copy and generating the cover | `write-article` |

## Script

Run from anywhere; paths resolve from the repo root.

```
node .opencode/skills/find-ready-article/scripts/find.mjs [--json] [slug ...]
```

Without slugs it scans every `articles/*.ru.md`. `--json` prints
`{ ready, waiting }` for scripts. A ready entry carries the cover extension and a
`staleRow` flag when the slug's "Awaiting generation" row in
`articles/images/README.md` is still present.

## Procedure

1. Run the script. Each `✓` slug is a draft that already has its cover.
2. Land the cover's bookkeeping: delete the slug's row from
   `articles/images/README.md` (`staleRow` marks the ones left behind).
3. Confirm the full gate before shipping: `npm run lint`, `npm run test`,
   `npm run verify`. Those own volume, prose and the built `og:image`.
4. Publish the ready drafts (`write-article` step 9): set `draft: false` and
   remove the row together.

## Failure modes

- No drafts listed: nothing is `draft: true`, so there is nothing to publish.
- `staleRow`: the cover file exists but the README row stayed — remove it.
- A ready slug still renders a placeholder: the cover file is not a raster
  `png/jpg/jpeg/webp`, or `npm run verify` is not green.
