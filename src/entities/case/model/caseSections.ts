import type { CounterItem, SliderLevel, StatItem, TextItem } from "./cases";

const C = "cases.reputation-monitoring-platform";

/** «Часовой»: цифры платформы (CountersSection). */
export const chasovoyCounters: CounterItem[] = [
  { value: 250000, label: `${C}.counters.0` },
  { value: 1000000, label: `${C}.counters.1` },
  { value: 100000000, label: `${C}.counters.2` },
  { value: 109000, label: `${C}.counters.3` },
];

/** «Часовой»: зачем искать сюжеты (TileSection, problem). */
export const chasovoyProblem: TextItem[] = [
  { title: `${C}.problem.0.title`, text: `${C}.problem.0.text` },
  { title: `${C}.problem.1.title`, text: `${C}.problem.1.text` },
];

/** «Часовой»: что сделали (TileSection, solution). */
export const chasovoySolution: TextItem[] = [
  { title: `${C}.solution.0.title`, text: `${C}.solution.0.text` },
  { title: `${C}.solution.1.title`, text: `${C}.solution.1.text` },
  { title: `${C}.solution.2.title`, text: `${C}.solution.2.text` },
];

/** «Часовой»: дашборд заказчика (StatsSection). */
export const chasovoyDashboard: StatItem[] = [
  { label: `${C}.dashboard.0.label`, value: `${C}.dashboard.0.value` },
  { label: `${C}.dashboard.1.label`, value: `${C}.dashboard.1.value` },
  { label: `${C}.dashboard.2.label`, value: `${C}.dashboard.2.value` },
  { label: `${C}.dashboard.3.label`, value: `${C}.dashboard.3.value` },
  { label: `${C}.dashboard.4.label`, value: `${C}.dashboard.4.value` },
];

/** «Часовой»: уровни глубины «Сюжетов ИИ» (SliderSection). */
export const chasovoyDepth: SliderLevel[] = [
  { title: `${C}.depth.level.0.title`, text: `${C}.depth.level.0.text` },
  { title: `${C}.depth.level.1.title`, text: `${C}.depth.level.1.text` },
  { title: `${C}.depth.level.2.title`, text: `${C}.depth.level.2.text` },
  { title: `${C}.depth.level.3.title`, text: `${C}.depth.level.3.text` },
  { title: `${C}.depth.level.4.title`, text: `${C}.depth.level.4.text` },
  { title: `${C}.depth.level.5.title`, text: `${C}.depth.level.5.text` },
  { title: `${C}.depth.level.6.title`, text: `${C}.depth.level.6.text` },
];

/** «Часовой»: кому это нужно (TileSection, audiences). */
export const chasovoyAudiences: TextItem[] = [
  { title: `${C}.audiences.0.title`, text: `${C}.audiences.0.text` },
  { title: `${C}.audiences.1.title`, text: `${C}.audiences.1.text` },
  { title: `${C}.audiences.2.title`, text: `${C}.audiences.2.text` },
];

const R = "cases.retail-support-bot";

/** «Агентная поддержка интернет-магазина»: цифры платформы. */
export const retailCounters: CounterItem[] = [
  { value: 120000, label: `${R}.counters.0` },
  { value: 78, label: `${R}.counters.1` },
  { value: 10, label: `${R}.counters.2` },
];

/** «Агентная поддержка интернет-магазина»: зачем внедрять (problem). */
export const retailProblem: TextItem[] = [
  { title: `${R}.problem.0.title`, text: `${R}.problem.0.text` },
  { title: `${R}.problem.1.title`, text: `${R}.problem.1.text` },
];

/** «Агентная поддержка интернет-магазина»: что сделали (solution). */
export const retailSolution: TextItem[] = [
  { title: `${R}.solution.0.title`, text: `${R}.solution.0.text` },
  { title: `${R}.solution.1.title`, text: `${R}.solution.1.text` },
  { title: `${R}.solution.2.title`, text: `${R}.solution.2.text` },
];

/** «Агентная поддержка интернет-магазина»: показатели внедрения (dashboard). */
export const retailDashboard: StatItem[] = [
  { label: `${R}.dashboard.0.label`, value: `${R}.dashboard.0.value` },
  { label: `${R}.dashboard.1.label`, value: `${R}.dashboard.1.value` },
  { label: `${R}.dashboard.2.label`, value: `${R}.dashboard.2.value` },
  { label: `${R}.dashboard.3.label`, value: `${R}.dashboard.3.value` },
  { label: `${R}.dashboard.4.label`, value: `${R}.dashboard.4.value` },
];

/** «Агентная поддержка интернет-магазина»: кому это нужно (audiences). */
export const retailAudiences: TextItem[] = [
  { title: `${R}.audiences.0.title`, text: `${R}.audiences.0.text` },
  { title: `${R}.audiences.1.title`, text: `${R}.audiences.1.text` },
  { title: `${R}.audiences.2.title`, text: `${R}.audiences.2.text` },
];
