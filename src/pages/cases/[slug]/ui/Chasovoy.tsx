import type { CounterItem, SliderLevel, StatItem, TextItem } from "@/entities/case/model/cases";
import type { CasePageProps } from "@/pages/cases/[slug]/model/types";
import { CasePageLayout } from "@/pages/cases/[slug]/ui/CasePageLayout";
import { CountersSection } from "@/shared/ui/organisms/CountersSection";
import { SliderSection } from "@/shared/ui/organisms/SliderSection";
import { StatsSection } from "@/shared/ui/organisms/StatsSection";
import { TileSection } from "@/shared/ui/organisms/TileSection";

const C = "cases.reputation-monitoring-platform";

const counters: CounterItem[] = [
  { value: 250000, label: `${C}.counters.0` },
  { value: 1000000, label: `${C}.counters.1` },
  { value: 100000000, label: `${C}.counters.2` },
  { value: 109000, label: `${C}.counters.3` },
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

const depthLevels: SliderLevel[] = [
  {
    title: `${C}.depth.level.0.title`,
    text: `${C}.depth.level.0.text`,
  },
  {
    title: `${C}.depth.level.1.title`,
    text: `${C}.depth.level.1.text`,
  },
  {
    title: `${C}.depth.level.2.title`,
    text: `${C}.depth.level.2.text`,
  },
  {
    title: `${C}.depth.level.3.title`,
    text: `${C}.depth.level.3.text`,
  },
  {
    title: `${C}.depth.level.4.title`,
    text: `${C}.depth.level.4.text`,
  },
  {
    title: `${C}.depth.level.5.title`,
    text: `${C}.depth.level.5.text`,
  },
  {
    title: `${C}.depth.level.6.title`,
    text: `${C}.depth.level.6.text`,
  },
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
 * Case-specific sections for «Часовой»: platform counters, a KPI dashboard and
 * the «Сюжеты ИИ» depth slider. Composed explicitly on the case page and
 * inserted into the base template through the sections slot.
 */
function ChasovoySections() {
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
      <SliderSection
        title={`${C}.depth.title`}
        min={1}
        max={7}
        default={4}
        fromLabel={`${C}.depth.fromLabel`}
        toLabel={`${C}.depth.toLabel`}
        levels={depthLevels}
      />
      <TileSection alt title={`${C}.audiences.title`} items={audienceItems} />
    </>
  );
}

/**
 * /cases/reputation-monitoring-platform: the product case «Часовой».
 * Its specific sections live on this page (ChasovoySections); CasePageLayout
 * renders only hero → результат → relevant links → CTA.
 */
export function Chasovoy({ case: caseData }: CasePageProps) {
  return <CasePageLayout case={caseData} sections={<ChasovoySections />} />;
}
