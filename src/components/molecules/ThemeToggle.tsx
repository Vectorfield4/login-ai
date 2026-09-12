import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

/**
 * Переключатель тёмной/светлой темы.
 * MUI (ThemeProvider + cssVariables) сам сохраняет выбранный mode
 * в localStorage (ключ `mui-mode`) и применяет его при загрузке
 * через InitColorSchemeScript в main.tsx.
 */
export function ThemeToggle() {
  const { t } = useTranslation();
  const { mode, systemMode, setMode } = useColorScheme();
  const isDark = mode === "dark" || (mode === "system" && systemMode === "dark");
  const label = isDark ? t("ui.theme.toggleLight") : t("ui.theme.toggleDark");
  return (
    <IconButton
      color="inherit"
      aria-label={label}
      title={label}
      onClick={() => setMode(isDark ? "light" : "dark")}
    >
      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
