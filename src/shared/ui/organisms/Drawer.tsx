import * as Dialog from "@radix-ui/react-dialog";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "../../design/tokens.stylex.ts";

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  label?: string;
  style?: StyleXStyles;
  children?: ReactNode;
};

/**
 * Выдвижная панель (мобильное меню). Поведение — @radix-ui/react-dialog:
 * фокус-трап, Esc, клик по оверлею. Стили — StyleX поверх токенов.
 * Цвета берутся из css-переменных `:root`, поэтому тёмная тема работает и
 * в портале (наследование от <html data-theme-class>).
 */
export default function Drawer({
  open,
  onOpenChange,
  side = "left",
  label = "Menu",
  style,
  children,
}: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay {...stylex.props(styles.overlay)} />
        <Dialog.Content {...stylex.props(styles.panel, side === "right" && styles.right, style)}>
          <Dialog.Title {...stylex.props(styles.title)}>{label}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: tokens.zDrawer,
  },
  panel: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: 260,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    boxShadow: tokens.shadow8,
    padding: tokens.spacing3,
    outline: "none",
    zIndex: tokens.zDrawer,
  },
  right: {
    left: "auto",
    right: 0,
  },
  title: {
    display: "none",
  },
});
