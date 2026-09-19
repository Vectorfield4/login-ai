import * as stylex from "@stylexjs/stylex";
import type { TextItem } from "../../../../src/entities/case/model/cases";
import { tokens } from "../../design/tokens.stylex.ts";
import type { TFunc } from "../../i18n/t";

type TileCardProps = {
  t: TFunc;
  item: TextItem;
};

const styles = stylex.create({
  root: {
    height: "100%",
    borderRadius: tokens.radiusBorder,
    boxShadow: tokens.shadow1,
    backgroundColor: tokens.colorSurface,
    boxSizing: "border-box",
  },
  accent: { borderTop: `4px solid ${tokens.colorPrimary}` },
  content: { padding: tokens.layoutCard, height: "100%", boxSizing: "border-box" },
  title: {
    fontSize: tokens.sizeH6,
    fontWeight: tokens.weightH6,
    lineHeight: tokens.lineH6,
    color: tokens.colorPrimary,
    margin: 0,
  },
  text: {
    marginBlockStart: tokens.spacing1,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
    margin: 0,
  },
});

/** «заголовок + текст» tile for the problem, solution and audience sections. */
export function TileCard({ t, item }: TileCardProps) {
  return (
    <div {...stylex.props(styles.root, styles.accent)}>
      <div {...stylex.props(styles.content)}>
        <h3 {...stylex.props(styles.title)}>{t(item.title)}</h3>
        <p {...stylex.props(styles.text)}>{t(item.text)}</p>
      </div>
    </div>
  );
}
