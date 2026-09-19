import { Globe } from "lucide-react";
import type { AppLang } from "@/shared/hooks/useT";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

export function LanguageToggle({ lang }: { lang: AppLang }) {
  const t = createT(lang, astroDicts);
  const nextLang = lang === "ru" ? "en" : "ru";
  const href = nextLang === "ru" ? "/" : "/en";

  return (
    <a
      href={href}
      title={t("ui.lang.switchTo")}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontWeight: 600,
      }}
    >
      <Globe size={18} />
      <span>{nextLang.toUpperCase()}</span>
    </a>
  );
}

export default LanguageToggle;
