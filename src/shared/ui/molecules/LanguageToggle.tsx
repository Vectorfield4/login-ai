import CheckIcon from "@mui/icons-material/Check";
import TranslateIcon from "@mui/icons-material/Translate";
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import type { SupportedLang } from "@/shared/i18n";
import { localizePath } from "@/shared/i18n";

const LANG_OPTIONS: { code: SupportedLang; label: string; flag: string }[] = [
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

/**
 * Переключатель языка сайта (рядом с переключателем темы), с флажками.
 * Смена языка — это навигация по роуту: URL меняется (/ru/x → /en/x),
 * язык i18n подтягивается LangLayout'ом из URL. localStorage не источник
 * истины — язык хранится только в URL.
 */
export default function LanguageToggle() {
  const { i18n: i18nInstance, t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const current = (i18nInstance.resolvedLanguage ?? "ru") as SupportedLang;

  const changeLanguage = (code: SupportedLang) => {
    navigate(localizePath(pathname, code));
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
        slotProps={{ paper: { sx: { minWidth: 200 } } }}
      >
        {LANG_OPTIONS.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={current === lang.code}
            onClick={() => changeLanguage(lang.code)}
          >
            <Box component="span" sx={{ mr: 1.5, fontSize: 18, lineHeight: 1 }}>
              {lang.flag}
            </Box>
            <ListItemText>{lang.label}</ListItemText>
            {current === lang.code ? (
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