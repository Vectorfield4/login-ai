import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Футер сайта: подпись с годом (i18n-ключ ui.footer).
 */
export function Footer() {
  const { t } = useTranslation();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        py: 4, // 32px — единицы theme.spacing()
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          {t("ui.footer", { year: new Date().getFullYear() })}
        </Typography>
      </Container>
    </Box>
  );
}
