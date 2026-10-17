import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Button, Typography } from "@/shared/ui/atoms";

type CalculatorActionsProps = {
  /** Encoded configuration carried into the CTA URL and the `mailto:` body. */
  config: string;
  lang: AppLang;
};

// Stacked full-width buttons on phones (column cross-axis stretch), a row from
// tablet up.
const styles = stylex.create({
  actions: {
    marginTop: tokens.spacing3,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
    "@media (min-width: 600px)": { flexDirection: "row", flexWrap: "wrap" },
  },
  excluded: {
    marginTop: tokens.spacing2,
    // In the phone result bar only the price, term and buttons fit.
    display: "none",
    "@media (min-width: 960px)": { display: "block" },
  },
});

/**
 * The calculator CTA: a `mailto:` carrying the configuration and a link to the
 * contacts page with the configuration in the query — the seam a future CRM
 * form reuses.
 */
export function CalculatorActions({ config, lang }: CalculatorActionsProps) {
  const t = useT(lang);
  const contacts = `${routeUrl("/contacts", lang)}?config=${encodeURIComponent(config)}`;
  const mailto = `mailto:?subject=${encodeURIComponent(
    t("calculator.title"),
  )}&body=${encodeURIComponent(config)}`;
  return (
    <>
      <Typography variant="body2" color="textSecondary" style={styles.excluded}>
        {t("calculator.excluded")}
      </Typography>
      <div {...stylex.props(styles.actions)}>
        <Button href={mailto} variant="contained" size="large">
          {t("calculator.cta")}
        </Button>
        <Button href={contacts} variant="outlined" size="large">
          {t("calculator.contacts")}
        </Button>
      </div>
    </>
  );
}

export default CalculatorActions;
