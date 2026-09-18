import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FaqItem } from "@/shared/types/content";

/**
 * FAQ: MUI Accordion list of question/answer pairs. Receives i18n keys.
 */
export function FaqBlock({ items }: { items: FaqItem[] }) {
  const { t } = useTranslation();
  return (
    <Box>
      {items.map((item) => (
        <Accordion key={item.question} defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" component="h3" fontWeight={600}>
              {t(item.question)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {t(item.answer)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
