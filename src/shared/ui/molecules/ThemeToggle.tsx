import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { darkThemeClassName } from "@/shared/design/theme";
import type { AppLang } from "@/shared/hooks/useT";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import IconButton from "@/shared/ui/atoms/IconButton";

export function ThemeToggle({ lang }: { lang: AppLang }) {
  const t = createT(lang, astroDicts);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setTheme(current);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    for (const cls of darkThemeClassName.split(/\s+/)) {
      document.documentElement.classList.toggle(cls, next === "dark");
    }
    localStorage.setItem("theme", next);
  };

  return (
    <IconButton
      label={theme === "light" ? t("ui.theme.toggleDark") : t("ui.theme.toggleLight")}
      variant="header"
      onClick={toggleTheme}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </IconButton>
  );
}

export default ThemeToggle;
