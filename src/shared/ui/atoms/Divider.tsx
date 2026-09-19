import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../design/tokens.stylex.ts";

type DividerProps = {
  /** Р“РѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅС‹Р№ РѕС‚СЃС‚СѓРї СЃР»РµРІР° (СЃРїРёСЃРѕРє СЃ РёРєРѕРЅРєР°РјРё) */
  inset?: boolean;
  style?: StyleXStyles;
};

const styles = stylex.create({
  root: {
    height: 1,
    backgroundColor: tokens.colorDivider,
    border: "none",
    marginBlock: tokens.spacing2,
    flexShrink: 0,
    width: "100%",
  },
  inset: {
    marginInlineStart: tokens.spacing6,
  },
});

export default function Divider({ inset = false, style }: DividerProps) {
  return <hr {...stylex.props(styles.root, inset && styles.inset, style)} />;
}
