import * as stylex from "@stylexjs/stylex";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { DiagramSource, MechanismItem } from "@/shared/types/content";
import { Typography } from "@/shared/ui/atoms/Typography";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";

/** Пункт механизма с уже разрешёнными на странице диаграммами. */
export type MechanismViewItem = MechanismItem & { image?: DiagramSource };

const styles = stylex.create({
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing5,
  },
  item: { display: "flex", flexDirection: "column" },
  head: { display: "flex", alignItems: "flex-start", gap: tokens.spacing2 },
  step: {
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorPrimarySoft,
    color: tokens.colorPrimary,
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
  },
  body: { display: "flex", flexDirection: "column", gap: tokens.spacing05, minWidth: 0 },
  figure: {
    margin: 0,
    marginBlockStart: tokens.spacing3,
    padding: tokens.spacing3,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    overflowX: "auto",
    display: "flex",
    justifyContent: "center",
  },
});

/**
 * Блок «как устроено»: нумерованный список этапов, у каждого — заголовок и
 * объяснение, а где есть диаграмма — статичный SVG (светлый и тёмный вариант,
 * переключает `data-theme`). Рендерится на сборке: JavaScript для диаграмм не
 * нужен, Mermaid в браузер не попадает.
 */
export function MechanismSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: MechanismViewItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  if (!items.length) return null;
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <ol itemScope itemType={schemaIri(SCHEMA_TYPE.howTo)} {...stylex.props(styles.list)}>
        {items.map((item, index) => (
          <li
            key={item.title}
            itemScope
            itemProp="step"
            itemType={schemaIri(SCHEMA_TYPE.howToStep)}
            {...stylex.props(styles.item)}
          >
            <div {...stylex.props(styles.head)}>
              <span {...stylex.props(styles.step)} aria-hidden="true">
                {item.step ?? index + 1}
              </span>
              <div {...stylex.props(styles.body)}>
                <Typography variant="h6" component="h3" itemProp="name">
                  {t(item.title)}
                </Typography>
                <Typography variant="body2" color="textSecondary" itemProp="text">
                  {t(item.text)}
                </Typography>
              </div>
            </div>
            {item.image ? (
              <figure role="img" aria-label={t(item.title)} {...stylex.props(styles.figure)}>
                <img className="diagram-light" src={item.image.light} alt="" aria-hidden="true" />
                <img className="diagram-dark" src={item.image.dark} alt="" aria-hidden="true" />
              </figure>
            ) : null}
          </li>
        ))}
      </ol>
    </BlockSection>
  );
}

export default MechanismSection;
