import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex";
import type { AppLang } from "@/shared/hooks/useT";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

const LANG_CONFIG: Record<AppLang, { label: string; emoji: string }> = {
  ru: { label: "RU", emoji: "🇷🇺" },
  en: { label: "EN", emoji: "🇬🇧" },
};

const styles = stylex.create({
  root: {
    position: "relative",
    display: "inline-block",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    padding: `${tokens.spacing1} ${tokens.spacing15}`,
    borderRadius: "0px",
    backgroundColor: "transparent",
    border: "none",
    color: tokens.colorText,
    fontWeight: 600,
    fontSize: tokens.sizeBody2,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: `background-color ${tokens.durationShortest} ease, border-radius ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
      borderRadius: tokens.radiusBorder,
    },
  },
  chevron: {
    flexShrink: 0,
    transition: `transform ${tokens.durationShortest} ease`,
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    minWidth: 140,
    marginTop: tokens.spacing05,
    padding: `${tokens.spacing1} 0`,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurface,
    boxShadow: tokens.shadow8,
    zIndex: tokens.zAppbar,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
    width: "100%",
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: tokens.sizeBody2,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    ":hover": {
      backgroundColor: tokens.colorActionHover,
    },
  },
  activeItem: {
    fontWeight: 700,
    color: tokens.colorPrimary,
  },
});

function getCleanPath(): string {
  if (typeof window === "undefined") return "/";
  const pathname = window.location.pathname;
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  if (pathname.startsWith("/ru/")) return pathname.slice(3);
  return pathname;
}

export function LanguageToggle({ lang }: { lang: AppLang }) {
  const t = createT(lang, astroDicts);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentConfig = LANG_CONFIG[lang] || LANG_CONFIG.ru;

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const langs: AppLang[] = ["ru", "en"];
  const cleanPath = getCleanPath();

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...stylex.props(styles.root)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("ui.lang.switchTo")}
        {...stylex.props(styles.button)}
      >
        <span style={{ fontSize: "1.1em" }}>{currentConfig.emoji}</span>
        <span>{currentConfig.label}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          style={{ verticalAlign: "middle" }}
          {...stylex.props(styles.chevron, isOpen && styles.chevronOpen)}
        />
      </button>
      {isOpen && (
        <div role="menu" {...stylex.props(styles.dropdown)}>
          {langs.map((l) => {
            const cfg = LANG_CONFIG[l];
            const href = routeUrl(cleanPath, l);
            const isActive = l === lang;
            return (
              <a
                key={l}
                role="menuitem"
                href={href}
                onClick={() => setIsOpen(false)}
                {...stylex.props(styles.dropdownItem, isActive && styles.activeItem)}
              >
                <span style={{ fontSize: "1.1em" }}>{cfg.emoji}</span>
                <span>{cfg.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageToggle;
