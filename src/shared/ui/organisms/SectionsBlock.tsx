import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { tokens } from "../../design/tokens.stylex.ts";
import type { ContentSection } from "../../types/content";
import { Card, CardContent } from "../atoms/Card";
import { Dot } from "../atoms/Dot";
import Stack from "../atoms/Stack";
import { Typography } from "../atoms/Typography";

type SectionsBlockProps = {
  sections: ContentSection[];
  lang: AppLang;
  style?: StyleXStyles;
};

const styles = stylex.create({
  card: { height: "100%" },
  content: { display: "flex", flexDirection: "column", gap: tokens.spacing1 },
  row: { display: "flex", alignItems: "flex-start", gap: tokens.spacing1 },
});

/**
 * Тематические секции «заголовок + список пунктов»: один Card на секцию,
 * пункты в списке с маркером-точкой. Внутренний блок — страница оборачивает
 * его в собственный Section/BlockSection (не задаёт собственный фон).
 */
export function SectionsBlock({ sections, lang, style }: SectionsBlockProps) {
  const t = useT(lang);
  if (!sections.length) return null;
  return (
    <Stack gap={3} style={style} itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)}>
      {sections.map((section) => (
        <Card
          key={section.title}
          itemScope
          itemProp="itemListElement"
          itemType={schemaIri(SCHEMA_TYPE.thing)}
          style={styles.card}
        >
          <CardContent style={styles.content}>
            <Typography variant="h6" itemProp="name">
              {t(section.title)}
            </Typography>
            <Stack gap={1}>
              {section.items.map((item) => (
                <div key={item} {...stylex.props(styles.row)}>
                  <Dot />
                  <Typography variant="body1">{t(item)}</Typography>
                </div>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default SectionsBlock;
