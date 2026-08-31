import CheckIcon from "@mui/icons-material/Check";
import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { LANG_STORAGE_KEY, SUPPORTED_LANGS } from "../i18n";

const LANG_LABELS: Record<string, string> = {
  ru: "Русский",
  en: "English",
};

/**
 * Переключатель языка сайта (рядом с переключателем темы).
 * Выбранный язык сохраняется в localStorage (ключ `lang`), применяется
 * к `<html lang>` и мгновенно обновляет все переводы через react-i18next.
 */
export default function LanguageToggle() {
  const { i18n: i18nInstance, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const current = i18nInstance.resolvedLanguage ?? "ru";

  const changeLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_STORAGE_KEY, code);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label={t("ui.lang.switchTo")}
        title={t("ui.lang.switchTo")}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { minWidth: 160 } } }}
      >
        {SUPPORTED_LANGS.map((code) => (
          <MenuItem key={code} selected={current === code} onClick={() => changeLanguage(code)}>
            <ListItemText>{LANG_LABELS[code] ?? code}</ListItemText>
            {current === code ? (
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            ) : null}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
