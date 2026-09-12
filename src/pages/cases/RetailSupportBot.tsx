import { CountersSection } from "../../components/organisms/blocks/CountersSection";
import { StatsSection } from "../../components/organisms/blocks/StatsSection";
import { TileSection } from "../../components/organisms/blocks/TileSection";
import type { CounterItem, StatItem, TextItem } from "../../types/cases";
import { CasePageLayout } from "./CasePageLayout";
import type { CasePageProps } from "./types";

const C = "cases.retail-support-bot";

const counters: CounterItem[] = [
  { value: 120000, label: `${C}.counters.0` },
  { value: 78, label: `${C}.counters.1` },
  { value: 10, label: `${C}.counters.2` },
];

const problemItems: TextItem[] = [
  {
    title: `${C}.problem.0.title`,
    text: `${C}.problem.0.text`,
  },
  {
    title: `${C}.problem.1.title`,
    text: `${C}.problem.1.text`,
  },
];

const solutionItems: TextItem[] = [
  {
    title: `${C}.solution.0.title`,
    text: `${C}.solution.0.text`,
  },
  {
    title: `${C}.solution.1.title`,
    text: `${C}.solution.1.text`,
  },
  {
    title: `${C}.solution.2.title`,
    text: `${C}.solution.2.text`,
  },
];

const dashboardItems: StatItem[] = [
  { label: `${C}.dashboard.0.label`, value: `${C}.dashboard.0.value` },
  { label: `${C}.dashboard.1.label`, value: `${C}.dashboard.1.value` },
  { label: `${C}.dashboard.2.label`, value: `${C}.dashboard.2.value` },
  { label: `${C}.dashboard.3.label`, value: `${C}.dashboard.3.value` },
  { label: `${C}.dashboard.4.label`, value: `${C}.dashboard.4.value` },
];

const audienceItems: TextItem[] = [
  {
    title: `${C}.audiences.0.title`,
    text: `${C}.audiences.0.text`,
  },
  {
    title: `${C}.audiences.1.title`,
    text: `${C}.audiences.1.text`,
  },
  {
    title: `${C}.audiences.2.title`,
    text: `${C}.audiences.2.text`,
  },
];

/**
 * Case-specific sections for the «Агентная поддержка интернет-магазина» case:
 * counters, problem, solution, rollout metrics and audiences. Composed
 * explicitly on the case page and inserted into the base template through the
 * sections slot.
 */
function RetailSupportBotSections() {
  return (
    <>
      <CountersSection items={counters} />
      <TileSection
        alt
        eyebrow="casePage.problemEyebrow"
        title={`${C}.problem.title`}
        items={problemItems}
      />
      <TileSection title={`${C}.solution.title`} items={solutionItems} />
      <StatsSection alt title={`${C}.dashboard.title`} items={dashboardItems} />
      <TileSection alt title={`${C}.audiences.title`} items={audienceItems} />
    </>
  );
}

/**
 * /cases/retail-support-bot: the customer support case «Агентная поддержка
 * интернет-магазина». Its specific sections live on this page
 * (RetailSupportBotSections); CasePageLayout renders only hero → результат →
 * relevant links → CTA.
 */
export function RetailSupportBot({ case: caseData }: CasePageProps) {
  return <CasePageLayout case={caseData} sections={<RetailSupportBotSections />} />;
}
