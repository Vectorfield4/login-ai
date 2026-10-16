import * as stylex from "@stylexjs/stylex";
import { formatPrice } from "@/shared/data/format";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { PriceItem, PricePackage } from "@/shared/types/content";
import { Grid, Typography } from "@/shared/ui/atoms";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";

export { formatPrice };

const styles = stylex.create({
  price: { display: "flex", flexDirection: "column", gap: tokens.spacing1 },
  amount: { display: "flex", alignItems: "baseline", gap: tokens.spacing2, flexWrap: "wrap" },
  packages: { marginTop: tokens.spacing4 },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    padding: tokens.layoutCard,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    boxSizing: "border-box",
  },
});

/**
 * Блок стоимости: порог «от N ₽» с единицей и, у решений, сетка пакетов.
 * Страница передаёт цену из фикстуры; текст переводится здесь. Пустой блок
 * (нет ни порога, ни пакетов) не рендерится.
 */
export function PricingSection({
  price,
  packages,
  lang,
  alt,
}: {
  price?: PriceItem;
  packages?: PricePackage[];
  lang: AppLang;
  alt?: boolean;
}) {
  const t = useT(lang);
  if (!price && !packages?.length) return null;
  return (
    <BlockSection alt={alt} title={t("pricing.title")}>
      {price ? (
        <div {...stylex.props(styles.price)}>
          <div {...stylex.props(styles.amount)}>
            <Typography variant="h3" component="p" color="primary">
              {t("pricing.from")} {formatPrice(lang, price.amount)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {t(`pricing.units.${price.unit}`)}
            </Typography>
          </div>
          <Typography variant="body1" color="textSecondary">
            {t("pricing.note")}
          </Typography>
        </div>
      ) : null}
      {packages?.length ? (
        <Grid container spacing={3} equalRows style={styles.packages}>
          {packages.map((pkg) => (
            <Grid key={pkg.name} item size={12} md={4}>
              <div {...stylex.props(styles.card)}>
                <Typography variant="h6" component="h3">
                  {t(pkg.name)}
                </Typography>
                <Typography variant="h5" component="p" color="primary">
                  {pkg.from ? `${t("pricing.from")} ` : null}
                  {formatPrice(lang, pkg.amount)}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </BlockSection>
  );
}

export default PricingSection;
