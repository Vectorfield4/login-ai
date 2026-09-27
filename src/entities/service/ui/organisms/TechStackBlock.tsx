import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Typography } from "@/shared/ui/atoms/Typography";
import type { TechGroup, TechItem } from "../../model/services";

/** Words inside `[...]` are tech names: they render as a mark, not as text. */
const TECH_TOKEN = /(\[[^\]]+\])/g;

const styles = stylex.create({
  list: { display: "flex", flexDirection: "column" },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing15,
    paddingBlockEnd: tokens.spacing4,
  },
  // Every group after the first starts below a hairline: the rhythm of a
  // definition list instead of the frames the cards used to draw.
  groupDivided: {
    paddingBlockStart: tokens.spacing4,
    borderBlockStart: `1px solid ${tokens.colorDivider}`,
  },
  // Full-width paragraph would run past 100 characters, so the measure is capped.
  lead: { maxWidth: 780 },
  cards: { display: "flex", flexWrap: "wrap", gap: tokens.spacing1 },
  cardWrap: { position: "relative", display: "inline-flex" },
  card: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    minWidth: "160px",
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    fontSize: tokens.sizeBody2,
    fontWeight: tokens.weightH6,
    lineHeight: tokens.lineBody2,
    textAlign: "center",
    color: tokens.colorText,
    // A sunken fill reads as a card on both the section background and the
    // alternating one, unlike a solid surface color that merges with one of them.
    backgroundColor: tokens.colorSurfaceSunken,
    border: `1px dotted ${tokens.colorDivider}`,
    borderRadius: tokens.radiusShape,
    cursor: "pointer",
    transition:
      `background-color ${tokens.durationShortest} ${tokens.easingInOut}, ` +
      `border-color ${tokens.durationShortest} ${tokens.easingInOut}`,
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: "1px",
    },
  },
  cardOpen: {
    backgroundColor: tokens.colorPrimarySoft,
    borderColor: tokens.colorPrimary,
  },
  tooltip: {
    position: "absolute",
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: tokens.zTooltip,
    boxSizing: "border-box",
    width: "260px",
    padding: tokens.spacing15,
    borderRadius: tokens.radiusShape,
    border: `1px solid ${tokens.colorDivider}`,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    boxShadow: tokens.shadow8,
    fontSize: "0.8125rem",
    lineHeight: 1.45,
    textAlign: "left",
    pointerEvents: "none",
    opacity: 0,
    visibility: "hidden",
    transition: `opacity ${tokens.durationShort} ${tokens.easingOut}`,
  },
  tooltipOpen: { opacity: 1, visibility: "visible" },
  // Square mark: a border plus a large radius on a one-line box left visible
  // notches around the word, and the horizontal padding doubled the gap. The
  // space from the sentence stays in the text, so the mark only adds 3px.
  mark: {
    padding: "0 3px",
    backgroundColor: tokens.colorPrimary,
    color: tokens.colorPrimaryContrastText,
    fontWeight: tokens.weightH6,
    whiteSpace: "nowrap",
  },
});

/** Splits a translated description, turning every `[TechName]` into a mark. */
function renderDescription(text: string): ReactNode[] {
  let token = 0;
  return text.split(TECH_TOKEN).map((part) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span key={token++} {...stylex.props(styles.mark)}>
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}

function TechCard({
  item,
  lang,
  open,
  tooltipId,
  onOpen,
  onClose,
}: {
  item: TechItem;
  lang: AppLang;
  open: boolean;
  tooltipId: string;
  onOpen: () => void;
  onClose: () => void;
}) {
  const t = useT(lang);
  return (
    <span {...stylex.props(styles.cardWrap)}>
      <button
        type="button"
        aria-describedby={tooltipId}
        {...stylex.props(styles.card, open && styles.cardOpen)}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        onFocus={onOpen}
        onBlur={onClose}
        // Hover and focus already open the tooltip. A click matters on touch
        // screens, where there is no hover to begin with.
        onClick={onOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
      >
        {item.name}
      </button>
      <span
        role="tooltip"
        id={tooltipId}
        data-state={open ? "open" : "closed"}
        {...stylex.props(styles.tooltip, open && styles.tooltipOpen)}
      >
        {t(item.glossary)}
      </span>
    </span>
  );
}

/**
 * Service stack as a top-to-bottom list of engineering groups: an h3 heading, a
 * description whose `[TechName]` tokens render as marks, and cards that explain a
 * technology on hover, focus, or tap. One tooltip at a time; every glossary text
 * stays in the HTML.
 */
export function TechStackBlock({ groups, lang }: { groups: TechGroup[]; lang: AppLang }) {
  const t = useT(lang);
  const [openId, setOpenId] = useState<string | null>(null);
  const tooltipBaseId = useId();

  return (
    <div {...stylex.props(styles.list)}>
      {groups.map((group, groupIndex) => (
        <div
          key={group.subtitle}
          {...stylex.props(styles.group, groupIndex > 0 && styles.groupDivided)}
        >
          <Typography variant="h5" component="h3">
            {t(group.subtitle)}
          </Typography>
          <Typography variant="body1" color="textSecondary" style={styles.lead}>
            {renderDescription(t(group.description))}
          </Typography>
          <div {...stylex.props(styles.cards)}>
            {group.technologies.map((item) => (
              <TechCard
                lang={lang}
                key={item.id}
                item={item}
                open={openId === item.id}
                tooltipId={`${tooltipBaseId}-${groupIndex}-${item.id}`}
                onOpen={() => setOpenId(item.id)}
                onClose={() => setOpenId(null)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
