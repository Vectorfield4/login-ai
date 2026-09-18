import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import type { CounterItem, StatItem, TextItem } from "@/entities/case/model/cases";
import type { BarsItem, TableRow } from "@/shared/types/investors";
import { useLocalizedPath } from "@/shared/hooks/useLocalizedPath";
import { Section } from "@/shared/ui/atoms/Section";
import { BarsSection } from "@/shared/ui/organisms/BarsSection";
import { CountersSection } from "@/shared/ui/organisms/CountersSection";
import { CtaBlock } from "@/shared/ui/organisms/CtaBlock";
import { QuoteSection } from "@/shared/ui/organisms/QuoteSection";
import { StatsSection } from "@/shared/ui/organisms/StatsSection";
import { TableSection } from "@/shared/ui/organisms/TableSection";
import { TileSection } from "@/shared/ui/organisms/TileSection";

const C = "investorsPage";

const tractionCounters: CounterItem[] = [
  { value: 250000, label: "cases.reputation-monitoring-platform.counters.0" },
  { value: 1000000, label: "cases.reputation-monitoring-platform.counters.1" },
  { value: 100000000, label: "cases.reputation-monitoring-platform.counters.2" },
  { value: 109000, label: "cases.reputation-monitoring-platform.counters.3" },
];

const marketFeatures: TextItem[] = [
  { title: `${C}.market.0.title`, text: `${C}.market.0.text` },
  { title: `${C}.market.1.title`, text: `${C}.market.1.text` },
  { title: `${C}.market.2.title`, text: `${C}.market.2.text` },
];

const marketSize: StatItem[] = [
  { label: `${C}.marketSize.0.label`, value: `${C}.marketSize.0.value` },
  { label: `${C}.marketSize.1.label`, value: `${C}.marketSize.1.value` },
  { label: `${C}.marketSize.2.label`, value: `${C}.marketSize.2.value` },
  { label: `${C}.marketSize.3.label`, value: `${C}.marketSize.3.value` },
  { label: `${C}.marketSize.4.label`, value: `${C}.marketSize.4.value` },
];

const competitorColumns = [
  `${C}.competitors.columns.0`,
  `${C}.competitors.columns.1`,
  `${C}.competitors.columns.2`,
  `${C}.competitors.columns.3`,
];

const competitorRows: TableRow[] = [
  {
    name: `${C}.competitors.rows.0.name`,
    cells: [
      `${C}.competitors.rows.0.cell0`,
      `${C}.competitors.rows.0.cell1`,
      `${C}.competitors.rows.0.cell2`,
    ],
    highlight: true,
  },
  {
    name: `${C}.competitors.rows.1.name`,
    cells: [
      `${C}.competitors.rows.1.cell0`,
      `${C}.competitors.rows.1.cell1`,
      `${C}.competitors.rows.1.cell2`,
    ],
  },
  {
    name: `${C}.competitors.rows.2.name`,
    cells: [
      `${C}.competitors.rows.2.cell0`,
      `${C}.competitors.rows.2.cell1`,
      `${C}.competitors.rows.2.cell2`,
    ],
  },
  {
    name: `${C}.competitors.rows.3.name`,
    cells: [
      `${C}.competitors.rows.3.cell0`,
      `${C}.competitors.rows.3.cell1`,
      `${C}.competitors.rows.3.cell2`,
    ],
  },
  {
    name: `${C}.competitors.rows.4.name`,
    cells: [
      `${C}.competitors.rows.4.cell0`,
      `${C}.competitors.rows.4.cell1`,
      `${C}.competitors.rows.4.cell2`,
    ],
  },
];

const allocation: BarsItem[] = [
  { label: `${C}.allocation.0`, percent: 40 },
  { label: `${C}.allocation.1`, percent: 35 },
  { label: `${C}.allocation.2`, percent: 25 },
];

const terms: StatItem[] = [
  { label: `${C}.terms.0.label`, value: `${C}.terms.0.value` },
  { label: `${C}.terms.1.label`, value: `${C}.terms.1.value` },
  { label: `${C}.terms.2.label`, value: `${C}.terms.2.value` },
  { label: `${C}.terms.3.label`, value: `${C}.terms.3.value` },
  { label: `${C}.terms.4.label`, value: `${C}.terms.4.value` },
];

/**
 * Investors page (/investors): the pitch «Мир ИИ развивается — вкладывайтесь
 * в нас» (market, competitors, team, terms). Sections are composed explicitly
 * on this page; content lives in the i18n dictionaries. The deck is requested
 * by email on /contacts.
 */
export default function InvestorsPage() {
  const { t } = useTranslation();
  const localize = useLocalizedPath();

  return (
    <Box>
      <Section>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 700, letterSpacing: 1, display: "block" }}
          >
            {t("investorsPage.eyebrow")}
          </Typography>
          <Typography variant="h1" component="h1" gutterBottom sx={{ maxWidth: 900 }}>
            {t("investorsPage.title")}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720 }}>
            {t("investorsPage.description")}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" size="large" component={RouterLink} to={localize("/contacts")}>
              {t("investorsPage.ctaButton")}
            </Button>
          </Box>
        </Container>
      </Section>

      <CountersSection items={tractionCounters} />
      <TileSection alt title={`${C}.market.title`} items={marketFeatures} />
      <StatsSection title={`${C}.marketSize.title`} items={marketSize} />
      <TableSection
        alt
        title={`${C}.competitors.title`}
        columns={competitorColumns}
        rows={competitorRows}
      />
      <QuoteSection text={`${C}.quote.text`} />
      <BarsSection alt title={`${C}.allocation.title`} items={allocation} />
      <StatsSection title={`${C}.terms.title`} items={terms} />

      <CtaBlock
        title={t("investorsPage.ctaTitle")}
        text={t("investorsPage.ctaText")}
        buttonLabel={t("investorsPage.ctaButton")}
        to="/contacts"
      />
    </Box>
  );
}
