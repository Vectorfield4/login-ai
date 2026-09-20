import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";
import type { TFunc } from "../../i18n/t";
import type { ContentSection } from "../../types/content";
import { Card, CardContent } from "../atoms/Card";
import { Dot } from "../atoms/Dot";
import Stack from "../atoms/Stack";
import { Typography } from "../atoms/Typography";

type SectionsBlockProps = {
  sections: ContentSection[];
  t: TFunc;
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
export function SectionsBlock({ sections, t, style }: SectionsBlockProps) {
  if (!sections.length) return null;
  return (
    <Stack gap={3} style={style}>
      {sections.map((section) => (
        <Card key={section.title} style={styles.card}>
          <CardContent style={styles.content}>
            <Typography variant="h6">{t(section.title)}</Typography>
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
