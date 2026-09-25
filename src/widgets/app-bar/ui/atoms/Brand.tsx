import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";

const LOGO_SRC = "/loginai-mark.png";
const BRAND_NAME = "Login AI";

type BrandProps = {
  href: string;
  onNavigate?: () => void;
  style?: StyleXStyles;
};

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    fontWeight: 700,
    fontSize: tokens.sizeH6,
    color: tokens.colorText,
    textDecoration: "none",
    whiteSpace: "nowrap",
    padding: `${tokens.spacing1} ${tokens.spacing15}`,
  },
  mark: {
    width: 32,
    height: 32,
    objectFit: "contain",
    flexShrink: 0,
  },
});

/** Brand link to the home page: the logo mark plus the brand name. */
export default function Brand({ href, onNavigate, style }: BrandProps) {
  return (
    <a href={href} onClick={onNavigate} {...stylex.props(styles.root, style)}>
      <img src={LOGO_SRC} alt="" width={32} height={32} {...stylex.props(styles.mark)} />
      {BRAND_NAME}
    </a>
  );
}
