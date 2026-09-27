import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { Grid } from "@/shared/ui/atoms/Grid";
import { Typography } from "@/shared/ui/atoms/Typography";
import type { TechGroup, TechItem } from "../../model/services";

/** Words inside `[...]` are tech names: they render inverted, not as text. */
const TECH_TOKEN = /(\[[^\]]+\])/g;

const styles = stylex.create({
  group: { height: "100%", display: "flex", flexDirection: "column", gap: tokens.spacing15 },
  chips: { display: "flex", flexWrap: "wrap", gap: tokens.spacing1 },
  chipWrap: { position: "relative", display: "inline-flex" },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    padding: `${tokens.spacing05} ${tokens.spacing1}`,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorText,
    backgroundColor: tokens.colorSurface,
    border: `1px solid ${tokens.colorDivider}`,
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
  chipOpen: {
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
  inverted: {
    padding: "1px 6px",
    backgroundColor: tokens.colorPrimary,
    // Red on red would hide the border, so the outline takes the dark step.
    border: `1px solid ${tokens.colorPrimaryDark}`,
    borderRadius: tokens.radiusShape,
    color: tokens.colorPrimaryContrastText,
  },
});

/** Splits a translated description, turning every `[TechName]` into a chip. */
function renderDescription(text: string): ReactNode[] {
  let token = 0;
  return text.split(TECH_TOKEN).map((part) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span key={token++} {...stylex.props(styles.inverted)}>
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}

function TechChip({
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
    <span {...stylex.props(styles.chipWrap)}>
      <button
        type="button"
        aria-describedby={tooltipId}
        {...stylex.props(styles.chip, open && styles.chipOpen)}
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
 * Service stack as engineering groups: a heading, a description with inverted
 * `[TechName]` tokens, and chips that explain a technology on hover, focus, or
 * tap. One tooltip at a time; every glossary text stays in the HTML.
 */
export function TechStackBlock({ groups, lang }: { groups: TechGroup[]; lang: AppLang }) {
  const t = useT(lang);
  const [openId, setOpenId] = useState<string | null>(null);
  const tooltipBaseId = useId();

  return (
    <Grid container spacing={3}>
      {groups.map((group, groupIndex) => (
        <Grid key={group.subtitle} item size={12} md={6}>
          <Card>
            <CardContent style={styles.group}>
              <Typography variant="h6" component="h3">
                {t(group.subtitle)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {renderDescription(t(group.description))}
              </Typography>
              <div {...stylex.props(styles.chips)}>
                {group.technologies.map((item) => (
                  <TechChip
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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
