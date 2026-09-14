import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Quote: an accent bar on the left + italic block text.
 */
export function BlockQuote({ text }: { text: string }) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        borderLeft: 4,
        borderColor: "primary.main",
        pl: 2,
        py: 0.5,
        maxWidth: 720,
      }}
    >
      <Typography variant="body1" color="text.primary" fontStyle="italic" component="blockquote">
        «{t(text)}»
      </Typography>
    </Box>
  );
}
