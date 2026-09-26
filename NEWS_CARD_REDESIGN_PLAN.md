# News Card Redesign Plan — 2026 Best Practices

## Current State Analysis

**What exists:**
- `NewsCard` (organism): meta (date · reading time), title, description, tags, "read more"
- `NewsIndexList`: 1-col mobile → 2-col desktop (900px+)
- `NewsSection`: 3-col grid via shared UI Grid
- No images, no icons, flat hierarchy, minimal visual distinction

**Pain points:**
- No visual hierarchy beyond typography
- No thumbnail/image support (though `NewsItem.ogImage` exists in data)
- Tags as chips but no category/icon differentiation
- "Read more" looks like plain text, not a CTA
- No hover/focus states for interactivity feedback
- Rigid grid (2 or 3 cols) — no fluid/responsive card sizing

---

## 2026 Best Practice Principles for News/Article Cards

| Principle | 2026 Standard |
|-----------|---------------|
| **Media-first** | Thumbnail/image mandatory; fallback to illustrated placeholder |
| **Fluid layouts** | Container queries / CSS Grid `auto-fit` + `minmax()` — no fixed breakpoints |
| **Semantic HTML** | `<article>` + `<header>`/`<footer>`, proper heading levels |
| **Micro-interactions** | Hover lift, focus-visible ring, image zoom, link underline animation |
| **Category badges** | Icon + label, color-coded by topic (not generic chips) |
| **Reading time** | Icon (clock) + text, visually grouped with date |
| **Author/Source** | Avatar + name + role (if applicable) |
| **Accessibility** | `aria-labelledby`, focus order, reduced-motion respected |
| **Dark mode** | Native via CSS custom properties (StyleX tokens) |
| **Image containment** | Subtle outline on thumbnails to prevent background bleed |
| **Typography polish** | `text-wrap: balance` on titles; `font-variant-numeric: tabular-nums` on metadata |
| **Excerpt discipline** | Written-for-card excerpt (2–3 lines, ~100 chars), not auto-truncated |
| **Elevation variants** | Flat / raised / outlined — match context (raised for grids, flat for feeds) |
| **Density variants** | Comfortable / default / compact padding via tokens |
| **CLS protection** | Explicit image width/height or aspect-ratio reservation |

---

## Redesign Plan

### 1. Data Layer — Extend `NewsItem` (no breaking changes)

```typescript
// src/shared/data/news.ts — add optional fields
interface NewsItem {
  // ...existing
  ogImage?: ImageMetadata;           // already exists
  category?: NewsCategory;           // NEW: 'insights' | 'case-study' | 'research' | 'product'
  author?: { name: string; avatar?: string; role?: string }; // NEW
  featured?: boolean;                // NEW: for hero/featured styling
  excerpt?: string;                  // NEW: written-for-card excerpt (~100 chars)
}
```

Category mapping in `toNewsItem()` from frontmatter `category` field.

---

### 2. New Atom Components (in `shared/ui/atoms/`)

| Component | Purpose | Status |
|-----------|---------|--------|
| `NewsThumbnail` | Responsive `<picture>` with `ogImage`, blur placeholder, aspect-ratio 16:9 | ⏳ Pending |
| `NewsCategoryBadge` | Icon + label, color per category (StyleX vars) | ⏳ Pending |
| `NewsMeta` | Composed: `<time>` + `<ReadingTimeIcon>` + optional author avatar | ⏳ Pending |
| `NewsCTA` | Styled link with arrow icon, hover underline animation | ⏳ Pending |
| `NewsSkeleton` | Loading skeleton matching card structure | ⏳ Pending |
| `NewsPlaceholder` | **DONE** — SVG illustrations per category (16:9, themed) | ✅ Complete |

Icons from `lucide-react`: `Clock`, `Tag`, `BookOpen`, `FlaskConical`, `Box`, `User`, `ExternalLink`, `ArrowRight`.

---

### 3. Redesigned `NewsCard` (organism) — **Horizontal-Reverse Layout**

**Decision:** Text left, image right (matches RBC/dense news feeds). Title top, category bottom.

```html
<article class="news-card">
  <a href="..." class="card-link" aria-labelledby="title-123">
    <div class="card-content" style="flex: 1; min-width: 0;">
      <header class="card-header">
        <h2 id="title-123" class="card-title">{item.title}</h2>
        <p class="card-excerpt">{item.excerpt ?? item.description}</p>
      </header>
      <footer class="card-footer">
        <NewsMeta 
          date={item.publishedLabel} 
          isoDate={item.publishedIso}
          readingTime={item.readingTimeMin}
          author={item.author}
          category={item.category}
        />
      </footer>
    </div>
    <div class="card-thumbnail" style="width: 40%; aspect-ratio: 3/2; flex-shrink: 0;">
      <NewsThumbnail image={item.ogImage} category={item.category} alt="" aria-hidden="true" />
    </div>
  </a>
</article>
```

**Key layout points:**
- `display: flex` on card link, `flex-direction: row-reverse` (image right)
- Content area: `flex: 1`, `min-width: 0` (prevents overflow)
- Thumbnail: fixed ~40% width, 3:2 aspect ratio
- Title at top (2 lines max, `text-wrap: balance`)
- Excerpt middle (1-2 lines, clamped)
- Meta at bottom: category + relative time + optional author
- Category rendered as **text label** (not badge on image) — per your preference

**StyleX tokens additions** (`tokens.stylex.ts`):
```typescript
// Card sizing
cardGap: '1.5rem',
cardRadius: '12px',
// Elevation variants
cardShadowFlat: 'none',
cardShadowRaised: '0 4px 24px -8px rgba(0,0,0,0.08)',
cardShadowRaisedHover: '0 12px 40px -12px rgba(0,0,0,0.12)',
cardShadowOutlined: '0 0 0 1px var(--color-border)',
// Thumbnail (horizontal-reverse: 3:2, ~40% width)
thumbAspectRatioHorizontal: '3 / 2',
thumbRadius: '8px',
thumbOutline: '0 0 0 1px rgba(0,0,0,0.06) inset', // containment
// Category label (bottom meta, not badge)
categoryLabelSize: '0.75rem',
categoryLabelWeight: 500,
// Transitions
transitionFast: '150ms cubic-bezier(0.2, 0, 0, 1)',
transitionNormal: '250ms cubic-bezier(0.2, 0, 0, 1)',
// Density variants
densityComfortable: '1.5rem',   // 24px
densityDefault: '1rem',         // 16px
densityCompact: '0.75rem',      // 12px
```

**Key interactions:**
- Hover: card lifts (`transform: translateY(-4px)`), shadow deepens, thumbnail scales 1.02x
- Focus-visible: 2px outline offset 2px using `tokens.colorFocus`
- Reduced motion: disable transforms, keep color changes

---

### 4. Responsive Grid — Container Queries (modern)

Replace fixed breakpoints with **container queries** on the grid wrapper:

```css
/* NewsIndexList / NewsSection grid wrapper */
.news-grid {
  container-type: inline-size;
  display: grid;
  gap: var(--spacing-3);
  grid-template-columns: 1fr;
}

@container (min-width: 320px) {
  .news-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
}

@container (min-width: 720px) {
  .news-grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
}
```

This gives **fluid columns** (1 → 2 → 3 → 4) based on actual container width, not viewport.

---

### 5. Featured/Hero Card Variant

For `item.featured === true` (first item on index, or manually flagged):

- Spans 2 columns in 3+ col layout
- Larger thumbnail (aspect-ratio 2:1)
- Title `h4` / `h5` variant
- Shows author + category prominently
- Optional: short tagline under title

---

### 6. Additional Polish Details (from 2026 research)

| Detail | Implementation |
|--------|----------------|
| **Image containment** | `thumbOutline` token: subtle inset outline on thumbnail prevents bleed into card background in both light/dark modes |
| **Title balance** | `text-wrap: balance` on `.card-title` — eliminates orphan words on last line |
| **Tabular numerals** | `font-variant-numeric: tabular-nums` on `.card-meta` — dates/reading time don't jump when values change |
| **Excerpt discipline** | Frontmatter `excerpt` field (separate from `description`); fallback to first 160 chars of body with clean sentence boundary |
| **CLS protection** | `NewsThumbnail` renders `<picture>` with explicit `width`/`height` or `aspect-ratio` — no layout shift on image load |
| **Click target docs** | JSDoc on `NewsCard`: "Whole card is clickable; secondary actions (bookmark, share) must stop propagation" |

---

### 7. Empty & Loading States

- `NewsSkeleton` atom: animated placeholder matching card structure
- `NewsEmptyState`: illustration + CTA (already exists, enhance with icon)

---

### 8. Implementation Steps (Ordered)

| Step | File(s) | Description | Status |
|------|---------|-------------|--------|
| 1 | `tokens.stylex.ts` | Add new design tokens (shadows, radii, transitions, aspect ratios, density, elevation variants) | ⏳ |
| 2 | `shared/ui/atoms/NewsThumbnail.tsx` | `<picture>` with LQIP, blur-up, `ImageMetadata`, CLS protection, category fallback to `NewsPlaceholder` | ⏳ |
| 3 | `shared/ui/atoms/NewsCategoryLabel.tsx` | Text label + icon for bottom meta (not badge), color per category | ⏳ |
| 4 | `shared/ui/atoms/NewsMeta.tsx` | Composed meta line: date · reading time · category · author, tabular numerals | ⏳ |
| 5 | `shared/ui/atoms/NewsCTA.tsx` | Styled link with arrow, hover underline animation | ⏳ |
| 6 | `shared/ui/atoms/NewsSkeleton.tsx` | Loading skeleton matching horizontal-reverse card structure | ⏳ |
| 7 | `shared/ui/atoms/NewsPlaceholder.tsx` | **DONE** — SVG illustrations per category (16:9, themed, dark-mode ready) | ✅ |
| 8 | `entities/news/ui/organisms/NewsCard.tsx` | Full rewrite: horizontal-reverse flex, title top, excerpt middle, meta bottom, image right | ⏳ |
| 9 | `entities/news/ui/organisms/NewsIndexList.tsx` | Container-query grid, density variant | ⏳ |
| 10 | `features/relevant-items/ui/NewsSection.tsx` | Use new grid, pass category if available | ⏳ |
| 11 | `news.ts` / `newsCollection.ts` | Add `category`, `author`, `featured`, `excerpt` to `NewsItem` & parser | ⏳ |
| 12 | i18n (`ru/en/newsPage.ts`) | Add category labels, relative time strings, any new strings | ⏳ |
| 13 | Tests | Update `NewsCard.test.tsx`, add visual regression if available | ⏳ |

---

### 9. Migration Notes

- **No breaking API changes**: `NewsCardProps` stays `{ item, t }` — new fields optional
- **Backward compatible**: Cards without `ogImage`/`category`/`author`/`excerpt` render gracefully
- **StyleX only**: No Tailwind, no CSS modules — all styles via `stylex.create`
- **No new deps**: Uses existing `lucide-react`, `stylex`, `tokens`
- **Layout**: Horizontal-reverse (text left, image right) — not vertical media-first

---

### 10. Acceptance Criteria

- [ ] Cards display thumbnail (or branded SVG placeholder) at 3:2, ~40% width on right
- [ ] Category label + icon visible at bottom of content area (not on image)
- [ ] Title at top, 2 lines max, `text-wrap: balance`
- [ ] Excerpt middle, 1-2 lines clamped
- [ ] Meta at bottom: relative time + category + optional author
- [ ] Hover: lift + shadow + thumbnail zoom 1.02x (respects `prefers-reduced-motion`)
- [ ] Focus-visible ring on keyboard navigation
- [ ] Fluid grid: 1/2/3/4 columns based on container width (container queries)
- [ ] Featured card spans 2 cols when space allows
- [ ] Dark mode works via tokens (no hardcoded colors)
- [ ] CLS protection: explicit width/height or aspect-ratio on all images
- [ ] `npm run test` + `npm run lint` + `npm run build` pass
- [ ] `npm run verify:dist` passes (og:image raster check)

---

## Visual Reference (Textual) — Horizontal-Reverse Layout

```
┌────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────┐ ┌───────────────┐  │
│ │ Как ИИ-агенты сократили время           │ │               │  │  ← Title (2 lines max)
│ │ обработки заявок на 60%                 │ │  Thumbnail    │  │
│ │                                         │ │  (3:2 ratio)  │  │
│ │ Внедрение мультиагентной системы...     │ │               │  │  ← Excerpt (1-2 lines)
│ │                                         │ │   ~40% width  │  │
│ │                                         │ │               │  │
│ │ 📊 Insights  ·  15 мин назад  ·  👤 A.  │ │               │  │  ← Meta bottom
│ │ Иванов                                  │ │               │  │
│ └─────────────────────────────────────────┘ └───────────────┘  │
└────────────────────────────────────────────────────────────────┘
  ▲ Content (flex:1)                    ▲ Image (fixed 40%)
```

---

## Next Steps

1. Review plan — confirm scope (all steps or phased)
2. Start with Step 1 (tokens) + Step 2-6 (atoms) in parallel
3. Then organism rewrite (Step 7)
4. Grid updates (Steps 8-9)
5. Data layer + i18n (Steps 10-11)
6. Tests + verification (Step 12)

**Estimated effort**: ~2-3 days for full implementation including tests.