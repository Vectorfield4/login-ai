import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { ProcessItem } from "@/shared/types/content";
import { Typography } from "@/shared/ui/atoms/Typography";

interface ServiceProcessTimelineProps {
  /** i18n key of the block heading. */
  titleKey: string;
  steps: ProcessItem[];
  lang: AppLang;
}

const styles = stylex.create({
  heading: { marginBottom: tokens.spacing3 },
  timeline: {
    position: "relative",
    paddingLeft: tokens.spacing4,
  },
  line: {
    position: "absolute",
    left: 3,
    top: tokens.spacing1,
    bottom: tokens.spacing1,
    width: 2,
    backgroundColor: tokens.colorDivider,
  },
  item: {
    position: "relative",
    paddingBottom: tokens.spacing3,
    ":last-child": { paddingBottom: 0 },
  },
  dot: {
    position: "absolute",
    left: 0,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: tokens.colorPrimary,
  },
  text: { marginTop: tokens.spacing1 },
});

/** Vertical timeline of the service process steps (domain-bound molecule). */
export function ServiceProcessTimeline({ titleKey, steps, lang }: ServiceProcessTimelineProps) {
  const t = useT(lang);
  if (steps.length === 0) return null;

  return (
    <div>
      <Typography variant="h6" component="h4" style={styles.heading}>
        {t(titleKey)}
      </Typography>
      <div {...stylex.props(styles.timeline)}>
        <div {...stylex.props(styles.line)} aria-hidden="true" />
        {steps.map((step) => (
          <div key={step.title} {...stylex.props(styles.item)}>
            <div {...stylex.props(styles.dot)} aria-hidden="true" />
            <Typography variant="h6" component="h5">
              {t(step.title)}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={styles.text}>
              {t(step.text)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceProcessTimeline;
